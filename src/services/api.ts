const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

interface ApiResponse<T = any> {
  data?: T;
  error?: string;
}

const DEFAULT_ADMIN_USER = {
  id: 'admin-' + Math.random().toString(36).substr(2, 9),
  username: 'admin',
  email: 'admin@mrl.com',
  full_name: '管理员',
  bio: '我是网站管理员',
  avatar_url: '',
  is_active: true,
  created_at: new Date().toISOString()
};

const DEFAULT_ADMIN_PASSWORD = '123456';

class ApiService {
  private baseUrl: string;

  constructor(baseUrl: string = API_BASE_URL) {
    this.baseUrl = baseUrl;
    this.initDefaultAdmin();
  }

  private initDefaultAdmin() {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const hasAdmin = users.find((u: any) => u.username === 'admin');
    
    if (!hasAdmin) {
      users.push({
        ...DEFAULT_ADMIN_USER,
        password: DEFAULT_ADMIN_PASSWORD
      });
      localStorage.setItem('users', JSON.stringify(users));
    }
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    try {
      const token = localStorage.getItem('access_token');
      
      const headers: HeadersInit = {
        'Content-Type': 'application/json',
        ...(token && { Authorization: `Bearer ${token}` }),
        ...options.headers,
      };

      const response = await fetch(`${this.baseUrl}${endpoint}`, {
        ...options,
        headers,
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.detail || `HTTP error! status: ${response.status}`);
      }

      if (response.status === 204) {
        return { data: undefined };
      }

      const data = await response.json();
      return { data };
    } catch (error) {
      return {
        error: error instanceof Error ? error.message : 'An error occurred',
      };
    }
  }

