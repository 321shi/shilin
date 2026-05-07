import { useState } from 'react';
import { X, Check, Palette, Image as ImageIcon } from 'lucide-react';
import { useTheme } from '@/hooks/useTheme';
import { presetThemes, ThemeConfig } from '@/config/theme';

interface ThemeSettingsProps {
  onClose: () => void;
}

export default function ThemeSettings({ onClose }: ThemeSettingsProps) {
  const { theme, updateTheme, updateColors, updateBackground, resetTheme } = useTheme();
  const [activeTab, setActiveTab] = useState<'presets' | 'colors' | 'background'>('presets');
  const [customColors, setCustomColors] = useState(theme.colors);
  const [backgroundConfig, setBackgroundConfig] = useState(theme.background);

  const handlePresetSelect = (preset: { name: string; config: ThemeConfig }) => {
    updateTheme(preset.config);
  };

  const handleColorChange = (key: keyof typeof customColors, value: string) => {
    const newColors = { ...customColors, [key]: value };
    setCustomColors(newColors);
  };

  const handleApplyColors = () => {
    updateColors(customColors);
  };

  const handleBackgroundTypeChange = (type: 'gradient' | 'solid' | 'image') => {
    const newConfig = { ...backgroundConfig, type };
    setBackgroundConfig(newConfig);
  };

  const handleApplyBackground = () => {
    updateBackground(backgroundConfig);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ backgroundColor: 'rgba(0, 0, 0, 0.8)', backdropFilter: 'blur(8px)' }}>
      <div 
        className="glass-card w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col"
        style={{
          background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          border: '1px solid rgba(255, 255, 255, 0.15)',
          borderRadius: '24px',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.5)'
        }}
      >
        <div className="p-6 border-b border-white/10 flex items-center justify-between">
          <h2 className="text-2xl font-bold">主题设置</h2>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-white/10 transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        <div className="flex border-b border-white/10">
          <button
            onClick={() => setActiveTab('presets')}
            className={`flex-1 px-6 py-4 font-medium transition-colors ${
              activeTab === 'presets' ? 'text-primary border-b-2 border-primary' : 'text-muted hover:text-white'
            }`}
          >
            预设主题
          </button>
          <button
            onClick={() => setActiveTab('colors')}
            className={`flex-1 px-6 py-4 font-medium transition-colors ${
              activeTab === 'colors' ? 'text-primary border-b-2 border-primary' : 'text-muted hover:text-white'
            }`}
          >
            <Palette size={18} className="inline mr-2" />
            自定义颜色
          </button>
          <button
            onClick={() => setActiveTab('background')}
            className={`flex-1 px-6 py-4 font-medium transition-colors ${
              activeTab === 'background' ? 'text-primary border-b-2 border-primary' : 'text-muted hover:text-white'
            }`}
          >
            <ImageIcon size={18} className="inline mr-2" />
            背景设置
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          {activeTab === 'presets' && (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {presetThemes.map((preset) => (
                <button
                  key={preset.name}
                  onClick={() => handlePresetSelect(preset)}
                  className="p-4 rounded-xl transition-all hover:scale-105 relative group"
                  style={{
                    background: preset.config.background.type === 'gradient'
                      ? `linear-gradient(135deg, ${preset.config.background.value} 0%, ${preset.config.background.secondaryColor} 100%)`
                      : preset.config.background.value,
                    border: '2px solid rgba(255, 255, 255, 0.1)'
                  }}
                >
                  <div className="space-y-2">
                    <div className="flex gap-2">
                      <div
                        className="w-8 h-8 rounded-full"
                        style={{ backgroundColor: preset.config.colors.primary }}
                      />
                      <div
                        className="w-8 h-8 rounded-full"
                        style={{ backgroundColor: preset.config.colors.secondary }}
                      />
                      <div
                        className="w-8 h-8 rounded-full"
                        style={{ backgroundColor: preset.config.colors.accent }}
                      />
                    </div>
                    <p className="text-sm font-medium" style={{ color: preset.config.colors.text }}>
                      {preset.name}
                    </p>
                  </div>
                  
                  {JSON.stringify(theme) === JSON.stringify(preset.config) && (
                    <div className="absolute top-2 right-2 bg-primary rounded-full p-1">
                      <Check size={16} />
                    </div>
                  )}
                  
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 rounded-xl transition-colors" />
                </button>
              ))}
            </div>
          )}

          {activeTab === 'colors' && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                {Object.entries(customColors).map(([key, value]) => (
                  <div key={key}>
                    <label className="block text-sm font-medium mb-2 capitalize">
                      {key.replace(/([A-Z])/g, ' $1').trim()}
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="color"
                        value={value}
                        onChange={(e) => handleColorChange(key as keyof typeof customColors, e.target.value)}
                        className="w-12 h-10 rounded cursor-pointer"
                        style={{ border: '1px solid rgba(255, 255, 255, 0.2)' }}
                      />
                      <input
                        type="text"
                        value={value}
                        onChange={(e) => handleColorChange(key as keyof typeof customColors, e.target.value)}
                        className="flex-1 px-3 py-2 rounded-lg glass-input text-sm font-mono"
                        placeholder="#000000"
                      />
                    </div>
                  </div>
                ))}
              </div>
              
              <button
                onClick={handleApplyColors}
                className="w-full px-6 py-3 bg-gradient-to-r from-primary to-secondary text-white rounded-xl font-semibold hover:opacity-90 transition-all"
              >
                应用颜色设置
              </button>
            </div>
          )}

          {activeTab === 'background' && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-3">背景类型</label>
                <div className="flex gap-3">
                  <button
                    onClick={() => handleBackgroundTypeChange('gradient')}
                    className={`flex-1 px-4 py-3 rounded-xl transition-all ${
                      backgroundConfig.type === 'gradient' ? 'bg-primary text-white' : 'glass-card'
                    }`}
                  >
                    渐变色
                  </button>
                  <button
                    onClick={() => handleBackgroundTypeChange('solid')}
                    className={`flex-1 px-4 py-3 rounded-xl transition-all ${
                      backgroundConfig.type === 'solid' ? 'bg-primary text-white' : 'glass-card'
                    }`}
                  >
                    单色
                  </button>
                  <button
                    onClick={() => handleBackgroundTypeChange('image')}
                    className={`flex-1 px-4 py-3 rounded-xl transition-all ${
                      backgroundConfig.type === 'image' ? 'bg-primary text-white' : 'glass-card'
                    }`}
                  >
                    图片
                  </button>
                </div>
              </div>

              {backgroundConfig.type === 'gradient' && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">主颜色</label>
                    <div className="flex gap-2">
                      <input
                        type="color"
                        value={backgroundConfig.value}
                        onChange={(e) => setBackgroundConfig({ ...backgroundConfig, value: e.target.value })}
                        className="w-12 h-10 rounded cursor-pointer"
                      />
                      <input
                        type="text"
                        value={backgroundConfig.value}
                        onChange={(e) => setBackgroundConfig({ ...backgroundConfig, value: e.target.value })}
                        className="flex-1 px-3 py-2 rounded-lg glass-input text-sm font-mono"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">第二颜色</label>
                    <div className="flex gap-2">
                      <input
                        type="color"
                        value={backgroundConfig.secondaryColor || '#000000'}
                        onChange={(e) => setBackgroundConfig({ ...backgroundConfig, secondaryColor: e.target.value })}
                        className="w-12 h-10 rounded cursor-pointer"
                      />
                      <input
                        type="text"
                        value={backgroundConfig.secondaryColor || '#000000'}
                        onChange={(e) => setBackgroundConfig({ ...backgroundConfig, secondaryColor: e.target.value })}
                        className="flex-1 px-3 py-2 rounded-lg glass-input text-sm font-mono"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">第三颜色</label>
                    <div className="flex gap-2">
                      <input
                        type="color"
                        value={backgroundConfig.thirdColor || '#000000'}
                        onChange={(e) => setBackgroundConfig({ ...backgroundConfig, thirdColor: e.target.value })}
                        className="w-12 h-10 rounded cursor-pointer"
                      />
                      <input
                        type="text"
                        value={backgroundConfig.thirdColor || '#000000'}
                        onChange={(e) => setBackgroundConfig({ ...backgroundConfig, thirdColor: e.target.value })}
                        className="flex-1 px-3 py-2 rounded-lg glass-input text-sm font-mono"
                      />
                    </div>
                  </div>
                </div>
              )}

              {backgroundConfig.type === 'solid' && (
                <div>
                  <label className="block text-sm font-medium mb-2">背景颜色</label>
                  <div className="flex gap-2">
                    <input
                      type="color"
                      value={backgroundConfig.value}
                      onChange={(e) => setBackgroundConfig({ ...backgroundConfig, value: e.target.value })}
                      className="w-12 h-10 rounded cursor-pointer"
                    />
                    <input
                      type="text"
                      value={backgroundConfig.value}
                      onChange={(e) => setBackgroundConfig({ ...backgroundConfig, value: e.target.value })}
                      className="flex-1 px-3 py-2 rounded-lg glass-input text-sm font-mono"
                    />
                  </div>
                </div>
              )}

              {backgroundConfig.type === 'image' && (
                <div>
                  <label className="block text-sm font-medium mb-2">图片URL</label>
                  <input
                    type="text"
                    value={backgroundConfig.value}
                    onChange={(e) => setBackgroundConfig({ ...backgroundConfig, value: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg glass-input text-sm"
                    placeholder="输入图片URL"
                  />
                </div>
              )}

              <button
                onClick={handleApplyBackground}
                className="w-full px-6 py-3 bg-gradient-to-r from-primary to-secondary text-white rounded-xl font-semibold hover:opacity-90 transition-all"
              >
                应用背景设置
              </button>
            </div>
          )}
        </div>

        <div className="p-6 border-t border-white/10 flex gap-3">
          <button
            onClick={resetTheme}
            className="flex-1 px-6 py-3 glass-card font-semibold rounded-xl hover:bg-white/10 transition-all"
          >
            重置为默认
          </button>
          <button
            onClick={onClose}
            className="flex-1 px-6 py-3 bg-gradient-to-r from-primary to-secondary text-white font-semibold rounded-xl hover:opacity-90 transition-all"
          >
            完成
          </button>
        </div>
      </div>
    </div>
  );
}
