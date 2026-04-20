from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from .. import models, schemas
from ..database import get_db

router = APIRouter()

@router.get("/", response_model=schemas.PointsResponse)
def get_points(db: Session = Depends(get_db)):
    points_obj = db.query(models.Points).first()
    if not points_obj:
        points_obj = models.Points(total_points=0)
        db.add(points_obj)
        db.commit()
    return points_obj

@router.post("/reset")
def reset_points(db: Session = Depends(get_db)):
    points_obj = db.query(models.Points).first()
    if points_obj:
        points_obj.total_points = 0
        db.commit()
    return {"message": "Points reset successfully"}