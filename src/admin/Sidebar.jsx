import React, { useContext, useEffect, useState } from 'react'
import LC_logo from '../assets/images/LC_logo.jpeg'
import moon from '../assets/svg/moon.svg'
import sun from '../assets/svg/black-sun-with-rays.svg'
import { AdminContext } from '../context/AdminContext'
import { Link, NavLink } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'

const Sidebar = () => {
  const {theme, setTheme, toggleTheme} = useContext(AdminContext)
  const {user} = useContext(AuthContext)


  useEffect(()=>{

  },[user])
  return (
    <div className={`max-w-[60px] hover:max-w-[320px] overflow-hidden w-full h-screen flex flex-col justify-between ${theme?'bg-sideBarLight':'bg-sideBarDark'} transition-all ${theme?'text-sideBarTextDark':'text-sideBarTextLight'} relative py-2`}>
      <div className='w-[320px] h-auto flex flex-col font-light absolute'>
        <div className='w-full h-[56px] flex px-[10px] justify-between items-center cursor-pointer '>
          <div className={`w-full h-full flex gap-[15px] items-center ${theme?'text-sideBarTextDark':'text-white'} font-normal transition-all`}>
          <div className='w-[40px] h-[40px] rounded-full overflow-hidden'>
            <img src={LC_logo} alt="logo" className='w-full h-full'/>
          </div>
          <p>AdminPanel</p>
          </div>
          <div>
            <div onClick={ toggleTheme} className={theme?'w-[50px] p-[3px] transition-all rounded-full bg-[#F4F7FF] flex justify-start shadow-inner':'w-[50px] transition-all flex justify-end  p-[3px] rounded-full bg-[#F4F7FF] shadow-inner'}>
              <div className={theme?'w-5 h-5 rounded-full transition-all bg-[#fff] shadow-sm relative p-[2px] flex justify-center items-center':'w-5 h-5 transition-all rounded-full bg-[#0C1013] shadow-sm relative p-[2px] flex justify-center items-center'}>
                <img src={theme?moon:sun} alt="moon" className=' transition-all select-none'/>
              </div>
            </div>
          </div>
        </div>
        <div className={`w-full h-[56px] flex px-[14px] gap-[15px] items-center cursor-pointer transition-all`}>
          <div className='w-[32px] h-[32px] rounded-full bg-[#494E5B]'>
            <img src={user?user.photo_url:""} alt="" className=' rounded-full'/>
          </div>
          <p>{user?user.firstName:""}</p>
        </div>
        <NavLink to={"/admin/dashboard"} className={(navData)=>(navData.isActive?` ${theme?'navlinkElementDark':'navlinkElementLight'} font-medium`:" ")}>
        <div className={`w-full ${theme?'sideBarElementDark':'sideBarElementLight'} transition-all h-[56px] flex px-[20px] gap-[20px] items-center cursor-pointer`}>
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1.25 3.125C1.25 2.62772 1.44754 2.15081 1.79917 1.79917C2.15081 1.44754 2.62772 1.25 3.125 1.25H6.875C7.37228 1.25 7.84919 1.44754 8.20083 1.79917C8.55246 2.15081 8.75 2.62772 8.75 3.125V6.875C8.75 7.37228 8.55246 7.84919 8.20083 8.20083C7.84919 8.55246 7.37228 8.75 6.875 8.75H3.125C2.62772 8.75 2.15081 8.55246 1.79917 8.20083C1.44754 7.84919 1.25 7.37228 1.25 6.875V3.125ZM11.25 3.125C11.25 2.62772 11.4475 2.15081 11.7992 1.79917C12.1508 1.44754 12.6277 1.25 13.125 1.25H16.875C17.3723 1.25 17.8492 1.44754 18.2008 1.79917C18.5525 2.15081 18.75 2.62772 18.75 3.125V6.875C18.75 7.37228 18.5525 7.84919 18.2008 8.20083C17.8492 8.55246 17.3723 8.75 16.875 8.75H13.125C12.6277 8.75 12.1508 8.55246 11.7992 8.20083C11.4475 7.84919 11.25 7.37228 11.25 6.875V3.125ZM1.25 13.125C1.25 12.6277 1.44754 12.1508 1.79917 11.7992C2.15081 11.4475 2.62772 11.25 3.125 11.25H6.875C7.37228 11.25 7.84919 11.4475 8.20083 11.7992C8.55246 12.1508 8.75 12.6277 8.75 13.125V16.875C8.75 17.3723 8.55246 17.8492 8.20083 18.2008C7.84919 18.5525 7.37228 18.75 6.875 18.75H3.125C2.62772 18.75 2.15081 18.5525 1.79917 18.2008C1.44754 17.8492 1.25 17.3723 1.25 16.875V13.125ZM11.25 13.125C11.25 12.6277 11.4475 12.1508 11.7992 11.7992C12.1508 11.4475 12.6277 11.25 13.125 11.25H16.875C17.3723 11.25 17.8492 11.4475 18.2008 11.7992C18.5525 12.1508 18.75 12.6277 18.75 13.125V16.875C18.75 17.3723 18.5525 17.8492 18.2008 18.2008C17.8492 18.5525 17.3723 18.75 16.875 18.75H13.125C12.6277 18.75 12.1508 18.5525 11.7992 18.2008C11.4475 17.8492 11.25 17.3723 11.25 16.875V13.125Z" fill="#494E5B"/>
          </svg>
          <p>Dashboard</p>
        </div>
        </NavLink>
        <NavLink to={"/admin/add"} className={(navData)=>(navData.isActive?` ${theme?'navlinkElementDark':'navlinkElementLight'} font-medium`:" ")}>
        <div className={`w-full ${theme?'sideBarElementDark':'sideBarElementLight'} transition-all h-[56px] flex px-[20px] gap-[20px] items-center cursor-pointer`}>
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g clipPath="url(#clip0_178_668)">
          <path d="M17.5 1.25C17.8315 1.25 18.1495 1.3817 18.3839 1.61612C18.6183 1.85054 18.75 2.16848 18.75 2.5V17.5C18.75 17.8315 18.6183 18.1495 18.3839 18.3839C18.1495 18.6183 17.8315 18.75 17.5 18.75H2.5C2.16848 18.75 1.85054 18.6183 1.61612 18.3839C1.3817 18.1495 1.25 17.8315 1.25 17.5V2.5C1.25 2.16848 1.3817 1.85054 1.61612 1.61612C1.85054 1.3817 2.16848 1.25 2.5 1.25H17.5ZM2.5 0C1.83696 0 1.20107 0.263392 0.732233 0.732233C0.263392 1.20107 0 1.83696 0 2.5L0 17.5C0 18.163 0.263392 18.7989 0.732233 19.2678C1.20107 19.7366 1.83696 20 2.5 20H17.5C18.163 20 18.7989 19.7366 19.2678 19.2678C19.7366 18.7989 20 18.163 20 17.5V2.5C20 1.83696 19.7366 1.20107 19.2678 0.732233C18.7989 0.263392 18.163 0 17.5 0L2.5 0Z" fill="#494E5B"/>
          <path d="M10 5C10.1658 5 10.3247 5.06585 10.4419 5.18306C10.5592 5.30027 10.625 5.45924 10.625 5.625V9.375H14.375C14.5408 9.375 14.6997 9.44085 14.8169 9.55806C14.9342 9.67527 15 9.83424 15 10C15 10.1658 14.9342 10.3247 14.8169 10.4419C14.6997 10.5592 14.5408 10.625 14.375 10.625H10.625V14.375C10.625 14.5408 10.5592 14.6997 10.4419 14.8169C10.3247 14.9342 10.1658 15 10 15C9.83424 15 9.67527 14.9342 9.55806 14.8169C9.44085 14.6997 9.375 14.5408 9.375 14.375V10.625H5.625C5.45924 10.625 5.30027 10.5592 5.18306 10.4419C5.06585 10.3247 5 10.1658 5 10C5 9.83424 5.06585 9.67527 5.18306 9.55806C5.30027 9.44085 5.45924 9.375 5.625 9.375H9.375V5.625C9.375 5.45924 9.44085 5.30027 9.55806 5.18306C9.67527 5.06585 9.83424 5 10 5Z" fill="#494E5B"/>
          </g>
          <defs>
          <clipPath id="clip0_178_668">
          <rect width="20" height="20" fill="white"/>
          </clipPath>
          </defs>
          </svg>
          <p>Add</p>
        </div>
        </NavLink >
        <NavLink to={"/admin/admins"} className={(navData)=>(navData.isActive?` ${theme?'navlinkElementDark':'navlinkElementLight'} font-medium`:" ")}>
        <div className={`${theme?'sideBarElementDark':'sideBarElementLight'} transition-all w-full h-[56px] flex px-[20px] gap-[20px] items-center cursor-pointer`}>
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g clipPath="url(#clip0_172_1613)">          
          <path d="M1.875 1.25C1.70924 1.25 1.55027 1.31585 1.43306 1.43306C1.31585 1.55027 1.25 1.70924 1.25 1.875V5.625C1.25 5.79076 1.18415 5.94973 1.06694 6.06694C0.949732 6.18415 0.79076 6.25 0.625 6.25C0.45924 6.25 0.300269 6.18415 0.183058 6.06694C0.065848 5.94973 0 5.79076 0 5.625V1.875C0 1.37772 0.197544 0.900805 0.549175 0.549175C0.900805 0.197544 1.37772 0 1.875 0L5.625 0C5.79076 0 5.94973 0.065848 6.06694 0.183058C6.18415 0.300269 6.25 0.45924 6.25 0.625C6.25 0.79076 6.18415 0.949732 6.06694 1.06694C5.94973 1.18415 5.79076 1.25 5.625 1.25H1.875ZM13.75 0.625C13.75 0.45924 13.8158 0.300269 13.9331 0.183058C14.0503 0.065848 14.2092 0 14.375 0L18.125 0C18.6223 0 19.0992 0.197544 19.4508 0.549175C19.8025 0.900805 20 1.37772 20 1.875V5.625C20 5.79076 19.9342 5.94973 19.8169 6.06694C19.6997 6.18415 19.5408 6.25 19.375 6.25C19.2092 6.25 19.0503 6.18415 18.9331 6.06694C18.8158 5.94973 18.75 5.79076 18.75 5.625V1.875C18.75 1.70924 18.6842 1.55027 18.5669 1.43306C18.4497 1.31585 18.2908 1.25 18.125 1.25H14.375C14.2092 1.25 14.0503 1.18415 13.9331 1.06694C13.8158 0.949732 13.75 0.79076 13.75 0.625ZM0.625 13.75C0.79076 13.75 0.949732 13.8158 1.06694 13.9331C1.18415 14.0503 1.25 14.2092 1.25 14.375V18.125C1.25 18.2908 1.31585 18.4497 1.43306 18.5669C1.55027 18.6842 1.70924 18.75 1.875 18.75H5.625C5.79076 18.75 5.94973 18.8158 6.06694 18.9331C6.18415 19.0503 6.25 19.2092 6.25 19.375C6.25 19.5408 6.18415 19.6997 6.06694 19.8169C5.94973 19.9342 5.79076 20 5.625 20H1.875C1.37772 20 0.900805 19.8025 0.549175 19.4508C0.197544 19.0992 0 18.6223 0 18.125L0 14.375C0 14.2092 0.065848 14.0503 0.183058 13.9331C0.300269 13.8158 0.45924 13.75 0.625 13.75ZM19.375 13.75C19.5408 13.75 19.6997 13.8158 19.8169 13.9331C19.9342 14.0503 20 14.2092 20 14.375V18.125C20 18.6223 19.8025 19.0992 19.4508 19.4508C19.0992 19.8025 18.6223 20 18.125 20H14.375C14.2092 20 14.0503 19.9342 13.9331 19.8169C13.8158 19.6997 13.75 19.5408 13.75 19.375C13.75 19.2092 13.8158 19.0503 13.9331 18.9331C14.0503 18.8158 14.2092 18.75 14.375 18.75H18.125C18.2908 18.75 18.4497 18.6842 18.5669 18.5669C18.6842 18.4497 18.75 18.2908 18.75 18.125V14.375C18.75 14.2092 18.8158 14.0503 18.9331 13.9331C19.0503 13.8158 19.2092 13.75 19.375 13.75Z" fill="#494E5B"/>
          <path d="M3.75 17.5C3.75 17.5 2.5 17.5 2.5 16.25C2.5 15 3.75 11.25 10 11.25C16.25 11.25 17.5 15 17.5 16.25C17.5 17.5 16.25 17.5 16.25 17.5H3.75ZM13.75 6.25C13.75 7.24456 13.3549 8.19839 12.6517 8.90165C11.9484 9.60491 10.9946 10 10 10C9.00544 10 8.05161 9.60491 7.34835 8.90165C6.64509 8.19839 6.25 7.24456 6.25 6.25C6.25 5.25544 6.64509 4.30161 7.34835 3.59835C8.05161 2.89509 9.00544 2.5 10 2.5C10.9946 2.5 11.9484 2.89509 12.6517 3.59835C13.3549 4.30161 13.75 5.25544 13.75 6.25Z" fill="#494E5B"/>
          </g>
          <defs>
          <clipPath id="clip0_172_1613">
          <rect width="20" height="20" fill="white"/>
          </clipPath>
          </defs>
          </svg>
          <p>Admins</p>
        </div>
        </NavLink>
        <NavLink to={"/admin/statistic"} className={(navData)=>(navData.isActive?` ${theme?'navlinkElementDark':'navlinkElementLight'} font-medium`:" ")}>
        <div className={`w-full ${theme?'sideBarElementDark':'sideBarElementLight'} transition-all h-[56px] flex px-[20px] gap-[20px] items-center cursor-pointer`}>
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M5 13.75H2.5V17.5H5V13.75ZM11.25 8.75H8.75V17.5H11.25V8.75ZM17.5 2.5V17.5H15V2.5H17.5ZM15 1.25C14.6685 1.25 14.3505 1.3817 14.1161 1.61612C13.8817 1.85054 13.75 2.16848 13.75 2.5V17.5C13.75 17.8315 13.8817 18.1495 14.1161 18.3839C14.3505 18.6183 14.6685 18.75 15 18.75H17.5C17.8315 18.75 18.1495 18.6183 18.3839 18.3839C18.6183 18.1495 18.75 17.8315 18.75 17.5V2.5C18.75 2.16848 18.6183 1.85054 18.3839 1.61612C18.1495 1.3817 17.8315 1.25 17.5 1.25H15ZM7.5 8.75C7.5 8.41848 7.6317 8.10054 7.86612 7.86612C8.10054 7.6317 8.41848 7.5 8.75 7.5H11.25C11.5815 7.5 11.8995 7.6317 12.1339 7.86612C12.3683 8.10054 12.5 8.41848 12.5 8.75V17.5C12.5 17.8315 12.3683 18.1495 12.1339 18.3839C11.8995 18.6183 11.5815 18.75 11.25 18.75H8.75C8.41848 18.75 8.10054 18.6183 7.86612 18.3839C7.6317 18.1495 7.5 17.8315 7.5 17.5V8.75ZM1.25 13.75C1.25 13.4185 1.3817 13.1005 1.61612 12.8661C1.85054 12.6317 2.16848 12.5 2.5 12.5H5C5.33152 12.5 5.64946 12.6317 5.88388 12.8661C6.1183 13.1005 6.25 13.4185 6.25 13.75V17.5C6.25 17.8315 6.1183 18.1495 5.88388 18.3839C5.64946 18.6183 5.33152 18.75 5 18.75H2.5C2.16848 18.75 1.85054 18.6183 1.61612 18.3839C1.3817 18.1495 1.25 17.8315 1.25 17.5V13.75Z" fill="#494E5B"/>
          </svg>
          <p>Statistic</p>
        </div>
        </NavLink>
        <NavLink to={"/admin/users"} className={(navData)=>(navData.isActive?` ${theme?'navlinkElementDark':'navlinkElementLight'} font-medium`:" ")}>
        <div className={`w-full h-[56px] flex px-[15px] gap-[20px] items-center cursor-pointer ${theme?'sideBarElementDark':'sideBarElementLight'} transition-all`}>
          <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M8.52941 22.5883C8.52941 22.5883 7.23529 22.5883 7.23529 21.2941C7.23529 20 8.52941 16.1177 15 16.1177C21.4706 16.1177 22.7647 20 22.7647 21.2941C22.7647 22.5883 21.4706 22.5883 21.4706 22.5883H8.52941ZM18.8824 10.9412C18.8824 11.9709 18.4733 12.9583 17.7452 13.6864C17.0172 14.4145 16.0297 14.8235 15 14.8235C13.9703 14.8235 12.9828 14.4145 12.2548 13.6864C11.5267 12.9583 11.1176 11.9709 11.1176 10.9412C11.1176 9.91153 11.5267 8.92404 12.2548 8.19595C12.9828 7.46787 13.9703 7.05884 15 7.05884C16.0297 7.05884 17.0172 7.46787 17.7452 8.19595C18.4733 8.92404 18.8824 9.91153 18.8824 10.9412Z" fill="#494E5B"/>
          <path d="M0.970588 20.2588C0.970588 20.2588 0 20.2588 0 19.2883C0 18.3177 0.970588 15.4059 5.82353 15.4059C10.6765 15.4059 11.6471 18.3177 11.6471 19.2883C11.6471 20.2588 10.6765 20.2588 10.6765 20.2588H0.970588ZM8.73529 11.5236C8.73529 12.2958 8.42852 13.0364 7.88246 13.5825C7.3364 14.1285 6.59578 14.4353 5.82353 14.4353C5.05128 14.4353 4.31066 14.1285 3.7646 13.5825C3.21854 13.0364 2.91176 12.2958 2.91176 11.5236C2.91176 10.7513 3.21854 10.0107 3.7646 9.46462C4.31066 8.91856 5.05128 8.61179 5.82353 8.61179C6.59578 8.61179 7.3364 8.91856 7.88246 9.46462C8.42852 10.0107 8.73529 10.7513 8.73529 11.5236Z" fill="#494E5B"/>
          <path d="M19.3235 20.2588C19.3235 20.2588 18.3529 20.2588 18.3529 19.2883C18.3529 18.3177 19.3235 15.4059 24.1764 15.4059C29.0294 15.4059 30 18.3177 30 19.2883C30 20.2588 29.0294 20.2588 29.0294 20.2588H19.3235ZM27.0882 11.5236C27.0882 12.2958 26.7814 13.0364 26.2354 13.5825C25.6893 14.1285 24.9487 14.4353 24.1764 14.4353C23.4042 14.4353 22.6636 14.1285 22.1175 13.5825C21.5714 13.0364 21.2647 12.2958 21.2647 11.5236C21.2647 10.7513 21.5714 10.0107 22.1175 9.46462C22.6636 8.91856 23.4042 8.61179 24.1764 8.61179C24.9487 8.61179 25.6893 8.91856 26.2354 9.46462C26.7814 10.0107 27.0882 10.7513 27.0882 11.5236Z" fill="#494E5B"/>
          </svg>
          <p>Users</p>
        </div>
        </NavLink>
        {/* <NavLink to={"/admin/authors"} className={(navData)=>(navData.isActive?` ${theme?'navlinkElementDark':'navlinkElementLight'} font-medium`:" ")}>
        <div className={`w-full h-[56px] flex px-[18px] gap-[20px] items-center cursor-pointer ${theme?'sideBarElementDark':'sideBarElementLight'} transition-all`}>
          <svg width="24" height="19" viewBox="0 0 640 512" xmlns="http://www.w3.org/2000/svg">
            <path d="m224 256c70.7 0 128-57.3 128-128s-57.3-128-128-128-128 57.3-128 128 57.3 128 128 128zm89.6 32h-16.7c-22.2 10.2-46.9 16-72.9 16s-50.6-5.8-72.9-16h-16.7c-74.2 0-134.4 60.2-134.4 134.4v41.6c0 26.5 21.5 48 48 48h274.9c-2.4-6.8-3.4-14-2.6-21.3l6.8-60.9 1.2-11.1 7.9-7.9 77.3-77.3c-24.5-27.7-60-45.5-99.9-45.5zm45.3 145.3-6.8 61c-1.1 10.2 7.5 18.8 17.6 17.6l60.9-6.8 137.9-137.9-71.7-71.7zm274.1-164.4-37.9-37.9c-9.3-9.3-24.5-9.3-33.8 0l-37.8 37.8-4.1 4.1 71.8 71.7 41.8-41.8c9.3-9.4 9.3-24.5 0-33.9z" fill='#494E5B'/>
          </svg>
          <p>Authors</p>
        </div>
        </NavLink> */}
        <NavLink to={"/admin/airdrop/1"} className={(navData)=>(navData.isActive?` ${theme?'navlinkElementDarkAir':'navlinkElementLightAir'} font-medium`:" ")}>
        <div className={`w-full h-[56px] flex px-[18px] gap-[20px] items-center cursor-pointer ${theme?'sideBarElementDarkAir':'sideBarElementLightAir'} transition-all`}>
          <svg fill="none" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
          <g stroke="#494E5B" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5">
          <path d="m12.5495 12.9201c-1.64.39-3.07-1.04-2.68-2.68.19-.77002.82-1.39999 1.59-1.58999 1.35-.33 2.57.59998 2.73 1.84999" />
          <path d="m7.64093 3.1499c-2.65 1.51-4.42999 4.36996-4.42999 7.64 0 2.54 1.08 4.8299 2.81 6.4299"/>
          <path d="m18.01 17.19c1.71-1.6 2.78-3.87 2.78-6.4 0-4.86002-3.94-8.79-8.79-8.79"/>
          <path d="m7.99977 14.55c-.92-.98-1.49-2.3-1.49-3.76 0-3.02996 2.46-5.48995 5.49003-5.48995 3.03 0 5.49 2.45999 5.49 5.48995 0 1.46-.57 2.77-1.49 3.76"/>
          <path d="m10.3007 16.66-1.43999 1.7901c-1.14 1.43-.13 3.5399 1.69999 3.5399h2.87c1.83 0 2.85-2.1199 1.7-3.5399l-1.44-1.7901c-.86-1.09-2.52-1.09-3.39 0z"/>
          </g>
          </svg>
          <p>AirDrops</p>
        </div>
        </NavLink>
        <div  className={`w-full ${theme?'sideBarElementDark':'sideBarElementLight'} transition-all h-[56px] flex px-[20px] gap-[20px] items-center cursor-pointer`}>
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 16 16">
          <path fillRule="evenodd" fill='#494E5B' d="M4.75 1.5a1.25 1.25 0 100 2.5h2.309c-.233-.818-.542-1.401-.878-1.793-.43-.502-.915-.707-1.431-.707zM2 2.75c0 .45.108.875.3 1.25h-.55A1.75 1.75 0 000 5.75v2c0 .698.409 1.3 1 1.582v4.918c0 .966.784 1.75 1.75 1.75h10.5A1.75 1.75 0 0015 14.25V9.332c.591-.281 1-.884 1-1.582v-2A1.75 1.75 0 0014.25 4h-.55a2.75 2.75 0 00-2.45-4c-.984 0-1.874.42-2.57 1.23A5.086 5.086 0 008 2.274a5.086 5.086 0 00-.68-1.042C6.623.42 5.733 0 4.75 0A2.75 2.75 0 002 2.75zM8.941 4h2.309a1.25 1.25 0 100-2.5c-.516 0-1 .205-1.43.707-.337.392-.646.975-.879 1.793zm-1.84 1.5H1.75a.25.25 0 00-.25.25v2c0 .138.112.25.25.25h5.5V5.5h-.149zm1.649 0V8h5.5a.25.25 0 00.25-.25v-2a.25.25 0 00-.25-.25h-5.5zm0 4h4.75v4.75a.25.25 0 01-.25.25h-4.5v-5zm-1.5 0v5h-4.5a.25.25 0 01-.25-.25V9.5h4.75z"/>
          </svg>
          <p>Giveaway</p>
        </div>
        <div className={`w-full h-[56px] flex px-[18px] gap-[20px] items-center cursor-pointer ${theme?'sideBarElementDark':'sideBarElementLight'} transition-all`}>
          <svg width="25" height="21" viewBox="0 0 25 21" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M8.82667 15.3409H5.03181C4.98585 17.1932 5.2463 20.9964 8.12173 20.9832C11.9166 20.9653 11.2731 18.9016 10.8849 18.4477C10.4305 17.9081 8.85227 17.2472 8.82667 15.341V15.3409Z" fill="#494E5B"/>
          <path d="M20.0422 1.15677C17.5958 3.77778 14.8838 5.73794 11.809 6.76274C11.8243 6.8346 11.8346 6.91108 11.8346 6.992V13.7041C14.9041 14.7292 17.6005 16.6848 20.042 19.2969C20.3587 19.6385 20.9818 19.4408 20.9818 19.0002V1.4532C20.9818 1.01261 20.3587 0.814748 20.042 1.15652L20.0422 1.15677Z" fill="#494E5B"/>
          <path d="M10.8135 14.1539V6.99215C10.8135 6.82588 10.6603 6.69547 10.4765 6.69547H4.75074C3.53516 6.69547 2.43187 7.12701 1.63522 7.83288C0.838526 8.5297 0.348267 9.50526 0.348267 10.5753C0.348267 12.7197 2.31457 14.4506 4.7509 14.4506H10.4766C10.6603 14.4504 10.8135 14.3202 10.8135 14.1537L10.8135 14.1539ZM8.45613 12.9409H4.30787C4.02585 12.9409 3.79705 12.7397 3.79705 12.4913C3.79705 12.2431 4.02565 12.0417 4.30787 12.0417H8.45613C8.73815 12.0417 8.96695 12.2429 8.96695 12.4913C8.96695 12.7397 8.73815 12.9409 8.45613 12.9409ZM8.45613 11.0229H4.30787C4.02585 11.0229 3.79705 10.8217 3.79705 10.5733C3.79705 10.3251 4.02565 10.1237 4.30787 10.1237H8.45613C8.73815 10.1237 8.96695 10.3249 8.96695 10.5733C8.96675 10.8215 8.73815 11.0229 8.45613 11.0229ZM8.45613 9.10476H4.30787C4.02585 9.10476 3.79705 8.90353 3.79705 8.65511C3.79705 8.40687 4.02565 8.20547 4.30787 8.20547H8.45613C8.73815 8.20547 8.96695 8.4067 8.96695 8.65511C8.96675 8.90336 8.73815 9.10476 8.45613 9.10476Z" fill="#494E5B"/>
          <path d="M22.0038 7.51816V13.2322C23.3625 12.8321 24.3483 11.6947 24.3483 10.3775C24.3483 9.06017 23.3625 7.91831 22.0038 7.5182V7.51816Z" fill="#494E5B"/>
          </svg>
          <p>Advertising</p>
        </div>
        <NavLink to={"/admin/categories"} className={(navData)=>(navData.isActive?` ${theme?'navlinkElementDarkAir':'navlinkElementLightAir'} font-medium`:" ")}>
        <div className={`w-full h-[56px] flex px-[18px] gap-[20px] items-center cursor-pointer ${theme?'sideBarElementDark':'sideBarElementlight'} transition-all`}>
          <svg viewBox="0 0 32 32"  width="24" height="24"  xmlns="http://www.w3.org/2000/svg">
          <path d="m6.76 6 .45.89.55 1.11h4.24v5h-8v-7zm.62-2h-4.38a1 1 0 0 0 -1 1v9a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1v-7a1 1 0 0 0 -1-1h-4l-.72-1.45a1 1 0 0 0 -.9-.55z" fill='#494E5B'/>
          <path d="m22.76 6 .45.89.55 1.11h4.24v5h-8v-7zm.62-2h-4.38a1 1 0 0 0 -1 1v9a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1v-7a1 1 0 0 0 -1-1h-4l-.72-1.45a1 1 0 0 0 -.9-.55z" fill='#494E5B'/>
          <path d="m6.76 19 .45.89.55 1.11h4.24v5h-8v-7zm.62-2h-4.38a1 1 0 0 0 -1 1v9a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1v-7a1 1 0 0 0 -1-1h-4l-.72-1.45a1 1 0 0 0 -.9-.55z" fill='#494E5B'/>
          <path d="m22.76 19 .45.89.55 1.11h4.24v5h-8v-7zm.62-2h-4.38a1 1 0 0 0 -1 1v9a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1v-7a1 1 0 0 0 -1-1h-4l-.72-1.45a1 1 0 0 0 -.9-.55z" fill='#494E5B'/>
          {/* <path d="m0 0h32v32h-32z" fill="none"/> */}
          </svg>
          <p>Categories</p>
        </div>
        </NavLink>
      </div>
      <Link to={"/"}>
      <div className={`w-[320px] h-[56px] flex px-[18px] gap-[20px] items-center cursor-pointer ${theme?'sideBarElementDark':'sideBarElementLight'} transition-all absolute bottom-0`}>
        <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24">
        <path d="M10.09 15.59L11.5 17l5-5-5-5-1.41 1.41L12.67 11H3v2h9.67l-2.58 2.59zM19 3H5c-1.11 0-2 .9-2 2v4h2V5h14v14H5v-4H3v4c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z" fill='#494E5B'/>
        </svg>
        <p>Exit</p>
      </div>
      </Link>
    </div>
  )
}

export default Sidebar
