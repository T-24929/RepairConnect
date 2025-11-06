import { useState, useEffect } from "react";
import { MapPin, Search, Filter, Star, Navigation } from "lucide-react";
import { Mechanic } from "../App";
import MapView from "./MapView";
import MechanicCard from "./MechanicCard";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

interface HomePageProps {
  onSelectMechanic: (mechanic: Mechanic) => void;
}

const mockMechanics: Mechanic[] = [
  {
    id: "1",
    name: "Colombo Auto Care",
    rating: 4.8,
    reviews: 234,
    specialty: "Engine & Transmission",
    distance: 0.8,
    price: 7500,
    image:
      "https://images.unsplash.com/photo-1637640125496-31852f042a60?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYXIlMjBtZWNoYW5pYyUyMHdvcmtzaG9wfGVufDF8fHx8MTc2MjMzODMwNnww&ixlib=rb-4.1.0&q=80&w=1080",
    lat: 6.9271,
    lng: 79.8612,
    available: true,
    responseTime: "15 min",
    services: ["Engine Repair", "Transmission", "Diagnostics", "Oil Change"],
    phone: "+94 77 123 4567",
    address: "Colombo 03, Sri Lanka",
  },
  {
    id: "2",
    name: "Kandy QuickFix",
    rating: 4.6,
    reviews: 187,
    specialty: "Brake & Suspension",
    distance: 1.2,
    price: 6500,
    image:
      "https://images.unsplash.com/photo-1619642737579-a7474bee1044?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhdXRvJTIwcmVwYWlyJTIwZ2FyYWdlfGVufDF8fHx8MTc2MjM4OTE0NHww&ixlib=rb-4.1.0&q=80&w=1080",
    lat: 7.2906,
    lng: 80.6337,
    available: true,
    responseTime: "20 min",
    services: ["Brake Service", "Suspension", "Alignment", "Tire Rotation"],
    phone: "+94 77 234 5678",
    address: "Kandy, Sri Lanka",
  },
  {
    id: "3",
    name: "Galle Elite Motors",
    rating: 4.9,
    reviews: 312,
    specialty: "Luxury & Import Cars",
    distance: 2.1,
    price: 9500,
    image:
      "https://images.unsplash.com/photo-1727413434026-0f8314c037d8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWNoYW5pYyUyMHRvb2xzJTIwZXF1aXBtZW50fGVufDF8fHx8MTc2MjQ0Njc4NHww&ixlib=rb-4.1.0&q=80&w=1080",
    lat: 6.0535,
    lng: 80.22,
    available: true,
    responseTime: "25 min",
    services: [
      "Import Specialist",
      "Luxury Service",
      "Performance Tuning",
      "Detailing",
    ],
    phone: "+94 77 345 6789",
    address: "Galle Fort, Sri Lanka",
  },
  {
    id: "4",
    name: "Jaffna FastLane",
    rating: 4.5,
    reviews: 156,
    specialty: "General Maintenance",
    distance: 1.5,
    price: 5500,
    image:
      "https://images.unsplash.com/photo-1660074127797-1c429fbb8cd6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjB0ZWNobmljaWFuJTIwcG9ydHJhaXR8ZW58MXx8fHwxNzYyNDQ2Nzg0fDA&ixlib=rb-4.1.0&q=80&w=1080",
    lat: 9.6615,
    lng: 80.0255,
    available: false,
    responseTime: "45 min",
    services: ["Oil Change", "Tune-ups", "Batteries", "Filters"],
    phone: "+94 77 456 7890",
    address: "Jaffna, Sri Lanka",
  },
  {
    id: "5",
    name: "Negombo AutoHub",
    rating: 4.7,
    reviews: 201,
    specialty: "Air Conditioning & Electrical",
    distance: 1.0,
    price: 6800,
    image:
      "https://images.unsplash.com/photo-1616421935202-7e67750a3384?auto=format&fit=crop&w=1080&q=80",
    lat: 7.2008,
    lng: 79.8737,
    available: true,
    responseTime: "18 min",
    services: ["AC Repair", "Electrical", "Battery Service", "Diagnostics"],
    phone: "+94 77 567 8912",
    address: "Negombo, Sri Lanka",
  },
  {
    id: "6",
    name: "Kurunegala DrivePro",
    rating: 4.4,
    reviews: 143,
    specialty: "Tires & Alignment",
    distance: 2.3,
    price: 5200,
    image:
      "https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=1080&q=80",
    lat: 7.4863,
    lng: 80.362,
    available: true,
    responseTime: "35 min",
    services: ["Wheel Alignment", "Tire Change", "Balancing", "Suspension"],
    phone: "+94 76 789 0123",
    address: "Kurunegala, Sri Lanka",
  },
  {
    id: "7",
    name: "Matara AutoMasters",
    rating: 4.8,
    reviews: 268,
    specialty: "Hybrid Vehicles",
    distance: 3.0,
    price: 8800,
    image:
      "https://images.unsplash.com/photo-1607860689868-d6a1e4db4d68?auto=format&fit=crop&w=1080&q=80",
    lat: 5.9496,
    lng: 80.5469,
    available: true,
    responseTime: "28 min",
    services: ["Hybrid Diagnostics", "Battery Conditioning", "Engine Repair"],
    phone: "+94 76 321 4567",
    address: "Matara, Sri Lanka",
  },
  {
    id: "8",
    name: "Trinco TechWorks",
    rating: 4.3,
    reviews: 119,
    specialty: "4x4 & Offroad",
    distance: 4.0,
    price: 7000,
    image:
      "https://images.unsplash.com/photo-1518459031867-a89b944bffe4?auto=format&fit=crop&w=1080&q=80",
    lat: 8.5874,
    lng: 81.2152,
    available: false,
    responseTime: "60 min",
    services: ["Offroad Mods", "Suspension Upgrades", "Towing Assist"],
    phone: "+94 77 901 2345",
    address: "Trincomalee, Sri Lanka",
  },
  {
    id: "9",
    name: "Anuradhapura Auto Clinic",
    rating: 4.6,
    reviews: 175,
    specialty: "Engine Diagnostics",
    distance: 1.7,
    price: 7200,
    image:
      "https://images.unsplash.com/photo-1597003030295-7dd46f9e6d32?auto=format&fit=crop&w=1080&q=80",
    lat: 8.314,
    lng: 80.4037,
    available: true,
    responseTime: "22 min",
    services: ["ECU Scanning", "Engine Tune", "Fuel System"],
    phone: "+94 77 654 7891",
    address: "Anuradhapura, Sri Lanka",
  },
  {
    id: "10",
    name: "Ratnapura GearBox Pro",
    rating: 4.5,
    reviews: 132,
    specialty: "Transmission & Clutch",
    distance: 2.0,
    price: 7600,
    image:
      "https://images.unsplash.com/photo-1621905251918-937af809f369?auto=format&fit=crop&w=1080&q=80",
    lat: 6.6858,
    lng: 80.4037,
    available: false,
    responseTime: "40 min",
    services: ["Gearbox Repair", "Clutch Service", "Fluid Change"],
    phone: "+94 77 890 1234",
    address: "Ratnapura, Sri Lanka",
  },
  {
    id: "11",
    name: "Colombo Express Garage",
    rating: 4.2,
    reviews: 98,
    specialty: "General Maintenance",
    distance: 0.6,
    price: 5200,
    image:
      "https://images.unsplash.com/photo-1542362567-b07e54358753?auto=format&fit=crop&w=1080&q=80",
    lat: 6.9279,
    lng: 79.861,
    available: true,
    responseTime: "12 min",
    services: ["Oil Change", "Tune-ups", "Battery Service"],
    phone: "+94 77 111 2233",
    address: "Colombo 04, Sri Lanka",
  },
  {
    id: "12",
    name: "Borella Repair Centre",
    rating: 4.1,
    reviews: 64,
    specialty: "Brakes & Suspension",
    distance: 1.1,
    price: 4800,
    image:
      "https://images.unsplash.com/photo-1502877338535-766e1452684a?auto=format&fit=crop&w=1080&q=80",
    lat: 6.906,
    lng: 79.8705,
    available: true,
    responseTime: "18 min",
    services: ["Brake Service", "Alignment", "Suspension"],
    phone: "+94 77 112 3344",
    address: "Borella, Colombo",
  },
  {
    id: "13",
    name: "Maradana Mechanics",
    rating: 4.0,
    reviews: 45,
    specialty: "Electrical Systems",
    distance: 0.9,
    price: 4500,
    image:
      "https://images.unsplash.com/photo-1518659183006-1b8f6a0a6d5c?auto=format&fit=crop&w=1080&q=80",
    lat: 6.9275,
    lng: 79.859,
    available: false,
    responseTime: "30 min",
    services: ["Electrical", "Battery", "AC Repair"],
    phone: "+94 77 113 4455",
    address: "Maradana, Colombo",
  },
  {
    id: "14",
    name: "Bambalapitiya AutoWorks",
    rating: 4.5,
    reviews: 122,
    specialty: "Diagnostics",
    distance: 0.7,
    price: 6000,
    image:
      "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=1080&q=80",
    lat: 6.8856,
    lng: 79.8566,
    available: true,
    responseTime: "14 min",
    services: ["Diagnostics", "ECU Scan", "Fuel System"],
    phone: "+94 77 114 5566",
    address: "Bambalapitiya, Colombo",
  },
  {
    id: "15",
    name: "Gampaha AutoCare",
    rating: 4.3,
    reviews: 88,
    specialty: "Clutch & Transmission",
    distance: 2.2,
    price: 6700,
    image:
      "https://images.unsplash.com/photo-1549921296-3a92b3fe3b9c?auto=format&fit=crop&w=1080&q=80",
    lat: 7.0844,
    lng: 80.009,
    available: true,
    responseTime: "25 min",
    services: ["Transmission", "Clutch", "Fluid Change"],
    phone: "+94 77 115 6677",
    address: "Gampaha, Sri Lanka",
  },
  {
    id: "16",
    name: "Negombo Roadside Assist",
    rating: 4.0,
    reviews: 54,
    specialty: "Towing & Roadside",
    distance: 0.5,
    price: 4200,
    image:
      "https://images.unsplash.com/photo-1493238792000-8113da705763?auto=format&fit=crop&w=1080&q=80",
    lat: 7.2089,
    lng: 79.8428,
    available: false,
    responseTime: "40 min",
    services: ["Towing", "Jump Start", "Fuel Delivery"],
    phone: "+94 77 116 7788",
    address: "Negombo Main Road, Negombo",
  },
  {
    id: "17",
    name: "Kalutara Motor Hub",
    rating: 4.4,
    reviews: 74,
    specialty: "Cooling Systems",
    distance: 1.9,
    price: 5000,
    image:
      "https://images.unsplash.com/photo-1549924231-f129b911e442?auto=format&fit=crop&w=1080&q=80",
    lat: 6.5859,
    lng: 79.9608,
    available: true,
    responseTime: "20 min",
    services: ["Radiator", "AC", "Cooling System"],
    phone: "+94 77 117 8899",
    address: "Kalutara, Sri Lanka",
  },
  {
    id: "18",
    name: "Kegalle Service Point",
    rating: 4.2,
    reviews: 60,
    specialty: "General Service",
    distance: 2.7,
    price: 5400,
    image:
      "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1080&q=80",
    lat: 7.2599,
    lng: 80.347,
    available: true,
    responseTime: "32 min",
    services: ["Oil Change", "Filters", "Brake Check"],
    phone: "+94 72 118 9900",
    address: "Kegalle, Sri Lanka",
  },
  {
    id: "19",
    name: "Kandy Hills Garage",
    rating: 4.6,
    reviews: 210,
    specialty: "Brake & Suspension",
    distance: 0.8,
    price: 6200,
    image:
      "https://images.unsplash.com/photo-1493238822117-9f3bde8b6b06?auto=format&fit=crop&w=1080&q=80",
    lat: 7.291,
    lng: 80.634,
    available: true,
    responseTime: "15 min",
    services: ["Brake Service", "Alignment", "Shock Absorbers"],
    phone: "+94 71 119 0011",
    address: "Kandy City, Sri Lanka",
  },
  {
    id: "20",
    name: "Matale AutoCare",
    rating: 4.0,
    reviews: 48,
    specialty: "Electrical & AC",
    distance: 2.9,
    price: 5100,
    image:
      "https://images.unsplash.com/photo-1542362567-b07e54358753?auto=format&fit=crop&w=1080&q=80",
    lat: 7.4686,
    lng: 80.625,
    available: false,
    responseTime: "35 min",
    services: ["AC Repair", "Alternator", "Battery"],
    phone: "+94 71 120 1122",
    address: "Matale, Sri Lanka",
  },
  {
    id: "21",
    name: "Nuwara Eliya MotorWorks",
    rating: 4.5,
    reviews: 95,
    specialty: "Engine Tuning",
    distance: 3.5,
    price: 7600,
    image:
      "https://images.unsplash.com/photo-1525609004556-c46c7d6cf023?auto=format&fit=crop&w=1080&q=80",
    lat: 6.9497,
    lng: 80.7891,
    available: true,
    responseTime: "40 min",
    services: ["Engine Tuning", "Diagnostics", "Fuel System"],
    phone: "+94 71 121 2233",
    address: "Nuwara Eliya, Sri Lanka",
  },
  {
    id: "22",
    name: "Hatton Service Garage",
    rating: 4.1,
    reviews: 52,
    specialty: "4x4 & Offroad",
    distance: 3.8,
    price: 7000,
    image:
      "https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1080&q=80",
    lat: 6.84,
    lng: 80.596,
    available: true,
    responseTime: "45 min",
    services: ["Offroad Mods", "Suspension", "Towing Assist"],
    phone: "+94 71 122 3344",
    address: "Hatton, Sri Lanka",
  },
  {
    id: "23",
    name: "Hambantota AutoBase",
    rating: 4.0,
    reviews: 61,
    specialty: "General Repairs",
    distance: 4.2,
    price: 5600,
    image:
      "https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?auto=format&fit=crop&w=1080&q=80",
    lat: 6.1243,
    lng: 81.121,
    available: false,
    responseTime: "55 min",
    services: ["Oil Change", "Engine Check", "Batteries"],
    phone: "+94 77 123 3344",
    address: "Hambantota, Sri Lanka",
  },
  {
    id: "24",
    name: "Polonnaruwa Fix It",
    rating: 4.3,
    reviews: 49,
    specialty: "Engine Diagnostics",
    distance: 2.8,
    price: 6000,
    image:
      "https://images.unsplash.com/photo-1525609004556-c46c7d6cf023?auto=format&fit=crop&w=1080&q=80",
    lat: 7.9394,
    lng: 81.0026,
    available: true,
    responseTime: "28 min",
    services: ["ECU Scan", "Fuel System", "Diagnostics"],
    phone: "+94 71 124 4455",
    address: "Polonnaruwa, Sri Lanka",
  },
  {
    id: "25",
    name: "Trincomalee AutoPoint",
    rating: 4.2,
    reviews: 68,
    specialty: "Marine & 4x4",
    distance: 3.1,
    price: 6900,
    image:
      "https://images.unsplash.com/photo-1493238792000-8113da705763?auto=format&fit=crop&w=1080&q=80",
    lat: 8.587,
    lng: 81.218,
    available: true,
    responseTime: "30 min",
    services: ["4x4 Service", "Tow", "Suspension"],
    phone: "+94 77 125 5566",
    address: "Trincomalee Harbour Road, Trincomalee",
  },
  {
    id: "26",
    name: "Galle Harbour Garage",
    rating: 4.7,
    reviews: 142,
    specialty: "Import & Luxury",
    distance: 0.9,
    price: 9800,
    image:
      "https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=1080&q=80",
    lat: 6.057,
    lng: 80.2205,
    available: true,
    responseTime: "20 min",
    services: ["Luxury Service", "Tuning", "Detailing"],
    phone: "+94 77 126 6677",
    address: "Galle Harbour, Galle",
  },
  {
    id: "27",
    name: "Matugama Motor Care",
    rating: 4.0,
    reviews: 33,
    specialty: "General Maintenance",
    distance: 3.0,
    price: 4800,
    image:
      "https://images.unsplash.com/photo-1549921296-3a92b3fe3b9c?auto=format&fit=crop&w=1080&q=80",
    lat: 6.6734,
    lng: 79.941,
    available: true,
    responseTime: "35 min",
    services: ["Oil Change", "Filters", "Batteries"],
    phone: "+94 77 127 7788",
    address: "Matugama, Sri Lanka",
  },
  {
    id: "28",
    name: "Ambalangoda SpeedWorks",
    rating: 4.4,
    reviews: 77,
    specialty: "Performance",
    distance: 2.4,
    price: 8200,
    image:
      "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1080&q=80",
    lat: 6.235,
    lng: 80.058,
    available: false,
    responseTime: "48 min",
    services: ["Performance Tuning", "Exhaust", "Detailing"],
    phone: "+94 77 128 8899",
    address: "Ambalangoda, Sri Lanka",
  },
  {
    id: "29",
    name: "Kilinochchi Auto Shop",
    rating: 3.9,
    reviews: 28,
    specialty: "General Repairs",
    distance: 4.6,
    price: 4600,
    image:
      "https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?auto=format&fit=crop&w=1080&q=80",
    lat: 9.381,
    lng: 80.398,
    available: true,
    responseTime: "50 min",
    services: ["Oil Change", "Brakes", "Battery"],
    phone: "+94 77 129 9900",
    address: "Kilinochchi Town, Sri Lanka",
  },
  {
    id: "30",
    name: "Mannar Auto Clinic",
    rating: 4.1,
    reviews: 36,
    specialty: "Tire & Alignment",
    distance: 3.9,
    price: 4900,
    image:
      "https://images.unsplash.com/photo-1542362567-b07e54358753?auto=format&fit=crop&w=1080&q=80",
    lat: 8.9849,
    lng: 79.902,
    available: true,
    responseTime: "38 min",
    services: ["Tire Change", "Alignment", "Balancing"],
    phone: "+94 77 130 1122",
    address: "Mannar, Sri Lanka",
  },
  {
    id: "31",
    name: "Vavuniya Road Garage",
    rating: 4.0,
    reviews: 41,
    specialty: "Engine Diagnostics",
    distance: 3.2,
    price: 5700,
    image:
      "https://images.unsplash.com/photo-1518659183006-1b8f6a0a6d5c?auto=format&fit=crop&w=1080&q=80",
    lat: 8.7592,
    lng: 80.4987,
    available: false,
    responseTime: "44 min",
    services: ["Diagnostics", "ECU", "Fuel System"],
    phone: "+94 77 131 2233",
    address: "Vavuniya Main Road, Vavuniya",
  },
  {
    id: "32",
    name: "Polonaruwa Pitstop",
    rating: 4.3,
    reviews: 52,
    specialty: "General Service",
    distance: 2.1,
    price: 5300,
    image:
      "https://images.unsplash.com/photo-1525609004556-c46c7d6cf023?auto=format&fit=crop&w=1080&q=80",
    lat: 7.935,
    lng: 81.0,
    available: true,
    responseTime: "26 min",
    services: ["Oil Change", "Tune-up", "Battery"],
    phone: "+94 77 132 3344",
    address: "Polonnaruwa Road, Polonnaruwa",
  },
  {
    id: "33",
    name: "Chilaw Motor Services",
    rating: 4.2,
    reviews: 58,
    specialty: "Hybrid & Electrical",
    distance: 1.8,
    price: 7000,
    image:
      "https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=1080&q=80",
    lat: 7.468,
    lng: 79.793,
    available: true,
    responseTime: "22 min",
    services: ["Hybrid Diagnostics", "Electrical", "Battery"],
    phone: "+94 77 133 4455",
    address: "Chilaw, Sri Lanka",
  },
  {
    id: "34",
    name: "Puttalam Auto Care",
    rating: 4.1,
    reviews: 47,
    specialty: "General Repairs",
    distance: 2.5,
    price: 5000,
    image:
      "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1080&q=80",
    lat: 8.0339,
    lng: 79.832,
    available: false,
    responseTime: "36 min",
    services: ["Engine", "Oil Change", "Brakes"],
    phone: "+94 77 134 5566",
    address: "Puttalam, Sri Lanka",
  },
  {
    id: "35",
    name: "Badulla QuickFix",
    rating: 4.0,
    reviews: 39,
    specialty: "General Service",
    distance: 3.6,
    price: 5200,
    image:
      "https://images.unsplash.com/photo-1549921296-3a92b3fe3b9c?auto=format&fit=crop&w=1080&q=80",
    lat: 6.9939,
    lng: 81.0556,
    available: true,
    responseTime: "42 min",
    services: ["Tune-up", "Oil", "Filters"],
    phone: "+94 77 135 6677",
    address: "Badulla, Sri Lanka",
  },
  {
    id: "36",
    name: "Monaragala Motor Hub",
    rating: 3.9,
    reviews: 21,
    specialty: "Tires",
    distance: 4.0,
    price: 4700,
    image:
      "https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?auto=format&fit=crop&w=1080&q=80",
    lat: 6.875,
    lng: 81.3419,
    available: true,
    responseTime: "50 min",
    services: ["Tire Change", "Balancing", "Alignment"],
    phone: "+94 77 136 7788",
    address: "Monaragala, Sri Lanka",
  },
  {
    id: "37",
    name: "Ratmalana Garage Works",
    rating: 4.2,
    reviews: 82,
    specialty: "Import Cars",
    distance: 1.4,
    price: 9000,
    image:
      "https://images.unsplash.com/photo-1518659183006-1b8f6a0a6d5c?auto=format&fit=crop&w=1080&q=80",
    lat: 6.8301,
    lng: 79.8796,
    available: true,
    responseTime: "16 min",
    services: ["Import Specialist", "Tuning", "Detailing"],
    phone: "+94 77 137 8899",
    address: "Ratmalana, Sri Lanka",
  },
  {
    id: "38",
    name: "Colombo North Auto",
    rating: 4.3,
    reviews: 103,
    specialty: "Diagnostics & Repair",
    distance: 1.0,
    price: 6400,
    image:
      "https://images.unsplash.com/photo-1542362567-b07e54358753?auto=format&fit=crop&w=1080&q=80",
    lat: 6.953,
    lng: 79.87,
    available: false,
    responseTime: "26 min",
    services: ["ECU", "Diagnostics", "Engine Repair"],
    phone: "+94 77 138 9900",
    address: "Colombo North, Sri Lanka",
  },
  {
    id: "39",
    name: "Negombo Marina Garage",
    rating: 4.1,
    reviews: 70,
    specialty: "Marine & Auto",
    distance: 0.7,
    price: 7200,
    image:
      "https://images.unsplash.com/photo-1493238792000-8113da705763?auto=format&fit=crop&w=1080&q=80",
    lat: 7.205,
    lng: 79.86,
    available: true,
    responseTime: "18 min",
    services: ["Marine Service", "Electrical", "Towing"],
    phone: "+94 77 139 0011",
    address: "Negombo Marina, Negombo",
  },
  {
    id: "40",
    name: "Colombo City Garage",
    rating: 4.6,
    reviews: 210,
    specialty: "Full Service",
    distance: 0.4,
    price: 8000,
    image:
      "https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=1080&q=80",
    lat: 6.9273,
    lng: 79.8615,
    available: true,
    responseTime: "10 min",
    services: ["Full Service", "Diagnostics", "Detailing"],
    phone: "+94 77 140 1122",
    address: "Colombo Fort, Sri Lanka",
  },
];

