import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogOut, PenTool, Calendar, Clock, ArrowRight, BookOpen } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { CuteDog, PawPrint, Heart, Star } from '@/components/CuteDecorations';

interface Post {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  category: string;
}

const samplePosts: Post[] = [
  {
    id: '1',
    title: '关于生活的思考与记录',
    excerpt: '生活中的每一个瞬间都值得被记录。今天我想分享一些最近的想法和感悟，希望能给你带来一点启发。',
    date: '2024年1月15日',
    readTime: '5 分钟',
    category: '生活随笔'
  },
  {
    id: '2',
    title: '探索编程的艺术',
    excerpt: '编程不仅仅是写代码，更是一种创造性的表达。让我们一起探索其中的奥秘，发现技术之美。',
    date: '2024年1月10日',
    readTime: '8 分钟',
    category: '技术分享'
  },
  {
    id: '3',
    title: '阅读带来的改变',
    excerpt: '最近读完了几本书，每一本都给我带来了不同的启发。想和大家分享一下阅读的快乐。',
    date: '2024年1月5日',
    readTime: '6 分钟',
    category: '读书笔记'
  },
  {
    id: '4',
    title: '旅行的意义',
    excerpt: '去年去了几个地方，看到了不一样的风景，也遇到了有趣的人。记录下这些美好的回忆。',
    date: '2023年12月28日',
    readTime: '7 分钟',
    category: '旅行日记'
  }
];

export default function Home() {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const [posts] = useState<Post[]>(samplePosts);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  if (!isAuthenticated || !user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background font-sans relative overflow-hidden">
      <div className="absolute top-20 left-10 float opacity-50">
        <PawPrint size={50} />
      </div>
      <div className="absolute top-40 right-20 bounce-soft opacity-50">
        <Heart size={40} />
      </div>
      <div className="absolute bottom-40 left-20 bounce-soft opacity-50" style={{ animationDelay: '0.7s' }}>
        <Star size={35} />
      </div>
      <div className="absolute bottom-20 right-10 float opacity-50" style={{ animationDelay: '1.2s' }}>
        <PawPrint size={45} />
      </div>

      <header className="bg-surface border-b-2 border-border sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-gradient-to-br from-primary to-secondary rounded-2xl flex items-center justify-center text-white shadow-soft">
                <BookOpen className="w-7 h-7" />
              </div>
              <div>
                <h1 className="text-xl font-extrabold text-text">{user.name}</h1>
                <p className="text-sm text-muted">{user.email}</p>
              </div>
            </div>
            <button
              onClick={logout}
              className="flex items-center gap-2 px-5 py-2.5 text-muted hover:text-primary transition-all hover:bg-accent/30 rounded-xl font-semibold"
            >
              <LogOut className="w-5 h-5" />
              <span className="text-sm">退出</span>
            </button>
          </div>
        </div>
      </header>

      <section className="max-w-4xl mx-auto px-6 py-12">
        <div className="text-center">
          <div className="mb-6">
            <div className="inline-block bounce-soft">
              <CuteDog size={100} />
            </div>
          </div>
          <p className="text-primary font-bold mb-3 tracking-wide uppercase text-sm">欢迎回来！</p>
          <h2 className="text-4xl md:text-5xl font-extrabold text-text mb-4">
            我的个人博客
          </h2>
          <p className="text-lg text-muted max-w-2xl mx-auto">
            在这里记录一切我想记录的。生活、学习、思考与成长 🐾
          </p>
        </div>
      </section>

      <main className="max-w-4xl mx-auto px-6 pb-16 relative z-10">
        <div className="flex items-center gap-3 mb-8">
          <PenTool className="w-6 h-6 text-primary" />
          <h3 className="text-2xl font-extrabold text-text">最新文章</h3>
        </div>

        <div className="space-y-6">
          {posts.map((post, index) => (
            <article
              key={post.id}
              className="bg-surface border-2 border-border rounded-3xl p-7 hover:border-primary/40 hover:shadow-cute transition-all cursor-pointer group"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex flex-wrap items-center gap-4 mb-4">
                <span className="px-4 py-1.5 bg-primary/20 text-primary text-xs font-bold rounded-full">
                  {post.category}
                </span>
                <span className="flex items-center gap-1.5 text-muted text-sm font-semibold">
                  <Calendar className="w-4 h-4" />
                  {post.date}
                </span>
                <span className="flex items-center gap-1.5 text-muted text-sm font-semibold">
                  <Clock className="w-4 h-4" />
                  {post.readTime}
                </span>
              </div>
              <h4 className="text-xl font-extrabold text-text mb-3 group-hover:text-primary transition-colors">
                {post.title}
              </h4>
              <p className="text-muted leading-relaxed mb-5">
                {post.excerpt}
              </p>
              <div className="flex items-center gap-2 text-primary font-bold text-sm">
                阅读全文
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </article>
          ))}
        </div>

        <div className="mt-10 text-center">
          <button className="px-10 py-4 bg-gradient-to-r from-primary to-secondary text-white rounded-2xl font-bold text-lg hover:opacity-90 transition-all shadow-soft hover:shadow-cute transform hover:-translate-y-0.5">
            写新文章 ✨
          </button>
        </div>
      </main>

      <footer className="border-t-2 border-border bg-surface py-10">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="flex justify-center gap-3 mb-4">
            <PawPrint size={24} className="inline" />
            <Heart size={24} className="inline" />
            <Star size={24} className="inline" />
          </div>
          <p className="text-muted text-sm font-semibold">
            © 2024 {user.name} 的博客。用心记录生活 💕
          </p>
        </div>
      </footer>
    </div>
  );
}
