# URL Shortener 🔗

Веб-сервис для сокращения URL-адресов, построенный с использованием React, Node.js, TypeScript и PostgreSQL.

## 🚀 Особенности

- **Сокращение URL**: Преобразование длинных URL в короткие, удобные для использования ссылки
- **Пользовательские псевдонимы**: Возможность создания собственных коротких имен для ссылок
- **Список всех URL**: Просмотр всех созданных сокращенных ссылок
- **UI**: Чистый и интуитивно понятный интерфейс
- **Контейнеризация**: Полная поддержка Docker для легкого развертывания

## 🛠 Технологический стек

### Frontend

- **React 19.1.0** - Библиотека для создания пользовательских интерфейсов
- **TypeScript** - Типизированный JavaScript для лучшей разработки
- **Axios** - HTTP клиент для API запросов
- **CSS3** - Стилизация с расширенными возможностями

### Backend

- **Node.js** - Серверная среда выполнения JavaScript
- **Express.js 5.1.0** - Веб-фреймворк для Node.js
- **TypeScript** - Типизированная разработка на сервере
- **TypeORM 0.3.25** - ORM для работы с базой данных
- **PostgreSQL** - Реляционная база данных
- **Helmet** - Безопасность HTTP заголовков
- **CORS** - Поддержка кросс-доменных запросов
- **Morgan** - HTTP логирование

### DevOps

- **Docker & Docker Compose** - Контейнеризация приложения
- **Nginx** - Веб-сервер для фронтенда
- **Jest** - Тестирование

## 📸 Скриншоты

### 1. Создание сокращенных ссылок

Процесс создания URL с автоматическим псевдонимом и с пользовательским псевдонимом:

![Главная страница](screenshots/01-main-page-empty-2025-07-19T20-22-03-544Z.png)
_Чистый интерфейс при запуске_

![Создание URL с псевдонимом](screenshots/04-url-with-alias-filled-2025-07-19T20-23-24-634Z.png)
_Заполнение формы с пользовательским псевдонимом_

![Результат создания](screenshots/05-second-url-created-2025-07-19T20-23-41-394Z.png)
_Успешно созданная сокращенная ссылка_

### 2. Управление ссылками

Просмотр, аналитика и удаление созданных URL:

![Список всех URL](screenshots/06-all-urls-list-2025-07-19T20-23-57-477Z.png)
_Список всех созданных ссылок с кнопками управления_

![Аналитика](screenshots/analytics.png)
_Просмотр статистики переходов и IP-адресов_

## 🚀 Быстрый старт

### Предварительные требования

- Docker и Docker Compose
- Git

### Установка и запуск

1. **Клонируйте репозиторий**

   ```bash
   git clone <repository-url>
   cd url-shortener
   ```

2. **Запустите приложение с помощью Docker**

   ```bash
   docker-compose up -d
   ```

3. **Откройте приложение в браузере**
   ```
   http://localhost
   ```

### Порты

- **Frontend**: http://localhost (порт 80)
- **Backend API**: http://localhost:3000
- **PostgreSQL**: localhost:5432

## 📁 Структура проекта

```
url-shortener/
├── backend/                 # Node.js + Express API
│   ├── src/                # Исходный код сервера
│   ├── dist/               # Скомпилированный код
│   ├── tests/              # Тесты
│   ├── Dockerfile          # Docker конфигурация для backend
│   └── package.json        # Зависимости backend
├── frontend/               # React приложение
│   ├── src/                # Исходный код клиента
│   ├── public/             # Статические файлы
│   ├── Dockerfile          # Docker конфигурация для frontend
│   └── package.json        # Зависимости frontend
├── screenshots/            # Скриншоты приложения
├── docker-compose.yml      # Конфигурация Docker Compose
└── README.md              # Документация проекта
```

## 🔧 Разработка

### Локальная разработка

1. **Backend разработка**

   ```bash
   cd backend
   npm install
   npm run dev
   ```

2. **Frontend разработка**
   ```bash
   cd frontend
   npm install
   npm start
   ```

### Тестирование

```bash
# Backend тесты
cd backend
npm test

# Frontend тесты
cd frontend
npm test
```
