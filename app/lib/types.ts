export type Speaker = {
  id: string;
  name: string;
  avatar?: string;
  topics: string[];
  languages: string[];
  socialLinks: {
    platform:
      | 'linkedin'
      | 'twitter'
      | 'facebook'
      | 'instagram'
      | 'youtube'
      | 'github'
      | 'tiktok'
      | 'spotify'
      | 'discord';
    url: string;
  }[];
  rating: number;
  sessionsUrl?: string;
};
