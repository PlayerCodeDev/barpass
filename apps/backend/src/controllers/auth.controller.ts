import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import { UserService } from '../services/user.service.js';
import { generateToken } from '../middlewares/jwt.middleware.js';

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
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          rol: user.role,
        },
      });
    } catch (err) {
      /**
       * Captura de errores inesperados (fallo de DB, fallos internos, etc.)
       */
      console.error('Error en login:', err);
      return res.status(500).json({
        error: 'Error interno del servidor.',
      });
    }
  }
}
