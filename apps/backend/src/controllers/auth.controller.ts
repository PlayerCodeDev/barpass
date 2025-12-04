import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import { UserService } from '../services/user.service.js';

/**
 * Controlador de autenticación.
 *
 * Gestiona las operaciones relacionadas con el inicio de sesión,
 * validación de credenciales y generación de tokens JWT.
 */
export class AuthController {
  /**
   * Inicio de sesión de un usuario.
   *
   * Este método:
   * - Recibe `email` y `password`
   * - Busca al usuario por email
   * - Compara la contraseña con bcrypt
   * - Si coincide, firma un JWT con los datos del usuario
   *
   * @async
   * @param {Request} req Objeto de solicitud HTTP de Express.
   * @param {Response} res Objeto de respuesta HTTP de Express.
   * @returns Respuesta JSON con token JWT y datos del usuario.
   */
  static async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;

      /**
       * Validación básica de parámetros obligarotios.
       * No se puede intentar autenticar sin esrtos campos.
       */
      if (!email || !password) {
        return res.status(400).json({
          error: 'Email y contraseña son requeridos.',
        });
      }

      /**
       * Buscar usuario por email.
       */
      const user = await UserService.findByEmail(email);

      if (!user) {
        return res.status(400).json({
          error: 'Credenciales inválidas.',
        });
      }

      /**
       * Validad la contraseña.
       */
      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (!isPasswordValid) {
        return res.status(401).json({
          error: 'Credenciales inválidas.',
        });
      }

      const { generateToken } = await import('../middlewares/jwt.middleware.js');

      const token = generateToken({
        id: user._id,
        role: user.role,
        email: user.email,
      });

      /**
       * Si las credenciales son correctas, se retorna la información básica
       * del usuario.
       */
      return res.status(200).json({
        message: 'Inicio de sesión exitosa',
        token,
      });
    } catch (err) {
      console.error('Error en login:', err);
      return res.status(500).json({
        error: 'Error interno del servidor.',
      });
    }
  }

  /**
   * Devuelve los datos del usuario autenticado.
   */
  static async me(req: Request, res: Response) {
    try {
      const payload = req.user as { id: string };

      if (!payload?.id) {
        return res.status(401).json({
          error: 'Token inválido: No contiene ID de usuario.',
        });
      }

      const user = await UserService.findById(payload.id);

      if (!user) {
        return res.status(404).json({
          message: 'Usuario no encontrado.',
        });
      }

      return res.status(200).json({
        message: 'Perfil obtenido con éxito',
        user: {
          id: user._id,
          email: user.email,
          role: user.role,
          name: user.name,
        },
      });
    } catch (err) {
      console.error('Error en /auth/me:', err);
      return res.status(500).json({
        error: 'Error interno del servidor.',
      });
    }
  }
}
