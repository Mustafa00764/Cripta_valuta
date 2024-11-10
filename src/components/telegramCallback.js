import axios from 'axios';

export default async function handler(req, res) {
  const { id, username, first_name, last_name, photo_url } = req.query;

  try {
    // Отправляем запрос на внутренний сервер
    const response = await axios.get(`http://154.53.45.100:8080/auth/telegram/callback`, {
      params: { id, username, first_name, last_name, photo_url }
    });

    // Проверяем, что ответ содержит данные пользователя и токен
    if (response.data && response.data.user && response.data.token) {
      // Возвращаем данные пользователя и токен клиенту
      res.status(200).json({ user: response.data.user, token: response.data.token });
    } else {
      res.status(404).json({ success: false, message: 'Пользователь не найден или токен не получен' });
    }

  } catch (error) {
    console.error('Ошибка при пересылке запроса:', error);
    res.status(500).json({ success: false, message: 'Ошибка при пересылке запроса' });
  }
}
