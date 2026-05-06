import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogOut, PenTool, Calendar, Clock, ArrowRight, BookOpen } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { LineDog, LinePaw, LineHeart, LineStar, DoodleDecor, CornerLines } from '@/components/CuteDecorations';

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
    <div className="min-h-screen bg-white font-sans relative overflow-hidden line-bg">
      <div className="absolute top-20 left-8 opacity-25 bounce-sketch">
        <LinePaw size={70} />
      </div>
      <div className="absolute top-32 right-10 opacity-15 sketch-animation">
        <LineHeart size={55} />
      </div>
      <div className="absolute bottom-32 left-12 opacity-20 bounce-sketch" style={{ animationDelay: '0.7s' }}>
        <LineStar size={50} />
      </div>
      <div className="absolute bottom-16 right-8 opacity-28 sketch-animation" style={{ animationDelay: '1.2s' }}>
        <LinePaw size={65} />
      </div>
      <div className="absolute top-1/4 right-4 w-48 h-48 opacity-8">
        <DoodleDecor />
      </div>
      <div className="absolute bottom-1/4 left-4 w-44 h-44 opacity-6">
        <DoodleDecor />
      </div>

      <header className="bg-white border-b-3 border-black sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-6 py-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-5">
              <div className="w-16 h-16 bg-gray-100 border-3 border-black rounded-2xl flex items-center justify-center hand-drawn-shadow">
                <BookOpen className="w-8 h-8 text-black" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-black">{user.name}</h1>
                <p className="text-lg text-gray-500">{user.email}</p>
              </div>
            </div>
            <button
              onClick={logout}
              className="flex items-center gap-3 px-6 py-3 text-gray-500 hover:text-black transition-all hover:bg-gray-100 rounded-xl font-semibold border-2 border-black hover:border-black text-xl"
            >
              <LogOut className="w-6 h-6" />
              <span>退出</span>
            </button>
          </div>
        </div>
      </header>

      <section className="max-w-4xl mx-auto px-6 py-14">
        <div className="text-center">
          <div className="mb-8">
            <div className="inline-block bounce-sketch">
              <LineDog size={140} />
            </div>
          </div>
          <p className="text-black font-bold mb-4 tracking-wide uppercase text-xl">欢迎回来~</p>
          <h2 className="text-5xl font-bold text-black mb-4 wiggle-line inline-block">
            我的个人博客
          </h2>
          <p className="text-2xl text-gray-500 max-w-2xl mx-auto mt-6">
            在这里记录一切我想记录的。生活、学习、思考与成长 ✏️
          </p>
        </div>
      </section>

      <main className="max-w-4xl mx-auto px-6 pb-16 relative z-10">
        <div className="flex items-center gap-4 mb-10">
          <PenTool className="w-8 h-8 text-black" />
          <h3 className="text-3xl font-bold text-black">最新文章</h3>
        </div>

        <div className="space-y-7">
          {posts.map((post, index) => (
            <article
              key={post.id}
              className="bg-white border-3 border-black rounded-2xl p-7 hover:border-black transition-all cursor-pointer group hand-drawn-shadow"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex flex-wrap items-center gap-5 mb-5">
                <span className="px-5 py-2 bg-gray-100 border-2 border-black text-black text-base font-bold rounded-full">
                  {post.category}
                </span>
                <span className="flex items-center gap-2 text-gray-500 text-lg font-semibold">
                  <Calendar className="w-5 h-5" />
                  {post.date}
                </span>
                <span className="flex items-center gap-2 text-gray-500 text-lg font-semibold">
                  <Clock className="w-5 h-5" />
                  {post.readTime}
                </span>
              </div>
              <h4 className="text-2xl font-bold text-black mb-4 group-hover:text-gray-600 transition-colors">
                {post.title}
              </h4>
              <p className="text-gray-500 leading-relaxed mb-5 text-xl">
                {post.excerpt}
              </p>
              <div className="flex items-center gap-3 text-black font-bold text-xl">
                阅读全文
                <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
              </div>
            </article>
          ))}
        </div>

        <div className="mt-12 text-center">
          <button className="px-12 py-5 bg-black text-white rounded-2xl font-bold text-2xl hover:bg-gray-800 transition-all hand-drawn-shadow">
            写新文章 ✨
          </button>
        </div>
      </main>

      <footer className="border-t-3 border-black bg-white py-12">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="flex justify-center gap-4 mb-6">
            <LinePaw size={35} className="inline" />
            <LineHeart size={32} className="inline" />
            <LineStar size={30} className="inline" />
          </div>
          <p className="text-gray-500 text-xl font-semibold">
            © 2024 {user.name} 的博客。用心记录生活 💕
          </p>
        </div>
      </footer>
    </div>
  );
}
