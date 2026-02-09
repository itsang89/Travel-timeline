Create an award-winning interactive Travel Memory Timeline web application with cinematic animations and luxury travel aesthetic. The app should feel like a premium travel magazine brought to life.

VISUAL DESIGN & AESTHETIC:
- Modern luxury travel design inspired by Four Seasons and Airbnb's immersive storytelling
- Smooth scrolling with parallax effects (200-500ms transitions for all animations)
- Color palette: Warm earth tones (terracotta, sage green, cream) with deep navy accents
- Typography: Elegant serif headings (Playfair Display or Cormorant) paired with clean sans-serif body text (Inter or Manrope)
- High-quality placeholder travel imagery with soft shadows and subtle hover scale effects (1.05x zoom)
- Glassmorphism cards with backdrop blur for modern depth
- Generous white space and breathing room between sections

LAYOUT & STRUCTURE:
1. Hero Section:
   - Full-screen immersive header with animated gradient overlay
   - Large typography: "My Travel Memories"
   - Subtle scroll indicator with bounce animation
   - Background: slow Ken Burns zoom effect on hero image

2. Interactive Vertical Timeline (Main Feature):
   - Vertical line down center with animated progress indicator as user scrolls
   - Timeline nodes appear with stagger animation (fade up + scale from 0.8 to 1)
   - Each destination card alternates left/right of timeline
   - Scroll-triggered reveals: elements animate into view only when 20% visible
   - Smooth easing curves (ease-out cubic-bezier) for all transitions

3. Destination Cards (Per Trip):
   Each card contains:
   
   a) Photo Carousel:
   - Horizontal swipeable gallery with 4-5 travel photos
   - Smooth slide transitions with momentum scrolling
   - Thumbnail navigation dots below
   - Lightbox modal on click with smooth fade-in backdrop
   - Arrow navigation with hover states (opacity 0.6 to 1.0)
   
   b) Trip Header:
   - Destination name (large, bold)
   - Date range with calendar icon
   - Location pin icon with coordinates
   - Duration badge with subtle pill background
   
   c) Interactive Map Section:
   - Embedded map showing destination marker
   - Animated path line drawing from previous location to current
   - Hover state reveals distance traveled and travel time
   - Subtle shadow elevation on hover
   - Pan and zoom enabled with smooth inertia
   
   d) Weather Visualization:
   - Weather icon (sunny/cloudy/rainy) with color-coded background
   - Temperature range displayed as gradient thermometer bar
   - Best season indicator with leaf/snowflake icons
   - Animated weather transition effects
   
   e) Expense Breakdown:
   - Donut chart showing spending categories (Accommodation, Food, Activities, Transport)
   - Color-coded segments with smooth rotation animation on load
   - Center shows total trip cost with currency symbol
   - Hover reveals exact amounts and percentages
   - Legend with category icons below
   
   f) Memory Notes:
   - Text area with favorite moments/highlights
   - Quote-style formatting with subtle border-left accent
   - Character limit: 200-300 words
   - Fade-in animation when scrolled into view
   
   g) Tags/Highlights:
   - Pill-shaped tags (e.g., "Beach", "Adventure", "Cultural", "Food")
   - Soft background colors per category
   - Hover effect: slight scale up and deeper color

4. Filtering & Navigation:
   - Sticky navigation bar at top (becomes solid on scroll with backdrop blur)
   - Filter buttons: All, 2025, 2024, Asia, Europe, Americas
   - Active filter highlighted with smooth underline animation
   - Search bar with smooth expand animation on focus
   - Filtered items fade out/in with stagger effect (not instant removal)

5. Statistics Dashboard (Top Section):
   - Animated counter: Total countries visited (counts up on page load)
   - Total distance traveled with animated progress arc
   - Total trips with icon
   - Favorite destination badge with star icon
   - Grid layout with glassmorphism cards
   - Micro-interactions on hover (lift effect with shadow increase)

6. Footer:
   - Add new trip button (prominent CTA with gradient background)
   - Export timeline as PDF option
   - Social share icons with hover color transitions
   - Minimalist design with ample padding

ANIMATION SPECIFICATIONS:
- Page load: Stagger cascade of elements (hero → stats → timeline, 100ms delays)
- Scroll animations: Use Intersection Observer for performance
- Timeline nodes: Scale from 0.8 to 1.0 with fade (300ms ease-out)
- Card hover: Translate Y -8px with shadow expansion (200ms)
- Image carousel: Slide with 400ms cubic-bezier easing
- Chart animations: Draw on scroll with 800ms duration
- Button hover: Scale 1.03 with color saturation increase (200ms)
- Modal open/close: Backdrop fade + content scale (400ms)
- Map path drawing: Animate stroke-dashoffset over 1200ms
- Counter animations: Smooth count-up with easing (1500ms total)

TECHNICAL REQUIREMENTS:
- Build with React (functional components with hooks)
- Use Framer Motion or GSAP for advanced animations
- Responsive design: Mobile-first approach (breakpoints: 640px, 1024px, 1536px)
- Smooth scroll library (Lenis or Locomotive Scroll)
- Chart library: Chart.js or Recharts for expense visualization
- Map integration: Leaflet or Mapbox GL with custom styling
- Image optimization with lazy loading
- Dark mode toggle with smooth theme transition
- Accessibility: ARIA labels, keyboard navigation, screen reader support

SAMPLE DATA (Use 3 Example Trips):
1. Tokyo, Japan - March 2025
   - Photos: 5 (cherry blossoms, temples, street food, skyline, traditional garden)
   - Weather: 15°C, Spring, Mild
   - Expenses: Accommodation $800, Food $400, Activities $300, Transport $200
   - Tags: Cultural, Food, Urban

2. Santorini, Greece - July 2024
   - Photos: 5 (white buildings, sunset, beaches, local cuisine, coastal views)
   - Weather: 28°C, Summer, Sunny
   - Expenses: Accommodation $1200, Food $500, Activities $400, Transport $300
   - Tags: Beach, Romance, Relaxation

3. Reykjavik, Iceland - November 2024
   - Photos: 5 (Northern lights, waterfalls, geysers, Blue Lagoon, volcanic landscape)
   - Weather: 2°C, Winter, Variable
   - Expenses: Accommodation $900, Food $600, Activities $800, Transport $400
   - Tags: Adventure, Nature, Photography

INTERACTION DETAILS:
- Smooth page transitions between sections
- Parallax background images moving at 0.5x scroll speed
- Cursor changes on interactive elements (pointer with scale feedback)
- Loading states with skeleton screens (not spinners)
- Toast notifications for actions with slide-in animation
- Haptic feedback consideration for mobile interactions

OUTPUT REQUIREMENTS:
- Single page application
- Clean, production-ready code with comments
- Modular component structure
- Performance optimized (Lighthouse score 90+)
- No placeholder "Lorem ipsum" - use realistic travel content
- Deploy-ready with all assets included

Focus on creating a luxurious, magazine-quality experience that makes users feel like they're reliving their travels through a beautifully crafted digital memory book. Every interaction should feel intentional, smooth, and delightful.
