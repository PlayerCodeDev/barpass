import { Response } from 'express';
import { logger } from '../logger/logger.js';

export const errorHandler = (err: unknown, res: Response) => {
  logger.error({ err }, 'Unhandled error');

  res.status(500).json({
    success: false,
    message: 'Ocurrió un error inesperado en el servidor.',
  });
};
