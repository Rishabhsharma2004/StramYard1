import express from 'express'
import {verifyToken} from '../utills/verifyUser.js'
import { create } from '../controllers/post.controller.js';
import { getposts, deletePost, updatePost } from '../controllers/post.controller.js';
const router = express.Router();


router.post('/create', verifyToken , create)
router.get('/getposts', getposts);
router.delete('/deletepost/:postId/:userId', verifyToken, deletePost);
router.put('/updatepost/:postId/:userId', verifyToken, updatePost)
export default router;