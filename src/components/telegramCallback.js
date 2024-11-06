import axios from 'axios';

export default async function handler(req, res) {
  const { id, username, first_name, last_name, photo_url } = req.query;
  
  try {
    // Отправляем запрос на внутренний сервер, передавая параметры пользователя
    const response = await axios.get(`http://154.53.45.100:8080/auth/telegram/callback`, {
      params: { id, username, first_name, last_name, photo_url }
    });

    // Проверяем, что ответ содержит данные пользователя
    if (response.data && response.data.user) {
      // Возвращаем клиенту данные пользователя, полученные с бэкенда
      res.status(200).json(response.data.user);
      console.log('====================================');
      console.log(response.data);
      console.log('====================================');
    } else {
      res.status(404).json({ success: false, message: 'Пользователь не найден' });
    }

  } catch (error) {
    console.error('Ошибка при пересылке запроса:', error);
    res.status(500).json({ success: false, message: 'Ошибка при пересылке запроса' });
  }
}
