Вот отредактированная версия `README.md` с улучшенной структурой, грамматикой и читаемостью:

```markdown
# Pulse - Fitness Tracker

A modern fitness tracker for logging workouts, tracking nutrition, and earning rewards for your achievements.

## Features

- **Running Tracker** – Log your runs with distance and time
- **Push-ups Tracker** – Keep count of your workouts
- **Nutrition Control** – Track healthy meals
- **Rewards System** – Earn points and exchange them for real prizes
- **Statistics** – View your activity history
- **Modern UI** – Clean and user-friendly interface

## Tech Stack

- **Backend:** FastAPI (Python)
- **Frontend:** React 18 + Vite
- **Database:** PostgreSQL 17
- **Containerization:** Docker & Docker Compose

## Requirements

- Docker
- Docker Compose
- Git

## Installation & Running

### 1. Clone the repository

```bash
git clone https://github.com/Nihaochingiz/pulse.git
cd pulse
```

### 2. Environment setup

Copy the environment variables file:

```bash
cp .env.example .env
```

Edit the `.env` file if needed.

### 3. Run the application

```bash
docker-compose up --build
```

### 4. Access the application

- **Frontend:** http://localhost:5173
- **Backend API:** http://localhost:8000
- **API Documentation:** http://localhost:8000/docs

## Usage

### Running

1. Go to the **Running** tab
2. Enter distance in kilometers
3. Enter workout time in minutes
4. Click **Save workout**

**Points calculation:**
- 10 points per kilometer
- +5 bonus points for pace faster than 6 min/km

### Push-ups

1. Go to the **Push-ups** tab
2. Enter the number of push-ups
3. Click **Save**

**Points calculation:**
- 1 point per 5 push-ups

### Nutrition

1. Go to the **Nutrition** tab
2. Enter meal name
3. Mark whether it's healthy
4. Click **Save**

**Points calculation:**
- +5 points for healthy meals
- 0 points for regular meals

### Rewards

1. Go to the **Rewards** tab
2. Browse available rewards
3. Exchange your points for real prizes

**Available rewards:**
| Reward | Points |
|--------|--------|
| Pizza | 100 |
| Movie ticket | 200 |
| New book | 300 |
| Steam game | 500 |
| Personal training session | 1000 |
| Gym membership | 2000 |

## Database Operations

### Access PostgreSQL via command line

```bash
docker exec -it fitness-postgres psql -U myuser -d fitnessdb
```

### View all push-ups

```sql
SELECT * FROM pushups;
```

### View statistics

```sql
SELECT 
    COUNT(*) as total_sessions, 
    SUM(count) as total_pushups,
    AVG(count) as avg_pushups,
    SUM(points_earned) as total_points
FROM pushups;
```

### Useful SQL queries

**Today's workouts:**

```sql
SELECT * FROM pushups WHERE date = CURRENT_DATE;
```

**Top 5 push-up results:**

```sql
SELECT date, count, points_earned 
FROM pushups 
ORDER BY count DESC 
LIMIT 5;
```

**Last 7 days statistics:**

```sql
SELECT 
    date, 
    COUNT(*) as sessions, 
    SUM(points_earned) as points
FROM pushups 
WHERE date >= CURRENT_DATE - INTERVAL '7 days'
GROUP BY date
ORDER BY date DESC;
```

**Total statistics across all activities:**

```sql
SELECT 'Running' as activity, COUNT(*) as sessions, SUM(points_earned) as points
FROM running
UNION ALL
SELECT 'Push-ups', COUNT(*), SUM(points_earned)
FROM pushups
UNION ALL
SELECT 'Nutrition', COUNT(*), SUM(points_earned)
FROM meals;
```

## Stop the application

**Stop containers:**

```bash
docker-compose down
```

**Full cleanup (including database data):**

```bash
docker-compose down -v
```

## Project Structure

```
pulse/
├── backend/                 # FastAPI backend
│   ├── app/
│   │   ├── routers/        # API routers
│   │   ├── database.py     # Database config
│   │   ├── main.py         # Entry point
│   │   ├── models.py       # SQLAlchemy models
│   │   └── schemas.py      # Pydantic schemas
│   ├── Dockerfile
│   └── requirements.txt
├── frontend/               # React frontend
│   ├── src/
│   │   ├── components/     # React components
│   │   ├── App.jsx
│   │   ├── api.js          # API client
│   │   └── main.jsx
│   ├── Dockerfile
│   ├── package.json
│   └── vite.config.js
├── docker-compose.yml
├── .env.example
├── .gitignore
├── init.sql               # DB initialization
└── README.md
```

## Development

**Run only backend:**

```bash
docker-compose up backend
```

**Run only frontend:**

```bash
docker-compose up frontend
```

**View logs:**

```bash
docker-compose logs -f
```

**Rebuild after changes:**

```bash
docker-compose up --build
```

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/running/` | Get all runs |
| POST | `/api/running/` | Add a run |
| GET | `/api/pushups/` | Get all push-ups |
| POST | `/api/pushups/` | Add push-ups |
| GET | `/api/meals/` | Get all meals |
| POST | `/api/meals/` | Add a meal |
| GET | `/api/points/` | Get total points |
| POST | `/api/points/reset` | Reset points |

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

MIT License

## Author

**Nihaochingiz**
```
