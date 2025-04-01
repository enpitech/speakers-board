import type { LoaderFunctionArgs } from 'react-router';
import { getSessions } from '../fetchers/getSessions';

export const sessionFeedLoader = async ({ params }: LoaderFunctionArgs) => {
  const speakerId = params.speakerId;
  if (!speakerId) {
    throw new Error('Speaker ID is required');
  }
  const sessions = getSessions({ speakerId });
  return { sessions };
};
