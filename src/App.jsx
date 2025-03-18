import React, {useState, useEffect} from 'react'
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import Home from './components/home'
const App = () => {

 




 
  
  return (

    <div className='bg-gradient-to-r from-emerald-400 via-teal-500 to-cyan-600 h-screen w-full p-2'>
      <Navbar/>
    <div className='flex gap-4'>  <Sidebar/>
      <Home/></div>
    
      <div className=""></div>
    </div>
  )
}

export default App
