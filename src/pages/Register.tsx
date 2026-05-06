import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, Mail, Lock } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { LineDog, LinePaw, LineHeart, LineStar, LineBone, DoodleDecor } from '@/components/CuteDecorations';

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
      setError('两次输入的密码不一致');
      return;
    }

    if (password.length < 6) {
      setError('密码至少需要 6 个字符');
      return;
    }

    setLoading(true);

    try {
      const success = await register(name, email, password);
      if (success) {
        navigate('/');
      } else {
        setError('该邮箱已被注册');
      }
    } catch {
      setError('注册失败，请重试');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white font-sans flex items-center justify-center p-6 relative overflow-hidden line-bg">
      <div className="absolute top-10 right-10 opacity-25 bounce-sketch">
        <LineBone size={60} />
      </div>
      <div className="absolute top-20 left-16 opacity-30 sketch-animation">
        <LineHeart size={45} />
      </div>
      <div className="absolute bottom-20 right-20 opacity-20 bounce-sketch" style={{ animationDelay: '0.5s' }}>
        <LinePaw size={45} />
      </div>
      <div className="absolute bottom-10 left-10 opacity-35 sketch-animation" style={{ animationDelay: '1s' }}>
        <LineStar size={50} />
      </div>
      <div className="absolute top-1/3 left-4 w-36 h-36 opacity-10">
        <DoodleDecor />
      </div>
      <div className="absolute bottom-1/4 right-6 w-40 h-40 opacity-8">
        <DoodleDecor />
      </div>

      <div className="w-full max-w-md relative z-10">
        <div className="bg-white border-3 border-black rounded-2xl hand-drawn-shadow p-8 relative">
          <div className="absolute -top-14 left-1/2 transform -translate-x-1/2">
            <div className="bounce-sketch" style={{ animationDelay: '0.3s' }}>
              <LineDog size={130} />
            </div>
          </div>

          <div className="text-center mb-8 pt-12">
            <h1 className="text-4xl font-bold text-black mb-2 wiggle-line inline-block">创建账户~</h1>
            <p className="text-xl text-gray-500 mt-4">开始你的博客之旅，记录每一个精彩瞬间 🐶</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-lg font-semibold text-black mb-2 ml-1">你的名字</label>
              <div className="relative">
                <User className="absolute left-5 top-1/2 -translate-y-1/2 w-6 h-6 text-gray-500" />
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full pl-14 pr-5 py-4 bg-gray-100 border-3 border-black rounded-xl text-black placeholder-gray-400 focus:outline-none focus:border-black transition-all text-xl"
                  placeholder="你的名字"
                  required
                />
              </div>
            </div>

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

            <div>
              <label className="block text-lg font-semibold text-black mb-2 ml-1">确认密码</label>
              <div className="relative">
                <Lock className="absolute left-5 top-1/2 -translate-y-1/2 w-6 h-6 text-gray-500" />
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
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
              {loading ? '注册中...' : '创建账户 🎉'}
            </button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-xl text-gray-500">
              已有账户？{' '}
              <Link
                to="/login"
                className="text-black font-bold hover:text-gray-600 transition-colors text-2xl underline"
              >
                返回登录 🐾
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
