import { Suspense } from 'react';
import { Await, Outlet, useNavigate } from 'react-router';
import { useTranslation } from 'react-i18next';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '~/components/ui/tabs';
import { speakerPageLoader } from '~/lib/loaders/speaker.loader';
import type { SpeakerPageLoaderData } from '~/lib/types';
import { SpeakerPageHeader } from '~/components/SpeakerPageHeader';
import { SpeakerPageHeaderSkeleton } from '~/components/SpeakerPageHeaderSkeleton';
import { SpeakerPageAbout } from '~/components/SpeakerPageAbout';
import { SpeakerPageAboutSkeleton } from '~/components/SpeakerPageAboutSkeleton';
import { updateSpeakerBio } from '~/lib/actions/updateSpeakerBio';

export const loader = speakerPageLoader;

export const action = updateSpeakerBio;

export default function SpeakerProfilePage({ loaderData }: { loaderData: SpeakerPageLoaderData }) {
  const { speaker } = loaderData;
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleTabChange = (value: string) => {
    navigate(value, { replace: true, preventScrollReset: true });
  };

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
          <Tabs defaultValue="sessions">
            <TabsList className="grid grid-cols-2 mb-6">
              <TabsTrigger value="sessions" onClick={() => handleTabChange('sessions')}>
                {t('sessions.title')}
              </TabsTrigger>
              <TabsTrigger value="reviews" onClick={() => handleTabChange('reviews')}>
                {t('reviews.title')}
              </TabsTrigger>
            </TabsList>

            <TabsContent value="sessions">
              <Outlet />
            </TabsContent>
            <TabsContent value="reviews">
              <Outlet />
            </TabsContent>
          </Tabs>
          <Outlet />
        </div>
      </div>
    </div>
  );
}
