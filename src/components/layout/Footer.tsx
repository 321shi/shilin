import { siteData } from '@/data/siteData';

export default function Footer() {
  return (
    <footer className="relative z-10 border-t border-border bg-surface/50 backdrop-blur-sm">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="text-center">
          <p className="text-2xl font-bold gradient-text mb-4">
            {siteData.name}
          </p>
          <p className="text-muted mb-6">
            {siteData.tagline}
          </p>
          <div className="flex justify-center gap-6 mb-8">
            {siteData.social.map((link) => (
              <a
                key={link.name}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted hover:text-primary transition-colors duration-300"
              >
                {link.name}
              </a>
            ))}
          </div>
          <p className="text-muted text-sm">
            © 2026 {siteData.name}. 用心记录生活。
          </p>
        </div>
      </div>
    </footer>
  );
}
