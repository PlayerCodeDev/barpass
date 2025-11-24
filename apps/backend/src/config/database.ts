import mongoose from 'mongoose';
import { ENV } from './env.js';

export async function connectToDatabase() {
  try {
    await mongoose.connect(ENV.MONGO_URI);

    console.log('Conectado a MongoDB correctamente');
  } catch (error) {
    console.error('Error al conectar a MongoDB:', error);
    process.exit(1);
  }
}
