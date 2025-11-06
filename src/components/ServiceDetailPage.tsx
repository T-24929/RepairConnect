import { ArrowLeft, Star, MapPin, Phone, Clock, Shield, Award } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { useState, useEffect } from 'react';
import { projectId, publicAnonKey } from '../utils/supabase/info';

interface Mechanic {
  id: string;
  name: string;
  rating: number;
  reviews: number;
  services: string[];
  distance: number;
  price: string;
  location: { lat: number; lng: number };
  image: string;
  status: 'available' | 'busy';
  phone: string;
  address: string;
  description: string;
  specialties: string[];
  responseTime: string;
}

interface ServiceDetailPageProps {
  mechanicId: string;
  onBack: () => void;
  onBookNow: (mechanic: Mechanic) => void;
}

export function ServiceDetailPage({ mechanicId, onBack, onBookNow }: ServiceDetailPageProps) {
  const [mechanic, setMechanic] = useState<Mechanic | null>(null);
  const [ratings, setRatings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMechanicDetails();
    fetchRatings();
  }, [mechanicId]);

  const fetchMechanicDetails = async () => {
    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-d3fbde8b/mechanic/${mechanicId}`,
        {
          headers: { Authorization: `Bearer ${publicAnonKey}` }
        }
      );
      const data = await response.json();
      setMechanic(data.mechanic);
    } catch (error) {
      console.error('Error fetching mechanic details:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchRatings = async () => {
    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-d3fbde8b/ratings/${mechanicId}`,
        {
          headers: { Authorization: `Bearer ${publicAnonKey}` }
        }
      );
      const data = await response.json();
      setRatings(data.ratings || []);
    } catch (error) {
      console.error('Error fetching ratings:', error);
    }
  };

  if (loading || !mechanic) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Image */}
      <div className="relative h-64 md:h-80">
        <ImageWithFallback
          src={mechanic.image}
          alt={mechanic.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        
        {/* Back Button */}
        <button
          onClick={onBack}
          className="absolute top-4 left-4 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg hover:bg-gray-100 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        
        {/* Status Badge */}
        <div className="absolute top-4 right-4">
          <Badge 
            variant={mechanic.status === 'available' ? 'default' : 'secondary'}
            className={mechanic.status === 'available' 
              ? 'bg-green-500 hover:bg-green-600' 
              : 'bg-gray-500'
            }
          >
            {mechanic.status === 'available' ? 'Available Now' : 'Busy'}
          </Badge>
        </div>
        
        {/* Name and Rating */}
        <div className="absolute bottom-4 left-4 right-4">
          <h1 className="text-white mb-2">{mechanic.name}</h1>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1 bg-white/90 px-3 py-1 rounded-full">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              <span className="text-sm">{mechanic.rating}</span>
              <span className="text-sm text-gray-600">({mechanic.reviews} reviews)</span>
            </div>
            <div className="flex items-center gap-1 bg-white/90 px-3 py-1 rounded-full text-sm">
              <MapPin className="w-4 h-4" />
              {mechanic.distance} mi away
            </div>
          </div>
        </div>
      </div>
      
      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 py-6 space-y-6">
        {/* Quick Info */}
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-white rounded-2xl p-4 text-center">
            <Clock className="w-6 h-6 mx-auto mb-2 text-blue-500" />
            <div className="text-sm text-gray-600">Response</div>
            <div className="text-sm">{mechanic.responseTime}</div>
          </div>
          <div className="bg-white rounded-2xl p-4 text-center">
            <Shield className="w-6 h-6 mx-auto mb-2 text-blue-500" />
            <div className="text-sm text-gray-600">Licensed</div>
            <div className="text-sm">Certified</div>
          </div>
          <div className="bg-white rounded-2xl p-4 text-center">
            <Award className="w-6 h-6 mx-auto mb-2 text-blue-500" />
            <div className="text-sm text-gray-600">Price Range</div>
            <div className="text-sm">{mechanic.price}</div>
          </div>
        </div>
        
        {/* About */}
        <div className="bg-white rounded-2xl p-6">
          <h2 className="mb-3">About</h2>
          <p className="text-gray-600 leading-relaxed">{mechanic.description}</p>
        </div>
        
        {/* Services */}
        <div className="bg-white rounded-2xl p-6">
          <h2 className="mb-4">Services Offered</h2>
          <div className="flex flex-wrap gap-2">
            {mechanic.services.map((service, index) => (
              <Badge key={index} variant="outline" className="px-4 py-2">
                {service}
              </Badge>
            ))}
          </div>
        </div>
        
        {/* Specialties */}
        <div className="bg-white rounded-2xl p-6">
          <h2 className="mb-4">Specialties</h2>
          <div className="flex flex-wrap gap-2">
            {mechanic.specialties.map((specialty, index) => (
              <Badge key={index} className="bg-blue-500 px-4 py-2">
                {specialty}
              </Badge>
            ))}
          </div>
        </div>
        
        {/* Contact */}
        <div className="bg-white rounded-2xl p-6">
          <h2 className="mb-4">Contact Information</h2>
          <div className="space-y-3">
            <div className="flex items-center gap-3 text-gray-600">
              <Phone className="w-5 h-5" />
              <span>{mechanic.phone}</span>
            </div>
            <div className="flex items-center gap-3 text-gray-600">
              <MapPin className="w-5 h-5" />
              <span>{mechanic.address}</span>
            </div>
          </div>
        </div>
        
        {/* Reviews */}
        <div className="bg-white rounded-2xl p-6">
          <h2 className="mb-4">Recent Reviews</h2>
          {ratings.length > 0 ? (
            <div className="space-y-4">
              {ratings.slice(0, 5).map((rating, index) => (
                <div key={rating.id || index}>
                  <div className="flex items-center gap-2 mb-2">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < rating.rating
                              ? 'fill-yellow-400 text-yellow-400'
                              : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-gray-500">
                      {new Date(rating.timestamp).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="text-gray-600 text-sm">{rating.review}</p>
                  {index < ratings.length - 1 && <Separator className="mt-4" />}
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-center py-4">No reviews yet</p>
          )}
        </div>
      </div>
      
      {/* Bottom CTA */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 safe-area-bottom">
        <div className="max-w-4xl mx-auto flex gap-3">
          <Button
            variant="outline"
            size="lg"
            className="flex-1"
            onClick={onBack}
          >
            Back
          </Button>
          <Button
            size="lg"
            className="flex-1 bg-blue-500 hover:bg-blue-600"
            onClick={() => onBookNow(mechanic)}
            disabled={mechanic.status !== 'available'}
          >
            {mechanic.status === 'available' ? 'Book Now' : 'Not Available'}
          </Button>
        </div>
      </div>
      
      <div className="h-20" />
    </div>
  );
}
