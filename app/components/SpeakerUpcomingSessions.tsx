import { SessionCard } from '~/components/SessionCard';
import { EmptyResponseView } from '~/components/EmptyResponseView';
import type { Session } from '~/lib/types';
import { Text } from './Text';
import { useTranslation } from 'react-i18next';
export const SpeakerUpcomingSessions = ({ sessions }: { sessions: Session[] }) => {
  const upcomingSessions = sessions.filter(session => new Date(session.date) > new Date());
  const { t } = useTranslation();
  return (
    <div className="space-y-4">
      <Text variant="h2">{t('sessions.upcoming.title')}</Text>
      {upcomingSessions.map(session => (
        <SessionCard key={session.id} session={session} />
      ))}
      {!upcomingSessions.length && (
        <EmptyResponseView message="No upcoming sessions at the moment." />
      )}
    </div>
  );
};
