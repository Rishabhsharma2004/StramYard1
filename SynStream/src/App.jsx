import React from 'react'
import { BrowserRouter,Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'
import Signin from './pages/SignIn'
import SignUp from './pages/SignUp'
import Project from './pages/Project'
import Dashboard from './pages/Dashboard'
import Header from './component/Header'
import Footer from './component/Footer'
export default function App() {
  return (
     <BrowserRouter>
     <Header />
        <Routes>
          <Route path='/' element ={<Home />}></Route>
          <Route path='/about' element ={<About />}></Route>
          <Route path='/sign-in' element ={<Signin />}></Route>
          <Route path='/sign-Up' element ={<SignUp />}></Route>
          <Route path='/project' element ={<Project />}></Route>
          <Route path='/dashboard' element ={<Dashboard />}></Route>
        </Routes>
        <Footer/>
     </BrowserRouter>
  )
}
