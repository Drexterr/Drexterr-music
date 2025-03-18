import React, { useState } from "react";
import Trackcontext from "./Trackcontext";

const Trackcontextprovider = ({children})=>{

    const [track, setTrack] = useState("")

return (
   
<Trackcontext.Provider value = {{track, setTrack}}>


{children}
</Trackcontext.Provider>
)
}

export default Trackcontextprovider;