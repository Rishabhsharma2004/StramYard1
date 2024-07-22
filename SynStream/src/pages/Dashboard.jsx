import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import DashSidebar from '../component/DashSidebar';
import DashProfile from '../component/DashProfile';
import DashPosts from '../component/DashPosts';
import DashboardComponent from '../component/DashboardComponent';
export default function Dashboard() {
  const location = useLocation();
  const [tab, setTab] = useState('');
  useEffect(()=>{
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get('tab');
    if(tabFromUrl){
      setTab(tabFromUrl);
    }
  },[location.search]);
  return (
    <div className='min-h-screen flex flex-col md:flex-row'>
     {/* sidebar */}
      <div className= 'md:w-56'>
         <DashSidebar/>
      </div>
      {/* profile */}
      {tab === 'profile' && <DashProfile/>}
      {/* Posts */}
      {tab === 'posts' && <DashPosts/>}
      {/* dashboard */}
      {tab === 'dash' && <DashboardComponent/>}
    </div>
  )
}
