import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Chip } from './ui/Chip';

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

  const handleSelectChange = (
    e: React.ChangeEvent<HTMLSelectElement>,
    type: 'language' | 'topic',
  ) => {
    const value = e.target.value;
    if (!value) return;

    setFilters(prevFilters => {
      const updatedValues = prevFilters[type].includes(value)
        ? prevFilters[type]
        : [...prevFilters[type], value];
      const updatedFilters = { ...prevFilters, [type]: updatedValues };
      updateFiltersInUrl(updatedFilters);
      return updatedFilters;
    });

    e.target.value = '';
  };

  const handleRemove = (type: 'language' | 'topic', value: string) => {
    setFilters(prevFilters => {
      const updatedValues = prevFilters[type].filter(v => v !== value);
      const updatedFilters = { ...prevFilters, [type]: updatedValues };
      updateFiltersInUrl(updatedFilters);
      return updatedFilters;
    });
  };

  const handleRatingChange = (rating: number | null) => {
    setFilters(prevFilters => {
      const updatedFilters = { ...prevFilters, rating };
      updateFiltersInUrl(updatedFilters);
      return updatedFilters;
    });
  };

  return (
    <div className="flex gap-4 mb-4">
      <div className="flex-1">
        <select
          onChange={e => handleSelectChange(e, 'language')}
          className="w-full border border-gray-300 rounded-md p-2 mt-1 font-graphik font-normal text-gray-600"
        >
          <option value="">Languages</option>
          {availableLanguages.map(lang => (
            <option key={lang} value={lang}>
              {lang}
            </option>
          ))}
        </select>
        <div className="flex gap-2 mt-2 flex-wrap">
          {filters.language.map(lang => (
            <Chip key={lang} label={lang} onRemove={() => handleRemove('language', lang)} />
          ))}
        </div>
      </div>

      <div className="flex-1">
        <select
          onChange={e => handleSelectChange(e, 'topic')}
          className="w-full border border-gray-300 rounded-md p-2 mt-1 font-graphik font-normal text-gray-600"
        >
          <option value="">Topics</option>
          {availableTopics.map(topic => (
            <option key={topic} value={topic}>
              {topic}
            </option>
          ))}
        </select>
        <div className="flex gap-2 mt-2 flex-wrap">
          {filters.topic.map(topic => (
            <Chip key={topic} label={topic} onRemove={() => handleRemove('topic', topic)} />
          ))}
        </div>
      </div>

      <div className="flex-1">
        <select
          onChange={e =>
            handleRatingChange(e.target.value === 'null' ? null : parseInt(e.target.value))
          }
          className="w-full border border-gray-300 rounded-md p-2 mt-1 font-graphik font-normal text-gray-600"
        >
          <option value="null">All ratings</option>
          {[5, 4, 3, 2, 1].map(rating => (
            <option key={rating} value={rating}>
              {'⭐'.repeat(rating)}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
