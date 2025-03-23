import express from 'express';
import { createUser, getUrl, getUser, getUsers } from '../controllers/userController.js';
const router = express.Router();

// router.get('/users/:id', getUsers);
router.post('/register', createUser); // register user endpoint

export default router;