import type { Speaker } from '../types';
import { sleep } from '../utils';

export const getSpeakers = async ({
  languages,
  topics,
  rating,
}: {
  languages?: string[] | null;
  topics?: string[] | null;
  rating?: number | null;
}) => {
  const response = await fetch(
    `http://localhost:3001/speakers?${rating ? `rating=${rating}` : ''}`,
    {
      headers: {
        'Content-Type': 'application/json',
      },
    },
  );

  let speakers = await response.json();
  if (!speakers) {
    throw new Error('No speakers found');
  }

  if (speakers.length === 0) return [];

  if (languages) {
    speakers = speakers.filter((speaker: Speaker) => {
      const speakerStringifiedLanguages = speaker.languages.join(',').toLowerCase();

      for (const language of languages) {
        if (speakerStringifiedLanguages.includes(language.toLowerCase())) {
          return true;
        }
      }
      return false;
    });
  }

  if (topics) {
    speakers = speakers.filter((speaker: Speaker) => {
      const stringifiedTopics = speaker.topics.join(',').toLowerCase();
      for (const topic of topics) {
        if (stringifiedTopics.includes(topic.toLowerCase())) {
          return true;
        }
      }
      return false;
    });
  }
  return speakers as Speaker[];
};
