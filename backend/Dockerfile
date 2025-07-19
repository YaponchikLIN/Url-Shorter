FROM node:20-alpine

# Устанавливаем build-tools для компиляции нативных модулей PostgreSQL
RUN apk add --no-cache python3 make g++

WORKDIR /app

# Копируем только package файлы для кэширования слоя
COPY package*.json ./
RUN npm install && npm cache clean --force

# Копируем .npmrc для предотвращения установки sqlite3 в runtime
COPY .npmrc ./

# Копируем исходный код
COPY . .
RUN npm run build

# Запускаем тесты после сборки
RUN npm test

EXPOSE 3000

CMD ["npm", "start"]