import React from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for default marker icons in Leaflet with React
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerIconRetina from 'leaflet/dist/images/marker-icon-2x.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

const DefaultIcon = L.icon({
  iconUrl: markerIcon,
  iconRetinaUrl: markerIconRetina,
  shadowUrl: markerShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

L.Marker.prototype.options.icon = DefaultIcon;

interface TripMapProps {
  coordinates: [number, number];
  location: string;
}

export const TripMap: React.FC<TripMapProps> = ({ coordinates, location }) => {
  return (
    <div className="h-[250px] w-full rounded-2xl overflow-hidden border border-luxury-navy/5 relative z-0">
      <MapContainer 
        center={coordinates} 
        zoom={10} 
        scrollWheelZoom={false}
        className="h-full w-full"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
        />
        <Marker position={coordinates}>
          <Popup>
            <span className="font-sans font-bold">{location}</span>
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};
