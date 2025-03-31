import { useEffect, useState } from 'react';
import { Chip } from './ui/Chip';
import { useSearchParams } from 'react-router';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import type { SpeakersDashboardFilters } from '~/lib/types';
import { CheckIcon } from 'lucide-react';

interface SpeakersFiltersProps {
  availableFilters: {
    availableLanguages: string[];
    availableTopics: string[];
  };
}

export function SpeakersFilters({ availableFilters: AvailableFilters }: SpeakersFiltersProps) {
  const { availableLanguages, availableTopics } = AvailableFilters;

  const { setFilters, filters } = useSyncFiltersInUrl();

  const handleSelectChange = (value: string, type: 'language' | 'topic') => {
    const newFilters: SpeakersDashboardFilters = { ...filters };
    newFilters[type].includes(value)
      ? newFilters[type].filter((v: string) => v !== value)
      : newFilters[type].push(value);
    setFilters(newFilters);
  };

  const handleRemove = (type: 'language' | 'topic', value: string) => {
    debugger;
    const newFilters: SpeakersDashboardFilters = { ...filters };
    newFilters[type] = newFilters[type].filter((v: string) => v !== value);
    setFilters(newFilters);
  };

  const handleRatingChange = (rating: string) => {
    const newFilters: SpeakersDashboardFilters = { ...filters };
    newFilters.rating = rating === 'null' ? null : parseInt(rating);
    setFilters(newFilters);
  };

  return (
    <div className="flex gap-4 mb-4 w-full border border-primary rounded-md p-4">
      <div className="flex-1">
        <Select value="" onValueChange={value => handleSelectChange(value, 'language')}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Filter by language" />
          </SelectTrigger>
          <SelectContent>
            {availableLanguages.map(lang => (
              <SelectItem key={lang} value={lang}>
                {filters.language.includes(lang) ? <CheckIcon /> : null} {lang}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <div className="flex gap-2 mt-2 flex-wrap">
          {filters.language.map(lang => (
            <Chip key={lang} label={lang} onRemove={() => handleRemove('language', lang)} />
          ))}
        </div>
      </div>

      <div className="flex-1">
        <Select value="" onValueChange={value => handleSelectChange(value, 'topic')}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Filter by topic" />
          </SelectTrigger>
          <SelectContent>
            {availableTopics.map(topic => (
              <SelectItem key={topic} value={topic}>
                {filters.topic.includes(topic) ? <CheckIcon /> : null} {topic}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <div className="flex gap-2 mt-2 flex-wrap">
          {filters.topic.lefilters.topic.filter(Boolean).map(topic => (
            <Chip key={topic} label={topic} onRemove={() => handleRemove('topic', topic)} />
          ))}
        </div>
      </div>

      <div className="flex-1">
        <Select value="" onValueChange={value => handleRatingChange(value)}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Filter by rating" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="null">All ratings</SelectItem>
            {[5, 4, 3, 2, 1].map(rating => (
              <SelectItem key={rating} value={rating.toString()}>
                {'⭐'.repeat(rating)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <div className="flex gap-2 mt-2 flex-wrap">
          {filters.rating && (
            <Chip label={'⭐'.repeat(filters.rating)} onRemove={() => handleRatingChange('null')} />
          )}
        </div>
      </div>
    </div>
  );
}

const useSyncFiltersInUrl = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const [filtersState, setFiltersState] = useState<SpeakersDashboardFilters>({
    language: [],
    topic: [],
    rating: null,
  });

  const setFilters = (filters: SpeakersDashboardFilters) => {
    const newSearchParams = new URLSearchParams();

    if (filters.language.length > 0) newSearchParams.set('language', filters.language.join(','));
    if (filters.topic.length > 0) newSearchParams.set('topic', filters.topic.join(','));
    if (filters.rating !== null) newSearchParams.set('rating', filters.rating.toString());

    setSearchParams(newSearchParams);
    setFiltersState(filters);
  };
  useEffect(() => {
    const languagesFromUrl = searchParams.get('language')?.split(',') || [];
    const topicsFromUrl = searchParams.get('topic')?.split(',') || [];
    const ratingFromUrl = searchParams.get('rating');

    setFilters({
      language: languagesFromUrl.filter(Boolean),
      topic: topicsFromUrl.filter(Boolean),
      rating: ratingFromUrl ? parseInt(ratingFromUrl) : null,
    });
  }, []);

  return { setFilters, filters: filtersState };
};
