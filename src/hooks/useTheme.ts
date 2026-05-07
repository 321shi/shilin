import { useState, useEffect } from 'react';
import { ThemeConfig, defaultTheme, THEME_STORAGE_KEY } from '@/config/theme';

export const useTheme = () => {
  const [theme, setTheme] = useState<ThemeConfig>(defaultTheme);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem(THEME_STORAGE_KEY);
    if (savedTheme) {
      try {
        const parsed = JSON.parse(savedTheme);
        setTheme(parsed);
        applyTheme(parsed);
      } catch (error) {
        console.error('Failed to parse saved theme:', error);
      }
    }
    setIsLoaded(true);
  }, []);

  const applyTheme = (config: ThemeConfig) => {
    const root = document.documentElement;
    
    root.style.setProperty('--color-primary', config.colors.primary);
    root.style.setProperty('--color-secondary', config.colors.secondary);
    root.style.setProperty('--color-accent', config.colors.accent);
    root.style.setProperty('--color-background', config.colors.background);
    root.style.setProperty('--color-text', config.colors.text);
    root.style.setProperty('--color-muted', config.colors.muted);
    root.style.setProperty('--color-border', config.colors.border);
    root.style.setProperty('--color-surface', config.colors.surface);

    let backgroundStyle = '';
    if (config.background.type === 'gradient') {
      backgroundStyle = `linear-gradient(135deg, ${config.background.value} 0%, ${config.background.secondaryColor || config.background.value} 50%, ${config.background.thirdColor || config.background.value} 100%)`;
    } else if (config.background.type === 'solid') {
      backgroundStyle = config.background.value;
    } else {
      backgroundStyle = `url(${config.background.value})`;
    }
    
    document.body.style.background = backgroundStyle;
  };

  const updateTheme = (newTheme: ThemeConfig) => {
    setTheme(newTheme);
    applyTheme(newTheme);
    localStorage.setItem(THEME_STORAGE_KEY, JSON.stringify(newTheme));
  };

  const resetTheme = () => {
    updateTheme(defaultTheme);
  };

  const updateColors = (colors: Partial<ThemeConfig['colors']>) => {
    updateTheme({
      ...theme,
      colors: { ...theme.colors, ...colors }
    });
  };

  const updateBackground = (background: ThemeConfig['background']) => {
    updateTheme({
      ...theme,
      background
    });
  };

  return {
    theme,
    isLoaded,
    updateTheme,
    updateColors,
    updateBackground,
    resetTheme
  };
};
