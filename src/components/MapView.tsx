import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import { Icon } from "leaflet";
import { Mechanic } from "../App";
import { useEffect } from "react";

// Custom icons for mechanics + user
const pinGreen = new Icon({
  iconUrl: `data:image/svg+xml;utf8,
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="%2334D399" width="35px" height="45px">
      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zM12 11.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
    </svg>`,
  iconSize: [35, 45],
});

const pinGray = new Icon({
  iconUrl: `data:image/svg+xml;utf8,
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="%239CA3AF" width="35px" height="45px">
      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zM12 11.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
    </svg>`,
  iconSize: [35, 45],
});

const userIcon = new Icon({
  iconUrl: `data:image/svg+xml;utf8,
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="blue" width="40px" height="40px">
      <circle cx="12" cy="12" r="8" stroke="%23ffffff" stroke-width="2"/>
      <circle cx="12" cy="12" r="3"/>
    </svg>`,
  iconSize: [40, 40],
});

interface Props {
  mechanics: Mechanic[];
  userLocation: { lat: number; lng: number };
  onSelectMechanic: (mechanic: Mechanic) => void;
}

// Auto-center map when user location changes
function ReCenter({ lat, lng }: { lat: number; lng: number }) {
  const map = useMap();
  useEffect(() => {
    map.flyTo([lat, lng], 14, { duration: 1.5 });
  }, [lat, lng]);
  return null;
}
const isDark = false; // change with UI toggle
export default function MapView({
  mechanics,
  userLocation,
  onSelectMechanic,
}: Props) {
  return (
    <MapContainer
      className=" h-full rounded-2xl z-0 m-12"
      center={[userLocation.lat, userLocation.lng]}
      zoom={13}
    >
      <TileLayer
        url="https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png?key=8ekR2tyZjc7YizbnYT1A"
        attribution="&copy; Stadia Maps & OpenMapTiles & OSM contributors"
      />

      {/* Keep map centered when user moves */}
      <ReCenter lat={userLocation.lat} lng={userLocation.lng} />

      {/* Mechanics */}
      {mechanics.map((m) => (
        <Marker
          key={m.id}
          position={[m.lat, m.lng]}
          icon={m.available ? pinGreen : pinGray}
          eventHandlers={{ click: () => onSelectMechanic(m) }}
        >
          <Popup>
            <p className="font-medium">{m.name}</p>⭐ {m.rating} | {m.distance}{" "}
            km
            <br />
            {m.available ? "✅ Available" : "⚪ Busy"}
          </Popup>
        </Marker>
      ))}

      {/* User Position Marker */}
      <Marker position={[userLocation.lat, userLocation.lng]} icon={userIcon}>
        <Popup autoClose={false} closeOnClick={false}>
          <p className="font-medium">You are here</p>
        </Popup>
      </Marker>
    </MapContainer>
  );
}
