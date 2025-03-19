import React, { useContext } from 'react'
import Trackcontext from '../context/Trackcontext'

const home = () => {
  const { track, artist } = useContext(Trackcontext)
  console.log(track)
  console.log(artist)

  if (!track || !track.tracks || !track.tracks.items || track.tracks.items.length === 0) {
    return (
      <div className="bg-white/30 backdrop-blur-md  h-2/3 my-6 rounded-3xl w-full">
        <p>Loading tracks or no tracks available...</p>
      </div>
    );
  }

  const duration = (duration_ms)=>{
   const totaltime = Math.floor(duration_ms/1000);
    const minutes = Math.floor(totaltime / 60);
    const seconds = totaltime % 60;
     if(seconds>10){return `${minutes}:${seconds}`}
     else{return `${minutes}:0${seconds}`}
  
    
  }

  return (
    <div className=' backdrop-blur-md bg-white/30  my-6 rounded-3xl w-full p-4 h-fit '>
<div className='grid grid-rows-2 gap-3'>
      <div className=' grid-cols-2 grid gap-2'>
        <div>
          {track.tracks.items.map((items, index) => (
            <div key={index} className='grid grid-cols-[60px_1fr_60px] gap-1 mt-2 hover:bg-white/30'>
              <div className='h-12 w-12'> <img src={items.album.images[0].url} alt={items.name} /></div>
              <div>
                <div className='font-medium'>
                  {items.name}
                </div>
                <div>{items.album.artists[0].name}</div>
                
              </div>
              <div> {duration(items.duration_ms)}</div>
              </div>
          ))}
        </div >

        <div className=' text-center justify-self-center'>
          <img className='rounded-4xl h-50 ' src={track.tracks.items[0].album.images[1].url} alt="" />
         <div> <h2 className='font-black'>{track.tracks.items[0].name}</h2></div>
        </div>


        </div>
      
<div>Artists</div>
      </div>
    </div>
  )
}

export default home
