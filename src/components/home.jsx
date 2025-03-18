import React, {useContext} from 'react'
import Trackcontext from '../context/Trackcontext'

const home = () => {
  const {track} = useContext(Trackcontext)
  console.log(track)

  if (!track || !track.tracks || !track.tracks.items || track.tracks.items.length === 0) {
    return (
      <div className="bg-emerald-300 opacity-65 backdrop-blur-3xl h-2/3 my-6 rounded-3xl w-full">
        <p>Loading tracks or no tracks available...</p>
      </div>
    );
  }

  return (
    


      <div className='bg-emerald-300 opacity-65 backdrop-blur-3xl h-2/3 my-6 rounded-3xl w-full'>
      Songs
       
      {track.tracks.items.map((items, index) => (
        

<div key= {index}className='grid grid-cols-[60px_1fr]'>
<div className='h-12 w-12'> <img src={items.album.images[0].url} alt={items.name} /></div>
<div>
<div>
  {items.name}
</div>

<div>{items.album.artists[0].name}</div>
</div></div>

        
      ))}
    </div>
    
  )
}

export default home
