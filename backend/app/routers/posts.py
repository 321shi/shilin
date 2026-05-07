from fastapi import APIRouter, Depends, HTTPException, status, Query
from sqlalchemy.orm import Session
from sqlalchemy import desc
from typing import Optional
from uuid import UUID
import re
from app.database import get_db
from app.models.user import User
from app.models.post import Post
from app.schemas.post import PostCreate, PostUpdate, PostResponse, PostList
from app.utils.auth import get_current_active_user

router = APIRouter(prefix="/api/posts", tags=["Posts"])


def slugify(text: str) -> str:
    text = text.lower()
    text = re.sub(r'[^\w\s-]', '', text)
    text = re.sub(r'[-\s]+', '-', text)
    return text.strip('-')


def create_unique_slug(title: str, db: Session) -> str:
    base_slug = slugify(title)
    slug = base_slug
    counter = 1
    
    while db.query(Post).filter(Post.slug == slug).first():
        slug = f"{base_slug}-{counter}"
        counter += 1
    
    return slug


@router.get("", response_model=PostList)
async def get_posts(
    page: int = Query(1, ge=1),
    limit: int = Query(10, ge=1, le=100),
    category: Optional[str] = None,
    tag: Optional[str] = None,
    db: Session = Depends(get_db)
):
    query = db.query(Post).filter(Post.is_published == True)
    
    if category:
        query = query.filter(Post.category == category)
    
    if tag:
        query = query.filter(Post.tags.contains([tag]))
    
    total = query.count()
    
    posts = query.order_by(desc(Post.created_at)) \
        .offset((page - 1) * limit) \
        .limit(limit) \
        .all()
    
    return {
        "posts": posts,
        "total": total,
        "page": page,
        "limit": limit
    }


@router.get("/{slug}", response_model=PostResponse)
async def get_post(slug: str, db: Session = Depends(get_db)):
    post = db.query(Post).filter(
        Post.slug == slug,
        Post.is_published == True
    ).first()
    
    if not post:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Post not found"
        )
    
    post.view_count += 1
    db.commit()
    db.refresh(post)
    
    return post


@router.post("", response_model=PostResponse, status_code=status.HTTP_201_CREATED)
async def create_post(
    post_data: PostCreate,
    current_user: User = Depends(get_current_active_user),
    db: Session = Depends(get_db)
):
    slug = create_unique_slug(post_data.title, db)
    
    post = Post(
        title=post_data.title,
        slug=slug,
        excerpt=post_data.excerpt,
        content=post_data.content,
        cover_image=post_data.cover_image,
        category=post_data.category,
        tags=post_data.tags,
        author_id=current_user.id,
        is_published=post_data.is_published
    )
    
    db.add(post)
    db.commit()
    db.refresh(post)
    
    return post


@router.put("/{post_id}", response_model=PostResponse)
async def update_post(
    post_id: UUID,
    post_data: PostUpdate,
    current_user: User = Depends(get_current_active_user),
    db: Session = Depends(get_db)
):
    post = db.query(Post).filter(
        Post.id == post_id,
        Post.author_id == current_user.id
    ).first()
    
    if not post:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Post not found or you don't have permission to edit it"
        )
    
    if post_data.title is not None:
        post.title = post_data.title
    if post_data.excerpt is not None:
        post.excerpt = post_data.excerpt
    if post_data.content is not None:
        post.content = post_data.content
    if post_data.cover_image is not None:
        post.cover_image = post_data.cover_image
    if post_data.category is not None:
        post.category = post_data.category
    if post_data.tags is not None:
        post.tags = post_data.tags
    if post_data.is_published is not None:
        post.is_published = post_data.is_published
    
    db.commit()
    db.refresh(post)
    
    return post


@router.delete("/{post_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_post(
    post_id: UUID,
    current_user: User = Depends(get_current_active_user),
    db: Session = Depends(get_db)
):
    post = db.query(Post).filter(
        Post.id == post_id,
        Post.author_id == current_user.id
    ).first()
    
    if not post:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Post not found or you don't have permission to delete it"
        )
    
    db.delete(post)
    db.commit()
