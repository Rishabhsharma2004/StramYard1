import express from "express";
import mongoose, { connect } from "mongoose";
import dotenv from "dotenv";
import userRoutes from "./api/routes/user.route.js";
import authRoutes from "./api/routes/auth.route.js";
import cookieParser from "cookie-parser";
import postRoutes from './api/routes/post.route.js';
import commentRoutes from './api/routes/comment.route.js';
import EmailRoutes from './api/routes/EmailRoutes.js'
import path from 'path'
import { fileURLToPath } from "url";
dotenv.config();
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename);
mongoose
  .connect(process.env.MONGO)
  .then(() => {
    console.log("MongoDb is connected");
  }).catch((err) => {
    console.log("error",err);
  });

  
const app = express();

app.use(express.json());
app.use(cookieParser());

app.listen(5000, () => {
  console.log("Server is running on 5000");
});

app.use('/api/user', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/post', postRoutes);
app.use('/api/comment', commentRoutes);
app.use('/api/email', EmailRoutes);

app.use(express.static(path.join(__dirname, './SynStream/dist')));

app.get('*', (req, res)=>{
  res.sendFile(path.join(__dirname,"./SynStream/dist/index.html"));
})

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});
