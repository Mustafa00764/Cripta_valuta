import React, { useContext } from 'react'
import img from '../assets/images/articleImage.png'
import { Link } from 'react-router-dom'
import { AdminContext } from '../context/AdminContext';
const ArticleCard = ({item,author}) => {
  return (
      <div className='articleCard  max-w-[432px] xl:max-w-[100%] h-[499px] xl:h-auto w-full bg-bgMode rounded-[15px] text-textMode hover:scale-[1.02] hover:text-[#779CFF] hover:transition-all hover:duration-[400] cursor-pointer transition-all duration-[400] hover:shadow-3xl relative'>
        <div className='flex items-center justify-between p-4 text-[14px] md:text-[12px] text-textMode'>
          <div className='flex gap-2 items-center'>
            <img className='w-[20px] h-[20px] rounded-[50%] overflow-hidden object-cover' src={author.photo_url} alt={""} />
            <p>Автор: {author.name}</p>
          </div>
          <p>{item.createdAt}</p>
        </div>
        <div className='w-full h-[243px] lg:h-auto relative  overflow-hidden'>
        <Link to={`/article/${item.id}`}>
          <div className='w-full h-full flex justify-center items-center relative'>
            <img className='w-full h-full object-cover ' src={item.poster} alt={img} />
            <div className="articleBlur ">
            </div>
            <p className='articleText break-all mx-4 font-normal absolute z-[-1] ms:text-[12px] ms:leading-4 text-textMode line-clamp-4 h-[92px] overflow-hidden text-ellipsis'>{item.subtitle}</p>
          </div>
        </Link>
        <Link to={"/bitcoin"}>
          <button className=' bottom-4 right-4 absolute h-8 hidden md:block rounded-full bg-[#F4F7FF] py-1 px-4 gap-2 text-[#779CFF] text-[14px] leading-4 font-semibold'>{item.categories[0]}</button>
        </Link>
        </div>
        <div className='w-full flex flex-col justify-between'>
        <Link to={`/article/${item.id}`}>
          <div className='px-4 max-w-full w-full relative pt-6 pb-4'>
            <p className='font-semibold w-full  text-[24px] leading-[32px] xl:text-[22px] xl:h-[84px] lg:h-[72px] md:h-[48px]  xl:leading-7 lg:text-[20px] lg:leading-6 md:text-[16px] md:leading-4 lm:text-[20px] lm:h-[72px] lm:leading-6 line-clamp-3 text-left h-[96px] overflow-hidden text-ellipsis'>{item.title}</p>
          </div>
        </Link>
        <div className='p-4 flex justify-end  md:p-2 items-center'>
          <Link to={"/bitcoin"}>
            <button className=' h-8 rounded-full border-[1px] md:hidden border-[#779CFF] py-1 px-6 gap-2 text-[#779CFF] text-[14px] leading-6 font-medium hover:bg-[#779CFF] hover:text-[#fff] transition-all'>{item.categories[0]}</button>
          </Link>
        </div>
        </div>
      </div>
  )
}

export default ArticleCard