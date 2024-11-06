import axios from 'axios';

export default async function handler(req, res) {
  const { id, username, first_name, last_name, photo_url } = req.query;
  try {
    // Перенаправление запроса на ваш внутренний сервер
    const response = await axios.get(`http://154.53.45.100:8080/auth/telegram/callback`, {
      params: { id, username, first_name, last_name, photo_url }
    });

    // Отправляем результат обратно пользователю
    res.status(200).json(response.data);
  } catch (error) {
    console.error('Ошибка при пересылке запроса:', error);
    res.status(500).json({ success: false, message: 'Ошибка при пересылке запроса' });
  }
}
