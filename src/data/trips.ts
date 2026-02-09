export interface Trip {
  id: string;
  destination: string;
  location: string;
  coordinates: [number, number];
  dateRange: string;
  duration: string;
  weather: {
    temp: number;
    condition: 'sunny' | 'cloudy' | 'rainy';
    season: 'Spring' | 'Summer' | 'Autumn' | 'Winter';
  };
  expenses: {
    category: string;
    amount: number;
    color: string;
  }[];
  totalCost: number;
  notes: string;
  tags: string[];
  photos: string[];
}

export const trips: Trip[] = [
  {
    id: '1',
    destination: 'Tokyo, Japan',
    location: 'Shibuya, Tokyo',
    coordinates: [35.661777, 139.704051],
    dateRange: 'March 15 - March 28, 2025',
    duration: '14 Days',
    weather: {
      temp: 15,
      condition: 'sunny',
      season: 'Spring'
    },
    expenses: [
      { category: 'Accommodation', amount: 800, color: '#C17767' },
      { category: 'Food', amount: 400, color: '#8AA399' },
      { category: 'Activities', amount: 300, color: '#1A2238' },
      { category: 'Transport', amount: 200, color: '#E5E7EB' }
    ],
    totalCost: 1700,
    notes: "The cherry blossoms were in full bloom. Tokyo is a fascinating mix of ancient traditions and futuristic technology. Shibuya crossing at night is an experience I'll never forget.",
    tags: ['Cultural', 'Food', 'Urban'],
    photos: [
      'https://images.unsplash.com/photo-1542051841857-5f90071e7989?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1524413840807-0c3cb6fa808d?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1528164344705-47542687990d?auto=format&fit=crop&q=80&w=800'
    ]
  },
  {
    id: '2',
    destination: 'Santorini, Greece',
    location: 'Oia, Santorini',
    coordinates: [36.4618, 25.3753],
    dateRange: 'July 10 - July 20, 2024',
    duration: '10 Days',
    weather: {
      temp: 28,
      condition: 'sunny',
      season: 'Summer'
    },
    expenses: [
      { category: 'Accommodation', amount: 1200, color: '#C17767' },
      { category: 'Food', amount: 500, color: '#8AA399' },
      { category: 'Activities', amount: 400, color: '#1A2238' },
      { category: 'Transport', amount: 300, color: '#E5E7EB' }
    ],
    totalCost: 2400,
    notes: "Waking up to the view of the caldera was surreal. The sunsets in Oia are truly the most beautiful in the world. The white-washed buildings against the deep blue sea are stunning.",
    tags: ['Beach', 'Romance', 'Relaxation'],
    photos: [
      'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1516483638261-f4dbaf036963?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1469796466635-455ede028674?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1507501336603-6e31db2be093?auto=format&fit=crop&q=80&w=800'
    ]
  },
  {
    id: '3',
    destination: 'Reykjavik, Iceland',
    location: 'Golden Circle, Iceland',
    coordinates: [64.1466, -21.9426],
    dateRange: 'November 5 - November 12, 2024',
    duration: '7 Days',
    weather: {
      temp: 2,
      condition: 'cloudy',
      season: 'Winter'
    },
    expenses: [
      { category: 'Accommodation', amount: 900, color: '#C17767' },
      { category: 'Food', amount: 600, color: '#8AA399' },
      { category: 'Activities', amount: 800, color: '#1A2238' },
      { category: 'Transport', amount: 400, color: '#E5E7EB' }
    ],
    totalCost: 2700,
    notes: "Seeing the Northern Lights was a bucket-list dream come true. The landscapes are otherworldly—waterfalls, geysers, and black sand beaches. It felt like being on another planet.",
    tags: ['Adventure', 'Nature', 'Photography'],
    photos: [
      'https://images.unsplash.com/photo-1476610182048-b716b8518aae?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1520634122165-224147bcd721?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1504893524553-f8591ce2c0dd?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1490750967868-88aa4486c946?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1517411032315-54ef2cb783bb?auto=format&fit=crop&q=80&w=800'
    ]
  }
];
