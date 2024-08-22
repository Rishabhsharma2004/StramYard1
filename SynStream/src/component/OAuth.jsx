import { Button } from 'flowbite-react';
import React from 'react';
import {AiFillGoogleCircle} from 'react-icons/ai';
import {GoogleAuthProvider, signInWithPopup, getAuth} from 'firebase/auth';
import { app } from '../firebase';
import { useDispatch } from 'react-redux';
import { signInSuccess } from '../redux/user/userSlice';
import { useNavigate } from 'react-router-dom';
import { FcGoogle } from "react-icons/fc";
export default function OAuth() {
    const auth = getAuth(app);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleGoogleClick = async()=>{
       const Provider = new GoogleAuthProvider();
       Provider.setCustomParameters({prompt: 'select_account'})
       try{
         const resultsFromGoogle = await signInWithPopup(auth, Provider);
         const res = await fetch('/api/auth/google', {
            method: 'POST',
            headers:{'Content-type': 'application/json'},
            body: JSON.stringify({
                name: resultsFromGoogle.user.displayName,
                email: resultsFromGoogle.user.email,
                googlePhotoUrl : resultsFromGoogle.user.photoURL,
            }),
         })
         const data = await res.json()
         if(res.ok){
            dispatch(signInSuccess(data));
            navigate('/')
         }
       } catch(error){
         console.log('error is ',error);
       }
    }
  return (
    <Button type='button'  outline onClick={handleGoogleClick}>
      <FcGoogle className= 'w-7 h-7 mr-2' />
      Continue with Google
    </Button>
  )
}
