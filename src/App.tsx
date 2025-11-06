import { useState, useEffect } from "react";
import {
  MapPin,
  Wrench,
  MessageSquare,
  User,
  Clock,
  Star,
  Phone,
  Navigation,
} from "lucide-react";
import HomePage from "./components/HomePage";
import MechanicDetail from "./components/MechanicDetail";
import BookingPage from "./components/BookingPage";
import TrackingPage from "./components/TrackingPage";
import ChatPage from "./components/ChatPage";
import ProfilePage from "./components/ProfilePage";

type Page = "home" | "detail" | "booking" | "tracking" | "chat" | "profile";

export interface Mechanic {
  id: string;
  name: string;
  rating: number;
  reviews: number;
  specialty: string;
  distance: number;
  price: number;
  image: string;
  lat: number;
  lng: number;
  available: boolean;
  responseTime: string;
  services: string[];
  phone: string;
  address: string;
}

function App() {
  const [currentPage, setCurrentPage] = useState<Page>("home");
  const [selectedMechanic, setSelectedMechanic] = useState<Mechanic | null>(
    null
  );
  const [bookingId, setBookingId] = useState<string | null>(null);

  const handleSelectMechanic = (mechanic: Mechanic) => {
    setSelectedMechanic(mechanic);
    setCurrentPage("detail");
  };

  const handleBookService = () => {
    setCurrentPage("booking");
  };

  const handleConfirmBooking = (id: string) => {
    setBookingId(id);
    setCurrentPage("tracking");
  };

  const handleOpenChat = () => {
    setCurrentPage("chat");
  };

  const handleBackToHome = () => {
    setCurrentPage("home");
    setSelectedMechanic(null);
    setBookingId(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation Bar */}
      <nav className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-xl border-b border-gray-200 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <button
              onClick={handleBackToHome}
              className="flex items-center space-x-2"
            >
              <Wrench className="w-6 h-6 text-blue-600" />
              <span className="text-xl tracking-tight">RepairConnect</span>
            </button>

            <div className="flex items-center space-x-4">
              <button
                onClick={() => setCurrentPage("chat")}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <MessageSquare className="w-5 h-5 text-gray-600" />
              </button>
              <button
                onClick={() => setCurrentPage("profile")}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <User className="w-5 h-5 text-gray-600" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="pt-16">
        {currentPage === "home" && (
          <HomePage onSelectMechanic={handleSelectMechanic} />
        )}

        {currentPage === "detail" && selectedMechanic && (
          <MechanicDetail
            mechanic={selectedMechanic}
            onBookService={handleBookService}
            onBack={handleBackToHome}
          />
        )}

        {currentPage === "booking" && selectedMechanic && (
          <BookingPage
            mechanic={selectedMechanic}
            onConfirmBooking={handleConfirmBooking}
            onBack={() => setCurrentPage("detail")}
          />
        )}

        {currentPage === "tracking" && selectedMechanic && bookingId && (
          <TrackingPage
            mechanic={selectedMechanic}
            bookingId={bookingId}
            onOpenChat={handleOpenChat}
            onBack={handleBackToHome}
          />
        )}

        {currentPage === "chat" && selectedMechanic && (
          <ChatPage
            mechanic={selectedMechanic}
            onBack={() =>
              bookingId ? setCurrentPage("tracking") : handleBackToHome()
            }
          />
        )}

        {currentPage === "profile" && <ProfilePage onBack={handleBackToHome} />}
      </div>
    </div>
  );
}

export default App;
