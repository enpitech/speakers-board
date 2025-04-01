import { openai } from '@ai-sdk/openai';
import { generateText } from 'ai';
import type { ActionFunctionArgs } from 'react-router';

import { getSpeaker } from '~/lib/fetchers/getSpeaker';
import type { Speaker } from '~/lib/types';

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const speakerId = (formData.get('speakerId') as string) ?? '';
  const speaker = await getSpeaker({ speakerId });
  const result = await generateText({
    model: openai('gpt-4o-mini'),
    system: `You are an expert at crafting professional, engaging, and authentic speaker biographies.
    Your task is to create a compelling bio that highlights a speaker's expertise, experience, and unique qualities.
    Focus on their professional accomplishments, speaking style, areas of expertise, and what makes them stand out.
    The bio should be concise, personable, and tailored specifically to the speaker's background and the context they'll be speaking in.
    Ensure the tone is professional yet approachable and the content is relevant to potential audiences.
    The bio should be 100 words long.
    `,
    prompt: enhanceBioGenerationPrompt(speaker),
  });

  return result.text;
}

const enhanceBioGenerationPrompt = (speaker: Speaker) => {
  return `
    Based on the following information about the speaker:
    ${JSON.stringify(speaker)}
    
    Create a compelling 100-word bio written in first person that highlights the speaker's expertise, 
    experience, and unique qualities. Include relevant details like location, years of experience, 
    and areas of specialization. The bio should be professional yet personable, and appropriate for 
    event programs, websites, or introductions.
    Do not include any other text than the bio.
    do not include links or urls.
    Add icons to the bio to make it more engaging.
  `;
};
