import { Clock, FileWarningIcon, Globe, MapPin, Star, Pencil } from 'lucide-react';
import { Suspense, useState } from 'react';
import { Await, Link, Form } from 'react-router';
import { ComponentErrorBoundary } from '~/components/ComponentErrorBoundary';
import { SessionCard } from '~/components/SessionCard';
import { Spinner } from '~/components/Spinner';
import { Badge } from '~/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '~/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '~/components/ui/tabs';
import { speakerPageLoader } from '~/lib/loaders/speaker.loader';
import { TextareaInput } from '~/components/ui/form/TextareaInput';

import type { Speaker, Session, Review, SocialNetwork, SpeakerPageLoaderData } from '~/lib/types';
import { EmptyResponseView } from '../components/EmptyResponseView';
import ReviewsFeed from './reviews-feed';
import { Button } from '~/components/ui/button';

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

const SocialIcon = ({ platform }: { platform: SocialNetwork }) => {
  switch (platform) {
    case 'linkedin':
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="#006699"
        >
          <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
        </svg>
      );
    case 'instagram':
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="#d62976"
        >
          <path d="M12 2c2.717 0 3.056.01 4.122.06 1.065.05 1.79.217 2.428.465.66.254 1.216.598 1.772 1.153a4.908 4.908 0 0 1 1.153 1.772c.247.637.415 1.363.465 2.428.047 1.066.06 1.405.06 4.122 0 2.717-.01 3.056-.06 4.122-.05 1.065-.218 1.79-.465 2.428a4.883 4.883 0 0 1-1.153 1.772 4.915 4.915 0 0 1-1.772 1.153c-.637.247-1.363.415-2.428.465-1.066.047-1.405.06-4.122.06-2.717 0-3.056-.01-4.122-.06-1.065-.05-1.79-.218-2.428-.465a4.89 4.89 0 0 1-1.772-1.153 4.904 4.904 0 0 1-1.153-1.772c-.248-.637-.415-1.363-.465-2.428C2.013 15.056 2 14.717 2 12c0-2.717.01-3.056.06-4.122.05-1.066.217-1.79.465-2.428a4.88 4.88 0 0 1 1.153-1.772A4.897 4.897 0 0 1 5.45 2.525c.638-.248 1.362-.415 2.428-.465C8.944 2.013 9.283 2 12 2zm0 1.802c-2.67 0-2.986.01-4.04.059-.976.045-1.505.207-1.858.344-.466.182-.8.398-1.15.748-.35.35-.566.684-.748 1.15-.137.353-.3.882-.344 1.857-.048 1.055-.058 1.37-.058 4.04 0 2.67.01 2.986.058 4.04.045.976.207 1.505.344 1.858.182.466.398.8.748 1.15.35.35.684.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.04.058 2.67 0 2.986-.01 4.04-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.684.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.04 0-2.67-.01-2.986-.058-4.04-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 0 0-.748-1.15 3.098 3.098 0 0 0-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.055-.048-1.37-.058-4.04-.058zm0 3.063a5.135 5.135 0 1 1 0 10.27 5.135 5.135 0 0 1 0-10.27zm0 8.468a3.333 3.333 0 1 0 0-6.666 3.333 3.333 0 0 0 0 6.666zm6.538-8.671a1.2 1.2 0 1 1-2.4 0 1.2 1.2 0 0 1 2.4 0z" />
        </svg>
      );
    case 'youtube':
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="#FF0000"
        >
          <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" />
        </svg>
      );
    case 'twitter':
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="#1DA1F2"
        >
          <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
        </svg>
      );
    case 'github':
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="#333"
        >
          <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
        </svg>
      );
    default:
      return null;
  }
};

