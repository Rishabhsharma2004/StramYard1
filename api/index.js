import express from 'express'
import mongoose, { connect } from 'mongoose';
import dotenv from 'dotenv';
import userRouter from './routes/user.route.js';
import authRoutes from './routes/auth.route.js';
dotenv.config();

mongoose.connect(process.env.MONGO)
.then(()=>{
    console.log("MongoDb is connected")
}).catch((err)=>{
    console.log(err);
})

const app = express();

app.use(express.json());
app.listen(3000, ()=>{
    console.log("Server is running on 3000");
})

app.use('/api/user', userRouter);
app.use('/api/auth', authRoutes);