export interface ThemeColors {
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  text: string;
  muted: string;
  border: string;
  surface: string;
}

export interface BackgroundConfig {
  type: 'gradient' | 'solid' | 'image';
  value: string;
  secondaryColor?: string;
  thirdColor?: string;
}

export interface ThemeConfig {
  colors: ThemeColors;
  background: BackgroundConfig;
}

export const defaultTheme: ThemeConfig = {
  colors: {
    primary: '#6366f1',
    secondary: '#8b5cf6',
    accent: '#06b6d4',
    background: '#0f172a',
    text: '#ffffff',
    muted: '#94a3b8',
    border: '#1e293b',
    surface: 'rgba(255, 255, 255, 0.05)'
  },
  background: {
    type: 'gradient',
    value: '#0f172a',
    secondaryColor: '#1e1b4b',
    thirdColor: '#0f172a'
  }
};

export const presetThemes: { name: string; config: ThemeConfig }[] = [
  {
    name: '🌙 深空紫',
    config: {
      colors: {
        primary: '#6366f1',
        secondary: '#8b5cf6',
        accent: '#06b6d4',
        background: '#0f172a',
        text: '#ffffff',
        muted: '#94a3b8',
        border: '#1e293b',
        surface: 'rgba(255, 255, 255, 0.05)'
      },
      background: {
        type: 'gradient',
        value: '#0f172a',
        secondaryColor: '#1e1b4b',
        thirdColor: '#0f172a'
      }
    }
  },
  {
    name: '🌌 星空蓝',
    config: {
      colors: {
        primary: '#3b82f6',
        secondary: '#06b6d4',
        accent: '#f59e0b',
        background: '#0c0a1d',
        text: '#e2e8f0',
        muted: '#94a3b8',
        border: '#1e1b3a',
        surface: 'rgba(59, 130, 246, 0.05)'
      },
      background: {
        type: 'gradient',
        value: '#0c0a1d',
        secondaryColor: '#1a1a3e',
        thirdColor: '#0c0a1d'
      }
    }
  },
  {
    name: '🌸 樱花粉',
    config: {
      colors: {
        primary: '#ec4899',
        secondary: '#f472b6',
        accent: '#fbbf24',
        background: '#1f0a1f',
        text: '#fef3f7',
        muted: '#f9a8d4',
        border: '#3b1a3b',
        surface: 'rgba(236, 72, 153, 0.05)'
      },
      background: {
        type: 'gradient',
        value: '#1f0a1f',
        secondaryColor: '#3a1a3a',
        thirdColor: '#1f0a1f'
      }
    }
  },
  {
    name: '🌿 自然绿',
    config: {
      colors: {
        primary: '#22c55e',
        secondary: '#10b981',
        accent: '#f59e0b',
        background: '#051a0a',
        text: '#ecfdf5',
        muted: '#86efac',
        border: '#0a2a14',
        surface: 'rgba(34, 197, 94, 0.05)'
      },
      background: {
        type: 'gradient',
        value: '#051a0a',
        secondaryColor: '#0a2a14',
        thirdColor: '#051a0a'
      }
    }
  },
  {
    name: '🔥 烈焰红',
    config: {
      colors: {
        primary: '#ef4444',
        secondary: '#f97316',
        accent: '#eab308',
        background: '#1a0505',
        text: '#fef2f2',
        muted: '#fca5a5',
        border: '#2a0a0a',
        surface: 'rgba(239, 68, 68, 0.05)'
      },
      background: {
        type: 'gradient',
        value: '#1a0505',
        secondaryColor: '#2a0a0a',
        thirdColor: '#1a0505'
      }
    }
  },
  {
    name: '⚡ 电光蓝',
    config: {
      colors: {
        primary: '#00d4ff',
        secondary: '#0099ff',
        accent: '#ff6b00',
        background: '#001a33',
        text: '#e0f7ff',
        muted: '#80e0ff',
        border: '#003366',
        surface: 'rgba(0, 212, 255, 0.05)'
      },
      background: {
        type: 'gradient',
        value: '#001a33',
        secondaryColor: '#002244',
        thirdColor: '#001a33'
      }
    }
  }
];

export const THEME_STORAGE_KEY = 'mrl-website-theme';
