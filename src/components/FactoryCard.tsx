import { Edit2, Trash2, MapPin, Calendar, Clock, User, DollarSign } from 'lucide-react';
import { FactoryJob } from '../types';

interface FactoryCardProps {
  job: FactoryJob;
  onEdit: (job: FactoryJob) => void;
  onDelete: (id: string) => void;
}

export default function FactoryCard({ job, onEdit, onDelete }: FactoryCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden hover:shadow-md transition-shadow">
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold text-white">¥{job.hourlyRate}</span>
            <span className="text-blue-200 text-sm">/小时</span>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => onEdit(job)}
              className="p-2 bg-white/20 hover:bg-white/30 rounded-lg transition-colors"
              title="编辑"
            >
              <Edit2 className="w-4 h-4 text-white" />
            </button>
            <button
              onClick={() => onDelete(job.id)}
              className="p-2 bg-white/20 hover:bg-red-500/80 rounded-lg transition-colors"
              title="删除"
            >
              <Trash2 className="w-4 h-4 text-white" />
            </button>
          </div>
        </div>
      </div>
      
      <div className="p-4 space-y-3">
        <div className="flex items-center gap-2 text-slate-700">
          <MapPin className="w-4 h-4 text-slate-400" />
          <span className="font-medium">{job.location || '未填写地点'}</span>
        </div>
        
        <div className="flex items-center gap-2 text-slate-700">
          <Calendar className="w-4 h-4 text-slate-400" />
          <span>{job.date || '未填写日期'}</span>
        </div>
        
        {job.interviewTime && (
          <div className="flex items-center gap-2 text-slate-700">
            <Clock className="w-4 h-4 text-slate-400" />
            <span>面试时间: {job.interviewTime}</span>
          </div>
        )}
        
        <div className="flex items-center gap-2 text-slate-700">
          <User className="w-4 h-4 text-slate-400" />
          <span>{job.age || '年龄不限'} · {job.gender || '男女不限'}</span>
        </div>
        
        {job.workContent && (
          <div className="flex items-start gap-2 text-slate-700">
            <DollarSign className="w-4 h-4 text-slate-400 mt-0.5" />
            <span>{job.workContent}</span>
          </div>
        )}
        
        {job.workHours && (
          <div className="flex items-center gap-2 text-slate-700">
            <Clock className="w-4 h-4 text-slate-400" />
            <span>工作时长: {job.workHours}</span>
          </div>
        )}
        
        <div className="flex flex-wrap gap-2 pt-2">
          {job.accommodation && (
            <span className="px-2 py-1 bg-purple-100 text-purple-700 text-xs rounded-full">
              🏠 {job.accommodation.includes('包住宿') ? '包住宿' : '提供住宿'}
            </span>
          )}
          {job.deposit && (
            <span className="px-2 py-1 bg-amber-100 text-amber-700 text-xs rounded-full">
              💰 {job.deposit}
            </span>
          )}
          {job.meals && (
            <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full">
              🍽️ {job.meals}
            </span>
          )}
          {job.insurance && (
            <span className="px-2 py-1 bg-slate-100 text-slate-700 text-xs rounded-full">
              🛡️ {job.insurance}
            </span>
          )}
        </div>
        
        {job.advancePayment && (
          <p className="text-sm text-blue-600 bg-blue-50 px-3 py-2 rounded-lg">
            💵 {job.advancePayment}
          </p>
        )}
        
        {job.paymentDate && (
          <p className="text-sm text-slate-600">
            📅 发薪日: {job.paymentDate}
          </p>
        )}
        
        {job.notes && (
          <p className="text-sm text-slate-600 border-t border-slate-100 pt-2">
            📝 {job.notes}
          </p>
        )}
        
        <p className="text-xs text-slate-400 pt-2">
          创建于 {new Date(job.createdAt).toLocaleDateString('zh-CN')}
        </p>
      </div>
    </div>
  );
}
