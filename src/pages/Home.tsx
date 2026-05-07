import { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { LogOut, PenTool, Calendar, Clock, ArrowRight, BookOpen, Briefcase } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { usePosts } from '@/hooks/usePosts';
import { LineDog, LinePaw, LineHeart, LineStar, DoodleDecor } from '@/components/CuteDecorations';

export default function Home() {
  const { user, isAuthenticated, logout } = useAuth();
  const { posts } = usePosts();
  const navigate = useNavigate();

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
            <div className="flex items-center gap-4">
              <Link
                to="/jobs"
                className="flex items-center gap-2 px-5 py-2 border-2 border-black rounded-xl font-semibold hover:bg-black hover:text-white transition-all"
              >
                <Briefcase className="w-5 h-5" />
                劳务资源
              </Link>
              <button
                onClick={logout}
                className="flex items-center gap-3 px-6 py-3 text-gray-500 hover:text-black transition-all hover:bg-gray-100 rounded-xl font-semibold border-2 border-black hover:border-black text-xl"
              >
                <LogOut className="w-6 h-6" />
                <span>退出</span>
              </button>
            </div>
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
        <section className="mb-14 border-3 border-black rounded-2xl p-8 bg-gray-50">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <Briefcase className="w-8 h-8 text-black" />
              <h3 className="text-3xl font-bold text-black">劳务资源</h3>
            </div>
            <Link
              to="/jobs"
              className="flex items-center gap-2 px-6 py-3 bg-black text-white rounded-xl font-bold text-lg hover:bg-gray-800 transition-all"
            >
              管理资源
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
          <p className="text-gray-600 text-lg mb-6">兼职日结 · 厂区招聘 · 实时更新</p>
          <Link
            to="/jobs"
            className="inline-flex items-center gap-3 px-8 py-4 bg-white border-2 border-black rounded-xl font-bold text-xl hover:bg-black hover:text-white transition-all"
          >
            <Briefcase className="w-6 h-6" />
            查看全部劳务信息
          </Link>
        </section>

        <div className="flex items-center justify-between mb-10">
          <div className="flex items-center gap-4">
            <PenTool className="w-8 h-8 text-black" />
            <h3 className="text-3xl font-bold text-black">最新文章</h3>
          </div>
          <Link
            to="/create"
            className="flex items-center gap-2 px-6 py-3 bg-black text-white rounded-xl font-bold text-xl hover:bg-gray-800 transition-all hand-drawn-shadow"
          >
            <PenTool className="w-5 h-5" />
            写新文章
          </Link>
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

        {posts.length === 0 && (
          <div className="text-center py-20">
            <LineDog size={100} className="mx-auto mb-6 opacity-50" />
            <p className="text-2xl text-gray-500">还没有文章哦，快来写第一篇吧！</p>
            <Link
              to="/create"
              className="inline-flex items-center gap-2 px-8 py-4 bg-black text-white rounded-xl font-bold text-xl hover:bg-gray-800 transition-all hand-drawn-shadow mt-6"
            >
              <PenTool className="w-5 h-5" />
              写第一篇文章
            </Link>
          </div>
        )}
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
