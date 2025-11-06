import { Star, X } from 'lucide-react';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { useState } from 'react';
import { motion } from 'motion/react';
import { projectId, publicAnonKey } from '../utils/supabase/info';
import { toast } from 'sonner@2.0.3';

interface RatingModalProps {
  mechanicId: string;
  mechanicName: string;
  onClose: () => void;
  onSubmit: () => void;
}

export function RatingModal({ mechanicId, mechanicName, onClose, onSubmit }: RatingModalProps) {
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [review, setReview] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (rating === 0) {
      toast.error('Please select a rating');
      return;
    }
    
    setSubmitting(true);
    
    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-d3fbde8b/ratings`,
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${publicAnonKey}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            mechanicId,
            rating,
            review
          })
        }
      );
      
      if (!response.ok) {
        throw new Error('Failed to submit rating');
      }
      
      toast.success('Thank you for your feedback!');
      onSubmit();
    } catch (error) {
      console.error('Error submitting rating:', error);
      toast.error('Failed to submit rating. Please try again.');
    } finally {
      setSubmitting(false);
    }
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
          <h2>Rate Your Experience</h2>
          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
        {/* Mechanic Name */}
        <p className="text-center text-gray-600 mb-6">
          How was your experience with <span>{mechanicName}</span>?
        </p>
        
        {/* Star Rating */}
        <div className="flex justify-center gap-2 mb-6">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              onMouseEnter={() => setHoveredRating(star)}
              onMouseLeave={() => setHoveredRating(0)}
              onClick={() => setRating(star)}
              className="transition-transform hover:scale-110"
            >
              <Star
                className={`w-10 h-10 ${
                  star <= (hoveredRating || rating)
                    ? 'fill-yellow-400 text-yellow-400'
                    : 'text-gray-300'
                }`}
              />
            </button>
          ))}
        </div>
        
        {/* Review Text */}
        <div className="mb-6">
          <label className="block text-sm mb-2">
            Write a review (Optional)
          </label>
          <Textarea
            value={review}
            onChange={(e) => setReview(e.target.value)}
            placeholder="Share your experience..."
            rows={4}
          />
        </div>
        
        {/* Submit Button */}
        <Button
          onClick={handleSubmit}
          size="lg"
          className="w-full bg-blue-500 hover:bg-blue-600"
          disabled={submitting || rating === 0}
        >
          {submitting ? 'Submitting...' : 'Submit Rating'}
        </Button>
      </motion.div>
    </motion.div>
  );
}
