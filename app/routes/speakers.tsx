import { Suspense, useEffect, useState } from 'react';
import { Await, type ActionFunctionArgs, useLocation } from 'react-router';
import { SpeakersTableView } from '~/components/SpeakersTableView';
import { SpeakersFilters } from '~/components/SpeakersFilters';
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
  const [filters, setFilters] = useState({
    language: [] as string[],
    topic: [] as string[],
    rating: null as number | null,
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
    const languagesSet = new Set<string>();
    const topicsSet = new Set<string>();

    speakers.forEach(speaker => {
      speaker.languages.forEach(language => languagesSet.add(language));
      speaker.topics.forEach(topic => topicsSet.add(topic));
    });

    return {
      availableLanguages: Array.from(languagesSet),
      availableTopics: Array.from(topicsSet),
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
                <SpeakersFilters AvailableFilters={getAvailableFilters(speakers)} />
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
