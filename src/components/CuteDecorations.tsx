import React from 'react';

export const PawPrint = ({ className = '', size = 24 }: { className?: string; size?: number }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="currentColor" 
    className={`text-primary/30 ${className}`}
  >
    <path d="M12 14c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm-6-6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm12 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm-6-6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/>
  </svg>
);

export const Bone = ({ className = '', size = 24 }: { className?: string; size?: number }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="currentColor" 
    className={`text-secondary/40 ${className}`}
  >
    <path d="M18 6c-1.1 0-2 .9-2 2 0 .74.4 1.39 1 1.73V14.27c-.6.34-1 .99-1 1.73 0 1.1.9 2 2 2s2-.9 2-2c0-.74-.4-1.39-1-1.73V9.73c.6-.34 1-.99 1-1.73 0-1.1-.9-2-2-2zM6 6c-1.1 0-2 .9-2 2 0 .74.4 1.39 1 1.73v4.54c-.6.34-1 .99-1 1.73 0 1.1.9 2 2 2s2-.9 2-2c0-.74-.4-1.39-1-1.73V9.73c.6-.34 1-.99 1-1.73 0-1.1-.9-2-2-2zm6 4c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/>
  </svg>
);

export const Star = ({ className = '', size = 20 }: { className?: string; size?: number }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="currentColor" 
    className={`text-primary/40 ${className}`}
  >
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
  </svg>
);

export const Heart = ({ className = '', size = 20 }: { className?: string; size?: number }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="currentColor" 
    className={`text-primary/50 ${className}`}
  >
    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
  </svg>
);

export const CuteDog = ({ className = '', size = 80 }: { className?: string; size?: number }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 100 100" 
    className={`${className}`}
  >
    <circle cx="50" cy="55" r="30" fill="#FFF8DC" stroke="#4A4A4A" strokeWidth="2"/>
    <ellipse cx="30" cy="30" rx="12" ry="18" fill="#FFF8DC" stroke="#4A4A4A" strokeWidth="2"/>
    <ellipse cx="70" cy="30" rx="12" ry="18" fill="#FFF8DC" stroke="#4A4A4A" strokeWidth="2"/>
    <circle cx="40" cy="50" r="5" fill="#4A4A4A"/>
    <circle cx="60" cy="50" r="5" fill="#4A4A4A"/>
    <circle cx="42" cy="48" r="2" fill="#FFFFFF"/>
    <circle cx="62" cy="48" r="2" fill="#FFFFFF"/>
    <ellipse cx="50" cy="60" rx="4" ry="3" fill="#4A4A4A"/>
    <path d="M45 65 Q50 70 55 65" stroke="#4A4A4A" strokeWidth="2" fill="none"/>
    <ellipse cx="32" cy="58" rx="6" ry="4" fill="#FFB6C1" opacity="0.6"/>
    <ellipse cx="68" cy="58" rx="6" ry="4" fill="#FFB6C1" opacity="0.6"/>
  </svg>
);
