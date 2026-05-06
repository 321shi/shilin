import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, Mail, Lock, Zap, Sparkles } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { register } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('两次输入的密码不一致!');
      return;
    }

    if (password.length < 6) {
      setError('密码至少需要 6 个字符!');
      return;
    }

    setLoading(true);

    try {
      const success = await register(name, email, password);
      if (success) {
        navigate('/');
      } else {
        setError('该邮箱已被注册!');
      }
    } catch {
      setError('注册失败，请重试!');
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
        <div className="absolute -top-8 -right-8 w-20 h-20 bg-accent border-4 border-border shadow-comic rotate-[15deg] flex items-center justify-center">
          <span className="font-comic text-xl text-border">POW!</span>
        </div>
        <div className="absolute -top-6 -left-6 w-16 h-16 bg-primary border-4 border-border shadow-comic-sm rotate-[-12deg] flex items-center justify-center">
          <Sparkles className="w-8 h-8 text-white" />
        </div>

        <div className="bg-white border-4 border-border shadow-comic p-10 relative">
          <div className="text-center mb-10">
            <div className="inline-block mb-6">
              <div className="w-24 h-24 bg-secondary border-4 border-border shadow-comic flex items-center justify-center rotate-[5deg] mx-auto">
                <span className="text-white font-comic text-5xl">客!</span>
              </div>
            </div>
            <h1 className="text-6xl font-comic text-text mb-3 tracking-wider">
              创建账户!
            </h1>
            <p className="text-2xl font-bold text-primary">
              开始你的博客之旅!
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-7">
            <div>
              <label className="block text-2xl font-comic text-text mb-3 tracking-wide">
                你的名字!
              </label>
              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2">
                  <User className="w-7 h-7 text-primary" />
                </div>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full pl-14 pr-5 py-4 bg-white border-4 border-border shadow-comic-sm text-xl font-bold text-text focus:outline-none focus:border-primary focus:shadow-comic transition-all"
                  placeholder="YOUR NAME"
                  required
                />
              </div>
            </div>

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

            <div>
              <label className="block text-2xl font-comic text-text mb-3 tracking-wide">
                确认密码!
              </label>
              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2">
                  <Lock className="w-7 h-7 text-secondary" />
                </div>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full pl-14 pr-5 py-4 bg-white border-4 border-border shadow-comic-sm text-xl font-bold text-text focus:outline-none focus:border-secondary focus:shadow-comic transition-all"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            {error && (
              <div className="bg-accent text-text px-6 py-4 border-4 border-border shadow-comic text-xl font-bold">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-primary text-text py-5 border-4 border-border shadow-comic font-comic text-3xl tracking-wider hover:translate-x-1 hover:translate-y-1 hover:shadow-comic-sm transition-transform disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? '注册中...' : '创建账户!'}
            </button>
          </form>

          <div className="mt-10 text-center">
            <p className="text-xl font-bold text-text">
              已有账户?{' '}
              <Link
                to="/login"
                className="text-secondary font-comic text-2xl hover:underline inline-flex items-center gap-2"
              >
                <Zap className="w-6 h-6" />
                返回登录!
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
