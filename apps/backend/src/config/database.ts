import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const MONGO_URI = process.env.MONGO_URI as string;

/**
 * Conecta la aplicación a MongoDB usando Mongoose.
 *
 * - Valida que la variable de entorno `MONGO_URI` esté definida.
 * - Intenta establecer la conexión con Mongoose.
 * - En caso de error, escribe el error en consola y detiene el proceso.
 *
 * @async
 * @returns Resuelve cuando la conexión se establece correctamente.
 * @throws Si la variable MONGO_URI no está definida.
 */
export async function connectToDatabase() {
  try {
    if (!MONGO_URI) throw new Error('La variable MONGO_URI no está definida en el archivo .env');

    await mongoose.connect(MONGO_URI);

    console.log('Conexión exitora a MongoDB Atlas.');
  } catch (error) {
    console.error('Error al conectar a MongoDB:', error);
    process.exit(1);
  }
}
