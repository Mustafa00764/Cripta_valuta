import React from "react";
import { Link } from "react-router-dom";
import arrowLeft from "../assets/svg/arrow_left_blue.svg";
import AirdropCard from "../components/AirdropCard";
import refresh from "../assets/svg/refresh.svg";

const AirdropPage = () => {
  return (
    <div>
      <div className="container">
        <div className="flex mt-9 mb-7 ">
          <button className="flex cursor-pointer items-center gap-1">
            <Link to={'/'}>
              <p className="text-[#779CFF]">Главная</p>
            </Link>
            <img src={arrowLeft} alt={arrowLeft} className='rotate-180'/>
            <p className="text-[#779CFF]">Airdrops</p>
          </button>
        </div>
        <div className='mt-[88px] text-textMode md:mt-[60px] sm:mt-[40px]'>
          <h2 className='text-[36px] font-semibold leading-[48px] md:text-[24px] md:leading-[32px]'>Airdrops</h2>
          <p className='font-normal leading-6 max-w-[833px] w-full pr-5 mt-6 text-[16px] md:text-[14px] md:leading-5 mx:text-[12px] mx:leading-4 '>Airdrops - это универсальная панель управления для освоения airdrops в мире криптовалют. Ознакомьтесь с нашими индивидуальными руководствами по выполнению ключевых действий, которые повысят ваши шансы на получение новейших airdrops. От выполнения простых заданий до проверки действий - будьте в курсе последних обновлений, действий и стратегий, чтобы максимизировать свое вознаграждение.</p>
        </div>
        <div className="mt-[56px] md:mt-[45px] sm:mt-[40px] flex flex-col gap-4">
          <AirdropCard/>
          <AirdropCard/>
          <AirdropCard/>
          <AirdropCard/>
          <AirdropCard/>
          <AirdropCard/>
          <AirdropCard/>
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
  );
};

export default AirdropPage;
