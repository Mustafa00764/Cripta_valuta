import React from 'react'
import LC_logo from '../assets/images/LC_logo.png'
import Telegram from "../assets/svg/telegram_icon.svg"
import Tiktok from "../assets/svg/tiktok_icon.svg"
import VK from "../assets/svg/Vk_icon.svg"
import YouTube from "../assets/svg/youtube_mini.svg"
const Footer = () => {
  return (
    <div className='w-[100vw] h-[728px] bg-[#2F2F2F] text-[#fff] sm:h-auto sm:pb-5'>
      <div className="container">
        <div className='flex pt-[88px] gap-8 h-[63.5%] lm:grid lm:grid-cols-3 lm:pt-[30px]'>
          <div className='w-full flex flex-col gap-4'>
            <h2 className='text-[18px] font-semibold leading-6'>Bitcoin</h2>
            <div className='flex flex-col gap-2 leading-6'>
              <p>Blockchain</p>
              <p>NFT</p>
              <p>DeFi</p>
              <p>P2E</p>
              <p>Блог</p>
            </div>
          </div>
          <div className='w-full flex flex-col gap-4'>
            <h2 className='text-[18px] font-semibold leading-6'>Blockchain</h2>
            <div className='flex flex-col gap-2 leading-6'>
              <p>Блог</p>
              <p>NFT</p>
              <p>DeFi</p>
            </div>
          </div>
          <div className='w-full flex flex-col gap-4'>
            <h2 className='text-[18px] font-semibold leading-6'>NFT</h2>
            <div className='flex flex-col gap-2 leading-6'>
              <p>DeFi</p>
              <p>NFT</p>
              <p>Блог</p>
              <p>P2E</p>
            </div>
          </div>
          <div className='w-full flex flex-col gap-4'>
            <h2 className='text-[18px] font-semibold leading-6'>DeFi</h2>
            <div className='flex flex-col gap-2 leading-6'>
              <p>NFT</p>
              <p>Bitcoin</p>
              <p>P2E</p>
            </div>
          </div>
          <div className='w-full flex flex-col gap-4'>
            <h2 className='text-[18px] font-semibold leading-6'>P2E</h2>
            <div className='flex flex-col gap-2 leading-6'>
              <p>Bitcoin</p>
              <p>NFT</p>
              <p>Блог</p>
              <p>DeFi</p>
              <p>P2E</p>
            </div>
          </div>
          <div className='w-full flex flex-col gap-4'>
            <h2 className='text-[18px] font-semibold leading-6'>Блог</h2>
            <div className='flex flex-col gap-2 leading-6'>
              <p>NFT</p>
              <p>Bitcoin</p>
              <p>P2E</p>
            </div>
          </div>
        </div>
        <div className='mt-8 flex justify-between items-end w-full sm:flex-col sm:gap-5'>
          <div className='w-full'>
            <div className='flex items-center gap-3'>
              <div className='w-[40px] h-[40px] rounded-full overflow-hidden'>
                <img src={LC_logo} alt="logo" />
              </div>
              <p className='text-[#fff] text-[24px] leading-[29px]'>Legit Community</p>
            </div>
            <div className='mt-4'>
              <h2 className='font-semibold leading-6'>ООО  «Legit Community» © Все права защищены.</h2>
              <p className='text-[12px] leading-6'>2000 - 2024</p>
            </div>
            <div className='flex text-[12px] leading-6 gap-4 mt-2'>
              <span>ОГРН: 1237750228740</span>
              <span>ИНН: 056203556760</span>
            </div>
          </div>
          <div className='flex flex-col gap-4 w-full'>
            <p className='font-semibold leading-6'>Подписывайтесь на нас:</p>
            <div className='flex gap-2 items-center'>
              <div className='w-8 h-8 rounded-[10px] p-1 bg-[#000]'>
                <img src={Telegram} alt="Telegram" />
              </div>
              <div className='w-8 h-8 rounded-[10px] p-1 bg-[#000]'>
                <img src={YouTube} alt="YouTube" />
              </div>
              <div className='w-8 h-8 rounded-[10px] p-1 bg-[#000]'>
                <img src={VK} alt="VK" />
              </div>
              <div className='w-8 h-8 rounded-[10px] p-1 bg-[#000]'>
                <img src={Tiktok} alt="Tiktok" />
              </div>
            </div>
          </div>
          {/* <div>
            <p></p>
            <div>
              <img src="" alt="" />
            </div>
          </div> */}
        </div>
      </div>
    </div>
  )
}

export default Footer