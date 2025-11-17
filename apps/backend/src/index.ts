import { env } from './config/env';

console.log('servidor iniciado en el puerto:', env.PORT);
console.log('Modo:', env.NODE_ENV);
