import { Suspense, use } from 'react';
import { useTranslation } from 'react-i18next';
import { AddReviewButton } from '~/components/AddReviewButton';
import { EmptyResponseView } from '~/components/EmptyResponseView';
import { RatingStars } from '~/components/RatingStars';
import { ReviewCard } from '~/components/ReviewCard';
import { SpeakerPageHeaderSkeleton } from '~/components/SpeakerPageHeaderSkeleton';
import { reviewsFeedLoader } from '~/lib/loaders/reviews.loader';
import type { Review, ReviewLoaderData } from '~/lib/types';

export const loader = reviewsFeedLoader;

export default function ReviewsFeed({ loaderData }: { loaderData: ReviewLoaderData }) {
  const { reviews } = loaderData;

  return (
    <div
      className={`w-full mx-auto max-h-full overflow-y-auto relative`}
      style={{ maxHeight: '700px' }}
    >
      <Suspense fallback={<SpeakerPageHeaderSkeleton />}>
        <ReviewsList reviews={reviews} />
      </Suspense>
    </div>
  );
}

const ReviewsList = ({ reviews }: { reviews: Promise<Review[]> }) => {
  const { t } = useTranslation();
  const reviewsData = use(reviews);

  if (reviewsData.length === 0) {
    return <EmptyResponseView message={t('reviews.empty')} cta={<AddReviewButton />} />;
  }

  const avgRating =
    reviewsData.reduce((acc, review) => acc + review.rating, 0) / reviewsData.length;
  return (
    <div>
      <div className="space-y-4">
        <RatingStars rating={avgRating} reviewsCount={reviewsData.length} />
      </div>
      <div className="space-y-4">
        {reviewsData.map(review => (
          <ReviewCard review={review} />
        ))}
      </div>

      <div className="flex justify-center mt-8 sticky bottom-0 bg-white z-10 py-4 px-4 rounded-lg opacity-60 hover:opacity-100 transition-opacity duration-300">
        <AddReviewButton />
      </div>
    </div>
  );
};
