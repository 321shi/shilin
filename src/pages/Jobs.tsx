import { useNavigate } from 'react-router-dom';
import { useJobs } from '@/hooks/useJobs';
import { LineArrowLeft } from '../components/CuteDecorations';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { exportJobsToExcel, exportDailyJobsToExcel, exportFactoriesToExcel } from '../lib/jobUtils';
import { ArrowLeft, Calendar, MapPin, Phone, DollarSign, Users, Clock, Sparkles, Building2 } from 'lucide-react';

export default function Jobs() {
  const navigate = useNavigate();
  const { dailyJobs, factories, deleteDailyJob, deleteFactory } = useJobs();

  const handleDeleteJob = (id: string) => {
    if (window.confirm('确定要删除这条兼职信息吗？')) {
      deleteDailyJob(id);
    }
  };

  const handleDeleteFactory = (id: string) => {
    if (window.confirm('确定要删除这个厂区信息吗？')) {
      deleteFactory(id);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl" />
      </div>

      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="ghost" onClick={() => navigate('/')}>
                <ArrowLeft className="w-5 h-5" />
                返回
              </Button>
              <div>
                <h1 className="text-2xl font-bold gradient-text">劳务资源</h1>
                <p className="text-sm text-muted-foreground">兼职日结 · 厂区招聘</p>
              </div>
            </div>
            <div className="flex gap-3">
              <Button variant="outline" size="sm" onClick={() => navigate('/create-daily-job')}>
                <Sparkles className="w-4 h-4" />
                发布兼职
              </Button>
              <Button variant="gradient" size="sm" onClick={() => navigate('/create-factory')}>
                <Building2 className="w-4 h-4" />
                发布厂区
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-12 relative z-10">
        <div className="flex flex-wrap gap-3 mb-12">
          <Button variant="outline" onClick={() => exportJobsToExcel(dailyJobs, factories)}>
            <Sparkles className="w-4 h-4" />
            导出全部Excel
          </Button>
          <Button 
            variant="outline" 
            onClick={() => exportDailyJobsToExcel(dailyJobs)}
            disabled={dailyJobs.length === 0}
          >
            导出兼职Excel
          </Button>
          <Button 
            variant="outline" 
            onClick={() => exportFactoriesToExcel(factories)}
            disabled={factories.length === 0}
          >
            导出厂区Excel
          </Button>
        </div>

        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
            <span className="gradient-text">兼职日结</span>
            <span className="px-3 py-1 rounded-full bg-purple-500/10 text-purple-600 text-sm">
              {dailyJobs.length}
            </span>
          </h2>

          {dailyJobs.length === 0 ? (
            <Card className="text-center py-16">
              <CardContent>
                <div className="w-20 h-20 gradient-bg rounded-full flex items-center justify-center mx-auto mb-6">
                  <Sparkles className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-2">暂无兼职信息</h3>
                <p className="text-muted-foreground mb-6">开始发布第一条兼职吧！</p>
                <Button variant="gradient" onClick={() => navigate('/create-daily-job')}>
                  发布兼职
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {dailyJobs.map((job) => (
                <Card key={job.id} className="group hover:shadow-xl hover:border-primary/50 transition-all duration-300 overflow-hidden">
                  {job.urgent && (
                    <div className="bg-gradient-to-r from-red-500 to-pink-500 text-white px-4 py-2 text-sm font-medium">
                      🔥 紧急招聘
                    </div>
                  )}
                  <CardHeader>
                    <div className="flex justify-between items-start mb-4">
                      <CardTitle className="text-xl group-hover:text-primary transition-colors">
                        {job.title}
                      </CardTitle>
                      <div className="text-2xl font-bold gradient-text">
                        {job.wage}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3 mb-4">
                      <div className="flex items-center gap-2 text-sm">
                        <Clock className="w-4 h-4 text-muted-foreground" />
                        <span>{job.workTime}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <MapPin className="w-4 h-4 text-muted-foreground" />
                        <span className="truncate">{job.location}</span>
                      </div>
                      {job.requirements && (
                        <div className="text-sm text-muted-foreground line-clamp-2">
                          {job.requirements}
                        </div>
                      )}
                    </div>
                    
                    <div className="flex items-center gap-3 text-sm mb-4 p-3 bg-muted/50 rounded-lg">
                      <Users className="w-4 h-4" />
                      <span>{job.contact}</span>
                      <a href={`tel:${job.phone}`} className="ml-auto text-primary font-medium flex items-center gap-1">
                        <Phone className="w-4 h-4" />
                        {job.phone}
                      </a>
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t">
                      <span className="text-xs text-muted-foreground flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {job.date}
                      </span>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => handleDeleteJob(job.id)}
                        className="text-destructive hover:text-destructive"
                      >
                        删除
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </section>

        <section>
          <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
            <span className="gradient-text">厂区招聘</span>
            <span className="px-3 py-1 rounded-full bg-blue-500/10 text-blue-600 text-sm">
              {factories.length}
            </span>
          </h2>

          {factories.length === 0 ? (
            <Card className="text-center py-16">
              <CardContent>
                <div className="w-20 h-20 gradient-bg rounded-full flex items-center justify-center mx-auto mb-6">
                  <Building2 className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-2">暂无厂区招聘信息</h3>
                <p className="text-muted-foreground mb-6">开始发布第一个厂区吧！</p>
                <Button variant="gradient" onClick={() => navigate('/create-factory')}>
                  发布厂区
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {factories.map((factory) => (
                <Card key={factory.id} className="group hover:shadow-xl hover:border-primary/50 transition-all duration-300">
                  <CardHeader>
                    <div className="flex justify-between items-start mb-2">
                      <CardTitle className="text-xl group-hover:text-primary transition-colors">
                        {factory.name}
                      </CardTitle>
                    </div>
                    <div className="text-lg font-bold gradient-text">
                      {factory.salary}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3 mb-4">
                      <div className="flex items-start gap-2 text-sm">
                        <MapPin className="w-4 h-4 text-muted-foreground mt-0.5" />
                        <span>{factory.location}</span>
                      </div>
                      
                      <div>
                        <span className="text-sm text-muted-foreground mb-2 block">招聘岗位：</span>
                        <div className="flex flex-wrap gap-2">
                          {factory.positions.map((position, idx) => (
                            <span 
                              key={idx} 
                              className="px-3 py-1 rounded-full bg-purple-500/10 text-purple-600 text-sm"
                            >
                              {position}
                            </span>
                          ))}
                        </div>
                      </div>

                      {factory.welfare && (
                        <div className="text-sm text-muted-foreground whitespace-pre-line">
                          {factory.welfare}
                        </div>
                      )}
                    </div>

                    <div className="flex items-center gap-3 text-sm mb-4 p-3 bg-muted/50 rounded-lg">
                      <Users className="w-4 h-4" />
                      <span>{factory.contact}</span>
                      <a href={`tel:${factory.phone}`} className="ml-auto text-primary font-medium flex items-center gap-1">
                        <Phone className="w-4 h-4" />
                        {factory.phone}
                      </a>
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t">
                      <span className="text-xs text-muted-foreground flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {factory.date}
                      </span>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => handleDeleteFactory(factory.id)}
                        className="text-destructive hover:text-destructive"
                      >
                        删除
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
