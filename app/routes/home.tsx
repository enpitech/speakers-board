import { useTranslation } from 'react-i18next';
import type { Route } from './+types/home';

export function meta({}: Route.MetaArgs) {
  return [
    { title: 'Speakers Board' },
    { name: 'description', content: 'Welcome to the Frontendistim Speakers Board!' },
  ];
}

export default function Home() {
  const { t } = useTranslation();
  return t('home.title');
}
