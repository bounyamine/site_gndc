// src/middleware/error.middleware.ts
import { Request, Response, NextFunction } from 'express';

interface AppError extends Error {
  statusCode?: number;
}

export const errorMiddleware = (
  err: AppError,
  _req: Request,
  res: Response,
  _next: NextFunction
): void => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Une erreur est survenue';

  console.error('Error occurred:', err); // Log the error details for debugging
  if (process.env.NODE_ENV === 'development') {
    res.status(statusCode).json({
      message,
      stack: err.stack
    });
  } else {
    res.status(statusCode).json({ message });
  }
};