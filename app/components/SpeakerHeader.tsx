import { Clock, MapPin, Star } from 'lucide-react';
import { Link } from 'react-router';
import type { Speaker } from '~/lib/types';
import { SocialLinks } from './SocialLinks';

type SpeakerHeaderProps = {
  speaker: Speaker;
};

export function SpeakerHeader({ speaker }: SpeakerHeaderProps) {
  return (
    <div className="bg-[#eefaff] rounded-lg overflow-hidden mb-8">
      <div className="h-48 bg-gradient-to-r from-[#006699] to-[#8fb8c3]"></div>
      <div className="bg-white p-6 relative">
        <div className="absolute -top-16 left-8 w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-md">
          {speaker.avatar ? (
            <img
              src={speaker.avatar || '/placeholder.svg'}
              alt={speaker.name}
              className="object-cover"
            />
          ) : (
            <div className="w-full h-full bg-[#eefaff] flex items-center justify-center text-[#006699] text-4xl font-bold">
              {speaker.name.charAt(0)}
            </div>
          )}
        </div>

        <div className="ml-44 flex flex-col md:flex-row md:items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-[#006699]">{speaker.name}</h1>
            <div className="flex items-center gap-2 text-[#939393] mt-1">
              {speaker.location && (
                <div className="flex items-center gap-1">
                  <MapPin className="w-4 h-4" />
                  <span>{speaker.location}</span>
                </div>
              )}
              {speaker.experience && (
                <div className="flex items-center gap-1 ml-4">
                  <Clock className="w-4 h-4" />
                  <span>{speaker.experience}</span>
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
                  className={`w-5 h-5 ${
                    i < speaker.rating
                      ? 'fill-[#10bc4c] text-[#10bc4c]'
                      : 'fill-[#d0d8e8] text-[#d0d8e8]'
                  }`}
                />
              ))}
            </div>

            {/* Sessions Button */}
            {speaker.sessionsUrl && (
              <Link
                to={speaker.sessionsUrl}
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#006699] text-white hover:bg-[#005588] transition-colors"
              >
                View All Sessions
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="#FF0000"
                >
                  <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" />
                </svg>
              </Link>
            )}
          </div>
        </div>

        {/* Social Links */}
        <div className="ml-44 flex items-center gap-3 mt-4">
          <SocialLinks socialLinks={speaker.socialLinks} />
        </div>
      </div>
    </div>
  );
}
