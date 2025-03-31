import type { Session } from '../types';

export const getSessions = async ({ speakerId }: { speakerId: string }): Promise<Session[]> => {
  const response = await fetch(`${process.env.API_BASE_URL}/sessions?speakerId=${speakerId}`);
  const data = await response.json();
  return data;
};
