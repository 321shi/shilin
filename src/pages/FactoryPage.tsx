import { useState } from 'react';
import { Download, ChevronDown, ChevronUp, SortAsc, SortDesc, Search } from 'lucide-react';
import { useJobStore } from '../store/jobStore';
import { exportFactoryJobsToExcel } from '../services/exportExcel';
import { SortField, SortOrder, FactoryJob } from '../types';
import FactoryCard from '../components/FactoryCard';
import FactoryForm from '../components/FactoryForm';

export default function FactoryPage() {
  const { factoryJobs, addFactoryJob, updateFactoryJob, deleteFactoryJob } = useJobStore();
  const [sortField, setSortField] = useState<SortField>('createdAt');
  const [sortOrder, setSortOrder] = useState<SortOrder>('desc');
  const [searchTerm, setSearchTerm] = useState('');
  const [editingJob, setEditingJob] = useState<FactoryJob | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder('desc');
    }
  };

  const sortedJobs = [...factoryJobs]
    .filter(job => {
      if (!searchTerm) return true;
      const term = searchTerm.toLowerCase();
      return (
        job.location?.toLowerCase().includes(term) ||
        job.date?.toLowerCase().includes(term) ||
        job.workContent?.toLowerCase().includes(term) ||
        job.notes?.toLowerCase().includes(term)
      );
    })
    .sort((a, b) => {
      let comparison = 0;
      switch (sortField) {
        case 'date':
          comparison = (a.date || '').localeCompare(b.date || '');
          break;
        case 'location':
          comparison = (a.location || '').localeCompare(b.location || '');
          break;
        case 'salary':
          comparison = a.hourlyRate - b.hourlyRate;
          break;
        case 'createdAt':
        default:
          comparison = new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
      }
      return sortOrder === 'asc' ? comparison : -comparison;
    });

  const handleExport = () => {
    if (sortedJobs.length === 0) {
      alert('没有可导出的数据');
      return;
    }
    exportFactoryJobsToExcel(sortedJobs);
  };

  const handleSubmit = (jobData: Omit<FactoryJob, 'id' | 'createdAt'>) => {
    if (editingJob) {
      updateFactoryJob(editingJob.id, jobData);
      setEditingJob(null);
    } else {
      addFactoryJob(jobData);
    }
    setShowAddForm(false);
  };

  const handleEdit = (job: FactoryJob) => {
    setEditingJob(job);
    setShowAddForm(true);
  };

  const handleDelete = (id: string) => {
    if (confirm('确定要删除这条工厂信息吗？')) {
      deleteFactoryJob(id);
    }
  };

  const SortButton = ({ field, label }: { field: SortField; label: string }) => (
    <button
      onClick={() => handleSort(field)}
      className={`flex items-center gap-1 px-3 py-1.5 rounded-lg transition-colors ${
        sortField === field ? 'bg-blue-100 text-blue-700' : 'hover:bg-slate-100'
      }`}
    >
      {label}
      {sortField === field ? (
        sortOrder === 'asc' ? <SortAsc className="w-4 h-4" /> : <SortDesc className="w-4 h-4" />
      ) : (
        <ChevronDown className="w-4 h-4 opacity-50" />
      )}
    </button>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-slate-800 mb-2">工厂信息管理</h2>
        <p className="text-slate-600">管理所有工厂招聘信息，支持文本解析和Excel导出</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4">
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
              <div className="flex flex-wrap gap-2">
                <SortButton field="createdAt" label="创建时间" />
                <SortButton field="date" label="日期" />
                <SortButton field="location" label="地点" />
                <SortButton field="salary" label="薪资" />
              </div>
              
              <div className="flex gap-3 w-full sm:w-auto">
                <div className="relative flex-1 sm:flex-initial">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="搜索..."
                    className="w-full sm:w-64 pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                
                <button
                  onClick={handleExport}
                  className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-lg hover:shadow-lg hover:shadow-green-500/30 transition-all"
                >
                  <Download className="w-4 h-4" />
                  导出Excel
                </button>
                
                <button
                  onClick={() => {
                    setShowAddForm(!showAddForm);
                    setEditingJob(null);
                  }}
                  className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-lg hover:shadow-lg hover:shadow-blue-500/30 transition-all"
                >
                  {showAddForm ? <ChevronUp className="w-4 h-4" /> : null}
                  {showAddForm ? '收起' : '添加工厂'}
                </button>
              </div>
            </div>
          </div>

          {showAddForm && (
            <FactoryForm
              onSubmit={handleSubmit}
              onCancel={() => {
                setShowAddForm(false);
                setEditingJob(null);
              }}
              initialData={editingJob || undefined}
              isEditing={!!editingJob}
            />
          )}

          {sortedJobs.length === 0 ? (
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-12 text-center">
              <div className="text-6xl mb-4">🏭</div>
              <h3 className="text-xl font-medium text-slate-700 mb-2">暂无工厂信息</h3>
              <p className="text-slate-500 mb-4">点击上方"添加工厂"按钮开始添加</p>
              <button
                onClick={() => setShowAddForm(true)}
                className="px-6 py-2 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-lg hover:shadow-lg transition-all"
              >
                添加第一个工厂
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {sortedJobs.map((job) => (
                <FactoryCard
                  key={job.id}
                  job={job}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                />
              ))}
            </div>
          )}
        </div>

        <div className="space-y-6">
          <div className="bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl shadow-lg p-6 text-white">
            <h3 className="text-lg font-semibold mb-4">📊 统计概览</h3>
            <div className="space-y-4">
              <div className="bg-white/20 backdrop-blur rounded-lg p-4">
                <p className="text-sm text-blue-200">工厂总数</p>
                <p className="text-3xl font-bold">{factoryJobs.length}</p>
              </div>
              <div className="bg-white/20 backdrop-blur rounded-lg p-4">
                <p className="text-sm text-blue-200">平均时薪</p>
                <p className="text-3xl font-bold">
                  ¥{factoryJobs.length > 0 
                    ? (factoryJobs.reduce((sum, j) => sum + j.hourlyRate, 0) / factoryJobs.length).toFixed(1)
                    : 0}
                </p>
              </div>
              <div className="bg-white/20 backdrop-blur rounded-lg p-4">
                <p className="text-sm text-blue-200">本周新增</p>
                <p className="text-3xl font-bold">
                  {factoryJobs.filter(j => {
                    const created = new Date(j.createdAt);
                    const now = new Date();
                    const weekAgo = new Date(now.setDate(now.getDate() - 7));
                    return created >= weekAgo;
                  }).length}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <h3 className="text-lg font-semibold text-slate-800 mb-4">💡 使用提示</h3>
            <ul className="space-y-3 text-sm text-slate-600">
              <li className="flex gap-2">
                <span className="text-blue-500">1.</span>
                粘贴工厂招聘文本，系统会自动解析关键信息
              </li>
              <li className="flex gap-2">
                <span className="text-blue-500">2.</span>
                点击卡片右上角按钮可编辑或删除信息
              </li>
              <li className="flex gap-2">
                <span className="text-blue-500">3.</span>
                使用筛选按钮快速找到需要的工厂
              </li>
              <li className="flex gap-2">
                <span className="text-blue-500">4.</span>
                点击导出按钮下载Excel文件
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
