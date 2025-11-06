import { useState } from 'react';
import { ArrowLeft, User, Car, Star, Clock, CreditCard, Settings, Bell, MapPin, ChevronRight } from 'lucide-react';
import { Button } from './ui/button';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface ProfilePageProps {
  onBack: () => void;
}

export default function ProfilePage({ onBack }: ProfilePageProps) {
  const [activeTab, setActiveTab] = useState<'profile' | 'bookings' | 'vehicles'>('profile');

  const pastBookings = [
    {
      id: '1',
      mechanic: 'Premium Auto Care',
      service: 'Engine Repair',
      date: 'Oct 28, 2024',
      cost: 225,
      rating: 5,
      status: 'completed'
    },
    {
      id: '2',
      mechanic: 'QuickFix Auto Shop',
      service: 'Brake Service',
      date: 'Oct 15, 2024',
      cost: 180,
      rating: 4,
      status: 'completed'
    },
    {
      id: '3',
      mechanic: 'Elite Motors Service',
      service: 'Oil Change',
      date: 'Sep 30, 2024',
      cost: 65,
      rating: 5,
      status: 'completed'
    }
  ];

  const savedVehicles = [
    {
      id: '1',
      make: 'Toyota',
      model: 'Camry',
      year: '2020',
      plate: 'ABC-1234',
      color: 'Silver'
    },
    {
      id: '2',
      make: 'Honda',
      model: 'Civic',
      year: '2018',
      plate: 'XYZ-5678',
      color: 'Blue'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
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
          <h1 className="text-2xl sm:text-3xl">Profile</h1>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Profile Header */}
        <div className="bg-white rounded-2xl p-6 mb-6 border border-gray-200">
          <div className="flex items-start gap-4 mb-6">
            <div className="w-20 h-20 bg-gradient-to-br from-blue-600 to-blue-700 rounded-full flex items-center justify-center">
              <User className="w-10 h-10 text-white" />
            </div>
            <div className="flex-1">
              <h2 className="text-2xl mb-1">John Doe</h2>
              <p className="text-gray-600 mb-2">john.doe@email.com</p>
              <p className="text-sm text-gray-500">+1 (555) 987-6543</p>
            </div>
            <Button variant="outline">
              <Settings className="w-4 h-4 mr-2" />
              Edit
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center p-4 bg-blue-50 rounded-xl">
              <p className="text-2xl text-blue-600 mb-1">12</p>
              <p className="text-sm text-gray-600">Services</p>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-xl">
              <p className="text-2xl text-green-600 mb-1">4.9</p>
              <p className="text-sm text-gray-600">Avg Rating</p>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-xl">
              <p className="text-2xl text-purple-600 mb-1">2</p>
              <p className="text-sm text-gray-600">Vehicles</p>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-2xl border border-gray-200 mb-6">
          <div className="flex border-b border-gray-200">
            <button
              onClick={() => setActiveTab('profile')}
              className={`flex-1 px-6 py-4 transition-colors ${
                activeTab === 'profile'
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Profile
            </button>
            <button
              onClick={() => setActiveTab('bookings')}
              className={`flex-1 px-6 py-4 transition-colors ${
                activeTab === 'bookings'
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Bookings
            </button>
            <button
              onClick={() => setActiveTab('vehicles')}
              className={`flex-1 px-6 py-4 transition-colors ${
                activeTab === 'vehicles'
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Vehicles
            </button>
          </div>

          <div className="p-6">
            {/* Profile Tab */}
            {activeTab === 'profile' && (
              <div className="space-y-4">
                <button className="w-full flex items-center justify-between p-4 hover:bg-gray-50 rounded-xl transition-colors">
                  <div className="flex items-center gap-3">
                    <Bell className="w-5 h-5 text-gray-600" />
                    <div className="text-left">
                      <p className="font-medium">Notifications</p>
                      <p className="text-sm text-gray-500">Manage your alerts</p>
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-400" />
                </button>

                <button className="w-full flex items-center justify-between p-4 hover:bg-gray-50 rounded-xl transition-colors">
                  <div className="flex items-center gap-3">
                    <CreditCard className="w-5 h-5 text-gray-600" />
                    <div className="text-left">
                      <p className="font-medium">Payment Methods</p>
                      <p className="text-sm text-gray-500">Manage cards and billing</p>
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-400" />
                </button>

                <button className="w-full flex items-center justify-between p-4 hover:bg-gray-50 rounded-xl transition-colors">
                  <div className="flex items-center gap-3">
                    <MapPin className="w-5 h-5 text-gray-600" />
                    <div className="text-left">
                      <p className="font-medium">Saved Addresses</p>
                      <p className="text-sm text-gray-500">Home, Work, etc.</p>
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-400" />
                </button>

                <button className="w-full flex items-center justify-between p-4 hover:bg-gray-50 rounded-xl transition-colors">
                  <div className="flex items-center gap-3">
                    <Settings className="w-5 h-5 text-gray-600" />
                    <div className="text-left">
                      <p className="font-medium">Settings</p>
                      <p className="text-sm text-gray-500">Privacy, security & more</p>
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-400" />
                </button>
              </div>
            )}

            {/* Bookings Tab */}
            {activeTab === 'bookings' && (
              <div className="space-y-4">
                {pastBookings.map((booking) => (
                  <div key={booking.id} className="p-4 border border-gray-200 rounded-xl hover:border-gray-300 transition-colors">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="font-medium mb-1">{booking.mechanic}</h3>
                        <p className="text-sm text-gray-600">{booking.service}</p>
                      </div>
                      <div className="px-3 py-1 bg-green-100 text-green-700 text-xs rounded-full">
                        {booking.status}
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1 text-gray-600">
                          <Clock className="w-4 h-4" />
                          {booking.date}
                        </div>
                        <div className="flex items-center gap-1">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-4 h-4 ${
                                i < booking.rating
                                  ? 'text-yellow-400 fill-yellow-400'
                                  : 'text-gray-300'
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                      <p className="font-medium">${booking.cost}</p>
                    </div>
                  </div>
                ))}

                {pastBookings.length === 0 && (
                  <div className="text-center py-12">
                    <Clock className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-lg text-gray-600 mb-2">No bookings yet</h3>
                    <p className="text-gray-500">Your service history will appear here</p>
                  </div>
                )}
              </div>
            )}

            {/* Vehicles Tab */}
            {activeTab === 'vehicles' && (
              <div className="space-y-4">
                {savedVehicles.map((vehicle) => (
                  <div key={vehicle.id} className="p-4 border border-gray-200 rounded-xl hover:border-gray-300 transition-colors">
                    <div className="flex items-start gap-4">
                      <div className="w-16 h-16 bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl flex items-center justify-center">
                        <Car className="w-8 h-8 text-gray-600" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium mb-1">
                          {vehicle.year} {vehicle.make} {vehicle.model}
                        </h3>
                        <div className="flex items-center gap-4 text-sm text-gray-600">
                          <span>{vehicle.plate}</span>
                          <span>•</span>
                          <span>{vehicle.color}</span>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">
                        Edit
                      </Button>
                    </div>
                  </div>
                ))}

                <Button variant="outline" className="w-full py-6 rounded-xl">
                  <Car className="w-5 h-5 mr-2" />
                  Add New Vehicle
                </Button>
              </div>
            )}
          </div>
        </div>

        {/* Payment Info Placeholder */}
        <div className="bg-gradient-to-br from-blue-600 to-blue-700 text-white rounded-2xl p-6">
          <div className="flex items-start gap-4">
            <CreditCard className="w-8 h-8 flex-shrink-0" />
            <div>
              <h3 className="text-lg mb-2">Payment Integration</h3>
              <p className="text-blue-100 text-sm mb-4">
                In a production app, this would integrate with payment providers like Stripe, PayPal, or Apple Pay for secure transactions.
              </p>
              <Button variant="outline" className="bg-white/20 hover:bg-white/30 text-white border-white/30">
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
