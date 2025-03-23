import React, {useState, useEffect, useContext} from 'react'
import Logo from '/Users/Bharat/OneDrive/Desktop/Project/Drexterr Music/Drexterr music/src/img/logo.png'
import Trackcontext from '../context/Trackcontext';


const Navbar = () => {
  
  const [searchQuery, setSearchQuery] = useState('');

  const clientId = import.meta.env.VITE_CLIENT_ID;
  const redirectUrl = 'http://localhost:5173/Callback'; 
  const authUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&redirect_uri=${encodeURIComponent(redirectUrl)}&scope=user-read-private`;
  
  
  const {setTrack, setArtist, setAlbum, token, setToken, setUserdata, userdata} = useContext(Trackcontext)
  

  const handleclick =  ()=>{
    console.log('Auth URL:', authUrl);
    window.location = authUrl;
  
  }

  
  useEffect(() => {
    const hash = window.location.hash;
    if (hash){
      const token = hash
      .substring(1)
      .split('&')
      .find(elem => elem.startsWith('access_token'))
      .split('=')[1];
      window.location.hash = ''; 
      setToken(token);
      console.log('Access Token:', token);

      const duser = async () => {

        const user = await fetch (`https://api.spotify.com/v1/me`,
          {
         headers: {
           Authorization: `Bearer ${token}`,
         },
       }
      
       );
       const datauser = await user.json();
       
       setUserdata(datauser);
       return ;
      }
      duser();
    }
  }, [])

  

  const searchSpotify = async (query) => {
    if (!token) {
      console.error('No token available');
      return;
    }
    try {
      
      const albumresponse = await fetch (`https://api.spotify.com/v1/search?q=${encodeURIComponent(query)}&type=album&limit=10`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const trackresponse = await fetch( `https://api.spotify.com/v1/search?q=${encodeURIComponent(query)}&type=artist&limit=10`,
    {
       headers: {
        Authorization: `Bearer ${token}`,
      },
}) ;
      const response = await fetch(
        `https://api.spotify.com/v1/search?q=${encodeURIComponent(query)}&type=track&limit=10`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!response.ok ) {
        const errorText = await (response.text() || trackresponse.text || albumresponse.text); 
        console.error('Response Status:', response.status || trackresponse.status || albumresponse.status);
        console.error('Raw Error Response:', errorText);
        throw new Error(`HTTP ${response.status}: ${errorText}`);
      }
      const data = await response.json() ;
      const Artistdata = await trackresponse.json() ;
      const Albumdata = await albumresponse.json() ;
      
      setTrack(data);
      setArtist(Artistdata);
      setAlbum(Albumdata);
      return Artistdata, data, Albumdata;
    }
    catch (error) {
      console.error('Error fetching data:', error.message);
    }
  };
      


  const handleSearch = (e) => {
    e.preventDefault();
    if (token && searchQuery) {
      searchSpotify(searchQuery, token);
    }
  };
  
/* console.log(userdata); */
  return (
    <div className="px-4 py-2 flex justify-between items-center">
<div className='flex items-center gap-3 text-2xl text-white/80 font-bold'>
      <div className="h-12 w-12 border-2 border-white/80 rounded-full ">
        <img className="p-1 "  src={Logo} alt="Drexterr Music Logo" />
        
      </div>DREXTERr Music
      </div>
     
      <div>
       
          <form onSubmit={handleSearch} className="flex gap-2">
            <input
              className="border-2 border-white/80 text-white px-6 py-2 rounded-2xl focus:outline-none"
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for a song..."
            />
            <button
              type="submit"
              className="px-4 py-2 bg-white/30 text-white rounded-2xl hover:bg-black/30"
            >
              Search
            </button>
          </form>
          
      </div>
      <button type='submit' className='px-4 py-2 bg-white/30 text-white rounded-2xl hover:bg-black/30' onClick={handleclick} >Login</button>
    </div>
  );
};

export default Navbar;