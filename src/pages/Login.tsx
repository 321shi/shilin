import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import CuteLamp from '@/components/CuteLamp';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [lampOn, setLampOn] = useState(false);
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
    <div className="min-h-screen bg-[#121921] font-sans flex items-center justify-center p-6 relative overflow-hidden">
      <div className="w-full max-w-5xl relative z-10 flex items-center justify-center gap-8 flex-wrap">
        {/* 可爱的台灯组件 */}
        <div className="flex-1 min-w-[250px] flex justify-center">
          <CuteLamp onToggle={setLampOn} />
        </div>

        {/* 登录表单 */}
        <div className={`flex-1 min-w-[300px] transition-all duration-500 ${lampOn ? 'opacity-100 scale-100' : 'opacity-0 scale-90 pointer-events-none'}`}>
          <div className="bg-[#121921]/90 backdrop-blur-sm border-2 border-transparent rounded-2xl p-8 shadow-lg" style={{
            borderColor: lampOn ? 'hsl(320, 40%, 45%)' : 'transparent',
            boxShadow: lampOn ? '0 0 15px rgba(255, 255, 255, 0.1), 0 0 30px hsl(320, 40%, 45%), inset 0 0 15px rgba(255, 255, 255, 0.05)' : 'none'
          }}>
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold text-white mb-2" style={{
                textShadow: lampOn ? '0 0 8px hsl(320, 40%, 45%)' : 'none'
              }}>欢迎回来~</h1>
              <p className="text-xl text-gray-400 mt-4">登录你的博客，继续记录生活 ✏️</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-lg font-semibold text-gray-300 mb-2 ml-1" style={{
                  textShadow: lampOn ? '0 0 5px hsl(320, 40%, 45%)' : 'none'
                }}>邮箱地址</label>
                <div className="relative">
                  <Mail className="absolute left-5 top-1/2 -translate-y-1/2 w-6 h-6 text-gray-500" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-14 pr-5 py-4 bg-white/5 border-2 border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-[hsl(320,40%,45%)] transition-all text-xl"
                    style={{
                      boxShadow: lampOn ? '0 0 10px hsl(320, 40%, 45%)' : 'none',
                      background: 'rgba(255, 255, 255, 0.05)'
                    }}
                    placeholder="your@email.com"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-lg font-semibold text-gray-300 mb-2 ml-1" style={{
                  textShadow: lampOn ? '0 0 5px hsl(320, 40%, 45%)' : 'none'
                }}>密码</label>
                <div className="relative">
                  <Lock className="absolute left-5 top-1/2 -translate-y-1/2 w-6 h-6 text-gray-500" />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-14 pr-5 py-4 bg-white/5 border-2 border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-[hsl(320,40%,45%)] transition-all text-xl"
                    style={{
                      boxShadow: lampOn ? '0 0 10px hsl(320, 40%, 45%)' : 'none',
                      background: 'rgba(255, 255, 255, 0.05)'
                    }}
                    placeholder="••••••••"
                    required
                  />
                </div>
              </div>

              {error && (
                <div className="bg-gray-800 border-2 border-white/20 text-white px-5 py-3 rounded-xl text-lg font-semibold">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-[hsl(320,40%,45%)] to-[hsl(320,40%,35%)] text-white py-4 rounded-xl font-bold text-2xl hover:opacity-90 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
                style={{
                  boxShadow: lampOn ? '0 4px 15px rgba(0, 0, 0, 0.2), 0 0 20px hsl(320, 40%, 45%)' : '0 4px 15px rgba(0, 0, 0, 0.2)'
                }}
              >
                {loading ? '登录中...' : '登录 ✨'}
              </button>
            </form>

            <div className="mt-8 text-center">
              <p className="text-xl text-gray-400">
                还没有账户？{' '}
                <Link
                  to="/register"
                  className="text-white font-bold hover:text-gray-300 transition-colors text-2xl underline"
                >
                  立即注册 💕
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
      
      {/* 提示文字 */}
      {!lampOn && (
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-gray-500 text-lg animate-pulse">
          点击灯绳，点亮台灯 ✨
        </div>
      )}
    </div>
  );
}
