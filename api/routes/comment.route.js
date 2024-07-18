import express from 'express'
import {verifyToken} from '../utills/verifyUser.js';
import { createComment } from '../controllers/comment.contriller.js';
import { getPostComments } from '../controllers/comment.contriller.js';
const router = express.Router();

router.post('/create',verifyToken, createComment);
router.get('/getPostComment/:postId', getPostComments);
export default router;
