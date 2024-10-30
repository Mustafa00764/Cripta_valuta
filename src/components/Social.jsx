import React from 'react'
import Telegram from "../assets/svg/telegram_icon.svg"
import Tiktok from "../assets/svg/tiktok_icon.svg"
import VK from "../assets/svg/Vk_icon.svg"
import YouTube from "../assets/svg/youtube-icon.svg"
const Social = () => {
  return (
    <div className='hidden lg:flex flex-col gap-2 fixed z-10 ml-2 top-[50vh]'>
      <a href="#" className='w-[32px] h-[32px] rounded-[10px] p-[4px] gap-2 shadow-tg bg-[#3390EC]'>
        <img src={Telegram} alt={Telegram} />
      </a>
      <a href="#" className='w-[32px] h-[32px] rounded-[10px] p-[4px] gap-2 shadow-vk bg-[#0077FF]'>
        <img src={VK} alt={VK} />
      </a>
      <a href="#" className='w-[32px] h-[32px] rounded-[10px] p-[4px] gap-2 shadow-yt bg-[#FF0000]'>
        <img src={YouTube} alt={YouTube} />
      </a>
      {/* <marquee behavior="" direction="">Hello world</marquee> */}
      <a href="#" className='w-[32px] h-[32px] rounded-[10px] p-[4px] gap-2 shadow-tt bg-[#000]'>
        <img src={Tiktok} alt={Tiktok} />
      </a>
    </div>
  )
}

export default Social