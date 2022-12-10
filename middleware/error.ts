import type { Request, Response, NextFunction } from 'express';
import type { Error as MongooseError } from 'mongoose';
import type { MongoError } from 'mongodb';
import ErrorResponse from '../utils/errorResponse';

const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  console.log('err', err);
  let error = { ...err };

  error.message = err.message;

  // Log to console for dev
  console.log(err.stack);

  // Mongoose bad ObjectId
  if (err.name === 'CastError') {
    error = new ErrorResponse(`Resource not found`, 404);
  }

  // Mongoose duplicate key
  if (err.code === 11000) {
    error = new ErrorResponse(`Duplicate field value entered`, 400);
  }

  // Mongoose validation error
  if (err.name === 'ValidationError') {
    const message = Object.values(err.errors).map((val: { message: string }) => val.message);
    error = new ErrorResponse(message.join(', '), 400);
  }

  res.status(error.statusCode || 500).json({
    success: false,
    error: error.message || 'Server Error'
  });
  return;
};

export default errorHandler;
