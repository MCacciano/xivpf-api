import { Request, Response, NextFunction } from 'express';
import asyncHandler from '../middleware/async';

import Post, { IPost } from '../models/Post';
import ErrorResponse from '../utils/errorResponse';

export const getAllPosts = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const posts: IPost[] = await Post.find().populate({ path: 'user' });

    res.status(200).json({ success: true, data: posts });
  }
);

export const getPostById = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { postId } = req.params;

    const post: IPost = await Post.findById(postId).populate({ path: 'user' });

    if (!post) {
      return next(new ErrorResponse(`Post does not exist with the id: ${postId}`, 404));
    }

    res.status(200).json({ success: true, data: post });
  }
);

export const createPost = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const newPost: IPost = await Post.create(req.body);

    res.status(200).json({ success: true, data: newPost });
  }
);

export const updatePost = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const {
      body,
      params: { postId }
    }: { body: IPost; params: any } = req;

    const updatedPost: IPost = await Post.findByIdAndUpdate(postId, body);

    res.status(200).json({ success: true, data: updatedPost });
  }
);

export const deletePost = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    await Post.findByIdAndDelete(req.params.postId);
    res.status(200).json({ success: true });
  }
);
