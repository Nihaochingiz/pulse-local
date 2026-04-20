from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from . import models, database
from .routers import running, pushups, dumbbells, meals, points

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
app.include_router(dumbbells.router, prefix="/api/dumbbells", tags=["dumbbells"])
app.include_router(meals.router, prefix="/api/meals", tags=["meals"])
app.include_router(points.router, prefix="/api/points", tags=["points"])

@app.on_event("startup")
def init_db():
    models.Base.metadata.create_all(bind=database.engine)

@app.get("/")
def root():
    return {"message": "Fitness Tracker API"}