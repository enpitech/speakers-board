import { Globe } from 'lucide-react';
import { Badge } from '~/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card';
import type { Speaker } from '~/lib/types';

type ProfileSidebarProps = {
  speaker: Speaker;
};

export function ProfileSidebar({ speaker }: ProfileSidebarProps) {
  return (
    <div className="space-y-6">
      {/* About */}
      {speaker.bio && (
        <Card>
          <CardHeader>
            <CardTitle>About</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-[#939393]">{speaker.bio}</p>
          </CardContent>
        </Card>
      )}

      {/* Topics */}
      <Card>
        <CardHeader>
          <CardTitle>Expertise</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {speaker.topics.map((topic, index) => (
              <Badge key={index} className="bg-[#eefaff] text-[#006699] hover:bg-[#d0d8e8]">
                {topic}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Languages */}
      <Card>
        <CardHeader>
          <CardTitle>Languages</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {speaker.languages.map((language, index) => (
              <div key={index} className="flex items-center gap-2">
                <Globe className="w-4 h-4 text-[#006699]" />
                <span>{language}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
