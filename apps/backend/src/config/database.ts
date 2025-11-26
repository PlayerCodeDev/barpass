import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const MONGO_URI = process.env.MONGO_URI as string;
export async function connectToDatabase() {
  try {
    if (!MONGO_URI) throw new Error('LA variable MONGO_URI no está definida en el archivo .env');

    await mongoose.connect(MONGO_URI);

    console.log('Conexión exitora a MongoDB Atlas.');
  } catch (error) {
    console.error('Error al conectar a MongoDB:', error);
    process.exit(1);
  }
}