  async register(username: string, email: string, password: string, fullName?: string) {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    
    if (users.find((u: any) => u.username === username)) {
      return { error: '用户名已存在' };
    }
    
    if (users.find((u: any) => u.email === email)) {
      return { error: '邮箱已被注册' };
    }

    const newUser = {
      id: Math.random().toString(36).substr(2, 9),
      username,
      email,
      password,
      full_name: fullName || '',
      bio: '',
      avatar_url: '',
      is_active: true,
      created_at: new Date().toISOString()
    };

    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));

    return { data: { message: '注册成功' } };
  }

  async login(username: string, password: string) {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const user = users.find((u: any) => 
      (u.username === username || u.email === username) && u.password === password
    );

    if (!user) {
      return { error: '用户名或密码错误' };
    }

    if (!user.is_active) {
      return { error: '账号已被禁用' };
    }

    const accessToken = 'token-' + Math.random().toString(36).substr(2, 16);
    const refreshToken = 'refresh-' + Math.random().toString(36).substr(2, 16);
    
    localStorage.setItem('access_token', accessToken);
    localStorage.setItem('refresh_token', refreshToken);
    localStorage.setItem('current_user', JSON.stringify({
      id: user.id,
      username: user.username,
      email: user.email,
      full_name: user.full_name,
      bio: user.bio,
      avatar_url: user.avatar_url,
      is_active: user.is_active,
      created_at: user.created_at
    }));

    return {
      data: {
        access_token: accessToken,
        refresh_token: refreshToken,
        token_type: 'bearer',
        expires_in: 3600
      }
    };
  }

  async refreshToken() {
    const refreshToken = localStorage.getItem('refresh_token');
    if (!refreshToken) {
      return { error: 'No refresh token' };
    }

    const newAccessToken = 'token-' + Math.random().toString(36).substr(2, 16);
    localStorage.setItem('access_token', newAccessToken);
    
    return {
      data: {
        access_token: newAccessToken,
        expires_in: 3600
      }
    };
  }

  async logout() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('current_user');
    return { data: { message: 'Logged out successfully' } };
  }

  async getCurrentUser() {
    const token = localStorage.getItem('access_token');
    if (!token) {
      return { error: 'Not authenticated' };
    }

    const currentUser = localStorage.getItem('current_user');
    if (!currentUser) {
      return { error: 'User not found' };
    }

    try {
      return { data: JSON.parse(currentUser) };
    } catch {
      return { error: 'Invalid user data' };
    }
  }

  async updateUser(data: { full_name?: string; bio?: string; avatar_url?: string }) {
    const currentUser = localStorage.getItem('current_user');
    if (!currentUser) {
      return { error: 'Not authenticated' };
    }

    const user = JSON.parse(currentUser);
    const updatedUser = { ...user, ...data };
    
    localStorage.setItem('current_user', JSON.stringify(updatedUser));
    
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const userIndex = users.findIndex((u: any) => u.id === user.id);
    if (userIndex !== -1) {
      users[userIndex] = { ...users[userIndex], ...data };
      localStorage.setItem('users', JSON.stringify(users));
    }

    return { data: updatedUser };
  }

  async getPosts(params?: { page?: number; limit?: number; category?: string; tag?: string }) {
    const posts = JSON.parse(localStorage.getItem('posts') || '[]');
    const publishedPosts = posts.filter((p: any) => p.is_published);
    
    let filteredPosts = publishedPosts;
    if (params?.category) {
      filteredPosts = filteredPosts.filter((p: any) => p.category === params.category);
    }
    if (params?.tag) {
      filteredPosts = filteredPosts.filter((p: any) => p.tags?.includes(params.tag));
    }

    const page = params?.page || 1;
    const limit = params?.limit || 10;
    const start = (page - 1) * limit;
    const end = start + limit;

    return {
      data: {
        posts: filteredPosts.slice(start, end),
        total: filteredPosts.length,
        page,
        limit
      }
    };
  }

  async getPost(slug: string) {
    const posts = JSON.parse(localStorage.getItem('posts') || '[]');
    const post = posts.find((p: any) => p.slug === slug && p.is_published);
    
    if (!post) {
      return { error: '文章不存在' };
    }

    return { data: post };
  }

  async createPost(data: {
    title: string;
    excerpt?: string;
    content: string;
    cover_image?: string;
    category?: string;
    tags?: string[];
    is_published?: boolean;
  }) {
    const token = localStorage.getItem('access_token');
    if (!token) {
      return { error: '请先登录' };
    }

    const currentUser = localStorage.getItem('current_user');
    if (!currentUser) {
      return { error: '用户未登录' };
    }

    const user = JSON.parse(currentUser);
    const slug = data.title.toLowerCase().replace(/[^\w\s-]/g, '').replace(/[-\s]+/g, '-');
    
    const newPost = {
      id: Math.random().toString(36).substr(2, 9),
      ...data,
      slug: slug + '-' + Date.now(),
      author_id: user.id,
      author: {
        id: user.id,
        username: user.username,
        full_name: user.full_name,
        avatar_url: user.avatar_url
      },
      view_count: 0,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };

    const posts = JSON.parse(localStorage.getItem('posts') || '[]');
    posts.unshift(newPost);
    localStorage.setItem('posts', JSON.stringify(posts));

    return { data: newPost };
  }

  async updatePost(id: string, data: Partial<{
    title: string;
    excerpt: string;
    content: string;
    cover_image: string;
    category: string;
    tags: string[];
    is_published: boolean;
  }>) {
    const token = localStorage.getItem('access_token');
    if (!token) {
      return { error: '请先登录' };
    }

    const posts = JSON.parse(localStorage.getItem('posts') || '[]');
    const postIndex = posts.findIndex((p: any) => p.id === id);
    
    if (postIndex === -1) {
      return { error: '文章不存在' };
    }

    posts[postIndex] = { ...posts[postIndex], ...data, updated_at: new Date().toISOString() };
    localStorage.setItem('posts', JSON.stringify(posts));

    return { data: posts[postIndex] };
  }

  async deletePost(id: string) {
    const token = localStorage.getItem('access_token');
    if (!token) {
      return { error: '请先登录' };
    }

    const posts = JSON.parse(localStorage.getItem('posts') || '[]');
    const postIndex = posts.findIndex((p: any) => p.id === id);
    
    if (postIndex === -1) {
      return { error: '文章不存在' };
    }

    posts.splice(postIndex, 1);
    localStorage.setItem('posts', JSON.stringify(posts));

    return { data: { message: '删除成功' } };
  }
}

export const api = new ApiService();
export default api;