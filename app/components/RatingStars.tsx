import { Star } from 'lucide-react';

export const RatingStars = ({ rating, reviewsCount }: { rating: number; reviewsCount: number }) => {
  return (
    <div className="flex items-center justify-between">
      <h2 className="text-2xl font-semibold text-[#006699]">Reviews</h2>
      <div className="flex items-center gap-2">
        <span className="font-bold text-lg text-[#10bc4c]">{rating}.0</span>
        <div className="flex">
          {Array.from({ length: rating }).map((_, i) => (
            <Star
              key={i}
              className={`w-5 h-5 ${i < rating ? 'fill-[#10bc4c] text-[#10bc4c]' : 'fill-[#d0d8e8] text-[#d0d8e8]'}`}
            />
          ))}
        </div>
        <span className="text-[#939393]">({reviewsCount} reviews)</span>
      </div>
    </div>
  );
};
