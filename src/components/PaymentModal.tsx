import { CreditCard, X, Lock } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { useState } from 'react';
import { motion } from 'motion/react';
import { toast } from 'sonner@2.0.3';

interface PaymentModalProps {
  amount: string;
  mechanicName: string;
  onClose: () => void;
  onPaymentComplete: () => void;
}

export function PaymentModal({ amount, mechanicName, onClose, onPaymentComplete }: PaymentModalProps) {
  const [formData, setFormData] = useState({
    cardNumber: '',
    cardName: '',
    expiry: '',
    cvv: ''
  });
  const [processing, setProcessing] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.cardNumber || !formData.cardName || !formData.expiry || !formData.cvv) {
      toast.error('Please fill in all fields');
      return;
    }
    
    setProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      setProcessing(false);
      toast.success('Payment successful!');
      onPaymentComplete();
    }, 2000);
  };

  const formatCardNumber = (value: string) => {
    const cleaned = value.replace(/\s/g, '');
    const formatted = cleaned.match(/.{1,4}/g)?.join(' ') || cleaned;
    return formatted.slice(0, 19); // Max 16 digits + 3 spaces
  };

  const formatExpiry = (value: string) => {
    const cleaned = value.replace(/\D/g, '');
    if (cleaned.length >= 2) {
      return `${cleaned.slice(0, 2)}/${cleaned.slice(2, 4)}`;
    }
    return cleaned;
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        className="bg-white rounded-3xl p-6 max-w-md w-full"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2>Payment</h2>
          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
        {/* Payment Summary */}
        <div className="bg-blue-50 rounded-2xl p-4 mb-6">
          <div className="flex justify-between items-center mb-2">
            <span className="text-gray-600">Service by</span>
            <span>{mechanicName}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Total Amount</span>
            <span className="text-2xl">{amount}</span>
          </div>
        </div>
        
        {/* Payment Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="cardNumber">Card Number</Label>
            <div className="relative">
              <Input
                id="cardNumber"
                placeholder="1234 5678 9012 3456"
                value={formData.cardNumber}
                onChange={(e) => setFormData({ 
                  ...formData, 
                  cardNumber: formatCardNumber(e.target.value)
                })}
                maxLength={19}
              />
              <CreditCard className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            </div>
          </div>
          
          <div>
            <Label htmlFor="cardName">Cardholder Name</Label>
            <Input
              id="cardName"
              placeholder="John Doe"
              value={formData.cardName}
              onChange={(e) => setFormData({ ...formData, cardName: e.target.value })}
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="expiry">Expiry Date</Label>
              <Input
                id="expiry"
                placeholder="MM/YY"
                value={formData.expiry}
                onChange={(e) => setFormData({ 
                  ...formData, 
                  expiry: formatExpiry(e.target.value)
                })}
                maxLength={5}
              />
            </div>
            <div>
              <Label htmlFor="cvv">CVV</Label>
              <Input
                id="cvv"
                type="password"
                placeholder="123"
                value={formData.cvv}
                onChange={(e) => setFormData({ 
                  ...formData, 
                  cvv: e.target.value.replace(/\D/g, '').slice(0, 4)
                })}
                maxLength={4}
              />
            </div>
          </div>
          
          {/* Security Note */}
          <div className="flex items-center gap-2 text-sm text-gray-600 bg-gray-50 rounded-xl p-3">
            <Lock className="w-4 h-4 text-green-500" />
            <span>Your payment information is secure and encrypted</span>
          </div>
          
          {/* Submit Button */}
          <Button
            type="submit"
            size="lg"
            className="w-full bg-blue-500 hover:bg-blue-600"
            disabled={processing}
          >
            {processing ? (
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Processing...
              </div>
            ) : (
              `Pay ${amount}`
            )}
          </Button>
        </form>
        
        <p className="text-xs text-center text-gray-500 mt-4">
          This is a demo payment form. No actual charges will be made.
        </p>
      </motion.div>
    </motion.div>
  );
}
