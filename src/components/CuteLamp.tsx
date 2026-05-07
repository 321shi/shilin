import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

interface CuteLampProps {
  onToggle?: (isOn: boolean) => void;
}

const CuteLamp: React.FC<CuteLampProps> = ({ onToggle }) => {
  const lampRef = useRef<SVGSVGElement>(null);
  const hitRef = useRef<SVGCircleElement>(null);
  const dummyCordRef = useRef<SVGLineElement>(null);
  const [isOn, setIsOn] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const dragStartRef = useRef({ x: 0, y: 0 });
  const dragCurrentRef = useRef({ x: 124, y: 348 });

  // 点击音效
  const playClickSound = () => {
    try {
      const audio = new Audio('https://assets.codepen.io/605876/click.mp3');
      audio.volume = 0.3;
      audio.play().catch(() => {});
    } catch (e) {
      // 静默处理音频错误
    }
  };

  // 切换台灯
  const toggleLamp = () => {
    const newState = !isOn;
    setIsOn(newState);
    
    gsap.set(document.documentElement, { '--on': newState ? 1 : 0 });
    
    // 随机颜色
    const hue = Math.floor(Math.random() * 360);
    gsap.set(document.documentElement, { '--shade-hue': hue });

    const glowColor = `hsl(${hue}, 40%, 45%)`;
    const glowColorDark = `hsl(${hue}, 40%, 35%)`;
    gsap.set(document.documentElement, { '--glow-color': glowColor });
    gsap.set(document.documentElement, { '--glow-color-dark': glowColorDark });

    gsap.set('.lamp__eye', {
      rotate: newState ? 0 : 180,
      transformOrigin: '50% 50%',
      yPercent: newState ? 0 : 50,
      duration: 0.3,
    });
    
    playClickSound();
    
    if (onToggle) {
      onToggle(newState);
    }
  };

  // 鼠标事件处理
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    dragStartRef.current = { x: e.clientX, y: e.clientY };
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !dummyCordRef.current) return;
    
    const dx = e.clientX - dragStartRef.current.x;
    const dy = e.clientY - dragStartRef.current.y;
    
    const newX = 124 + dx;
    const newY = Math.max(348, 348 + dy);
    
    dragCurrentRef.current = { x: newX, y: newY };
    
    gsap.set(dummyCordRef.current, {
      attr: {
        x2: newX,
        y2: newY,
      },
    });
  };

  const handleMouseUp = (e: React.MouseEvent) => {
    if (!isDragging || !dummyCordRef.current) return;
    
    const dx = e.clientX - dragStartRef.current.x;
    const dy = e.clientY - dragStartRef.current.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    
    // 重置灯绳位置
    gsap.to(dummyCordRef.current, {
      attr: { x2: 124, y2: 348 },
      duration: 0.2,
      onComplete: () => {
        dragCurrentRef.current = { x: 124, y: 348 };
        if (distance > 50) {
          toggleLamp();
        }
      },
    });
    
    setIsDragging(false);
  };

  const handleMouseLeave = () => {
    if (isDragging && dummyCordRef.current) {
      gsap.to(dummyCordRef.current, {
        attr: { x2: 124, y2: 348 },
        duration: 0.2,
      });
      setIsDragging(false);
    }
  };

  // 触摸事件支持
  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true);
    const touch = e.touches[0];
    dragStartRef.current = { x: touch.clientX, y: touch.clientY };
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging || !dummyCordRef.current) return;
    
    const touch = e.touches[0];
    const dx = touch.clientX - dragStartRef.current.x;
    const dy = touch.clientY - dragStartRef.current.y;
    
    const newX = 124 + dx;
    const newY = Math.max(348, 348 + dy);
    
    dragCurrentRef.current = { x: newX, y: newY };
    
    gsap.set(dummyCordRef.current, {
      attr: {
        x2: newX,
        y2: newY,
      },
    });
  };

  const handleTouchEnd = () => {
    if (!isDragging || !dummyCordRef.current) return;
    
    // 这里我们简化处理，直接切换状态
    gsap.to(dummyCordRef.current, {
      attr: { x2: 124, y2: 348 },
      duration: 0.2,
      onComplete: () => {
        dragCurrentRef.current = { x: 124, y: 348 };
        toggleLamp();
      },
    });
    
    setIsDragging(false);
  };

  useEffect(() => {
    if (!lampRef.current) return;

    // 初始化样式
    gsap.set('.lamp__eye', {
      rotate: 180,
      transformOrigin: '50% 50%',
      yPercent: 50,
    });

    gsap.set(lampRef.current, { display: 'block' });

    return () => {
      // 清理
    };
  }, []);

  return (
    <div className="cute-lamp-container" style={{ 
      position: 'relative',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    }}>
      <style>{`
        :root {
          --cord: hsl(210, 0%, calc((40 + (var(--on, 0) * 50)) * 1%));
          --opening: hsl(
            50,
            calc((10 + (var(--on, 0) * 80)) * 1%),
            calc((20 + (var(--on, 0) * 70)) * 1%)
          );
          --feature: #0a0a0a;
          --accent: 210;
          --tongue: #e06952;
          --base-top: hsl(
            var(--accent),
            0%,
            calc((40 + (var(--on, 0) * 40)) * 1%)
          );
          --base-side: hsl(
            var(--accent),
            0%,
            calc((20 + (var(--on, 0) * 40)) * 1%)
          );
          --post: hsl(
            var(--accent),
            0%,
            calc((20 + (var(--on, 0) * 40)) * 1%)
          );
          --b-1: hsla(
            45,
            calc((0 + (var(--on, 0) * 0)) * 1%),
            calc((50 + (var(--on, 0) * 50)) * 1%),
            0.85
          );
          --b-2: hsla(
            45,
            calc((0 + (var(--on, 0) * 0)) * 1%),
            calc((20 + (var(--on, 0) * 30)) * 1%),
            0.25
          );
          --b-3: hsla(
            45,
            calc((0 + (var(--on, 0) * 0)) * 1%),
            calc((20 + (var(--on, 0) * 30)) * 1%),
            0.5
          );
          --b-4: hsla(
            45,
            calc((0 + (var(--on, 0) * 0)) * 1%),
            calc((20 + (var(--on, 0) * 30)) * 1%),
            0.25
          );
          --l-1: hsla(
            45,
            calc((0 + (var(--on, 0) * 20)) * 1%),
            calc((50 + (var(--on, 0) * 50)) * 1%),
            0.85
          );
          --l-2: hsla(
            45,
            calc((0 + (var(--on, 0) * 20)) * 1%),
            calc((50 + (var(--on, 0) * 50)) * 1%),
            0.85
          );
          --shade-hue: 320;
          --t-1: hsl(
            var(--shade-hue),
            calc((0 + (var(--on, 0) * 20)) * 1%),
            calc((30 + (var(--on, 0) * 60)) * 1%)
          );
          --t-2: hsl(
            var(--shade-hue),
            calc((0 + (var(--on, 0) * 20)) * 1%),
            calc((20 + (var(--on, 0) * 35)) * 1%)
          );
          --t-3: hsl(
            var(--shade-hue),
            calc((0 + (var(--on, 0) * 20)) * 1%),
            calc((10 + (var(--on, 0) * 20)) * 1%)
          );
          --glow-color: hsl(320, 40%, 45%);
          --glow-color-dark: hsl(320, 40%, 35%);
        }

        .lamp {
          display: none;
          height: 40vmin;
          max-height: 350px;
          overflow: visible !important;
        }

        .cord {
          stroke: var(--cord);
        }

        .cord--rig {
          display: none;
        }

        .lamp__tongue {
          fill: var(--tongue);
        }

        .lamp__hit {
          cursor: pointer;
          opacity: 0;
        }

        .lamp__feature {
          fill: var(--feature);
        }

        .lamp__stroke {
          stroke: var(--feature);
        }

        .lamp__mouth,
        .lamp__light {
          opacity: var(--on, 0);
        }

        .shade__opening {
          fill: var(--opening);
        }

        .shade__opening-shade {
          opacity: calc(1 - var(--on, 0));
        }

        .post__body {
          fill: var(--post);
        }

        .base__top {
          fill: var(--base-top);
        }

        .base__side {
          fill: var(--base-side);
        }

        .top__body {
          fill: var(--t-3);
        }
      `}</style>

      <form className="radio-controls" style={{ display: 'none' }}>
        <input type="radio" id="on" name="status" value="on" />
        <label htmlFor="on">On</label>
        <input type="radio" id="off" name="status" value="off" />
        <label htmlFor="off">Off</label>
      </form>

      <svg
        ref={lampRef}
        className="lamp"
        viewBox="0 0 333 484"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g className="lamp__shade shade">
          <ellipse
            className="shade__opening"
            cx="165"
            cy="220"
            rx="130"
            ry="20"
          />
          <ellipse
            className="shade__opening-shade"
            cx="165"
            cy="220"
            rx="130"
            ry="20"
            fill="url(#opening-shade)"
          />
        </g>
        <g className="lamp__base base">
          <path
            className="base__side"
            d="M165 464c44.183 0 80-8.954 80-20v-14h-22.869c-14.519-3.703-34.752-6-57.131-6-22.379 0-42.612 2.297-57.131 6H85v14c0 11.046 35.817 20 80 20z"
          />
          <path
            d="M165 464c44.183 0 80-8.954 80-20v-14h-22.869c-14.519-3.703-34.752-6-57.131-6-22.379 0-42.612 2.297-57.131 6H85v14c0 11.046 35.817 20 80 20z"
            fill="url(#side-shading)"
          />
          <ellipse
            className="base__top"
            cx="165"
            cy="430"
            rx="80"
            ry="20"
          />
          <ellipse
            cx="165"
            cy="430"
            rx="80"
            ry="20"
            fill="url(#base-shading)"
          />
        </g>
        <g className="lamp__post post">
          <path
            className="post__body"
            d="M180 142h-30v286c0 3.866 6.716 7 15 7 8.284 0 15-3.134 15-7V142z"
          />
          <path
            d="M180 142h-30v286c0 3.866 6.716 7 15 7 8.284 0 15-3.134 15-7V142z"
            fill="url(#post-shading)"
          />
        </g>
        <g className="lamp__cords cords">
          <line
            ref={dummyCordRef}
            className="cord"
            x1="124"
            y1="190"
            x2="124"
            y2="348"
            strokeWidth="6"
            strokeLinecap="round"
          />
        </g>
        <path
          className="lamp__light"
          d="M290.5 193H39L0 463.5c0 11.046 75.478 20 165.5 20s167-11.954 167-23l-42-267.5z"
          fill="url(#light)"
        />
        <g className="lamp__top top">
          <path
            className="top__body"
            fillRule="evenodd"
            clipRule="evenodd"
            d="M164.859 0c55.229 0 100 8.954 100 20l29.859 199.06C291.529 208.451 234.609 200 164.859 200S38.189 208.451 35 219.06L64.859 20c0-11.046 44.772-20 100-20z"
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
          <g className="lamp__mouth">
            <path
              d="M165 178c19.882 0 36-16.118 36-36h-72c0 19.882 16.118 36 36 36z"
              fill="#141414"
            />
            <clipPath
              className="lamp__feature"
              id="mouth"
              x="129"
              y="142"
              width="72"
              height="36"
            >
              <path
                d="M165 178c19.882 0 36-16.118 36-36h-72c0 19.882 16.118 36 36 36z"
                fill="#141414"
              />
            </clipPath>
            <g clipPath="url(#mouth)">
              <circle
                className="lamp__tongue"
                cx="179.4"
                cy="172.6"
                r="18"
              />
            </g>
          </g>
          <g className="lamp__eyes">
            <path
              className="lamp__eye lamp__stroke"
              d="M115 135c0-5.523-5.82-10-13-10s-13 4.477-13 10"
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              className="lamp__eye lamp__stroke"
              d="M241 135c0-5.523-5.82-10-13-10s-13 4.477-13 10"
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </g>
        </g>
        <defs>
          <linearGradient
            id="opening-shade"
            x1="35"
            y1="220"
            x2="295"
            y2="220"
            gradientUnits="userSpaceOnUse"
          >
            <stop />
            <stop
              offset="1"
              stopColor="var(--shade)"
              stopOpacity="0"
            />
          </linearGradient>
          <linearGradient
            id="base-shading"
            x1="85"
            y1="444"
            x2="245"
            y2="444"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="var(--b-1)" />
            <stop
              offset="0.8"
              stopColor="var(--b-2)"
              stopOpacity="0"
            />
          </linearGradient>
          <linearGradient
            id="side-shading"
            x1="119"
            y1="430"
            x2="245"
            y2="430"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="var(--b-3)" />
            <stop
              offset="1"
              stopColor="var(--b-4)"
              stopOpacity="0"
            />
          </linearGradient>
          <linearGradient
            id="post-shading"
            x1="150"
            y1="288"
            x2="180"
            y2="288"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="var(--b-1)" />
            <stop
              offset="1"
              stopColor="var(--b-2)"
              stopOpacity="0"
            />
          </linearGradient>
          <linearGradient
            id="light"
            x1="165.5"
            y1="218.5"
            x2="165.5"
            y2="483.5"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="var(--l-1)" stopOpacity=".2" />
            <stop
              offset="1"
              stopColor="var(--l-2)"
              stopOpacity="0"
            />
          </linearGradient>
          <linearGradient
            id="top-shading"
            x1="56"
            y1="110"
            x2="295"
            y2="110"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="var(--t-1)" stopOpacity=".8" />
            <stop
              offset="1"
              stopColor="var(--t-2)"
              stopOpacity="0"
            />
          </linearGradient>
        </defs>
        <circle
          ref={hitRef}
          className="lamp__hit"
          cx="124"
          cy="347"
          r="66"
          fill="#C4C4C4"
          fillOpacity=".1"
          style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseLeave}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        />
      </svg>
    </div>
  );
};

export default CuteLamp;
