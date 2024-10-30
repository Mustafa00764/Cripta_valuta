import React, { useState } from 'react'
import Top5Card from './Top5Card'

const NewsCard = () => {
  const [top5, setTop5] = useState(true)

  return (
    <div className='max-w-[548px] xm:hidden w-full h-[616px] md:h-[516px] sm:h-[416px] ms:h-[328px] rounded-[15px] pt-8 px-6 pb-14 ms:pb-0 sm:pb-6 bg-bgMode flex flex-col text-textMode'>
      <div className='w-full rounded-full bg-bgMode p-2 gap-2 flex shadow-btnTop'>
        <div className='h-[40px] w-full ms:h-[30px]'>
          <button onClick={() => setTop5(true)} className={top5 ? 'h-full ms:text-[12px] w-full text-[14px] border-[1px] border-[#7399FF]  rounded-full transition-all duration-300 text-[#7399FF]' : 'h-full w-full text-[14px] ms:text-[12px]'}>Выбор редакции</button>
        </div>
        <div className='h-[40px] w-full ms:h-[30px]'>
          <button onClick={() => setTop5(false)} className={!top5 ? 'h-full w-full text-[14px] ms:text-[12px] border-[1px] border-[#7399FF] rounded-full transition-all duration-300 text-[#7399FF]' : 'h-full w-full text-[14px] ms:text-[12px]'}>Популярное</button>
        </div>
      </div>
      {
        top5 ?
          <div className='mt-[32px] flex flex-col gap-4 overflow-x-hidden'>
            <Top5Card />
            <Top5Card />
            <Top5Card />
            <Top5Card />
            <Top5Card />
          </div>
          :
          <div className='mt-[32px] flex flex-col gap-4 overflow-x-hidden'>
            <Top5Card />
            <Top5Card />
            <Top5Card />
          </div>
      }

    </div>
  )
}

export default NewsCard