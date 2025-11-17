import { config } from 'dotenv';
import { envsafe, str, port, bool } from 'envsafe';

const envFile = `.env.${process.env.NODE_ENV || 'opment'}`;

config({ path: envFile });

export const env = envsafe({
  PORT: port({ default: 3000 }),
  NODE_ENV: str({
    devDefault: 'development',
    choices: ['development', 'test', 'production'],
  }),
  DEBUG_MODE: bool({ default: false }),
});

console.log(`Entorno cargado: ${env.NODE_ENV}`);
