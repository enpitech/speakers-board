'use client';

import { SpeakersTableView } from './SpeakersTableView';
import type { Speaker } from '~/lib/types';

export function SpeakersTable({ speakers }: { speakers: Speaker[] }) {
  return <SpeakersTableView speakers={speakers} />;
}
