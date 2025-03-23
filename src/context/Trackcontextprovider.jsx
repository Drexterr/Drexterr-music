import React, { useState } from "react";
import Trackcontext from "./Trackcontext";

const Trackcontextprovider = ({children})=>{

    const [token, setToken] = useState(null)
    const [severalalbums, setSeveralalbums] = useState("")
    const [userdata, setUserdata] = useState("")
    const [newrelease, setNewrelease] = useState("")
    const [track, setTrack] = useState("")
    const [artist, setArtist] = useState("")
    const [album, setAlbum] = useState("")
    const [severaltrack, setSeveraltrack] = useState("")
    const [id, setId] = useState("")


return (
   
<Trackcontext.Provider value = {{track, setTrack, artist, setArtist, severaltrack, setSeveraltrack, album, setAlbum, token, setToken, newrelease, setNewrelease, userdata, setUserdata, severalalbums, setSeveralalbums, id, setId}}>


{children}
</Trackcontext.Provider>
)
}

export default Trackcontextprovider;