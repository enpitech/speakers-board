import express from 'express';
import config from './config/index';
import speakerRoutes from './routes/speakerRoutes';
import sessionRoutes from './routes/sessionRoutes';
import reviewRoutes from './routes/reviewRoutes';
import topicRoutes from './routes/topicRoutes';
import languageRoutes from './routes/languageRoutes';
import cors from 'cors';

const app = express();

app.use(express.json());
app.use(cors());

app.use('/speakers', speakerRoutes);
app.use('/sessions', sessionRoutes);
app.use('/reviews', reviewRoutes);
app.use('/topics', topicRoutes);
app.use('/languages', languageRoutes);

// Start the server
app.listen(config.port, () => {
  console.log(`Server is running on ${config.apiBaseUrl}`);
});
