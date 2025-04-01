import type { Speaker } from '../types';

export const getSpeaker = async ({ speakerId }: { speakerId: string }): Promise<Speaker> => {
  const response = await fetch(`${process.env.API_BASE_URL}/speakers/${speakerId}`);
  const speaker = await response.json();
  if (!speaker) {
    throw new Error('No speaker found');
  }

  return speaker;
};
