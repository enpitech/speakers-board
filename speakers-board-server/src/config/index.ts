import dotenv from 'dotenv';

dotenv.config();

const port = process.env.PORT || 3001;
const apiBaseUrl = process.env.API_BASE_URL || `http://localhost:${port}`;

const config = {
  port,
  apiBaseUrl,
};

export default config;
