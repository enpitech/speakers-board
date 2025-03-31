import { Suspense, useEffect, useState } from 'react';
import { Await, type ActionFunctionArgs } from 'react-router';
import { SpeakersTableView, SuspendedSpeakersTableView } from '~/components/SpeakersTable';
import { SpeakersFilters, SuspendedSpeakersFilters } from '~/components/SpeakersFilters';
import { Spinner } from '~/components/Spinner';
import type { Speaker } from '~/lib/types';
import { RegisterSpeakerButton } from '~/components/SpeakerFormDialog/RegisterSpeakerButton';
import { SpeakerFormDialogContainer } from '~/components/SpeakerFormDialog/SpeakerFormDialogContainer';
import { speakerSignUp } from '~/lib/actions/speaker-sign-up';
import type { Route } from '../+types/root';
import { GeneralError } from '~/components/GeneralErrorBoundary';
import { NetworkError } from '~/components/NetworkErrorBoundary';
import { getSpeakers } from '~/lib/fetchers/getSpeakers';
import { getLanguages } from '~/lib/fetchers/getLanguages';
import { getTopics } from '~/lib/fetchers/getTopics';

type SpeakersLoaderData = {
  speakers: Promise<Speaker[]>;
  languages: Promise<string[]>;
  topics: Promise<string[]>;
};

export async function action(args: ActionFunctionArgs) {
  return speakerSignUp(args);
}

export async function loader({ request }: Route.LoaderArgs): Promise<SpeakersLoaderData> {
  const url = new URL(request.url);
  const searchParams = new URLSearchParams(url.search);
  const language = searchParams.get('language');
  const topic = searchParams.get('topic');
  const rating = searchParams.get('rating');

  const speakers = getSpeakers({
    languages: language ? language.split(',') : null,
    topics: topic ? topic.split(',') : null,
    rating: rating ? parseInt(rating) : null,
  });
  const languages = getLanguages();
  const topics = getTopics();
  return { speakers, languages, topics };
}

export default function Speakers({ loaderData }: { loaderData: SpeakersLoaderData }) {
  const { speakers, languages, topics } = loaderData;
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <>
      <div>
        <RegisterSpeakerButton className="mb-4" onClick={() => setIsDialogOpen(true)} />
        <Suspense fallback={<Spinner size="lg" />}>
          <SuspendedSpeakersFilters
            availableFilters={{
              availableLanguages: languages,
              availableTopics: topics,
            }}
          />
        </Suspense>
        <Suspense fallback={<Spinner size="lg" />}>
          <SuspendedSpeakersTableView speakers={speakers} />
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

export function ErrorBoundary({ error, params }: Route.ErrorBoundaryProps) {
  if (error instanceof Error) {
    return <GeneralError error={error} params={params} />;
  }
  return <NetworkError error={error} params={params} />;
}
