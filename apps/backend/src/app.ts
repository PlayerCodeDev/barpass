import express from 'express';

/**
 * Inicializa y configura la aplicación Express.
 * @returns Instancia de la app Express lista para ser usada por el servidor.
 */
const app = express();

/**
 * Middlewares globales
 */
app.use(express.json()); // middleware para que Express reviba JSON en `req.body`
app.use(express.urlencoded({ extended: true })); // middleware para parser más completo.

/**
 * Ruta de verificación de estado del backend.
 *
 * @route GET /api/health
 * @returns Estado "ok" del backend.
 */
app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'ok',
    message: 'Backend funcionando correctamente',
  });
});

// Exportar la app para que `server.ts` pueda utilizarla
export default app;
