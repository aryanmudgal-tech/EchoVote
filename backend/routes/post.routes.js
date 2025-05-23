import express from 'express';
import { createPost, getAllPosts, getUserPosts, toggleLike, deletePost } from '../controller/post.controller.js';
import { verifyToken } from '../middleware/auth.middleware.js';

const router = express.Router();

// Protected routes (require authentication)
router.post('/create', verifyToken, createPost);
router.get('/user', verifyToken, getUserPosts);
router.post('/:postId/like', verifyToken, toggleLike);
router.delete('/:postId', verifyToken, deletePost);

// Public routes
router.get('/', getAllPosts);

export default router; 