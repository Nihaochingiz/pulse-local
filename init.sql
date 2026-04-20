-- Существующие таблицы
CREATE TABLE IF NOT EXISTS running (
    id SERIAL PRIMARY KEY,
    date DATE DEFAULT CURRENT_DATE,
    distance_km DECIMAL(5,2) NOT NULL,
    duration_minutes INTEGER NOT NULL,
    points_earned INTEGER DEFAULT 0
);

CREATE TABLE IF NOT EXISTS pushups (
    id SERIAL PRIMARY KEY,
    date DATE DEFAULT CURRENT_DATE,
    count INTEGER NOT NULL,
    points_earned INTEGER DEFAULT 0
);

CREATE TABLE IF NOT EXISTS dumbbells (
    id SERIAL PRIMARY KEY,
    date DATE DEFAULT CURRENT_DATE,
    weight_kg DECIMAL(5,2) NOT NULL,
    repetitions INTEGER NOT NULL,
    sets INTEGER NOT NULL,
    points_earned INTEGER DEFAULT 0
);

CREATE TABLE IF NOT EXISTS meals (
    id SERIAL PRIMARY KEY,
    date DATE DEFAULT CURRENT_DATE,
    meal_name VARCHAR(255) NOT NULL,
    calories INTEGER DEFAULT 0,
    is_healthy BOOLEAN DEFAULT TRUE,
    points_earned INTEGER DEFAULT 0
);

CREATE TABLE IF NOT EXISTS points (
    id SERIAL PRIMARY KEY,
    total_points INTEGER DEFAULT 0,
    last_updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO points (total_points) SELECT 0 WHERE NOT EXISTS (SELECT 1 FROM points);