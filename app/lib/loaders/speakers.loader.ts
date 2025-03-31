import type { Route } from '../../+types/root';
import { getLanguages } from '../fetchers/getLanguages';
import { getSpeakers } from '../fetchers/getSpeakers';
import { getTopics } from '../fetchers/getTopics';

export async function speakersPageLoader({ request }: Route.LoaderArgs) {
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
