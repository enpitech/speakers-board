import React from 'react';
import { SessionCard } from '~/components/SessionCard';
import { EmptyResponseView } from '~/components/EmptyResponseView';
import type { Session } from '~/lib/types';

export const SpeakerUpcomingSessions = ({ sessions }: { sessions: Session[] }) => {
  const upcomingSessions = sessions.filter(session => new Date(session.date) > new Date());
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold text-[#006699]">Upcoming Sessions</h2>
      {upcomingSessions.map(session => (
        <SessionCard key={session.id} session={session} />
      ))}
      {!upcomingSessions.length && (
        <EmptyResponseView message="No upcoming sessions at the moment." />
      )}
    </div>
  );
};
