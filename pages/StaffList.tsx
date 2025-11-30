import React, { useState } from 'react';
import { Search, Plus, Mail, Phone, MoreHorizontal, UserCheck, UserX, X, User, Briefcase, Calendar, ChevronLeft, ChevronRight } from 'lucide-react';
import { Staff } from '../types';

const INITIAL_STAFF: Staff[] = [
  { id: 'T2021001', name: 'Dr. Sarah Chen', role: 'Teacher', department: 'Mathematics', phone: '138-0000-1111', status: 'Active', joinDate: '2021-08-15' },
  { id: 'A2020056', name: 'Mark Wilson', role: 'Admin', department: 'Academic Affairs', phone: '139-0000-2222', status: 'Active', joinDate: '2020-03-10' },
  { id: 'T2022103', name: 'Emily Zhang', role: 'Teacher', department: 'English', phone: '137-0000-3333', status: 'Leave', joinDate: '2022-09-01' },
  { id: 'S2019088', name: 'David Li', role: 'Support', department: 'IT Services', phone: '136-0000-4444', status: 'Active', joinDate: '2019-06-20' },
  { id: 'T2023045', name: 'Michael Brown', role: 'Teacher', department: 'Physics', phone: '135-0000-5555', status: 'Active', joinDate: '2023-01-15' },
  { id: 'T2021002', name: 'Lisa Wang', role: 'Teacher', department: 'Chemistry', phone: '150-0000-6666', status: 'Active', joinDate: '2021-08-15' },
  { id: 'A2024001', name: 'James Smith', role: 'Admin', department: 'Finance', phone: '133-0000-7777', status: 'Active', joinDate: '2024-02-01' },
  { id: 'T2024002', name: 'Anna Liu', role: 'Teacher', department: 'Biology', phone: '132-0000-8888', status: 'Active', joinDate: '2024-02-10' },
];

