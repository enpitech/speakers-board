import { Star } from 'lucide-react';
import { Text } from './Text';
export const RatingStars = ({ rating, reviewsCount }: { rating: number; reviewsCount: number }) => {
  return (
    <div className="flex items-center justify-between">
      <Text variant="h2" size="lg">
        Reviews
      </Text>
      <div className="flex items-center gap-2">
        <Text variant="span" size="lg">
          {rating}.0
        </Text>
        <div className="flex">
          {Array.from({ length: rating }).map((_, i) => (
            <Star
              key={i}
              className={`w-5 h-5 ${i < rating ? 'fill-[#10bc4c] text-[#10bc4c]' : 'fill-[#d0d8e8] text-[#d0d8e8]'}`}
            />
          ))}
        </div>
        <Text variant="span" size="sm">
          ({reviewsCount} reviews)
        </Text>
      </div>
    </div>
  );
};
