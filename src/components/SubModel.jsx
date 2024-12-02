import React, { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'

const SubModel = () => {
  const {isSubscribed, setIsSubscribed} = useContext(AuthContext)
  return (
    <div className={!isSubscribed?'w-full h-full absolute top-0 left-0 flex justify-center transition-all bg-[rgba(0,0,0,.5)] items-center z-[25] opacity-[1]':'w-full h-full absolute top-0 left-0 flex justify-center transition-all bg-[rgba(0,0,0,.5)] items-center -z-10 opacity-0'}>
      <div className='max-w-[767px] w-full flex flex-col gap-4 h-auto p-6 bg-bgMode rounded-[15px] '>
        <p className='text-[32px] leading-[48px] font-semibold text-center'>Для продолжения, пожалуйста, подпишитесь на наш Telegram-канал.</p>
        <p className=' text-center'>Подписка обязательна для получения доступа к следующему шагу.</p>

        <div className='w-full flex justify-center gap-6 items-center'>
          <a href="https://t.me/mycryptochannel111" target="_blank" rel="noopener noreferrer" className='w-full'>
            <button className='mt-4  w-full h-[50px] text-[24px] rounded-[8px] bg-blue-500 text-white'>
              Subscribed
            </button>
          </a>
        </div>
      </div>
    </div>
  )
}

export default SubModel