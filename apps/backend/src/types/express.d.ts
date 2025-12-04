import type { JwtPayload } from 'jsonwebtoken';

declare global {
  namespace Express {
    interface Request {
      user?: JwtUserPayload;
    }
  }
}

/**
 * Tipo exacto de lo que guardas dentro del JWT.
 */
export interface JwtUserPayload extends JwtPayload {
  id: string;
  name: string;
  email: string;
  role: string;
}
