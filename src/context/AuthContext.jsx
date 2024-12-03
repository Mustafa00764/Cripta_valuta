import React from 'react'
import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import api from "../components/axiosRefresh"
import { io } from 'socket.io-client';

export const AuthContext = createContext();


const AuthProvider = ({children}) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [status, setStatus] = useState("online"); // Статус пользователя
  const [lastOnline, setLastOnline] = useState(null); 
  const [isSubscribed, setIsSubscribed] = useState(true)
  const [userId, setUserId] = useState(0)
  const handleLogin = (userData) => {
    localStorage.setItem('accessToken', userData.accessToken);
    setUser(userData.user);
    setIsAuthenticated(true);
  };

  const refreshAccessToken = async (refreshToken) => {
    try {
      const response = await axios.post('https://legitcommunity.uz/auth/refresh-token', { refreshToken: refreshToken });
      const newAccessToken = response.data.accessToken;
      localStorage.setItem('accessToken', newAccessToken);
      return newAccessToken;
    } catch (error) {
      console.error('Ошибка обновления токена:', error);
      return null;
    }
  };


  const parseJwt = (token) => {
    try {
      const base64Url = token.split('.')[1]; // Получаем payload
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split('')
          .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
          .join('')
      );
      return JSON.parse(jsonPayload); // Преобразуем в объект
    } catch (e) {
      console.error('Invalid token', e);
      return null;
    }
  };


  const restoreSession = async () => {
    const accessToken = localStorage.getItem('accessToken');  
    const refreshToken = localStorage.getItem('refreshToken');
    
    if (accessToken) {
      const decoded = parseJwt(accessToken); // Декодируем токен
      setUserId(decoded?.userId); // Извлечение userId
      console.log(userId);
    } else {
      console.log('Access token not found');
    }

    if (accessToken && userId) {
      try {
        const response = await api.get(`/users/${userId}`, {
          headers: { Authorization: `Bearer ${accessToken}` },
        });


        // Успешно получили данные пользователя
        setUser(response.data);
        setIsAuthenticated(true);
        console.log(response);
      } catch (error) {
        // Если токен истек, пробуем обновить его с помощью refreshToken
        if (error.response && error.response.status === 401 && refreshToken) {
          const newAccessToken = await refreshAccessToken(refreshToken);
          if (newAccessToken) {
            try {
              const response = await api.get(`/users/${userId}`, {
                headers: { Authorization: `Bearer ${newAccessToken}` },
              });
              
              setUser(response.data);
              setIsAuthenticated(true);
            } catch (err) {
              console.error('Ошибка при восстановлении данных пользователя', err);
            }
          }
        } else {
          console.error('Ошибка при получении данных пользователя', error);
        }
      }
    }
  };
  const handleIsSubscribed = async () => {
    const accessToken = localStorage.getItem('accessToken');
    const refreshToken = localStorage.getItem('refreshToken');
    if (accessToken) {
      try {
        const responseIsSubscribed = await api.get(`/users/${userId}/subscription`, {
          headers: { Authorization: `Bearer ${accessToken}` },
        })
        console.log(responseIsSubscribed.data + " 22222");

        setIsSubscribed(responseIsSubscribed.data)
      } catch (error) {
        if (error.response && error.response.status === 401 && refreshToken) {
          const newAccessToken = await refreshAccessToken(refreshToken);
          if (newAccessToken) {
            try {
              const responseIsSubscribed = await api.get(`/users/${userId}/subscription`, {
                headers: { Authorization: `Bearer ${newAccessToken}` },
              })
              console.log(responseIsSubscribed.data + " 22222");

              setIsSubscribed(responseIsSubscribed.data)
            } catch (err) {
              console.error('Ошибка при восстановлении данных пользователя', err);
            }
          }
        }
      }

    }
  }

  useEffect(()=>{
    handleIsSubscribed()
    const intervalId = setInterval(() => {
      handleIsSubscribed()
    }, 2000);
    return () => clearInterval(intervalId);
  },[])

  useEffect(() => {
    restoreSession();
    const storedToken = localStorage.getItem('accessToken');
    if (storedToken) {
      setIsAuthenticated(true);
      // Логика для получения данных о пользователе
    }
    const accessToken = localStorage.getItem("accessToken");
    const refreshToken = localStorage.getItem("refreshToken");

    // Проверяем наличие токена


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
          setLastOnline(data.lastOnline); // Сохраняем время последнего подключения
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

  }, [setStatus,userId]);


  return (
    <AuthContext.Provider value={{ user, isSubscribed, setIsSubscribed, userId, setUserId, refreshAccessToken,restoreSession,setLastOnline,setStatus,lastOnline,status, setUser,setIsAuthenticated, isAuthenticated, handleLogin}}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider