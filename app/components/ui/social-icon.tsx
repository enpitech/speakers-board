import {
  Facebook,
  Twitter,
  Linkedin,
  Instagram,
  Youtube,
  Github,
  TwitterIcon as TikTok,
  Music as Spotify,
  MessageCircle as Discord,
} from "lucide-react";

type Platform =
  | "linkedin"
  | "twitter"
  | "facebook"
  | "instagram"
  | "youtube"
  | "github"
  | "tiktok"
  | "spotify"
  | "discord";

interface SocialIconProps {
  platform: Platform;
  className?: string;
}

const platformIcons: Record<Platform, typeof Facebook> = {
  linkedin: Linkedin,
  twitter: Twitter,
  facebook: Facebook,
  instagram: Instagram,
  youtube: Youtube,
  github: Github,
  tiktok: TikTok,
  spotify: Spotify,
  discord: Discord,
};

export function SocialIcon({ platform, className }: SocialIconProps) {
  const Icon = platformIcons[platform];
  return <Icon className={className} />;
}
