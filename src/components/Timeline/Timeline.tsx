import React, { useEffect, useMemo, useState } from 'react';
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion';
import { Search } from 'lucide-react';
import { type Trip } from '@/data/trips';
import {
  type BudgetRange,
  type DistanceUnit,
  distanceLabel,
  getBudgetRange,
  getTripContinent,
  getTripCountry,
  getTripInsights,
  getTripYear,
  getTotalRouteDistanceKm,
  haversineKm,
} from '@/data/tripMetrics';
import { TripCard } from '../TripCard/TripCard';
import { RouteOverview } from './RouteOverview';

type LayoutMode = 'alternating' | 'stacked';

const STORAGE_KEY = 'travel-timeline-preferences-v1';

interface TimelinePreferences {
  year: string;
  country: string;
  continent: string;
  season: string;
  budget: BudgetRange;
  tag: string;
  search: string;
  unit: DistanceUnit;
  layout: LayoutMode;
}

const defaultPreferences: TimelinePreferences = {
  year: 'all',
  country: 'all',
  continent: 'all',
  season: 'all',
  budget: 'all',
  tag: 'all',
  search: '',
  unit: 'km',
  layout: 'alternating',
};

interface TimelineProps {
  trips: Trip[];
}

export const Timeline: React.FC<TimelineProps> = ({ trips }) => {
  const [yearFilter, setYearFilter] = useState<string>(defaultPreferences.year);
  const [countryFilter, setCountryFilter] = useState<string>(defaultPreferences.country);
  const [continentFilter, setContinentFilter] = useState<string>(defaultPreferences.continent);
  const [seasonFilter, setSeasonFilter] = useState<string>(defaultPreferences.season);
  const [budgetFilter, setBudgetFilter] = useState<BudgetRange>(defaultPreferences.budget);
  const [tagFilter, setTagFilter] = useState<string>(defaultPreferences.tag);
  const [distanceUnit, setDistanceUnit] = useState<DistanceUnit>(defaultPreferences.unit);
  const [layoutMode, setLayoutMode] = useState<LayoutMode>(defaultPreferences.layout);
  const [searchQuery, setSearchQuery] = useState<string>(defaultPreferences.search);
  const [compareTripIds, setCompareTripIds] = useState<string[]>([]);
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  const yearOptions = useMemo(
    () => ['all', ...new Set(trips.map((trip) => getTripYear(trip)).filter((year) => year !== 'Unknown'))],
    [trips]
  );
  const countryOptions = useMemo(() => ['all', ...new Set(trips.map((trip) => getTripCountry(trip)))], [trips]);
  const continentOptions = useMemo(() => ['all', ...new Set(trips.map((trip) => getTripContinent(trip)))], [trips]);
  const seasonOptions = useMemo(() => ['all', ...new Set(trips.map((trip) => trip.weather.season))], [trips]);
  const tagOptions = useMemo(() => ['all', ...new Set(trips.flatMap((trip) => trip.tags))], [trips]);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return;

    try {
      const parsed = JSON.parse(raw) as Partial<TimelinePreferences>;
      setYearFilter(parsed.year ?? defaultPreferences.year);
      setCountryFilter(parsed.country ?? defaultPreferences.country);
      setContinentFilter(parsed.continent ?? defaultPreferences.continent);
      setSeasonFilter(parsed.season ?? defaultPreferences.season);
      setBudgetFilter(parsed.budget ?? defaultPreferences.budget);
      setTagFilter(parsed.tag ?? defaultPreferences.tag);
      setSearchQuery(parsed.search ?? defaultPreferences.search);
      setDistanceUnit(parsed.unit ?? defaultPreferences.unit);
      setLayoutMode(parsed.layout ?? defaultPreferences.layout);
    } catch {
      window.localStorage.removeItem(STORAGE_KEY);
    }
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const preferences: TimelinePreferences = {
      year: yearFilter,
      country: countryFilter,
      continent: continentFilter,
      season: seasonFilter,
      budget: budgetFilter,
      tag: tagFilter,
      search: searchQuery,
      unit: distanceUnit,
      layout: layoutMode,
    };
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(preferences));
  }, [
    budgetFilter,
    continentFilter,
    countryFilter,
    distanceUnit,
    layoutMode,
    searchQuery,
    seasonFilter,
    tagFilter,
    yearFilter,
  ]);

  const filteredTrips = useMemo(() => {
    return trips.filter((trip) => {
      const matchesYear = yearFilter === 'all' || getTripYear(trip) === yearFilter;
      const matchesCountry = countryFilter === 'all' || getTripCountry(trip) === countryFilter;
      const matchesContinent =
        continentFilter === 'all' || getTripContinent(trip) === continentFilter;
      const matchesSeason = seasonFilter === 'all' || trip.weather.season === seasonFilter;
      const matchesBudget = budgetFilter === 'all' || getBudgetRange(trip.totalCost) === budgetFilter;
      const matchesTag = tagFilter === 'all' || trip.tags.includes(tagFilter);
      const query = searchQuery.trim().toLowerCase();
      const matchesSearch =
        query.length === 0 ||
        trip.destination.toLowerCase().includes(query) ||
        trip.location.toLowerCase().includes(query) ||
        trip.notes.toLowerCase().includes(query) ||
        trip.tags.some((tag) => tag.toLowerCase().includes(query));

      return (
        matchesYear &&
        matchesCountry &&
        matchesContinent &&
        matchesSeason &&
        matchesBudget &&
        matchesTag &&
        matchesSearch
      );
    });
  }, [budgetFilter, continentFilter, countryFilter, searchQuery, seasonFilter, tagFilter, trips, yearFilter]);

  const legDistancesKm = useMemo(() => {
    return filteredTrips.map((trip, index) => {
      if (index === 0) return 0;
      return haversineKm(filteredTrips[index - 1].coordinates, trip.coordinates);
    });
  }, [filteredTrips]);

  const insights = useMemo(() => getTripInsights(filteredTrips), [filteredTrips]);
  const totalRouteDistanceKm = useMemo(() => getTotalRouteDistanceKm(filteredTrips), [filteredTrips]);

  const compareTrips = useMemo(() => {
    const byId = new Map<string, Trip>(trips.map((trip) => [trip.id, trip]));
    return compareTripIds
      .map((id) => byId.get(id))
      .filter((trip): trip is Trip => Boolean(trip));
  }, [compareTripIds, trips]);

  const toggleCompare = (tripId: string): void => {
    setCompareTripIds((current) => {
      if (current.includes(tripId)) {
        return current.filter((id) => id !== tripId);
      }
      if (current.length >= 2) return current;
      return [...current, tripId];
    });
  };

  const { scrollYProgress } = useScroll();
  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <section className="relative min-h-screen px-6 py-24" id="timeline">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-serif text-5xl md:text-6xl text-luxury-navy mb-12"
          >
            A Journey Through <span className="italic">Time</span>
          </motion.h2>

          <div className="mb-10 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex flex-col gap-2 text-left">
              <label
                className="font-sans text-[10px] uppercase tracking-[0.2em] font-bold text-luxury-navy/60"
                htmlFor="timeline-search"
              >
                Search
              </label>
              <div className="relative group">
                <motion.div
                  animate={{ width: isSearchFocused ? 320 : 280 }}
                  className={`flex items-center gap-3 px-4 py-2 rounded-full border transition-all duration-300 ${
                    isSearchFocused
                      ? 'border-luxury-terracotta bg-white shadow-lg'
                      : 'border-luxury-navy/10 bg-luxury-navy/5'
                  }`}
                >
                  <Search size={16} className={isSearchFocused ? 'text-luxury-terracotta' : 'text-luxury-navy/40'} />
                  <input
                    id="timeline-search"
                    type="text"
                    placeholder="Search destination or memories..."
                    value={searchQuery}
                    onChange={(event) => setSearchQuery(event.target.value)}
                    onFocus={() => setIsSearchFocused(true)}
                    onBlur={() => setIsSearchFocused(false)}
                    className="w-full border-none bg-transparent font-sans text-sm outline-none placeholder:text-luxury-navy/30"
                    aria-label="Search trips"
                  />
                </motion.div>
              </div>
            </div>

            <div className="flex flex-col gap-2 text-left">
              <label className="font-sans text-[10px] uppercase tracking-[0.2em] font-bold text-luxury-navy/60">
                Units
              </label>
              <div className="flex gap-2">
                {(['km', 'mi'] as DistanceUnit[]).map((unit) => (
                  <button
                    key={unit}
                    type="button"
                    onClick={() => setDistanceUnit(unit)}
                    className={`rounded-full px-5 py-2 font-sans text-xs uppercase tracking-[0.2em] font-bold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-luxury-terracotta ${
                      distanceUnit === unit
                        ? 'bg-luxury-terracotta text-white'
                        : 'bg-luxury-navy/5 text-luxury-navy hover:bg-luxury-navy/10'
                    }`}
                    aria-pressed={distanceUnit === unit}
                  >
                    {unit}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-2 text-left">
              <label className="font-sans text-[10px] uppercase tracking-[0.2em] font-bold text-luxury-navy/60">
                Layout
              </label>
              <div className="flex gap-2">
                {(['alternating', 'stacked'] as LayoutMode[]).map((mode) => (
                  <button
                    key={mode}
                    type="button"
                    onClick={() => setLayoutMode(mode)}
                    className={`rounded-full px-5 py-2 font-sans text-xs uppercase tracking-[0.2em] font-bold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-luxury-terracotta ${
                      layoutMode === mode
                        ? 'bg-luxury-terracotta text-white'
                        : 'bg-luxury-navy/5 text-luxury-navy hover:bg-luxury-navy/10'
                    }`}
                    aria-pressed={layoutMode === mode}
                  >
                    {mode}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="mb-20 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
            <select
              value={yearFilter}
              onChange={(event) => setYearFilter(event.target.value)}
              className="rounded-full border border-luxury-navy/10 bg-white px-4 py-2 font-sans text-xs uppercase tracking-[0.15em] font-bold text-luxury-navy focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-luxury-terracotta"
              aria-label="Filter by year"
            >
              {yearOptions.map((option) => (
                <option key={option} value={option}>
                  {option === 'all' ? 'Year: All' : option}
                </option>
              ))}
            </select>
            <select
              value={countryFilter}
              onChange={(event) => setCountryFilter(event.target.value)}
              className="rounded-full border border-luxury-navy/10 bg-white px-4 py-2 font-sans text-xs uppercase tracking-[0.15em] font-bold text-luxury-navy focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-luxury-terracotta"
              aria-label="Filter by country"
            >
              {countryOptions.map((option) => (
                <option key={option} value={option}>
                  {option === 'all' ? 'Country: All' : option}
                </option>
              ))}
            </select>
            <select
              value={continentFilter}
              onChange={(event) => setContinentFilter(event.target.value)}
              className="rounded-full border border-luxury-navy/10 bg-white px-4 py-2 font-sans text-xs uppercase tracking-[0.15em] font-bold text-luxury-navy focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-luxury-terracotta"
              aria-label="Filter by continent"
            >
              {continentOptions.map((option) => (
                <option key={option} value={option}>
                  {option === 'all' ? 'Continent: All' : option}
                </option>
              ))}
            </select>
            <select
              value={seasonFilter}
              onChange={(event) => setSeasonFilter(event.target.value)}
              className="rounded-full border border-luxury-navy/10 bg-white px-4 py-2 font-sans text-xs uppercase tracking-[0.15em] font-bold text-luxury-navy focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-luxury-terracotta"
              aria-label="Filter by season"
            >
              {seasonOptions.map((option) => (
                <option key={option} value={option}>
                  {option === 'all' ? 'Season: All' : option}
                </option>
              ))}
            </select>
            <select
              value={budgetFilter}
              onChange={(event) => setBudgetFilter(event.target.value as BudgetRange)}
              className="rounded-full border border-luxury-navy/10 bg-white px-4 py-2 font-sans text-xs uppercase tracking-[0.15em] font-bold text-luxury-navy focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-luxury-terracotta"
              aria-label="Filter by budget"
            >
              <option value="all">Budget: All</option>
              <option value="budget">Budget (&lt;$2000)</option>
              <option value="mid">Mid ($2000-$2600)</option>
              <option value="luxury">Luxury (&gt;$2600)</option>
            </select>
            <select
              value={tagFilter}
              onChange={(event) => setTagFilter(event.target.value)}
              className="rounded-full border border-luxury-navy/10 bg-white px-4 py-2 font-sans text-xs uppercase tracking-[0.15em] font-bold text-luxury-navy focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-luxury-terracotta"
              aria-label="Filter by tag"
            >
              {tagOptions.map((option) => (
                <option key={option} value={option}>
                  {option === 'all' ? 'Tags: All' : option}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-20 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="rounded-2xl border border-luxury-navy/10 bg-white p-5 text-left">
              <p className="font-sans text-[10px] uppercase tracking-[0.2em] font-bold text-luxury-navy/60 mb-2">
                Most Expensive Destination
              </p>
              <p className="font-serif text-2xl text-luxury-navy">
                {insights.mostExpensiveTrip?.destination ?? 'N/A'}
              </p>
            </div>
            <div className="rounded-2xl border border-luxury-navy/10 bg-white p-5 text-left">
              <p className="font-sans text-[10px] uppercase tracking-[0.2em] font-bold text-luxury-navy/60 mb-2">
                Best Weather Month
              </p>
              <p className="font-serif text-2xl text-luxury-navy">{insights.bestWeatherMonth}</p>
            </div>
            <div className="rounded-2xl border border-luxury-navy/10 bg-white p-5 text-left">
              <p className="font-sans text-[10px] uppercase tracking-[0.2em] font-bold text-luxury-navy/60 mb-2">
                Average Daily Spend
              </p>
              <p className="font-serif text-2xl text-luxury-navy">${insights.averageDailySpend.toFixed(0)}</p>
            </div>
          </div>

          <div className="mb-12 rounded-2xl border border-luxury-navy/10 bg-white p-5 text-left">
            <p className="font-sans text-[10px] uppercase tracking-[0.2em] font-bold text-luxury-navy/60 mb-2">
              Compare Trips
            </p>
            {compareTrips.length === 0 ? (
              <p className="font-sans text-sm text-luxury-navy/70">
                Select up to 2 trips using each card&apos;s Compare button.
              </p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {compareTrips.map((trip) => {
                  const dailySpend = trip.totalCost / Math.max(1, Number(trip.duration.match(/\d+/)?.[0] ?? 1));
                  return (
                    <div key={trip.id} className="rounded-xl border border-luxury-navy/10 p-4">
                      <p className="font-serif text-xl text-luxury-navy">{trip.destination}</p>
                      <div className="mt-3 space-y-1 font-sans text-xs uppercase tracking-[0.15em] font-bold text-luxury-navy/70">
                        <p>Total Cost: ${trip.totalCost}</p>
                        <p>Daily Spend: ${dailySpend.toFixed(0)}</p>
                        <p>Weather: {trip.weather.temp}°C</p>
                        <p>Duration: {trip.duration}</p>
                        <p>Country: {getTripCountry(trip)}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {filteredTrips.length > 1 && (
            <div className="mb-12">
              <p className="font-sans text-[10px] uppercase tracking-[0.2em] font-bold text-luxury-navy/60 mb-2 text-left">
                Filtered route distance {distanceLabel(totalRouteDistanceKm, distanceUnit)}
              </p>
            </div>
          )}
        </div>

        <RouteOverview trips={filteredTrips} unit={distanceUnit} />

        <div className="relative">
          {layoutMode === 'alternating' && (
            <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-[2px] bg-luxury-navy/10 hidden md:block" />
          )}

          {layoutMode === 'alternating' && (
            <motion.div
              style={{ scaleY }}
              className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-[2px] bg-luxury-terracotta origin-top z-10 hidden md:block"
            />
          )}

          <div className="space-y-32">
            <AnimatePresence mode="popLayout">
              {filteredTrips.map((trip, index) => (
                <TripCard
                  key={trip.id}
                  trip={trip}
                  layoutMode={layoutMode}
                  isLeft={index % 2 === 0}
                  legDistanceKm={legDistancesKm[index] ?? 0}
                  distanceUnit={distanceUnit}
                  compareSelected={compareTripIds.includes(trip.id)}
                  compareDisabled={compareTripIds.length >= 2 && !compareTripIds.includes(trip.id)}
                  onToggleCompare={toggleCompare}
                />
              ))}
            </AnimatePresence>

            {filteredTrips.length === 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-20"
              >
                <p className="font-serif text-2xl text-luxury-navy/30 italic">No memories found for this filter...</p>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
