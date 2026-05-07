# Mr.L Personal Website Backend

基于 FastAPI + PostgreSQL 的后端 API 服务。

## 功能特性

- ✅ 用户注册与登录（JWT 认证）
- ✅ 用户信息管理
- ✅ 文章管理（CRUD）
- ✅ Token 刷新机制
- ✅ PostgreSQL 数据库

## 快速开始

### 1. 环境要求

- Python 3.11+
- PostgreSQL 数据库

### 2. 安装依赖

```bash
cd backend
pip install -r requirements.txt
```

### 3. 配置环境变量

复制 `.env.example` 为 `.env`，并配置数据库连接：

```env
DATABASE_URL=postgresql://user:password@localhost:5432/mrl_website
SECRET_KEY=your-super-secret-key
ALLOWED_ORIGINS=http://localhost:5173
```

### 4. 启动服务

```bash
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

服务将在 http://localhost:8000 启动

API 文档：http://localhost:8000/docs

## API 端点

### 认证
- `POST /api/auth/register` - 用户注册
- `POST /api/auth/login` - 用户登录
- `POST /api/auth/refresh` - 刷新 Token
- `POST /api/auth/logout` - 用户登出

### 用户
- `GET /api/users/me` - 获取当前用户信息
- `PUT /api/users/me` - 更新用户信息

### 文章
- `GET /api/posts` - 获取文章列表
- `GET /api/posts/{slug}` - 获取单个文章
- `POST /api/posts` - 创建文章（需认证）
- `PUT /api/posts/{id}` - 更新文章（需认证）
- `DELETE /api/posts/{id}` - 删除文章（需认证）

## Docker 部署

```bash
docker build -t mrl-backend .
docker run -p 8000:8000 --env-file .env mrl-backend
```

## 目录结构

```
backend/
├── app/
│   ├── models/          # SQLAlchemy 模型
│   ├── schemas/         # Pydantic 模型
│   ├── routers/         # API 路由
│   ├── utils/           # 工具函数
│   ├── config.py        # 配置
│   ├── database.py      # 数据库连接
│   └── main.py          # 应用入口
├── requirements.txt     # 依赖
├── Dockerfile          # Docker 配置
└── README.md
```

## 许可证

MIT License
