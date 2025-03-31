import { useState, useEffect } from 'react';
import type { SpeakersDashboardFilters } from '../types';
import { useSearchParams } from 'react-router';

export const useSpeakersFilters = () => {
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
