import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useJobs } from '../hooks/useJobs';
import { LineArrowLeft, LineStar, LineHeart } from '../components/CuteDecorations';
import { parseRecruitmentText } from '../lib/jobUtils';

export default function CreateDailyJob() {
  const navigate = useNavigate();
  const { addDailyJob } = useJobs();
  
  const [formData, setFormData] = useState({
    title: '',
    wage: '',
    workTime: '',
    location: '',
    requirements: '',
    contact: '',
    phone: '',
    urgent: false
  });

  const [pasteText, setPasteText] = useState('');

  const handleSmartPaste = () => {
    if (!pasteText.trim()) return;

    const parsed = parseRecruitmentText(pasteText);
    
    setFormData(prev => ({
      ...prev,
      title: parsed.title || prev.title,
      wage: parsed.wage || prev.wage,
      workTime: parsed.workTime || prev.workTime,
      location: parsed.location || prev.location,
      requirements: parsed.requirements || prev.requirements,
      phone: parsed.phone || prev.phone,
      urgent: parsed.urgent || prev.urgent
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addDailyJob(formData);
    navigate('/jobs');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
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
          <h1 className="text-3xl font-bold mb-2">发布兼职日结</h1>
          <p className="text-muted mb-8">填写兼职工作信息</p>

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
              <label className="block text-sm font-medium mb-2">工作标题 *</label>
              <input
                type="text"
                name="title"
                required
                value={formData.title}
                onChange={handleChange}
                placeholder="例如：快递分拣员"
                className="w-full border-2 border-primary px-4 py-3 focus:outline-none focus:border-muted"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">日薪 *</label>
                <input
                  type="text"
                  name="wage"
                  required
                  value={formData.wage}
                  onChange={handleChange}
                  placeholder="例如：180-220元"
                  className="w-full border-2 border-primary px-4 py-3 focus:outline-none focus:border-muted"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">工作时长 *</label>
                <input
                  type="text"
                  name="workTime"
                  required
                  value={formData.workTime}
                  onChange={handleChange}
                  placeholder="例如：8小时/天"
                  className="w-full border-2 border-primary px-4 py-3 focus:outline-none focus:border-muted"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">工作地点 *</label>
              <input
                type="text"
                name="location"
                required
                value={formData.location}
                onChange={handleChange}
                placeholder="例如：杭州余杭区阿里巴巴园区"
                className="w-full border-2 border-primary px-4 py-3 focus:outline-none focus:border-muted"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">工作要求</label>
              <textarea
                name="requirements"
                value={formData.requirements}
                onChange={handleChange}
                rows={3}
                placeholder="例如：男女不限，18-45岁，身体健康"
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

            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                name="urgent"
                id="urgent"
                checked={formData.urgent}
                onChange={handleChange}
                className="w-5 h-5 border-2 border-primary"
              />
              <label htmlFor="urgent" className="text-sm font-medium">紧急招聘</label>
            </div>

            <div className="pt-4">
              <button
                type="submit"
                className="w-full bg-primary text-white py-4 font-medium hover:bg-muted transition-colors"
              >
                发布兼职信息
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
