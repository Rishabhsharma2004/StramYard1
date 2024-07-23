import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import ProfileCard from "./ProfileDash";
import { Line, Bar } from "react-chartjs-2";
import { Link } from "react-router-dom";
import "chart.js/auto";
export const CURRENT_YEAR = new Date().getFullYear();
export default function DashboardComponent() {
  const [comments, setComments] = useState([]);
  const [posts, setPosts] = useState([]);
  const [totalPosts, setTotalPosts] = useState(0);
  const [totalComments, setTotalComments] = useState(0);
  const [lastMonthPosts, setLastMonthPosts] = useState(0);
  const [lastMonthComments, setLastMonthComments] = useState(0);
  const [arrayPost, setArrayPost] = useState([]);
  const { currentUser } = useSelector((state) => state.user);
  const lineData = {
    labels: [
      CURRENT_YEAR - 5,
      CURRENT_YEAR - 4,
      CURRENT_YEAR - 3,
      CURRENT_YEAR - 2,
      CURRENT_YEAR - 1,
      CURRENT_YEAR,
    ],
    datasets: [
      {
        label: "Posts",
        data: [0, 2, 10, 6, 7, lastMonthPosts, totalPosts],
        fill: false,
        borderColor: "#FDBA74",
        tension: 0.1,
      },
    ],
  };

  const barData = {
    labels: Array.from({ length: totalComments+10 }, (_, i) => i),
    datasets: [
      {
        label: "Comments",
        data: [
          2, 3, 5, 8, 13, 21,totalComments, 8, 5, 3, 2, 0, 0, 10,totalComments,
        ],
        backgroundColor: ({ datasetIndex, dataIndex }) =>
          dataIndex === totalComments ? "#ffA500" : "#808080",
      },
    ],
  };
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch(`/api/post/getposts?limit=5`);
        const data = await res.json();
        if (res.ok) {
          setPosts(data.posts);
          setTotalPosts(data.totalPost);
          setLastMonthPosts(data.lastMonthAgo);
        }
      } catch (error) {
        console.log(error.message);
      }
    };

    const fetchComments = async () => {
      try {
        const res = await fetch(`/api/comment/getcomments?limit=5`);
        const data = await res.json();
        if (res.ok) {
          setComments(data.comments);
          setLastMonthComments(data.lastMonthComments);
          setTotalComments(data.totalComments);
        }
      } catch (error) {
        console.log(error.message);
      }
    };

    if (currentUser && currentUser.isAdmin) {
      fetchComments();
      fetchPosts();
    }
  }, [currentUser]);

  return (
    <div className="flex flex-wrap lg:w-full lg:h-full md:w-auto md:h-auto sm:w-auto sm:h-auto lg:grid lg:grid-cols-3 sm:grid-cols-2 md:grid-cols-1 lg:gap-4 p-4">
      <div className="w-full md:h-auto md:w-auto lg:w-auto mb-4 lg:mb-0 lg:h-full">
      <div className="bg-transparent md:h-auto md:w-full lg:h-screen w-full lg:w-auto p-6 rounded-lg shadow-lg">
      <div className="flex items-center flex-wrap">
        <Link to={`/dashboard?tab=profile`} className="w-full md:w-auto">
          <img
            src={currentUser.profilePicture}
            alt={currentUser.username}
            className="w-32 h-32 object-cover rounded-full border-gray-500 border-4 mx-auto md:mx-0"
          />
        </Link>
        <div className="ml-4 text-center md:text-left w-full md:w-auto">
          <h1 className="text-xl font-bold text-gray-800 dark:text-gray-300">{currentUser.username}</h1>
          <p className="text-sm text-gray-600 dark:text-gray-300">{currentUser.email}</p>
          <p className="text-sm text-gray-600 dark:text-gray-300">Posts: {totalPosts}</p>
        </div>
      </div>
      <div className="mt-4 text-center">
        <Link to={'/dashboard?tab=profile'}>
          <button className="w-full py-2 px-4 bg-green-500 text-white rounded-md hover:bg-green-600">
            Edit Profile
          </button>
        </Link>
      </div>
      <div className="mt-4 text-center">
        <p className="text-lg text-gray-600 dark:text-gray-400">{currentUser.username}</p>
      </div>
      <div className="mt-4">
        <div className="flex flex-col sm:flex-row md:flex-col justify-around text-gray-600 dark:text-gray-500">
          <div className="text-center mb-4 sm:mb-0">
            <p>Total Posts</p>
            <span>{totalPosts}</span>
          </div>
          <div className="text-center mb-4 sm:mb-0">
            <p>Last month posts</p>
            <p>{lastMonthPosts}</p>
          </div>
          <div className="text-center mb-4 sm:mb-0">
            <p>Comments</p>
            <p>{totalComments}</p>
          </div>
          <div className="text-center">
            <p>Last month comments</p>
            <p>{lastMonthComments}</p>
          </div>
        </div>
      </div>
    </div>
      </div>
      <div className="col-span-1 lg:col-span-2 w-full h-auto">
  <div className="bg-transparent p-6 rounded-lg shadow-lg w-full">
    <div className="flex flex-wrap justify-center md:justify-between items-center mb-4">
      <div className="w-full sm:w-auto mb-4 sm:mb-0">
        <h1 className="text-4xl font-bold text-gray-800 dark:text-white">
          {totalPosts}
        </h1>
        <p className="text-gray-800 dark:text-gray-400">Total Posts</p>
      </div>
      <div className="w-full sm:w-auto text-right">
        <p className="text-2xl font-bold text-gray-800 dark:text-white">
          {lastMonthPosts}
          <span className="text-gray-400"> / {totalPosts}</span>
        </p>
        <p className="text-lg text-gray-800 dark:text-gray-400">Last month posts</p>
      </div>
    </div>
    <div className="flex flex-wrap justify-center md:justify-between items-center mb-4">
      <div className="w-full sm:w-auto mb-4 sm:mb-0">
        <p className="text-lg text-gray-800 dark:text-gray-400">Total comments</p>
        <p className="text-2xl font-bold text-gray-800 dark:text-white">{totalComments}</p>
      </div>
      <div className="w-full sm:w-auto text-right">
        <p className="text-lg text-gray-800 dark:text-gray-400">Last month comments</p>
        <p className="text-2xl font-bold text-gray-800 dark:text-white">
          {lastMonthComments}
          <span className="text-gray-400"> / {totalComments}</span>
        </p>
      </div>
    </div>
    <div className="p-4 rounded-lg gap-5">
      <p className="text-center mb-2 text-gray-800 dark:text-white">
        {CURRENT_YEAR - 1 + "-" + CURRENT_YEAR}
      </p>
      <div className="relative h-[245px] w-full gap-5 border-b-2 border-gray-500 mb-10">
        <Line data={lineData} options={{ responsive: true, maintainAspectRatio: false }} />
      </div>
      <div className="mt-10">
        <Bar data={barData} options={{ responsive: true, maintainAspectRatio: false }} />
      </div>
    </div>
  </div>
</div>

    </div>
  );
}
