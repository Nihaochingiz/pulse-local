from sqlalchemy import Column, Integer, String, DECIMAL, Date, Boolean, TIMESTAMP
from sqlalchemy.sql import func
from .database import Base

class Running(Base):
    __tablename__ = "running"
    
    id = Column(Integer, primary_key=True, index=True)
    date = Column(Date, default=func.current_date())
    distance_km = Column(DECIMAL(5, 2), nullable=False)
    duration_minutes = Column(Integer, nullable=False)
    points_earned = Column(Integer, default=0)

class Pushups(Base):
    __tablename__ = "pushups"
    
    id = Column(Integer, primary_key=True, index=True)
    date = Column(Date, default=func.current_date())
    count = Column(Integer, nullable=False)
    points_earned = Column(Integer, default=0)

class Dumbbells(Base):
    __tablename__ = "dumbbells"
    
    id = Column(Integer, primary_key=True, index=True)
    date = Column(Date, default=func.current_date())
    weight_kg = Column(DECIMAL(5, 2), nullable=False)
    repetitions = Column(Integer, nullable=False)
    sets = Column(Integer, nullable=False)
    points_earned = Column(Integer, default=0)

class Meals(Base):
    __tablename__ = "meals"
    
    id = Column(Integer, primary_key=True, index=True)
    date = Column(Date, default=func.current_date())
    meal_name = Column(String(255), nullable=False)
    calories = Column(Integer, default=0)
    is_healthy = Column(Boolean, default=True)
    points_earned = Column(Integer, default=0)

class Points(Base):
    __tablename__ = "points"
    
    id = Column(Integer, primary_key=True, index=True)
    total_points = Column(Integer, default=0)
    last_updated = Column(TIMESTAMP, default=func.current_timestamp())