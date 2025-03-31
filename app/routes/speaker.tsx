import { Suspense } from 'react';
import { Await } from 'react-router';
import { useTranslation } from 'react-i18next';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '~/components/ui/tabs';
import { Spinner } from '~/components/Spinner';
import { speakerPageLoader } from '~/lib/loaders/speaker.loader';
import type { SpeakerPageLoaderData } from '~/lib/types';
import { SpeakerPageHeader } from '~/components/SpeakerPageHeader';
import { SpeakerPageHeaderSkeleton } from '~/components/SpeakerPageHeaderSkeleton';
import { SpeakerPageAbout } from '~/components/SpeakerPageAbout';
import { SpeakerPageAboutSkeleton } from '~/components/SpeakerPageAboutSkeleton';
import { SpeakerUpcomingSessions } from '~/components/SpeakerUpcomingSessions';
import { SpeakerPastSessions } from '~/components/SpeakerPastSessions';
import ReviewsFeed from './reviews-feed';

export const loader = speakerPageLoader;

export async function action({
  request,
  params,
}: {
  request: Request;
  params: { speakerId: string };
}) {
  const formData = await request.formData();
  const bio = formData.get('bio') as string;

  try {
    // await sleep(3000);
    const response = await fetch(`${process.env.API_BASE_URL}/speakers/${params.speakerId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ bio }),
    });

    if (!response.ok) {
      throw new Error('Failed to update speaker bio');
    }

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response(
      JSON.stringify({ errors: { _form: 'Failed to update bio. Please try again.' } }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      },
    );
  }
}

export default function SpeakerProfilePage({ loaderData }: { loaderData: SpeakerPageLoaderData }) {
  const { speaker, sessions, reviews } = loaderData;
  const { t } = useTranslation();
  
  return (
    <div className="mx-auto">
      <Suspense fallback={<SpeakerPageHeaderSkeleton />}>
        <Await resolve={speaker}>{speaker => <SpeakerPageHeader speaker={speaker} />}</Await>
      </Suspense>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <Suspense fallback={<SpeakerPageAboutSkeleton />}>
          <Await resolve={speaker}>{speaker => <SpeakerPageAbout speaker={speaker} />}</Await>
        </Suspense>

        <div className="md:col-span-2">
          <Tabs defaultValue="upcoming">
            <TabsList className="grid grid-cols-3 mb-6">
              <TabsTrigger value="upcoming">{t('tab.upcoming')}</TabsTrigger>
              <TabsTrigger value="past">{t('tab.past')}</TabsTrigger>
              <TabsTrigger value="reviews">{t('tab.reviews')}</TabsTrigger>
            </TabsList>

            <TabsContent value="upcoming">
              <Suspense fallback={<Spinner />}>
                <Await resolve={sessions}>
                  {sessions => <SpeakerUpcomingSessions sessions={sessions} />}
                </Await>
              </Suspense>
            </TabsContent>

            <TabsContent value="past">
              <Suspense fallback={<Spinner />}>
                <Await resolve={sessions}>
                  {sessions => <SpeakerPastSessions sessions={sessions} />}
                </Await>
              </Suspense>
            </TabsContent>

            <TabsContent value="reviews">
              <Suspense fallback={<Spinner />}>
                <Await resolve={reviews}>
                  {reviews => (
                    <ReviewsFeed
                      speakerId={speaker.id}
                      reviews={reviews}
                      rating={5}
                      reviewsCount={reviews.length}
                      maxHeight="600px"
                    />
                  )}
                </Await>
              </Suspense>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
