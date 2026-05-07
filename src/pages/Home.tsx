import { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { LogOut, Calendar, Clock, ArrowRight, Briefcase, Users, TrendingUp, Sparkles, Zap } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { usePosts } from '@/hooks/usePosts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

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
    <div className="min-h-screen bg-background">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
        <div className="absolute top-1/4 right-1/4 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 left-1/3 w-72 h-72 bg-indigo-500/10 rounded-full blur-3xl" />
      </div>

      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 gradient-bg rounded-xl flex items-center justify-center shadow-lg">
                <Briefcase className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold">{user.name}</h1>
                <p className="text-sm text-muted-foreground">{user.email}</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Link to="/jobs">
                <Button variant="gradient" size="lg">
                  <Briefcase className="w-5 h-5" />
                  劳务资源
                </Button>
              </Link>
              <Button variant="outline" onClick={logout}>
                <LogOut className="w-4 h-4" />
                退出
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-12 relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/10 text-purple-600 mb-6">
            <Sparkles className="w-4 h-4" />
            <span className="text-sm font-medium">欢迎回来</span>
          </div>
          <h2 className="text-5xl font-bold mb-4">
            <span className="gradient-text">我的个人博客</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            在这里记录一切我想记录的。生活、学习、思考与成长
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <Card className="group hover:border-purple-500/50 transition-all duration-300">
            <CardHeader>
              <div className="w-12 h-12 gradient-bg rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Users className="w-6 h-6 text-white" />
              </div>
              <CardTitle>劳务资源</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                管理兼职日结和厂区招聘信息
              </p>
              <Link to="/jobs">
                <Button variant="gradient" className="w-full">
                  查看资源
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="group hover:border-blue-500/50 transition-all duration-300">
            <CardHeader>
              <div className="w-12 h-12 gradient-bg rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <CardTitle>最新动态</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                {posts.length} 篇精彩文章
              </p>
              <Link to="/create">
                <Button variant="outline" className="w-full group-hover:border-blue-500">
                  写新文章
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="group hover:border-indigo-500/50 transition-all duration-300">
            <CardHeader>
              <div className="w-12 h-12 gradient-bg rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <CardTitle>快捷操作</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                一键发布招聘信息
              </p>
              <div className="flex gap-2">
                <Link to="/create-daily-job" className="flex-1">
                  <Button variant="secondary" size="sm" className="w-full">
                    兼职
                  </Button>
                </Link>
                <Link to="/create-factory" className="flex-1">
                  <Button variant="secondary" size="sm" className="w-full">
                    厂区
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>

        <section>
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-3xl font-bold flex items-center gap-3">
              <span className="gradient-text">最新文章</span>
            </h3>
            <Link to="/create">
              <Button variant="gradient">
                <Zap className="w-4 h-4" />
                写新文章
              </Button>
            </Link>
          </div>

          {posts.length === 0 ? (
            <Card className="text-center py-16">
              <CardContent>
                <div className="w-24 h-24 gradient-bg rounded-full flex items-center justify-center mx-auto mb-6">
                  <Sparkles className="w-12 h-12 text-white" />
                </div>
                <h4 className="text-2xl font-bold mb-2">还没有文章</h4>
                <p className="text-muted-foreground mb-6">
                  开始记录你的想法吧！
                </p>
                <Link to="/create">
                  <Button variant="gradient" size="lg">
                    写第一篇文章
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ) : (
            <div className="grid md:grid-cols-2 gap-6">
              {posts.map((post, index) => (
                <Card 
                  key={post.id} 
                  className="group cursor-pointer hover:shadow-xl hover:border-primary/50 transition-all duration-300"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <CardHeader>
                    <div className="flex items-center gap-3 mb-4">
                      <span className="px-3 py-1 rounded-full bg-purple-500/10 text-purple-600 text-sm font-medium">
                        {post.category}
                      </span>
                      {post.urgent && (
                        <span className="px-3 py-1 rounded-full bg-red-500/10 text-red-600 text-sm font-medium">
                          紧急
                        </span>
                      )}
                    </div>
                    <CardTitle className="text-xl group-hover:text-primary transition-colors">
                      {post.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4 line-clamp-2">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {post.date}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {post.readTime}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-primary font-medium group-hover:gap-3 transition-all">
                      <span>阅读全文</span>
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </section>
      </main>

      <footer className="border-t bg-card/50 py-12">
        <div className="container mx-auto px-6 text-center">
          <div className="flex justify-center gap-4 mb-6">
            <div className="w-10 h-10 gradient-bg rounded-full flex items-center justify-center">
              <Briefcase className="w-5 h-5 text-white" />
            </div>
          </div>
          <p className="text-muted-foreground">
            © 2024 {user.name} 的博客 · 用心记录生活
          </p>
        </div>
      </footer>
    </div>
  );
}
