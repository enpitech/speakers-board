import type { Review } from '../types';

export const getReviews = async ({ speakerId }: { speakerId: string }): Promise<Review[]> => {
  const response = await fetch(`${process.env.API_BASE_URL}/reviews?speakerId=${speakerId}`);
  const data = await response.json();
  return data;
};
