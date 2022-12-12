import { Router } from 'express';
import {
  getAllPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost
} from './../controllers/posts';

const router: Router = Router();

router.route('/').get(getAllPosts).post(createPost);
router.route('/:postId').get(getPostById).put(updatePost).delete(deletePost);

export default router;
