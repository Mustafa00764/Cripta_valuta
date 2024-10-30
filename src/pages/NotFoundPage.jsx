import React from 'react'
import bgImage from '../assets/images/404bg.jpeg'
const NotFoundPage = () => {
  return (
    <div className='flex justify-center items-center'>
      <img src={bgImage} alt="" className='w-[100vw] h-auto object-contain object-top'/>
    </div>
  )
}

export default NotFoundPage