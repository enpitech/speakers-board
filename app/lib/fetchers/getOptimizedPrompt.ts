import { anthropic } from '@ai-sdk/anthropic';
import { generateText, streamText } from 'ai';
import { openai } from '@ai-sdk/openai';
export async function getOptimizedPrompt(prompt: string) {
  const { text } = await generateText({
    model: openai('gpt-4o-mini'),
    system:
      'You are a helpful assistant that optimizes prompts for a given task. make it efficient for generating code and react components specifically. ' +
      'you may need to add more details to the prompt to make it more specific and efficient.' +
      //   'rethink the prompt and make it more efficient and specific.' +
      'think about code reuse and how to make the code more reusable and modular.' +
      'think about the best way to structure the code to make it more readable and maintainable.' +
      'think about the best way to name the components and variables to make it more readable and maintainable. \n' +
      'use the following tech stack: ' +
      techStack.join(', ') +
      '. \n' +
      'use the following coding preferences: ' +
      codingPreferences.join(', ') +
      '. \n' +
      'use html elements for enclosing tags with thinking about the best way to structure the code to make it more readable and maintainable. with divs and spans',
    prompt: prompt,
    maxSteps: 4,
  });

  return text;
}
export async function* getOptimizedPromptStreamGenerator(prompt: string) {
  const result = streamText({
    model: openai('gpt-4o-mini'),
    prompt: prompt,
    maxSteps: 4,
  });
  for await (const textPart of result.textStream) {
    yield textPart;
  }
}

export async function getAutoComplete(prompt: string) {
  const { text } = await generateText({
    model: anthropic('claude-3-5-sonnet-latest'),
    prompt: prompt,
    system:
      'You are a helpful assistant that auto completes code. make it efficient for generating code and react components specifically. ' +
      'you may need to add more details to the prompt to make it more specific and efficient.' +
      'rethink the prompt and make it more efficient and specific.' +
      'think about code reuse and how to make the code more reusable and modular.' +
      'think about the best way to structure the code to make it more readable and maintainable.' +
      'think about the best way to name the components and variables to make it more readable and maintainable. \n' +
      'use the following tech stack: ' +
      techStack.join(', ') +
      '. \n' +
      'use the following coding preferences: ' +
      codingPreferences.join(', ') +
      '. \n' +
      'use html elements for enclosing tags with thinking about the best way to structure the code to make it more readable and maintainable. with divs and spans',
    maxSteps: 4,
  });

  return text;
}
const techStack = [
  'react',
  'typescript',
  'tailwind 4',
  'react router 7 - framework mode',
  'shadcn ui',
  'lucide icons',
  'zod',
  'json-server',
  'react-error-boundary',
  'react-i18next',
  'i18next',
  'tailwind-merge',
];

const codingPreferences = [
  'seperate logic from ui components',
  'Do error handling in the components',
  'Use react-error-boundary for error handling',
  'Use react-i18next for internationalization',
  'Use tailwind-merge for merging tailwind classes',
  'Use zod for schema validation',
  'Use json-server for database',
  'use existing components and functions if they exist',
  'use existing styles if they exist',
  'use existing types if they exist',
  'use existing utils if they exist',
  'use existing hooks if they exist',
  'use existing services if they exist',
  'use existing tests if they exist',
];
