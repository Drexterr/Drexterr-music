import React, { useContext, useEffect } from 'react'
import Trackcontext from '../context/Trackcontext'

const home = () => {
  const { track, artist, album, token, newrelease, setNewrelease, severalalbums, setSeveralalbums} = useContext(Trackcontext)

  useEffect(() => {
    const fetchnewrelease = async () => {
      if (!token) return;

      try {

        const severalalbumsresponse = await fetch (`https://api.spotify.com/v1/albums?ids=5KF4xCxDD8ip003hoatFT9,2Lxoc72vRTGdQfMvj7Ovi1,3BGU0BqGwBkYDHpfCWFm7I,3OxfaVgvTxUTy7276t7SPU,4OYdTHNgjhXzgVjbqsb0tO,0upenH0uUT36nBbVM5mQhW,7vpQCYM9kT9jhKa2MEzZSl,7w80tk12K6vKuXC7MriUIh`,{
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })

        const releaseresponse = await fetch(`https://api.spotify.com/v1/browse/new-releases?&limit=10`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const releasedata = await releaseresponse.json();
        const severalalbumsdata = await severalalbumsresponse.json();

        if (!releaseresponse.ok || !releasedata.length === 0) {

          throw new Error(`HTTP error! Status: ${releaseresponse.status}`);
        }

        setSeveralalbums(severalalbumsdata);
        setNewrelease(releasedata);
        console.log(releasedata);
        console.log(severalalbumsdata);
      } catch (error) {
        console.error('Error fetching New Releases:', error.message);
      }
    }; fetchnewrelease();
  }, [token, setNewrelease, setSeveralalbums]);

  if (!track || !track.tracks || !track.tracks.items || track.tracks.items.length === 0 ) {

    if(!newrelease || !newrelease.albums || !newrelease.albums.items){

    return (
      <div className="bg-white/30 backdrop-blur-md h-2/3 my-6 rounded-3xl w-full text-4xl p-6 font-medium font-sans">
        Click on login or Search for a song
              </div>

    );
  }
  else{
    return(
      <div className='backdrop-blur-md bg-white/30 my-6 rounded-3xl w-3/4 p-4 max-h-[620px] '>
        <div className='flex flex-row gap-4 overflow-x-auto pb-2  mt-2 scrollbar-hidden  items-start '>
        <p className='font-black vertical-text text-3xl'>NEW RELEASES</p>
        {newrelease.albums.items.map((items, index) => (
          <div key={index} className='flex-shrink-0 snap-start min-h-fit w-52  hover:bg-white/30 hover:rounded-4xl justify-self-center'>
          <img className='rounded-full object-cover h-40 w-40 shadow-2xl justify-self-center' src={items.images[0]?.url || items.images[2]?.url} alt={items.name} />
          <div className='justify-self-center font-medium text-xl'>{items.name}</div>
        </div>
        ))}
</div>
<div className='flex flex-row gap-4 overflow-x-auto pb-2   mt-10 scrollbar-hidden items-start   '>
        <p className='font-black vertical-text text-3xl'>TOP ALBUMS</p>
        {severalalbums.albums.map((albums, index) => (
          <div key={index} className='flex-shrink-0 snap-start min-h-fit w-52  hover:bg-white/30 hover:rounded-4xl justify-self-center'>
          <img className='rounded-full object-cover h-40 w-40 shadow-2xl justify-self-center' src={albums.images[0]?.url || albums.images[2]?.url} alt={albums.name} />
          <div className='justify-self-center font-medium text-xl'>{albums.name}</div>
        </div>
        ))}
</div>
      </div>
    )
  }
  }




  const duration = (duration_ms) => {
    const totaltime = Math.floor(duration_ms / 1000);
    const minutes = Math.floor(totaltime / 60);
    const seconds = totaltime % 60;
    if (seconds > 9) { return `${minutes}:${seconds}` }
    else { return `${minutes}:0${seconds}` }
  }

  console.log(track)
  console.log(artist)
  console.log(album)
  return (

    <div className='backdrop-blur-md bg-white/30 my-6 rounded-3xl w-full p-4 max-h-[620px] overflow-y-scroll scrollbar-hidden'>
      <div className='grid grid-rows-[auto_auto_auto] max-h-screen gap-5'>
        <div className='grid-cols-2 grid gap-2 max-h-[40vh]'>
          <div className='overflow-y-scroll scrollbar-hidden'>
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
          </div>
          <div className='text-center justify-self-end backdrop-opacity-50 grid grid-cols-2 rounded-3xl p-4 justify-end'>
            <div><h2 className='font-black vertical-text text-4xl pr-4 pb-4'>TOP RESULT</h2></div>
            <div>
              <img className='rounded-4xl h-50' src={track.tracks.items[0].album.images[1].url} alt="" />
              <div> <h2 className='font-semibold mt-3'>{track.tracks.items[0].name}</h2></div>
              <div>{track.tracks.items[0].album.artists[0].name}</div>
            </div>
          </div>
        </div>

        <div className='flex flex-row gap-4 overflow-x-auto pb-2 snap-x snap-mandatory mt-2 scrollbar-hidden items-center  max-h-[40vh]'>
          <p className='font-black vertical-text text-4xl'>TOP ARTISTS</p>
          {artist.artists.items.map((items, index) => (
            <div key={index} className='flex-shrink-0 snap-start min-h-fit w-52  hover:bg-white/30 hover:rounded-4xl justify-self-center'>
              <img className='rounded-full object-cover h-40 w-40 shadow-2xl justify-self-center' src={items.images[1]?.url || items.images[2]?.url} alt={items.name} />
              <div className='justify-self-center font-medium text-xl'>{items.name}</div>

            </div>
          ))}
        </div>
        <div className=' flex flex-row gap-4 overflow-x-auto pb-2 snap-x snap-mandatory mt-2 scrollbar-hidden items-center '>
          <p className='font-black vertical-text text-4xl'>TOP ALBUMS</p>
          {album.albums.items.map((items, index) => (
            <div key={index} className='flex-shrink-0 snap-start min-h-fit w-52  hover:bg-white/30 hover:rounded-4xl justify-self-center'>
              <img className='rounded-full object-cover h-40 w-40 shadow-2xl justify-self-center' src={items.images[1]?.url || items.images[2]?.url} alt={items.name} />
              <div className='justify-self-center font-medium text-xl'>{items.name}</div>

            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default home