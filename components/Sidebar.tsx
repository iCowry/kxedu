import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Building2, 
  Users, 
  GraduationCap, 
  BookOpen, 
  PieChart, 
  Settings, 
  CreditCard,
  Building,
  MessageCircle,
  Trophy,
  Layers,
  ListOrdered,
  BookCheck,
  Target,
  GitBranch,
  Database,
  Coffee
} from 'lucide-react';
import { NavItem } from '../types';

const navItems: NavItem[] = [
  { label: '总览 Dashboard', path: '/', icon: LayoutDashboard },
  { label: '租户管理 Tenants', path: '/tenants', icon: Building2 },
  { label: '组织架构 Org', path: '/organization', icon: Layers }, 
  { label: '院校排行 Rankings', path: '/rankings', icon: ListOrdered }, 
  { label: '竞赛规划 Competitions', path: '/competitions', icon: Target },
  { label: '教职工管理 HR', path: '/staff', icon: Users },
  { label: '学生管理 Student', path: '/students', icon: GraduationCap },
  { label: '学情管理 Learning', path: '/learning', icon: BookCheck },
  { label: '教研中心 Research', path: '/research', icon: GitBranch },
  { label: '题库管理 Question Bank', path: '/questions', icon: Database },
  { label: '教学辅导 Tutoring', path: '/tutoring', icon: Coffee },
  { label: '教学教务 Academic', path: '/academic', icon: BookOpen },
  { label: '财务管理 Finance', path: '/finance', icon: CreditCard },
  { label: '校园行政 Campus', path: '/campus', icon: Building },
  { label: '家校互通 Comm', path: '/communication', icon: MessageCircle },
  { label: '升学分析 Analytics', path: '/analytics', icon: PieChart },
  { label: '拓展模块 Extension', path: '/extension', icon: Trophy },
  { label: '系统设置 Settings', path: '/settings', icon: Settings },
];

export const Sidebar: React.FC = () => {
  return (
    <aside className="w-64 bg-white border-r border-slate-200 flex flex-col h-screen fixed left-0 top-0 overflow-y-auto z-10">
      <div className="h-16 flex items-center px-6 border-b border-slate-100">
        <div className="w-8 h-8 bg-brand-600 rounded-lg flex items-center justify-center text-white font-bold mr-3">K</div>
        <span className="font-bold text-lg text-slate-800">Kexin Edu SaaS</span>
      </div>
      
      <nav className="flex-1 py-4 px-3 space-y-1">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                isActive
                  ? 'bg-brand-50 text-brand-700'
                  : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
              }`
            }
          >
            <item.icon size={18} className="mr-3" />
            {item.label}
          </NavLink>
        ))}
      </nav>

      <div className="p-4 border-t border-slate-100">
        <div className="flex items-center gap-3">
          <img src="https://picsum.photos/40/40" alt="Admin" className="w-9 h-9 rounded-full bg-slate-200" />
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-slate-900 truncate">Super Admin</p>
            <p className="text-xs text-slate-500 truncate">admin@kxedu.com</p>
          </div>
        </div>
      </div>
    </aside>
  );
};
