import { Suspense } from 'react';
import { Await } from 'react-router';
import { SpeakersTableView, SuspendedSpeakersTableView } from '~/components/SpeakersTableView';
import type { Speaker } from '~/lib/types';
// import { SuspendedSpeakersTableView } from '~/components/SuspendedSpeakersTableView';

type LoaderData = {
  speakers: Promise<Speaker[]>;
};

export async function loader(): Promise<LoaderData> {
  const speakers = await fetch(`${process.env.API_BASE_URL}/speakers`);
  return { speakers: new Promise(resolve => setTimeout(() => resolve(speakers.json()), 2000)) };
}

export default function Speakers({ loaderData }: { loaderData: LoaderData }) {
  const { speakers } = loaderData;
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Await resolve={speakers}>{speakers => <SpeakersTableView speakers={speakers} />}</Await>
    </Suspense>
  );
  //   return (
  //     <Suspense fallback={<div>Loading...</div>}>
  //       <SuspendedSpeakersTableView speakers={speakers} />
  //     </Suspense>
  //   );
}
