import React, { useEffect } from 'react'
import arrowLeft from "../assets/svg/arrow_left_blue.svg";
import CryptoChart from '../components/CryptoChart';
import AdvertisimentCard from '../components/AdvertisimentCard';
import PagesCard from '../components/PagesCard';
import refresh from "../assets/svg/refresh.svg";
import { useNavigate } from "react-router-dom";
import frame from '../assets/images/frame.jpeg'
const HBitcoinPage = () => {
  const navigate = useNavigate()
  
  const goBack = ()=> {
    navigate(-1)
  }

  useEffect(()=>{
    window.scrollTo(0,0)
  },[])

  return (
   <div>
      <div className="container">
      <div className="flex mt-8 mb-8 sm:mt-6 sm:mb-6 mx:mt-4 mx:mb-4">
          <button onClick={()=>goBack()} className="flex cursor-pointer items-center gap-1">
            <img src={arrowLeft} alt={arrowLeft} />
            <p className="text-[#779CFF]">Назад</p>
          </button>
        </div>
        <div className=' text-textMode w-full flex justify-end'>
          <div className='w-[91.5%] ms:ml-7 ml:w-full mt-8 sm:mt-6 mx:mt-4 flex bg-elementMode rounded-[15px] ml:pl-[52px] relative gap-[52px] md:pl-4 md:pr-4 md:pb-6 pt-[52px] ml:pt-[15vw] sm:pt-[10vw] ms:pt-[7vw] pb-[88px] pr-[52px] ml:flex-col'>
            <div className='max-h-[316px] h-auto ml-[-9.15%] ml:ml-0 ml:top-[-32px] ml:absolute top-0 left-0'>
              <img src={frame} alt="frame" className='shadow-3xl max-w-[316px] max-h-[316px] min-h-[104px] min-w-[104px]  rounded-[15px] h-[23.3vw] w-[23.3vw] object-cover '/>
            </div>
            <div className='w-full flex flex-col ml:items-center'>
              <h2 className='text-[36px] font-semibold leading-[48px] md:text-[24px] md:leading-[32px]'>Биткоин</h2>
              <p className='font-normal leading-6 max-w-[833px] w-full pr-5 mt-6  text-[16px] md:text-[14px] md:leading-5 mx:text-[12px] mx:leading-4 '>Для того, чтобы понять, что такое биткоин, надо сначала разобраться в том, что такое криптовалюты — для этого у нас есть ультимативный гид.
<br />
<br />
Если кратко, то криптовалюта — это цифровая валюта, которая децентрализована. Это значит, что у нее нет единой платежной системы или органа, который бы регулировал ее оборот.
<br />
<br />
Биткоин (BTC) — первая и самая популярная криптовалюта в мире. По состоянию на начало апреля 2022 года, стоимость одного биткоина — около $44 тыс., а капитализация этой криптовалюты – чуть больше $850 трлн.
<br />
<br />
Несмотря на популярность биткоина, его все еще окружает множество мифов и заблуждений — это верно и для криптовалютного рынка в целом.
<br />
<br />
Поэтому мы подготовили дайджест, в котором объясняем, что такое биткоин простыми словами, а также делимся полезными ссылками на наши лонгриды о BTC.</p>
            </div>
          </div>
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

export default HBitcoinPage