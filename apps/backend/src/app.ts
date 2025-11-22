import express from 'express';

// Inicialización de la aplicación Express
const app = express();

// Middlewares globales
app.use(express.json()); // middleware para que Express reviba JSON en `req.body`

// Rutas
app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'ok',
    message: 'Backend funcionando correctamente',
  });
});

// Exportar la app para que `server.ts` pueda utilizarla
export default app;
