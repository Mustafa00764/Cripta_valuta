import React, { useContext, useEffect, useState } from 'react'
import CModel from './CModel';
import { AdminContext } from '../context/AdminContext';

const CCard = ({name, icon, description, num, v}) => {
  const order = ["cover", "headings"];
  const [cover, setCover] = useState("")
  const {setCategory,category,setModel,model,deleteModel,setDeleteModel} = useContext(AdminContext)
  useEffect(()=>{
    console.log(cover);
  },[])

  const modele = () => {
    setModel(!model)
    setCategory(v)
  }

  const deleteModele = () => {
    setDeleteModel(!deleteModel)
    setCategory(v)
  }
  return (
    <div className='flex text-center options text-[#72787F] cursor-default last:rounded-b-[12px] even:bg-[#EAEAEA] odd:bg-[#fff] h-[50px] items-center'>
    <div className='w-[100px]'>
      <p>{num}</p>
    </div>
    <div className='w-[150px] items-center gap-4 flex justify-center h-full'>
      <div className='w-[32px] h-[32px] rounded-full overflow-hidden bg-[rgba(136,145,157,.2)]'>
        <img className='border-0 w-full h-full object-center object-cover' src={icon} alt="" />
      </div>
    </div>
    <div className='w-[300px]'>
      <p>{name}</p>
    </div>
    <div className=' flex-auto h-[24px] relative overflow-hidden'>
      <p className=' max-w-[450px] whitespace-nowrap text-left overflow-hidden text-ellipsis h-[24px]'>{description}</p>
    </div>
    <div className='flex w-[200px] justify-center items-center gap-4 '>
      <div className='options_edit transition-all cursor-pointer' onClick={()=>modele()}>
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M11.8868 0.636889C11.9304 0.593236 11.9821 0.558602 12.039 0.534971C12.096 0.51134 12.157 0.499176 12.2187 0.499176C12.2803 0.499176 12.3414 0.51134 12.3983 0.534971C12.4553 0.558602 12.507 0.593236 12.5506 0.636889L15.3631 3.44939C15.4067 3.49293 15.4413 3.54466 15.465 3.60161C15.4886 3.65856 15.5008 3.71961 15.5008 3.78126C15.5008 3.84292 15.4886 3.90397 15.465 3.96092C15.4413 4.01787 15.4067 4.0696 15.3631 4.11314L5.98806 13.4881C5.94308 13.5328 5.8895 13.5679 5.83056 13.5913L1.14307 15.4663C1.05788 15.5004 0.964561 15.5087 0.874677 15.4903C0.784793 15.4718 0.702297 15.4274 0.637416 15.3625C0.572535 15.2977 0.528122 15.2152 0.509684 15.1253C0.491246 15.0354 0.499593 14.9421 0.53369 14.8569L2.40869 10.1694C2.43206 10.1105 2.46714 10.0569 2.51182 10.0119L11.8868 0.636889ZM11.0065 2.84376L13.1562 4.99345L14.3684 3.78126L12.2187 1.63158L11.0065 2.84376ZM12.4934 5.65626L10.3437 3.50658L4.24994 9.60032V9.87501H4.71869C4.84301 9.87501 4.96224 9.9244 5.05015 10.0123C5.13805 10.1002 5.18744 10.2194 5.18744 10.3438V10.8125H5.65619C5.78051 10.8125 5.89974 10.8619 5.98765 10.9498C6.07555 11.0377 6.12494 11.1569 6.12494 11.2813V11.75H6.39963L12.4934 5.65626ZM3.34244 10.5078L3.24307 10.6072L1.81057 14.1894L5.39275 12.7569L5.49213 12.6575C5.40271 12.6241 5.32562 12.5642 5.27117 12.4858C5.21672 12.4074 5.18751 12.3142 5.18744 12.2188V11.75H4.71869C4.59437 11.75 4.47514 11.7006 4.38723 11.6127C4.29933 11.5248 4.24994 11.4056 4.24994 11.2813V10.8125H3.78119C3.68573 10.8124 3.59257 10.7832 3.51417 10.7288C3.43576 10.6743 3.37585 10.5972 3.34244 10.5078Z" fill="#494E5B"/>
        </svg>
      </div>
      <div className='options_delete transition-all cursor-pointer' onClick={()=>deleteModele()}>
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
    </div>

  </div>
  )
}

export default CCard