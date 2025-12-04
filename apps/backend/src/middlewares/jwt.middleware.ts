import jwt, { Secret } from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { StringValue } from 'ms';
import { JwtUserPayload } from '../types/express.d.js';

/**
 * Firma un JWT usando el ID del usuario y otros datos básicos.
 *
 * @param payload Objeto con datos que irán dentro del token (id, role, email).
 * @returns Un string que representa el JWT firmado.
 */
export function generateToken(payload: Record<string, unknown>): string {
  const secret = process.env.JWT_SECRET as Secret;
  const expires = process.env.JWT_EXPIRES_IN || '1h';

  if (!secret) {
    throw new Error('JWT_SECRET no está definido en el archivo .env');
  }

  return jwt.sign(payload, secret, {
    expiresIn: expires as StringValue,
  });
}

/**
 * Middleware de Espress que valida un token JWT.
 */
export function verifyToken(req: Request, res: Response, next: NextFunction) {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        message: 'Token no proporcionado o formato incorrecto',
      });
    }

    const token = authHeader.split(' ')[1];
    const secret = process.env.JWT_SECRET;

    if (!secret) {
      throw new Error('JWT_SECRET no está definido en el archivo .env');
    }

    const decode = jwt.verify(token, secret) as JwtUserPayload;

    req.user = decode;

    next();
  } catch (err) {
    return res.status(401).json({
      message: `Token inválido o expirado ${err}`,
    });
  }
}
