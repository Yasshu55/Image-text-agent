import express from 'express';
import { createUser, updateUser, loginUser,getProfileDetails } from '../controllers/userController.js';
import { saveDetails } from '../controllers/saveController.js';
import { uploadImage } from '../controllers/imageController.js';
import { initiateConversation } from '../controllers/conversationController.js';
import { authMiddleware } from '../utils/authMiddleware.js';
import multerConfig from '../utils/multerConfig.js';

const router = express.Router();

// Route for creating new User
router.post('/register', createUser);

// Route for Login the User
router.post('/login', loginUser);

// Route for updating user
router.post('/update', updateUser);

// Upload image API route
router.post('/upload', uploadImage);

// Conversation API route
router.post('/conversation', initiateConversation);

// save conversation
router.post('/save',authMiddleware,saveDetails)

// get all the previous conversation  of a particular user
router.post(`/profile`, authMiddleware,getProfileDetails)

export default router;
