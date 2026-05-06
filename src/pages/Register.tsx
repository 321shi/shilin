import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, Mail, Lock } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { CuteDog, PawPrint, Heart, Star, Bone } from '@/components/CuteDecorations';

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
    <div className="min-h-screen bg-background font-sans flex items-center justify-center p-6 relative overflow-hidden">
      <div className="absolute top-10 right-10 float">
        <Bone size={40} />
      </div>
      <div className="absolute top-20 left-20 bounce-soft">
        <Heart size={30} />
      </div>
      <div className="absolute bottom-20 right-20 bounce-soft" style={{ animationDelay: '0.5s' }}>
        <PawPrint size={25} />
      </div>
      <div className="absolute bottom-10 left-10 float" style={{ animationDelay: '1s' }}>
        <Star size={35} />
      </div>

      <div className="w-full max-w-md relative z-10">
        <div className="bg-surface border-2 border-border rounded-3xl shadow-cute p-8 relative">
          <div className="absolute -top-12 left-1/2 transform -translate-x-1/2">
            <div className="float" style={{ animationDelay: '0.3s' }}>
              <CuteDog size={90} />
            </div>
          </div>

          <div className="text-center mb-8 pt-8">
            <h1 className="text-3xl font-extrabold text-text mb-2">创建账户！</h1>
            <p className="text-muted">开始你的博客之旅，记录每一个精彩瞬间 🐶</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-bold text-text mb-2 ml-1">你的名字</label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted" />
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 bg-accent/30 border-2 border-border rounded-2xl text-text placeholder-muted focus:outline-none focus:ring-4 focus:ring-primary/20 focus:border-primary transition-all"
                  placeholder="你的名字"
                  required
                />
              </div>
            </div>

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

            <div>
              <label className="block text-sm font-bold text-text mb-2 ml-1">确认密码</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted" />
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
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
              className="w-full bg-gradient-to-r from-secondary to-primary text-white py-4 rounded-2xl font-bold text-lg hover:opacity-90 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-soft hover:shadow-cute transform hover:-translate-y-0.5"
            >
              {loading ? '注册中...' : '创建账户 🎉'}
            </button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-muted">
              已有账户？{' '}
              <Link
                to="/login"
                className="text-primary font-bold hover:underline"
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
