# 个人网站后端开发计划

## 一、项目概述

### 1.1 目标
为个人网站创建 Python/FastAPI 后端，实现用户认证、文章管理等功能，使用云 PostgreSQL 数据库。

### 1.2 技术栈
- **框架**：FastAPI（Python）
- **数据库**：PostgreSQL（云数据库，如 Supabase/Neon）
- **ORM**：SQLAlchemy + Alembic
- **认证**：JWT Token
- **部署**：Railway/Render（免费托管）

### 1.3 核心功能
1. **用户认证**
   - 用户注册（用户名、邮箱、密码）
   - 用户登录（JWT Token）
   - Token 刷新
   - 密码加密存储

2. **文章管理**（可选扩展）
   - 创建文章
   - 获取文章列表
   - 获取单个文章
   - 更新/删除文章

3. **用户信息**
   - 获取用户资料
   - 更新用户资料

---

## 二、项目结构

```
backend/
├── app/
│   ├── __init__.py
│   ├── main.py              # FastAPI 应用入口
│   ├── config.py             # 配置管理
│   ├── database.py           # 数据库连接
│   ├── models/
│   │   ├── __init__.py
│   │   ├── user.py          # 用户模型
│   │   └── post.py          # 文章模型
│   ├── schemas/
│   │   ├── __init__.py
│   │   ├── user.py          # 用户 Pydantic 模型
│   │   └── post.py          # 文章 Pydantic 模型
│   ├── routers/
│   │   ├── __init__.py
│   │   ├── auth.py          # 认证路由
│   │   ├── users.py         # 用户路由
│   │   └── posts.py         # 文章路由
│   ├── utils/
│   │   ├── __init__.py
│   │   ├── auth.py          # 认证工具
│   │   └── security.py      # 安全工具
│   └── dependencies.py      # 依赖注入
├── tests/
│   └── ...
├── .env.example              # 环境变量示例
├── requirements.txt          # Python 依赖
├── Dockerfile               # Docker 配置
└── README.md
```

---

## 三、数据库设计

### 3.1 用户表（users）
```sql
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    hashed_password VARCHAR(255) NOT NULL,
    full_name VARCHAR(100),
    bio TEXT,
    avatar_url VARCHAR(500),
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### 3.2 文章表（posts）
```sql
CREATE TABLE posts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    excerpt TEXT,
    content TEXT NOT NULL,
    cover_image VARCHAR(500),
    category VARCHAR(50),
    tags JSONB,
    author_id UUID REFERENCES users(id),
    is_published BOOLEAN DEFAULT false,
    view_count INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### 3.3 刷新令牌表（refresh_tokens）
```sql
CREATE TABLE refresh_tokens (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    token VARCHAR(500) NOT NULL,
    expires_at TIMESTAMP NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

---

## 四、API 设计

### 4.1 认证接口

#### POST /api/auth/register
注册新用户
```json
Request:
{
  "username": "string",
  "email": "string",
  "password": "string",
  "full_name": "string (optional)"
}

Response (201):
{
  "id": "uuid",
  "username": "string",
  "email": "string",
  "message": "User registered successfully"
}
```

#### POST /api/auth/login
用户登录
```json
Request:
{
  "username": "string",
  "password": "string"
}

Response (200):
{
  "access_token": "string",
  "refresh_token": "string",
  "token_type": "bearer",
  "expires_in": 3600
}
```

#### POST /api/auth/refresh
刷新 Access Token
```json
Request:
{
  "refresh_token": "string"
}

Response (200):
{
  "access_token": "string",
  "expires_in": 3600
}
```

#### POST /api/auth/logout
用户登出
```json
Request:
Headers: Authorization: Bearer <token>

Response (200):
{
  "message": "Logged out successfully"
}
```

### 4.2 用户接口

#### GET /api/users/me
获取当前用户信息
```json
Response (200):
{
  "id": "uuid",
  "username": "string",
  "email": "string",
  "full_name": "string",
  "bio": "string",
  "avatar_url": "string",
  "created_at": "datetime"
}
```

#### PUT /api/users/me
更新用户信息
```json
Request:
{
  "full_name": "string",
  "bio": "string",
  "avatar_url": "string"
}

Response (200):
{
  "id": "uuid",
  "username": "string",
  "email": "string",
  "full_name": "string",
  "bio": "string",
  "avatar_url": "string"
}
```

### 4.3 文章接口

#### GET /api/posts
获取文章列表
```json
Query Parameters:
- page: int (default: 1)
- limit: int (default: 10)
- category: string (optional)
- tag: string (optional)

