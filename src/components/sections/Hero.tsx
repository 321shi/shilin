import { ArrowDown } from 'lucide-react';
import { siteData } from '@/data/siteData';

export default function Hero() {
  return (
    <section id="hero" className="min-h-screen flex items-center justify-center px-6 pt-20">
      <div className="max-w-4xl mx-auto text-center">
        <div className="mb-8 animate-float">
          <div className="w-36 h-36 mx-auto rounded-full bg-gradient-to-br from-primary via-secondary to-accent p-1.5 shadow-2xl">
            <div className="w-full h-full rounded-full glass-card flex items-center justify-center" style={{
              background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.12) 0%, rgba(255, 255, 255, 0.04) 100%)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.35), 0 0 0 1px rgba(255, 255, 255, 0.05) inset'
            }}>
              <span className="text-6xl">👨‍💻</span>
            </div>
          </div>
        </div>

        <p className="text-primary font-semibold mb-4 tracking-wide uppercase text-sm animate-fade-in">
          你好，很高兴认识你
        </p>

        <h1 className="text-5xl md:text-7xl font-bold mb-6 font-display animate-fade-in">
          我是 <span className="gradient-text">{siteData.name}</span>
        </h1>

        <p className="text-xl md:text-2xl text-muted mb-8 animate-fade-in">
          {siteData.title}
        </p>

        <p className="text-lg text-muted max-w-2xl mx-auto mb-12 animate-fade-in">
          {siteData.tagline}
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in">
          <a
            href="#about"
            onClick={(e) => {
              e.preventDefault();
              document.querySelector('#about')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="px-8 py-4 bg-gradient-to-r from-primary to-secondary text-white rounded-2xl font-semibold hover:opacity-90 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
            style={{
              boxShadow: '0 8px 32px rgba(99, 102, 241, 0.35), 0 0 0 1px rgba(255, 255, 255, 0.05) inset'
            }}
          >
            了解更多
          </a>
          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="px-8 py-4 glass-card text-text rounded-2xl font-semibold transition-all duration-300 hover:scale-105"
            style={{
              background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.03) 100%)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              border: '1px solid rgba(255, 255, 255, 0.12)'
            }}
          >
            联系我
          </a>
        </div>

        <div className="mt-20 animate-bounce">
          <a
            href="#about"
            onClick={(e) => {
              e.preventDefault();
              document.querySelector('#about')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="text-muted hover:text-primary transition-colors duration-300 inline-flex flex-col items-center"
          >
            <span className="text-sm mb-2">向下滚动</span>
            <ArrowDown size={20} />
          </a>
        </div>
      </div>

      <style>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fade-in {
          animation: fade-in 0.8s ease-out forwards;
        }
        
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        
        .animate-fade-in:nth-child(1) { animation-delay: 0.1s; }
        .animate-fade-in:nth-child(2) { animation-delay: 0.2s; }
        .animate-fade-in:nth-child(3) { animation-delay: 0.3s; }
        .animate-fade-in:nth-child(4) { animation-delay: 0.4s; }
        .animate-fade-in:nth-child(5) { animation-delay: 0.5s; }
        .animate-fade-in:nth-child(6) { animation-delay: 0.6s; }
        .animate-fade-in:nth-child(7) { animation-delay: 0.7s; }
      `}</style>
    </section>
  );
}
