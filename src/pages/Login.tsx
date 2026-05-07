import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react';

export default function Login() {
  const [isLampOn, setIsLampOn] = useState(false);
  const [glowColor, setGlowColor] = useState('#6366f1');
  const [glowColorDark, setGlowColorDark] = useState('#4f46e5');
  const [shadeHue, setShadeHue] = useState(320);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  
  const containerRef = useRef<HTMLDivElement>(null);
  const lampRef = useRef<HTMLDivElement>(null);
  const loginFormRef = useRef<HTMLDivElement>(null);
  const cordRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const startY = useRef(0);
  const currentY = useRef(0);
  
  const navigate = useNavigate();

  const TRAVEL_THRESHOLD = 80;

  const handleCordMouseDown = (e: React.MouseEvent) => {
    isDragging.current = true;
    startY.current = e.clientY;
    document.body.style.cursor = 'grabbing';
  };

  const handleCordMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current || !cordRef.current || isLampOn) return;
    
    const deltaY = e.clientY - startY.current;
    currentY.current = Math.max(0, deltaY);
    
    cordRef.current.style.transform = `translateY(${currentY.current}px)`;
    
    const rotation = Math.min(30, deltaY * 0.1);
    cordRef.current.style.transform = `translateY(${currentY.current}px) rotate(${rotation}deg)`;
  };

  const handleCordMouseUp = () => {
    if (!isDragging.current || isLampOn) return;
    
    isDragging.current = false;
    document.body.style.cursor = 'grab';
    
    if (currentY.current > TRAVEL_THRESHOLD) {
      turnOnLamp();
    } else {
      if (cordRef.current) {
        cordRef.current.style.transition = 'transform 0.3s ease-out';
        cordRef.current.style.transform = 'translateY(0px) rotate(0deg)';
        setTimeout(() => {
          if (cordRef.current) {
            cordRef.current.style.transition = '';
          }
        }, 300);
      }
    }
    
    currentY.current = 0;
  };

  const turnOnLamp = () => {
    setIsLampOn(true);
    const newHue = Math.random() * 360;
    setShadeHue(newHue);
    const newGlowColor = `hsl(${newHue}, 40%, 45%)`;
    const newGlowColorDark = `hsl(${newHue}, 40%, 35%)`;
    setGlowColor(newGlowColor);
    setGlowColorDark(newGlowColorDark);
    
    if (loginFormRef.current) {
      loginFormRef.current.style.opacity = '1';
      loginFormRef.current.style.transform = 'scale(1) translateY(0)';
      loginFormRef.current.style.pointerEvents = 'auto';
    }
    
    if (containerRef.current) {
      containerRef.current.style.setProperty('--glow-color', newGlowColor);
    }
  };

  useEffect(() => {
    document.body.style.cursor = 'grab';
    
    const handleGlobalMouseUp = () => {
      if (isDragging.current) {
        handleCordMouseUp();
      }
    };

    window.addEventListener('mouseup', handleGlobalMouseUp);
    
    return () => {
      window.removeEventListener('mouseup', handleGlobalMouseUp);
    };
  }, []);

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
      ref={containerRef}
      className="min-h-screen flex items-center justify-center p-6"
      style={{ 
        background: isLampOn 
          ? 'linear-gradient(135deg, #1e1b4b 0%, #312e81 50%, #1e1b4b 100%)' 
          : '#121921',
        transition: 'background 0.8s ease',
        ['--glow-color' as string]: glowColor
      }}
    >
      <div className="flex items-center justify-center gap-8vmin flex-wrap p-8">
        <div ref={lampRef} className="relative">
          <svg
            style={{ height: '40vmin', overflow: 'visible', display: 'block' }}
            viewBox="0 0 333 484"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <linearGradient id="lamp-light" x1="165.5" y1="218.5" x2="165.5" y2="483.5" gradientUnits="userSpaceOnUse">
                <stop 
                  style={{ 
                    stopColor: `hsl(45, ${isLampOn ? 20 : 0}%, ${isLampOn ? 75 : 50}%)`,
                    stopOpacity: isLampOn ? 0.3 : 0 
                  }} 
                />
                <stop offset="1" style={{ stopColor: `hsl(45, ${isLampOn ? 20 : 0}%, ${isLampOn ? 75 : 50}%)`, stopOpacity: 0 }} />
              </linearGradient>
            </defs>

            <path
              d="M290.5 193H39L0 463.5c0 11.046 75.478 20 165.5 20s167-11.954 167-23l-42-267.5z"
              fill="url(#lamp-light)"
              style={{ opacity: isLampOn ? 1 : 0, transition: 'opacity 0.5s ease' }}
            />

            <path
              d="M164.859 0c55.229 0 100 8.954 100 20l29.859 199.06C291.529 208.451 234.609 200 164.859 200S38.189 208.451 35 219.06L64.859 20c0-11.046 44.772-20 100-20z"
              fill={`hsl(${shadeHue}, ${isLampOn ? 20 : 0}%, ${isLampOn ? 60 : 30}%)`}
              style={{ transition: 'fill 0.5s ease' }}
            />

            <path
              d="M165 464c44.183 0 80-8.954 80-20v-14h-22.869c-14.519-3.703-34.752-6-57.131-6-22.379 0-42.612 2.297-57.131 6H85v14c0 11.046 35.817 20 80 20z"
              fill={`hsl(210, 0%, ${isLampOn ? 60 : 40}%)`}
              style={{ transition: 'fill 0.5s ease' }}
            />

            <ellipse
              cx="165"
              cy="430"
              rx="80"
              ry="20"
              fill={`hsl(210, 0%, ${isLampOn ? 80 : 40}%)`}
              style={{ transition: 'fill 0.5s ease' }}
            />

            <path
              d="M180 142h-30v286c0 3.866 6.716 7 15 7 8.284 0 15-3.134 15-7V142z"
              fill={`hsl(210, 0%, ${isLampOn ? 60 : 40}%)`}
              style={{ transition: 'fill 0.5s ease' }}
            />

            <ellipse
              cx="165"
              cy="220"
              rx="130"
              ry="20"
              fill={`hsl(50, ${isLampOn ? 90 : 10}%, ${isLampOn ? 90 : 20}%)`}
              style={{ transition: 'fill 0.5s ease' }}
            />

            <g className="lamp-face">
              <g style={{ opacity: isLampOn ? 1 : 0, transition: 'opacity 0.3s ease' }}>
                <path d="M165 178c19.882 0 36-16.118 36-36h-72c0 19.882 16.118 36 36 36z" fill="#141414" />
                <circle cx="179.4" cy="172.6" r="18" fill="#e06952" />
              </g>
              
              <path
                d="M115 135c0-5.523-5.82-10-13-10s-13 4.477-13 10"
                stroke="#0a0a0a"
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{
                  transform: isLampOn ? 'rotate(0deg)' : 'rotate(180deg)',
                  transformOrigin: '102px 135px',
                  transition: 'transform 0.3s ease'
                }}
              />
              <path
                d="M241 135c0-5.523-5.82-10-13-10s-13 4.477-13 10"
                stroke="#0a0a0a"
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{
                  transform: isLampOn ? 'rotate(0deg)' : 'rotate(180deg)',
                  transformOrigin: '228px 135px',
                  transition: 'transform 0.3s ease'
                }}
              />
            </g>
          </svg>

          <div
            ref={cordRef}
            className="absolute cursor-grab"
            style={{
              top: '140px',
              left: '50%',
              transform: 'translateX(-50%)',
              cursor: isLampOn ? 'default' : 'grab',
            }}
            onMouseDown={handleCordMouseDown}
            onMouseMove={handleCordMouseMove}
          >
            <div 
              className="rounded-full"
              style={{
                width: '8px',
                height: '120px',
                background: `hsl(210, 0%, ${isLampOn ? 60 : 40}%)`,
                boxShadow: isLampOn ? `0 0 10px ${glowColor}` : 'none',
                transition: 'background 0.5s ease, box-shadow 0.5s ease'
              }}
            />
            <div 
              className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-8 h-8 rounded-full flex items-center justify-center"
              style={{
                background: `hsl(${shadeHue}, ${isLampOn ? 20 : 0}%, ${isLampOn ? 60 : 30}%)`,
                boxShadow: isLampOn ? `0 0 15px ${glowColor}, 0 0 30px ${glowColor}` : 'none',
                transition: 'all 0.5s ease'
              }}
            >
              <div className="text-xs text-white/80">
                {isLampOn ? '✓' : '↓'}
              </div>
            </div>
          </div>

          {!isLampOn && (
            <div className="absolute -bottom-16 left-1/2 transform -translate-x-1/2 text-center">
              <p className="text-gray-500 text-sm">拖动灯绳开灯</p>
            </div>
          )}
        </div>

        <div
          ref={loginFormRef}
          className="login-form"
          style={{
            opacity: isLampOn ? 1 : 0,
            transform: isLampOn ? 'scale(1) translateY(0)' : 'scale(0.8) translateY(20px)',
            pointerEvents: isLampOn ? 'auto' : 'none',
            transition: 'all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)',
          }}
        >
          <h2 style={{ 
            color: '#fff', 
            fontSize: '2rem', 
            margin: '0 0 2rem 0', 
            textAlign: 'center', 
            textShadow: `0 0 8px ${glowColor}` 
          }}>
            欢迎回来 ✨
          </h2>
          
          <form onSubmit={handleLogin}>
            <div className="form-group">
              <label 
                htmlFor="username" 
                style={{ 
                  display: 'block', 
                  color: '#aaa', 
                  fontSize: '0.9rem', 
                  marginBottom: '0.5rem', 
                  textShadow: `0 0 5px ${glowColor}` 
                }}
              >
                账号
              </label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="请输入账号"
                required
                style={{
                  width: '100%',
                  padding: '0.75rem 1rem',
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '2px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: '10px',
                  color: '#fff',
                  fontSize: '1rem',
                  transition: 'all 0.3s ease',
                  boxSizing: 'border-box',
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = glowColor;
                  e.target.style.boxShadow = `0 0 10px ${glowColor}`;
                  e.target.style.background = 'rgba(255, 255, 255, 0.08)';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                  e.target.style.boxShadow = 'none';
                  e.target.style.background = 'rgba(255, 255, 255, 0.05)';
                }}
              />
            </div>
            
            <div className="form-group">
              <label 
                htmlFor="password" 
                style={{ 
                  display: 'block', 
                  color: '#aaa', 
                  fontSize: '0.9rem', 
                  marginBottom: '0.5rem', 
                  textShadow: `0 0 5px ${glowColor}` 
                }}
              >
                密码
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="请输入密码"
                  required
                  style={{
                    width: '100%',
                    padding: '0.75rem 1rem',
                    paddingRight: '3rem',
                    background: 'rgba(255, 255, 255, 0.05)',
                    border: '2px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: '10px',
                    color: '#fff',
                    fontSize: '1rem',
                    transition: 'all 0.3s ease',
                    boxSizing: 'border-box',
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = glowColor;
                    e.target.style.boxShadow = `0 0 10px ${glowColor}`;
                    e.target.style.background = 'rgba(255, 255, 255, 0.08)';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                    e.target.style.boxShadow = 'none';
                    e.target.style.background = 'rgba(255, 255, 255, 0.05)';
                  }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                  style={{ top: '40%' }}
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>
            
            {error && (
              <div style={{ color: '#ef4444', fontSize: '0.9rem', marginBottom: '1rem', textAlign: 'center' }}>
                {error}
              </div>
            )}
            
            <button
              type="submit"
              style={{
                width: '100%',
                padding: '0.875rem',
                background: `linear-gradient(135deg, ${glowColor}, ${glowColorDark})`,
                border: 'none',
                borderRadius: '10px',
                color: '#fff',
                fontSize: '1rem',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)',
                marginTop: '0.5rem',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = `0 6px 20px rgba(0, 0, 0, 0.3), 0 0 20px ${glowColor}`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.2)';
              }}
            >
              登录
            </button>
            
            <div style={{ marginTop: '1.5rem', textAlign: 'center' }}>
              <a 
                href="/register" 
                onClick={(e) => { 
                  e.preventDefault(); 
                  navigate('/register'); 
                }}
                style={{ 
                  color: '#888', 
                  fontSize: '0.9rem', 
                  textDecoration: 'none', 
                  transition: 'all 0.3s ease',
                  textShadow: `0 0 5px ${glowColor}`
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = glowColor;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = '#888';
                }}
              >
                还没有账号？立即注册
              </a>
            </div>

            <div style={{ marginTop: '1.5rem', paddingTop: '1.5rem', borderTop: '1px solid rgba(255, 255, 255, 0.1)' }}>
              <p style={{ fontSize: '0.75rem', color: '#666', textAlign: 'center', marginBottom: '0.5rem' }}>
                测试账号
              </p>
              <div style={{ 
                background: 'rgba(255, 255, 255, 0.05)', 
                borderRadius: '8px', 
                padding: '0.75rem',
                fontSize: '0.8rem'
              }}>
                <p style={{ color: '#888', margin: '0.25rem 0' }}>
                  用户名：<span style={{ color: '#6366f1' }}>admin</span>
                </p>
                <p style={{ color: '#888', margin: '0.25rem 0' }}>
                  密码：<span style={{ color: '#6366f1' }}>123456</span>
                </p>
              </div>
            </div>
          </form>
        </div>
      </div>

      <div
        style={{
          position: 'fixed',
          bottom: '40px',
          left: '50%',
          transform: 'translateX(-50%)',
          color: '#fff',
          textAlign: 'center',
          fontSize: '14px',
          opacity: 0.7,
        }}
      >
        2026/3/30 <strong>—— Mr.L</strong>
      </div>

      <style>{`
        .login-form {
          background: rgba(18, 25, 33, 0.95);
          padding: 3rem 2.5rem;
          border-radius: 20px;
          min-width: 320px;
          border: 2px solid transparent;
          box-shadow: 0 0 0px rgba(255, 255, 255, 0);
        }
        
        .login-form[style*="opacity: 1"] {
          border-color: ${glowColor};
          box-shadow: 0 0 15px rgba(255, 255, 255, 0.1),
                      0 0 30px ${glowColor},
                      inset 0 0 15px rgba(255, 255, 255, 0.05);
        }
        
        .form-group {
          margin-bottom: 1.5rem;
        }
      `}</style>
    </div>
  );
}
