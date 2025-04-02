import type { Speaker } from '../types';

export const avatarGenerationPrompt = (speaker: Speaker) => {
  return `a professional, engaging, and authentic speaker avatar for ${speaker.name}, the avatar should be a single image that is 1024x1024 pixels.
        Here is the speaker's bio: ${speaker.bio}.
        make the avatar gender fit the speaker's gender based on the bio and name.
        `;
};
