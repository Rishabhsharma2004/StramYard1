import express from 'express'
import {verifyToken} from '../utills/verifyUser.js';
import { createComment,  getPostComments, likeComment , deleteComment, getcomments} from '../controllers/comment.contriller.js';
const router = express.Router();

router.post('/create',verifyToken, createComment);
router.get('/getPostComment/:postId', getPostComments);
router.put('/likeComment/:commentId', verifyToken, likeComment);
router.delete('/deleteComment/:commentId', verifyToken, deleteComment);
router.get('/getcomments', verifyToken, getcomments);
export default router;
