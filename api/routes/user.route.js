import express from 'express'
import { test,  updateUser, deleteUser, signOut } from '../controllers/user.controller.js';
import { verifyToken } from '../utills/verifyUser.js';
import { getUser } from '../controllers/user.controller.js';
 const router = express.Router();

 router.get('/test',test);
 router.put('/update/:userId',verifyToken, updateUser);
 router.delete('/delete/:userId', verifyToken, deleteUser);
 router.post('/signout', signOut);
 router.get('/:userId', getUser)
 export default router;