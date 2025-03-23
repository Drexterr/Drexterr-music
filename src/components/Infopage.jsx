import React, { useContext } from 'react'
import Trackcontext from '../context/Trackcontext'

const Infopage = () => {

  const{id} = useContext(Trackcontext)

  return (
    <div>
      hello
    </div>
  )
}

export default Infopage
