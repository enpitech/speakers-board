import { useTranslation } from 'react-i18next';
import type { Route } from './+types/home';
import { Avatar } from '~/components/Avatar';
import { RegisterSpeakerButton } from '~/components/RegisterSpeakerButton';
import { SpeakersTable } from '~/components/SpeakersTable';

export function meta({}: Route.MetaArgs) {
  return [
    { title: 'Speakers Board' },
    { name: 'description', content: 'Welcome to the Frontendistim Speakers Board!' },
  ];
}

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
          <h2 className="text-2xl font-semibold text-[var(--color-text-2)]">Empty State Demo</h2>
          <SpeakersTable speakers={[]} />
        </div>

        <div className="space-y-4">
          <h2 className="text-2xl font-semibold text-[var(--color-text-2)]">
            Register Speaker Form Demo
          </h2>
          <div className="flex items-center gap-4">
            <RegisterSpeakerButton />
          </div>
          <div className="flex items-center gap-4">
            <RegisterSpeakerButton />
            <RegisterSpeakerButton />
          </div>
        </div>
      </div>
    </div>
  );
}
