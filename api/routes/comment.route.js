import express from 'express'
import {verifyToken} from '../utills/verifyUser.js';
import { createComment,  getPostComments, likeComment   } from '../controllers/comment.contriller.js';
const router = express.Router();

router.post('/create',verifyToken, createComment);
router.get('/getPostComment/:postId', getPostComments);
router.put('/likeComment/:commentId', verifyToken, likeComment);
export default router;