export const StaffList: React.FC = () => {
  const [staffList, setStaffList] = useState<Staff[]>(INITIAL_STAFF);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  // New Staff Form State
  const [newStaff, setNewStaff] = useState<Partial<Staff>>({
    name: '',
    role: 'Teacher',
    department: '',
    phone: '',
    status: 'Active',
    joinDate: new Date().toISOString().split('T')[0]
  });

  const filteredStaff = staffList.filter(staff => 
    staff.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    staff.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
    staff.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCreateStaff = (e: React.FormEvent) => {
    e.preventDefault();
    const staff: Staff = {
      id: `S${new Date().getFullYear()}${Math.floor(Math.random() * 1000).toString().padStart(3, '0')}`,
      name: newStaff.name || 'New Staff',
      role: newStaff.role as any,
      department: newStaff.department || 'General',
      phone: newStaff.phone || '-',
      status: newStaff.status as any,
      joinDate: newStaff.joinDate || '',
    };

    setStaffList([staff, ...staffList]);
    setIsModalOpen(false);
    // Reset form
    setNewStaff({
      name: '',
      role: 'Teacher',
      department: '',
      phone: '',
      status: 'Active',
      joinDate: new Date().toISOString().split('T')[0]
    });
  };

  return (
    <div className="p-8 space-y-6 flex flex-col h-[calc(100vh-64px)]">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">教职工管理 Staff Management</h1>
          <p className="text-slate-500 mt-1">管理教师及行政人员档案、权限与状态。</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="flex items-center px-4 py-2 bg-brand-600 text-white rounded-lg hover:bg-brand-700 transition-colors shadow-sm"
        >
          <Plus size={18} className="mr-2" />
          新增员工
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-wrap gap-4 items-center">
        <div className="relative flex-1 min-w-[240px]">
          <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input 
            type="text" 
            placeholder="搜索姓名、部门或工号..." 
            className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
            <select className="px-4 py-2 border border-slate-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-brand-500 text-slate-600">
                <option>所有部门</option>
                <option>Mathematics</option>
                <option>English</option>
                <option>Science</option>
                <option>Admin</option>
            </select>
            <select className="px-4 py-2 border border-slate-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-brand-500 text-slate-600">
                <option>所有角色</option>
                <option>Teacher</option>
                <option>Admin</option>
                <option>Support</option>
            </select>
        </div>
      </div>

      {/* Staff Grid - Scrollable Area */}
      <div className="flex-1 overflow-y-auto min-h-0">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 pb-6">
          {filteredStaff.map((staff) => (
            <div key={staff.id} className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 hover:shadow-md transition-shadow group">
              <div className="flex justify-between items-start mb-4">
                  <div className="flex gap-4">
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold text-white shadow-sm ${
                          staff.role === 'Teacher' ? 'bg-blue-500' : 
                          staff.role === 'Admin' ? 'bg-purple-500' : 'bg-slate-500'
                      }`}>
                          {staff.name.charAt(0)}
                      </div>
                      <div>
                          <h3 className="font-bold text-slate-900 group-hover:text-brand-600 transition-colors">{staff.name}</h3>
                          <p className="text-sm text-slate-500">{staff.role} · {staff.department}</p>
                      </div>
                  </div>
                  <button className="text-slate-400 hover:text-slate-600 p-1 hover:bg-slate-100 rounded">
                      <MoreHorizontal size={20} />
                  </button>
              </div>
              
              <div className="space-y-3 py-4 border-t border-b border-slate-100 mb-4">
                  <div className="flex items-center text-sm text-slate-600">
                      <div className="w-5 text-slate-400"><Mail size={16} /></div>
                      <span className="truncate">{staff.id.toLowerCase()}@school.edu</span>
                  </div>
                  <div className="flex items-center text-sm text-slate-600">
                      <div className="w-5 text-slate-400"><Phone size={16} /></div>
                      <span>{staff.phone}</span>
                  </div>
              </div>

              <div className="flex justify-between items-center">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      staff.status === 'Active' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                  }`}>
                      {staff.status === 'Active' ? <UserCheck size={12} className="mr-1"/> : <UserX size={12} className="mr-1"/>}
                      {staff.status}
                  </span>
                  <span className="text-xs text-slate-400">入职: {staff.joinDate}</span>
              </div>
            </div>
          ))}
          {filteredStaff.length === 0 && (
             <div className="col-span-full py-12 text-center text-slate-500 bg-white rounded-xl border border-slate-200 border-dashed">
                未找到匹配的教职工信息
             </div>
          )}
        </div>
      </div>

      {/* Pagination Footer */}
      <div className="bg-white border-t border-slate-200 -mx-8 -mb-8 px-8 py-4 flex items-center justify-between mt-auto">
          <div className="text-sm text-slate-500">
            显示 <span className="font-medium">1</span> 到 <span className="font-medium">{Math.min(filteredStaff.length, 12)}</span> 条，共 <span className="font-medium">{filteredStaff.length}</span> 条
          </div>
          <div className="flex gap-2">
            <button 
              className="p-2 border border-slate-200 rounded-lg hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(prev => prev - 1)}
            >
              <ChevronLeft size={16} className="text-slate-600" />
            </button>
            <button className="px-3 py-1 bg-brand-50 text-brand-600 border border-brand-200 rounded-lg text-sm font-medium">1</button>
            <button className="px-3 py-1 hover:bg-slate-50 text-slate-600 border border-slate-200 rounded-lg text-sm font-medium">2</button>
            <button 
              className="p-2 border border-slate-200 rounded-lg hover:bg-slate-50"
              onClick={() => setCurrentPage(prev => prev + 1)}
            >
              <ChevronRight size={16} className="text-slate-600" />
            </button>
          </div>
      </div>

      {/* Create Staff Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4 animate-fade-in">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg overflow-hidden animate-scale-up">
            <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-slate-50">
              <h3 className="text-lg font-bold text-slate-900">新增员工 / New Staff</h3>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 hover:bg-slate-200 p-1 rounded-full transition-colors"
              >
                <X size={20} />
              </button>
            </div>
            
            <form onSubmit={handleCreateStaff} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  <div className="flex items-center gap-1.5"><User size={16}/> 姓名</div>
                </label>
                <input 
                  type="text" 
                  required
                  placeholder="例如：王老师"
                  className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500"
                  value={newStaff.name}
                  onChange={e => setNewStaff({...newStaff, name: e.target.value})}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                 <div>
                   <label className="block text-sm font-medium text-slate-700 mb-1">
                     <div className="flex items-center gap-1.5"><Briefcase size={16}/> 部门</div>
                   </label>
                   <input 
                    type="text" 
                    placeholder="例如：数学组"
                    className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500"
                    value={newStaff.department}
                    onChange={e => setNewStaff({...newStaff, department: e.target.value})}
                  />
                 </div>
                 <div>
                   <label className="block text-sm font-medium text-slate-700 mb-1">
                    角色/职位
                  </label>
                  <select 
                    className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500 bg-white"
                    value={newStaff.role}
                    onChange={e => setNewStaff({...newStaff, role: e.target.value as any})}
                  >
                    <option value="Teacher">Teacher (教师)</option>
                    <option value="Admin">Admin (管理员)</option>
                    <option value="Support">Support (教辅/后勤)</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                   <label className="block text-sm font-medium text-slate-700 mb-1">
                    <div className="flex items-center gap-1.5"><Phone size={16}/> 联系电话</div>
                  </label>
                  <input 
                    type="tel" 
                    placeholder="138-0000-0000"
                    className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500"
                    value={newStaff.phone}
                    onChange={e => setNewStaff({...newStaff, phone: e.target.value})}
                  />
                </div>
                <div>
                   <label className="block text-sm font-medium text-slate-700 mb-1">
                    <div className="flex items-center gap-1.5"><Calendar size={16}/> 入职日期</div>
                  </label>
                  <input 
                    type="date" 
                    className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500 text-slate-600"
                    value={newStaff.joinDate}
                    onChange={e => setNewStaff({...newStaff, joinDate: e.target.value})}
                  />
                </div>
              </div>

              <div className="pt-4 flex gap-3">
                <button 
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 px-4 py-2 border border-slate-200 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors"
                >
                  取消
                </button>
                <button 
                  type="submit"
                  className="flex-1 px-4 py-2 bg-brand-600 text-white rounded-lg hover:bg-brand-700 transition-colors font-medium shadow-sm"
                >
                  确认添加
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};