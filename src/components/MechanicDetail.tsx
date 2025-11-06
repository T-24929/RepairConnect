import { Star, MapPin, Phone, Clock, Award, CheckCircle2, ArrowLeft } from 'lucide-react';
import { Mechanic } from '../App';
import { Button } from './ui/button';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface MechanicDetailProps {
  mechanic: Mechanic;
  onBookService: () => void;
  onBack: () => void;
}

export default function MechanicDetail({ mechanic, onBookService, onBack }: MechanicDetailProps) {
  const reviews = [
    {
      id: 1,
      author: 'Sarah Johnson',
      rating: 5,
      date: '2 days ago',
      comment: 'Excellent service! Fixed my transmission issue quickly and professionally. Highly recommend.',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop'
    },
    {
      id: 2,
      author: 'Mike Chen',
      rating: 5,
      date: '1 week ago',
      comment: 'Great experience. Fair pricing and honest mechanics. Will definitely come back.',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop'
    },
    {
      id: 3,
      author: 'Emily Rodriguez',
      rating: 4,
      date: '2 weeks ago',
      comment: 'Good service overall. Took a bit longer than expected but the work quality was excellent.',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      {/* Back Button */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back</span>
          </button>
        </div>
      </div>

      {/* Hero Image */}
      <div className="relative h-64 sm:h-80 overflow-hidden">
        <ImageWithFallback
          src={mechanic.image}
          alt={mechanic.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        
        {/* Floating Info Card */}
        <div className="absolute bottom-4 left-4 right-4 sm:left-auto sm:right-4 sm:w-96">
          <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-5 shadow-2xl">
            <div className="flex items-start justify-between mb-3">
              <div>
                <h1 className="text-2xl mb-1">{mechanic.name}</h1>
                <p className="text-gray-600">{mechanic.specialty}</p>
              </div>
              <div className={`px-3 py-1 rounded-full text-sm ${
                mechanic.available
                  ? 'bg-green-500 text-white'
                  : 'bg-gray-500 text-white'
              }`}>
                {mechanic.available ? 'Available' : 'Busy'}
              </div>
            </div>
            
            <div className="flex items-center gap-4 text-sm">
              <div className="flex items-center gap-1">
                <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                <span className="font-medium">{mechanic.rating}</span>
                <span className="text-gray-500">({mechanic.reviews})</span>
              </div>
              <div className="flex items-center gap-1 text-gray-600">
                <MapPin className="w-4 h-4" />
                <span>{mechanic.distance} mi away</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Quick Info */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <div className="bg-white rounded-xl p-5 border border-gray-200">
            <Clock className="w-8 h-8 text-blue-600 mb-2" />
            <p className="text-sm text-gray-600 mb-1">Response Time</p>
            <p className="text-lg">{mechanic.responseTime}</p>
          </div>
          
          <div className="bg-white rounded-xl p-5 border border-gray-200">
            <Award className="w-8 h-8 text-blue-600 mb-2" />
            <p className="text-sm text-gray-600 mb-1">Hourly Rate</p>
            <p className="text-lg">${mechanic.price}/hour</p>
          </div>
          
          <div className="bg-white rounded-xl p-5 border border-gray-200">
            <Phone className="w-8 h-8 text-blue-600 mb-2" />
            <p className="text-sm text-gray-600 mb-1">Contact</p>
            <p className="text-sm">{mechanic.phone}</p>
          </div>
        </div>

        {/* Address */}
        <div className="bg-white rounded-2xl p-6 mb-8 border border-gray-200">
          <h2 className="text-xl mb-3 flex items-center gap-2">
            <MapPin className="w-5 h-5 text-gray-600" />
            Location
          </h2>
          <p className="text-gray-600">{mechanic.address}</p>
          <Button variant="outline" className="mt-4">
            Get Directions
          </Button>
        </div>

        {/* Services */}
        <div className="bg-white rounded-2xl p-6 mb-8 border border-gray-200">
          <h2 className="text-xl mb-4">Services Offered</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {mechanic.services.map((service, index) => (
              <div key={index} className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0" />
                <span className="text-gray-700">{service}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Reviews */}
        <div className="bg-white rounded-2xl p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl">Customer Reviews</h2>
            <div className="flex items-center gap-2">
              <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
              <span className="font-medium">{mechanic.rating}</span>
              <span className="text-gray-500">({mechanic.reviews} reviews)</span>
            </div>
          </div>

          <div className="space-y-6">
            {reviews.map((review) => (
              <div key={review.id} className="border-b border-gray-100 last:border-0 pb-6 last:pb-0">
                <div className="flex items-start gap-4">
                  <ImageWithFallback
                    src={review.avatar}
                    alt={review.author}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <p className="font-medium">{review.author}</p>
                      <p className="text-sm text-gray-500">{review.date}</p>
                    </div>
                    <div className="flex gap-1 mb-2">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < review.rating
                              ? 'text-yellow-400 fill-yellow-400'
                              : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                    <p className="text-gray-600 text-sm">{review.comment}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Fixed Bottom Action */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 shadow-lg">
        <div className="max-w-4xl mx-auto flex items-center justify-between gap-4">
          <div>
            <p className="text-sm text-gray-600">Starting from</p>
            <p className="text-2xl">${mechanic.price}<span className="text-lg text-gray-600">/hr</span></p>
          </div>
          <Button
            onClick={onBookService}
            className="px-8 py-6 text-lg bg-blue-600 hover:bg-blue-700 rounded-xl"
            disabled={!mechanic.available}
          >
            {mechanic.available ? 'Book Service' : 'Currently Unavailable'}
          </Button>
        </div>
      </div>
    </div>
  );
}
