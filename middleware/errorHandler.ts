


import { Request, Response, NextFunction } from 'express';
import multer from 'multer';

interface AppError extends Error {
  statusCode?: number;
}

export const errorHandler = (
  err: AppError,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  let statusCode = err.statusCode || 500;
  let message = err.message || 'Something went wrong';

  // Handle Multer file upload errors
  if (err instanceof multer.MulterError) {
    statusCode = 400;
    message = `Multer error: ${err.message}`;
  }

  // Handle custom CSV or file-related errors
  if (message.includes('Only CSV files are allowed')) {
    statusCode = 400;
  }

  console.error(`❌ Error: ${message}`);

  res.status(statusCode).json({
    success: false,
    error: message,
  });
};
















/*


import { Request, Response, NextFunction } from 'express';

interface AppError extends Error {
  statusCode?: number;
}

export const errorHandler = (
  err: AppError,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Something went wrong';

  console.error(`❌ Error: ${message}`);

  res.status(statusCode).json({
    success: false,
    error: message,
  });
};

*/