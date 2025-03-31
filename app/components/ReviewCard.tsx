import type { Review } from '~/lib/types';
import { Card, CardContent } from './ui/card';
import { Star } from 'lucide-react';

export const ReviewCard = ({ review }: { review: Review }) => {
  return (
    <Card key={review.id}>
      <CardContent className="pt-6">
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0">
            {review.avatar ? (
              <img
                src={review.avatar}
                alt={review.author}
                width={40}
                height={40}
                className="object-cover"
              />
            ) : (
              <div className="w-full h-full bg-[#eefaff] flex items-center justify-center text-[#006699] text-sm font-bold">
                {review.author.charAt(0)}
              </div>
            )}
          </div>

          <div className="flex-1">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold">{review.author}</h3>
              <span className="text-sm text-[#939393]">{review.date}</span>
            </div>

            <div className="flex my-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={`w-4 h-4 ${i < review.rating ? 'fill-[#10bc4c] text-[#10bc4c]' : 'fill-[#d0d8e8] text-[#d0d8e8]'}`}
                />
              ))}
            </div>

            <p className="text-[#939393] mt-2">{review.text}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
