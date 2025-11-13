import express from 'express';
import { getUserProfile, loginUser , registerUser } from '../controllers/user.controller.js';
import { isAuthenticated } from '../middlewares/auth.middleware.js';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/get-profile',isAuthenticated, getUserProfile);

export default router;