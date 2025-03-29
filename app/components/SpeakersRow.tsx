import { Avatar } from './Avatar';
import { StarRating } from './StarRating';
import { SessionsButton } from './SessionsButton';
import { Youtube } from 'lucide-react';
import { cn } from '../lib/utils';
import { Row } from './ui/Row';
import { TableCell } from './ui/table/table-cell';
import { SocialIcon } from './ui/social-icon';
import { Button } from './ui/button';
import { SocialIconsGroup } from './ui/social-icons-group';

export interface Speaker {
  id: string;
  name: string;
  avatar?: string;
  topics: string[];
  languages: string[];
  socialLinks: {
    platform:
      | "linkedin"
      | "twitter"
      | "facebook"
      | "instagram"
      | "youtube"
      | "github"
      | "tiktok"
      | "spotify"
      | "discord";
    url: string;
  }[];
  rating: number;
  sessionsUrl?: string;
}

interface SpeakerRowProps {
  speaker: Speaker;
  columnWidths: {
    name: string;
    topics: string;
    languages: string;
    social: string;
    information: string;
  };
}

export function SpeakerRow({ speaker, columnWidths }: SpeakerRowProps) {
  return (
    <Row>
      <TableCell width={columnWidths.name}>
        <div className="flex items-center gap-3 min-w-0">
          <Avatar src={speaker.avatar} alt={speaker.name} size="sm" fallback={speaker.name} />
          <span className="font-medium text-[var(--color-text-900)] truncate text-sm">{speaker.name}</span>
        </div>
      </TableCell>

      <TableCell width={columnWidths.topics}>
        <span className="text-sm text-[var(--color-mint-500)] break-words line-clamp-2">{speaker.topics.join(", ")}</span>
      </TableCell>

      <TableCell width={columnWidths.languages}>
        <span className="text-sm text-[var(--color-text-400)] break-words line-clamp-2">{speaker.languages.join(", ")}</span>
      </TableCell>

      <TableCell width={columnWidths.social}>
      <SocialIconsGroup links={speaker.socialLinks} maxIcons={5} showCount={true} />

      </TableCell>

      <TableCell width={columnWidths.information}>
        <div className="flex items-center gap-3">
          {speaker.sessionsUrl && (
            <Button variant="outline" className="flex items-center gap-1.5 text-[var(--color-text-900)] text-xs" size="sm">
              <Youtube className="h-3.5 w-3.5 text-[#FF0000]" />
              <span className="truncate">Sessions</span>
            </Button>
          )}

          <StarRating rating={speaker.rating} readonly size="sm" />
        </div>
      </TableCell>
    </Row>
  );
}
