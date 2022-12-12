import type { Request, Response, NextFunction } from 'express';
import { IUser } from '../models/User';
import asyncHandler from '../middleware/async';
import ErrorResponse from '../utils/errorResponse';

import User from '../models/User';

function sendTokenResponse(user: IUser, statusCode: number, res: Response) {
  // Create token
  const token: string = user.getSignedJwtToken();

  const options = {
    expires: new Date(Date.now() + +process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000),
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production' // it prod use the secure flag for https
  };

  // prettier-ignore
  res
  .status(statusCode)
  .cookie('token', token, options)
  .json({ success: true, token });
}

const register = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const user: IUser = await User.create(req.body);

  sendTokenResponse(user, 200, res);
});

const login = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const {
    email,
    password,
    token = null
  }: { email: string; password: string; token: string | null } = req.body;

  // if a token comes thru an email will come with it
  if (!token && (!email || !password)) {
    return next(new ErrorResponse('Please enter an email and password', 400));
  }

  const user: IUser = await User.findOne({ email }).select('+password');

  if (!user) {
    return next(new ErrorResponse('Invalid credentials', 401));
  }

  const isMatch: string | boolean = token || (await user.matchPassword(password));

  if (!isMatch) {
    return next(new ErrorResponse('Invalid credentials', 401));
  }

  sendTokenResponse(user, 200, res);
});

const logout = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  res.cookie('token', 'none', {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true
  });

  res.status(200).json({ success: true, data: {} });
});

const getCurrentUser = asyncHandler(
  async (req: { user: IUser }, res: Response, next: NextFunction) => {
    res.status(200).json({ success: true, data: req.user });
  }
);

const forgotPassword = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const user: IUser = await User.findOne({ email: req.body.email });

    if (!user) {
      return next(new ErrorResponse(`There is no user with that email`, 404));
    }

    // Get reset token
    const resetToken: string = user.getResetPasswordToken();

    await user.save({ validateBeforeSave: false });

    res.status(200).json({ success: true, data: user });
  }
);

export { register, login, logout, getCurrentUser, forgotPassword };
