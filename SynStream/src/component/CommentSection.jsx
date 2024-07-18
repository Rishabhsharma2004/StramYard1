import { Alert, Button, Textarea } from "flowbite-react";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { FaPaperPlane } from "react-icons/fa";
import CommentPage from "../component/CommentPage";
export default function CommentSection({ postId }) {
  const { currentUser } = useSelector((state) => state.user);
  const [comment, setcomment] = useState("");
  const [commentError, setCommentError] = useState('');
  const [comments, setcomments] = useState([]);
  const handelSubmit = async (e) => {
    e.preventDefault();
    if (comment.length > 250) {
      return;
    }
    try {
      const res = await fetch("/api/comment/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          content: comment,
          postId,
          userId: currentUser._id,
        }),
      });
      const data = await res.json();
      if (res.ok) {
        setcomment("");
        setCommentError('');
        setcomments([data, ...comments])
      }
    } catch (error) {
     setCommentError(error.message);
    }
  };
useEffect(()=>{
   const getComments = async () =>{
     try{
       const res = await fetch(`/api/comment/getPostComment/${postId}`);
       const data = await res.json();
       if(res.ok){
         setcomments(data);
       }
     }catch(error){
       console.log(error.message);
     }
   }
   getComments();
}, [postId])

  return (
    <div>
      {currentUser ? (
        <div className="flex gap-1 my-5 text-sm text-gray-500">
          <p>Signed in as:</p>
          <img
            className="h-5 w-5 object-cover rounded-full"
            src={currentUser.profilePicture}
            alt=""
          />
          <Link
            className=" text-cyan-500 hover:underline"
            to={"/dashboard?tab=profile"}
          >
            @{currentUser.username}
          </Link>
        </div>
      ) : (
        <div className=" text-sm text-teal-500 my-5 flex gap-1">
          You must be signed in to comment,
          <Link className=" text-blue-500 hover:underline" to={"/sign-in"}>
            Sign in
          </Link>
        </div>
      )}
      {currentUser && (
        <form
          onSubmit={handelSubmit}
          className=" border border-teal-500 rounded-md p-3"
        >
          <Textarea
            placeholder="Add a comment..."
            maxLength="250"
            rows={3}
            onChange={(e) => setcomment(e.target.value)}
            value={comment}
          />
          <div className=" flex justify-between mt-5 items-center">
            {comment.length >= 250 ? (
              <p className=" text-red-600">Comment max length 250</p>
            ) : (
              <p className="text-gray-500 text-xs">
                {250 - comment.length} characters remaining
              </p>
            )}

            <Button outline type="submit">
              <FaPaperPlane className="p-0 h-5 w-10" />
            </Button>
          </div>
          {commentError && (
            <Alert color="failure" className="mt-5">
              {commentError}
            </Alert>
          )}
        </form>
      )}
      {comments.length === 0 ? (
        <p className="text-sm my-5">No comments yet!</p>
      ):(
        <>
        <div className="text-sm my-5 flex items-center gap-1">
          <p>Comments</p>
          <div className="border border-gray-400 py-1 px-2 rounded-sm">
            <p>{comments.length}</p>
          </div>
        </div>
        {comments.map((comment)=>(
          <CommentPage key={comment._id} comment = {comment}/>
      ))}
        </>
      )}
    </div>
  );
}
