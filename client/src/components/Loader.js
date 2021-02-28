import React from 'react'
import { ReactComponent as LoadingIcon } from '../assets/audio.svg'

function Loader() {
  return (
    <div className="flex items-center content-center" style={{ 'height': '50vh'}}>
      <div className="flex flex-col mx-auto">
      <LoadingIcon className="text-blue-400" />
      <h6 className="mt-1">Loading</h6>
      </div>
    </div>
  )
}

export default Loader
