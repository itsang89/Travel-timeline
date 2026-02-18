import React from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PhotoCarouselProps {
  photos: string[];
}

export const PhotoCarousel: React.FC<PhotoCarouselProps> = ({ photos }) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, skipSnaps: false });
  const [selectedIndex, setSelectedIndex] = React.useState(0);

  const scrollPrev = React.useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
  const scrollNext = React.useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);

  const onSelect = React.useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  React.useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on('select', onSelect);
    emblaApi.on('reInit', onSelect);
    return () => {
      emblaApi.off('select', onSelect);
      emblaApi.off('reInit', onSelect);
    };
  }, [emblaApi, onSelect]);

  const onCarouselKeyDown = (event: React.KeyboardEvent<HTMLDivElement>): void => {
    if (event.key === 'ArrowLeft') {
      event.preventDefault();
      scrollPrev();
    }
    if (event.key === 'ArrowRight') {
      event.preventDefault();
      scrollNext();
    }
  };

  return (
    <div
      className="relative group overflow-hidden rounded-2xl"
      role="region"
      aria-roledescription="carousel"
      aria-label="Trip photos"
      tabIndex={0}
      onKeyDown={onCarouselKeyDown}
    >
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex">
          {photos.map((photo, index) => (
            <div key={index} className="flex-[0_0_100%] min-w-0 relative h-[400px]">
              <img
                src={photo}
                alt={`Trip photo ${index + 1}`}
                loading={index === 0 ? 'eager' : 'lazy'}
                decoding="async"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Buttons */}
      <button
        onClick={scrollPrev}
        className="absolute left-4 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/20 text-white opacity-0 backdrop-blur-md transition-opacity hover:bg-white/40 group-hover:opacity-100 focus-visible:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
        aria-label="Previous photo"
      >
        <ChevronLeft size={20} />
      </button>
      <button
        onClick={scrollNext}
        className="absolute right-4 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/20 text-white opacity-0 backdrop-blur-md transition-opacity hover:bg-white/40 group-hover:opacity-100 focus-visible:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
        aria-label="Next photo"
      >
        <ChevronRight size={20} />
      </button>

      {/* Pagination Dots */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
        {photos.map((_, index) => (
              <button
                key={index}
                onClick={() => emblaApi?.scrollTo(index)}
                aria-label={`Go to photo ${index + 1}`}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === selectedIndex ? 'bg-white w-6' : 'bg-white/40'
                } focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white`}
              />
            ))}
          </div>
    </div>
  );
};
