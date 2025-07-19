import { DataSource } from 'typeorm';
import { Url } from './models/Url';
import { Click } from './models/Click';

// Конфигурация базы данных PostgreSQL
const dbConfig = {
  type: 'postgres' as const,
  url: process.env.DATABASE_URL,
  entities: [Url, Click],
  synchronize: true, // В продакшене лучше использовать миграции
  logging: false,
};

export const AppDataSource = new DataSource(dbConfig);