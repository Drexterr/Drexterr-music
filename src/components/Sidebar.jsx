import React from 'react'

const Sidebar = () => {
  return (
  
    <div className='bg-white/30 backdrop-blur-3xl h-2/3 my-6 rounded-3xl w-1/4 p-3'>
      <div className='flex  text-2xl font-medium'> Library</div>
      <div className='py-3'><input className="border-2 border-white px-6 py-2 rounded-2xl focus:outline-none" type="text"  placeholder='search'/></div>
      <div className='grid grid-cols-[60px_1fr]'>
        <div className='h-12 w-12 bg-amber-300'> </div>
        <div>
        <div>
          Liked Song
        </div>
        
        <div><span>Playlist / 0 Songs</span></div>
      </div></div>
    </div>
  )
}

export default Sidebar
