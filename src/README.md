# RepairConnect 🚗🔧

A modern, responsive web application that connects users with nearby car mechanics and repair services - like Uber but for auto repair.

## Features

### 🏠 Home Page
- **Live Map View**: Interactive map showing nearby mechanics with their availability status
- **Smart Filters**: Filter by availability, ratings, and services
- **Real-time Search**: Search mechanics by service type or specialty
- **Location-based**: Automatically detects user location to show nearby options

### 🔍 Mechanic Details
- **Comprehensive Profiles**: View mechanic ratings, reviews, services, and pricing
- **Customer Reviews**: Read authentic reviews from other users
- **Service List**: See all available services offered
- **Contact Information**: Phone number and address with directions

### 📅 Booking System
- **Easy Scheduling**: Select service, date, and time slot
- **Vehicle Information**: Add your car details for better service
- **Multiple Payment Options**: Card or cash payment methods
- **Instant Confirmation**: Get immediate booking confirmation

### 📍 Real-time Tracking
- **Live Location**: Track mechanic's real-time location on the map
- **Status Updates**: See booking progress from confirmed to completed
- **ETA Display**: Know exactly when the mechanic will arrive
- **Visual Progress**: Timeline showing service progress

### 💬 Chat Feature
- **Direct Messaging**: Chat with your mechanic in real-time
- **Quick Replies**: Pre-set messages for common questions
- **Media Support**: Share images and attachments
- **Message History**: Keep track of all conversations

### 👤 User Profile
- **Service History**: View all past bookings and services
- **Vehicle Management**: Save multiple vehicles for quick booking
- **Ratings & Reviews**: Rate mechanics after service completion
- **Settings**: Manage notifications, payment methods, and preferences

## Tech Stack

- **Frontend**: React with TypeScript
- **Styling**: Tailwind CSS with modern Apple-inspired UI
- **Backend**: Supabase (Edge Functions + Key-Value Store)
- **Icons**: Lucide React
- **Components**: Shadcn/ui

## Design Philosophy

- **Clean & Modern**: Apple-inspired design with smooth animations and blur effects
- **Mobile-First**: Fully responsive design optimized for all screen sizes
- **Accessibility**: Semantic HTML and ARIA labels for screen readers
- **Performance**: Optimized rendering and lazy loading

## API Endpoints

The backend provides the following REST API endpoints:

- `GET /mechanics` - Get all mechanics
- `POST /bookings` - Create a new booking
- `GET /bookings/:id` - Get booking details
- `PATCH /bookings/:id/status` - Update booking status
- `GET /chat/:bookingId` - Get chat messages
- `POST /chat/:bookingId` - Send a chat message
- `POST /ratings` - Submit a rating
- `GET /mechanics/:mechanicId/ratings` - Get mechanic ratings

## Future Enhancements

- **Real Payment Integration**: Stripe/PayPal integration
- **Push Notifications**: Real-time alerts for booking updates
- **Advanced Filters**: Filter by price range, distance, certification
- **Mechanic App**: Separate app for mechanics to manage bookings
- **Service Estimates**: AI-powered cost estimation
- **Warranty Tracking**: Keep track of warranties and service intervals

## Note

This is a prototype application built with Figma Make. For production use:
- Implement proper authentication and authorization
- Add payment gateway integration
- Set up proper database schema with relationships
- Implement real-time subscriptions for live tracking
- Add comprehensive error handling and validation
- Set up monitoring and analytics

---

Built with ❤️ using Figma Make
