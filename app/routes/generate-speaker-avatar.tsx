import { openai } from '@ai-sdk/openai';
import { experimental_generateImage } from 'ai';
import { updateSpeaker } from '~/lib/actions/updateSpeaker';
import { getSpeaker } from '~/lib/fetchers/getSpeaker';
import type { Speaker } from '~/lib/types';

export const action = async ({ request }: { request: Request }) => {
  const formData = await request.formData();
  const speakerId = formData.get('speakerId') as string;
  if (!speakerId) {
    return new Response('Speaker ID is required', { status: 500 });
  }
  const speaker = await getSpeaker({ speakerId });
  if (!speaker) {
    return new Response('Speaker not found', { status: 500 });
  }

  const avatar = await generateAvatarFromAI(speaker);
  const newAvatarBase64 = `data:image/png;base64,${avatar.base64}`;
  updateSpeaker({ newSpeakerData: { id: speakerId, avatar: newAvatarBase64 } });
  return new Response(newAvatarBase64, { status: 200 });
};

// const generateAvatar = async (name: string) => {
//   const response = await fetch(`https://api.dicebear.com/6.x/bottts/svg?seed=${name}`);
//   const svg = await response.text();
//   return svg;
// };

const generateAvatarFromAI = async (speaker: Speaker) => {
  const result = await experimental_generateImage({
    model: openai.image('dall-e-3'),
    size: '1024x1024',
    aspectRatio: '1:1',
    prompt: `a professional, engaging, and authentic speaker avatar for ${speaker.name}, the avatar should be a single image that is 1024x1024 pixels.
        Here is the speaker's bio: ${speaker.bio}.
        make the avatar gender fit the speaker's gender based on the bio and name.
        `,
    providerOptions: {
      openai: {
        style: 'natural',
        quality: 'standard',
      },
    },
  });
  return result.image;
};
