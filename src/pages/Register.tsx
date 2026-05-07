import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { api } from '@/services/api';

export default function Register() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.username.trim()) {
      newErrors.username = '请输入用户名';
    } else if (formData.username.length < 3) {
      newErrors.username = '用户名至少3个字符';
    }

    if (!formData.email.trim()) {
      newErrors.email = '请输入邮箱';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = '请输入有效的邮箱地址';
    }

    if (!formData.password) {
      newErrors.password = '请输入密码';
    } else if (formData.password.length < 6) {
      newErrors.password = '密码至少6个字符';
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = '两次密码输入不一致';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validate()) return;
    
    setIsLoading(true);
    setErrors({});

    const result = await api.register(
      formData.username,
      formData.email,
      formData.password
    );

    if (result.error) {
      setErrors({ general: result.error });
      setIsLoading(false);
    } else {
      alert('注册成功！请登录');
      navigate('/');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6" style={{ background: 'linear-gradient(135deg, #0f172a 0%, #1e1b4b 50%, #0f172a 100%)' }}>
      <div 
        className="glass p-8 w-full max-w-md"
        style={{
          opacity: 1,
          transform: 'scale(1) translateY(0)',
        }}
      >
        <button
          onClick={() => navigate('/')}
          className="mb-6 text-muted hover:text-primary transition-colors flex items-center gap-2"
        >
          <ArrowLeft size={20} />
          返回登录
        </button>

        <h2 className="text-3xl font-bold mb-2 text-center gradient-text">注册账号</h2>
        <p className="text-muted text-center mb-8">创建你的个人账户</p>

        {errors.general && (
          <div className="bg-red-500/10 border border-red-500/30 text-red-500 px-4 py-3 rounded-xl text-sm mb-6 text-center">
            {errors.general}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="username" className="block text-sm font-medium mb-2">
              用户名
            </label>
            <input
              type="text"
              id="username"
              value={formData.username}
              onChange={(e) => setFormData({ ...formData, username: e.target.value })}
              className={`w-full px-4 py-3 bg-surface/50 border rounded-xl focus:ring-2 focus:ring-primary/20 outline-none transition-all ${
                errors.username ? 'border-red-500' : 'border-border focus:border-primary'
              }`}
              placeholder="请输入用户名"
              disabled={isLoading}
            />
            {errors.username && (
              <p className="text-red-500 text-sm mt-1">{errors.username}</p>
            )}
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-2">
              邮箱
            </label>
            <input
              type="email"
              id="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className={`w-full px-4 py-3 bg-surface/50 border rounded-xl focus:ring-2 focus:ring-primary/20 outline-none transition-all ${
                errors.email ? 'border-red-500' : 'border-border focus:border-primary'
              }`}
              placeholder="example@email.com"
              disabled={isLoading}
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email}</p>
            )}
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium mb-2">
              密码
            </label>
            <input
              type="password"
              id="password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              className={`w-full px-4 py-3 bg-surface/50 border rounded-xl focus:ring-2 focus:ring-primary/20 outline-none transition-all ${
                errors.password ? 'border-red-500' : 'border-border focus:border-primary'
              }`}
              placeholder="请输入密码"
              disabled={isLoading}
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password}</p>
            )}
          </div>

          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium mb-2">
              确认密码
            </label>
            <input
              type="password"
              id="confirmPassword"
              value={formData.confirmPassword}
              onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
              className={`w-full px-4 py-3 bg-surface/50 border rounded-xl focus:ring-2 focus:ring-primary/20 outline-none transition-all ${
                errors.confirmPassword ? 'border-red-500' : 'border-border focus:border-primary'
              }`}
              placeholder="请再次输入密码"
              disabled={isLoading}
            />
            {errors.confirmPassword && (
              <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full px-8 py-4 bg-gradient-to-r from-primary to-secondary text-white rounded-xl font-semibold hover:opacity-90 transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? '注册中...' : '注册'}
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-muted">
          已有账号？
          <a href="/" onClick={(e) => { e.preventDefault(); navigate('/'); }} className="text-primary hover:underline ml-1">
            立即登录
          </a>
        </div>
      </div>
    </div>
  );
}
