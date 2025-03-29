import { useTranslation } from 'react-i18next';
import type { Route } from './+types/home';
import { Avatar } from '~/components/Avatar';
import { SpeakersTable } from '~/components/SpeakersTable';
import { SpeakersTableView } from '~/components/SpeakersTableView';

export function meta({}: Route.MetaArgs) {
  return [
    { title: 'Speakers Board' },
    { name: 'description', content: 'Welcome to the Frontendistim Speakers Board!' },
  ];
}

const sampleSpeakers = [
  {
    name: 'Sarah Johnson',
    image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=sarah',
    topics: ['React', 'TypeScript', 'Performance'],
    languages: ['English', 'Spanish'],
    rating: 4.8,
    socialLinks: {
      twitter: 'https://twitter.com/sarahj',
      linkedin: 'https://linkedin.com/in/sarahj',
      github: 'https://github.com/sarahj',
    },
  },
  {
    name: 'Michael Chen',
    image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=michael',
    topics: ['Vue.js', 'State Management', 'Testing'],
    languages: ['English', 'Mandarin'],
    rating: 4.9,
    socialLinks: {
      twitter: 'https://twitter.com/michaelc',
      linkedin: 'https://linkedin.com/in/michaelc',
      github: 'https://github.com/michaelc',
    },
  },
  {
    name: 'Emma Rodriguez',
    image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=emma',
    topics: ['Angular', 'RxJS', 'Architecture'],
    languages: ['English', 'Spanish', 'French'],
    rating: 4.7,
    socialLinks: {
      twitter: 'https://twitter.com/emmar',
      linkedin: 'https://linkedin.com/in/emmar',
      github: 'https://github.com/emmar',
    },
  },
];

export default function Home() {
  const { t } = useTranslation();
  return (
    <div className="p-8 space-y-8">
      <h1 className="text-3xl font-bold text-[var(--color-text-2)]">{t('home.title')}</h1>

      <div className="space-y-8">
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold text-[var(--color-text-2)]">
            Avatar Component Demo
          </h2>
          <div className="flex items-center gap-4">
            <Avatar
              src="https://api.dicebear.com/7.x/avataaars/svg?seed=small"
              alt="Small Avatar"
              size="sm"
            />
            <Avatar
              src="https://api.dicebear.com/7.x/avataaars/svg?seed=medium"
              alt="Medium Avatar"
              size="md"
            />
            <Avatar
              src="https://api.dicebear.com/7.x/avataaars/svg?seed=large"
              alt="Large Avatar"
              size="lg"
            />
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-2xl font-semibold text-[var(--color-text-2)]">Fallback State</h2>
          <div className="flex items-center gap-4">
            <Avatar alt="John Doe" fallback="John Doe" size="md" />
            <Avatar alt="Jane Smith" fallback="Jane Smith" size="md" />
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-2xl font-semibold text-[var(--color-text-2)]">With Border</h2>
          <div className="flex items-center gap-4">
            <Avatar
              src="https://api.dicebear.com/7.x/avataaars/svg?seed=bordered"
              alt="Bordered Avatar"
              size="md"
              className="ring-4 ring-[var(--color-primary)]"
            />
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-2xl font-semibold text-[var(--color-text-2)]">Speakers Table Demo</h2>
          <SpeakersTable speakers={sampleSpeakers} />
        </div>

        <div className="space-y-4">
          <h2 className="text-2xl font-semibold text-[var(--color-text-2)]">Empty State Demo</h2>
          <SpeakersTableView speakers={[]} />
        </div>
      </div>
    </div>
  );
}
