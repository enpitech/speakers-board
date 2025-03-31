import {
  Calendar,
  Clock,
  FileWarningIcon,
  Globe,
  MapPin,
  MessageSquare,
  Star,
  Users,
} from 'lucide-react';
import { Suspense } from 'react';
import { Await, Link } from 'react-router';
import { ComponentErrorBoundary } from '~/components/ComponentErrorBoundary';
import { Spinner } from '~/components/Spinner';
import { Badge } from '~/components/ui/badge';
import { Button } from '~/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '~/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '~/components/ui/tabs';

import type { Speaker, Session, Review, SocialNetwork } from '~/lib/types';

type LoaderData = {
  speaker: Promise<Speaker>;
  upcomingSessions: Promise<Session[]>;
  pastSessions: Promise<Session[]>;
  reviews: Promise<Review[]>;
};

export async function loader({ params }: { params: { speakerId: string } }): Promise<LoaderData> {
  const reviewsPromise = await fetch(
    `${process.env.API_BASE_URL}/reviews?speakerId=${params.speakerId}`,
  );
  const upcomingSessions: Promise<Session[]> = new Promise(resolve => {
    setTimeout(() => {
      resolve([
        {
          id: 's1',
          title: 'Modern React Patterns for 2023',
          date: 'April 15, 2023',
          time: '14:00 - 16:00',
          location: 'TechHub Berlin',
          attendees: 45,
          videoUrl: '#',
        },
        {
          id: 's2',
          title: 'TypeScript Deep Dive Workshop',
          date: 'May 3, 2023',
          time: '10:00 - 17:00',
          location: 'Online',
          attendees: 120,
          videoUrl: '#',
        },
      ]);
    }, 1500);
  });
  const reviews: Promise<Review[]> = new Promise(resolve => {
    setTimeout(async () => {
      resolve(await reviewsPromise.json());
    }, 2500);
  });
  const pastSessions: Promise<Session[]> = new Promise(resolve => {
    setTimeout(() => {
      resolve([
        {
          id: 'ps1',
          title: 'Building Accessible Web Applications',
          date: 'February 10, 2023',
          time: '10:00 - 17:00',
          location: 'Online',
          videoUrl: '#',
          attendees: 78,
        },
        {
          id: 'ps2',
          title: 'Tailwind CSS: From Zero to Hero',
          date: 'January 22, 2023',
          time: '10:00 - 17:00',
          location: 'Online',
          videoUrl: '#',
          attendees: 92,
        },
        {
          id: 'ps3',
          title: 'React Performance Optimization',
          date: 'December 5, 2022',
          time: '10:00 - 17:00',
          location: 'Online',
          videoUrl: '#',
          attendees: 65,
        },
      ]);
    }, 3000);
  });
  const speaker: Promise<Speaker> = new Promise(resolve => {
    setTimeout(async () => {
      await fetch(`${process.env.API_BASE_URL}/speakers/${params.speakerId}`)
        .then(res => res.json())
        .then(resolve);
    }, 1000);
  });
  return { speaker, upcomingSessions, pastSessions, reviews };
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

export default function SpeakerProfilePage({ loaderData }: { loaderData: LoaderData }) {
  const { speaker, upcomingSessions, pastSessions, reviews } = loaderData;
  return (
    <div className="mx-auto">
      <Suspense fallback={<div>Loading...</div>}>
        <Await resolve={speaker}>{speaker => <SpeakerPageHeader speaker={speaker} />}</Await>
      </Suspense>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <Suspense fallback={<div>Loading...</div>}>
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
                <Await resolve={upcomingSessions}>
                  {sessions => <SpeakerUpcomingSessions sessions={sessions} />}
                </Await>
              </Suspense>
            </TabsContent>

            <TabsContent value="past">
              <Suspense fallback={<Spinner />}>
                <Await resolve={pastSessions}>
                  {sessions => <SpeakerPastSessions sessions={sessions} />}
                </Await>
              </Suspense>
            </TabsContent>

            <TabsContent value="reviews">
              <Suspense fallback={<Spinner />}>
                <Await resolve={reviews}>
                  {reviews => (
                    <SpeakerReviews reviews={reviews} rating={5} reviewsCount={reviews.length} />
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

const SpeakerPageAbout = ({ speaker }: { speaker: Speaker }) => {
  const { bio, topics, languages } = speaker;
  return (
    <div className="md:col-span-1 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>About</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-[#939393]">{bio}</p>
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

const Languages = ({ languages }: { languages: string[] }) => {
  return <div>Languages</div>;
};
const SpeakerUpcomingSessions = ({ sessions }: { sessions: Session[] }) => {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold text-[#006699]">Upcoming Sessions</h2>

      {sessions.map(({ id, title, date, time, location, attendees }) => (
        <Card key={id} className="overflow-hidden">
          <div className="border-l-4 border-primary">
            <CardHeader>
              <CardTitle>{title}</CardTitle>
              <CardDescription>
                <div className="flex flex-wrap gap-4 mt-2">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4 text-[#939393]" />
                    <span>{date}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4 text-[#939393]" />
                    <span>{time}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MapPin className="w-4 h-4 text-[#939393]" />
                    <span>{location}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="w-4 h-4 text-[#939393]" />
                    <span>{attendees} attendees</span>
                  </div>
                </div>
              </CardDescription>
            </CardHeader>
            <CardContent className="flex justify-end">
              <Button>Register Now</Button>
            </CardContent>
          </div>
        </Card>
      ))}

      {(!sessions || sessions.length === 0) && (
        <div className="text-center py-8 text-[#939393]">No upcoming sessions at the moment.</div>
      )}
    </div>
  );
};

const SpeakerPastSessions = ({ sessions }: { sessions: Session[] }) => {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold text-[#006699]">Past Sessions</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {sessions.map(({ id, title, date, attendees, videoUrl }) => (
          <Card key={id} className="overflow-hidden">
            <div className="border-l-4 border-primary">
              <CardHeader>
                <CardTitle className="text-lg">{title}</CardTitle>
                <CardDescription>
                  <div className="flex flex-wrap gap-2 mt-2">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4 text-[#939393]" />
                      <span>{date}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="w-4 h-4 text-[#939393]" />
                      <span>{attendees} attendees</span>
                    </div>
                  </div>
                </CardDescription>
              </CardHeader>
              <CardContent className="flex justify-end">
                {videoUrl && (
                  <Button variant="outline" color="secondary">
                    <SocialIcon platform="youtube" />
                    <span className="ml-2">Watch Recording</span>
                  </Button>
                )}
              </CardContent>
            </div>
          </Card>
        ))}
      </div>

      {(!sessions || sessions.length === 0) && (
        <div className="text-center py-8 text-[#939393]">No past sessions available.</div>
      )}
    </div>
  );
};

const SpeakerReviews = ({
  reviews,
  rating,
  reviewsCount,
}: {
  reviews: Review[];
  rating: number;
  reviewsCount: number;
}) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold text-[#006699]">Reviews</h2>
        <div className="flex items-center gap-2">
          <span className="font-bold text-lg text-[#10bc4c]">{rating}.0</span>
          <div className="flex">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={`w-5 h-5 ${i < rating ? 'fill-[#10bc4c] text-[#10bc4c]' : 'fill-[#d0d8e8] text-[#d0d8e8]'}`}
              />
            ))}
          </div>
          <span className="text-[#939393]">({reviewsCount} reviews)</span>
        </div>
      </div>

      <div className="space-y-4">
        {reviews.map(review => (
          <Card key={review.id}>
            <CardContent className="pt-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0">
                  {review.avatar ? (
                    <img
                      src={review.avatar || '/placeholder.svg'}
                      alt={review.author}
                      width={40}
                      height={40}
                      className="object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-[#eefaff] flex items-center justify-center text-[#006699] text-sm font-bold">
                      {review.author.charAt(0)}
                    </div>
                  )}
                </div>

                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold">{review.author}</h3>
                    <span className="text-sm text-[#939393]">{review.date}</span>
                  </div>

                  <div className="flex my-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${i < review.rating ? 'fill-[#10bc4c] text-[#10bc4c]' : 'fill-[#d0d8e8] text-[#d0d8e8]'}`}
                      />
                    ))}
                  </div>

                  <p className="text-[#939393] mt-2">{review.text}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {(!reviews || reviews.length === 0) && (
        <div className="text-center py-8 text-[#939393]">No reviews available yet.</div>
      )}

      <div className="flex justify-center mt-8">
        <Button>
          <MessageSquare className="w-4 h-4 mr-2" />
          Write a Review
        </Button>
      </div>
    </div>
  );
};
