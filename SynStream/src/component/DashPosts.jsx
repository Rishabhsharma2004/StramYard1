import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Card, Modal, Button } from "flowbite-react";
import { Link } from "react-router-dom";
import {HiOutlineExclamationCircle} from 'react-icons/hi'
export default function DashPosts() {
  const { currentUser } = useSelector((state) => state.user);
  const [userPosts, setUserPosts] = useState([]);
  const [showMore, setShowMore] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [postIdDelete, setPostIdDelete] = useState(null);
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const id = currentUser._id;
        const res = await fetch(`/api/post/getposts?userId=${id}`);
        const data = await res.json();
        if (res.ok) {
          setUserPosts(data.posts);
          if (data.posts.length < 9) {
            setShowMore(false);
          }
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    if (currentUser.isAdmin) {
      fetchPosts();
    }
  }, [currentUser]);

  const handleShowMore = async () => {
    const startIndex = userPosts.length;
    try {
      const res = await fetch(
        `/api/post/getposts?userId=${currentUser._id}&startIndex=${startIndex}`
      );
      const data = await res.json();
      if (res.ok) {
        setUserPosts((prev) => [...prev, ...data.posts]);
        if (data.posts.length < 9) {
          setShowMore(false);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

 const handelDeletePost= async()=>{
  setShowModal(false);
   try{
       const res = await fetch(`/api/post/deletepost/${postIdDelete}/${currentUser._id}`,{
         method: 'DELETE',
       })
       const data = await res.json('Post deleted successfully');
       if(!res.ok){
        console.log(data.message);
       }else{
        setUserPosts((prev)=>prev.filter((post)=>post._id !== postIdDelete));
       }
  
   }catch(error){
    console.log(error);
   }
 }

  return (
    <div className="flex justify-center p-4 mt-5">
      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {currentUser.isAdmin && userPosts.length > 0 ? (
          <>
            {userPosts.map((post, index) => (
              <Card
                key={index}
                className="w-full h-96 flex flex-col justify-between overflow-hidden mb-5 hover:scale-105"
              >
              <Link to={`/post/${post.slug}`}>
              <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-40 object-cover mt-20"
                />
              </Link>
                <div className="p-4 flex flex-col justify-between flex-grow">
                  <Link to="#">
                    <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white overflow-hidden text-ellipsis whitespace-nowrap">
                      {post.title}
                    </h5>
                  </Link>
                  <div className="mb-10 mt-2.5 mr-1 flex items-center">
                    <span className="ml-3 mr-2 rounded  py-0.5 text-xs font-semibold text-gray-950 dark:text-white">
                      {new Date(post.updatedAt).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex items-center justify-between mb-20 ">
                    <span className="text-3xl font-bold text-gray-900 dark:text-white">
                      <span
                        onClick={() =>{setShowModal(true)
                         setPostIdDelete(post._id)}
                         }
                        className=" cursor-pointer rounded-lg bg-red-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
                      >
                        Delete
                      </span>
                    </span>
                    <span className="text-3xl font-bold text-gray-900 dark:text-white">
                      <Link
                        to={`/update-post/${post._id}`}
                        className="rounded-lg bg-cyan-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-cyan-800 focus:outline-none focus:ring-4 focus:ring-cyan-300 dark:bg-cyan-600 dark:hover:bg-cyan-700 dark:focus:ring-cyan-800"
                      >
                        Edit
                      </Link>
                    </span>
                  </div>
                </div>
              </Card>
            ))}
            <div className="flex items-center justify-between text-teal-400">
              {showMore && (
                <button onClick={handleShowMore} className="">
                  Show more
                </button>
              )}
              {showModal && (
                <Modal
                  show={showModal}
                  onClose={() => setShowModal(false)}
                  popup
                  size="md"
                >
                  <Modal.Header />
                  <Modal.Body>
                    <div className="text-center">
                      <HiOutlineExclamationCircle className="h-14 w-14 text-gray-400 dark:text-gray-200 mb-4 mx-auto" />
                      <h3 className="bm-5 text-lg text-gray-500 dark:text-gray-300">
                        Are you sure you want to delete this Post
                      </h3>
                      <div className="flex items-center justify-between gap-4 mt-4">
                        <Button onClick={handelDeletePost}>
                          Yes, i'm sure
                        </Button>
                        <Button
                          color="gray"
                          onClick={() => setShowModal(false)}
                        >
                          No, cancel
                        </Button>
                      </div>
                    </div>
                  </Modal.Body>
                </Modal>
              )}
            </div>
          </>
        ) : (
          <h1>You have no any posts</h1>
        )}
      </div>
    </div>
  );
}
