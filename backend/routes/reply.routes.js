import express from 'express';
import { createReply, getRepliesForPost } from '../controller/reply.controller.js';
import { verifyToken } from '../middleware/auth.middleware.js';

const router = express.Router();

router.post('/:postId/replies', verifyToken, createReply);
router.get('/:postId/replies', getRepliesForPost);

export default router; 