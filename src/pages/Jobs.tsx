import { useNavigate } from 'react-router-dom';
import { useJobs } from '../hooks/useJobs';
import { LineArrowLeft, LineStar, LineHeart, LinePaw } from '../components/CuteDecorations';
import { exportJobsToExcel, exportDailyJobsToExcel, exportFactoriesToExcel } from '../lib/jobUtils';

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
    <div className="min-h-screen bg-white relative overflow-hidden">
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10"><LineStar size={40} /></div>
        <div className="absolute bottom-40 right-20"><LineHeart size={50} /></div>
        <div className="absolute top-40 right-32"><LinePaw size={30} /></div>
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-6 py-12">
        <button 
          onClick={() => navigate('/')}
          className="flex items-center gap-2 text-primary hover:text-muted transition-colors mb-8"
        >
          <LineArrowLeft />
          <span>返回首页</span>
        </button>

        <h1 className="text-4xl font-bold mb-2">劳务信息</h1>
        <p className="text-muted mb-8">兼职日结 · 厂区招聘</p>

        <div className="flex flex-wrap gap-4 mb-12">
          <button
            onClick={() => navigate('/create-daily-job')}
            className="bg-primary text-white px-6 py-3 font-medium hover:bg-muted transition-colors"
          >
            发布兼职日结
          </button>
          <button
            onClick={() => navigate('/create-factory')}
            className="border-2 border-primary px-6 py-3 font-medium hover:bg-primary hover:text-white transition-colors"
          >
            发布厂区招聘
          </button>
        </div>

        <div className="flex flex-wrap gap-4 mb-12">
          <button
            onClick={() => exportJobsToExcel(dailyJobs, factories)}
            className="border-2 border-primary px-6 py-3 font-medium hover:bg-primary hover:text-white transition-colors"
          >
            📊 导出全部Excel
          </button>
          <button
            onClick={() => exportDailyJobsToExcel(dailyJobs)}
            disabled={dailyJobs.length === 0}
            className="border-2 border-primary px-6 py-3 font-medium hover:bg-primary hover:text-white transition-colors disabled:opacity-50"
          >
            📋 导出兼职Excel
          </button>
          <button
            onClick={() => exportFactoriesToExcel(factories)}
            disabled={factories.length === 0}
            className="border-2 border-primary px-6 py-3 font-medium hover:bg-primary hover:text-white transition-colors disabled:opacity-50"
          >
            🏭 导出厂区Excel
          </button>
        </div>

        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
            <LinePaw />
            兼职日结
            <span className="text-sm font-normal text-muted">({dailyJobs.length})</span>
          </h2>

          {dailyJobs.length === 0 ? (
            <div className="border-2 border-dashed border-primary p-12 text-center">
              <p className="text-muted mb-4">暂无兼职信息</p>
              <button
                onClick={() => navigate('/create-daily-job')}
                className="text-primary underline"
              >
                立即发布第一条兼职
              </button>
            </div>
          ) : (
            <div className="grid gap-4">
              {dailyJobs.map(job => (
                <div key={job.id} className="border-2 border-primary p-6 relative">
                  {job.urgent && (
                    <div className="absolute -top-3 right-4 bg-primary text-white text-xs px-3 py-1">
                      紧急
                    </div>
                  )}
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl font-bold">{job.title}</h3>
                    <span className="text-2xl font-bold">{job.wage}</span>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 text-sm mb-4">
                    <div>
                      <span className="text-muted">工作时长：</span>
                      {job.workTime}
                    </div>
                    <div>
                      <span className="text-muted">工作地点：</span>
                      {job.location}
                    </div>
                    {job.requirements && (
                      <div className="col-span-2">
                        <span className="text-muted">要求：</span>
                        {job.requirements}
                      </div>
                    )}
                    <div>
                      <span className="text-muted">联系人：</span>
                      {job.contact}
                    </div>
                    <div>
                      <span className="text-muted">电话：</span>
                      <a href={`tel:${job.phone}`} className="underline">{job.phone}</a>
                    </div>
                  </div>

                  <div className="flex justify-between items-center pt-4 border-t border-primary">
                    <span className="text-xs text-muted">发布于 {job.date}</span>
                    <button
                      onClick={() => handleDeleteJob(job.id)}
                      className="text-sm text-muted hover:text-primary underline"
                    >
                      删除
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
            <LineHeart />
            厂区招聘
            <span className="text-sm font-normal text-muted">({factories.length})</span>
          </h2>

          {factories.length === 0 ? (
            <div className="border-2 border-dashed border-primary p-12 text-center">
              <p className="text-muted mb-4">暂无厂区招聘信息</p>
              <button
                onClick={() => navigate('/create-factory')}
                className="text-primary underline"
              >
                立即发布第一个厂区
              </button>
            </div>
          ) : (
            <div className="grid gap-4">
              {factories.map(factory => (
                <div key={factory.id} className="border-2 border-primary p-6">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl font-bold">{factory.name}</h3>
                    <span className="text-lg font-bold">{factory.salary}</span>
                  </div>
                  
                  <div className="mb-4">
                    <span className="text-muted">地址：</span>
                    {factory.location}
                  </div>

                  <div className="mb-4">
                    <span className="text-muted">招聘岗位：</span>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {factory.positions.map((position, idx) => (
                        <span key={idx} className="border border-primary px-3 py-1 text-sm">
                          {position}
                        </span>
                      ))}
                    </div>
                  </div>

                  {factory.welfare && (
                    <div className="mb-4 whitespace-pre-line text-sm">
                      <span className="text-muted">福利待遇：</span>
                      {factory.welfare}
                    </div>
                  )}

                  <div className="grid grid-cols-2 gap-4 text-sm mb-4">
                    <div>
                      <span className="text-muted">联系人：</span>
                      {factory.contact}
                    </div>
                    <div>
                      <span className="text-muted">电话：</span>
                      <a href={`tel:${factory.phone}`} className="underline">{factory.phone}</a>
                    </div>
                  </div>

                  <div className="flex justify-between items-center pt-4 border-t border-primary">
                    <span className="text-xs text-muted">发布于 {factory.date}</span>
                    <button
                      onClick={() => handleDeleteFactory(factory.id)}
                      className="text-sm text-muted hover:text-primary underline"
                    >
                      删除
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
