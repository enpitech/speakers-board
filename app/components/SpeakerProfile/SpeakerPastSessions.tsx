import { SessionCard } from '~/components/SessionCard';
import { EmptyResponseView } from '~/components/EmptyResponseView';
import type { Session } from '~/lib/types';

export const SpeakerPastSessions = ({ sessions }: { sessions: Session[] }) => {
  const pastSessions = sessions.filter(session => new Date(session.date) < new Date());
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold text-[#006699]">Past Sessions</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {pastSessions.map(session => (
          <SessionCard key={session.id} session={session} />
        ))}
      </div>

      {!pastSessions.length && <EmptyResponseView message="No past sessions available." />}
    </div>
  );
};
