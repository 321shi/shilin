import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Power } from 'lucide-react';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isPoweredOn, setIsPoweredOn] = useState(false);
  
  const navigate = useNavigate();

  const handlePowerOn = () => {
    setIsPoweredOn(true);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!username || !password) {
      setError('请输入用户名和密码');
      return;
    }

    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const registeredUser = users.find((u: any) => 
      (u.username === username || u.email === username) && u.password === password
    );

    if (registeredUser || (username === 'admin' && password === '123456')) {
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('username', username);
      navigate('/home');
    } else if (users.length > 0) {
      setError('用户名或密码错误');
    } else {
      setError('账号不存在，请先注册');
    }
  };

  return (
    <div 
      className="min-h-screen flex items-center justify-center p-6"
      style={{ 
        background: isPoweredOn 
          ? 'linear-gradient(135deg, #1e1b4b 0%, #312e81 50%, #1e1b4b 100%)' 
          : 'linear-gradient(135deg, #0f172a 0%, #1e1b4b 50%, #0f172a 100%)',
        transition: 'background 1s ease'
      }}
    >
      <div className="flex items-center justify-center gap-12 flex-wrap">
        <div className="text-center">
          <button
            onClick={handlePowerOn}
            disabled={isPoweredOn}
            className={`relative w-40 h-40 rounded-full transition-all duration-500 ${
              isPoweredOn 
                ? 'bg-gradient-to-br from-yellow-200 via-yellow-400 to-orange-500 shadow-[0_0_60px_rgba(251,191,36,0.5)]' 
                : 'bg-gray-700 hover:bg-gray-600'
            }`}
          >
            <Power 
              className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 ${
                isPoweredOn ? 'text-yellow-900' : 'text-gray-400'
              }`}
              size={48}
            />
            {isPoweredOn && (
              <div className="absolute inset-0 rounded-full animate-ping bg-yellow-400 opacity-20" />
            )}
          </button>
          <p className="mt-6 text-muted text-sm">
            {isPoweredOn ? '✨ 台灯已点亮' : '点击台灯开启'}
          </p>
        </div>

        <div 
          className="glass p-8 w-full max-w-md transition-all duration-500"
          style={{
            opacity: isPoweredOn ? 1 : 0.3,
            transform: isPoweredOn ? 'scale(1)' : 'scale(0.95)',
            pointerEvents: isPoweredOn ? 'auto' : 'none',
          }}
        >
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-2">
              欢迎回来 <span className="gradient-text">✨</span>
            </h1>
            <p className="text-muted">登录到 Mr.L 的个人网站</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label htmlFor="username" className="block text-sm font-medium mb-2">
                用户名 / 邮箱
              </label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-3 bg-surface/50 border border-border rounded-xl focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                placeholder="请输入用户名或邮箱"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium mb-2">
                密码
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 bg-surface/50 border border-border rounded-xl focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all pr-12"
                  placeholder="请输入密码"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted hover:text-primary transition-colors"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            {error && (
              <div className="bg-red-500/10 border border-red-500/30 text-red-500 px-4 py-3 rounded-xl text-sm">
                {error}
              </div>
            )}

            <button
              type="submit"
              className="w-full px-8 py-4 bg-gradient-to-r from-primary to-secondary text-white rounded-xl font-semibold hover:opacity-90 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
            >
              登录
            </button>
          </form>

          <div className="mt-6 text-center text-sm text-muted">
            还没有账号？
            <a 
              href="/register" 
              onClick={(e) => { e.preventDefault(); navigate('/register'); }}
              className="text-primary hover:underline ml-1"
            >
              立即注册
            </a>
          </div>

          <div className="mt-6 pt-6 border-t border-border">
            <p className="text-xs text-muted text-center mb-2">测试账号</p>
            <div className="bg-surface/30 rounded-lg p-3 text-xs">
              <p className="text-muted">用户名：<span className="text-primary">admin</span></p>
              <p className="text-muted">密码：<span className="text-primary">123456</span></p>
            </div>
          </div>
        </div>
      </div>

      <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 text-muted text-sm">
        2026/3/30 <strong>—— Mr.L</strong>
      </div>
    </div>
  );
}
