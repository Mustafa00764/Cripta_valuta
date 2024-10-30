import React, { useEffect } from 'react'
import arrowLeft from "../assets/svg/arrow_left_blue.svg";
import { useNavigate } from "react-router-dom";
import SearchCard from '../components/SearchCard';
import refresh from "../assets/svg/refresh.svg";
const SearchPage = () => {
  const navigate = useNavigate()
  
  const goBack = ()=> {
    navigate(-1)
  }

  useEffect(()=>{
    window.scrollTo(0,0)
  },[])

  return (
    <div className=''>
      <div className="container">
        <div className="flex mt-8 mb-8 sm:mt-6 sm:mb-6 mx:mt-4 mx:mb-4">
          <button onClick={()=>goBack()} className="flex cursor-pointer items-center gap-1">
            <img src={arrowLeft} alt={arrowLeft} />
            <p className="text-[#779CFF]">Назад</p>
          </button>
        </div>
        <div className='w-full flex flex-col text-textMode items-center gap-2'>
          <h2 className='text-[36px] leading-[48px] font-semibold sm:text-[30px] sm:leading-[40px] mx:text-[24px] mx:leading-8'>Биткоин</h2>
          <p className='leading-6 font-normal mx:text-[14px] ms:text-[12px]'>Найдено <span className='font-medium'>32,000</span> результатов по запросу <span className='font-medium'>Биткоин</span></p>
        </div>
        <div className='mt-[56px] w-full flex flex-col sm:mt-[40px] mx:mt-[32px] gap-[16px]'>
          <SearchCard/>
          <SearchCard/>
          <SearchCard/>
          <SearchCard/>
          <SearchCard/>
          <SearchCard/>
          <SearchCard/>
          <SearchCard/>
          <SearchCard/>
          <SearchCard/>
          <SearchCard/>
        </div>
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
  )
}

export default SearchPage