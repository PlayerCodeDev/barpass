import { Router } from 'express';
import { AuthController } from '../controllers/auth.controller';
import { verifyToken } from '../middlewares/jwt.middleware';

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

/**
 * GET /auth/me
 * Requiere un JWT válido en Authotization: Bearer <token>.
 */
router.get('/me', verifyToken, AuthController.me);

export default router;
