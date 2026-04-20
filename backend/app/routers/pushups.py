from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from .. import models, schemas
from ..database import get_db

router = APIRouter()

def calculate_points(count: int) -> int:
    # 1 очко за каждые 5 отжиманий
    return count // 5

@router.post("/", response_model=schemas.PushupsResponse)
def create_pushups(pushups: schemas.PushupsCreate, db: Session = Depends(get_db)):
    points = calculate_points(pushups.count)
    
    db_pushups = models.Pushups(
        count=pushups.count,
        points_earned=points
    )
    db.add(db_pushups)
    db.commit()
    db.refresh(db_pushups)
    
    # Обновляем общие очки
    points_obj = db.query(models.Points).first()
    if points_obj:
        points_obj.total_points += points
        db.commit()
    
    return db_pushups

@router.get("/", response_model=List[schemas.PushupsResponse])
def get_pushups(db: Session = Depends(get_db)):
    return db.query(models.Pushups).order_by(models.Pushups.date.desc()).all()