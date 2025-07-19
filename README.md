# URL Shortener

Сервис для сокращения ссылок.

## Запуск

```bash
# Запустить весь проект
docker-compose up --build
```

## Тесты

```bash
# Запустить тесты
docker-compose exec backend npm test

# Тесты с отслеживанием изменений
docker-compose exec backend npm run test:watch

# Тесты с покрытием кода
docker-compose exec backend npm run test:coverage
```

## Разработка

```bash
# Backend
cd backend
npm install
npm run dev

# Frontend
cd frontend
npm install
npm start
```
