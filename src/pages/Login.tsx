import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { CuteDog, PawPrint, Heart, Star } from '@/components/CuteDecorations';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const success = await login(email, password);
      if (success) {
        navigate('/');
      } else {
        setError('邮箱或密码不正确');
      }
    } catch {
      setError('登录失败，请重试');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background font-sans flex items-center justify-center p-6 relative overflow-hidden">
      <div className="absolute top-10 left-10 float">
        <PawPrint size={40} />
      </div>
      <div className="absolute top-20 right-20 bounce-soft">
        <Heart size={30} />
      </div>
      <div className="absolute bottom-20 left-20 bounce-soft" style={{ animationDelay: '0.5s' }}>
        <Star size={25} />
      </div>
      <div className="absolute bottom-10 right-10 float" style={{ animationDelay: '1s' }}>
        <PawPrint size={35} />
      </div>

      <div className="w-full max-w-md relative z-10">
        <div className="bg-surface border-2 border-border rounded-3xl shadow-cute p-8 relative">
          <div className="absolute -top-12 left-1/2 transform -translate-x-1/2">
            <div className="float">
              <CuteDog size={90} />
            </div>
          </div>

          <div className="text-center mb-8 pt-8">
            <h1 className="text-3xl font-extrabold text-text mb-2">欢迎回来！</h1>
            <p className="text-muted">登录你的博客，继续记录生活 🐾</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-bold text-text mb-2 ml-1">邮箱地址</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 bg-accent/30 border-2 border-border rounded-2xl text-text placeholder-muted focus:outline-none focus:ring-4 focus:ring-primary/20 focus:border-primary transition-all"
                  placeholder="your@email.com"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-text mb-2 ml-1">密码</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 bg-accent/30 border-2 border-border rounded-2xl text-text placeholder-muted focus:outline-none focus:ring-4 focus:ring-primary/20 focus:border-primary transition-all"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            {error && (
              <div className="bg-red-50 border-2 border-red-200 text-red-600 px-4 py-3 rounded-2xl text-sm font-semibold">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-primary to-secondary text-white py-4 rounded-2xl font-bold text-lg hover:opacity-90 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-soft hover:shadow-cute transform hover:-translate-y-0.5"
            >
              {loading ? '登录中...' : '登录 ✨'}
            </button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-muted">
              还没有账户？{' '}
              <Link
                to="/register"
                className="text-primary font-bold hover:underline"
              >
                立即注册 💕
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