export default function SpeakerProfilePage({ loaderData }: { loaderData: SpeakerPageLoaderData }) {
  const { speaker, sessions, reviews } = loaderData;
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
              <TabsTrigger value="upcoming">Upcoming Sessions</TabsTrigger>
              <TabsTrigger value="past">Past Sessions</TabsTrigger>
              <TabsTrigger value="reviews">Reviews</TabsTrigger>
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

const SpeakerPageHeader = ({ speaker }: { speaker: Speaker }) => {
  const { avatar, name, location, experience, rating, sessionsUrl, socialLinks } = speaker;
  return (
    <div className="bg-[#eefaff] rounded-lg overflow-hidden mb-8">
      <div className="h-48 bg-gradient-to-r from-[#006699] to-[#8fb8c3]"></div>
      <div className="bg-white p-6 relative">
        <div className="absolute -top-16 left-8 w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-md">
          {avatar ? (
            <img
              src={avatar || '/placeholder.svg'}
              alt={name}
              className="object-cover w-full h-full"
            />
          ) : (
            <div className="w-full h-full bg-[#eefaff] flex items-center justify-center text-[#006699] text-4xl font-bold">
              {name.charAt(0)}
            </div>
          )}
        </div>

        <div className="ml-44 flex flex-col md:flex-row md:items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-[#006699]">{name}</h1>
            <div className="flex items-center gap-2 text-[#939393] mt-1">
              {location && (
                <div className="flex items-center gap-1">
                  <MapPin className="w-4 h-4" />
                  <span>{location}</span>
                </div>
              )}
              {experience && (
                <div className="flex items-center gap-1 ml-4">
                  <Clock className="w-4 h-4" />
                  <span>{experience}</span>
                </div>
              )}
            </div>
          </div>

          <div className="flex items-center gap-2 mt-4 md:mt-0">
            {/* Rating */}
            <div className="flex items-center bg-white px-3 py-1 rounded-full shadow-sm">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={`w-5 h-5 ${i < rating ? 'fill-[#10bc4c] text-[#10bc4c]' : 'fill-[#d0d8e8] text-[#d0d8e8]'}`}
                />
              ))}
            </div>

            {sessionsUrl && (
              <Link
                to={sessionsUrl}
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#006699] text-white hover:bg-[#005588] transition-colors"
              >
                View All Sessions
                <SocialIcon platform="youtube" />
              </Link>
            )}
          </div>
        </div>

        {/* Social Links */}
        <div className="ml-44 flex items-center gap-3 mt-4">
          {socialLinks.map((link, index) => (
            <Link
              key={index}
              to={link.url}
              className="hover:opacity-80 transition-opacity"
              aria-label={`${link.platform} profile`}
            >
              <SocialIcon platform={link.platform} />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};
const SpeakerPageHeaderSkeleton = () => {
  return (
    <div className="bg-[#eefaff] rounded-lg overflow-hidden mb-8">
      {/* Banner skeleton */}
      <div className="h-48 bg-gradient-to-r from-gray-200 to-gray-300 animate-pulse"></div>

      <div className="bg-white p-6 relative">
        {/* Avatar skeleton */}
        <div className="absolute -top-16 left-8 w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-md">
          <div className="w-full h-full bg-gray-200 animate-pulse"></div>
        </div>

        <div className="ml-44 flex flex-col md:flex-row md:items-center justify-between">
          <div>
            {/* Name skeleton */}
            <div className="h-9 w-48 bg-gray-200 rounded animate-pulse mb-2"></div>

            {/* Location and experience skeleton */}
            <div className="flex items-center gap-2 mt-1">
              <div className="flex items-center gap-1">
                <div className="w-24 h-5 bg-gray-200 rounded animate-pulse"></div>
              </div>
              <div className="flex items-center gap-1 ml-4">
                <div className="w-24 h-5 bg-gray-200 rounded animate-pulse"></div>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 mt-4 md:mt-0">
            {/* Rating skeleton */}
            <div className="flex items-center gap-1 bg-white px-3 py-1 rounded-full shadow-sm">
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="w-5 h-5 bg-gray-200 rounded animate-pulse"></div>
              ))}
            </div>

            {/* Button skeleton */}
            <div className="w-40 h-10 bg-gray-200 rounded-full animate-pulse"></div>
          </div>
        </div>

        {/* Social links skeleton */}
        <div className="ml-44 flex items-center gap-3 mt-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="w-6 h-6 bg-gray-200 rounded-full animate-pulse"></div>
          ))}
        </div>
      </div>
    </div>
  );
};

