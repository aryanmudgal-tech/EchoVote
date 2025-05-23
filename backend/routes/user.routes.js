import express from 'express';
import { login, signup, verify } from '../controller/user.controller.js';

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.post('/verify', verify);

export default router; 