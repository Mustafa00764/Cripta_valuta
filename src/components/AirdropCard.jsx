import React from 'react'
import { Link } from 'react-router-dom'
import img from '../assets/images/articleImage.png'
import user from '../assets/svg/User.svg'
import arrow from '../assets/svg/ArrowRightShort.svg'
const AirdropCard = () => {
  return (
  <div className='w-full h-[240px] ml:w-[100vw] ms:py-2 ml:left-[-24px] ms:gap-2 ml:rounded-none bg-bgMode text-textMode lx:h-auto p-5 rounded-[15px] flex gap-8 mx:gap-4 hover:scale-[1.02] hover:transition-all hover:duration-[400] cursor-pointer transition-all duration-[400] hover:shadow-3xl relative'>
    <Link to={`/airdrop/1`}>
      <div className='min-w-[320px] w-full h-full  lx:min-w-[100px] ms:w-[120px] ms:max-h-[140px]'>
        <img className=' w-full h-full object-cover rounded-[10px]' src={img} alt="img" />
      </div>
    </Link>
    <div className='w-full flex flex-col text-textMode gap-2 relative sm:flex-col-reverse sm:justify-between'>
      <div className='flex justify-between items-center w-full text-[14px] mx:text-[8px] sm:text-[10px] mt-2 font-medium leading-6 h-10 sm:h-auto'>
        <div className='flex gap-2 items-center'>
          <div>
            <img src={user} alt="user" />
          </div>
          <p>Автор: Иван Иванов</p>
        </div>
        <div>
          <p>До: 15 июня 2022</p>
        </div>
      </div>
      <Link to={`/airdrop/1`}>
        <div className='max-w-[704px] w-full'>
          <p className='font-semibold text-[24px] md:text-[20px] md:leading-6 leading-8 mx:text-[16px] mx:leading-5 ms:text-[14px] ms:leading-4 line-clamp-2 h-[64px] md:h-[48px] mx:h-[40px] ms:max-h-[32px] overflow-hidden text-ellipsis'>Биткоин-офшоры и конец майнингу: как поменяется мир криптовалют в 2022 году</p>
        </div>
      </Link>
      <Link to={`/airdrop/1`}>
        <div className='max-w-[704px] w-full flex items-center gap-3 mt-2 text-[16px] mx:text-[12px] sm:text-[14px]'>
          <div className='flex'>
          <img className='w-[25px] sm:w-[20px] sm:h-[20px] h-[25px] rounded-[50%] overflow-hidden object-cover' src={img} alt={img} />
          <img className='w-[25px] sm:w-[20px] sm:h-[20px] ml-[-8px] h-[25px] rounded-[50%] overflow-hidden object-cover' src={img} alt={img} />
          <img className='w-[25px] sm:w-[20px] sm:h-[20px] ml-[-8px] h-[25px] rounded-[50%] overflow-hidden object-cover' src={img} alt={img} />
          </div>
          <p className=''>113</p>
        </div>
      </Link>
      <div className='w-full flex justify-end lx:mt-auto sm:hidden'>
        <Link to={`/airdrop/1`} className='flex max-w-[236px] w-full'>
          <button className='max-w-[236px] w-full text-[#fff] bg-[#7399FF] h-[50px] rounded-[8px] flex justify-center items-center gap-2'>
            Принять участие 
            <img src={arrow} alt="arrow" />
          </button>
        </Link>
      </div>
    </div>
  </div>
  )
}

export default AirdropCard