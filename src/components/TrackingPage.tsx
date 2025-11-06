import { useState, useEffect } from "react";
import {
  ArrowLeft,
  MapPin,
  Phone,
  MessageSquare,
  Clock,
  CheckCircle2,
  Navigation,
} from "lucide-react";
import { Mechanic } from "../App";
import { Button } from "./ui/button";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface TrackingPageProps {
  mechanic: Mechanic;
  bookingId: string;
  onOpenChat: () => void;
  onBack: () => void;
}

type BookingStatus =
  | "confirmed"
  | "on_the_way"
  | "arrived"
  | "in_progress"
  | "completed";

export default function TrackingPage({
  mechanic,
  bookingId,
  onOpenChat,
  onBack,
}: TrackingPageProps) {
  const [status, setStatus] = useState<BookingStatus>("confirmed");
  const [estimatedArrival, setEstimatedArrival] = useState(15);
  const [mechanicLocation, setMechanicLocation] = useState({
    lat: 37.7799,
    lng: -122.4044,
  });
  const userLocation = { lat: 37.7749, lng: -122.4194 };

  // Simulate status progression
  useEffect(() => {
    const statusProgression: BookingStatus[] = [
      "confirmed",
      "on_the_way",
      "arrived",
      "in_progress",
    ];
    let currentIndex = 0;

    const interval = setInterval(() => {
      if (currentIndex < statusProgression.length - 1) {
        currentIndex++;
        setStatus(statusProgression[currentIndex]);

        // Update estimated arrival
        if (statusProgression[currentIndex] === "on_the_way") {
          setEstimatedArrival(12);
        } else if (statusProgression[currentIndex] === "arrived") {
          setEstimatedArrival(0);
        }
      }
    }, 10000); // Progress every 10 seconds for demo

    return () => clearInterval(interval);
  }, []);

  // Simulate mechanic movement
  useEffect(() => {
    if (status === "on_the_way") {
      const interval = setInterval(() => {
        setMechanicLocation((prev) => ({
          lat: prev.lat + (userLocation.lat - prev.lat) * 0.5,
          lng: prev.lng + (userLocation.lng - prev.lng) * 0.5,
        }));
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [status]);

  const getStatusInfo = () => {
    switch (status) {
      case "confirmed":
        return {
          title: "Booking Confirmed",
          description: "Your mechanic will be on the way shortly",
          icon: CheckCircle2,
          color: "text-green-600",
        };
      case "on_the_way":
        return {
          title: "Mechanic On The Way",
          description: `Arriving in approximately ${estimatedArrival} minutes`,
          icon: Navigation,
          color: "text-blue-600",
        };
      case "arrived":
        return {
          title: "Mechanic Arrived",
          description: "Your mechanic is at your location",
          icon: MapPin,
          color: "text-purple-600",
        };
      case "in_progress":
        return {
          title: "Service In Progress",
          description: "Your vehicle is being serviced",
          icon: Clock,
          color: "text-orange-600",
        };
      default:
        return {
          title: "Status Update",
          description: "",
          icon: CheckCircle2,
          color: "text-gray-600",
        };
    }
  };

  const statusInfo = getStatusInfo();
  const StatusIcon = statusInfo.icon;

  // Calculate position for map
  const latLngToPixel = (
    lat: number,
    lng: number,
    mapWidth: number,
    mapHeight: number
  ) => {
    const minLat = Math.min(mechanicLocation.lat, userLocation.lat) - 0.01;
    const maxLat = Math.max(mechanicLocation.lat, userLocation.lat) + 0.01;
    const minLng = Math.min(mechanicLocation.lng, userLocation.lng) - 0.01;
    const maxLng = Math.max(mechanicLocation.lng, userLocation.lng) + 0.01;

    const padding = 50;
    const x =
      ((lng - minLng) / (maxLng - minLng)) * (mapWidth - padding * 2) + padding;
    const y =
      ((maxLat - lat) / (maxLat - minLat)) * (mapHeight - padding * 2) +
      padding;

    return { x, y };
  };

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
            <span>Back to Home</span>
          </button>
          <h1 className="text-2xl mb-1">Track Your Service</h1>
          <p className="text-gray-600">Booking ID: {bookingId}</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Status Card */}
        <div className="bg-gradient-to-br from-blue-600 to-blue-700 text-white rounded-2xl p-6 sm:p-8 mb-6 shadow-xl">
          <div className="flex items-start gap-4">
            <div className={`p-3 bg-white/20 backdrop-blur-sm rounded-xl`}>
              <StatusIcon className="w-8 h-8" />
            </div>
            <div className="flex-1">
              <h2 className="text-2xl mb-2">{statusInfo.title}</h2>
              <p className="text-blue-100 text-lg mb-4">
                {statusInfo.description}
              </p>

              {status === "on_the_way" && estimatedArrival > 0 && (
                <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4 inline-block">
                  <div className="flex items-center gap-2">
                    <Clock className="w-5 h-5" />
                    <span className="text-lg font-medium">
                      {estimatedArrival} min
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Real-time Map */}
        <div className="bg-white rounded-2xl overflow-auto mb-6 shadow-lg border border-gray-200">
          <div className="relative h-[400px] sm:h-[500px] bg-gray-100">
            {/* Map Background */}
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: `
                linear-gradient(rgba(229, 231, 235, 0.5) 1px, transparent 1px),
                linear-gradient(90deg, rgba(229, 231, 235, 0.5) 1px, transparent 1px)
              `,
                backgroundSize: "40px 40px",
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-br from-blue-50/30 to-purple-50/30" />

            {/* Route Line */}
            {status === "on_the_way" && (
              <svg className="absolute inset-0 w-full h-full pointer-events-none">
                <line
                  x1={
                    latLngToPixel(
                      mechanicLocation.lat,
                      mechanicLocation.lng,
                      800,
                      500
                    ).x
                  }
                  y1={
                    latLngToPixel(
                      mechanicLocation.lat,
                      mechanicLocation.lng,
                      800,
                      500
                    ).y
                  }
                  x2={
                    latLngToPixel(userLocation.lat, userLocation.lng, 800, 500)
                      .x
                  }
                  y2={
                    latLngToPixel(userLocation.lat, userLocation.lng, 800, 500)
                      .y
                  }
                  stroke="#3B82F6"
                  strokeWidth="3"
                  strokeDasharray="10,5"
                  opacity="0.6"
                />
              </svg>
            )}

            {/* Your Location */}
            <div
              className="absolute transform -translate-x-1/2 -translate-y-1/2 z-20"
              style={{
                left: `${
                  latLngToPixel(userLocation.lat, userLocation.lng, 800, 500).x
                }px`,
                top: `${
                  latLngToPixel(userLocation.lat, userLocation.lng, 800, 500).y
                }px`,
              }}
            >
              <div className="relative">
                <div className="absolute inset-0 animate-ping">
                  <div className="w-16 h-16 bg-purple-500 rounded-full opacity-20" />
                </div>
                <div className="relative w-16 h-16 bg-purple-600 rounded-full border-4 border-white shadow-xl flex items-center justify-center">
                  <MapPin className="w-7 h-7 text-white" />
                </div>
                <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 bg-white px-3 py-1 rounded-lg shadow-lg whitespace-nowrap text-sm">
                  Your Location
                </div>
              </div>
            </div>

            {/* Mechanic Location */}
            <div
              className="absolute transform -translate-x-1/2 -translate-y-1/2 z-20"
              style={{
                left: `${
                  latLngToPixel(
                    mechanicLocation.lat,
                    mechanicLocation.lng,
                    800,
                    500
                  ).x
                }px`,
                top: `${
                  latLngToPixel(
                    mechanicLocation.lat,
                    mechanicLocation.lng,
                    800,
                    500
                  ).y
                }px`,
              }}
            >
              <div className="relative">
                {status === "on_the_way" && (
                  <div className="absolute inset-0 animate-ping">
                    <div className="w-16 h-16 bg-blue-500 rounded-full opacity-20" />
                  </div>
                )}
                <div className="relative w-16 h-16 bg-blue-600 rounded-full border-4 border-white shadow-xl flex items-center justify-center">
                  <Navigation className="w-7 h-7 text-white" />
                </div>
                <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 bg-white px-3 py-1 rounded-lg shadow-lg whitespace-nowrap text-sm">
                  {mechanic.name}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mechanic Info */}
        <div className="bg-white rounded-2xl p-6 mb-6 border border-gray-200">
          <div className="flex items-start gap-4">
            <ImageWithFallback
              src={mechanic.image}
              alt={mechanic.name}
              className="w-20 h-20 rounded-xl object-cover"
            />
            <div className="flex-1">
              <h3 className="text-xl mb-1">{mechanic.name}</h3>
              <p className="text-gray-600 mb-3">{mechanic.specialty}</p>
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <MapPin className="w-4 h-4" />
                <span>{mechanic.distance} mi away</span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-2 gap-3 mt-6">
            <Button
              variant="outline"
              className="w-full py-6 rounded-xl"
              onClick={() => window.open(`tel:${mechanic.phone}`)}
            >
              <Phone className="w-5 h-5 mr-2" />
              Call
            </Button>
            <Button
              className="w-full py-6 rounded-xl bg-blue-600 hover:bg-blue-700"
              onClick={onOpenChat}
            >
              <MessageSquare className="w-5 h-5 mr-2" />
              Message
            </Button>
          </div>
        </div>

        {/* Progress Timeline */}
        <div className="bg-white rounded-2xl p-6 border border-gray-200">
          <h3 className="text-xl mb-6">Service Progress</h3>

          <div className="space-y-4">
            {[
              {
                status: "confirmed",
                label: "Booking Confirmed",
                time: "Just now",
              },
              {
                status: "on_the_way",
                label: "Mechanic On The Way",
                time:
                  status === "on_the_way" ||
                  status === "arrived" ||
                  status === "in_progress"
                    ? "Now"
                    : "Pending",
              },
              {
                status: "arrived",
                label: "Mechanic Arrived",
                time:
                  status === "arrived" || status === "in_progress"
                    ? "Now"
                    : "Pending",
              },
              {
                status: "in_progress",
                label: "Service In Progress",
                time: status === "in_progress" ? "Now" : "Pending",
              },
            ].map((item, index) => {
              const isActive = item.status === status;
              const isCompleted =
                ["confirmed", "on_the_way", "arrived", "in_progress"].indexOf(
                  item.status as BookingStatus
                ) <
                ["confirmed", "on_the_way", "arrived", "in_progress"].indexOf(
                  status
                );

              return (
                <div key={item.status} className="flex items-start gap-4">
                  <div className="flex flex-col items-center">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        isCompleted
                          ? "bg-green-600"
                          : isActive
                          ? "bg-blue-600"
                          : "bg-gray-200"
                      }`}
                    >
                      {isCompleted ? (
                        <CheckCircle2 className="w-5 h-5 text-white" />
                      ) : (
                        <div
                          className={`w-3 h-3 rounded-full ${
                            isActive ? "bg-white" : "bg-gray-400"
                          }`}
                        />
                      )}
                    </div>
                    {index < 3 && (
                      <div
                        className={`w-0.5 h-12 ${
                          isCompleted ? "bg-green-600" : "bg-gray-200"
                        }`}
                      />
                    )}
                  </div>
                  <div className="flex-1 pt-1">
                    <p
                      className={`font-medium mb-1 ${
                        isActive ? "text-blue-600" : ""
                      }`}
                    >
                      {item.label}
                    </p>
                    <p className="text-sm text-gray-500">{item.time}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
