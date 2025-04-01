import React, { useContext, useEffect, useState } from 'react'
import Trackcontext from '../context/Trackcontext'

const Infopage = () => {
const [data, setdata] = useState("")
  const{id, type, token} = useContext(Trackcontext)

  

  const duration = (duration_ms) => {
    const totaltime = Math.floor(duration_ms / 1000);
    const minutes = Math.floor(totaltime / 60);
    const seconds = totaltime % 60;
    if (seconds > 9) { return `${minutes}:${seconds}` }
    else { return `${minutes}:0${seconds}` }
  }

useEffect(() => {
  const fetchdata = async () => {
    if (!token) {
      console.error('No token available');
      return;
    }
    try{
     let response
  if(type === "track"){

  response = await fetch (`https://api.spotify.com/v1/tracks/${id}`,
  {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

 
    const artistinfo = ()=>{
    const artistid = data.album.artists[0].id
    console.log(artistid);
    }
    
  }
  else if (type === "album"){

    response =await fetch (`https://api.spotify.com/v1/albums/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      
  } else{
    throw new Error('Invalid type specified');
  }

        const fetchedData = await response.json();
        setdata(fetchedData);
       console.log(artistinfo)
        console.log(fetchedData)
  }
    catch{
      console.error('Error fetching data:');
    }

};
fetchdata();
}, [id, type, token])


if(type === 'album' && data ){
  return(
    <div className=' p-4 max-h-[620px] overflow-y-scroll scrollbar-hidden'>
    <div className='flex gap-4'>
      <div className='w-1/4 backdrop-blur-md bg-white/30 my-6 rounded-3xl'>
<img className='p-5' src={data.images[1].url || data.images[0].url} alt={data.name} /></div>
    <div className='w-3/4 backdrop-blur-md bg-white/30 my-6 rounded-3xl content-center p-5'> 
    
    <div className='text-7xl font-bold font-serif text-white/80'>{data.name} <span className='text-base font-medium font-serif'>{data.album_type} </span></div>
    <div className=''></div>
    <div className="font-bold font-serif mt-2 text-2xl text-white/80">
  {data.artists.map((artist, index) => (
    <span key={index}>
      {artist.name}
      {index < data.artists.length - 1 && <span>, </span>}
    </span>
  ))}
</div>
    <div className='text-base  font-serif text-white/80'>Popularity: {data.popularity}</div>
    <div className='text-base  font-serif text-white/80'>Released on: {data.release_date}</div>
   
    </div>
    
    </div>
    <div className='backdrop-blur-md bg-white/30  rounded-3xl w-full p-5 overflow-y-scroll scrollbar-hidden'> 
    <div className='font-medium font-serif text-3xl border-b-2 border-white/30 pb-2 text-white/80 shadow-2xl'>{data.tracks.total} Tracks</div>
    <div>
      {data.tracks.items.map((item,index)=>(
        <div className='flex mt-2 hover:bg-white/30 justify-between'  key={index}>
          <div className="flex justify-between items-center">
      <img
        className="h-12 w-12 rounded-2xl "
        src={data.images[1]?.url || data.images[0]?.url}
        alt={item.name || "Track image"}
      />
      <div className="ml-2">
        <p className='text-base text-white/80 font-medium'>{item.name}</p>
       
      </div>
    </div>
   
    <div className="flex items-center">
      <p className='text-white/80'>{duration(item.duration_ms)}</p>
    </div>
  </div>
      ))}
    </div>
    </div>
    </div>
  )} 
else if( type === 'track' && data){
  return(  
     <div className=' p-4 max-h-[620px] overflow-y-scroll scrollbar-hidden'>
    <div className='flex gap-4'>
      <div className='w-1/4 backdrop-blur-md bg-white/30 my-6 rounded-3xl'>
<img className='p-5' src={data.album.images[1].url || data.album.images[0].url} alt={data.name} /></div>
    <div className='w-3/4 backdrop-blur-md bg-white/30 my-6 rounded-3xl content-center p-5'> 
    
    <div className='text-7xl font-bold font-serif text-white/80'>{data.name} <span className='text-base font-medium font-serif'>{data.type} </span></div>
    <div className=''></div>
    <div className="font-bold font-serif mt-2 text-2xl text-white/80">
  {data.artists.map((artist, index) => (
    <span key={index}>
      {artist.name}
      {index < data.artists.length - 1 && <span>, </span>}
    </span>
  ))}
</div>
    <div className='text-base  font-serif text-white/80'>Popularity: {data.popularity}</div>
    <div className='text-base  font-serif text-white/80'>Released on: {data.album.release_date}</div>
    </div></div>
    <div className='backdrop-blur-md bg-white/30  rounded-3xl w-full p-5 overflow-y-scroll scrollbar-hidden'> 

    </div> </div>
  )
}

  
}

export default Infopage
