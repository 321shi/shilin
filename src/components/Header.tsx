import { Link, useLocation } from 'react-router-dom';
import { Briefcase, Building2 } from 'lucide-react';

interface HeaderProps {
  partTimeCount: number;
  factoryCount: number;
}

export default function Header({ partTimeCount, factoryCount }: HeaderProps) {
  const location = useLocation();
  
  return (
    <header className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white shadow-2xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-amber-500 rounded-xl flex items-center justify-center shadow-lg">
              <span className="text-xl">📋</span>
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight">招聘信息管理</h1>
              <p className="text-xs text-slate-400">兼职 · 工厂</p>
            </div>
          </div>
          
          <nav className="flex space-x-1">
            <Link
              to="/part-time"
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                location.pathname === '/part-time' || location.pathname === '/'
                  ? 'bg-orange-500 shadow-lg shadow-orange-500/30'
                  : 'hover:bg-slate-700'
              }`}
            >
              <Briefcase className="w-4 h-4" />
              <span className="font-medium">兼职</span>
              <span className={`text-xs px-2 py-0.5 rounded-full ${
                location.pathname === '/part-time' || location.pathname === '/'
                  ? 'bg-orange-600'
                  : 'bg-slate-600'
              }`}>
                {partTimeCount}
              </span>
            </Link>
            
            <Link
              to="/factory"
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                location.pathname === '/factory'
                  ? 'bg-orange-500 shadow-lg shadow-orange-500/30'
                  : 'hover:bg-slate-700'
              }`}
            >
              <Building2 className="w-4 h-4" />
              <span className="font-medium">工厂</span>
              <span className={`text-xs px-2 py-0.5 rounded-full ${
                location.pathname === '/factory'
                  ? 'bg-orange-600'
                  : 'bg-slate-600'
              }`}>
                {factoryCount}
              </span>
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
