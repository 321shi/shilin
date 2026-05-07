import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { Draggable } from 'gsap/Draggable';
import { useNavigate } from 'react-router-dom';

gsap.registerPlugin(Draggable);

export default function Login() {
  const containerRef = useRef<HTMLDivElement>(null);
  const lampRef = useRef<SVGSVGElement>(null);
  const loginFormRef = useRef<HTMLDivElement>(null);
  const cordsRef = useRef<SVGPathElement[]>([]);
  const dummyCordRef = useRef<SVGLineElement | null>(null);
  const hitRef = useRef<SVGCircleElement | null>(null);
  const proxyRef = useRef<HTMLDivElement | null>(null);
  
  const [isLampOn, setIsLampOn] = useState(false);
  const [glowColor, setGlowColor] = useState('#6366f1');
  const [glowColorDark, setGlowColorDark] = useState('#4f46e5');
  const [shadeHue, setShadeHue] = useState(320);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  
  const navigate = useNavigate();
  
  const ENDX = 124;
  const ENDY = 348;
  const TRAVEL_THRESHOLD = 50;

  useEffect(() => {
    if (!proxyRef.current || !hitRef.current || !dummyCordRef.current) return;

    const cords = cordsRef.current;
    
    gsap.set('.lamp', { display: 'block' });
    gsap.set(['.cords', '.lamp__hit'], { x: -10 });
    gsap.set('.lamp__eye', {
      rotate: 180,
      transformOrigin: '50% 50%',
      yPercent: 50,
    });

    const cordTimeline = gsap.timeline({ paused: true });
    
    for (let i = 1; i < cords.length; i++) {
      cordTimeline.to(cords[0], {
        morphSVG: cords[i],
        duration: 0.1,
        repeat: 1,
        yoyo: true,
      });
    }

    Draggable.create(proxyRef.current, {
      trigger: hitRef.current,
      type: 'x,y',
      onPress: (e: any) => {
        const event = e as PointerEvent;
      },
      onDrag: function () {
        const maxY = Math.max(400, this.y);
        if (dummyCordRef.current) {
          gsap.set(dummyCordRef.current, {
            attr: {
              x2: this.x,
              y2: maxY,
            },
          });
        }
      },
      onRelease: function (e: any) {
        const distX = Math.abs(this.x);
        const distY = Math.abs(this.y - ENDY);
        const travelled = Math.sqrt(distX * distX + distY * distY);
        
        gsap.to(dummyCordRef.current, {
          attr: { x2: ENDX, y2: ENDY },
          duration: 0.1,
          onComplete: () => {
            if (travelled > TRAVEL_THRESHOLD) {
              cordTimeline.restart();
              setTimeout(() => turnOnLamp(), 300);
            }
          },
        });
      },
    });

    function turnOnLamp() {
      setIsLampOn(true);
      const newHue = Math.random() * 359;
      setShadeHue(newHue);
      const newGlowColor = `hsl(${newHue}, 40%, 45%)`;
      const newGlowColorDark = `hsl(${newHue}, 40%, 35%)`;
      setGlowColor(newGlowColor);
      setGlowColorDark(newGlowColorDark);
      
      gsap.set('.lamp__eye', { rotate: 0 });
      
      if (loginFormRef.current) {
        gsap.to(loginFormRef.current, {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 0.5,
          ease: 'back.out(1.7)',
        });
      }
      
      if (containerRef.current) {
        containerRef.current.style.setProperty('--glow-color', newGlowColor);
      }
    }

    return () => {
      cordTimeline.kill();
    };
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (username === 'admin' && password === '123456') {
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('username', username);
      navigate('/home');
    } else {
      setError('账号或密码错误');
    }
  };

  const cordPaths = [
    'M124 187.033V347',
    'M124 187.023s17.007 21.921 17.007 34.846c0 12.925-11.338 23.231-17.007 34.846-5.669 11.615-17.007 21.921-17.007 34.846 0 12.925 17.007 34.846 17.007 34.846',
    'M124 187.017s-21.259 17.932-21.259 30.26c0 12.327 14.173 20.173 21.259 30.26 7.086 10.086 21.259 17.933 21.259 30.26 0 12.327-21.259 30.26-21.259 30.26',
    'M124 187s29.763 8.644 29.763 20.735-19.842 13.823-29.763 20.734c-9.921 6.912-29.763 8.644-29.763 20.735S124 269.939 124 269.939',
    'M124 187.029s-10.63 26.199-10.63 39.992c0 13.794 7.087 26.661 10.63 39.992 3.543 13.331 10.63 26.198 10.63 39.992 0 13.793-10.63 39.992-10.63 39.992',
    'M124 187.033V347',
  ];

  return (
    <div 
      ref={containerRef}
      className="min-h-screen flex items-center justify-center"
      style={{ background: '#121921', ['--glow-color' as string]: glowColor }}
    >
      <form className="radio-controls" style={{ position: 'absolute', width: 1, height: 1, overflow: 'hidden' }}>
        <input type="radio" id="on" name="status" defaultChecked={isLampOn} />
        <label htmlFor="on">On</label>
        <input type="radio" id="off" name="status" defaultChecked={!isLampOn} />
        <label htmlFor="off">Off</label>
      </form>

      <div className="flex items-center justify-center gap-8vmin flex-wrap p-8">
        <svg
          ref={lampRef}
          className="lamp"
          style={{ height: '40vmin', overflow: 'visible', display: 'block' }}
          viewBox="0 0 333 484"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="opening-shade" x1="35" y1="220" x2="295" y2="220" gradientUnits="userSpaceOnUse">
              <stop />
              <stop offset="1" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="base-shading" x1="85" y1="444" x2="245" y2="444" gradientUnits="userSpaceOnUse">
              <stop style={{ stopColor: `hsl(45, ${isLampOn ? 20 : 0}%, ${isLampOn ? 75 : 50}%)`, stopOpacity: 0.85 }} />
              <stop offset="0.8" style={{ stopColor: `hsl(45, ${isLampOn ? 20 : 0}%, ${isLampOn ? 35 : 20}%)`, stopOpacity: 0.25 }} />
            </linearGradient>
            <linearGradient id="side-shading" x1="119" y1="430" x2="245" y2="430" gradientUnits="userSpaceOnUse">
              <stop style={{ stopColor: `hsl(45, ${isLampOn ? 20 : 0}%, ${isLampOn ? 50 : 20}%)`, stopOpacity: 0.5 }} />
              <stop offset="1" style={{ stopColor: `hsl(45, ${isLampOn ? 20 : 0}%, ${isLampOn ? 35 : 20}%)`, stopOpacity: 0.25 }} />
            </linearGradient>
            <linearGradient id="post-shading" x1="150" y1="288" x2="180" y2="288" gradientUnits="userSpaceOnUse">
              <stop style={{ stopColor: `hsl(45, ${isLampOn ? 20 : 0}%, ${isLampOn ? 75 : 50}%)`, stopOpacity: 0.85 }} />
              <stop offset="1" style={{ stopColor: `hsl(45, ${isLampOn ? 20 : 0}%, ${isLampOn ? 35 : 20}%)`, stopOpacity: 0.25 }} />
            </linearGradient>
            <linearGradient id="light" x1="165.5" y1="218.5" x2="165.5" y2="483.5" gradientUnits="userSpaceOnUse">
              <stop style={{ stopColor: `hsl(45, ${isLampOn ? 20 : 0}%, ${isLampOn ? 75 : 50}%)`, stopOpacity: isLampOn ? 0.2 : 0 }} />
              <stop offset="1" style={{ stopColor: `hsl(45, ${isLampOn ? 20 : 0}%, ${isLampOn ? 75 : 50}%)`, stopOpacity: 0 }} />
            </linearGradient>
            <linearGradient id="top-shading" x1="56" y1="110" x2="295" y2="110" gradientUnits="userSpaceOnUse">
              <stop style={{ stopColor: `hsl(${shadeHue}, ${isLampOn ? 20 : 0}%, ${isLampOn ? 75 : 30}%)`, stopOpacity: 0.8 }} />
              <stop offset="1" style={{ stopColor: `hsl(${shadeHue}, ${isLampOn ? 20 : 0}%, ${isLampOn ? 50 : 20}%)`, stopOpacity: 0 }} />
            </linearGradient>
          </defs>

          <g className="lamp__shade shade">
            <ellipse
              className="shade__opening"
              cx="165"
              cy="220"
              rx="130"
              ry="20"
              style={{ fill: `hsl(50, ${isLampOn ? 90 : 10}%, ${isLampOn ? 90 : 20}%)` }}
            />
            <ellipse
              className="shade__opening-shade"
              cx="165"
              cy="220"
              rx="130"
              ry="20"
              fill="url(#opening-shade)"
              style={{ opacity: isLampOn ? 0 : 1 }}
            />
          </g>

          <g className="lamp__base base">
            <path
              className="base__side"
              d="M165 464c44.183 0 80-8.954 80-20v-14h-22.869c-14.519-3.703-34.752-6-57.131-6-22.379 0-42.612 2.297-57.131 6H85v14c0 11.046 35.817 20 80 20z"
              style={{ fill: `hsl(210, 0%, ${isLampOn ? 60 : 40}%)` }}
            />
            <path d="M165 464c44.183 0 80-8.954 80-20v-14h-22.869c-14.519-3.703-34.752-6-57.131-6-22.379 0-42.612 2.297-57.131 6H85v14c0 11.046 35.817 20 80 20z" fill="url(#side-shading)" />
            <ellipse className="base__top" cx="165" cy="430" rx="80" ry="20" style={{ fill: `hsl(210, 0%, ${isLampOn ? 80 : 40}%)` }} />
            <ellipse cx="165" cy="430" rx="80" ry="20" fill="url(#base-shading)" />
          </g>

          <g className="lamp__post post">
            <path
              className="post__body"
              d="M180 142h-30v286c0 3.866 6.716 7 15 7 8.284 0 15-3.134 15-7V142z"
              style={{ fill: `hsl(210, 0%, ${isLampOn ? 60 : 40}%)` }}
            />
            <path d="M180 142h-30v286c0 3.866 6.716 7 15 7 8.284 0 15-3.134 15-7V142z" fill="url(#post-shading)" />
          </g>

          <g className="lamp__cords cords">
            {cordPaths.slice(1).map((path, index) => (
              <path
                key={index}
                ref={(el) => { if (el) cordsRef.current[index] = el; }}
                d={path}
                stroke={`hsl(210, 0%, ${isLampOn ? 60 : 40}%)`}
                strokeWidth="6"
                strokeLinecap="round"
                style={{ display: 'none' }}
              />
            ))}
            <line
              ref={dummyCordRef}
              className="cord cord--dummy"
              x1="124"
              y1="190"
              x2="124"
              y2="348"
              stroke={`hsl(210, 0%, ${isLampOn ? 60 : 40}%)`}
              strokeWidth="6"
              strokeLinecap="round"
            />
          </g>

          <path
            className="lamp__light"
            d="M290.5 193H39L0 463.5c0 11.046 75.478 20 165.5 20s167-11.954 167-23l-42-267.5z"
            fill="url(#light)"
            style={{ opacity: isLampOn ? 1 : 0 }}
          />

          <g className="lamp__top top">
            <path
              className="top__body"
              fillRule="evenodd"
              clipRule="evenodd"
              d="M164.859 0c55.229 0 100 8.954 100 20l29.859 199.06C291.529 208.451 234.609 200 164.859 200S38.189 208.451 35 219.06L64.859 20c0-11.046 44.772-20 100-20z"
              style={{ fill: `hsl(${shadeHue}, ${isLampOn ? 20 : 0}%, ${isLampOn ? 60 : 30}%)` }}
            />
            <path
              className="top__shading"
              fillRule="evenodd"
              clipRule="evenodd"
              d="M164.859 0c55.229 0 100 8.954 100 20l29.859 199.06C291.529 208.451 234.609 200 164.859 200S38.189 208.451 35 219.06L64.859 20c0-11.046 44.772-20 100-20z"
              fill="url(#top-shading)"
            />
          </g>

          <g className="lamp__face face">
            <g className="lamp__mouth" style={{ opacity: isLampOn ? 1 : 0 }}>
              <path d="M165 178c19.882 0 36-16.118 36-36h-72c0 19.882 16.118 36 36 36z" fill="#141414" />
              <circle cx="179.4" cy="172.6" r="18" fill="#e06952" />
            </g>
            <g className="lamp__eyes">
              <path
                className="lamp__eye"
                d="M115 135c0-5.523-5.82-10-13-10s-13 4.477-13 10"
                stroke="#0a0a0a"
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                className="lamp__eye"
                d="M241 135c0-5.523-5.82-10-13-10s-13 4.477-13 10"
                stroke="#0a0a0a"
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </g>
          </g>

          <circle
            ref={hitRef}
            className="lamp__hit"
            cx="124"
            cy="347"
            r="66"
            fill="#C4C4C4"
            fillOpacity="0.1"
            style={{ cursor: 'pointer', opacity: 0 }}
          />
        </svg>

        <div
          ref={loginFormRef}
          className="login-form"
          style={{
            opacity: 0,
            transform: 'scale(0.8) translateY(20px)',
            pointerEvents: 'none',
            transition: 'all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)',
          }}
        >
          <h2 style={{ color: '#fff', fontSize: '2rem', margin: '0 0 2rem 0', textAlign: 'center', textShadow: `0 0 8px ${glowColor}` }}>
            欢迎回来
          </h2>
          <form onSubmit={handleLogin}>
            <div className="form-group">
              <label htmlFor="username" style={{ display: 'block', color: '#aaa', fontSize: '0.9rem', marginBottom: '0.5rem', textShadow: `0 0 5px ${glowColor}` }}>
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
              <label htmlFor="password" style={{ display: 'block', color: '#aaa', fontSize: '0.9rem', marginBottom: '0.5rem', textShadow: `0 0 5px ${glowColor}` }}>
                密码
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="请输入密码"
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
            {error && (
              <div style={{ color: '#ef4444', fontSize: '0.9rem', marginBottom: '1rem', textAlign: 'center' }}>
                {error}
              </div>
            )}
            <button
              type="submit"
              className="login-btn"
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
            <div className="form-footer" style={{ marginTop: '1.5rem', textAlign: 'center' }}>
              <a href="#" className="forgot-link" style={{ color: '#888', fontSize: '0.9rem', textDecoration: 'none', transition: 'all 0.3s ease' }}>
                忘记密码？
              </a>
            </div>
          </form>
        </div>
      </div>

      <div
        ref={proxyRef}
        style={{
          position: 'absolute',
          width: '1px',
          height: '1px',
          pointerEvents: 'none',
        }}
      />

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
          background: rgba(18, 25, 33, 0.9);
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
