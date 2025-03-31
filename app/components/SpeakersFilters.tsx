import { Suspense, use, useEffect, useState } from 'react';
import { Chip } from './ui/Chip';
import { useSearchParams } from 'react-router';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import type { SpeakersDashboardFilters } from '~/lib/types';
import { CheckIcon } from 'lucide-react';
import { Spinner } from './Spinner';

interface SpeakersFiltersProps {
  availableFilters: {
    availableLanguages: string[];
    availableTopics: string[];
  };
}

export function SpeakersFilters({ availableFilters }: SpeakersFiltersProps) {
  const { availableLanguages, availableTopics } = availableFilters;

  const { filters, handleSelectChange, handleRemove, handleRatingChange } = useSpeakersFilters();

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
            <Chip
              key={lang + Math.random()}
              label={lang}
              onRemove={() => handleRemove('language', lang)}
            />
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
              <SelectItem key={topic + Math.random()} value={topic}>
                {filters.topic.includes(topic) ? <CheckIcon /> : null} {topic}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <div className="flex gap-2 mt-2 flex-wrap">
          {filters.topic.filter(Boolean).map(topic => (
            <Chip
              key={topic + Math.random()}
              label={topic}
              onRemove={() => handleRemove('topic', topic)}
            />
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
            <Chip
              label={'⭐'.repeat(filters.rating ?? 0)}
              onRemove={() => handleRatingChange('null')}
            />
          )}
        </div>
      </div>
    </div>
  );
}

interface SuspendedSpeakersFiltersProps {
  availableFilters: {
    availableLanguages: Promise<string[]>;
    availableTopics: Promise<string[]>;
  };
}

export function SuspendedSpeakersFilters({ availableFilters }: SuspendedSpeakersFiltersProps) {
  const availableLanguages = use(availableFilters.availableLanguages);
  const availableTopics = use(availableFilters.availableTopics);
  return (
    <Suspense fallback={<Spinner size="lg" />}>
      <SpeakersFilters availableFilters={{ availableLanguages, availableTopics }} />
    </Suspense>
  );
}

const useSpeakersFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const getFiltersFromSearchParams = () => {
    return {
      language: searchParams.get('language')?.split(',') || [],
      topic: searchParams.get('topic')?.split(',') || [],
      rating: searchParams.get('rating') ? parseInt(searchParams.get('rating')!) : null,
    };
  };

  const [filters, setFilters] = useState<SpeakersDashboardFilters>(getFiltersFromSearchParams());
  const handleSelectChange = (value: string, type: 'language' | 'topic') => {
    const newFilters: SpeakersDashboardFilters = { ...filters };
    newFilters[type].includes(value)
      ? newFilters[type].filter((v: string) => v !== value)
      : newFilters[type].push(value);
    setFilters(newFilters);
  };

  const handleRemove = (type: 'language' | 'topic', value: string) => {
    const newFilters: SpeakersDashboardFilters = { ...filters };
    newFilters[type] = newFilters[type].filter((v: string) => v !== value);
    setFilters(newFilters);
  };

  const handleRatingChange = (rating: string) => {
    const newFilters: SpeakersDashboardFilters = { ...filters };
    newFilters.rating = rating === 'null' ? null : parseInt(rating);
    setFilters(newFilters);
  };

  const setFiltersInSearchParams = (filters: SpeakersDashboardFilters) => {
    const newSearchParams = new URLSearchParams();

    if (filters.language.length > 0) newSearchParams.set('language', filters.language.join(','));
    if (filters.topic.length > 0) newSearchParams.set('topic', filters.topic.join(','));
    if (filters.rating !== null) newSearchParams.set('rating', filters.rating.toString());
    setSearchParams(newSearchParams, { replace: true });
  };

  useEffect(() => {
    setFiltersInSearchParams(filters);
  }, [filters]);

  return {
    setFiltersInSearchParams,
    filters,
    handleSelectChange,
    handleRemove,
    handleRatingChange,
  };
};
