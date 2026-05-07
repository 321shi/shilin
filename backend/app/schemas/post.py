from pydantic import BaseModel, Field
from typing import Optional, List
from datetime import datetime
from uuid import UUID


class PostCreate(BaseModel):
    title: str = Field(..., min_length=1, max_length=255)
    excerpt: Optional[str] = None
    content: str = Field(..., min_length=1)
    cover_image: Optional[str] = Field(None, max_length=500)
    category: Optional[str] = Field(None, max_length=50)
    tags: Optional[List[str]] = []
    is_published: bool = False


class PostUpdate(BaseModel):
    title: Optional[str] = Field(None, min_length=1, max_length=255)
    excerpt: Optional[str] = None
    content: Optional[str] = Field(None, min_length=1)
    cover_image: Optional[str] = Field(None, max_length=500)
    category: Optional[str] = Field(None, max_length=50)
    tags: Optional[List[str]] = None
    is_published: Optional[bool] = None


class AuthorResponse(BaseModel):
    id: UUID
    username: str
    full_name: Optional[str]
    avatar_url: Optional[str]

    class Config:
        from_attributes = True


class PostResponse(BaseModel):
    id: UUID
    title: str
    slug: str
    excerpt: Optional[str]
    content: str
    cover_image: Optional[str]
    category: Optional[str]
    tags: Optional[List[str]]
    author: AuthorResponse
    is_published: bool
    view_count: int
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True


class PostList(BaseModel):
    posts: List[PostResponse]
    total: int
    page: int
    limit: int
