import React, { useContext, useEffect, useState } from 'react'
import api from '../components/axiosRefresh';
import { AuthContext } from '../context/AuthContext';
import { io } from 'socket.io-client';
import axios from "axios";

const UDCard = ({userInfo,index}) => {
  // const {status} = useContext(AuthContext)
  const [status, setStatus] = useState(null); // Статус пользователя

  const handleUserBan = async () => {

    const accessToken = localStorage.getItem("accessToken");
    const refreshToken = localStorage.getItem("refreshToken");
    const userId = Number(localStorage.getItem("userId"));
    try {

      const userData = {

      };
      const responses = await axios.post('https://legitcommunity.uz/auth/refresh-token', { refreshToken: refreshToken });
      const newAccessToken = responses.data.accessToken;
      const userResponse = await api.put(`/users/${userId}`, userData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${newAccessToken}`,
        },
      });

      console.log(userResponse.data);
      
      
    } catch (error) {
      console.log(error);
      
    }

  }
  useEffect(()=>{
    const accessToken = localStorage.getItem("accessToken");
    const refreshToken = localStorage.getItem("refreshToken");
    const userId = userInfo.id

    // Проверяем наличие токена
    if (!accessToken || !userId) {
      console.warn("Токен или userId отсутствуют. Подключение WebSocket отменено.");
      return;
    }

    // Подключаем WebSocket
    const socket = io('https://legitcommunity.uz/status', {
      query: { userId },
      extraHeaders: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });

    // Событие подключения
    socket.on('connect', () => {
      console.log('WebSocket connected');
    });

    // Обработка обновления статуса
    socket.on('status-update', (data) => {
      console.log('Status update received:', data);

      if (data.userId === userId) {
        setStatus(data.status);
        if (data.status === 'offline') {
          // setLastOnline(data.lastOnline); // Сохраняем время последнего подключения
        }
      }
    });

    // Обработка отключения
    socket.on('disconnect', () => {
      console.log('WebSocket disconnected');
    });

    // Очистка WebSocket при размонтировании
    return () => {
      socket.disconnect();
      console.log('WebSocket connection closed.');
    };
  },[setStatus])
  return (
  <div className='flex text-center options text-[#72787F] cursor-default last:rounded-b-[12px] even:bg-[#EAEAEA] odd:bg-[#fff] h-[50px] items-center'>
    <div className='w-[100px]'>
      <p>{index}</p>
    </div>
    <div className='w-[150px] items-center gap-4 flex justify-start h-full'>
      <div className='w-[32px] h-[32px] rounded-full overflow-hidden bg-[rgba(136,145,157,.2)]'>
        <img className='border-0 rounded-full'  src={userInfo.photo_url} alt="" />
      </div>
      <p>{userInfo.firstName}</p>
    </div>
    <div className='w-[300px]'>
      <p>{userInfo.username}</p>
    </div>
    <div className='w-[300px]'>
      <p>{status}</p>
    </div>
    <div className='w-[150px] flex justify-center h-[24px]  relative overflow-hidden'>
      <p className=' whitespace-nowrap text-left overflow-hidden text-ellipsis h-[24px]'>{userInfo.role.toLowerCase()}</p>
    </div>
    <div className='flex w-[200px] justify-center items-center gap-4 '>
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
      <div className='blocked transition-all'>
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g clipPath="url(#clip0_2214_768)">
        <path d="M12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21Z" stroke="#72787F" strokeWidth="1.5" stroke-linecap="round"/>
        <path d="M6 6L18 18" stroke="#72787F" strokeWidth="1.5" stroke-linecap="round"/>
        </g>
        <defs>
        <clipPath id="clip0_2214_768">
        <rect width="24" height="24" fill="white"/>
        </clipPath>
        </defs>
        </svg>
      </div>
    </div>
  </div>
  )
}

export default UDCard