const SpeakerPageAbout = ({ speaker }: { speaker: Speaker }) => {
  const { bio, topics, languages } = speaker;
  const [isEditing, setIsEditing] = useState(false);
  const [editedBio, setEditedBio] = useState(bio);

  return (
    <div className="md:col-span-1 space-y-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>About</CardTitle>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsEditing(!isEditing)}
            className="h-8 w-8 p-0"
          >
            <Pencil className="h-4 w-4" />
          </Button>
        </CardHeader>
        <CardContent>
          {isEditing ? (
            <Form method="post" className="space-y-4">
              <TextareaInput
                name="bio"
                value={editedBio}
                onChange={e => setEditedBio(e.target.value)}
                placeholder="Tell us about yourself..."
                className="min-h-[100px]"
              />
              <div className="flex justify-end gap-2">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setIsEditing(false);
                    setEditedBio(bio);
                  }}
                >
                  Cancel
                </Button>
                <Button type="submit" size="sm">
                  Save
                </Button>
              </div>
            </Form>
          ) : (
            <p className="text-[#939393]">{bio}</p>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Expertise</CardTitle>
        </CardHeader>
        <CardContent>
          <ComponentErrorBoundary
            onError={error => {
              console.log('Error loading expertise', error);
            }}
            fallback={
              <div className="flex flex-col items-center gap-2 bg-red-200 p-4 rounded-lg">
                Error loading Expertise
                <FileWarningIcon color="red" />
              </div>
            }
          >
            <Expertise topics={topics} />
          </ComponentErrorBoundary>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Languages</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {languages.map((language, index) => (
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
};

const SpeakerPageAboutSkeleton = () => {
  return (
    <div className="md:col-span-1 space-y-6">
      {/* About Card Skeleton */}
      <Card>
        <CardHeader>
          <CardTitle>About</CardTitle>
        </CardHeader>
        <CardContent>
          {/* Bio skeleton with multiple lines */}
          <div className="space-y-2">
            <div className="h-4 bg-gray-200 rounded animate-pulse w-full"></div>
            <div className="h-4 bg-gray-200 rounded animate-pulse w-3/4"></div>
            <div className="h-4 bg-gray-200 rounded animate-pulse w-5/6"></div>
          </div>
        </CardContent>
      </Card>

      {/* Expertise Card Skeleton */}
      <Card>
        <CardHeader>
          <CardTitle>Expertise</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {/* Multiple badge skeletons */}
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="h-6 w-20 bg-gray-200 rounded-full animate-pulse"></div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Languages Card Skeleton */}
      <Card>
        <CardHeader>
          <CardTitle>Languages</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {/* Language item skeletons */}
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="flex items-center gap-2">
                <div className="w-4 h-4 bg-gray-200 rounded animate-pulse"></div>
                <div className="w-24 h-4 bg-gray-200 rounded animate-pulse"></div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
const Expertise = ({ topics }: { topics: string[] }) => {
  throw new Error('BLBLBLB');
  return (
    <div className="flex flex-wrap gap-2">
      {topics.map((topic, index) => (
        <Badge key={index} className="bg-[#eefaff] text-[#006699] hover:bg-[#d0d8e8]">
          {topic}
        </Badge>
      ))}
    </div>
  );
};

const SpeakerUpcomingSessions = ({ sessions }: { sessions: Session[] }) => {
  const upcomingSessions = sessions.filter(session => new Date(session.date) > new Date());
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold text-[#006699]">Upcoming Sessions</h2>
      {upcomingSessions.map(session => (
        <SessionCard key={session.id} session={session} />
      ))}
      {!upcomingSessions.length && (
        <EmptyResponseView message="No upcoming sessions at the moment." />
      )}
    </div>
  );
};

const SpeakerPastSessions = ({ sessions }: { sessions: Session[] }) => {
  const pastSessions = sessions.filter(session => new Date(session.date) < new Date());
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold text-[#006699]">Past Sessions</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {pastSessions.map(session => (
          <SessionCard key={session.id} session={session} />
        ))}
      </div>

      {!pastSessions.length && <EmptyResponseView message="No past sessions available." />}
    </div>
  );
};
