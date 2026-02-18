import { Trip } from './trips';

export type DistanceUnit = 'km' | 'mi';
export type BudgetRange = 'all' | 'budget' | 'mid' | 'luxury';

const EARTH_RADIUS_KM = 6371;

const COUNTRY_TO_CONTINENT: Record<string, string> = {
  Japan: 'Asia',
  Greece: 'Europe',
  Iceland: 'Europe',
};

export const getTripYear = (trip: Trip): string => {
  const match = trip.dateRange.match(/\b(20\d{2})\b/);
  return match ? match[1] : 'Unknown';
};

export const getTripMonth = (trip: Trip): string => {
  const [month = 'Unknown'] = trip.dateRange.split(' ');
  return month;
};

export const getTripCountry = (trip: Trip): string => {
  const parts = trip.destination.split(',');
  return parts[parts.length - 1]?.trim() ?? trip.destination;
};

export const getTripContinent = (trip: Trip): string => {
  return COUNTRY_TO_CONTINENT[getTripCountry(trip)] ?? 'Other';
};

export const getTripDurationDays = (trip: Trip): number => {
  const match = trip.duration.match(/\d+/);
  return match ? Number(match[0]) : 0;
};

export const getBudgetRange = (totalCost: number): Exclude<BudgetRange, 'all'> => {
  if (totalCost < 2000) return 'budget';
  if (totalCost <= 2600) return 'mid';
  return 'luxury';
};

export const toMiles = (km: number): number => km * 0.621371;

export const fromUnit = (distanceKm: number, unit: DistanceUnit): number => {
  return unit === 'mi' ? toMiles(distanceKm) : distanceKm;
};

export const distanceLabel = (distanceKm: number, unit: DistanceUnit): string => {
  const converted = fromUnit(distanceKm, unit);
  return `${converted.toFixed(0)} ${unit}`;
};

export const haversineKm = (a: [number, number], b: [number, number]): number => {
  const toRad = (value: number): number => (value * Math.PI) / 180;
  const lat1 = toRad(a[0]);
  const lon1 = toRad(a[1]);
  const lat2 = toRad(b[0]);
  const lon2 = toRad(b[1]);

  const dLat = lat2 - lat1;
  const dLon = lon2 - lon1;

  const h =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLon / 2) ** 2;
  const c = 2 * Math.atan2(Math.sqrt(h), Math.sqrt(1 - h));
  return EARTH_RADIUS_KM * c;
};

export const getTotalRouteDistanceKm = (items: Trip[]): number => {
  if (items.length < 2) return 0;
  return items.slice(1).reduce((total, trip, index) => {
    return total + haversineKm(items[index].coordinates, trip.coordinates);
  }, 0);
};

export interface TripInsights {
  mostExpensiveTrip: Trip | null;
  bestWeatherMonth: string;
  averageDailySpend: number;
}

export const getTripInsights = (items: Trip[]): TripInsights => {
  if (items.length === 0) {
    return {
      mostExpensiveTrip: null,
      bestWeatherMonth: 'N/A',
      averageDailySpend: 0,
    };
  }

  const mostExpensiveTrip = items.reduce((highest, current) =>
    current.totalCost > highest.totalCost ? current : highest
  );

  const warmestTrip = items.reduce((warmest, current) =>
    current.weather.temp > warmest.weather.temp ? current : warmest
  );

  const totals = items.reduce(
    (acc, trip) => {
      const days = getTripDurationDays(trip) || 1;
      return {
        totalCost: acc.totalCost + trip.totalCost,
        totalDays: acc.totalDays + days,
      };
    },
    { totalCost: 0, totalDays: 0 }
  );

  return {
    mostExpensiveTrip,
    bestWeatherMonth: getTripMonth(warmestTrip),
    averageDailySpend: totals.totalDays > 0 ? totals.totalCost / totals.totalDays : 0,
  };
};
