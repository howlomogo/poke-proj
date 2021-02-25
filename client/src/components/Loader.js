import React from 'react'
import { ReactComponent as LoadingIcon } from '../audio.svg'

function Loader() {
  return (
    <React.Fragment>
      <LoadingIcon />
      <h6 className="mt-1">Loading</h6>
    </React.Fragment>
  )
}

export default Loader

  
