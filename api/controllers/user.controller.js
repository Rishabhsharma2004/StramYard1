import User from "../models/user.model.js";
import { errorHandler } from "../utills/error.js";
import bcryptjs from 'bcryptjs'
export const test = (req, res)=>{
    res.json({message: 'API is working '})
 };

 export const updateUser = async (req, res, next) =>{
   const {id:Iduser} = req.user;
   const {userId} = req.params;
   if(Iduser !== userId){
     return next(errorHandler(403, 'User are not allowed to Update this user')); 
   }
   if(req.body.password){
    if(req.body.password < 6){
      return next(400, 'Password not less then 6')
    }
    req.body.password = bcryptjs.hashSync(req.body.password, 10);
   }
  if(req.body.username){
    if(req.body.username.length < 7 || req.body.username.length > 20){
      return next(errorHandler(400, 'Username must be between 7 and 20 characters'));
    }
    if(req.body.username.includes(' ')){
      return next(errorHandler(400, 'Username cannot contain spaces'));
    }
    if(req.body.username != req.body.username.toLowerCase()){
      return next(errorHandler(400, 'Username must be lowercase.'))
    }
    if(!req.body.username.match(/^[a-zA-Z0-9]+$/)){
      return next(errorHandler(400, 'Username can only contain numbers and letters'))
    }
    try{
      const updatedUser = await User.findByIdAndUpdate(userId,{
        $set:{
          username : req.body.username,
          email: req.body.email,
          profilePicture: req.body.profilePicture,
          password: req.body.password,

        },
      }, {new : true});
      const {password, ...rest} = updatedUser._doc;
      res.status(200).json(rest);
    }catch(error){
      next(error);
    }
  }
 }

 export const deleteUser = async(req, res, next)=>{
  if(req.user.id !== req.params.userId){
    return next(errorHandler(403, 'You are not allowed to delete this user'));
  }
  try{
    await User.findByIdAndDelete(req.params.userId);
    res.status(200).json('User has been deleted');
  }catch(error){
    return next(error);
  }
 }

 export const signOut = async(req, res, next) =>{
  try{
    res.clearCookie('access_token');
    res.status(200).json('User has been Sign out');
  }catch(error){
    return next(error);
  }
 }