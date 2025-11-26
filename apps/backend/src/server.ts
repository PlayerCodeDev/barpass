import app from './app.js';
import { connectToDatabase } from './config/database.js';

const PORT = process.env.PORT || 3000;

async function startServer() {
  try {
    await connectToDatabase();

    app.listen(PORT, () => {
      console.log(`Servidor iniciado en http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error(`No se pudo iniciar el servidor: ${error}`);
    process.exit(1);
  }
}

startServer();
