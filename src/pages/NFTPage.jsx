import React, { useEffect } from 'react'
import arrowLeft from "../assets/svg/arrow_left_blue.svg";
import CryptoChart from '../components/CryptoChart';
import AdvertisimentCard from '../components/AdvertisimentCard';
import PagesCard from '../components/PagesCard';
import refresh from "../assets/svg/refresh.svg";
import { Link } from 'react-router-dom';
const NFTPage = () => {
  useEffect(()=>{
    window.scrollTo(0,0)
  },[])
  return (
    <div>
    <div className="container">
      <div className="flex mt-9 mb-7 ">
        <button className="flex cursor-pointer items-center gap-1">
          <Link to={'/'}>
            <p className="text-[#779CFF]">Главная</p>
          </Link>
          <img src={arrowLeft} alt={arrowLeft} className='rotate-180'/>
          <p className="text-[#779CFF]">NFT</p>
        </button>
      </div>
      <div className='mt-[88px] text-textMode md:mt-[60px] sm:mt-[40px]'>
        <h2 className='text-[36px] font-semibold leading-[48px] md:text-[24px] md:leading-[32px]'>NTF</h2>
        <p className='font-normal leading-6 max-w-[833px] w-full pr-5 mt-6  text-[16px] md:text-[14px] md:leading-5 mx:text-[12px] mx:leading-4'>NFT – это невзаимозаменяемый токен (non-fungible token). Невзаимозаменяемость означает уникальность и невозможность замены одного объекта на другой. В отличие от NFT, физические деньги и криптовалюты взаимозаменяемы — одно можно обменять на другое. Каждый NFT содержит цифровую подпись, которая делает токен уникальным. NFT являются цифровыми активами и могут существовать в виде фотографий, видео и аудиофайлов, а также в любом другом цифровом формате. Вот некоторые примеры NFT: произведения искусства, комиксы, предметы коллекционирования на тему спорта, коллекционные карточки, игры и многое другое. </p>
      </div>
      <div className='flex gap-8 mt-[56px] lg:flex-col xm:gap-4 md:mt-[45px] sm:mt-[40px]'>
        <div className='w-[74.41%] h-auto flex flex-col gap-4 lg:w-full md:grid md:grid-cols-2 sm:grid-cols-1'>
          <PagesCard/>
          <PagesCard/>
          <PagesCard/>
          <PagesCard/>
          <PagesCard/>
          <PagesCard/>
          <PagesCard/>
          <PagesCard/>
          <PagesCard/>
          <PagesCard/>
          <PagesCard/>
          <PagesCard/>
        </div>
        <div className='w-[calc(25.59%-32px)] xm:w-[calc(25.59%-16px)] lg:w-full flex flex-col gap-8'>
          <CryptoChart/>
          <div className='lg:hidden'>
            <AdvertisimentCard/>
          </div>
        </div>
      </div>
      <div>
        <div className="w-full flex justify-center mt-[56px] mb-[88px] md:mb-[60px] sm:mb-[40px] md:mt-[45px] sm:mt-[40px]">
          <div className="flex gap-2 items-center cursor-pointer">
            <img src={refresh} alt={refresh} />
            <p className="font-semibold leading-6 text-[#779CFF]">
              Загрузить ещё
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
  )
}

export default NFTPage