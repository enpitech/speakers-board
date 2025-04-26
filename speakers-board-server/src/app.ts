import express from 'express';
import { json } from 'body-parser';
import speakerRoutes from './routes/speakerRoutes';
import topicRoutes from './routes/topicRoutes';
import reviewRoutes from './routes/reviewRoutes';
import sessionRoutes from './routes/sessionRoutes';
import languageRoutes from './routes/languageRoutes';

import { errorHandler } from './middleware';

const app = express();

// Middleware
app.use(json());
app.use(errorHandler);

// Routes
app.use('/speakers', speakerRoutes);
app.use('/topics', topicRoutes);
app.use('/reviews', reviewRoutes);
app.use('/sessions', sessionRoutes);
app.use('/languages', languageRoutes);

export default app;
