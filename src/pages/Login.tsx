import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';

export default function Login() {
  const [isLampOn, setIsLampOn] = useState(false);
  const [glowColor, setGlowColor] = useState('#6366f1');
  const [glowColorDark, setGlowColorDark] = useState('#4f46e5');
  const [shadeHue, setShadeHue] = useState(320);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [dragOffset, setDragOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const containerRef = useRef<HTMLDivElement>(null);
  const loginFormRef = useRef<HTMLDivElement>(null);
  const dragStartY = useRef(0);
  
  const navigate = useNavigate();
  const { login } = useAuth();

  const TRAVEL_THRESHOLD = 60;

  const turnOnLamp = () => {
    setIsLampOn(true);
    const newHue = Math.random() * 360;
    setShadeHue(newHue);
    const newGlowColor = `hsl(${newHue}, 40%, 45%)`;
    const newGlowColorDark = `hsl(${newHue}, 40%, 35%)`;
    setGlowColor(newGlowColor);
    setGlowColorDark(newGlowColorDark);
    setDragOffset(0);
  };

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      if (!isDragging || isLampOn) return;
      const currentY = e.clientY;
      const offset = Math.max(0, currentY - dragStartY.current);
      setDragOffset(offset);
    };

    const handleUp = () => {
      if (!isDragging || isLampOn) return;
      setIsDragging(false);
      
      if (dragOffset > TRAVEL_THRESHOLD) {
        turnOnLamp();
      } else {
        setDragOffset(0);
      }
    };

    if (isDragging && !isLampOn) {
      window.addEventListener('mousemove', handleMove);
      window.addEventListener('mouseup', handleUp);
    }

    return () => {
      window.removeEventListener('mousemove', handleMove);
      window.removeEventListener('mouseup', handleUp);
    };
  }, [isDragging, isLampOn, dragOffset]);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (isLampOn) return;
    setIsDragging(true);
    dragStartY.current = e.clientY;
    e.preventDefault();
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      await login(username, password);
      navigate('/home');
    } catch (err) {
      setError(err instanceof Error ? err.message : '登录失败');
    } finally {
      setIsLoading(false);
    }
  };

  const cordRotation = Math.min(25, dragOffset * 0.15);

  return (
    <div 
      ref={containerRef}
      className="min-h-screen flex items-center justify-center p-6 select-none"
      style={{ 
        background: isLampOn 
          ? 'linear-gradient(135deg, #1e1b4b 0%, #312e81 50%, #1e1b4b 100%)' 
          : '#121921',
        transition: 'background 0.8s ease',
      }}
    >
      <div className="flex items-center justify-center gap-12 flex-wrap p-8">
        <div className="relative" style={{ cursor: isLampOn ? 'default' : 'grab' }}>
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
                    stopOpacity: isLampOn ? 0.4 : 0 
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
            className="absolute"
            style={{
              top: '130px',
              left: '50%',
              transform: `translateX(-50%) translateY(${dragOffset}px) rotate(${cordRotation}deg)`,
              transformOrigin: 'center top',
              transition: isDragging ? 'none' : 'transform 0.3s ease-out',
              cursor: isLampOn ? 'default' : (isDragging ? 'grabbing' : 'grab'),
            }}
            onMouseDown={handleMouseDown}
          >
            <div 
              className="rounded-full"
              style={{
                width: '10px',
                height: '140px',
                background: `hsl(210, 0%, ${isLampOn ? 60 : 40}%)`,
                boxShadow: isLampOn ? `0 0 15px ${glowColor}` : 'none',
                transition: 'background 0.5s ease, box-shadow 0.5s ease'
              }}
            />
            <div 
              className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 rounded-full flex items-center justify-center"
              style={{
                width: '40px',
                height: '40px',
                background: `hsl(${shadeHue}, ${isLampOn ? 20 : 0}%, ${isLampOn ? 70 : 30}%)`,
                boxShadow: isLampOn 
                  ? `0 0 20px ${glowColor}, 0 0 40px ${glowColor}` 
                  : dragOffset > 0 
                    ? `0 0 10px rgba(255, 255, 255, 0.3)` 
                    : 'none',
                transition: 'all 0.5s ease'
              }}
            >
              <span className="text-white text-lg">
                {isLampOn ? '✓' : '↓'}
              </span>
            </div>
          </div>

          {!isLampOn && (
            <div className="absolute -bottom-20 left-1/2 transform -translate-x-1/2 text-center whitespace-nowrap">
              <p className="text-gray-500 text-base font-medium mb-2">
                {dragOffset > 0 ? `已拖动 ${Math.round(dragOffset)}px` : '向下拖动开灯'}
              </p>
              {dragOffset >= TRAVEL_THRESHOLD && (
                <p className="text-green-500 text-sm animate-pulse">
                  ✨ 继续拖动即可开灯！
                </p>
              )}
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
                disabled={isLoading}
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
                  disabled={isLoading}
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
                  className="absolute right-3 text-gray-400 hover:text-white transition-colors"
                  style={{ top: '40%', transform: 'translateY(-50%)' }}
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
              disabled={isLoading}
              style={{
                width: '100%',
                padding: '0.875rem',
                background: isLoading ? '#666' : `linear-gradient(135deg, ${glowColor}, ${glowColorDark})`,
                border: 'none',
                borderRadius: '10px',
                color: '#fff',
                fontSize: '1rem',
                fontWeight: 600,
                cursor: isLoading ? 'not-allowed' : 'pointer',
                transition: 'all 0.3s ease',
                boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)',
                marginTop: '0.5rem',
              }}
              onMouseEnter={(e) => {
                if (!isLoading) {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = `0 6px 20px rgba(0, 0, 0, 0.3), 0 0 20px ${glowColor}`;
                }
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.2)';
              }}
            >
              {isLoading ? '登录中...' : '登录'}
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
        
        .form-group {
          margin-bottom: 1.5rem;
        }
      `}</style>
    </div>
  );
}