from pydantic import BaseModel
from datetime import date
from typing import Optional

class RunningBase(BaseModel):
    distance_km: float
    duration_minutes: int

class RunningCreate(RunningBase):
    pass

class RunningResponse(RunningBase):
    id: int
    date: date
    points_earned: int
    
    class Config:
        from_attributes = True

class PushupsBase(BaseModel):
    count: int

class PushupsCreate(PushupsBase):
    pass

class PushupsResponse(PushupsBase):
    id: int
    date: date
    points_earned: int
    
    class Config:
        from_attributes = True

class DumbbellsBase(BaseModel):
    weight_kg: float
    repetitions: int
    sets: int

class DumbbellsCreate(DumbbellsBase):
    pass

class DumbbellsResponse(DumbbellsBase):
    id: int
    date: date
    points_earned: int
    
    class Config:
        from_attributes = True

class MealsBase(BaseModel):
    meal_name: str
    calories: Optional[int] = 0
    is_healthy: bool = True

class MealsCreate(MealsBase):
    pass

class MealsResponse(MealsBase):
    id: int
    date: date
    points_earned: int
    
    class Config:
        from_attributes = True

class PointsResponse(BaseModel):
    total_points: int
    
    class Config:
        from_attributes = True