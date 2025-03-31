import { Button } from './ui/button';
import { Calendar, Users } from 'lucide-react';
import { SocialIcon } from './ui/SocialIcon';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import type { Session } from '~/lib/types';

export const SessionCard = ({ session }: { session: Session }) => {
  const { id, title, date, attendees, videoUrl } = session;
  return (
    <Card key={id} className="overflow-hidden">
      <div className="border-l-4 border-primary">
        <CardHeader>
          <CardTitle className="text-lg">{title}</CardTitle>
          <CardDescription>
            <div className="flex flex-wrap gap-2 mt-2">
              <div className="flex items-center gap-1">
                <Calendar className="w-4 h-4 text-[#939393]" />
                <span>{date}</span>
              </div>
              <div className="flex items-center gap-1">
                <Users className="w-4 h-4 text-[#939393]" />
                <span>{attendees} attendees</span>
              </div>
            </div>
          </CardDescription>
        </CardHeader>
        <CardContent className="flex justify-end">
          {videoUrl && (
            <Button variant="outline" color="secondary">
              <SocialIcon platform="youtube" />
              <span className="ml-2">Watch Recording</span>
            </Button>
          )}
        </CardContent>
      </div>
    </Card>
  );
};
