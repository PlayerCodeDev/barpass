import app from './app.js';
import { connectToDatabase } from './config/database.js';

/**
 * Levanta el servidor HTTP y establece conexión con la base de datos.
 */
async function startServer() {
  try {
    await connectToDatabase();

    const PORT = process.env.PORT || 3000;

    app.listen(PORT, () => {
      console.log(`Servidor iniciado en http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error(`No se pudo iniciar el servidor: ${error}`);
    process.exit(1);
  }
}

startServer();
