import React from 'react';
import { MapContainer, Marker, Polyline, Popup, TileLayer } from 'react-leaflet';
import { useInView } from 'react-intersection-observer';
import L from 'leaflet';
import { Trip } from '@/data/trips';
import { DistanceUnit, distanceLabel, getTotalRouteDistanceKm } from '@/data/tripMetrics';
import 'leaflet/dist/leaflet.css';

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

interface RouteOverviewProps {
  trips: Trip[];
  unit: DistanceUnit;
}

export const RouteOverview: React.FC<RouteOverviewProps> = ({ trips, unit }) => {
  const { ref, inView } = useInView({ triggerOnce: true, rootMargin: '200px 0px' });
  const totalDistanceKm = React.useMemo(() => getTotalRouteDistanceKm(trips), [trips]);

  if (trips.length < 2) return null;

  return (
    <section className="mb-16">
      <div className="mb-4 flex items-end justify-between gap-4">
        <div>
          <h3 className="font-serif text-2xl text-luxury-navy">Route Overview</h3>
          <p className="font-sans text-xs uppercase tracking-[0.2em] font-bold text-luxury-navy/60">
            Total distance {distanceLabel(totalDistanceKm, unit)}
          </p>
        </div>
      </div>
      <div
        ref={ref}
        className="h-[260px] w-full overflow-hidden rounded-2xl border border-luxury-navy/10 bg-white"
        aria-label="Route map showing destination order"
      >
        {inView ? (
          <MapContainer
            center={trips[0].coordinates}
            zoom={2}
            scrollWheelZoom={false}
            className="h-full w-full"
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
            />
            <Polyline
              positions={trips.map((trip) => trip.coordinates)}
              pathOptions={{ color: '#C17767', weight: 3, opacity: 0.85 }}
            />
            {trips.map((trip, index) => (
              <Marker key={trip.id} position={trip.coordinates}>
                <Popup>
                  <span className="font-sans text-xs font-bold">
                    {index + 1}. {trip.destination}
                  </span>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        ) : (
          <div className="flex h-full items-center justify-center bg-luxury-cream">
            <span className="font-sans text-xs uppercase tracking-[0.2em] font-bold text-luxury-navy/50">
              Loading route map...
            </span>
          </div>
        )}
      </div>
    </section>
  );
};
