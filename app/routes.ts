import { type RouteConfig, index, layout, route } from '@react-router/dev/routes';

export default [
  index('routes/home.tsx'),
  layout('routes/layout.tsx', [
    route('speakers', 'routes/speakers.tsx'),
    route('speakers/:speakerId', 'routes/speaker.tsx', [
      route('reviews', 'routes/reviews-feed.tsx'),
      route('sessions', 'routes/session-feed.tsx'),
    ]),
    route('prompt-optimizer', 'routes/prompt-optimizer.tsx'),
  ]),
  route('generate-speaker-bio', 'routes/generate-speaker-bio.tsx'),
  route('generate-speaker-avatar', 'routes/generate-speaker-avatar.tsx'),
] satisfies RouteConfig;
