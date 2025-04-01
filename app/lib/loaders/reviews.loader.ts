import type { LoaderFunctionArgs } from 'react-router';
import { getReviews } from '~/lib/fetchers/getReviews';
import type { ReviewLoaderData } from '~/lib/types';

export const reviewsFeedLoader = async ({ params }: LoaderFunctionArgs) => {
  const speakerId = params.speakerId;
  if (!speakerId) {
    throw new Error('Speaker ID is required');
  }
  const reviews = getReviews({ speakerId });
  return { reviews } as ReviewLoaderData;
};
