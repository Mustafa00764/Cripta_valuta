import axios from 'axios';

export default async function handler(req, res) {
  try {
    // Прокси-запрос к вашему серверу через HTTP
    const response = await axios.post(
      'http://154.53.45.100:8080/auth/telegram/callback',
      req.body
    );

    // Отправляем данные ответа обратно клиенту
    res.status(200).json(response.data);
  } catch (error) {
    console.error('Ошибка при отправке запроса на сервер:', error.message);
    res.status(error.response?.status || 500).json({ error: 'Ошибка сервера' });
  }
}
