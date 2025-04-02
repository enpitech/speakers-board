import { useTranslation } from 'react-i18next';
import type { Route } from './+types/home';
import { Link } from 'react-router';
import {
  Badge,
  Code,
  Star,
  ChevronRight,
  Globe,
  Calendar,
  Youtube,
  Linkedin,
  Github,
  Twitter,
  Instagram,
} from 'lucide-react';
import { Button } from '~/components/ui/button';
import { Card, CardContent } from '~/components/ui/card';
import { getSpeakers } from '~/lib/fetchers/getSpeakers';

export const loader = async () => {
  const speakers = await getSpeakers({});
  return { speakers };
};
export function meta({}: Route.MetaArgs) {
  return [
    { title: 'Speakers Board' },
    { name: 'description', content: 'Welcome to the Frontendistim Speakers Board!' },
  ];
}

export default function Home({ loaderData }: { loaderData: Awaited<ReturnType<typeof loader>> }) {
  const { speakers } = loaderData;
  const { t } = useTranslation();
  return (
    <div className="flex flex-col min-h-screen">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex items-center justify-center w-8 h-8 rounded-md bg-[#f79326] text-white">
              <Code className="w-5 h-5" />
            </div>
            <span className="text-xl font-bold">Frontendisting</span>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <Link to="#speakers" className="text-sm font-medium hover:underline underline-offset-4">
              Speakers
            </Link>
            <Link to="#topics" className="text-sm font-medium hover:underline underline-offset-4">
              Topics
            </Link>
            <Link to="#events" className="text-sm font-medium hover:underline underline-offset-4">
              Events
            </Link>
            <Link
              to="#community"
              className="text-sm font-medium hover:underline underline-offset-4"
            >
              Community
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <Button variant="outline" size="sm">
              Log in
            </Button>
            <Button size="sm" className="bg-[#48469d] hover:bg-[#3b3e98]">
              Register as a lecturer
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-20 md:py-28 bg-gradient-to-b from-[#eefbff] to-white">
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <Badge className="w-fit bg-[#fed6b6] text-[#f79326] border-[#f79326]">
                    Frontend Engineering Community
                  </Badge>
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none text-[#03293f]">
                    Connect with Expert Frontend Speakers
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl">
                    Find the perfect speaker for your next tech event. Filter by expertise,
                    technology stack, and language.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Button size="lg" className="px-8 bg-[#48469d] hover:bg-[#3b3e98]">
                    Find Speakers
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                  <Button size="lg" variant="outline">
                    Become a Speaker
                  </Button>
                </div>
                <div className="flex items-center gap-4 pt-4">
                  <div className="flex -space-x-2">
                    {[1, 2, 3, 4].map(i => (
                      <div key={i} className="inline-block rounded-full ring-2 ring-background">
                        <img
                          src={`/placeholder.svg?height=40&width=40&text=Dev${i}`}
                          alt={`Developer ${i}`}
                          width={40}
                          height={40}
                          className="rounded-full object-cover"
                        />
                      </div>
                    ))}
                  </div>
                  <div className="flex flex-col">
                    <div className="flex items-center gap-1">
                      {[1, 2, 3, 4, 5].map(i => (
                        <Star key={i} className="h-4 w-4 fill-[#f79326] text-[#f79326]" />
                      ))}
                    </div>
                    <span className="text-sm text-muted-foreground">
                      Trusted by 5,000+ frontend developers
                    </span>
                  </div>
                </div>
              </div>
              <div className="relative mx-auto lg:ml-auto">
                <div className="relative overflow-hidden rounded-lg border bg-background p-2 shadow-xl">
                  <img
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Frontendistim___App-ay269cchZvad69wl2vY4DRFzRGWmn5.png"
                    alt="Frontendisting App Screenshot"
                    width={600}
                    height={400}
                    className="rounded-md object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="bg-[#eefaff] py-16 md:py-24">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <Badge className="w-fit mx-auto bg-[#fed6b6] text-[#f79326] border-[#f79326]">
                  Features
                </Badge>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-[#03293f]">
                  Everything You Need to Find Frontend Experts
                </h2>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                  Our platform connects event organizers with top frontend engineering speakers.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-3 lg:gap-12 pt-12">
              {[
                {
                  icon: <Code className="h-10 w-10 text-[#48469d]" />,
                  title: 'Technical Expertise',
                  description:
                    'Find speakers specialized in React, TypeScript, Tailwind, and other frontend technologies.',
                },
                {
                  icon: <Globe className="h-10 w-10 text-[#48469d]" />,
                  title: 'Multiple Languages',
                  description:
                    'Connect with speakers who can present in various languages for your international events.',
                },
                {
                  icon: <Calendar className="h-10 w-10 text-[#48469d]" />,
                  title: 'Session Booking',
                  description:
                    'Easily schedule and book speakers for conferences, meetups, and workshops.',
                },
              ].map((feature, index) => (
                <Card key={index} className="border-none shadow-none bg-white">
                  <CardContent className="flex flex-col items-center space-y-4 p-6 text-center">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#decfe6]">
                      {feature.icon}
                    </div>
                    <h3 className="text-xl font-bold text-[#03293f]">{feature.title}</h3>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Speakers Section */}
        <section id="speakers" className="py-16 md:py-24">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <Badge className="w-fit mx-auto bg-[#fed6b6] text-[#f79326] border-[#f79326]">
                  Our Speakers
                </Badge>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-[#03293f]">
                  Meet Our Top Frontend Experts
                </h2>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                  Connect with experienced speakers who are passionate about sharing their
                  knowledge.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 pt-12">
              {[
                {
                  name: 'Dana Harari',
                  topics: 'React, TypeScript, Tailwind',
                  languages: 'English, Hebrew, German',
                  rating: 5,
                  socials: ['linkedin', 'spotify', 'instagram'],
                },
                {
                  name: 'Shalev Amari',
                  topics: 'React',
                  languages: 'English, Hebrew',
                  rating: 4,
                  socials: ['twitter', 'tiktok', 'facebook', 'linkedin', 'instagram'],
                },
                {
                  name: 'Lana Kochovski',
                  topics: 'TypeScript, Tailwind',
                  languages: 'Hebrew, Russian',
                  rating: 3,
                  socials: ['facebook', 'linkedin', 'instagram', 'discord', 'github'],
                },
                {
                  name: 'Mor Desa',
                  topics: 'React, Tailwind',
                  languages: 'English, Hebrew, Amharic',
                  rating: 5,
                  socials: ['tiktok', 'facebook', 'linkedin', 'instagram'],
                },
                {
                  name: 'Sharon Amsalem',
                  topics: 'React, TypeScript',
                  languages: 'English, Hebrew, Spanish',
                  rating: 4,
                  socials: [
                    'twitter',
                    'tiktok',
                    'facebook',
                    'linkedin',
                    'spotify',
                    'instagram',
                    'discord',
                    'github',
                  ],
                },
                {
                  name: 'Yogel Nahalal',
                  topics: 'React, TypeScript, Tailwind',
                  languages: 'English, Hebrew, Czech',
                  rating: 5,
                  socials: ['tiktok', 'facebook', 'linkedin', 'instagram'],
                },
              ].map((speaker, index) => (
                <Card key={index} className="overflow-hidden">
                  <CardContent className="p-0">
                    <div className="flex items-start space-x-4 p-6">
                      <img
                        src={`/placeholder.svg?height=60&width=60&text=${speaker.name.charAt(0)}`}
                        alt={speaker.name}
                        width={60}
                        height={60}
                        className="rounded-full object-cover"
                      />
                      <div className="space-y-1">
                        <h3 className="font-bold text-[#03293f]">{speaker.name}</h3>
                        <div className="flex flex-col space-y-1 text-sm text-muted-foreground">
                          <span>{speaker.topics}</span>
                          <span>{speaker.languages}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between border-t px-6 py-3">
                      <div className="flex items-center gap-1">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${
                              i < Math.floor(speaker.rating)
                                ? 'fill-[#f79326] text-[#f79326]'
                                : 'fill-muted text-muted'
                            }`}
                          />
                        ))}
                      </div>
                      <div className="flex gap-2">
                        <Button variant="ghost" size="sm" className="h-8 w-8">
                          <Youtube className="h-4 w-4 text-red-500" />
                        </Button>
                      </div>
                    </div>
                    <div className="flex items-center justify-between border-t px-6 py-3">
                      <div className="flex gap-2">
                        {speaker.socials.includes('linkedin') && (
                          <Button variant="ghost" size="sm" className="h-8 w-8">
                            <Linkedin className="h-4 w-4 text-[#0077b5]" />
                          </Button>
                        )}
                        {speaker.socials.includes('github') && (
                          <Button variant="ghost" size="sm" className="h-8 w-8">
                            <Github className="h-4 w-4" />
                          </Button>
                        )}
                        {speaker.socials.includes('twitter') && (
                          <Button variant="ghost" size="sm" className="h-8 w-8">
                            <Twitter className="h-4 w-4 text-[#1da1f2]" />
                          </Button>
                        )}
                        {speaker.socials.includes('instagram') && (
                          <Button variant="ghost" size="sm" className="h-8 w-8">
                            <Instagram className="h-4 w-4 text-[#e1306c]" />
                          </Button>
                        )}
                        {speaker.socials.length > 4 && (
                          <Button variant="ghost" size="sm">
                            +{speaker.socials.length - 4}
                          </Button>
                        )}
                      </div>
                      <Button variant="outline" size="sm">
                        Sessions
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            <div className="flex justify-center mt-12">
              <Button size="lg" className="bg-[#48469d] hover:bg-[#3b3e98]">
                View All Speakers
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </section>

        {/* Topics Section */}
        <section id="topics" className="bg-[#eefaff] py-16 md:py-24">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <Badge className="w-fit mx-auto bg-[#fed6b6] text-[#f79326] border-[#f79326]">
                  Topics
                </Badge>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-[#03293f]">
                  Frontend Technologies
                </h2>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                  Find speakers specialized in the technologies you're interested in.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 pt-12">
              {[
                'React',
                'TypeScript',
                'Tailwind CSS',
                'Next.js',
                'Vue.js',
                'Angular',
                'JavaScript',
                'CSS',
                'HTML',
                'Svelte',
                'GraphQL',
                'Redux',
                'Webpack',
                'Vite',
                'Jest',
                'Testing Library',
              ].map((topic, index) => (
                <div
                  key={index}
                  className="flex items-center justify-center rounded-lg border bg-white p-4 text-center shadow-sm hover:shadow-md transition-shadow"
                >
                  <span className="font-medium text-[#03293f]">{topic}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Languages Section */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <Badge className="w-fit mx-auto bg-[#fed6b6] text-[#f79326] border-[#f79326]">
                  Languages
                </Badge>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-[#03293f]">
                  Multilingual Speakers
                </h2>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                  Our platform features speakers who can present in multiple languages.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 pt-12">
              {[
                'English',
                'Hebrew',
                'German',
                'Russian',
                'Spanish',
                'Czech',
                'Amharic',
                'French',
                'Arabic',
                'Portuguese',
                'Italian',
                'Dutch',
              ].map((language, index) => (
                <div
                  key={index}
                  className="flex items-center justify-center rounded-lg border bg-white p-4 text-center shadow-sm hover:shadow-md transition-shadow"
                >
                  <span className="font-medium text-[#03293f]">{language}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Events Section */}
        <section id="events" className="bg-[#eefaff] py-16 md:py-24">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <Badge className="w-fit mx-auto bg-[#fed6b6] text-[#f79326] border-[#f79326]">
                  Upcoming Events
                </Badge>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-[#03293f]">
                  Where You Can Meet Our Speakers
                </h2>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                  Join these upcoming events to learn from our expert speakers.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 pt-12">
              {[
                {
                  title: 'ReactConf 2025',
                  date: 'March 15-17, 2025',
                  location: 'Tel Aviv, Israel',
                  speakers: ['Dana Harari', 'Shalev Amari', 'Mor Desa'],
                },
                {
                  title: 'TypeScript Summit',
                  date: 'April 22-23, 2025',
                  location: 'Berlin, Germany',
                  speakers: ['Dana Harari', 'Lana Kochovski', 'Sharon Amsalem'],
                },
                {
                  title: 'Frontend Masters Workshop',
                  date: 'May 10, 2025',
                  location: 'Online',
                  speakers: ['Yogel Nahalal', 'Mor Desa'],
                },
              ].map((event, index) => (
                <Card key={index} className="overflow-hidden">
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      <h3 className="text-xl font-bold text-[#03293f]">{event.title}</h3>
                      <div className="flex flex-col space-y-1 text-sm text-muted-foreground">
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-[#f79326]" />
                          <span>{event.date}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Globe className="h-4 w-4 text-[#f79326]" />
                          <span>{event.location}</span>
                        </div>
                      </div>
                      <div className="pt-4">
                        <h4 className="text-sm font-semibold text-[#03293f] mb-2">
                          Featured Speakers:
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {event.speakers.map(speaker => (
                            <Badge key={speaker} className="bg-[#decfe6] text-[#452e8d]">
                              {speaker}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-[#48469d] text-white py-16 md:py-24">
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                    Join Our Frontend Community Today
                  </h2>
                  <p className="max-w-[600px] md:text-xl opacity-90">
                    Whether you're looking to speak at events or find the perfect speaker,
                    Frontendisting has you covered.
                  </p>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <div className="rounded-full bg-[#f79326] p-1">
                      <Star className="h-4 w-4 text-white" />
                    </div>
                    <span>Access to verified frontend experts</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="rounded-full bg-[#f79326] p-1">
                      <Star className="h-4 w-4 text-white" />
                    </div>
                    <span>Filter by technologies and languages</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="rounded-full bg-[#f79326] p-1">
                      <Star className="h-4 w-4 text-white" />
                    </div>
                    <span>Book sessions directly through the platform</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="rounded-full bg-[#f79326] p-1">
                      <Star className="h-4 w-4 text-white" />
                    </div>
                    <span>Connect via social media and professional networks</span>
                  </div>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row pt-4">
                  <Button size="lg" className="bg-white text-[#48469d] hover:bg-[#eefaff] px-8">
                    Register as a lecturer
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>
              <div className="relative mx-auto lg:ml-auto">
                <div className="relative overflow-hidden rounded-lg border bg-[#3b3e98] p-2 shadow-xl">
                  <img
                    src="/placeholder.svg?height=500&width=350&text=Join+Our+Community"
                    alt="Community illustration"
                    width={350}
                    height={500}
                    className="rounded-md object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t py-6 md:py-0 bg-[#03293f] text-white">
        <div className="container mx-auto flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
          <p className="text-center text-sm leading-loose md:text-left">
            © 2025 Frontendisting. All rights reserved.
          </p>
          <div className="flex items-center gap-4 text-sm">
            <Link to="#" className="hover:underline underline-offset-4">
              Terms
            </Link>
            <Link to="#" className="hover:underline underline-offset-4">
              Privacy
            </Link>
            <Link to="#" className="hover:underline underline-offset-4">
              Contact
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
