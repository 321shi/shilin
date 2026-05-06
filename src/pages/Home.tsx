import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, LogOut, PenTool, Calendar, Clock, Zap, Star, Sparkles } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';

interface Post {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  category: string;
  color: string;
}

const samplePosts: Post[] = [
  {
    id: '1',
    title: '关于生活的思考与记录!',
    excerpt: '生活中的每一个瞬间都值得被记录。今天我想分享一些最近的想法和感悟...',
    date: '2024年1月15日',
    readTime: '5 分钟',
    category: '生活随笔',
    color: '#FF3D00'
  },
  {
    id: '2',
    title: '探索编程的艺术!',
    excerpt: '编程不仅仅是写代码，更是一种创造性的表达。让我们一起探索其中的奥秘...',
    date: '2024年1月10日',
    readTime: '8 分钟',
    category: '技术分享',
    color: '#0066FF'
  },
  {
    id: '3',
    title: '阅读带来的改变!',
    excerpt: '最近读完了几本书，每一本都给我带来了不同的启发。想和大家分享一下...',
    date: '2024年1月5日',
    readTime: '6 分钟',
    category: '读书笔记',
    color: '#FFEB3B'
  },
  {
    id: '4',
    title: '旅行的意义!',
    excerpt: '去年去了几个地方，看到了不一样的风景，也遇到了有趣的人...',
    date: '2023年12月28日',
    readTime: '7 分钟',
    category: '旅行日记',
    color: '#4CAF50'
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
    <div className="min-h-screen bg-background font-sans relative overflow-x-hidden">
      {/* 装饰性点点背景 */}
      <div className="fixed inset-0 opacity-20" style={{
        backgroundImage: 'radial-gradient(#1A1A1A 1px, transparent 1px)',
        backgroundSize: '20px 20px'
      }}></div>

      <div className="relative z-10">
        {/* Header */}
        <header className="border-b-4 border-border bg-white">
          <div className="max-w-5xl mx-auto px-6 py-6">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div className="flex items-center gap-4">
                <div className="w-20 h-20 bg-secondary border-4 border-border shadow-comic flex items-center justify-center rotate-[-3deg]">
                  <User className="w-10 h-10 text-white" />
                </div>
                <div>
                  <h1 className="text-4xl font-comic text-text tracking-wider">{user.name.toUpperCase()}!</h1>
                  <p className="text-lg font-bold text-secondary">{user.email}</p>
                </div>
              </div>
              <button
                onClick={logout}
                className="flex items-center gap-2 px-6 py-3 bg-accent border-4 border-border shadow-comic font-comic text-xl hover:translate-x-1 hover:translate-y-1 hover:shadow-comic-sm transition-transform"
              >
                <LogOut className="w-6 h-6" />
                <span>EXIT!</span>
              </button>
            </div>
          </div>
        </header>

        {/* Hero Section */}
        <section className="max-w-5xl mx-auto px-6 py-12">
          <div className="relative">
            {/* 爆炸装饰 */}
            <div className="absolute -top-6 -left-6 w-24 h-24 bg-accent border-4 border-border shadow-comic rotate-[-12deg] flex items-center justify-center">
              <span className="font-comic text-2xl text-border">POW!</span>
            </div>
            <div className="absolute -top-4 -right-4 w-20 h-20 bg-primary border-4 border-border shadow-comic rotate-[15deg] flex items-center justify-center">
              <Star className="w-10 h-10 text-white" />
            </div>

            <div className="bg-white border-4 border-border shadow-comic p-10 relative">
              <div className="text-center">
                <p className="text-xl font-bold text-secondary mb-3 uppercase tracking-wider">欢迎来到</p>
                <h2 className="text-7xl font-comic text-text mb-4 tracking-wider leading-tight">
                  我的个人
                  <span className="text-primary"> 博客!</span>
                </h2>
                <p className="text-2xl font-bold text-text">
                  在这里记录一切我想记录的! <Sparkles className="inline w-8 h-8 text-secondary ml-2" />
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Posts Section */}
        <main className="max-w-5xl mx-auto px-6 pb-16">
          <div className="flex items-center gap-4 mb-10">
            <div className="w-16 h-16 bg-primary border-4 border-border shadow-comic-sm flex items-center justify-center rotate-[-5deg]">
              <PenTool className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-5xl font-comic text-text tracking-wider">最新文章!</h3>
          </div>

          <div className="space-y-8">
            {posts.map((post, index) => (
              <article
                key={post.id}
                className="group cursor-pointer"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="bg-white border-4 border-border shadow-comic p-6 hover:translate-x-1 hover:translate-y-1 hover:shadow-comic-sm transition-transform">
                  <div className="flex flex-wrap items-center gap-4 mb-4">
                    <span
                      className="px-4 py-2 text-white font-comic text-lg border-4 border-border shadow-comic-sm"
                      style={{ backgroundColor: post.color }}
                    >
                      {post.category.toUpperCase()}
                    </span>
                    <span className="flex items-center gap-2 font-bold text-lg">
                      <Calendar className="w-6 h-6 text-secondary" />
                      {post.date}
                    </span>
                    <span className="flex items-center gap-2 font-bold text-lg">
                      <Clock className="w-6 h-6 text-primary" />
                      {post.readTime}
                    </span>
                  </div>
                  <h4 className="text-4xl font-comic text-text mb-4 group-hover:text-primary transition-colors tracking-wide">
                    {post.title}
                  </h4>
                  <p className="text-xl text-text leading-relaxed mb-6 font-bold">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center gap-3 text-2xl font-comic text-secondary">
                    <span>阅读全文!</span>
                    <Zap className="w-8 h-8" />
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* Add Post Button */}
          <div className="mt-12 text-center">
            <button className="px-12 py-6 bg-primary text-white border-4 border-border shadow-comic font-comic text-3xl tracking-wider hover:translate-x-1 hover:translate-y-1 hover:shadow-comic-sm transition-transform">
              写新文章! <Zap className="inline w-8 h-8 ml-2" />
            </button>
          </div>
        </main>

        {/* Footer */}
        <footer className="border-t-4 border-border bg-white py-8">
          <div className="max-w-5xl mx-auto px-6 text-center">
            <div className="inline-block bg-accent px-8 py-4 border-4 border-border shadow-comic">
              <p className="text-2xl font-comic text-border">
                © 2024 {user.name.toUpperCase()}'S BLOG! BOOM!
              </p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
