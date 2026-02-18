import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { useInView } from 'react-intersection-observer';
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
  const { ref, inView } = useInView({ triggerOnce: true, rootMargin: '180px 0px' });

  return (
    <div
      ref={ref}
      className="h-[250px] w-full relative z-0 overflow-hidden rounded-2xl border border-luxury-navy/5"
      aria-label={`Map for ${location}`}
    >
      {inView ? (
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
      ) : (
        <div className="flex h-full items-center justify-center bg-luxury-cream">
          <span className="font-sans text-[10px] uppercase tracking-[0.2em] font-bold text-luxury-navy/50">
            Loading map...
          </span>
        </div>
      )}
    </div>
  );
};
