import { Calendar, Clock, MapPin, Users, YoutubeIcon } from 'lucide-react';
import { Button } from '~/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '~/components/ui/card';
import type { Session } from '~/lib/types';
import { Text } from './Text';
import { EmptyResponseView } from './EmptyResponseView';
type UpcomingSessionsProps = {
  sessions?: Session[];
};

export function UpcomingSessions({ sessions = [] }: UpcomingSessionsProps) {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold text-[#006699]">Upcoming Sessions</h2>

      {sessions.length > 0 ? (
        sessions.map(session => (
          <Card key={session.id} className="overflow-hidden">
            <div className="border-l-4 border-[#10bc4c]">
              <CardHeader>
                <CardTitle>{session.title}</CardTitle>
                <CardDescription>
                  <div className="flex flex-wrap gap-4 mt-2">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4 text-[#939393]" />
                      <Text variant="span" size="sm">
                        {session.date}
                      </Text>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4 text-[#939393]" />
                      <Text variant="span" size="sm">
                        {session.time}
                      </Text>
                    </div>
                    <div className="flex items-center gap-1">
                      <MapPin className="w-4 h-4 text-[#939393]" />
                      <Text variant="span" size="sm">
                        {session.location}
                      </Text>
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="w-4 h-4 text-[#939393]" />
                      <Text variant="span" size="sm">
                        {session.attendees} attendees
                      </Text>
                    </div>
                  </div>
                </CardDescription>
              </CardHeader>
              <CardContent className="flex justify-end">
                <Button>Register Now</Button>
              </CardContent>
            </div>
          </Card>
        ))
      ) : (
        <div className="text-center py-8 text-[#939393]">No upcoming sessions at the moment.</div>
      )}
    </div>
  );
}

type PastSessionsProps = {
  sessions?: Session[];
};

export function PastSessions({ sessions = [] }: PastSessionsProps) {
  return (
    <div className="space-y-4">
      <Text variant="h2" size="lg">
        Past Sessions
      </Text>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {sessions.length > 0 ? (
          sessions.map(session => (
            <Card key={session.id} className="overflow-hidden">
              <div className="border-l-4 border-[#8fb8c3]">
                <CardHeader>
                  <CardTitle>
                    <Text variant="h3" size="md">
                      {session.title}
                    </Text>
                  </CardTitle>
                  <CardDescription>
                    <div className="flex flex-wrap gap-2 mt-2">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4 text-[#939393]" />
                        <Text variant="span" size="sm">
                          {session.date}
                        </Text>
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="w-4 h-4 text-[#939393]" />
                        <Text variant="span" size="sm">
                          {session.attendees} attendees
                        </Text>
                      </div>
                    </div>
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex justify-end">
                  {session.videoUrl && (
                    <Button variant="outline">
                      <YoutubeIcon className="w-4 h-4" />
                      <Text variant="span" size="sm" className="ml-2">
                        Watch Recording
                      </Text>
                    </Button>
                  )}
                </CardContent>
              </div>
            </Card>
          ))
        ) : (
          <EmptyResponseView message="No past sessions available." />
        )}
      </div>
    </div>
  );
}
