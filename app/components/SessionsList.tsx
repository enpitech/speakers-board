import { Calendar, Clock, MapPin, Users } from 'lucide-react';
import { Button } from '~/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '~/components/ui/card';
import type { Session } from '~/lib/types';

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
                      <span>{session.date}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4 text-[#939393]" />
                      <span>{session.time}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MapPin className="w-4 h-4 text-[#939393]" />
                      <span>{session.location}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="w-4 h-4 text-[#939393]" />
                      <span>{session.attendees} attendees</span>
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
      <h2 className="text-2xl font-semibold text-[#006699]">Past Sessions</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {sessions.length > 0 ? (
          sessions.map(session => (
            <Card key={session.id} className="overflow-hidden">
              <div className="border-l-4 border-[#8fb8c3]">
                <CardHeader>
                  <CardTitle className="text-lg">{session.title}</CardTitle>
                  <CardDescription>
                    <div className="flex flex-wrap gap-2 mt-2">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4 text-[#939393]" />
                        <span>{session.date}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="w-4 h-4 text-[#939393]" />
                        <span>{session.attendees} attendees</span>
                      </div>
                    </div>
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex justify-end">
                  {session.videoUrl && (
                    <Button variant="outline" className="text-[#006699] border-[#006699]">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="#FF0000"
                      >
                        <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" />
                      </svg>
                      <span className="ml-2">Watch Recording</span>
                    </Button>
                  )}
                </CardContent>
              </div>
            </Card>
          ))
        ) : (
          <div className="text-center py-8 text-[#939393] col-span-2">
            No past sessions available.
          </div>
        )}
      </div>
    </div>
  );
}
