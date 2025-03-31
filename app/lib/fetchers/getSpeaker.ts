import type { Speaker } from '../types';
import { sleep } from '../utils';

export const getSpeaker = async ({ speakerId }: { speakerId: string }): Promise<Speaker> => {
  const response = await fetch(`${process.env.API_BASE_URL}/speakers/${speakerId}`);
  // await sleep(4000);
  const speaker = await response.json();
  if (!speaker) {
    throw new Error('No speaker found');
  }

  return speaker;
};
