import axios from 'axios';

// Настройка экземпляра axios для API запросов
const api = axios.create({
  baseURL: 'https://legitcommunity.uz',
});

// Интерцептор для добавления `accessToken` к каждому запросу
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('accessToken');
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

// Интерцептор для обновления токена
api.interceptors.response.use(
  (response) => response, // Если ответ успешен, возвращаем его без изменений
  async (error) => {
    const originalRequest = error.config;

    // Проверяем, если ошибка 401 и запрос ещё не был повторён
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true; // Помечаем запрос, чтобы не повторять его несколько раз

      try {
        const refreshToken = localStorage.getItem('refreshToken');
        if (!refreshToken) {
          throw new Error("Refresh token отсутствует");
        }

        // Отправляем запрос на обновление `accessToken` с `refreshToken`
        const response = await axios.post('https://legitcommunity.uz/auth/refresh-token', { token: refreshToken });
        const newAccessToken = response.data.accessToken;

        // Сохраняем новый `accessToken` в localStorage
        localStorage.setItem('accessToken', newAccessToken);

        // Добавляем новый токен к заголовкам исходного запроса и повторяем его
        originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
        return api(originalRequest);
      } catch (refreshError) {
        console.error('Ошибка обновления токена:', refreshError);

        // Очистка токенов и перенаправление на страницу входа при ошибке
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        window.location.href = '/login'; // или показать уведомление, а затем перенаправить
      }
    }

    return Promise.reject(error);
  }
);

export default api;
