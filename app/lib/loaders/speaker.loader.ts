import { getReviews } from '../fetchers/getReviews';
import { getSessions } from '../fetchers/getSessions';
import { getSpeaker } from '../fetchers/getSpeaker';

export const speakerPageLoader = async ({ params }: { params: { speakerId: string } }) => {
  const speaker = getSpeaker({ speakerId: params.speakerId });
  const sessions = getSessions({ speakerId: params.speakerId });
  const reviews = getReviews({ speakerId: params.speakerId });
  return { speaker, sessions, reviews };
};
