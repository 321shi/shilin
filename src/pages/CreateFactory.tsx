import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useJobs } from '../hooks/useJobs';
import { LineArrowLeft, LineStar, LineHeart } from '../components/CuteDecorations';
import { parseRecruitmentText } from '../lib/jobUtils';

export default function CreateFactory() {
  const navigate = useNavigate();
  const { addFactory } = useJobs();
  
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    positions: '',
    welfare: '',
    salary: '',
    contact: '',
    phone: ''
  });

  const [pasteText, setPasteText] = useState('');

  const handleSmartPaste = () => {
    if (!pasteText.trim()) return;

    const parsed = parseRecruitmentText(pasteText);
    
    setFormData(prev => ({
      ...prev,
      name: parsed.name || prev.name,
      location: parsed.location || prev.location,
      positions: parsed.positions?.join('\n') || prev.positions,
      welfare: parsed.welfare || prev.welfare,
      salary: parsed.salary || prev.salary,
      phone: parsed.phone || prev.phone
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const factoryData = {
      ...formData,
      positions: formData.positions.split('\n').filter(p => p.trim())
    };
    addFactory(factoryData);
    navigate('/jobs');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="min-h-screen bg-white relative overflow-hidden">
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10"><LineStar size={40} /></div>
        <div className="absolute bottom-40 right-20"><LineHeart size={50} /></div>
        <div className="absolute top-40 right-32"><LineStar size={30} /></div>
      </div>

      <div className="relative z-10 max-w-2xl mx-auto px-6 py-12">
        <button 
          onClick={() => navigate('/jobs')}
          className="flex items-center gap-2 text-primary hover:text-muted transition-colors mb-8"
        >
          <LineArrowLeft />
          <span>返回列表</span>
        </button>

        <div className="bg-white border-2 border-primary p-8">
          <h1 className="text-3xl font-bold mb-2">发布厂区招人</h1>
          <p className="text-muted mb-8">填写厂区招聘信息</p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="border-2 border-dashed border-primary p-6">
              <label className="block text-sm font-medium mb-2">✨ 智能粘贴</label>
              <p className="text-xs text-muted mb-3">粘贴招聘文案，自动解析填充表单</p>
              <textarea
                value={pasteText}
                onChange={(e) => setPasteText(e.target.value)}
                placeholder="粘贴招聘文案到这里..."
                rows={4}
                className="w-full border-2 border-primary px-4 py-3 focus:outline-none focus:border-muted resize-none mb-3"
              />
              <button
                type="button"
                onClick={handleSmartPaste}
                className="w-full border-2 border-primary py-3 font-medium hover:bg-primary hover:text-white transition-colors"
              >
                🤖 智能解析填充
              </button>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">厂区名称 *</label>
              <input
                type="text"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                placeholder="例如：杭州富士康工厂"
                className="w-full border-2 border-primary px-4 py-3 focus:outline-none focus:border-muted"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">厂区地址 *</label>
              <input
                type="text"
                name="location"
                required
                value={formData.location}
                onChange={handleChange}
                placeholder="例如：杭州萧山区江东工业园区"
                className="w-full border-2 border-primary px-4 py-3 focus:outline-none focus:border-muted"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">招聘岗位 *</label>
              <textarea
                name="positions"
                required
                value={formData.positions}
                onChange={handleChange}
                rows={4}
                placeholder="每行一个岗位&#10;例如：&#10;流水线操作员&#10;质检员&#10;仓库管理员"
                className="w-full border-2 border-primary px-4 py-3 focus:outline-none focus:border-muted resize-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">薪资待遇 *</label>
              <input
                type="text"
                name="salary"
                required
                value={formData.salary}
                onChange={handleChange}
                placeholder="例如：5000-8000元/月，包吃住"
                className="w-full border-2 border-primary px-4 py-3 focus:outline-none focus:border-muted"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">福利待遇</label>
              <textarea
                name="welfare"
                value={formData.welfare}
                onChange={handleChange}
                rows={3}
                placeholder="例如：&#10;• 包吃包住&#10;• 五险一金&#10;• 加班补助&#10;• 节假日福利"
                className="w-full border-2 border-primary px-4 py-3 focus:outline-none focus:border-muted resize-none"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">联系人 *</label>
                <input
                  type="text"
                  name="contact"
                  required
                  value={formData.contact}
                  onChange={handleChange}
                  placeholder="联系人姓名"
                  className="w-full border-2 border-primary px-4 py-3 focus:outline-none focus:border-muted"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">联系电话 *</label>
                <input
                  type="tel"
                  name="phone"
                  required
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="手机号码"
                  className="w-full border-2 border-primary px-4 py-3 focus:outline-none focus:border-muted"
                />
              </div>
            </div>

            <div className="pt-4">
              <button
                type="submit"
                className="w-full bg-primary text-white py-4 font-medium hover:bg-muted transition-colors"
              >
                发布厂区信息
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
