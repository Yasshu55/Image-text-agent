import express from 'express';
import { createUser, updateUser } from '../controllers/userController.js';
import { uploadImage } from '../controllers/imageController.js';
import { initiateConversation } from '../controllers/conversationController.js';

const router = express.Router();

// Route for creating new User
router.post('/register', createUser);

// Route for updating user
router.post('/update', updateUser);

// Upload image API route
router.post('/upload', uploadImage);

// Conversation API route
router.post('/conversation', initiateConversation);

export default router;
