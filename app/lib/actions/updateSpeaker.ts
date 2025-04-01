import type { Speaker } from '../types';

export const updateSpeaker = async ({ newSpeakerData }: { newSpeakerData: Partial<Speaker> }) => {
  const response = await fetch(`${process.env.API_BASE_URL}/speakers/${newSpeakerData.id}`, {
    method: 'PATCH',
    body: JSON.stringify(newSpeakerData),
  });
  if (!response.ok) {
    throw new Error('Failed to update speaker');
  }
  return response.json();
};
