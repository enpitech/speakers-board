import { useEffect, useState } from 'react';
import { Chip } from './ui/Chip';
import { useSearchParams } from 'react-router';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';

interface SpeakersFiltersProps {
  AvailableFilters: {
    availableLanguages: string[];
    availableTopics: string[];
  };
}

export function SpeakersFilters({ AvailableFilters }: SpeakersFiltersProps) {
  const { availableLanguages, availableTopics } = AvailableFilters;
  const [filters, setFilters] = useState<{
    language: string[];
    topic: string[];
    rating: number | null;
  }>({
    language: [],
    topic: [],
    rating: null,
  });

  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const languagesFromUrl = searchParams.get('language')?.split(',') || [];
    const topicsFromUrl = searchParams.get('topic')?.split(',') || [];
    const ratingFromUrl = searchParams.get('rating');

    setFilters({
      language: languagesFromUrl.filter(Boolean),
      topic: topicsFromUrl.filter(Boolean),
      rating: ratingFromUrl ? parseInt(ratingFromUrl) : null,
    });
  }, [searchParams]);

  const updateFiltersInUrl = (newFilters: {
    language: string[];
    topic: string[];
    rating: number | null;
  }) => {
    const newSearchParams = new URLSearchParams();

    if (newFilters.language.length > 0)
      newSearchParams.set('language', newFilters.language.join(','));
    if (newFilters.topic.length > 0) newSearchParams.set('topic', newFilters.topic.join(','));
    if (newFilters.rating !== null) newSearchParams.set('rating', newFilters.rating.toString());

    setSearchParams(newSearchParams);
  };

  const handleSelectChange = (value: string, type: 'language' | 'topic') => {
    if (!value) return;

    setFilters(prevFilters => {
      const updatedValues = prevFilters[type].includes(value)
        ? prevFilters[type]
        : [...prevFilters[type], value];
      const updatedFilters = { ...prevFilters, [type]: updatedValues };
      updateFiltersInUrl(updatedFilters);
      return updatedFilters;
    });
  };

  const handleRemove = (type: 'language' | 'topic', value: string) => {
    setFilters(prevFilters => {
      const updatedValues = prevFilters[type].filter(v => v !== value);
      const updatedFilters = { ...prevFilters, [type]: updatedValues };
      updateFiltersInUrl(updatedFilters);
      return updatedFilters;
    });
  };

  const handleRatingChange = (rating: string) => {
    setFilters(prevFilters => {
      const updatedFilters = {
        ...prevFilters,
        rating: rating === 'null' ? null : parseInt(rating),
      };
      updateFiltersInUrl(updatedFilters);
      return updatedFilters;
    });
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
                {lang}
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
                {topic}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <div className="flex gap-2 mt-2 flex-wrap">
          {filters.topic.map(topic => (
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
