import express, { Application } from 'express';
import { env } from '../core/config/env.js';
import { requestLogger } from '../core/middlewares/requestLogger.js';
import { errorHandler } from '../core/middlewares/errorHandler.js';
import { notFound } from '../core/middlewares/notFound.js';
import healthRoute from './routes/health.route.js';
import { loggerMiddleware } from '../core/logger/logger.js';

export function createApp(): Application {
  const app = express();

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  app.use(loggerMiddleware);

  app.use(requestLogger);

  app.use('/health', healthRoute);

  app.use(notFound);

  app.use(errorHandler);

  return app;
}

export async function startServer() {
  const app = createApp();
  const port = env.PORT;

  const server = app.listen(port);

  const shutdown = async () => {
    server.close(() => {
      console.log('Server closed');
      process.exit(0);
    });
  };

  process.on('SIGINT', shutdown);
  process.on('SIGTERM', shutdown);

  return server;
}
