import { Star, MapPin, Clock, DollarSign } from 'lucide-react';
import { Mechanic } from '../App';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface MechanicCardProps {
  mechanic: Mechanic;
  onSelect: () => void;
}

export default function MechanicCard({ mechanic, onSelect }: MechanicCardProps) {
  return (
    <div
      onClick={onSelect}
      className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer overflow-hidden border border-gray-100 group"
    >
      {/* Image */}
      <div className="relative h-48 overflow-hidden">
        <ImageWithFallback
          src={mechanic.image}
          alt={mechanic.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
        />
        
        {/* Availability Badge */}
        <div className="absolute top-3 right-3">
          <div className={`px-3 py-1 rounded-full text-xs backdrop-blur-sm ${
            mechanic.available
              ? 'bg-green-500/90 text-white'
              : 'bg-gray-500/90 text-white'
          }`}>
            {mechanic.available ? 'Available' : 'Busy'}
          </div>
        </div>

        {/* Distance Badge */}
        <div className="absolute top-3 left-3">
          <div className="px-3 py-1 rounded-full text-xs bg-white/90 backdrop-blur-sm flex items-center gap-1">
            <MapPin className="w-3 h-3" />
            {mechanic.distance} mi
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        {/* Name and Rating */}
        <div className="flex items-start justify-between mb-2">
          <h3 className="text-lg flex-1">{mechanic.name}</h3>
          <div className="flex items-center gap-1 ml-2">
            <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
            <span className="text-sm">{mechanic.rating}</span>
          </div>
        </div>

        {/* Specialty */}
        <p className="text-gray-600 text-sm mb-3">{mechanic.specialty}</p>

        {/* Details */}
        <div className="flex items-center justify-between text-sm text-gray-500">
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            <span>{mechanic.responseTime}</span>
          </div>
          <div className="flex items-center gap-1">
            <DollarSign className="w-4 h-4" />
            <span>${mechanic.price}/hr</span>
          </div>
          <div className="text-xs">
            {mechanic.reviews} reviews
          </div>
        </div>

        {/* Services Preview */}
        <div className="mt-4 flex flex-wrap gap-2">
          {mechanic.services.slice(0, 3).map((service, index) => (
            <span
              key={index}
              className="px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded-lg"
            >
              {service}
            </span>
          ))}
          {mechanic.services.length > 3 && (
            <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-lg">
              +{mechanic.services.length - 3} more
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
