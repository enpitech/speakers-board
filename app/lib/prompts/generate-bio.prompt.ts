import type { Speaker } from '../types';

export const generateBioPrompt = (speaker: Speaker) => {
  const { name, languages, location, bio, topics } = speaker;
  return `Based on the following information about the speaker:
    ${JSON.stringify({ name, languages, location, bio, topics })}
    Create a compelling 100-word bio written in first person that highlights the speaker's expertise, 
    experience, and unique qualities. Include relevant details like location, years of experience, 
    and areas of specialization. The bio should be professional yet personable, and appropriate for 
    event programs, websites, or introductions.
    Do not include any other text than the bio.
    put links and urls under enclosing tag of html anchor tag.
    Add icons to the bio to make it more engaging.
    Add a link to the speaker's LinkedIn profile if it exists between <linkedin> tags.`;
};

export const generateBioSystemPrompt =
  () => `You are an expert at crafting professional, engaging, and authentic speaker biographies.
    Your task is to create a compelling bio that highlights a speaker's expertise, experience, and unique qualities.
    Focus on their professional accomplishments, speaking style, areas of expertise, and what makes them stand out.
    The bio should be concise, personable, and tailored specifically to the speaker's background and the context they'll be speaking in.
    Ensure the tone is professional yet approachable and the content is relevant to potential audiences.
    The bio should be 100 words long.
`;
