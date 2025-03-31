import React from 'react';
import { Badge } from '~/components/ui/badge';

export const Expertise = ({ topics }: { topics: string[] }) => {
  throw new Error('BLBLBLB');
  return (
    <div className="flex flex-wrap gap-2">
      {topics.map((topic, index) => (
        <Badge key={index} className="bg-[#eefaff] text-[#006699] hover:bg-[#d0d8e8]">
          {topic}
        </Badge>
      ))}
    </div>
  );
};
