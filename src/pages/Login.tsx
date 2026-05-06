import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { LineDog, LinePaw, LineHeart, LineStar, DoodleDecor } from '@/components/CuteDecorations';

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
    <div className="min-h-screen bg-white font-sans flex items-center justify-center p-6 relative overflow-hidden line-bg">
      <div className="absolute top-8 left-8 opacity-30 bounce-sketch">
        <LinePaw size={60} />
      </div>
      <div className="absolute top-16 right-12 opacity-20 sketch-animation">
        <LineHeart size={45} />
      </div>
      <div className="absolute bottom-16 left-16 opacity-25 bounce-sketch" style={{ animationDelay: '0.6s' }}>
        <LineStar size={40} />
      </div>
      <div className="absolute bottom-8 right-8 opacity-30 sketch-animation" style={{ animationDelay: '1s' }}>
        <LinePaw size={55} />
      </div>
      <div className="absolute top-1/2 right-4 w-40 h-40 opacity-10">
        <DoodleDecor />
      </div>
      <div className="absolute bottom-1/3 left-4 w-32 h-32 opacity-8">
        <DoodleDecor />
      </div>

      <div className="w-full max-w-md relative z-10">
        <div className="bg-white border-3 border-black rounded-2xl hand-drawn-shadow p-8 relative">
          <div className="absolute -top-14 left-1/2 transform -translate-x-1/2">
            <div className="bounce-sketch">
              <LineDog size={130} />
            </div>
          </div>

          <div className="text-center mb-8 pt-12">
            <h1 className="text-4xl font-bold text-black mb-2 wiggle-line inline-block">欢迎回来~</h1>
            <p className="text-xl text-gray-500 mt-4">登录你的博客，继续记录生活 ✏️</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-lg font-semibold text-black mb-2 ml-1">邮箱地址</label>
              <div className="relative">
                <Mail className="absolute left-5 top-1/2 -translate-y-1/2 w-6 h-6 text-gray-500" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-14 pr-5 py-4 bg-gray-100 border-3 border-black rounded-xl text-black placeholder-gray-400 focus:outline-none focus:border-black transition-all text-xl"
                  placeholder="your@email.com"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-lg font-semibold text-black mb-2 ml-1">密码</label>
              <div className="relative">
                <Lock className="absolute left-5 top-1/2 -translate-y-1/2 w-6 h-6 text-gray-500" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-14 pr-5 py-4 bg-gray-100 border-3 border-black rounded-xl text-black placeholder-gray-400 focus:outline-none focus:border-black transition-all text-xl"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            {error && (
              <div className="bg-gray-100 border-3 border-black text-black px-5 py-3 rounded-xl text-lg font-semibold">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-black text-white py-4 rounded-xl font-bold text-2xl hover:bg-gray-800 transition-all disabled:opacity-50 disabled:cursor-not-allowed hand-drawn-shadow"
            >
              {loading ? '登录中...' : '登录 ✨'}
            </button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-xl text-gray-500">
              还没有账户？{' '}
              <Link
                to="/register"
                className="text-black font-bold hover:text-gray-600 transition-colors text-2xl underline"
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
