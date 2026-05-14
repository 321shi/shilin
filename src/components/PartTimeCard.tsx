import { Edit2, Trash2, MapPin, Calendar, Clock, User, Shirt } from 'lucide-react';
import { PartTimeJob } from '../types';

interface PartTimeCardProps {
  job: PartTimeJob;
  onEdit: (job: PartTimeJob) => void;
  onDelete: (id: string) => void;
}

export default function PartTimeCard({ job, onEdit, onDelete }: PartTimeCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden hover:shadow-md transition-shadow">
      <div className="bg-gradient-to-r from-orange-500 to-amber-500 px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold text-white">¥{job.salary}</span>
            <span className="text-orange-100 text-sm">/天</span>
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
        
        <div className="flex items-center gap-2 text-slate-700">
          <Clock className="w-4 h-4 text-slate-400" />
          <span>{job.time || '未填写时间'}</span>
        </div>
        
        {job.requirements && (
          <div className="flex items-center gap-2 text-slate-700">
            <User className="w-4 h-4 text-slate-400" />
            <span>{job.requirements}</span>
          </div>
        )}
        
        {job.clothing && (
          <div className="flex items-center gap-2 text-slate-700">
            <Shirt className="w-4 h-4 text-slate-400" />
            <span>{job.clothing}</span>
          </div>
        )}
        
        <div className="flex flex-wrap gap-2 pt-2">
          {job.meals && (
            <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full">
              {job.meals}
            </span>
          )}
          {job.idRequired && (
            <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full">
              需身份证
            </span>
          )}
        </div>
        
        {job.deposit && (
          <p className="text-sm text-amber-600 bg-amber-50 px-3 py-2 rounded-lg">
            💰 {job.deposit}
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
