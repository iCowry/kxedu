
import React, { useState, useEffect, useRef } from 'react';
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
  ChevronDown,
  Activity,
  School,
  Landmark,
  Check
} from 'lucide-react';
import { NavItem, CurrentUser, UserRole, Tenant } from '../types';

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
  { label: '体育 Sports', path: '/sports', icon: Activity, allowedRoles: ['SuperAdmin', 'TenantAdmin', 'AcademicDirector', 'HomeroomTeacher', 'SubjectTeacher', 'Student'] },
  { label: '竞赛规划 Competitions', path: '/competitions', icon: Target, allowedRoles: ['SuperAdmin', 'TenantAdmin', 'AcademicDirector', 'SubjectTeacher', 'Student'] },
  { label: '大学信息库 Universities', path: '/universities', icon: Landmark }, // Public/All
  { label: '高中信息库 High Schools', path: '/highschools', icon: School }, // Public/All
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
  currentTenant?: Tenant;
  availableTenants?: Tenant[];
  onSwitchTenant?: (tenant: Tenant) => void;
}

// Recursive component for rendering tenant tree
const TenantTreeItem: React.FC<{ 
  tenant: Tenant; 
  depth?: number; 
  currentTenantId?: string; 
  onSelect: (t: Tenant) => void; 
}> = ({ tenant, depth = 0, currentTenantId, onSelect }) => {
  return (
    <>
      <button
        onClick={() => onSelect(tenant)}
        className={`w-full text-left py-2 text-sm flex items-center justify-between hover:bg-slate-50 transition-colors relative ${
          currentTenantId === tenant.id ? 'bg-brand-50 text-brand-700' : 'text-slate-700'
        }`}
        style={{ paddingLeft: `${16 + depth * 12}px`, paddingRight: '16px' }}
      >
        {/* Connector Lines for hierarchy visualization */}
        {depth > 0 && (
           <>
             <div className="absolute top-0 bottom-0 w-px bg-slate-100" style={{ left: `${16 + (depth - 1) * 12 + 6}px` }}></div>
             <div className="absolute top-1/2 w-2 h-px bg-slate-200" style={{ left: `${16 + (depth - 1) * 12 + 6}px` }}></div>
           </>
        )}

        <div className="flex items-center gap-2 font-medium overflow-hidden">
          {tenant.type === 'Group' ? <Building2 size={16} className="text-slate-400 flex-shrink-0"/> : <School size={16} className="text-slate-400 flex-shrink-0"/>}
          <span className="truncate">{tenant.name}</span>
        </div>
        {currentTenantId === tenant.id && <Check size={14} className="text-brand-600 flex-shrink-0"/>}
      </button>
      
      {tenant.children && tenant.children.map(child => (
        <TenantTreeItem 
            key={child.id} 
            tenant={child} 
            depth={depth + 1} 
            currentTenantId={currentTenantId} 
            onSelect={onSelect}
        />
      ))}
    </>
  );
};

export const Sidebar: React.FC<SidebarProps> = ({ 
  currentUser, 
  onSwitchRole, 
  currentTenant, 
  availableTenants = [], 
  onSwitchTenant 
}) => {
  const [isTenantMenuOpen, setIsTenantMenuOpen] = useState(false);
  const tenantMenuRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (tenantMenuRef.current && !tenantMenuRef.current.contains(event.target as Node)) {
        setIsTenantMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Filter items based on role
  const visibleNavItems = ALL_NAV_ITEMS.filter(item => {
    if (!item.allowedRoles) return true; // Accessible by everyone if no roles specified
    return item.allowedRoles.includes(currentUser.role);
  });

  const handleTenantSelect = (tenant: Tenant) => {
    if (onSwitchTenant) {
      onSwitchTenant(tenant);
    }
    setIsTenantMenuOpen(false);
  };

  return (
    <aside className="w-64 bg-white border-r border-slate-200 flex flex-col h-screen fixed left-0 top-0 z-20">
      
      {/* Brand & Tenant Switcher */}
      <div className="h-16 flex items-center px-4 border-b border-slate-100 flex-shrink-0 relative" ref={tenantMenuRef}>
        <button 
          onClick={() => setIsTenantMenuOpen(!isTenantMenuOpen)}
          className="w-full flex items-center p-2 rounded-lg hover:bg-slate-50 transition-colors group outline-none"
        >
          <div className="w-8 h-8 bg-brand-600 rounded-lg flex items-center justify-center text-white font-bold mr-3 flex-shrink-0">
            {currentTenant?.name.charAt(0) || 'K'}
          </div>
          <div className="flex-1 text-left min-w-0">
            <div className="font-bold text-sm text-slate-800 truncate leading-tight">
              {currentTenant?.name || 'Kexin Edu SaaS'}
            </div>
            <div className="text-[10px] text-slate-500 truncate flex items-center gap-1">
              {currentTenant?.type === 'Group' ? '教育集团' : '校区'}
              <ChevronDown size={10} className={`transform transition-transform ${isTenantMenuOpen ? 'rotate-180' : ''}`}/>
            </div>
          </div>
        </button>

        {/* Tenant Dropdown */}
        {isTenantMenuOpen && (
          <div className="absolute top-16 left-2 right-2 bg-white border border-slate-200 shadow-xl rounded-xl z-50 overflow-hidden max-h-96 overflow-y-auto animate-fade-in-up">
            <div className="px-3 py-2 text-xs font-bold text-slate-400 uppercase bg-slate-50 border-b border-slate-100">
              切换租户 / Switch Tenant
            </div>
            <div className="py-1">
              {availableTenants.map(tenant => (
                <TenantTreeItem 
                  key={tenant.id}
                  tenant={tenant}
                  currentTenantId={currentTenant?.id}
                  onSelect={handleTenantSelect}
                />
              ))}
            </div>
          </div>
        )}
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
