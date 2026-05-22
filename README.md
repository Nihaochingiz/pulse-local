# Pulse - Fitness Tracker

Современный фитнес трекер для записи тренировок, отслеживания питания и получения наград за достижения.

## Возможности

- Трекинг бега - Запись пробежек с дистанцией и временем
- Отслеживание отжиманий - Ведите счет своих тренировок
- Контроль питания - Отмечайте полезные приемы пищи
- Система наград - Зарабатывайте очки и обменивайте их на реальные призы
- Статистика - Просматривайте историю всех активностей
- Современный UI - Стильный и удобный интерфейс

## Технологии

- Backend: FastAPI (Python)
- Frontend: React 18 + Vite
- Database: PostgreSQL 17
- Containerization: Docker & Docker Compose

## Требования

- Docker
- Docker Compose
- Git

## Установка и запуск

### 1. Клонирование репозитория

git clone https://github.com/Nihaochingiz/pulse.git
cd pulse

### 2. Настройка окружения

Скопируйте файл с переменными окружения:

cp .env.example .env

При необходимости отредактируйте .env файл под свои параметры.

### 3. Запуск приложения

docker-compose up --build

### 4. Доступ к приложению

- Frontend: http://localhost:5173
- Backend API: http://localhost:8000
- API Documentation: http://localhost:8000/docs

## Использование

### Бег

1. Перейдите на вкладку "Бег"
2. Введите дистанцию в километрах
3. Укажите время тренировки в минутах
4. Нажмите "Сохранить тренировку"

Начисление очков:
- 10 очков за каждый километр
- +5 очков бонус за темп быстрее 6 мин/км

### Отжимания

1. Перейдите на вкладку "Отжимания"
2. Введите количество отжиманий
3. Нажмите "Сохранить"

Начисление очков:
- 1 очко за каждые 5 отжиманий

### Питание

1. Перейдите на вкладку "Питание"
2. Введите название блюда
3. Отметьте, полезная ли это еда
4. Нажмите "Сохранить"

Начисление очков:
- +5 очков за полезную еду
- 0 очков за обычную еду

### Награды

1. Перейдите на вкладку "Награды"
2. Просматривайте доступные награды
3. Обменивайте накопленные очки на реальные призы

Доступные награды:
- Пицца - 100 очков
- Кино - 200 очков
- Новая книга - 300 очков
- Игра в Steam - 500 очков
- Персональная тренировка - 1000 очков
- Абонемент в спортзал - 2000 очков

## Работа с базой данных

### Просмотр данных через командную строку

Подключение к PostgreSQL:

docker exec -it fitness-postgres psql -U myuser -d fitnessdb

Просмотр всех отжиманий:

SELECT * FROM pushups;

Просмотр статистики:

SELECT COUNT(*) as total_sessions, 
       SUM(count) as total_pushups,
       AVG(count) as avg_pushups,
       SUM(points_earned) as total_points
FROM pushups;

### Полезные SQL запросы

Все тренировки за сегодня:

SELECT * FROM pushups WHERE date = CURRENT_DATE;

Топ 5 лучших результатов по отжиманиям:

SELECT date, count, points_earned 
FROM pushups 
ORDER BY count DESC 
LIMIT 5;

Статистика за последние 7 дней:

SELECT date, COUNT(*) as sessions, SUM(points_earned) as points
FROM pushups 
WHERE date >= CURRENT_DATE - INTERVAL '7 days'
GROUP BY date
ORDER BY date DESC;

Общая статистика по всем активностям:

SELECT 
    'Бег' as activity,
    COUNT(*) as sessions,
    SUM(points_earned) as points
FROM running
UNION ALL
SELECT 
    'Отжимания',
    COUNT(*),
    SUM(points_earned)
FROM pushups
UNION ALL
SELECT 
    'Питание',
    COUNT(*),
    SUM(points_earned)
FROM meals;

## Остановка приложения

Остановка контейнеров:

docker-compose down

Полная очистка (включая данные БД):

docker-compose down -v

## Структура проекта

pulse/
├── backend/                 # FastAPI backend
│   ├── app/
│   │   ├── routers/        # API роутеры
│   │   ├── database.py     # Настройка БД
│   │   ├── main.py         # Точка входа
│   │   ├── models.py       # SQLAlchemy модели
│   │   └── schemas.py      # Pydantic схемы
│   ├── Dockerfile
│   └── requirements.txt
├── frontend/               # React frontend
│   ├── src/
│   │   ├── components/     # React компоненты
│   │   ├── App.jsx
│   │   ├── api.js          # API клиент
│   │   └── main.jsx
│   ├── Dockerfile
│   ├── package.json
│   └── vite.config.js
├── docker-compose.yml
├── .env.example
├── .gitignore
├── init.sql               # Инициализация БД
└── README.md

## Разработка

Запуск в режиме разработки:

Только backend:

docker-compose up backend

Только frontend:

docker-compose up frontend

Просмотр логов:

docker-compose logs -f

Пересборка после изменений:

docker-compose up --build

## API Endpoints

GET /api/running/ - Получить все пробежки
POST /api/running/ - Добавить пробежку
GET /api/pushups/ - Получить все отжимания
POST /api/pushups/ - Добавить отжимания
GET /api/meals/ - Получить все приемы пищи
POST /api/meals/ - Добавить прием пищи
GET /api/points/ - Получить общее количество очков
POST /api/points/reset - Сбросить очки

## Вклад в проект

1. Форкните репозиторий
2. Создайте ветку для фичи (git checkout -b feature/AmazingFeature)
3. Зафиксируйте изменения (git commit -m 'Add some AmazingFeature')
4. Запушьте ветку (git push origin feature/AmazingFeature)
5. Откройте Pull Request

## Лицензия

MIT License

## Автор

Nihaochingiz
