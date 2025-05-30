export type SocialNetwork =
  | 'linkedin'
  | 'twitter'
  | 'facebook'
  | 'instagram'
  | 'youtube'
  | 'github'
  | 'tiktok'
  | 'spotify'
  | 'discord';

export type SocialLink = {
  platform: SocialNetwork;
  url: string;
};
export type Speaker = {
  id: string;
  name: string;
  avatar?: string;
  bio?: string;
  location?: string;
  experience?: string;
  topics: string[];
  languages: string[];
  socialLinks: SocialLink[];
  rating: number;
  sessionsUrl?: string;
};

export type Session = {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  attendees: number;
  videoUrl?: string;
};

export type Review = {
  id: string;
  author: string;
  avatar?: string;
  rating: number;
  text: string;
  date: string;
  speakerId: string;
};

export type SpeakerFormData = {
  name: string;
  languages: string[];
  topics: string[];
  sessionsUrl: string;
  socialLinks: SocialLink[];
  avatar?: string;
  bio?: string;
  location?: string;
  experience?: string;
};

export type SpeakersDashboardFilters = {
  language: string[];
  topic: string[];
  rating: number | null;
};

export type SpeakerPageLoaderData = {
  speaker: Speaker;
  sessions: Session[];
  reviews: Review[];
};

export type SpeakersLoaderData = {
  speakers: Promise<Speaker[]>;
  languages: Promise<string[]>;
  topics: Promise<string[]>;
};
export type ReviewLoaderData = {
  reviews: Promise<Review[]>;
};
export type SessionFeedLoaderData = {
  sessions: Promise<Session[]>;
};

export type SocialNetworkOption = {
  value: SocialNetwork;
  label: string;
  icon: React.ReactNode;
};
