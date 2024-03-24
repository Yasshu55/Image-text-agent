import express from 'express';
import { createUser, updateUser } from '../controllers/userController.js';

const router = express.Router();

// Route for creating new User
router.post('/register', createUser);

// Route for updating user
router.post('/update', updateUser);

export default router;
