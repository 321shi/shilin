import { Calendar, Clock, ArrowRight } from 'lucide-react';
import { siteData } from '@/data/siteData';

export default function Blog() {
  return (
    <section id="blog" className="py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 font-display">
            最新 <span className="gradient-text">文章</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-primary to-secondary mx-auto rounded-full" />
          <p className="text-muted mt-4 max-w-2xl mx-auto">
            分享我在技术、生活和成长过程中的思考与经验
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {siteData.posts.map((post) => (
            <article
              key={post.id}
              className="glass-card p-6 hover:border-primary/40 transition-all duration-300 cursor-pointer group"
              style={{
                background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.03) 100%)',
                backdropFilter: 'blur(20px)',
                WebkitBackdropFilter: 'blur(20px)',
                border: '1px solid rgba(255, 255, 255, 0.12)',
                borderRadius: '20px'
              }}
            >
              <div className="flex flex-wrap items-center gap-4 mb-3">
                <span className="px-3 py-1 glass-card text-primary text-xs font-semibold rounded-full" style={{
                  background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.18) 0%, rgba(139, 92, 246, 0.12) 100%)',
                  backdropFilter: 'blur(8px)',
                  WebkitBackdropFilter: 'blur(8px)',
                  border: '1px solid rgba(99, 102, 241, 0.25)'
                }}>
                  {post.category}
                </span>
                <span className="flex items-center gap-1.5 text-muted text-sm">
                  <Calendar className="w-4 h-4" />
                  {post.date}
                </span>
                <span className="flex items-center gap-1.5 text-muted text-sm">
                  <Clock className="w-4 h-4" />
                  {post.readTime}
                </span>
              </div>

              <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors">
                {post.title}
              </h3>

              <p className="text-muted leading-relaxed mb-4">
                {post.excerpt}
              </p>

              <div className="flex items-center gap-2 text-primary font-semibold text-sm group-hover:translate-x-2 transition-transform">
                阅读全文
                <ArrowRight className="w-4 h-4" />
              </div>
            </article>
          ))}
        </div>

        <div className="text-center mt-12">
          <button className="px-8 py-4 glass-card text-text rounded-2xl font-semibold transition-all duration-300 hover:scale-105" style={{
            background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.03) 100%)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            border: '1px solid rgba(255, 255, 255, 0.12)'
          }}>
            查看更多文章
          </button>
        </div>
      </div>
    </section>
  );
}
