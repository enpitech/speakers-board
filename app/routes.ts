import { type RouteConfig, index, layout, route } from '@react-router/dev/routes';

export default [
  layout('routes/layout.tsx', [
    index('routes/home.tsx'),
    route('speakers', 'routes/speakers.tsx'),
    route('speakers/:speakerId', 'routes/speaker.tsx'),
  ]),
  route('generate-speaker-bio', 'routes/generate-speaker-bio.tsx'),
] satisfies RouteConfig;
