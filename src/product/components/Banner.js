import React from 'react'
import bannerVideo from '../images/The-Passion-of-Making.mp4'

function Banner(props) {
  return (
    <>
      <div class="container-fluid">
        <video
          src={bannerVideo}
          class="w-100"
          autoplay="autoplay"
          muted="true"
          preload="auto"
        ></video>
      </div>
    </>
  )
}

export default Banner