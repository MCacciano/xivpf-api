import { Router } from 'express';
import { register, login, getCurrentUser, forgotPassword, logout } from '../controllers/auth';
import protect from '../middleware/auth';

const router = Router();

router.post('/register', register);
router.post('/login', login);
router.get('/logout', logout);
router.get('/me', protect, getCurrentUser);
router.post('/forgot-password', forgotPassword);

export default router;
