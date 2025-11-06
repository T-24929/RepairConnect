import { useState } from 'react';
import { ArrowLeft, Calendar, Clock, MapPin, Wrench, CreditCard, Check } from 'lucide-react';
import { Mechanic } from '../App';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Label } from './ui/label';

interface BookingPageProps {
  mechanic: Mechanic;
  onConfirmBooking: (bookingId: string) => void;
  onBack: () => void;
}

export default function BookingPage({ mechanic, onConfirmBooking, onBack }: BookingPageProps) {
  const [selectedService, setSelectedService] = useState<string>('');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [vehicleInfo, setVehicleInfo] = useState({
    make: '',
    model: '',
    year: '',
    issue: ''
  });
  const [paymentMethod, setPaymentMethod] = useState('card');

  const timeSlots = [
    '09:00 AM', '10:00 AM', '11:00 AM', '12:00 PM',
    '01:00 PM', '02:00 PM', '03:00 PM', '04:00 PM', '05:00 PM'
  ];

  const handleConfirm = () => {
    // Generate a booking ID
    const bookingId = `BK${Date.now()}`;
    
    // Store booking data (in a real app, this would go to backend)
    console.log('Booking confirmed:', {
      bookingId,
      mechanic: mechanic.name,
      service: selectedService,
      date: selectedDate,
      time: selectedTime,
      vehicle: vehicleInfo,
      payment: paymentMethod
    });

    onConfirmBooking(bookingId);
  };

  const isFormValid = selectedService && selectedDate && selectedTime && 
                      vehicleInfo.make && vehicleInfo.model && vehicleInfo.year;

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors mb-4"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back</span>
          </button>
          <h1 className="text-2xl sm:text-3xl mb-2">Book Service</h1>
          <p className="text-gray-600">Complete your booking with {mechanic.name}</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Booking Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Service Selection */}
            <div className="bg-white rounded-2xl p-6 border border-gray-200">
              <h2 className="text-xl mb-4 flex items-center gap-2">
                <Wrench className="w-5 h-5 text-gray-600" />
                Select Service
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {mechanic.services.map((service) => (
                  <button
                    key={service}
                    onClick={() => setSelectedService(service)}
                    className={`p-4 rounded-xl border-2 transition-all text-left ${
                      selectedService === service
                        ? 'border-blue-600 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span>{service}</span>
                      {selectedService === service && (
                        <Check className="w-5 h-5 text-blue-600" />
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Date and Time */}
            <div className="bg-white rounded-2xl p-6 border border-gray-200">
              <h2 className="text-xl mb-4 flex items-center gap-2">
                <Calendar className="w-5 h-5 text-gray-600" />
                Choose Date & Time
              </h2>
              
              <div className="mb-4">
                <Label htmlFor="date">Date</Label>
                <Input
                  id="date"
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  min={new Date().toISOString().split('T')[0]}
                  className="mt-2"
                />
              </div>

              <div>
                <Label>Time Slot</Label>
                <div className="grid grid-cols-3 gap-2 mt-2">
                  {timeSlots.map((time) => (
                    <button
                      key={time}
                      onClick={() => setSelectedTime(time)}
                      className={`p-3 rounded-lg border transition-all text-sm ${
                        selectedTime === time
                          ? 'border-blue-600 bg-blue-50 text-blue-600'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      {time}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Vehicle Information */}
            <div className="bg-white rounded-2xl p-6 border border-gray-200">
              <h2 className="text-xl mb-4">Vehicle Information</h2>
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
                <div>
                  <Label htmlFor="make">Make</Label>
                  <Input
                    id="make"
                    placeholder="e.g., Toyota"
                    value={vehicleInfo.make}
                    onChange={(e) => setVehicleInfo({...vehicleInfo, make: e.target.value})}
                    className="mt-2"
                  />
                </div>
                <div>
                  <Label htmlFor="model">Model</Label>
                  <Input
                    id="model"
                    placeholder="e.g., Camry"
                    value={vehicleInfo.model}
                    onChange={(e) => setVehicleInfo({...vehicleInfo, model: e.target.value})}
                    className="mt-2"
                  />
                </div>
                <div>
                  <Label htmlFor="year">Year</Label>
                  <Input
                    id="year"
                    placeholder="e.g., 2020"
                    value={vehicleInfo.year}
                    onChange={(e) => setVehicleInfo({...vehicleInfo, year: e.target.value})}
                    className="mt-2"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="issue">Describe the Issue</Label>
                <Textarea
                  id="issue"
                  placeholder="Tell us what's wrong with your vehicle..."
                  value={vehicleInfo.issue}
                  onChange={(e) => setVehicleInfo({...vehicleInfo, issue: e.target.value})}
                  className="mt-2"
                  rows={4}
                />
              </div>
            </div>

            {/* Payment Method */}
            <div className="bg-white rounded-2xl p-6 border border-gray-200">
              <h2 className="text-xl mb-4 flex items-center gap-2">
                <CreditCard className="w-5 h-5 text-gray-600" />
                Payment Method
              </h2>
              
              <div className="space-y-3">
                <button
                  onClick={() => setPaymentMethod('card')}
                  className={`w-full p-4 rounded-xl border-2 transition-all flex items-center justify-between ${
                    paymentMethod === 'card'
                      ? 'border-blue-600 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <CreditCard className="w-5 h-5" />
                    <div className="text-left">
                      <p>Credit/Debit Card</p>
                      <p className="text-sm text-gray-500">Pay after service</p>
                    </div>
                  </div>
                  {paymentMethod === 'card' && (
                    <Check className="w-5 h-5 text-blue-600" />
                  )}
                </button>

                <button
                  onClick={() => setPaymentMethod('cash')}
                  className={`w-full p-4 rounded-xl border-2 transition-all flex items-center justify-between ${
                    paymentMethod === 'cash'
                      ? 'border-blue-600 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-5 h-5 flex items-center justify-center">💵</div>
                    <div className="text-left">
                      <p>Cash</p>
                      <p className="text-sm text-gray-500">Pay in person</p>
                    </div>
                  </div>
                  {paymentMethod === 'cash' && (
                    <Check className="w-5 h-5 text-blue-600" />
                  )}
                </button>
              </div>

              <p className="text-sm text-gray-500 mt-4 bg-blue-50 p-3 rounded-lg">
                💳 Payment is processed after service completion. You'll receive a detailed invoice.
              </p>
            </div>
          </div>

          {/* Booking Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl p-6 border border-gray-200 sticky top-24">
              <h2 className="text-xl mb-4">Booking Summary</h2>
              
              <div className="space-y-4 mb-6">
                <div className="flex items-start gap-3">
                  <Wrench className="w-5 h-5 text-gray-400 mt-1 flex-shrink-0" />
                  <div className="flex-1">
                    <p className="text-sm text-gray-600">Mechanic</p>
                    <p className="font-medium">{mechanic.name}</p>
                  </div>
                </div>

                {selectedService && (
                  <div className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-gray-400 mt-1 flex-shrink-0" />
                    <div className="flex-1">
                      <p className="text-sm text-gray-600">Service</p>
                      <p className="font-medium">{selectedService}</p>
                    </div>
                  </div>
                )}

                {selectedDate && selectedTime && (
                  <div className="flex items-start gap-3">
                    <Clock className="w-5 h-5 text-gray-400 mt-1 flex-shrink-0" />
                    <div className="flex-1">
                      <p className="text-sm text-gray-600">Date & Time</p>
                      <p className="font-medium">
                        {new Date(selectedDate).toLocaleDateString()} at {selectedTime}
                      </p>
                    </div>
                  </div>
                )}

                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-gray-400 mt-1 flex-shrink-0" />
                  <div className="flex-1">
                    <p className="text-sm text-gray-600">Location</p>
                    <p className="font-medium text-sm">{mechanic.address}</p>
                  </div>
                </div>
              </div>

              <div className="border-t border-gray-200 pt-4 mb-6">
                <div className="flex justify-between mb-2">
                  <span className="text-gray-600">Estimated Rate</span>
                  <span className="font-medium">${mechanic.price}/hr</span>
                </div>
                <p className="text-xs text-gray-500">
                  Final cost depends on actual service time and parts
                </p>
              </div>

              <Button
                onClick={handleConfirm}
                disabled={!isFormValid}
                className="w-full py-6 text-lg bg-blue-600 hover:bg-blue-700 rounded-xl"
              >
                Confirm Booking
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
