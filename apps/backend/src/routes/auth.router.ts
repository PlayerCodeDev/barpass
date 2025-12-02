import { Router } from 'express';
import { AuthController } from '../controllers/auth.controller';

/**
 * Rutas de autenticación.
 * Este router gestiona las rutas relacionadas con el incio de sesión
 */
const router: Router = Router();

/**
 * POST /auth/login
 * Punto de entrada para que un usuario inicie sesión.
 */
router.post('/login', AuthController.login);

export default router;
