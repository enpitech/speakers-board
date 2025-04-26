// import { openai } from '@ai-sdk/openai';
// import { google } from '@ai-sdk/google';
import { anthropic } from '@ai-sdk/anthropic';
import { generateText } from 'ai';
import type { ActionFunctionArgs } from 'react-router';

import { getSpeaker } from '~/lib/fetchers/getSpeaker';
import { generateBioPrompt, generateBioSystemPrompt } from '~/lib/prompts/generate-bio.prompt';
export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();

  const speakerId = (formData.get('speakerId') as string) ?? '';

  const speaker = await getSpeaker({ speakerId });
  const result = await generateText({
    model: anthropic('claude-3-5-sonnet-20240620'),
    system: generateBioSystemPrompt(),
    prompt: generateBioPrompt(speaker),
    maxSteps: 1,
  });

  return result.text;
}