Response (200):
{
  "posts": [...],
  "total": 100,
  "page": 1,
  "limit": 10
}
```

#### GET /api/posts/{slug}
获取单个文章
```json
Response (200):
{
  "id": "uuid",
  "title": "string",
  "slug": "string",
  "excerpt": "string",
  "content": "string",
  "cover_image": "string",
  "category": "string",
  "tags": ["string"],
  "author": {...},
  "view_count": 0,
  "created_at": "datetime"
}
```

#### POST /api/posts (需要认证)
创建文章
```json
Request:
{
  "title": "string",
  "excerpt": "string",
  "content": "string",
  "cover_image": "string",
  "category": "string",
  "tags": ["string"],
  "is_published": false
}

Response (201):
{
  "id": "uuid",
  "title": "string",
  "slug": "string",
  ...
}
```

#### PUT /api/posts/{id} (需要认证)
更新文章

#### DELETE /api/posts/{id} (需要认证)
删除文章

---

## 五、安全措施

### 5.1 密码安全
- 使用 bcrypt 加密
- 密码强度验证
- 密码重置功能（未来扩展）

### 5.2 JWT 安全
- Access Token：1小时有效期
- Refresh Token：7天有效期
- Token 黑名单机制

### 5.3 API 安全
- CORS 配置
- 请求限流
- SQL 注入防护
- XSS 防护

---

## 六、实现步骤

### 步骤 1：项目初始化
- [ ] 创建 backend 目录结构
- [ ] 创建 requirements.txt
- [ ] 创建 .env.example
- [ ] 创建基础配置文件

### 步骤 2：数据库配置
- [ ] 设置数据库连接
- [ ] 创建 SQLAlchemy 模型
- [ ] 创建 Alembic 配置
- [ ] 创建数据库迁移

### 步骤 3：用户认证
- [ ] 实现密码加密工具
- [ ] 实现 JWT 工具
- [ ] 创建用户注册接口
- [ ] 创建用户登录接口
- [ ] 创建 Token 刷新接口
- [ ] 创建登出接口

### 步骤 4：用户管理
- [ ] 获取用户信息接口
- [ ] 更新用户信息接口

### 步骤 5：文章管理
- [ ] 创建文章模型
- [ ] 创建文章 CRUD 接口
- [ ] 实现文章列表分页
- [ ] 实现文章搜索/过滤

### 步骤 6：测试
- [ ] 编写单元测试
- [ ] API 端点测试
- [ ] 数据库测试

### 步骤 7：部署准备
- [ ] 创建 Dockerfile
- [ ] 配置 Gunicorn
- [ ] 准备部署配置

---

## 七、环境变量配置

```env
# Database
DATABASE_URL=postgresql://user:password@host:5432/dbname

# JWT
SECRET_KEY=your-secret-key-here
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=60
REFRESH_TOKEN_EXPIRE_DAYS=7

# CORS
ALLOWED_ORIGINS=http://localhost:5173,https://yourdomain.com

# Server
HOST=0.0.0.0
PORT=8000
```

---

## 八、部署流程

### 8.1 Railway 部署（推荐）
1. 连接 GitHub 仓库
2. 配置环境变量
3. 自动检测 Python 项目
4. 部署完成获得 URL

### 8.2 Render 部署
1. 创建 Web Service
2. 连接 GitHub
3. 配置构建命令：`pip install -r requirements.txt`
4. 配置启动命令：`gunicorn app.main:app`
5. 配置环境变量

### 8.3 前端配置
在 `.env` 文件中添加：
```env
VITE_API_URL=https://your-backend-url.railway.app/api
```

---

## 九、验收标准

### 9.1 功能性
- [ ] 用户可以注册新账号
- [ ] 用户可以登录并获得 Token
- [ ] 用户可以访问受保护的接口
- [ ] Token 可以正常刷新
- [ ] 用户可以登出

### 9.2 安全性
- [ ] 密码正确加密存储
- [ ] JWT Token 验证正常
- [ ] SQL 注入防护有效
- [ ] CORS 配置正确

### 9.3 性能
- [ ] API 响应时间 < 500ms
- [ ] 数据库查询优化
- [ ] 无内存泄漏

### 9.4 部署
- [ ] 后端成功部署到云平台
- [ ] 数据库连接正常
- [ ] 前端正确调用后端 API
