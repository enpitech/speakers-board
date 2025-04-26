import { Suspense } from 'react';
import { useLocation, type ActionFunctionArgs } from 'react-router';
import { SuspendedSpeakersTableView } from '~/components/SpeakersTable';
import { SuspendedSpeakersFilters } from '~/components/SpeakersFilters';
import { Spinner } from '~/components/Spinner';
import type { SpeakersLoaderData } from '~/lib/types';

import { speakerRegistration } from '~/lib/actions/speakerRegistration';
import type { Route } from '../+types/root';
import { GeneralError } from '~/components/GeneralErrorBoundary';
import { NetworkError } from '~/components/NetworkErrorBoundary';

import { SpeakersTableSkeleton } from '~/components/SpeakersTableSkeleton';
import { speakersPageLoader } from '~/lib/loaders/speakers.loader';
import { getSpeakers } from '~/lib/fetchers/getSpeakers';
import { getLanguages } from '~/lib/fetchers/getLanguages';
import { getTopics } from '~/lib/fetchers/getTopics';
import { sleep } from '~/lib/utils';

export async function action(args: ActionFunctionArgs) {
  return await speakerRegistration(args);
}

export async function loader({ request }: Route.LoaderArgs) {
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

  const location = useLocation();
  return (
    <div>
      <Suspense fallback={<Spinner size="lg" />}>
        <SuspendedSpeakersFilters
          availableFilters={{
            availableLanguages: languages,
            availableTopics: topics,
          }}
        />
      </Suspense>
      <Suspense key={location.search} fallback={<SpeakersTableSkeleton rows={10} />}>
        <SuspendedSpeakersTableView speakers={speakers} />
      </Suspense>
    </div>
  );
}

export function ErrorBoundary({ error, params }: Route.ErrorBoundaryProps) {
  if (error instanceof Error) {
    return <GeneralError error={error} params={params} />;
  }
  return <NetworkError error={error} params={params} />;
}
