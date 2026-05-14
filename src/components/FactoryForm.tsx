import { useState } from 'react';
import { Plus, FileText, Check, X } from 'lucide-react';
import { FactoryJob } from '../types';
import { parseFactoryJob } from '../services/parseJobs';

interface FactoryFormProps {
  onSubmit: (job: Omit<FactoryJob, 'id' | 'createdAt'>) => void;
  onCancel?: () => void;
  initialData?: FactoryJob;
  isEditing?: boolean;
}

export default function FactoryForm({ onSubmit, onCancel, initialData, isEditing }: FactoryFormProps) {
  const [textInput, setTextInput] = useState('');
  const [parsedData, setParsedData] = useState<Omit<FactoryJob, 'id' | 'createdAt'> | null>(null);
  const [showForm, setShowForm] = useState(false);
  
  const [formData, setFormData] = useState<Omit<FactoryJob, 'id' | 'createdAt'>>({
    hourlyRate: initialData?.hourlyRate || 0,
    location: initialData?.location || '',
    date: initialData?.date || '',
    interviewTime: initialData?.interviewTime || '',
    age: initialData?.age || '',
    gender: initialData?.gender || '男女不限',
    workContent: initialData?.workContent || '',
    workHours: initialData?.workHours || '',
    advancePayment: initialData?.advancePayment || '',
    paymentDate: initialData?.paymentDate || '每月10号',
    accommodation: initialData?.accommodation || '',
    deposit: initialData?.deposit || '',
    meals: initialData?.meals || '',
    insurance: initialData?.insurance || '',
    notes: initialData?.notes || '',
  });

  const handleParse = () => {
    if (!textInput.trim()) return;
    const parsed = parseFactoryJob(textInput);
    setParsedData(parsed);
    setFormData({ ...formData, ...parsed });
    setShowForm(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    setTextInput('');
    setParsedData(null);
    setShowForm(false);
  };

  const handleChange = (field: keyof typeof formData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
      <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
        <Plus className="w-5 h-5 text-blue-500" />
        {isEditing ? '编辑工厂信息' : '添加新工厂'}
      </h3>
      
      {!showForm ? (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              粘贴工厂招聘信息文本
            </label>
            <textarea
              value={textInput}
              onChange={(e) => setTextInput(e.target.value)}
              placeholder="20元/小时
蔡甸永安服饰短期工
面试时间9点-15点
18-48岁男女不限
工作岗位：拣货、打包、印花
包住宿，水电费平摊..."
              className="w-full h-40 px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none text-sm"
            />
          </div>
          <button
            onClick={handleParse}
            disabled={!textInput.trim()}
            className="w-full bg-gradient-to-r from-blue-500 to-indigo-500 text-white py-3 rounded-lg font-medium hover:shadow-lg hover:shadow-blue-500/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            <FileText className="w-4 h-4" />
            解析文本
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">时薪 (元/小时)</label>
              <input
                type="number"
                value={formData.hourlyRate}
                onChange={(e) => handleChange('hourlyRate', parseInt(e.target.value) || 0)}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">地点</label>
              <input
                type="text"
                value={formData.location}
                onChange={(e) => handleChange('location', e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="蔡甸永安服饰"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">日期</label>
              <input
                type="text"
                value={formData.date}
                onChange={(e) => handleChange('date', e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="15号-18期间"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">面试时间</label>
              <input
                type="text"
                value={formData.interviewTime}
                onChange={(e) => handleChange('interviewTime', e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="9点-15点"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">年龄要求</label>
              <input
                type="text"
                value={formData.age}
                onChange={(e) => handleChange('age', e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="18-48岁"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">性别</label>
              <select
                value={formData.gender}
                onChange={(e) => handleChange('gender', e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="男女不限">男女不限</option>
                <option value="男">男</option>
                <option value="女">女</option>
              </select>
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">工作内容</label>
            <input
              type="text"
              value={formData.workContent}
              onChange={(e) => handleChange('workContent', e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="拣货、打包、印花"
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">工作时长</label>
              <input
                type="text"
                value={formData.workHours}
                onChange={(e) => handleChange('workHours', e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="8-22点"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">发薪日</label>
              <input
                type="text"
                value={formData.paymentDate}
                onChange={(e) => handleChange('paymentDate', e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="每月10号"
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">预支政策</label>
            <input
              type="text"
              value={formData.advancePayment}
              onChange={(e) => handleChange('advancePayment', e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="第4天起每天可预支150元"
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">住宿</label>
              <input
                type="text"
                value={formData.accommodation}
                onChange={(e) => handleChange('accommodation', e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="包住宿，水电费平摊"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">押金</label>
              <input
                type="text"
                value={formData.deposit}
                onChange={(e) => handleChange('deposit', e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="押金200元随走随退"
              />
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">餐饮</label>
              <input
                type="text"
                value={formData.meals}
                onChange={(e) => handleChange('meals', e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="园区有食堂"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">保险</label>
              <input
                type="text"
                value={formData.insurance}
                onChange={(e) => handleChange('insurance', e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="保险100/月"
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">备注</label>
            <textarea
              value={formData.notes}
              onChange={(e) => handleChange('notes', e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none h-20"
              placeholder="禁止拖鞋、短裤、凉鞋等"
            />
          </div>
          
          {parsedData && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
              <p className="text-sm text-blue-800">
                <Check className="w-4 h-4 inline mr-1" />
                已从文本中解析出数据，请确认并修改
              </p>
            </div>
          )}
          
          <div className="flex gap-3">
            <button
              type="submit"
              className="flex-1 bg-gradient-to-r from-blue-500 to-indigo-500 text-white py-3 rounded-lg font-medium hover:shadow-lg hover:shadow-blue-500/30 transition-all"
            >
              {isEditing ? '保存修改' : '确认添加'}
            </button>
            <button
              type="button"
              onClick={() => {
                setShowForm(false);
                setParsedData(null);
                if (onCancel) onCancel();
              }}
              className="px-6 bg-slate-100 text-slate-700 py-3 rounded-lg font-medium hover:bg-slate-200 transition-all flex items-center gap-2"
            >
              <X className="w-4 h-4" />
              取消
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
