import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, Zap, Star } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';

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
        setError('邮箱或密码不正确!');
      }
    } catch {
      setError('登录失败，请重试!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background font-sans relative overflow-x-hidden flex items-center justify-center p-6">
      {/* 装饰性点点背景 */}
      <div className="fixed inset-0 opacity-20" style={{
        backgroundImage: 'radial-gradient(#1A1A1A 1px, transparent 1px)',
        backgroundSize: '20px 20px'
      }}></div>

      <div className="relative z-10 w-full max-w-lg">
        {/* 装饰元素 */}
        <div className="absolute -top-8 -left-8 w-20 h-20 bg-accent border-4 border-border shadow-comic rotate-[-15deg] flex items-center justify-center">
          <span className="font-comic text-xl text-border">BAM!</span>
        </div>
        <div className="absolute -top-6 -right-6 w-16 h-16 bg-secondary border-4 border-border shadow-comic-sm rotate-[12deg] flex items-center justify-center">
          <Star className="w-8 h-8 text-white" />
        </div>

        <div className="bg-white border-4 border-border shadow-comic p-10 relative">
          <div className="text-center mb-10">
            <div className="inline-block mb-6">
              <div className="w-24 h-24 bg-primary border-4 border-border shadow-comic flex items-center justify-center rotate-[-5deg] mx-auto">
                <span className="text-white font-comic text-5xl">博!</span>
              </div>
            </div>
            <h1 className="text-6xl font-comic text-text mb-3 tracking-wider">
              欢迎回来!
            </h1>
            <p className="text-2xl font-bold text-secondary">
              登录你的博客!
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-7">
            <div>
              <label className="block text-2xl font-comic text-text mb-3 tracking-wide">
                邮箱地址!
              </label>
              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2">
                  <Mail className="w-7 h-7 text-secondary" />
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-14 pr-5 py-4 bg-white border-4 border-border shadow-comic-sm text-xl font-bold text-text focus:outline-none focus:border-secondary focus:shadow-comic transition-all"
                  placeholder="YOUR@EMAIL.COM"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-2xl font-comic text-text mb-3 tracking-wide">
                密码!
              </label>
              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2">
                  <Lock className="w-7 h-7 text-primary" />
                </div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-14 pr-5 py-4 bg-white border-4 border-border shadow-comic-sm text-xl font-bold text-text focus:outline-none focus:border-primary focus:shadow-comic transition-all"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            {error && (
              <div className="bg-primary text-white px-6 py-4 border-4 border-border shadow-comic text-xl font-bold">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-secondary text-white py-5 border-4 border-border shadow-comic font-comic text-3xl tracking-wider hover:translate-x-1 hover:translate-y-1 hover:shadow-comic-sm transition-transform disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
            >
              {loading ? '登录中...' : (
                <>
                  登录!
                  <Zap className="w-8 h-8" />
                </>
              )}
            </button>
          </form>

          <div className="mt-10 text-center">
            <p className="text-xl font-bold text-text">
              还没有账户?{' '}
              <Link
                to="/register"
                className="text-primary font-comic text-2xl hover:underline inline-flex items-center gap-2"
              >
                立即注册!
                <Zap className="w-6 h-6" />
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
