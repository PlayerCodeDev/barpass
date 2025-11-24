import dotenv from 'dotenv';
import path from 'path';

dotenv.config({
  path: path.resolve(process.cwd(), '.env'),
});

export const ENV = {
  PORT: process.env.PORT ?? '3000',
  MONGO_URI: process.env.MONGO_URI ?? '',
  MODE_ENV: process.env.NODE_ENV ?? 'development',
};
