import React from 'react'
import { Link } from 'react-router-dom'
import img from '../assets/images/articleImage.png'

const PagesCard = () => {
  return (
    <div className=' xl:max-w-[100%] md:p-0 gap-8 p-6 min-h-[320px] md:gap-0 lg:min-h-[auto] xl:h-auto md:flex-col w-full bg-bgMode rounded-[15px] text-textMode hover:scale-[1.02] hover:transition-all hover:duration-[400] hover:text-[#779CFF] cursor-pointer transition-all duration-[400] hover:shadow-3xl flex relative'>
      <div className='max-w-[368px] md:max-w-full w-full'>
        <div className='hidden md:flex items-center justify-between p-4 text-[14px] md:text-[12px] text-textMode'>
        <div className='flex gap-2 items-center'>
          <img className='w-[20px] h-[20px] rounded-[50%] overflow-hidden object-cover' src={img} alt={img} />
          <p>Автор: Иван Иванов</p>
        </div>
        <p>10 июня 2022</p>
        </div>
        <Link to={`/article/1`}>
          <div className='w-full h-full relative lm:h-auto overflow-hidden'>
            <div className=' w-full h-full '>
              <img className='w-full h-full object-cover rounded-[10px] md:rounded-none' src={img} alt={img} />
            </div>
            <Link to={"/bitcoin"}>
              <button className=' bottom-4 right-4 absolute h-8 hidden xl:block rounded-full bg-[#F4F7FF] py-1 px-4 gap-2 text-[#779CFF] text-[14px] leading-4 font-semibold'>Bitcoin</button>
            </Link>
          </div>
        </Link>
      </div>
      <div className='flex flex-col w-full'>
      <div className='flex items-center justify-between md:hidden py-4 text-[14px] md:text-[12px] text-textMode'>
        <div className='flex gap-2 items-center'>
          <img className='w-[20px] h-[20px] rounded-[50%] overflow-hidden object-cover' src={img} alt={img} />
          <p>Автор: Иван Иванов</p>
        </div>
        <p>10 июня 2022</p>
      </div>
      <Link to={`/article/1`}>
      <div className='mt-[8px] md:mt-12 lm:mt-auto relative '>
        <p className='font-semibold text-[24px] leading-[32px] md:p-6 xl:text-[22px] xl:leading-7 lg:text-[20px] lg:leading-6 md:text-[20px] md:leading-6 lm:text-[16px] lm:p-4 lm:leading-4 sm:text-[20px] sm:leading-6 '>Биткоин-офшоры и конец майнингу: как поменяется мир криптовалют в 2022 году</p>
      </div>
      </Link>
      <Link to={`/article/1`}>
      <div className='mt-4'>
        <p className='text-[14px] leading-6 text-textMode font-normal md:hidden xs:leading-5 '>Новый исторический максимум биткоина, запрет майнинга в огромном Китае, форсящие курс твиты Маска про Dogecoin — последний год был для рынка криптовалют настоящим потрясением. Отдельные цифровые монеты выросли...</p>
      </div>
      </Link>
      <div className='pt-8 flex justify-end xl:p-0 items-center'>
        <button className=' h-8 rounded-full border-[1px] xl:hidden border-[#779CFF] py-1 px-6 gap-2 text-[#779CFF] text-[14px] leading-6 font-medium hover:bg-[#779CFF] hover:text-[#fff] transition-all'>Bitcoin</button>
      </div>
      </div>
    </div>
  )
}

export default PagesCard