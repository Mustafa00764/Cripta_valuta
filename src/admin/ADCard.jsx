import React, { useContext, useEffect, useState } from 'react'
import eye from '../assets/svg/eyes.svg'
import star from '../assets/svg/Star.svg'
import api from '../components/axiosRefresh';
import { AdminContext } from '../context/AdminContext';
import { Link } from 'react-router-dom';
const ADCard = ({item,index}) => {
  const order = ["cover", "headings"];
  const [cover, setCover] = useState()
  const [headings, setHeadings] = useState()
  const { blockUser, setBlockUser, blockUserId, setBlockUserId, handleUsersList } = useContext(AdminContext)


  const handleUnlock = async () => {

    const accessToken = localStorage.getItem("accessToken");
    const refreshToken = localStorage.getItem("refreshToken");
    try {
      const user = {
        role: "USER"
      }
      const responseUser = await api.put(`/users/${item.id}`, user,{
        headers: {
          Authorization: `Bearer ${accessToken}`,
        }
      })
      console.log(responseUser.data);
      handleUsersList()
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(()=>{
    console.log(cover);
  },[])


  const photoUrl = () => {
    if (!item) {
      return;
    }
    if (item.photo_url.startsWith("https://legitcommunity.uz")) {
      return <img src={item ? item.photo_url : ""} alt="" className=' border-0' crossOrigin="anonymous" />
    } else {
      return <img src={item ? item.photo_url : ""} alt="" className=' border-0' />
    }
  }

  return (
    <div className='flex text-center options text-[#72787F] cursor-default last:rounded-b-[12px] even:bg-[#EAEAEA] odd:bg-[#fff] h-[50px] items-center'>
    <div className='w-[100px]'>
      <p>{index} / {item.id}</p>
    </div>
    <div className='w-[150px] items-center gap-4 flex justify-start h-full'>
      <div className='w-[32px] h-[32px] rounded-full overflow-hidden bg-[rgba(136,145,157,.2)]'>
        {photoUrl()}
      </div>
      <p>{item.firstName}</p>
    </div>
    <div className='w-[300px]'>
      <p>{item.username}</p>
    </div>
    <div className='w-[300px]'>
      <p>{item.status}</p>
    </div>
    <div className='w-[150px] flex justify-center h-[24px]  relative overflow-hidden'>
      <p className=' whitespace-nowrap text-left overflow-hidden text-ellipsis h-[24px]'>{item.role.toLowerCase()}</p>
    </div>
    <div className='flex w-[200px] justify-center items-center gap-4 cursor-pointer'>
    <Link to={`/profile/${item ? item.id : ""}`}>
      <div className='options_search transition-all'>
        <svg width="16" height="16" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g clipPath="url(#clip0_179_730)">
        <path d="M14.6775 12.93C15.8879 11.2784 16.43 9.23062 16.1954 7.19644C15.9608 5.16226 14.9668 3.29168 13.4122 1.95892C11.8576 0.626155 9.85719 -0.070492 7.81105 0.00834944C5.7649 0.0871909 3.82398 0.935706 2.37659 2.38414C0.92919 3.83257 0.0820639 5.7741 0.00468665 7.8203C-0.0726906 9.86649 0.625387 11.8665 1.95926 13.4201C3.29313 14.9737 5.16443 15.9663 7.19877 16.1995C9.23312 16.4326 11.2805 15.8891 12.9313 14.6775H12.93C12.9667 14.7275 13.0075 14.7754 13.0525 14.8213L17.865 19.6338C18.0994 19.8683 18.4173 20.0001 18.7489 20.0003C19.0805 20.0004 19.3986 19.8688 19.6331 19.6344C19.8677 19.4 19.9995 19.082 19.9996 18.7504C19.9997 18.4189 19.8681 18.1008 19.6338 17.8663L14.8213 13.0538C14.7766 13.0085 14.7285 12.968 14.6775 12.93ZM15 8.125C15 9.02784 14.8222 9.92184 14.4767 10.756C14.1312 11.5901 13.6248 12.348 12.9864 12.9864C12.348 13.6248 11.5901 14.1312 10.7559 14.4767C9.92184 14.8222 9.02784 15 8.125 15C7.22216 15 6.32817 14.8222 5.49405 14.4767C4.65994 14.1312 3.90204 13.6248 3.26364 12.9864C2.62524 12.348 2.11883 11.5901 1.77333 10.756C1.42783 9.92184 1.25 9.02784 1.25 8.125C1.25 6.30164 1.97433 4.55296 3.26364 3.26364C4.55295 1.97433 6.30164 1.25 8.125 1.25C9.94836 1.25 11.697 1.97433 12.9864 3.26364C14.2757 4.55296 15 6.30164 15 8.125Z" fill="#72787F"/>
        </g>
        <defs>
        <clipPath id="clip0_179_730">
        <rect width="20" height="20" fill="white"/>
        </clipPath>
        </defs>
        </svg>
      </div>
    </Link>
      {
        item.role == "OWNER"?"": <div className='options_delete transition-all cursor-pointer' onClick={()=>handleUnlock()}>
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g clipPath="url(#clip0_175_854)">
        <path d="M2.84375 1.4375C2.59511 1.4375 2.35665 1.53627 2.18084 1.71209C2.00502 1.8879 1.90625 2.12636 1.90625 2.375V3.3125C1.90625 3.56114 2.00502 3.7996 2.18084 3.97541C2.35665 4.15123 2.59511 4.25 2.84375 4.25H3.3125V12.6875C3.3125 13.1848 3.51004 13.6617 3.86167 14.0133C4.21331 14.365 4.69022 14.5625 5.1875 14.5625H10.8125C11.3098 14.5625 11.7867 14.365 12.1383 14.0133C12.49 13.6617 12.6875 13.1848 12.6875 12.6875V4.25H13.1562C13.4049 4.25 13.6433 4.15123 13.8192 3.97541C13.995 3.7996 14.0938 3.56114 14.0938 3.3125V2.375C14.0938 2.12636 13.995 1.8879 13.8192 1.71209C13.6433 1.53627 13.4049 1.4375 13.1562 1.4375H9.875C9.875 1.18886 9.77623 0.950403 9.60041 0.774587C9.4246 0.598772 9.18614 0.5 8.9375 0.5H7.0625C6.81386 0.5 6.5754 0.598772 6.39959 0.774587C6.22377 0.950403 6.125 1.18886 6.125 1.4375H2.84375ZM5.65625 5.1875C5.78057 5.1875 5.8998 5.23689 5.98771 5.32479C6.07561 5.4127 6.125 5.53193 6.125 5.65625V12.2188C6.125 12.3431 6.07561 12.4623 5.98771 12.5502C5.8998 12.6381 5.78057 12.6875 5.65625 12.6875C5.53193 12.6875 5.4127 12.6381 5.32479 12.5502C5.23689 12.4623 5.1875 12.3431 5.1875 12.2188V5.65625C5.1875 5.53193 5.23689 5.4127 5.32479 5.32479C5.4127 5.23689 5.53193 5.1875 5.65625 5.1875ZM8 5.1875C8.12432 5.1875 8.24355 5.23689 8.33146 5.32479C8.41936 5.4127 8.46875 5.53193 8.46875 5.65625V12.2188C8.46875 12.3431 8.41936 12.4623 8.33146 12.5502C8.24355 12.6381 8.12432 12.6875 8 12.6875C7.87568 12.6875 7.75645 12.6381 7.66854 12.5502C7.58064 12.4623 7.53125 12.3431 7.53125 12.2188V5.65625C7.53125 5.53193 7.58064 5.4127 7.66854 5.32479C7.75645 5.23689 7.87568 5.1875 8 5.1875ZM10.8125 5.65625V12.2188C10.8125 12.3431 10.7631 12.4623 10.6752 12.5502C10.5873 12.6381 10.4681 12.6875 10.3438 12.6875C10.2194 12.6875 10.1002 12.6381 10.0123 12.5502C9.92439 12.4623 9.875 12.3431 9.875 12.2188V5.65625C9.875 5.53193 9.92439 5.4127 10.0123 5.32479C10.1002 5.23689 10.2194 5.1875 10.3438 5.1875C10.4681 5.1875 10.5873 5.23689 10.6752 5.32479C10.7631 5.4127 10.8125 5.53193 10.8125 5.65625Z" fill="#494E5B"/>
        </g>
        <defs>
        <clipPath id="clip0_175_854">
        <rect width="15" height="15" fill="white" transform="translate(0.5 0.5)"/>
        </clipPath>
        </defs>
        </svg>
      </div>
      }

    </div>
  </div>
  )
}

export default ADCard