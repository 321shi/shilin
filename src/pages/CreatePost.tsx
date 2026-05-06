import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Save, PenTool, LineDog, LineHeart } from '@/components/CuteDecorations';
import { usePosts } from '@/hooks/usePosts';
import { useAuth } from '@/hooks/useAuth';

const categories = [
  '生活随笔',
  '技术分享',
  '读书笔记',
  '旅行日记',
  '学习笔记',
  '其他',
];

export default function CreatePost() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('生活随笔');
  const [saving, setSaving] = useState(false);

  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const { addPost } = usePosts();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title.trim() || !content.trim()) {
      alert('请填写标题和内容！');
      return;
    }

    setSaving(true);
    
    // 模拟保存延迟
    await new Promise((resolve) => setTimeout(resolve, 500));

    const excerpt = content.length > 100 
      ? content.substring(0, 100) + '...' 
      : content;

    addPost({
      title,
      excerpt,
      category,
      content,
    });

    setSaving(false);
    navigate('/');
  };

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-white font-sans relative overflow-hidden line-bg">
      <div className="absolute top-8 right-12 opacity-20 bounce-sketch">
        <LineDog size={80} />
      </div>
      <div className="absolute bottom-12 left-8 opacity-15">
        <LineHeart size={40} />
      </div>

      <header className="bg-white border-b-3 border-black sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link 
                to="/" 
                className="flex items-center gap-2 text-black hover:text-gray-600 transition-colors text-xl font-semibold"
              >
                <ArrowLeft className="w-6 h-6" />
                返回
              </Link>
            </div>
            <div className="flex items-center gap-2">
              <PenTool className="w-6 h-6" />
              <h1 className="text-2xl font-bold text-black">写新文章</h1>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-10">
        <form onSubmit={handleSave} className="space-y-6">
          {/* 标题输入 */}
          <div>
            <label className="block text-xl font-bold text-black mb-3">
              文章标题
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="给你的文章起个好听的标题..."
              className="w-full px-5 py-4 bg-gray-100 border-3 border-black rounded-xl text-black placeholder-gray-500 focus:outline-none focus:border-black text-2xl font-bold"
              required
            />
          </div>

          {/* 分类选择 */}
          <div>
            <label className="block text-xl font-bold text-black mb-3">
              文章分类
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-5 py-4 bg-gray-100 border-3 border-black rounded-xl text-black focus:outline-none focus:border-black text-xl"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          {/* 内容编辑 */}
          <div>
            <label className="block text-xl font-bold text-black mb-3">
              文章内容
            </label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="在这里写下你的想法..."
              rows={15}
              className="w-full px-5 py-4 bg-gray-100 border-3 border-black rounded-xl text-black placeholder-gray-500 focus:outline-none focus:border-black text-xl resize-vertical"
              required
            />
          </div>

          {/* 保存按钮 */}
          <div className="flex justify-center pt-4">
            <button
              type="submit"
              disabled={saving}
              className="flex items-center gap-3 px-12 py-5 bg-black text-white rounded-2xl font-bold text-2xl hover:bg-gray-800 transition-all disabled:opacity-50 disabled:cursor-not-allowed hand-drawn-shadow"
            >
              <Save className="w-7 h-7" />
              {saving ? '保存中...' : '保存文章'}
            </button>
          </div>
        </form>
      </main>

      <footer className="border-t-3 border-black bg-white py-8 mt-12">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <p className="text-gray-500 text-lg font-semibold">
            用心记录每一个瞬间 ✏️
          </p>
        </div>
      </footer>
    </div>
  );
}
