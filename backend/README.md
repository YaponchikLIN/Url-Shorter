# Backend

## Команды

```bash
# Установить зависимости
npm install

# Запуск для разработки
npm run dev

# Сборка
npm run build

# Запуск production
npm start

# Тесты
npm test
npm run test:watch
npm run test:coverage
```

## Тесты в Docker

```bash
# Запустить тесты
docker-compose exec backend npm test

# Войти в контейнер
docker-compose exec backend bash
```