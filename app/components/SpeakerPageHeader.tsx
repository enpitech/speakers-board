import { Link } from 'react-router';
import { MapPin, Clock, Star } from 'lucide-react';
import type { Speaker } from '~/lib/types';
import { SocialIcon } from './SocialIcon';
import { Text } from './Text';
export const SpeakerPageHeader = ({ speaker }: { speaker: Speaker }) => {
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
            <Text variant="h1" className="text-primary">
              {name}
            </Text>
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
