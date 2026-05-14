import { useState } from 'react';
import { Plus, FileText, Check, X } from 'lucide-react';
import { PartTimeJob } from '../types';
import { parsePartTimeJob } from '../services/parseJobs';

interface PartTimeFormProps {
  onSubmit: (job: Omit<PartTimeJob, 'id' | 'createdAt'>) => void;
  onCancel?: () => void;
  initialData?: PartTimeJob;
  isEditing?: boolean;
}

export default function PartTimeForm({ onSubmit, onCancel, initialData, isEditing }: PartTimeFormProps) {
  const [textInput, setTextInput] = useState('');
  const [parsedData, setParsedData] = useState<Omit<PartTimeJob, 'id' | 'createdAt'> | null>(null);
  const [showForm, setShowForm] = useState(false);
  
  const [formData, setFormData] = useState<Omit<PartTimeJob, 'id' | 'createdAt'>>({
    salary: initialData?.salary || 0,
    location: initialData?.location || '',
    date: initialData?.date || '',
    time: initialData?.time || '',
    requirements: initialData?.requirements || '',
    clothing: initialData?.clothing || '',
    meals: initialData?.meals || '包中餐',
    contact: initialData?.contact || '',
    idRequired: initialData?.idRequired || false,
    deposit: initialData?.deposit || '',
    notes: initialData?.notes || '',
  });

  const handleParse = () => {
    if (!textInput.trim()) return;
    const parsed = parsePartTimeJob(textInput);
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
        <Plus className="w-5 h-5 text-orange-500" />
        {isEditing ? '编辑兼职信息' : '添加新兼职'}
      </h3>
      
      {!showForm ? (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              粘贴招聘信息文本
            </label>
            <textarea
              value={textInput}
              onChange={(e) => setTextInput(e.target.value)}
              placeholder="💰 130/天包中餐
国博小蜜蜂
日期：15-17号连做
时间：8:30-17:30
要求：穿鞋160+，35岁内..."
              className="w-full h-40 px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent resize-none text-sm"
            />
          </div>
          <button
            onClick={handleParse}
            disabled={!textInput.trim()}
            className="w-full bg-gradient-to-r from-orange-500 to-amber-500 text-white py-3 rounded-lg font-medium hover:shadow-lg hover:shadow-orange-500/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            <FileText className="w-4 h-4" />
            解析文本
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">日薪 (元/天)</label>
              <input
                type="number"
                value={formData.salary}
                onChange={(e) => handleChange('salary', parseInt(e.target.value) || 0)}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">地点</label>
              <input
                type="text"
                value={formData.location}
                onChange={(e) => handleChange('location', e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                placeholder="国博"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">日期</label>
              <input
                type="text"
                value={formData.date}
                onChange={(e) => handleChange('date', e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                placeholder="15-17号"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">时间</label>
              <input
                type="text"
                value={formData.time}
                onChange={(e) => handleChange('time', e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                placeholder="8:30-17:30"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">身高/年龄要求</label>
              <input
                type="text"
                value={formData.requirements}
                onChange={(e) => handleChange('requirements', e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                placeholder="穿鞋160+，35岁内"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">服装要求</label>
              <input
                type="text"
                value={formData.clothing}
                onChange={(e) => handleChange('clothing', e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                placeholder="短裙裤"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">餐饮</label>
              <select
                value={formData.meals}
                onChange={(e) => handleChange('meals', e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              >
                <option value="包中餐">包中餐</option>
                <option value="包餐水">包餐水</option>
                <option value="不包餐">不包餐</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">需身份证</label>
              <select
                value={formData.idRequired ? '是' : '否'}
                onChange={(e) => handleChange('idRequired', e.target.value === '是')}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              >
                <option value="是">是</option>
                <option value="否">否</option>
              </select>
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">联系方式</label>
            <input
              type="text"
              value={formData.contact}
              onChange={(e) => handleChange('contact', e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              placeholder="名字电话身高体重生活照"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">押金说明</label>
            <input
              type="text"
              value={formData.deposit}
              onChange={(e) => handleChange('deposit', e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              placeholder="压20取消不退"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">备注</label>
            <textarea
              value={formData.notes}
              onChange={(e) => handleChange('notes', e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent resize-none h-20"
              placeholder="不满报名档期70%结等"
            />
          </div>
          
          {parsedData && (
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-3">
              <p className="text-sm text-amber-800">
                <Check className="w-4 h-4 inline mr-1" />
                已从文本中解析出数据，请确认并修改
              </p>
            </div>
          )}
          
          <div className="flex gap-3">
            <button
              type="submit"
              className="flex-1 bg-gradient-to-r from-orange-500 to-amber-500 text-white py-3 rounded-lg font-medium hover:shadow-lg hover:shadow-orange-500/30 transition-all"
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
