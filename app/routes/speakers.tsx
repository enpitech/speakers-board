import { Suspense, useState } from 'react';
import { Await, type ActionFunctionArgs } from 'react-router';
import { SpeakersTableView } from '~/components/SpeakersTableView';
import { Spinner } from '~/components/Spinner';
import type { Speaker } from '~/lib/types';
import { RegisterSpeakerButton } from '~/components/SpeakerFormDialog/RegisterSpeakerButton';
import { SpeakerFormDialogContainer } from '~/components/SpeakerFormDialog/SpeakerFormDialogContainer';
import type { SpeakerFormData } from '~/components/SpeakerFormDialog/SpeakerFormDialogView';

type LoaderData = {
  speakers: Promise<Speaker[]>;
};

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const rawData = Object.fromEntries(formData);

  try {
    const speakerData = {
      fullName: rawData.fullName,
      languages: JSON.parse(rawData.languages as string),
      topics: JSON.parse(rawData.topics as string),
      previousTalksUrl: rawData.previousTalksUrl,
      socialNetworks: JSON.parse(rawData.socialNetworks as string),
      avatarUrl: rawData.avatarUrl,
    };

    // Validate the data
    const errors: Record<string, string> = {};
    if (!speakerData.fullName) errors.fullName = 'Name is required';
    if (speakerData.languages.length === 0) errors.languages = 'At least one language is required';
    if (speakerData.topics.length === 0) errors.topics = 'At least one topic is required';

    // Validate social networks
    if (speakerData.socialNetworks.length === 1 && speakerData.socialNetworks[0].username === '') {
      errors.socialNetworks = 'At least one social network is required';
    }

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

export async function loader(): Promise<LoaderData> {
  const speakers = await fetch(`${process.env.API_BASE_URL}/speakers`);
  return { speakers: new Promise(resolve => setTimeout(() => resolve(speakers.json()), 2000)) };
}

export default function Speakers({ loaderData }: { loaderData: LoaderData }) {
  const { speakers } = loaderData;
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <>
      <div>
        <RegisterSpeakerButton className="mb-4" onClick={() => setIsDialogOpen(true)} />
        <Suspense fallback={<Spinner size="lg" />}>
          <Await resolve={speakers}>{speakers => <SpeakersTableView speakers={speakers} />}</Await>
        </Suspense>
      </div>

      {isDialogOpen && (
        <div className="fixed inset-0 z-50">
          <SpeakerFormDialogContainer
            isOpen={isDialogOpen}
            onClose={() => setIsDialogOpen(false)}
          />
        </div>
      )}
    </>
  );
}
