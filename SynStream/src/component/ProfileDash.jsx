import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const ProfileCard = () => {
  const { currentUser } = useSelector((state) => state.user);

  return (
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
          <p className="text-sm text-gray-600 dark:text-gray-300">Rank: 342,074</p>
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
            <p>Views</p>
            <span>10</span>
          </div>
          <div className="text-center mb-4 sm:mb-0">
            <p>Solution</p>
            <p>5</p>
          </div>
          <div className="text-center mb-4 sm:mb-0">
            <p>Discuss</p>
            <p>0</p>
          </div>
          <div className="text-center">
            <p>Reputation</p>
            <p>0</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
