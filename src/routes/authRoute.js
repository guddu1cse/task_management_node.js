import express from 'express';
import { getProfile, loginUser } from '../controllers/authController.js';
import authenticateUser from '../middleware/authenticateUser.js'; //importing middleware for authenticating the user
// router
const router = express.Router();

//setting up routes
router.post('/login', loginUser); //login user endpoint
router.get('/profile', authenticateUser, getProfile); //find current user endpoint

export default router;

