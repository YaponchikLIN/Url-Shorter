import 'reflect-metadata';
import 'dotenv/config';
import { AppDataSource } from './database';
import app from './app';

const PORT = process.env.PORT || 3000;

async function startServer() {
  try {
    // Подключение к базе данных
    await AppDataSource.initialize();
    console.log('Подключение к базе данных установлено');

    // Запуск сервера
    app.listen(PORT, () => {
      console.log(`Сервер запущен на порту ${PORT}`);
    });
  } catch (error) {
    console.error('Ошибка запуска сервера:', error);
    process.exit(1);
  }
}

startServer();