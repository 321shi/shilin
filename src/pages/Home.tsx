import { useState } from 'react';
import ParticleBackground from '@/components/background/ParticleBackground';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Hero from '@/components/sections/Hero';
import About from '@/components/sections/About';
import Projects from '@/components/sections/Projects';
import Blog from '@/components/sections/Blog';
import Contact from '@/components/sections/Contact';
import ThemeSettings from '@/components/ThemeSettings';
import { Settings } from 'lucide-react';
import { useTheme } from '@/hooks/useTheme';

export default function Home() {
  const [showThemeSettings, setShowThemeSettings] = useState(false);
  const { isLoaded } = useTheme();

  if (!isLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-white">加载中...</div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen">
      <ParticleBackground />
      <Header />
      
      <button
        onClick={() => setShowThemeSettings(true)}
        className="fixed bottom-6 right-6 z-40 p-4 rounded-full glass-card transition-all hover:scale-110 group"
        style={{
          background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.2) 0%, rgba(139, 92, 246, 0.15) 100%)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          border: '1px solid rgba(255, 255, 255, 0.15)',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.35)'
        }}
        title="主题设置"
      >
        <Settings 
          size={24} 
          className="text-white group-hover:rotate-45 transition-transform duration-300"
        />
      </button>
      
      {showThemeSettings && (
        <ThemeSettings onClose={() => setShowThemeSettings(false)} />
      )}
      
      <main className="relative z-10">
        <Hero />
        <About />
        <Projects />
        <Blog />
        <Contact />
      </main>
      
      <Footer />
    </div>
  );
}
