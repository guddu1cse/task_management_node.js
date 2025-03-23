import express from 'express';
import { getProfile, loginUser } from '../controllers/authController.js';
import authenticateUser from '../middleware/authenticateUser.js';
const router = express.Router();

router.post('/login', loginUser); //login user endpoint
router.get('/profile', authenticateUser, getProfile); //find current user endpoint

export default router;

