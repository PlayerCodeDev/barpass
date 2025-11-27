import dotenv from 'dotenv';
import path from 'path';

dotenv.config({
  path: path.resolve(process.cwd(), '.env'),
});

/**
 * Variables de entorno.
 * Se cargan desde el archivo `.env` ubicado en la raíz del monorepo.
 * @property {string} PORT Puerto en el que corre la aplicación (por defecto 3000).
 * @property {string} MONGO_URI Cadena de conexión a MongoDB (Atlas).
 * @property {string} MODE_ENV Entorno de ejecutción ('development' | 'production' | etc.).
 */
export const ENV = {
  PORT: process.env.PORT ?? '3000',
  MONGO_URI: process.env.MONGO_URI ?? '',
  MODE_ENV: process.env.NODE_ENV ?? 'development',
};
