from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from typing import List
from . import models, schemas, database
from .routers import running, pushups, meals, points

app = FastAPI(title="Fitness Tracker API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(running.router, prefix="/api/running", tags=["running"])
app.include_router(pushups.router, prefix="/api/pushups", tags=["pushups"])
app.include_router(meals.router, prefix="/api/meals", tags=["meals"])
app.include_router(points.router, prefix="/api/points", tags=["points"])

@app.on_event("startup")
def init_db():
    models.Base.metadata.create_all(bind=database.engine)

@app.get("/")
def root():
    return {"message": "Fitness Tracker API"}