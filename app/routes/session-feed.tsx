import { Suspense, use } from 'react';
import { SessionCard } from '~/components/SessionCard';
import { Spinner } from '~/components/Spinner';
import { sessionFeedLoader } from '~/lib/loaders/sessions.loader';
import type { Session, SessionFeedLoaderData } from '~/lib/types';

export const loader = sessionFeedLoader;
export default function SessionFeed({ loaderData }: { loaderData: SessionFeedLoaderData }) {
  const { sessions } = loaderData;
  return (
    <Suspense fallback={<Spinner />}>
      <SuspendedSessionList sessions={sessions} />
    </Suspense>
  );
}

const SuspendedSessionList = ({ sessions }: { sessions: Promise<Session[]> }) => {
  const sessionsData = use(sessions);
  return <SessionList sessions={sessionsData} />;
};

const SessionList = ({ sessions }: { sessions: Session[] }) => {
  return (
    <div>
      {sessions.map(session => (
        <SessionCard key={session.id} session={session} />
      ))}
    </div>
  );
};
