import React, {useState, useEffect} from 'react'
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import Home from './components/home'
import Mainscreen from './components/Mainscreen'
const App = () => {


  
  return (

    <div className='bg-gradient-to-b from-[#9D174D] to-black h-screen  w-full  p-2'>
      <Navbar/>
    <div className='flex gap-4'>  <Sidebar/>
      <Home/></div>
    
      <div className=""></div>
    </div>
  )
}

export default App
