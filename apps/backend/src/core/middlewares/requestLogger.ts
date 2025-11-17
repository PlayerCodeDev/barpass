import { Request, Response, NextFunction } from 'express';

export const requestLogger = (req: Request, _res: Response, next: NextFunction) => {
  const { method, url } = req;
  console.debug(`[req] ${method} ${url}`);
  next();
};
