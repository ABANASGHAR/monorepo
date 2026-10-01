import dotenv from 'dotenv';
import path from 'path';

// Load .env file from root or server dir
dotenv.config();

export const config = {
  port: parseInt(process.env.PORT || '5000', 10),
  nodeEnv: process.env.NODE_ENV || 'development',
  mongoUri: process.env.MONGO_URI || 'mongodb://localhost:27017/mern_monorepo_dev',
  clientOrigin: process.env.CLIENT_ORIGIN || 'http://localhost:5173',
};
