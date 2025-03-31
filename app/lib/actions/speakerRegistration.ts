import type { ActionFunctionArgs } from 'react-router';
import type { SpeakerFormData } from '../types';

export async function speakerRegistration({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const rawData = Object.fromEntries(formData);

  try {
    const speakerData: SpeakerFormData = {
      name: rawData.name as string,
      languages: JSON.parse(rawData.languages as string),
      topics: JSON.parse(rawData.topics as string),
      sessionsUrl: rawData.sessionsUrl as string,
      socialLinks: JSON.parse(rawData.socialLinks as string),
      avatar: rawData.avatar as string | undefined,
      location: rawData.location as string | undefined,
      experience: rawData.experience as string | undefined,
    };

    const errors: Record<string, string> = validateSpeakerData(speakerData);

    if (Object.keys(errors).length > 0) {
      return new Response(JSON.stringify({ errors }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const response = await fetch(`${process.env.API_BASE_URL}/speakers`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(speakerData),
    });

    if (!response.ok) {
      throw new Error('Failed to create speaker');
    }

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response(
      JSON.stringify({ errors: { _form: 'Failed to create speaker. Please try again.' } }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      },
    );
  }
}

const validateSpeakerData = (speakerData: SpeakerFormData) => {
  const errors: Record<string, string> = {};
  if (!speakerData.name) errors.name = 'Name is required';
  if (speakerData.languages.length === 0) errors.languages = 'At least one language is required';
  if (speakerData.topics.length === 0) errors.topics = 'At least one topic is required';
  if (speakerData.socialLinks.length === 1 && speakerData.socialLinks[0].url === '') {
    errors.socialLinks = 'At least one social network is required';
  }
  return errors;
};
