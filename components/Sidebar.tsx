
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
  Coffee,
  ChevronDown
} from 'lucide-react';
import { NavItem, CurrentUser, UserRole } from '../types';

// Define all possible navigation items
const ALL_NAV_ITEMS: NavItem[] = [
  { label: '总览 Dashboard', path: '/', icon: LayoutDashboard }, // Accessible by All (content changes)
  { label: '租户管理 Tenants', path: '/tenants', icon: Building2, allowedRoles: ['SuperAdmin'] },
  { label: '组织架构 Org', path: '/organization', icon: Layers, allowedRoles: ['SuperAdmin', 'TenantAdmin', 'AcademicDirector', 'GradeDirector'] }, 
  { label: '教职工管理 HR', path: '/staff', icon: Users, allowedRoles: ['SuperAdmin', 'TenantAdmin'] },
  { label: '学生管理 Student', path: '/students', icon: GraduationCap, allowedRoles: ['SuperAdmin', 'TenantAdmin', 'AcademicDirector', 'GradeDirector', 'HomeroomTeacher'] },
  { label: '教研中心 Research', path: '/research', icon: GitBranch, allowedRoles: ['SuperAdmin', 'TenantAdmin', 'AcademicDirector', 'SubjectTeacher', 'HomeroomTeacher'] },
  { label: '题库管理 Question Bank', path: '/questions', icon: Database, allowedRoles: ['SuperAdmin', 'TenantAdmin', 'AcademicDirector', 'SubjectTeacher', 'Student'] },
  { label: '教学教务 Academic', path: '/academic', icon: BookOpen, allowedRoles: ['SuperAdmin', 'TenantAdmin', 'AcademicDirector'] },
  { label: '学情管理 Learning', path: '/learning', icon: BookCheck, allowedRoles: ['SuperAdmin', 'TenantAdmin', 'AcademicDirector', 'HomeroomTeacher', 'SubjectTeacher', 'Student', 'Parent'] },
  { label: '教学辅导 Tutoring', path: '/tutoring', icon: Coffee, allowedRoles: ['HomeroomTeacher', 'SubjectTeacher', 'Student', 'Parent'] },
  { label: '竞赛规划 Competitions', path: '/competitions', icon: Target, allowedRoles: ['SuperAdmin', 'TenantAdmin', 'AcademicDirector', 'SubjectTeacher', 'Student'] },
  { label: '院校排行 Rankings', path: '/rankings', icon: ListOrdered }, // Public/All
  { label: '升学分析 Analytics', path: '/analytics', icon: PieChart, allowedRoles: ['SuperAdmin', 'TenantAdmin', 'AcademicDirector', 'GradeDirector'] },
  { label: '财务管理 Finance', path: '/finance', icon: CreditCard, allowedRoles: ['SuperAdmin', 'TenantAdmin'] },
  { label: '校园行政 Campus', path: '/campus', icon: Building, allowedRoles: ['SuperAdmin', 'TenantAdmin'] },
  { label: '家校互通 Comm', path: '/communication', icon: MessageCircle }, // All
  { label: '拓展模块 Extension', path: '/extension', icon: Trophy }, // All
  { label: '系统设置 Settings', path: '/settings', icon: Settings, allowedRoles: ['SuperAdmin', 'TenantAdmin'] },
];

interface SidebarProps {
  currentUser: CurrentUser;
  onSwitchRole: (role: UserRole) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ currentUser, onSwitchRole }) => {
  
  // Filter items based on role
  const visibleNavItems = ALL_NAV_ITEMS.filter(item => {
    if (!item.allowedRoles) return true; // Accessible by everyone if no roles specified
    return item.allowedRoles.includes(currentUser.role);
  });

  return (
    <aside className="w-64 bg-white border-r border-slate-200 flex flex-col h-screen fixed left-0 top-0 z-20">
      {/* Brand */}
      <div className="h-16 flex items-center px-6 border-b border-slate-100 flex-shrink-0">
        <div className="w-8 h-8 bg-brand-600 rounded-lg flex items-center justify-center text-white font-bold mr-3">K</div>
        <span className="font-bold text-lg text-slate-800">Kexin Edu SaaS</span>
      </div>
      
      {/* Menu */}
      <nav className="flex-1 py-4 px-3 space-y-1 overflow-y-auto">
        {visibleNavItems.map((item) => (
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
            <item.icon size={18} className="mr-3 flex-shrink-0" />
            <span className="truncate">{item.label}</span>
          </NavLink>
        ))}
      </nav>

      {/* User & Role Switcher */}
      <div className="p-4 border-t border-slate-100 bg-slate-50">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-9 h-9 rounded-full bg-brand-200 flex items-center justify-center text-brand-700 font-bold text-sm">
            {currentUser.avatar || currentUser.name.charAt(0)}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-bold text-slate-900 truncate">{currentUser.name}</p>
            <p className="text-xs text-slate-500 truncate">{currentUser.role}</p>
          </div>
        </div>
        
        {/* Mock Role Switcher for Demo */}
        <div className="relative">
            <select 
                className="w-full text-xs p-2 border border-slate-200 rounded-lg bg-white appearance-none cursor-pointer hover:border-brand-300 focus:outline-none focus:border-brand-500"
                value={currentUser.role}
                onChange={(e) => onSwitchRole(e.target.value as UserRole)}
            >
                <option value="SuperAdmin">角色: 平台超级管理员</option>
                <option value="TenantAdmin">角色: 校长/管理员</option>
                <option value="AcademicDirector">角色: 教务主任</option>
                <option value="HomeroomTeacher">角色: 班主任</option>
                <option value="SubjectTeacher">角色: 任课老师</option>
                <option value="Student">角色: 学生</option>
                <option value="Parent">角色: 家长</option>
            </select>
            <ChevronDown size={14} className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"/>
        </div>
      </div>
    </aside>
  );
};
