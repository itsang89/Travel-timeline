# AGENTS.md - Travel Timeline Project

## Build Commands

```bash
# Development server
npm run dev

# Production build (type check + vite build)
npm run build

# Preview production build
npm run preview

# Linting
npm run lint
```

**Note:** No testing framework is configured yet. To add tests, install Vitest or Jest first.

## Tech Stack

- **Framework:** React 18 + TypeScript 5.2
- **Build Tool:** Vite 5.1
- **Styling:** Tailwind CSS 3.4
- **Animations:** Framer Motion
- **Icons:** Lucide React
- **Maps:** Leaflet + React Leaflet
- **Charts:** Chart.js + React Chart.js 2
- **Carousel:** Embla Carousel
- **Scrolling:** Lenis (smooth scroll)

## Code Style Guidelines

### TypeScript

- **Strict mode enabled** - no implicit any
- Use explicit return types for components: `React.FC<PropsType>`
- Interface naming: `ComponentNameProps` for props
- Path alias: `@/*` maps to `src/*`
- Export types from data files (e.g., `export interface Trip`)

### React Components

- Use functional components with hooks
- **Named exports only**: `export const ComponentName`
- Props interface defined above component
- File naming: PascalCase (e.g., `TripCard.tsx`)
- Component folder structure: `ComponentName/ComponentName.tsx`

Example:
```typescript
interface TripCardProps {
  trip: Trip;
  index: number;
  isLeft: boolean;
}

export const TripCard: React.FC<TripCardProps> = ({ trip, index, isLeft }) => {
  // Component logic
};
```

### Imports (Ordered)

1. React imports
2. Third-party libraries (framer-motion, etc.)
3. Icon imports (lucide-react)
4. Local imports (@/data, @/components)
5. Relative imports (./SubComponent)

### Styling (Tailwind)

- Use **custom luxury color palette**:
  - `luxury-terracotta` (#C17767) - primary accent
  - `luxury-sage` (#8AA399) - secondary
  - `luxury-cream` (#F9F7F2) - background
  - `luxury-navy` (#1A2238) - text primary

- **Class ordering convention**:
  1. Layout (flex, grid, position)
  2. Sizing (w-, h-)
  3. Spacing (p-, m-, gap-)
  4. Colors (bg-, text-, border-)
  5. Effects (shadow-, rounded-)
  6. Transitions/animations

- **Typography**:
  - Headings: `font-serif` (Playfair Display)
  - Body: `font-sans` (Manrope)
  - Labels: `text-[10px] uppercase tracking-[0.3em] font-bold`

- Glassmorphism: Use `glass` utility class

### Animations

- Use Framer Motion for all animations
- Preferred easing: `[0.22, 1, 0.36, 1]` (luxury smooth)
- Viewport triggers: `viewport={{ once: true }}`
- Layout animations: `layout` prop for reordering

### State Management

- useState for local component state
- useMemo for filtered/computed data
- useScroll and useSpring from framer-motion for scroll-linked animations

### Project Structure

```
src/
├── app/              # Layout providers
├── components/       # React components
│   ├── ComponentName/
│   │   └── ComponentName.tsx
│   └── SubComponent.tsx
├── data/            # Types and static data
│   └── trips.ts
├── main.tsx         # Entry point
└── App.tsx          # Root component
```

### Error Handling

- No explicit error boundaries configured
- Use optional chaining and null checks for data access
- Framer Motion AnimatePresence for exit animations on removal

### Git

- No commit hooks configured
- No CI/CD pipelines set up
