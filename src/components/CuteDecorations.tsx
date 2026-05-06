import React from 'react';

export const LinePaw = ({ className = '', size = 28 }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 100 100" 
    className={className}
  >
    <circle cx="50" cy="65" r="20" fill="none" stroke="#2D2D2D" strokeWidth="3" />
    <circle cx="30" cy="35" r="12" fill="none" stroke="#2D2D2D" strokeWidth="3" />
    <circle cx="50" cy="30" r="10" fill="none" stroke="#2D2D2D" strokeWidth="3" />
    <circle cx="70" cy="35" r="12" fill="none" stroke="#2D2D2D" strokeWidth="3" />
  </svg>
);

export const LineBone = ({ className = '', size = 32 }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 100 100" 
    className={className}
  >
    <ellipse cx="25" cy="30" rx="15" ry="18" fill="none" stroke="#2D2D2D" strokeWidth="3" />
    <ellipse cx="75" cy="30" rx="15" ry="18" fill="none" stroke="#2D2D2D" strokeWidth="3" />
    <ellipse cx="25" cy="70" rx="15" ry="18" fill="none" stroke="#2D2D2D" strokeWidth="3" />
    <ellipse cx="75" cy="70" rx="15" ry="18" fill="none" stroke="#2D2D2D" strokeWidth="3" />
    <rect x="30" y="35" width="40" height="30" rx="8" fill="none" stroke="#2D2D2D" strokeWidth="3" />
  </svg>
);

export const LineStar = ({ className = '', size = 24 }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 100 100" 
    className={className}
  >
    <path 
      d="M50 5 L61 40 L98 40 L68 60 L79 95 L50 75 L21 95 L32 60 L2 40 L39 40 Z" 
      fill="none" 
      stroke="#2D2D2D" 
      strokeWidth="3" 
    />
  </svg>
);

export const LineHeart = ({ className = '', size = 26 }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 100 100" 
    className={className}
  >
    <path 
      d="M50 88 C20 60 5 40 20 25 C35 10 50 25 50 25 C50 25 65 10 80 25 C95 40 80 60 50 88 Z" 
      fill="none" 
      stroke="#2D2D2D" 
      strokeWidth="3" 
    />
  </svg>
);

export const LineDog = ({ className = '', size = 110 }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 120 120" 
    className={className}
  >
    <ellipse cx="35" cy="35" rx="18" ry="25" fill="none" stroke="#2D2D2D" strokeWidth="3" />
    <ellipse cx="85" cy="35" rx="18" ry="25" fill="none" stroke="#2D2D2D" strokeWidth="3" />
    <ellipse cx="60" cy="65" rx="32" ry="28" fill="none" stroke="#2D2D2D" strokeWidth="3" />
    <circle cx="48" cy="58" r="5" fill="#2D2D2D" />
    <circle cx="72" cy="58" r="5" fill="#2D2D2D" />
    <circle cx="50" cy="56" r="2" fill="white" />
    <circle cx="74" cy="56" r="2" fill="white" />
    <ellipse cx="60" cy="70" rx="5" ry="4" fill="#2D2D2D" />
    <path d="M52 78 Q60 85 68 78" stroke="#2D2D2D" strokeWidth="3" fill="none" />
    <line x1="32" y1="68" x2="42" y2="66" stroke="#2D2D2D" strokeWidth="2" />
    <line x1="32" y1="72" x2="42" y2="70" stroke="#2D2D2D" strokeWidth="2" />
    <line x1="78" y1="66" x2="88" y2="68" stroke="#2D2D2D" strokeWidth="2" />
    <line x1="78" y1="70" x2="88" y2="72" stroke="#2D2D2D" strokeWidth="2" />
    <circle cx="40" cy="72" r="8" fill="none" stroke="#FF8C42" strokeWidth="2" opacity="0.6" />
    <circle cx="80" cy="72" r="8" fill="none" stroke="#FF8C42" strokeWidth="2" opacity="0.6" />
  </svg>
);

export const DoodleDecor = ({ className = '' }) => (
  <div className={className}>
    <svg width="100%" height="100%" viewBox="0 0 200 200">
      <path d="M10 20 Q30 10, 50 20 T90 20" stroke="#2D2D2D" strokeWidth="2" fill="none" strokeDasharray="5,3" />
      <path d="M110 40 Q130 30, 150 40 T190 40" stroke="#6BA6FF" strokeWidth="2" fill="none" strokeDasharray="5,3" />
      <path d="M20 160 Q40 150, 60 160 T100 160" stroke="#FF8C42" strokeWidth="2" fill="none" strokeDasharray="5,3" />
      <circle cx="170" cy="150" r="8" fill="none" stroke="#2D2D2D" strokeWidth="2" />
      <circle cx="30" cy="100" r="6" fill="none" stroke="#6BA6FF" strokeWidth="2" />
      <path d="M140 80 L150 70 L160 85 L170 65" stroke="#FF8C42" strokeWidth="2" fill="none" />
    </svg>
  </div>
);

export const CornerLines = ({ className = '' }) => (
  <svg 
    width="120" 
    height="120" 
    viewBox="0 0 120 120" 
    className={className}
  >
    <path d="M10 30 L30 30 L30 10" stroke="#2D2D2D" strokeWidth="3" fill="none" />
    <path d="M90 10 L90 30 L110 30" stroke="#FF8C42" strokeWidth="3" fill="none" />
    <path d="M10 90 L30 90 L30 110" stroke="#6BA6FF" strokeWidth="3" fill="none" />
    <path d="M90 110 L90 90 L110 90" stroke="#2D2D2D" strokeWidth="3" fill="none" />
  </svg>
);
