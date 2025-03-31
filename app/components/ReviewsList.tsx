import { MessageSquare, Star } from 'lucide-react';
import { Button } from '~/components/ui/button';
import { Card, CardContent } from '~/components/ui/card';
import type { Review } from '~/lib/types';

type ReviewsListProps = {
  reviews?: Review[];
  rating: number;
};

export function ReviewsList({ reviews = [], rating }: ReviewsListProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold text-[#006699]">Reviews</h2>
        <div className="flex items-center gap-2">
          <span className="font-bold text-lg text-[#10bc4c]">{rating}.0</span>
          <div className="flex">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={`w-5 h-5 ${
                  i < rating ? 'fill-[#10bc4c] text-[#10bc4c]' : 'fill-[#d0d8e8] text-[#d0d8e8]'
                }`}
              />
            ))}
          </div>
          <span className="text-[#939393]">({reviews.length} reviews)</span>
        </div>
      </div>

      <div className="space-y-4">
        {reviews.length > 0 ? (
          reviews.map(review => (
            <Card key={review.id}>
              <CardContent className="pt-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0">
                    {review.avatar ? (
                      <img
                        src={review.avatar || '/placeholder.svg'}
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
                          className={`w-4 h-4 ${
                            i < review.rating
                              ? 'fill-[#10bc4c] text-[#10bc4c]'
                              : 'fill-[#d0d8e8] text-[#d0d8e8]'
                          }`}
                        />
                      ))}
                    </div>

                    <p className="text-[#939393] mt-2">{review.text}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <div className="text-center py-8 text-[#939393]">No reviews available yet.</div>
        )}
      </div>

      <div className="flex justify-center mt-8">
        <Button className="bg-[#006699] hover:bg-[#005588]">
          <MessageSquare className="w-4 h-4 mr-2" />
          Write a Review
        </Button>
      </div>
    </div>
  );
}
