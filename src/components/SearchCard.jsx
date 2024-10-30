import React from 'react'
import img from '../assets/images/articleImage.png'
import user from '../assets/svg/User.svg'
import { Link } from 'react-router-dom'
const SearchCard = () => {
  return (
    <div className='articleCard w-full h-[320px] ml:w-[100vw] ms:py-2 ml:left-[-24px] ms:gap-2 text-textMode ml:rounded-none bg-bgMode lx:h-auto p-6 hover:text-[#779CFF] rounded-[15px] flex gap-8 mx:gap-4 hover:scale-[1.02] hover:transition-all hover:duration-[400] cursor-pointer transition-all duration-[400] hover:shadow-3xl relative'>
        <Link to={`/article/1`}>
          <div className='max-w-[368px] w-full h-full relative rounded-[10px] overflow-hidden ml:w-[30vw] ml:h-[30vw] min-w-[96px] min-h-[96px]'>
            <img className='w-full h-full object-cover ' src={img} alt="img" />
          </div>
        </Link>
        <div className='w-full flex flex-col text-textMode gap-2 relative sm:flex-col-reverse sm:justify-between'>
          <div className='flex justify-between items-center w-full text-[14px] mx:text-[10px] sm:text-[12px] mt-2 font-medium leading-6 h-10 sm:h-auto'>
            <div className='flex gap-2 items-center'>
              <div>
                <img src={user} alt="user" />
              </div>
              <p>Автор: Иван Иванов</p>
            </div>
            <div>
              <p>10 июня 2022</p>
            </div>
          </div>
          <Link to={`/article/1`}>
            <div className='max-w-[704px] relative w-full'>
              <p className='font-semibold text-[24px] md:text-[20px] md:leading-6 leading-8 mx:text-[16px] mx:leading-5 ms:text-[14px] ms:leading-4'>Биткоин-офшоры и конец майнингу: как поменяется мир криптовалют в 2022 году</p>
            </div>
          </Link>
          <Link to={`/article/1`}>
            <div className='max-w-[704px] w-full mt-2 lx:hidden '>
              <p className='font-normal text-[14px] leading-6'>Новый исторический максимум биткоина, запрет майнинга в огромном Китае, форсящие курс твиты Маска про Dogecoin — последний год был для рынка криптовалют настоящим потрясением. Отдельные цифровые монеты выросли за год в несколько раз и так же стремительно подешевели в январе 2022-го. Что ждет криптовалютный рынок дальше? Финтолк объясняет.</p>
            </div>
          </Link>
          <div className='w-full flex justify-end lx:mt-auto sm:hidden'>
            <button className='rounded-full border border-[#779CFF] px-6 h-8 font-medium text-[#779CFF] text-[14px] leading-6 hover:bg-[#779CFF] hover:text-[#fff] transition-all'>
              Bitcoin
            </button>
          </div>
        </div>
      </div>
  )
}

export default SearchCard