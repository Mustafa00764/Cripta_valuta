import React, { useContext } from 'react'
import { AdminContext } from '../context/AdminContext'
import api from '../components/axiosRefresh.js'

const DModel = () => {
  const {setCategory,category,handleRestore,model,setModel,setDeleteModel,deleteModel} = useContext(AdminContext)

  const handleSubmite = async()=>{

    const accessToken = localStorage.getItem("accessToken");
    const refreshToken = localStorage.getItem("refreshToken");

    if (!accessToken || !refreshToken) {
      alert("Вы не авторизованы!");
      return;
    }

    try {
      const CID = category.id
      const response = await api.delete(`/categories/${CID}`,{
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        }
      })
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className={deleteModel?'w-full h-full absolute top-0 left-0 flex justify-center transition-all bg-[rgba(0,0,0,.5)] items-center z-[25] opacity-[1]':'w-full h-full absolute top-0 left-0 flex justify-center transition-all bg-[rgba(0,0,0,.5)] items-center -z-10 opacity-0'}>
      <div className='max-w-[767px] w-full flex flex-col gap-4 h-auto p-6 bg-bgMode rounded-[15px] '>
        <div className='w-full flex justify-center items-center'>
        <svg width="48" height="48" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g clipPath="url(#clip0_175_854)">
        <path d="M2.84375 1.4375C2.59511 1.4375 2.35665 1.53627 2.18084 1.71209C2.00502 1.8879 1.90625 2.12636 1.90625 2.375V3.3125C1.90625 3.56114 2.00502 3.7996 2.18084 3.97541C2.35665 4.15123 2.59511 4.25 2.84375 4.25H3.3125V12.6875C3.3125 13.1848 3.51004 13.6617 3.86167 14.0133C4.21331 14.365 4.69022 14.5625 5.1875 14.5625H10.8125C11.3098 14.5625 11.7867 14.365 12.1383 14.0133C12.49 13.6617 12.6875 13.1848 12.6875 12.6875V4.25H13.1562C13.4049 4.25 13.6433 4.15123 13.8192 3.97541C13.995 3.7996 14.0938 3.56114 14.0938 3.3125V2.375C14.0938 2.12636 13.995 1.8879 13.8192 1.71209C13.6433 1.53627 13.4049 1.4375 13.1562 1.4375H9.875C9.875 1.18886 9.77623 0.950403 9.60041 0.774587C9.4246 0.598772 9.18614 0.5 8.9375 0.5H7.0625C6.81386 0.5 6.5754 0.598772 6.39959 0.774587C6.22377 0.950403 6.125 1.18886 6.125 1.4375H2.84375ZM5.65625 5.1875C5.78057 5.1875 5.8998 5.23689 5.98771 5.32479C6.07561 5.4127 6.125 5.53193 6.125 5.65625V12.2188C6.125 12.3431 6.07561 12.4623 5.98771 12.5502C5.8998 12.6381 5.78057 12.6875 5.65625 12.6875C5.53193 12.6875 5.4127 12.6381 5.32479 12.5502C5.23689 12.4623 5.1875 12.3431 5.1875 12.2188V5.65625C5.1875 5.53193 5.23689 5.4127 5.32479 5.32479C5.4127 5.23689 5.53193 5.1875 5.65625 5.1875ZM8 5.1875C8.12432 5.1875 8.24355 5.23689 8.33146 5.32479C8.41936 5.4127 8.46875 5.53193 8.46875 5.65625V12.2188C8.46875 12.3431 8.41936 12.4623 8.33146 12.5502C8.24355 12.6381 8.12432 12.6875 8 12.6875C7.87568 12.6875 7.75645 12.6381 7.66854 12.5502C7.58064 12.4623 7.53125 12.3431 7.53125 12.2188V5.65625C7.53125 5.53193 7.58064 5.4127 7.66854 5.32479C7.75645 5.23689 7.87568 5.1875 8 5.1875ZM10.8125 5.65625V12.2188C10.8125 12.3431 10.7631 12.4623 10.6752 12.5502C10.5873 12.6381 10.4681 12.6875 10.3438 12.6875C10.2194 12.6875 10.1002 12.6381 10.0123 12.5502C9.92439 12.4623 9.875 12.3431 9.875 12.2188V5.65625C9.875 5.53193 9.92439 5.4127 10.0123 5.32479C10.1002 5.23689 10.2194 5.1875 10.3438 5.1875C10.4681 5.1875 10.5873 5.23689 10.6752 5.32479C10.7631 5.4127 10.8125 5.53193 10.8125 5.65625Z" fill="#FF003C"/>
        </g>
        <defs>
        <clipPath id="clip0_175_854">
        <rect width="15" height="15" fill="white" transform="translate(0.5 0.5)"/>
        </clipPath>
        </defs>
        </svg>
        </div>
        <p className='text-[32px] leading-[48px] font-semibold text-center'>Вы уверены, что хотите удалить эту категорию?</p>
        <div className='w-full flex justify-center gap-6 items-center'>
          <button className='mt-4 max-w-[250px] w-full h-[50px] text-[24px] rounded-[8px] bg-red-500 text-white' onClick={()=>handleSubmite()}>
            Delete
          </button>
          <button className='mt-4 max-w-[250px] w-full text-[24px] h-[50px] rounded-[8px] bg-blue-500 text-white' onClick={()=>setDeleteModel(false)}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  )
}

export default DModel