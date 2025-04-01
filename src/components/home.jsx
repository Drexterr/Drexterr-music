import React, { useContext, useEffect } from 'react'
import Trackcontext from '../context/Trackcontext'
import { useNavigate } from 'react-router';

const home = () => {
  const { track, artist, album, token, setType , newrelease, setNewrelease, severalalbums, setSeveralalbums, severaltrack, setSeveraltrack, setId} = useContext(Trackcontext)
  const navigate = useNavigate();

  useEffect(() => {
    const fetchnewrelease = async () => {
      if (!token) return;

      try {
        const severaltrackresponse = await fetch (`https://api.spotify.com/v1/tracks?market=IN&ids=1SKPmfSYaPsETbRHaiA18G,25jtUwCQfXwnxENh8Bvoj4,5XeFesFbtLpXzIVDNQP22n,3qhlB30KknSejmIvZZLjOD,1qDrWA6lyx8cLECdZE7TV7,3hRV0jL3vUpRrcy398teAU,6tNQ70jh4OwmPGpYy6R2o9,14AyWf6y7KlWWLfAjdKMKI`,{
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })

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
        const severaltrackdata = await severaltrackresponse.json();

        if (!releaseresponse.ok || !releasedata.length === 0) {

          throw new Error(`HTTP error! Status: ${releaseresponse.status}`);
        }

        setSeveralalbums(severalalbumsdata);
        setNewrelease(releasedata);
        setSeveraltrack(severaltrackdata);
        console.log(releasedata);
        console.log(severalalbumsdata);
        console.log(severaltrackdata);
      } catch (error) {
        console.error('Error fetching New Releases:', error.message);
      }
    }; fetchnewrelease();
  }, [token, setNewrelease, setSeveralalbums, setSeveraltrack]);

  if (!track || !track.tracks || !track.tracks.items || track.tracks.items.length === 0 ) {

    if(!newrelease || !newrelease.albums || !newrelease.albums.items){

    return (
      <div className="bg-white/30 backdrop-blur-md h-2/3 my-6 rounded-3xl w-full text-4xl p-6 font-medium font-sans">
        Click on login or Search for a song
              </div>

    );
  }
  else{

    const handleid = (item, album, track)=>{
      const id = item.id || album.id || track.id;
      const type = item.type || album.type || track.type;
      console.log(id);
      console.log(type);
      setType(type);
      setId(id);
      navigate(`/infopage/${id}`);

    }
    
    return( 
      <div className='backdrop-blur-md bg-white/30 my-6 rounded-3xl w-3/4 p-4 max-h-[620px] overflow-y-scroll scrollbar-hidden'>
        <div className='flex flex-row gap-4 overflow-x-auto pb-2  mt-2 scrollbar-hidden  items-start border-b-2 shadow-2xl border-white/30'>
        <p className='font-black vertical-text text-3xl'>NEW RELEASES</p>
        {newrelease.albums.items.map((item, index) => (
          <div key={index}  onClick={() =>handleid(item)} className='flex-shrink-0 snap-start min-h-fit w-52  hover:bg-white/30 hover:rounded-4xl justify-self-center'>
          <img className='rounded-full object-cover h-40 w-40 shadow-2xl justify-self-center' src={item.images[0]?.url || item.images[2]?.url} alt={item.name} />
          <div className='justify-self-center font-medium text-xl text-center'>{item.name}</div>
        </div>
        ))}
</div>
<div className='flex flex-row gap-4 overflow-x-auto pb-2   mt-10 scrollbar-hidden items-start   border-b-2 shadow-2xl border-white/30'>
        <p className='font-black vertical-text text-3xl'>TOP ALBUMS</p>
        {severalalbums.albums.map((album, index) => (
          <div key={index} onClick={() =>handleid(album)} className='flex-shrink-0 snap-start min-h-fit w-52  hover:bg-white/30 hover:rounded-4xl justify-self-center'>
          <img className='rounded-full object-cover h-40 w-40 shadow-2xl justify-self-center' src={album.images[0]?.url || album.images[2]?.url} alt={album.name} />
          <div className='justify-self-center font-medium text-xl text-center'>{album.name}</div>
        </div>
        ))}
</div>
<div className='flex flex-row gap-4 overflow-x-auto pb-2   mt-10 scrollbar-hidden items-start   border-b-2 shadow-2xl border-white/30'>
        <p className='font-black vertical-text text-3xl'>TOP TRACKS</p>
        {severaltrack.tracks.map((track, index) => (
          <div key={index} onClick={() =>handleid(track)} className='flex-shrink-0 snap-start min-h-fit w-52  hover:bg-white/30 hover:rounded-4xl justify-self-center'>
          <img className='rounded-full object-cover h-40 w-40 shadow-2xl justify-self-center' src={track.album.images[1]?.url || track.album.images[2]?.url} alt={track.album.name} />
          <div className='justify-self-center font-medium text-xl text-center'>{track.name}</div>
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
        <div className='grid-cols-2 grid gap-2 max-h-[40vh] border-b-2 shadow-2xl border-white/30'>
          <div className='overflow-y-scroll scrollbar-hidden'>
            {track.tracks.items.map((item, index) => (
              <div key={index} className='grid grid-cols-[60px_1fr_60px] gap-1 mt-2 hover:bg-white/30'>
                <div onClick={() =>handleid(item)} className='h-12 w-12'> <img src={item.album.images[0].url} alt={item.name} /></div>
                <div>
                  <div className='font-medium'>
                    {item.name}
                  </div>
                  <div>{item.album.artists[0].name}</div>
                </div>
                <div> {duration(item.duration_ms)}</div>
              </div>
            ))}
          </div>
          <div className='text-center justify-self-end backdrop-opacity-50 grid grid-cols-2 rounded-3xl p-4 justify-end'>
            <div><h2 className='font-black vertical-text text-4xl pr-4 pb-4'>TOP RESULT</h2></div>
            <div>
              <img className='rounded-4xl h-50' src={track.tracks.items[0].album.images[1].url} alt="" />
              <div > <h2 className='font-semibold mt-3'>{track.tracks.items[0].name}</h2></div>
              <div>{track.tracks.items[0].album.artists[0].name}</div>
            </div>
          </div>
        </div>

        <div className='flex flex-row gap-4 overflow-x-auto pb-2  snap-mandatory mt-2 scrollbar-hidden items-center   border-b-2 shadow-2xl border-white/30  h-fit'>
          <p className='font-black vertical-text text-4xl'>TOP ARTISTS</p>
          {artist.artists.items.map((item, index) => (
            <div key={index} onClick={() =>handleid(item)} className='flex-shrink-0 snap-start min-h-fit w-52  hover:bg-white/30 hover:rounded-4xl justify-self-center'>
              <img className='rounded-full object-cover h-40 w-40 shadow-2xl justify-self-center' src={item.images[1]?.url || item.images[2]?.url} alt={item.name} />
              <div className='justify-self-center font-medium text-xl'>{item.name}</div>

            </div>
          ))}
        </div>
        <div className=' flex flex-row gap-4 overflow-x-auto pb-2  snap-mandatory  scrollbar-hidden items-start   border-b-2 shadow-2xl border-white/30 h-fit mt-28'>
          <p className='font-black vertical-text text-4xl'>TOP ALBUMS</p>
          {album.albums.items.map((item, index) => (
            <div key={index} onClick={() =>handleid(item)} className='flex-shrink-0 snap-start min-h-fit w-52  hover:bg-white/30 hover:rounded-4xl justify-self-center'>
              <img className='rounded-full object-cover h-40 w-40 shadow-2xl justify-self-center' src={item.images[1]?.url || item.images[2]?.url} alt={item.name} />
              <div className='justify-self-center font-medium text-xl'>{item.name}</div>

            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default home