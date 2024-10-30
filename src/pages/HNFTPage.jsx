import React, { useEffect } from 'react'
import arrowLeft from "../assets/svg/arrow_left_blue.svg";
import CryptoChart from '../components/CryptoChart';
import AdvertisimentCard from '../components/AdvertisimentCard';
import PagesCard from '../components/PagesCard';
import refresh from "../assets/svg/refresh.svg";
import { useNavigate } from "react-router-dom";
import frame from '../assets/images/frame.jpeg'
const HNFTPage = () => {
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
          <div className='w-[91.5%] ml:w-full ms:ml-7 flex bg-elementMode rounded-[15px] ml:pl-[52px] relative gap-[52px] md:pl-4 md:pr-4 md:pb-6 pt-[52px] ml:pt-[15vw] sm:pt-[10vw] ms:pt-[7vw] pb-[88px] pr-[52px] ml:flex-col'>
            <div className='max-h-[316px] h-auto ml-[-9.15%] ml:ml-0 ml:top-[-32px] ml:absolute top-0 left-0'>
              <img src={frame} alt="frame" className='shadow-3xl max-w-[316px] max-h-[316px] min-h-[104px] min-w-[104px]  rounded-[15px] h-[23.3vw] w-[23.3vw] object-cover '/>
            </div>
            <div className='w-full flex flex-col ml:items-center'>
              <h2 className='text-[36px] font-semibold leading-[48px] md:text-[24px] md:leading-[32px]'>NFT</h2>
              <p className='font-normal leading-6 max-w-[833px] w-full pr-5 mt-6  text-[16px] md:text-[14px] md:leading-5 mx:text-[12px] mx:leading-4 '>NFT – это невзаимозаменяемый токен (non-fungible token). Невзаимозаменяемость означает уникальность и невозможность замены одного объекта на другой. В отличие от NFT, физические деньги и криптовалюты взаимозаменяемы — одно можно обменять на другое. Каждый NFT содержит цифровую подпись, которая делает токен уникальным. NFT являются цифровыми активами и могут существовать в виде фотографий, видео и аудиофайлов, а также в любом другом цифровом формате. Вот некоторые примеры NFT: произведения искусства, комиксы, предметы коллекционирования на тему спорта, коллекционные карточки, игры и многое другое. 
<br />
<br />
Невзаимозаменяемые токены NFT − это криптографические активы на блокчейне (это распределенный публичный реестр для записи транзакций). Каждый NFT содержит уникальный идентификационный код, который отличает один токен от другого. Эти данные позволяют проверять право собственности на токен и передавать его другому владельцу.
<br />
<br />
Рынок NFT считается волатильным, с большими колебаниями цен, что делает его рисковым даже для опытных инвесторов. Если вы задумываетесь о покупке NFT, важно хорошо понимать, что представляет собой этот процесс. Рассмотрим основные этапы.
<br />
<br />
Криптокошелек используется для хранения ключей доступа к вашим цифровым активам. Пользователю выдается уникальная фраза для получения и восстановления доступа к кошельку. Крайне важно обеспечить надежное хранение этой фразы, так как без нее вы утратите доступ к своему кошельку.
<br />
<br />
Подключив и пополнив свой криптокошелек, вы можете начать покупать NFT. При покупке NFT вы приобретаете право собственности на этот токен. Однако держатель NFT не имеет других прав на произведение искусства, в том числе прав на его модификацию или воспроизведение, если передача прав не была напрямую согласована между покупателем и автором произведения. В зависимости от маркетплейса, на приобретенный вами NFT могут налагаться различные ограничения.</p>
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

export default HNFTPage