import { SocialIcon } from "./SocialIcon"

type SocialPlatform =
  | "linkedin"
  | "twitter"
  | "facebook"
  | "instagram"
  | "youtube"
  | "github"
  | "tiktok"
  | "spotify"
  | "discord"

export interface SocialLink {
  platform: SocialPlatform
  url: string
}

interface SocialIconsGroupProps {
  links: SocialLink[] | Record<SocialPlatform, string>
  className?: string
  iconSize?: "sm" | "md" | "lg"
  maxIcons?: number
  showCount?: boolean
}

export function SocialIconsGroup({
  links = [],
  className = "",
  iconSize = "md",
  maxIcons,
  showCount = false,
}: SocialIconsGroupProps) {
  // Convert object to array if needed
  const linksArray = Array.isArray(links)
    ? links
    : Object.entries(links).map(([platform, url]) => ({
        platform: platform as SocialPlatform,
        url,
      }))

  // Determine which links to display
  const displayLinks = maxIcons ? linksArray.slice(0, maxIcons) : linksArray
  const remainingCount = maxIcons && linksArray.length > maxIcons ? linksArray.length - maxIcons : 0

  // Size classes for the icons
  const sizeClasses = {
    sm: "h-6 w-6",
    md: "h-8 w-8",
    lg: "h-10 w-10",
  }

  return (
    <div className={`flex flex-wrap items-center gap-2 ${className}`}>
      {displayLinks.map((link, index) => (
        <a
          key={index}
          href={link.url}
          target="_blank"
          rel="noopener noreferrer"
          className="transition-opacity hover:opacity-90"
          aria-label={`${link.platform} profile`}
        >
          <SocialIcon platform={link.platform} className={sizeClasses[iconSize]} />
        </a>
      ))}

      {showCount && remainingCount > 0 && (
        <div className="flex h-8 w-8 items-center justify-center rounded-md bg-background-1/10 text-sm font-medium text-text-1">
          +{remainingCount}
        </div>
      )}
    </div>
  )
}
