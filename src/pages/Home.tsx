import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, LogOut, Github, Twitter, Linkedin } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import AlgorithmicArt from '@/components/AlgorithmicArt';

export default function Home() {
  const { user, isAuthenticated, logout } = useAuth();
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
    <div className="min-h-screen relative">
      <AlgorithmicArt />
      
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="max-w-2xl w-full">
          <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-white/50">
            <div className="flex justify-end mb-6">
              <button
                onClick={logout}
                className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all font-lato"
              >
                <LogOut className="w-4 h-4" />
                退出
              </button>
            </div>

            <div className="text-center">
              <div className="w-32 h-32 mx-auto mb-6 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-lg">
                <User className="w-16 h-16 text-white" />
              </div>

              <h1 className="text-4xl font-playfair font-bold text-primary mb-2">
                你好，{user.name}！
              </h1>
              <p className="text-gray-600 text-lg mb-2 font-lato">
                {user.email}
              </p>
              <p className="text-gray-500 mb-8 font-lato">
                欢迎来到你的个人空间
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                <div className="bg-gradient-to-br from-primary/10 to-secondary/10 rounded-2xl p-6 border border-white/50">
                  <div className="text-3xl font-bold text-primary mb-1">12</div>
                  <div className="text-gray-600 font-lato">项目</div>
                </div>
                <div className="bg-gradient-to-br from-primary/10 to-secondary/10 rounded-2xl p-6 border border-white/50">
                  <div className="text-3xl font-bold text-primary mb-1">48</div>
                  <div className="text-gray-600 font-lato">作品</div>
                </div>
                <div className="bg-gradient-to-br from-primary/10 to-secondary/10 rounded-2xl p-6 border border-white/50">
                  <div className="text-3xl font-bold text-primary mb-1">1.2k</div>
                  <div className="text-gray-600 font-lato">访问</div>
                </div>
              </div>

              <div className="flex justify-center gap-4">
                <a
                  href="#"
                  className="w-12 h-12 rounded-full bg-gray-100 hover:bg-primary hover:text-white flex items-center justify-center transition-all"
                >
                  <Github className="w-6 h-6" />
                </a>
                <a
                  href="#"
                  className="w-12 h-12 rounded-full bg-gray-100 hover:bg-primary hover:text-white flex items-center justify-center transition-all"
                >
                  <Twitter className="w-6 h-6" />
                </a>
                <a
                  href="#"
                  className="w-12 h-12 rounded-full bg-gray-100 hover:bg-primary hover:text-white flex items-center justify-center transition-all"
                >
                  <Linkedin className="w-6 h-6" />
                </a>
              </div>
            </div>
          </div>

          <div className="mt-6 text-center text-gray-500 text-sm font-lato">
            移动鼠标与粒子互动 ✨
          </div>
        </div>
      </div>
    </div>
  );
}
