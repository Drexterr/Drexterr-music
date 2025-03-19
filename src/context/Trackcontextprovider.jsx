import React, { useState } from "react";
import Trackcontext from "./Trackcontext";

const Trackcontextprovider = ({children})=>{

    const [track, setTrack] = useState("")
    const [artist, setArtist] = useState("")

return (
   
<Trackcontext.Provider value = {{track, setTrack, artist, setArtist}}>


{children}
</Trackcontext.Provider>
)
}

export default Trackcontextprovider;