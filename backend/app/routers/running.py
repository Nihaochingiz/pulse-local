from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from .. import models, schemas
from ..database import get_db

router = APIRouter()

def calculate_points(distance_km: float, duration_minutes: int) -> int:
    # 10 очков за км + бонус за скорость (меньше 6 мин/км -> +5 очков)
    points = int(distance_km * 10)
    if duration_minutes / distance_km < 6:
        points += 5
    return points

@router.post("/", response_model=schemas.RunningResponse)
def create_running(running: schemas.RunningCreate, db: Session = Depends(get_db)):
    points = calculate_points(running.distance_km, running.duration_minutes)
    
    db_running = models.Running(
        distance_km=running.distance_km,
        duration_minutes=running.duration_minutes,
        points_earned=points
    )
    db.add(db_running)
    db.commit()
    db.refresh(db_running)
    
    # Обновляем общие очки
    points_obj = db.query(models.Points).first()
    if points_obj:
        points_obj.total_points += points
        db.commit()
    
    return db_running

@router.get("/", response_model=List[schemas.RunningResponse])
def get_running(db: Session = Depends(get_db)):
    return db.query(models.Running).order_by(models.Running.date.desc()).all()