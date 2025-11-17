import pino from 'pino';
import { pinoHttp } from 'pino-http';
import { env } from '../config/env.js';

const isProd = env.NODE_ENV === 'production';

const baseLogger = pino({
  level: isProd ? 'info' : 'debug',
  transport: isProd
    ? undefined
    : {
        target: 'pino-pretty',
        options: {
          colorize: true,
          translateTime: 'SYS:standard',
        },
      },
});

export const logger = baseLogger;

export const loggerMiddleware = pinoHttp({
  logger: baseLogger,
});
