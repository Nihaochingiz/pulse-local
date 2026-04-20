from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from typing import List
from .. import models, schemas
from ..database import get_db

router = APIRouter()

def calculate_points(weight_kg: float, repetitions: int, sets: int) -> int:
    # Расчет очков: вес * повторения * подходы / 10
    total_volume = weight_kg * repetitions * sets
    points = int(total_volume / 10)
    return max(points, 1)  # Минимум 1 очко

@router.post("/", response_model=schemas.DumbbellsResponse)
def create_dumbbells(dumbbells: schemas.DumbbellsCreate, db: Session = Depends(get_db)):
    points = calculate_points(dumbbells.weight_kg, dumbbells.repetitions, dumbbells.sets)
    
    db_dumbbells = models.Dumbbells(
        weight_kg=dumbbells.weight_kg,
        repetitions=dumbbells.repetitions,
        sets=dumbbells.sets,
        points_earned=points
    )
    db.add(db_dumbbells)
    db.commit()
    db.refresh(db_dumbbells)
    
    # Обновляем общие очки
    points_obj = db.query(models.Points).first()
    if points_obj:
        points_obj.total_points += points
        db.commit()
    
    return db_dumbbells

@router.get("/", response_model=List[schemas.DumbbellsResponse])
def get_dumbbells(db: Session = Depends(get_db)):
    return db.query(models.Dumbbells).order_by(models.Dumbbells.date.desc()).all()