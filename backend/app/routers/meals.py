from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from .. import models, schemas
from ..database import get_db

router = APIRouter()

def calculate_points(calories: int, is_healthy: bool) -> int:
    points = 0
    if is_healthy:
        points = max(0, 10 - calories // 100)  # Чем меньше калорий, тем больше очков
        points = min(points, 10)  # Максимум 10 очков
    else:
        points = -5  # Штраф за нездоровую еду
    return points

@router.post("/", response_model=schemas.MealsResponse)
def create_meal(meal: schemas.MealsCreate, db: Session = Depends(get_db)):
    points = calculate_points(meal.calories, meal.is_healthy)
    
    db_meal = models.Meals(
        meal_name=meal.meal_name,
        calories=meal.calories,
        is_healthy=meal.is_healthy,
        points_earned=points
    )
    db.add(db_meal)
    db.commit()
    db.refresh(db_meal)
    
    # Обновляем общие очки
    points_obj = db.query(models.Points).first()
    if points_obj:
        points_obj.total_points += points
        db.commit()
    
    return db_meal

@router.get("/", response_model=List[schemas.MealsResponse])
def get_meals(db: Session = Depends(get_db)):
    return db.query(models.Meals).order_by(models.Meals.date.desc()).all()