export default function HomePage({ onSelectMechanic }: HomePageProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [mechanics, setMechanics] = useState<Mechanic[]>(mockMechanics);
  // Default demo location: Colombo, Sri Lanka
  const [userLocation, setUserLocation] = useState({
    lat: 6.9271,
    lng: 79.8612,
  });
  const [selectedFilter, setSelectedFilter] = useState<
    "all" | "available" | "rated"
  >("all");
  const [showMap, setShowMap] = useState(true);

  useEffect(() => {
    // Request user location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (error) => {
          console.log("Location access denied, using default location");
        }
      );
    }
  }, []);

  const filteredMechanics = mechanics.filter((mechanic) => {
    const matchesSearch =
      mechanic.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      mechanic.specialty.toLowerCase().includes(searchQuery.toLowerCase());

    if (selectedFilter === "available")
      return matchesSearch && mechanic.available;
    if (selectedFilter === "rated")
      return matchesSearch && mechanic.rating >= 4.7;
    return matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-blue-600 to-blue-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
          <h1 className="text-3xl sm:text-4xl mb-2">
            Find a Mechanic Near You
          </h1>
          <p className="text-blue-100 mb-6">
            Quality auto repair services, on-demand
          </p>

          {/* Search Bar */}
          <div className="relative max-w-2xl">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <Input
              type="text"
              placeholder="Search by service or specialty..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 pr-4 py-6 w-full rounded-2xl border-0 bg-white shadow-lg"
            />
          </div>

          {/* Filter Buttons */}
          <div className="flex gap-3 mt-4 flex-wrap">
            <button
              onClick={() => setSelectedFilter("all")}
              className={`px-4 py-2 rounded-full transition-all ${
                selectedFilter === "all"
                  ? "bg-white text-blue-600"
                  : "bg-blue-500/50 text-white hover:bg-blue-500/70"
              }`}
            >
              All Services
            </button>
            <button
              onClick={() => setSelectedFilter("available")}
              className={`px-4 py-2 rounded-full transition-all ${
                selectedFilter === "available"
                  ? "bg-white text-blue-600"
                  : "bg-blue-500/50 text-white hover:bg-blue-500/70"
              }`}
            >
              Available Now
            </button>
            <button
              onClick={() => setSelectedFilter("rated")}
              className={`px-4 py-2 rounded-full transition-all ${
                selectedFilter === "rated"
                  ? "bg-white text-blue-600"
                  : "bg-blue-500/50 text-white hover:bg-blue-500/70"
              }`}
            >
              Top Rated
            </button>
          </div>
        </div>
      </div>

      {/* Map/List Toggle */}
      <div className="sticky top-16 z-40 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-600">
              {filteredMechanics.length} mechanics found
            </p>
            <button
              onClick={() => setShowMap(!showMap)}
              className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
            >
              <MapPin className="w-4 h-4" />
              <span className="hidden sm:inline">
                {showMap ? "List View" : "Map View"}
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Map View */}
      {showMap && (
        <div className="h-[400px] p-10 sm:h-[500px] relative  mb-6 ">
          <MapView
            mechanics={filteredMechanics}
            userLocation={userLocation}
            onSelectMechanic={onSelectMechanic}
          />
        </div>
      )}

      {/* Mechanics List */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <h2 className="text-xl sm:text-2xl mb-6">
          {selectedFilter === "available"
            ? "Available Now"
            : selectedFilter === "rated"
            ? "Top Rated Mechanics"
            : "Nearby Mechanics"}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {filteredMechanics.map((mechanic) => (
            <MechanicCard
              key={mechanic.id}
              mechanic={mechanic}
              onSelect={() => onSelectMechanic(mechanic)}
            />
          ))}
        </div>

        {filteredMechanics.length === 0 && (
          <div className="text-center py-12">
            <MapPin className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg text-gray-600 mb-2">No mechanics found</h3>
            <p className="text-gray-500">
              Try adjusting your search or filters
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
