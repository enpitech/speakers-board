import { openai } from '@ai-sdk/openai';
import { generateText } from 'ai';
import type { ActionFunctionArgs } from 'react-router';
import { getSpeaker } from '~/lib/fetchers/getSpeaker';
import { generateBioPrompt, generateBioSystemPrompt } from '~/lib/prompts/generate-bio.prompt';

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const speakerId = (formData.get('speakerId') as string) ?? '';
  const speaker = await getSpeaker({ speakerId });
  const result = await generateText({
    model: openai('gpt-4o-mini'),
    system: generateBioSystemPrompt(),
    prompt: generateBioPrompt(speaker),
  });

  return result.text;
}
