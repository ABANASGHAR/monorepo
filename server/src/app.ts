import express, { Application } from 'express';
import cors from 'cors';
import morgan from 'morgan';
import { config } from './config/env.js';
import healthRoutes from './routes/health.routes.js';
import itemRoutes from './routes/item.routes.js';
import { errorHandler, notFoundHandler } from './middleware/errorHandler.js';

export const createApp = (): Application => {
  const app = express();

  // Middlewares
  app.use(
    cors({
      origin: config.clientOrigin,
      credentials: true,
    })
  );
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  if (config.nodeEnv !== 'test') {
    app.use(morgan('dev'));
  }

  // API Routes
  app.use('/api/health', healthRoutes);
  app.use('/api/v1/items', itemRoutes);

  // Fallback 404 & Global Error Handling
  app.use(notFoundHandler);
  app.use(errorHandler);

  return app;
};
