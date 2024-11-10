import axios from 'axios';

export default async function handler(req, res) {
  // Извлечение данных пользователя из запроса
  const { id, username, first_name, last_name, photo_url } = req.query;

  try {
    // Отправка данных пользователя на внутренний сервер
    const response = await axios.get('http://154.53.45.100:8080/auth/telegram/callback', {
      params: { id, username, first_name, last_name, photo_url }
    });

    // Проверка наличия данных пользователя и токена в ответе
    if (response.data && response.data.user && response.data.token) {
      // Отправка данных пользователя и токена на фронтенд
      res.status(200).json({
        user: response.data.user,
        token: response.data.token
      });
    } else {
      // Если токен или пользователь не найдены
      res.status(404).json({
        success: false,
        message: 'Пользователь не найден или токен не получен'
      });
    }
  } catch (error) {
    // Обработка ошибок при запросе
    console.error('Ошибка при пересылке запроса:', error);
    res.status(500).json({
      success: false,
      message: 'Ошибка при пересылке запроса'
    });
  }
}
