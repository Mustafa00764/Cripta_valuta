import React from 'react'
import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import api from "../components/axiosRefresh"

export const AuthContext = createContext();


const AuthProvider = ({children}) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [status, setStatus] = useState('offline'); // Статус пользователя
  const [lastOnline, setLastOnline] = useState(null); 

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


  const restoreSession = async () => {
    const accessToken = localStorage.getItem('accessToken');  
    const refreshToken = localStorage.getItem('refreshToken');
    const userId = localStorage.getItem('userId');

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
            } finally {
              setLoading(false);
            }
          }
        } else {
          console.error('Ошибка при получении данных пользователя', error);
        }
      }
    }
  };

  // const handleUsersList = async () => {
  //   const accessToken = localStorage.getItem('accessToken');  
  //   const refreshToken = localStorage.getItem('refreshToken');
  //   try {

  //     const response = await api.get("/users")
  //     console.log(response.data);
      
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

  // Восстановление сессии при загрузке компонента
  useEffect(() => {
    restoreSession();
    const storedToken = localStorage.getItem('accessToken');
    if (storedToken) {
      setIsAuthenticated(true);
      // Логика для получения данных о пользователе
    }
    const userId = Number(localStorage.getItem("userId"))
    const accessToken = localStorage.getItem("accessToken");
    const refreshToken = localStorage.getItem("refreshToken");
    setAbout(user?user.about:"");

    const socket = io('https://legitcommunity.uz/status', {
      query: { userId },
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      } // Передаем userId в качестве параметра
    });

    // Подключение
    socket.on('connect', () => {
      console.log('WebSocket connected');
    });

    // Обновление статуса
    socket.on('status-update', (data) => {
      console.log('Status update received:', data);
      if (data.userId === userId) {
        setStatus(data.status);
        if (data.status === 'offline') {
          setLastOnline(data.lastOnline);
        }
      }
    });

    // Обработка отключения
    socket.on('disconnect', () => {
      console.log('WebSocket disconnected');
    });


    // Очистка WebSocket при размонтировании компонента
    return () => {
      socket.disconnect();
    };
    // handleUsersList()
  }, [user]);


  return (
    <AuthContext.Provider value={{user,refreshAccessToken,restoreSession,setLastOnline,setStatus,lastOnline,status, setUser,setIsAuthenticated, isAuthenticated, handleLogin}}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider