import React, { useEffect, useState } from 'react'
import { Avatar, Button, Dropdown, Navbar, TextInput } from 'flowbite-react'
import { Link , useLocation, useNavigate} from 'react-router-dom'
import {AiOutlineSearch} from 'react-icons/ai'
import {FaMoon, FaSun} from 'react-icons/fa'
import { useSelector , useDispatch} from 'react-redux'
import { toggletheme } from '../redux/theme/themeSlice';
import {signOutSuccess} from "../redux/user/userSlice"
import { HiCog, HiCurrencyDollar, HiLogout, HiViewGrid } from "react-icons/hi";
import { GrUserManager } from "react-icons/gr";
export default function Header() {
    const path = useLocation().pathname;
    const dispatch = useDispatch();
    const {currentUser} = useSelector(state => state.user);
    const {theme} = useSelector(state => state.theme)
    const [searchTerm, setSearchTerm ] = useState('');
    const Location = useLocation();
    const navigate = useNavigate();
    useEffect(()=>{
       const urlParams = new URLSearchParams(Location.search);
       const searchTermFromUrl = urlParams.get('searchTerm');
       if(searchTermFromUrl){
        setSearchTerm(searchTermFromUrl);
       }
    },[Location.search]);
  const handleSignOut = async () =>{
      try{
         const res = await fetch('/api/user/signout',{
          method: 'POST',
         })
         const data = await res.json('User signOut successfuly');
         if(!res.ok){
          console.log(data.message);
         }else{
            dispatch(signOutSuccess());
         }
      }catch(error){
        console.log(error);
      }
  }
  const handleSubmit =(e) =>{
    e.preventDefault();
    const urlParams = new URLSearchParams(Location.search);
    urlParams.set('searchTerm', searchTerm);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  }
  return (
    <>
    <Navbar className='border-b-2 sticky'>
       <Link to= "/" className='self-center whitespace-nowrap text-sm sm:text-xl font-semibold dark:text-white'>
         <span className='px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white'>TechStack</span> Blog
       </Link>
       <form  onSubmit={handleSubmit}>
         <TextInput 
            type='text'
            placeholder='Search...'
            rightIcon={AiOutlineSearch}
            className='hidden lg:inline '
            value={searchTerm}
            onChange={(e)=>setSearchTerm(e.target.value)}
         />
       </form>
       <Button className='w-12 h-10 lg:hidden' color='gray ' pill>
         <AiOutlineSearch />
       </Button>
       <div className='flex gap-2 md:order-2 '>
         <Button className={`sm:flex hidden w-14 h-8 p-0 items-center justify-start mt-2 mr-5 border-2 ${theme === 'light' ? ' border-orange-400' : ' border-gray-100'}`} color='gray' pill  onClick={()=> dispatch(toggletheme())} >
         {theme === 'light' ? <FaSun color ='orange'className='transform translate-x-0 ease-in-out p-[0.5px]  text-xl ml-[-10px] ' /> : <FaMoon color='gray' className='transform translate-x-6 ease-out  text-xl ml-[-14px] p-0'/>}
         </Button>
         

         {currentUser ?(
           <Dropdown arrowIcon ={false} inline label = {
            <Avatar 
              alt='user'
              img={currentUser.profilePicture}
              rounded
              bordered
              color="purple"
              status="online"
            />
           }>
             <Dropdown.Header >
             <span className='block text-sm'>UserName: {currentUser.username}</span>
             <span className='block text-sm font-medium truncate mb-5'>Email: {currentUser.email}</span>
               
             </Dropdown.Header>
            <Link to={'/dashboard?tab=profile'}>
               <Dropdown.Item icon={GrUserManager}>Profile</Dropdown.Item>
            </Link>
            <Link to={'/dashboard?tab=dash'}>
                <Dropdown.Item icon={HiViewGrid}>Dashboard</Dropdown.Item>
            </Link>
            <Dropdown.Item icon={(theme === 'light' ? FaSun: FaMoon)} onClick={()=> dispatch(toggletheme())}>
            {theme === 'light' ? 'Light' : 'Dark'}
            </Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item icon={HiLogout} onClick={handleSignOut}>Sign Out</Dropdown.Item>
           </Dropdown>
         ):(
          <Link to='/sign-in'> 
           <Button gradientDuoTone= 'purpleToBlue'  outline>
             Sign In
           </Button>
         </Link>
         )
        }


        
        <Navbar.Toggle />
       </div>
         <Navbar.Collapse>
            <Navbar.Link active = {path === "/"} as={'div'}>
                <Link to= '/'>Home</Link>
            </Navbar.Link>
            <Navbar.Link active = {path === "/about"} as={'div'}>
                <Link to= '/about'>About</Link>
            </Navbar.Link>
            <Navbar.Link active = {path === "/project"} as={'div'}>
                <Link to= '/project'>Project</Link>
            </Navbar.Link>
         </Navbar.Collapse>
    </Navbar>
    </>
  )
}
