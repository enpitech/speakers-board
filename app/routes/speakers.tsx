import { Suspense, useState } from 'react';
import { Await, type ActionFunctionArgs } from 'react-router';
import { SpeakersTableView } from '~/components/SpeakersTableView';
import { Spinner } from '~/components/Spinner';
import type { Speaker } from '~/lib/types';
import { RegisterSpeakerButton } from '~/components/SpeakerFormDialog/RegisterSpeakerButton';
import { SpeakerFormDialogContainer } from '~/components/SpeakerFormDialog/SpeakerFormDialogContainer';
import { speakerSignUp } from '~/lib/actions/speaker-sign-up';

type LoaderData = {
  speakers: Promise<Speaker[]>;
};

export async function action(args: ActionFunctionArgs) {
  return speakerSignUp(args);
}

export async function loader(): Promise<LoaderData> {
  const response = await fetch('http://localhost:3001/speakers');
  if (!response.ok) {
    throw new Error('Failed to fetch speakers');
  }
  return { speakers: response.json() };
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
