import { useTranslation } from 'react-i18next';
import { ErrorBoundary } from 'react-error-boundary';
import { useSwipeable } from 'react-swipeable';
import { cn } from '~/lib/utils';
import { Button } from './button';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useEffect, useState } from 'react';
import type { MobileSliderProps } from '~/types/slider';
import { sliderSchema } from '~/types/slider';

const MobileSlider = ({
  items,
  className,
  onSlideChange,
  showNavigation = true,
  showPagination = true,
  autoPlay = false,
  autoPlayInterval = 5000,
}: MobileSliderProps) => {
  const { t } = useTranslation();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Validate items with Zod schema
  const validatedItems = sliderSchema.parse(items);

  const handleNext = () => {
    const nextIndex = (currentIndex + 1) % validatedItems.length;
    setCurrentIndex(nextIndex);
    onSlideChange?.(nextIndex);
  };

  const handlePrev = () => {
    const prevIndex = (currentIndex - 1 + validatedItems.length) % validatedItems.length;
    setCurrentIndex(prevIndex);
    onSlideChange?.(prevIndex);
  };

  const handlers = useSwipeable({
    onSwipedLeft: handleNext,
    onSwipedRight: handlePrev,
    trackMouse: true,
  });

  // Auto-play functionality
  useEffect(() => {
    if (!autoPlay || isPaused) return;

    const interval = setInterval(handleNext, autoPlayInterval);
    return () => clearInterval(interval);
  }, [autoPlay, autoPlayInterval, isPaused, currentIndex]);

  return (
    <div
      {...handlers}
      className={cn('relative overflow-hidden touch-pan-y', className)}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div
        className="flex transition-transform duration-300 ease-in-out"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {validatedItems.map(item => (
          <div
            key={item.id}
            className="min-w-full flex-shrink-0"
            role="group"
            aria-roledescription="slide"
            aria-label={`${t('Slide')} ${currentIndex + 1} ${t('of')} ${validatedItems.length}`}
          >
            <img
              src={item.imageUrl}
              alt={item.altText || t(item.content)}
              className="w-full h-auto object-cover"
            />
            <p className="text-center mt-2 text-sm text-gray-600">{t(item.content)}</p>
          </div>
        ))}
      </div>

      {showNavigation && (
        <>
          <Button
            onClick={handlePrev}
            className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full"
            aria-label={t('Previous slide')}
          >
            <ChevronLeft className="h-6 w-6" />
          </Button>
          <Button
            onClick={handleNext}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full"
            aria-label={t('Next slide')}
          >
            <ChevronRight className="h-6 w-6" />
          </Button>
        </>
      )}

      {showPagination && (
        <div
          className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2"
          role="tablist"
          aria-label={t('Slide navigation')}
        >
          {validatedItems.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setCurrentIndex(index);
                onSlideChange?.(index);
              }}
              className={`w-2 h-2 rounded-full transition-all ${
                index === currentIndex ? 'bg-white w-4' : 'bg-white/50'
              }`}
              role="tab"
              aria-selected={index === currentIndex}
              aria-label={`${t('Go to slide')} ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

// Error boundary wrapper
const MobileSliderWithErrorBoundary = (props: MobileSliderProps) => (
  <ErrorBoundary
    fallback={<div className="p-4 text-center text-red-500">Error loading slider</div>}
  >
    <MobileSlider {...props} />
  </ErrorBoundary>
);

export default MobileSliderWithErrorBoundary;
