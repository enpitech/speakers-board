import { Suspense, useEffect, useState } from 'react';
import { Await, type ActionFunctionArgs, useLocation } from 'react-router';
import { SpeakersTableView } from '~/components/SpeakersTable';
import { SpeakersFilters } from '~/components/SpeakersFilters';
import { Spinner } from '~/components/Spinner';
import type { Speaker, SpeakersDashboardFilters } from '~/lib/types';
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
  languages: string[];
  topics: string[];
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
  const speakers = await getSpeakers({
    languages: language ? language.split(',') : null,
    topics: topic ? topic.split(',') : null,
    rating: rating ? parseInt(rating) : null,
  });
  const languages = await getLanguages();
  const topics = await getTopics();
  return { speakers, languages, topics };
}

export default function Speakers({ loaderData }: { loaderData: SpeakersLoaderData }) {
  const { speakers, languages, topics } = loaderData;
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [filters, setFilters] = useState<SpeakersDashboardFilters>({
    language: [],
    topic: [],
    rating: null,
  });
  const location = useLocation();

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const language = urlParams.get('language')?.split(',') || [];
    const topic = urlParams.get('topic')?.split(',') || [];
    const rating = urlParams.get('rating') ? parseInt(urlParams.get('rating')!) : null;

    setFilters({
      language: language.filter(Boolean),
      topic: topic.filter(Boolean),
      rating,
    });
  }, [location]);

  function getAvailableFilters(speakers: Speaker[]) {
    console.log({ languages, topics });
    return {
      availableLanguages: languages,
      availableTopics: topics,
    };
  }

  const applyFilters = (data: Speaker[]) => {
    return data.filter(speaker => {
      const languageMatches =
        filters.language.length === 0 ||
        filters.language.some(lang => speaker.languages.includes(lang));

      const topicMatches =
        filters.topic.length === 0 || filters.topic.some(tpc => speaker.topics.includes(tpc));

      const ratingMatches =
        filters.rating === null || Math.round(speaker.rating) === filters.rating;

      return languageMatches && topicMatches && ratingMatches;
    });
  };

  return (
    <>
      <div>
        <RegisterSpeakerButton className="mb-4" onClick={() => setIsDialogOpen(true)} />
        <Suspense fallback={<Spinner size="lg" />}>
          <Await resolve={speakers}>
            {speakers => (
              <>
                <SpeakersFilters
                  availableFilters={{
                    availableLanguages: languages,
                    availableTopics: topics,
                  }}
                />
                <SpeakersTableView speakers={applyFilters(speakers)} />
              </>
            )}
          </Await>
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
