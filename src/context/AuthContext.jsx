import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { io } from "socket.io-client";
import api from "../components/axiosRefresh"; // Ваш api-экземпляр для отправки запросов

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [usersStatus, setUsersStatus] = useState([]); // Статусы всех пользователей
  const [lastOnline, setLastOnline] = useState(null);

  const handleLogin = (userData) => {
    localStorage.setItem("accessToken", userData.accessToken);
    setUser(userData.user);
    setIsAuthenticated(true);
  };

  const refreshAccessToken = async (refreshToken) => {
    try {
      const response = await axios.post("https://legitcommunity.uz/auth/refresh-token", { refreshToken });
      const newAccessToken = response.data.accessToken;
      localStorage.setItem("accessToken", newAccessToken);
      return newAccessToken;
    } catch (error) {
      console.error("Ошибка обновления токена:", error);
      return null;
    }
  };

  const restoreSession = async () => {
    const accessToken = localStorage.getItem("accessToken");
    const refreshToken = localStorage.getItem("refreshToken");
    const userId = localStorage.getItem("userId");

    if (accessToken && userId) {
      try {
        const response = await api.get(`/users/${userId}`, {
          headers: { Authorization: `Bearer ${accessToken}` },
        });

        setUser(response.data);
        setIsAuthenticated(true);
      } catch (error) {
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
              console.error("Ошибка при восстановлении данных пользователя", err);
            }
          }
        } else {
          console.error("Ошибка при получении данных пользователя", error);
        }
      }
    }
  };

  useEffect(() => {
    restoreSession();

    const storedToken = localStorage.getItem("accessToken");
    const storedUserId = localStorage.getItem("userId");
    if (!storedToken || !storedUserId) {
      console.warn("Токен или userId отсутствуют. Подключение WebSocket отменено.");
      return;
    }

    const accessToken = storedToken;
    const userId = Number(storedUserId);

    // Подключаем WebSocket для получения статусов всех пользователей
    const socket = io("https://legitcommunity.uz/status", {
      query: { userId },
      extraHeaders: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });

    // Событие подключения
    socket.on("connect", () => {
      console.log("WebSocket connected");
    });

    // Обработка обновления статуса
    socket.on("status-update", (data) => {
      console.log("Status update received:", data);
      
      // Обновляем статус пользователя в массиве
      setUsersStatus((prevUsersStatus) => {
        const userIndex = prevUsersStatus.findIndex((user) => user.userId === data.userId);
        if (userIndex !== -1) {
          const updatedStatus = [...prevUsersStatus];
          updatedStatus[userIndex] = {
            ...updatedStatus[userIndex],
            status: data.status,
            lastOnline: data.status === "offline" ? data.lastOnline : null,
          };
          return updatedStatus;
        }
        
        // Если пользователя еще нет в списке, добавляем его
        return [...prevUsersStatus, { userId: data.userId, status: data.status, lastOnline: data.status === "offline" ? data.lastOnline : null }];
      });
    });

    // Обработка отключения
    socket.on("disconnect", () => {
      console.log("WebSocket disconnected");
    });

    // Очистка WebSocket при размонтировании
    return () => {
      socket.disconnect();
      console.log("WebSocket connection closed.");
    };
  }, []);  // Зависимость - только при монтировании компонента

  return (
    <AuthContext.Provider
      value={{
        user,
        refreshAccessToken,
        restoreSession,
        setLastOnline,
        usersStatus, // Теперь передаем состояние всех пользователей
        setUser,
        setIsAuthenticated,
        isAuthenticated,
        handleLogin,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
