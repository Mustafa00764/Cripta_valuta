import React from 'react'
import eye from '../assets/svg/Eye.svg'
const Top5Card = () => {
  return (
    <div className='flex flex-col gap-2 pb-4 border-b-[.8px] border-[#E9EEFE] last:border-b-0 '>
      <div className='w-full leading-6 font-normal ms:text-[14px] ms:leading-4'>
        <p>
          Конец стейблкоинам? Почему обвалились криптовалюта Terra и токен LUNA
        </p>
      </div>
      <div className='flex items-center text-textMode text-[12px] leading-4 gap-3'>
        <div className='flex items-center  gap-1'>
          <img src={eye} alt="eye"/>
          <p>56565</p>
        </div>
        <div className="dot"></div>
        <div>
          <p>10 июня 2022</p>
        </div>
      </div>
    </div>
  )
}

export default Top5Card