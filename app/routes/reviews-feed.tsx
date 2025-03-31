import { MessageSquare } from 'lucide-react';

import { Star } from 'lucide-react';
import { RatingStars } from '~/components/RatingStars';
import { ReviewCard } from '~/components/ReviewCard';
import { Button } from '~/components/ui/button';
import { Card } from '~/components/ui/card';
import type { Review } from '~/lib/types';

type ReviewsFeedProps = {
  speakerId: string;
  reviews: Review[];
  rating: number;
  reviewsCount: number;
  maxHeight: string;
};

export default function ReviewsFeed(props: ReviewsFeedProps) {
  return (
    <div
      className={`w-full mx-auto max-h-full overflow-y-auto relative`}
      style={{ maxHeight: props.maxHeight }}
    >
      <ReviewsList {...props} />
    </div>
  );
}

const ReviewsList = ({ reviews, rating, reviewsCount }: ReviewsFeedProps) => {
  return (
    <div>
      <div className="space-y-4">
        <RatingStars rating={rating} reviewsCount={reviewsCount} />
      </div>
      <div className="space-y-4">
        {reviews.map(review => (
          <ReviewCard review={review} />
        ))}
      </div>

      <div className="flex justify-center mt-8 sticky bottom-0 bg-white z-10 py-4 px-4 rounded-lg opacity-60 hover:opacity-100 transition-opacity duration-300">
        <Button>
          <MessageSquare className="w-4 h-4 mr-2" />
          Write a Review
        </Button>
      </div>
    </div>
  );
};
