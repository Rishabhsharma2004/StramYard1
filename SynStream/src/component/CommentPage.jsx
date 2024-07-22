import React, { useEffect, useState } from "react";
import moment from "moment";
import { FaThumbsUp } from "react-icons/fa";
import { useSelector } from "react-redux";
export default function CommentPage({ comment, onLike, ondelete }) {
  const [user, setUser] = useState({});
  const { currentUser } = useSelector((state) => state.user);
  useEffect(() => {
    const getUser = async () => {
      try {
        const id = comment.userId;
        const res = await fetch(`/api/user/${id}`);
        const data = await res.json();
        if (res.ok) {
          setUser(data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getUser();
  }, [comment]);

  const handledelet = async() =>{

  }

  return (
    <div className="flex p-4 border-b dark:border-gray-600 text-xs">
      <div className=" flex-shrink-0 mr-3">
        <img
          className=" w-10 h-10 rounded-full bg-gray-200"
          src={user.profilePicture}
          alt={user.username}
        />
      </div>
      <div className=" flex-1">
        <div className=" flex items-center mb-1">
          <span className=" font-bold mr-1 text-xs truncate">
            {user ? `@${user.username}` : "anonymous user"}
          </span>
          <span className=" text-gray-500 text-xs">
            {moment(comment.createdAt).fromNow()}
          </span>
        </div>
        <p className=" text-gray-600 dark:text-gray-200 mb-2">
          {comment.content}
        </p>
        <div className="flex items-center pt-2 text-xs border-t dark:border-gray-700 max-w-fit gap-2">
          <button
            type="button"
            onClick={() => onLike(comment._id)}
            className={`text-gray-400 hover:text-blue-500 ${
              currentUser &&
              comment.Likes.includes(currentUser._id) &&
              "!text-blue-600"
            }`}
          >
            <FaThumbsUp className="text-sm" />
          </button>
          <p className=" text-gray-400">{
            comment.numberOfLikes > 0 && comment.numberOfLikes +" "+ (comment.numberOfLikes === 1 ? 'Like': 'Likes')
          }</p>
          {currentUser && (currentUser._id === comment.userId || currentUser.isAdmin) && (
            <button
            type="button"
            onClick={()=>ondelete(comment._id)}
            className=" text-gray-400 hover:text-red-500"
            >
              Delete
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
