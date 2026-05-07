from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.config import settings
from app.database import engine, Base
from app.routers import auth_router, users_router, posts_router

Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="Mr.L Personal Website API",
    description="Backend API for personal website with user authentication and blog posts",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth_router)
app.include_router(users_router)
app.include_router(posts_router)


@app.get("/")
async def root():
    return {"message": "Welcome to Mr.L Personal Website API"}


@app.get("/health")
async def health_check():
    return {"status": "healthy"}
