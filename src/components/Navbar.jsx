import React, {useState, useEffect, useContext} from 'react'
import Logo from '/Users/Bharat/OneDrive/Desktop/Project/Drexterr Music/Drexterr music/src/img/logo.png'
import Trackcontext from '../context/Trackcontext';


const Navbar = () => {
  const [token, setToken] = useState(null)
  const [searchQuery, setSearchQuery] = useState('');

  const clientId = "1f38542e158f4fd3badf5309236a992e"; 
  const redirectUrl = 'http://localhost:5173/callback'; 
  const authUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&redirect_uri=${encodeURIComponent(redirectUrl)}&scope=user-read-private`;
  
  
  const {setTrack} = useContext(Trackcontext)
  

  const handleclick = ()=>{
    console.log('Auth URL:', authUrl);
    window.location = authUrl;}


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
    }
  }, [])
  const searchSpotify = async (query) => {
    if (!token) {
      console.error('No token available');
      return;
    }
    try {
      const response = await fetch(
        `https://api.spotify.com/v1/search?q=${encodeURIComponent(query)}&type=track`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!response.ok) {
        const errorText = await response.text(); 
        console.error('Response Status:', response.status);
        console.error('Raw Error Response:', errorText);
        throw new Error(`HTTP ${response.status}: ${errorText}`);
      }
      const data = await response.json();
      
      setTrack(data);
      return data;
    } catch (error) {
      console.error('Error fetching data:', error.message);
    }
  };
      

  const handleSearch = (e) => {
    e.preventDefault();
    if (token && searchQuery) {
      searchSpotify(searchQuery, token);
    }
  };
  return (
    <div className="px-4 py-2 flex justify-between items-center">
<div className='flex items-center gap-3 text-2xl text-white font-bold'>
      <div className="h-12 w-12 border-2 border-white rounded-full ">
        <img className="p-1 "  src={Logo} alt="Drexterr Music Logo" />
        
      </div>DREXTERr Music
      </div>
     
      <div>
       
          <form onSubmit={handleSearch} className="flex gap-2">
            <input
              className="border-2 border-cyan-200 px-6 py-2 rounded-2xl focus:outline-none"
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for a song..."
            />
            <button
              type="submit"
              className="px-4 py-2 bg-cyan-600 text-white rounded-2xl hover:bg-cyan-700"
            >
              Search
            </button>
          </form>
          
      </div>
      <button type='submit' className='px-4 py-2 bg-cyan-600 text-white rounded-2xl hover:bg-cyan-700' onClick={handleclick}>Login</button>
    </div>
  );
};

export default Navbar;