import { IUser } from './../models/User';
import type { Request, Response, NextFunction } from 'express';

export interface CustomRequest extends Request {
  user?: IUser;
}

const asyncHandler = fn => (req: CustomRequest, res: Response, next: NextFunction) => {
  return Promise.resolve(fn(req, res, next)).catch(next);
};

export default asyncHandler;
