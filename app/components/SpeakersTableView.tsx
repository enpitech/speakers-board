import type { Speaker } from '~/lib/types';
import { use } from 'react';
import { TableCell } from './ui/table/TableCell';
import { Table } from './ui/table/Table';
import { SpeakerRow } from './ui/table/SpeakersRow';

const columnWidths = {
  name: '20%',
  topics: '20%',
  languages: '20%',
  social: '25%',
  information: '25%',
};

interface SpeakersTableViewProps {
  speakers: Speaker[];
}

export function SpeakersTableView({ speakers }: SpeakersTableViewProps) {
  const tableHeaders = (
    <div className="flex w-full items-center">
      <TableCell width={columnWidths.name}>
        <span className="text-sm font-medium text-[var(--color-text-600)]">Name</span>
      </TableCell>
      <TableCell width={columnWidths.topics}>
        <span className="text-sm font-medium text-[var(--color-text-600)]">Topics</span>
      </TableCell>
      <TableCell width={columnWidths.languages}>
        <span className="text-sm font-medium text-[var(--color-text-600)]">Languages</span>
      </TableCell>
      <TableCell width={columnWidths.social}>
        <span className="text-sm font-medium text-[var(--color-text-600)]">Social</span>
      </TableCell>
      <TableCell width={columnWidths.information}>
        <span className="text-sm font-medium text-[var(--color-text-600)]">Information</span>
      </TableCell>
    </div>
  );

  return (
    <Table
      data={speakers}
      renderRow={speaker => (
        <SpeakerRow key={speaker.id} speaker={speaker} columnWidths={columnWidths} />
      )}
      headers={tableHeaders}
      emptyMessage="No speakers found"
      aria-label="Speakers list"
      className="w-full min-h-[500px]"
    />
  );
}

type SuspendedSpeakersTableViewProps = {
  speakers: Promise<Speaker[]>;
};

export function SuspendedSpeakersTableView({ speakers }: SuspendedSpeakersTableViewProps) {
  const speakersData = use(speakers);
  return <SpeakersTableView speakers={speakersData} />;
}
