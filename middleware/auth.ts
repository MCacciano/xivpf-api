import type { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import asyncHandler, { CustomRequest } from './async';
import ErrorResponse from '../utils/errorResponse';

import User from '../models/User';

// Protect routes
const protect = asyncHandler(async (req: CustomRequest, res: Response, next: NextFunction) => {
  let token: string;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }
  // else if (req.cookies.token) {
  //   token = req.cookies.token;
  // }

  // make sure token exists

  if (!token) {
    return next(new ErrorResponse('Not authorized to access this route', 401));
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET) as { id: string };

    req.user = await User.findById(decoded.id);

    next();
  } catch (err) {
    console.error(err);
    return next(new ErrorResponse('Not authorized to access this route', 401));
  }
});

export default protect;
