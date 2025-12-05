import { Router } from 'express';
import { EventController } from '../controllers/event.controller';
import { verifyToken } from '../middlewares/jwt.middleware';

const router: Router = Router();

/**
 * Crear un nuevo evento
 * Ruta protegida: requiere JWT
 */
router.post('/', verifyToken, EventController.create);

/**
 * Obtener todos los eventos creados por el administrador autenticado
 * Ruta protegida: requiere JWT
 */
router.get('/', verifyToken, EventController.list);

export default router;
