import React, { useContext, useState } from 'react'
import ArticleCard from "../components/ArticleCard";
import AirdropCard from "../components/AirdropCard";
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const ProfilePage = () => {
  const [news,setNews] = useState('Articles')
  const {user, setUser} = useContext(AuthContext)

  return ( 
    <div className='text-textMode'>
      <div className='w-full h-[226px]'>
        <img src="https://cdn-edge.kwork.ru/files/cover/header11.jpg" alt="" className='w-full h-full object-cover object-top'/>
      </div>
      <div className="container">
        <div className='border flex justify-between bg-bgMode -mt-[20px] md:px-5 w-full rounded-[15px] border-[#494E5B] pl-5 pb-5'>
          <div className='flex md:flex-col w-full'>
            <div className='flex flex-col gap-5 w-full'>
              <div className='p-[10px] w-[222.5px] h-[222.5px] mx-auto rounded-[15px] border border-[#494E5B] -mt-[20px] bg-bgMode'>
                <img src={user?user.photo_url:""} alt="" className='border border-[#494E5B] rounded-[10px]'/>
              </div>
              <div className=' text-[24px] font-semibold text-center'>
                <p>{user.username?user.username:"User"}</p>
              </div>
              <div className='hidden md:flex flex-col gap-5 text-center'>
                <div className=''>
                  <p className='text-[32px] font-semibold leading-[32px] break-words'>{user.firstName?user.firstName:"User"}</p>
                </div>
                <Link to={'/settings/profile'} className='w-full flex'>
                  <button className=' w-full text-[#fff] bg-[#2F2F2F] flex items-center justify-center gap-3 h-[60px] rounded-[8px] text-[20px]' >
                    <svg enableBackground="new 0 0 24 24" height="28" viewBox="0 0 24 24" width="28" xmlns="http://www.w3.org/2000/svg">
                    <path d="m0 0h24v24h-24z" fill="none"/>
                    <path d="m19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.07-.94l2.03-1.58c.18-.14.23-.41.12-.61l-1.92-3.32c-.12-.22-.37-.29-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54c-.04-.24-.24-.41-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22l-1.91 3.32c-.12.21-.08.47.12.61l2.03 1.58c-.05.3-.09.63-.09.94s.02.64.07.94l-2.03 1.58c-.18.14-.23.41-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61zm-7.14 2.66c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z" fill='#ffffff'/>
                    </svg>
                    Edit Profile
                  </button>
                </Link>
                <div className='flex text-[14px] flex-col gap-3'>
                  <div className='flex items-center gap-2'>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 4a8 8 0 1 0 0 16 8 8 0 0 0 0-16zM2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12zm10-6a1 1 0 0 1 1 1v4.586l2.707 2.707a1 1 0 0 1-1.414 1.414l-3-3A1 1 0 0 1 11 12V7a1 1 0 0 1 1-1z" className='fill-textMode'/>
                    </svg>
                    <p className='flex-nowrap flex'>На сайте с 19 августа 2024</p>
                  </div>
                  <div className='flex items-center gap-2 '>
                    <span className='w-3 h-3 rounded-full bg-gradient-to-r from-[#2b9b1f] to-[#00db0a] m-[6px]'></span>
                    <p>{user.status?user.status:""}</p>
                  </div>
                </div>
              </div>
              <div className='flex text-[14px] flex-col gap-3 md:hidden' >
                <div className='flex items-center gap-2'>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 4a8 8 0 1 0 0 16 8 8 0 0 0 0-16zM2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12zm10-6a1 1 0 0 1 1 1v4.586l2.707 2.707a1 1 0 0 1-1.414 1.414l-3-3A1 1 0 0 1 11 12V7a1 1 0 0 1 1-1z" className='fill-textMode'/>
                  </svg>
                  <p className='flex-nowrap flex'>На сайте с 19 августа 2024</p>
                </div>
                <div className='flex items-center gap-2 '>
                  <span className='w-3 h-3 rounded-full bg-gradient-to-r from-[#2b9b1f] to-[#00db0a] m-[6px]'></span>
                  <p>{user.status?user.status:""}</p>
                </div>
              </div>
            </div>
            <div className='py-5 w-auto pr-5 pl-[30px] md:pl-0 flex flex-col gap-[10px]'>
              <div className='md:hidden'>
                <p className='text-[32px] font-semibold leading-[32px] break-words'>Максим</p>
              </div>
              <div>
                <p>Я фронтенд разработчик с 3-х летним опытом знаю React.js, JavaScript, HTML, CSS, SCSS, SASS, Tailwind css, TypeScript и многое другое. Также я умею работать с API и Git и могу создать вам рабочий сайт который вам точно понравится.</p>
              </div>
            </div>
          </div>
          <div className='p-5 w-[55%] min-w-[200px] md:hidden'>
            <Link to={'/settings/profile'}>
            <button className=' w-full text-[#fff] bg-[#2F2F2F] flex items-center justify-center gap-3 h-[60px] rounded-[8px] text-[20px]' >
              <svg enableBackground="new 0 0 24 24" height="28" viewBox="0 0 24 24" width="28" xmlns="http://www.w3.org/2000/svg">
              <path d="m0 0h24v24h-24z" fill="none"/>
              <path d="m19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.07-.94l2.03-1.58c.18-.14.23-.41.12-.61l-1.92-3.32c-.12-.22-.37-.29-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54c-.04-.24-.24-.41-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22l-1.91 3.32c-.12.21-.08.47.12.61l2.03 1.58c-.05.3-.09.63-.09.94s.02.64.07.94l-2.03 1.58c-.18.14-.23.41-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61zm-7.14 2.66c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z" fill='#ffffff'/>
              </svg>
              Edit Profile
            </button>
            </Link>
          </div>
        </div>
        <div>
          <div className='flex ml:-ml-6 mt-5 w-full ml:w-[100vw]'>
            <div className={`w-full h-[60px] flex justify-center items-center transition-all rounded-t-[15px] ${news === 'Articles'?"bg-elementMode":""}`} onClick={()=>setNews("Articles")}>
              <p className='text-[22px]'>Articles</p>
            </div>
            <div className={`w-full h-[60px] flex ${news === 'Airdrops'?"bg-elementMode":""} transition-all rounded-t-[15px] justify-center items-center`} onClick={()=>setNews("Airdrops")}>
              <p className='text-[22px]'>Airdrops</p>
            </div>
          </div>
          <div className={`bg-elementMode min-h-[516px] ml:w-[100vw] ml:-ml-6 mb-[88px] md:mb-[60px] sm:mb-[40px] p-4 rounded-b-[15px] ${news === 'Articles'?"rounded-tr-[15px]":'rounded-tl-[15px]'} transition-all`}>
            {
              news === 'Articles'?<div className='grid grid-cols-3 w-full gap-4 xm:grid-cols-2 lm:grid-cols-1'>
                <ArticleCard/>
                <ArticleCard/>
                <ArticleCard/>
              </div>:<div className='w-full ml:ml-2 flex flex-col gap-4'>
                <AirdropCard/>
                <AirdropCard/>
              </div>
            }
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProfilePage