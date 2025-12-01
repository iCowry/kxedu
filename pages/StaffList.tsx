import React, { useState } from 'react';
import { Search, Plus, Mail, Phone, MoreHorizontal, UserCheck, UserX, X, User, Briefcase, Calendar, ChevronLeft, ChevronRight, Edit2, Trash2, Filter, GraduationCap } from 'lucide-react';
import { Staff } from '../types';

// Generate more mock data to demonstrate pagination
const GENERATE_MOCK_STAFF = (): Staff[] => {
  const roles = ['Teacher', 'Admin', 'Support'];
  const depts = ['Mathematics', 'English', 'Physics', 'Chemistry', 'Biology', 'History', 'IT Services', 'Student Affairs', 'Finance'];
  const list: Staff[] = [];
  
  // Add some fixed data first
  list.push(
    { id: 'T2021001', name: 'Dr. Sarah Chen', role: 'Teacher', department: 'Mathematics', phone: '138-0000-1111', status: 'Active', joinDate: '2021-08-15' },
    { id: 'A2020056', name: 'Mark Wilson', role: 'Admin', department: 'Academic Affairs', phone: '139-0000-2222', status: 'Active', joinDate: '2020-03-10' },
    { id: 'T2022103', name: 'Emily Zhang', role: 'Teacher', department: 'English', phone: '137-0000-3333', status: 'Leave', joinDate: '2022-09-01' }
  );

  for(let i=1; i<=21; i++) {
      list.push({
          id: `S2024${i.toString().padStart(3, '0')}`,
          name: `Staff Member ${i}`,
          role: roles[Math.floor(Math.random() * roles.length)] as any,
          department: depts[Math.floor(Math.random() * depts.length)],
          phone: `138-1234-${i.toString().padStart(4, '0')}`,
          status: Math.random() > 0.1 ? 'Active' : 'Leave',
          joinDate: '2023-09-01'
      });
  }
  return list;
}

const INITIAL_STAFF = GENERATE_MOCK_STAFF();

export const StaffList: React.FC = () => {
  const [staffList, setStaffList] = useState<Staff[]>(INITIAL_STAFF);
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('All');
  const [deptFilter, setDeptFilter] = useState('All');
  
  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

  // Form State
  const [formData, setFormData] = useState<Partial<Staff>>({
    name: '',
    role: 'Teacher',
    department: '',
    phone: '',
    status: 'Active',
    joinDate: new Date().toISOString().split('T')[0]
  });

  // --- Logic ---

  const filteredStaff = staffList.filter(staff => {
    const matchesSearch = staff.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          staff.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          staff.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = roleFilter === 'All' || staff.role === roleFilter;
    const matchesDept = deptFilter === 'All' || staff.department === deptFilter;
    
    return matchesSearch && matchesRole && matchesDept;
  });

  const totalPages = Math.ceil(filteredStaff.length / itemsPerPage);
  const currentData = filteredStaff.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const uniqueDepartments = Array.from(new Set(staffList.map(s => s.department)));

  // --- Handlers ---

  const handleOpenCreate = () => {
    setIsEditMode(false);
    setEditingId(null);
    setFormData({
      name: '',
      role: 'Teacher',
      department: '',
      phone: '',
      status: 'Active',
      joinDate: new Date().toISOString().split('T')[0]
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (staff: Staff) => {
    setIsEditMode(true);
    setEditingId(staff.id);
    setFormData({ ...staff });
    setIsModalOpen(true);
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this staff member? This action cannot be undone.')) {
      setStaffList(prev => prev.filter(s => s.id !== id));
      // Adjust page if necessary
      if (currentData.length === 1 && currentPage > 1) {
        setCurrentPage(prev => prev - 1);
      }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isEditMode && editingId) {
      // Update existing
      setStaffList(prev => prev.map(s => s.id === editingId ? { ...s, ...formData } as Staff : s));
    } else {
      // Create new
      const newId = `S${new Date().getFullYear()}${Math.floor(Math.random() * 1000).toString().padStart(3, '0')}`;
      const newStaff = { ...formData, id: newId } as Staff;
      setStaffList([newStaff, ...staffList]);
    }
    
    setIsModalOpen(false);
  };

  return (
    <div className="p-8 space-y-6 flex flex-col h-[calc(100vh-64px)]">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">教职工管理 Staff Management</h1>
          <p className="text-slate-500 mt-1">管理教师及行政人员档案、权限与状态。</p>
        </div>
        <button 
          onClick={handleOpenCreate}
          className="flex items-center px-4 py-2 bg-brand-600 text-white rounded-lg hover:bg-brand-700 transition-colors shadow-sm font-medium"
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
            <select 
              className="px-4 py-2 border border-slate-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-brand-500 text-slate-600"
              value={deptFilter}
              onChange={(e) => setDeptFilter(e.target.value)}
            >
                <option value="All">所有部门</option>
                {uniqueDepartments.map(d => <option key={d} value={d}>{d}</option>)}
            </select>
            <select 
              className="px-4 py-2 border border-slate-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-brand-500 text-slate-600"
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
            >
                <option value="All">所有角色</option>
                <option value="Teacher">Teacher</option>
                <option value="Admin">Admin</option>
                <option value="Support">Support</option>
            </select>
        </div>
      </div>

      {/* Staff Grid - Scrollable Area */}
      <div className="flex-1 overflow-y-auto min-h-0">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 pb-6">
          {currentData.map((staff) => (
            <div key={staff.id} className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 hover:shadow-md transition-shadow group relative">
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
                          <p className="text-sm text-slate-500 flex items-center gap-1">
                            {staff.role === 'Teacher' && <GraduationCap size={12}/>}
                            {staff.role === 'Admin' && <Briefcase size={12}/>}
                            {staff.role} · {staff.department}
                          </p>
                      </div>
                  </div>
                  
                  {/* Actions Dropdown Substitute (Simple Buttons) */}
                  <div className="flex gap-1">
                      <button 
                        onClick={() => handleOpenEdit(staff)}
                        className="p-1.5 text-slate-400 hover:text-brand-600 hover:bg-brand-50 rounded transition-colors"
                        title="Edit"
                      >
                          <Edit2 size={16} />
                      </button>
                      <button 
                        onClick={() => handleDelete(staff.id)}
                        className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded transition-colors"
                        title="Delete"
                      >
                          <Trash2 size={16} />
                      </button>
                  </div>
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
                  <span className="text-xs text-slate-400 flex items-center gap-1">
                    <Calendar size={12}/> {staff.joinDate}
                  </span>
              </div>
            </div>
          ))}
          
          {filteredStaff.length === 0 && (
             <div className="col-span-full py-12 text-center text-slate-500 bg-white rounded-xl border border-slate-200 border-dashed flex flex-col items-center">
                <Search size={48} className="text-slate-300 mb-4" />
                <p>未找到匹配的教职工信息</p>
                <button 
                  onClick={() => {setSearchTerm(''); setRoleFilter('All'); setDeptFilter('All');}}
                  className="mt-2 text-brand-600 hover:underline text-sm"
                >
                  清除筛选条件
                </button>
             </div>
          )}
        </div>
      </div>

      {/* Pagination Footer */}
      <div className="bg-white border-t border-slate-200 -mx-8 -mb-8 px-8 py-4 flex items-center justify-between mt-auto">
          <div className="text-sm text-slate-500">
            显示 <span className="font-medium">{Math.min((currentPage - 1) * itemsPerPage + 1, filteredStaff.length)}</span> 到 <span className="font-medium">{Math.min(currentPage * itemsPerPage, filteredStaff.length)}</span> 条，共 <span className="font-medium">{filteredStaff.length}</span> 条
          </div>
          <div className="flex gap-2">
            <button 
              className="p-2 border border-slate-200 rounded-lg hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(prev => prev - 1)}
            >
              <ChevronLeft size={16} className="text-slate-600" />
            </button>
            
            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                // Simple logic to show a few pages window, centered around current if possible
                let pageNum = i + 1;
                if (totalPages > 5 && currentPage > 3) {
                    pageNum = currentPage - 3 + i;
                    if (pageNum > totalPages) pageNum = totalPages - 4 + i;
                }
                
                return (
                    <button 
                        key={pageNum}
                        onClick={() => setCurrentPage(pageNum)}
                        className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors border ${
                            currentPage === pageNum 
                            ? 'bg-brand-50 text-brand-600 border-brand-200' 
                            : 'hover:bg-slate-50 text-slate-600 border-slate-200'
                        }`}
                    >
                        {pageNum}
                    </button>
                );
            })}

            <button 
              className="p-2 border border-slate-200 rounded-lg hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              disabled={currentPage === totalPages || totalPages === 0}
              onClick={() => setCurrentPage(prev => prev + 1)}
            >
              <ChevronRight size={16} className="text-slate-600" />
            </button>
          </div>
      </div>

      {/* Create/Edit Staff Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4 animate-fade-in">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg overflow-hidden animate-scale-up">
            <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-slate-50">
              <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                {isEditMode ? <Edit2 size={20} className="text-brand-600"/> : <Plus size={20} className="text-brand-600"/>}
                {isEditMode ? '编辑员工 / Edit Staff' : '新增员工 / New Staff'}
              </h3>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 hover:bg-slate-200 p-1 rounded-full transition-colors"
              >
                <X size={20} />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  <div className="flex items-center gap-1.5"><User size={16}/> 姓名</div>
                </label>
                <input 
                  type="text" 
                  required
                  placeholder="例如：王老师"
                  className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500"
                  value={formData.name}
                  onChange={e => setFormData({...formData, name: e.target.value})}
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
                    value={formData.department}
                    onChange={e => setFormData({...formData, department: e.target.value})}
                  />
                 </div>
                 <div>
                   <label className="block text-sm font-medium text-slate-700 mb-1">
                    角色/职位
                  </label>
                  <select 
                    className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500 bg-white"
                    value={formData.role}
                    onChange={e => setFormData({...formData, role: e.target.value as any})}
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
                    value={formData.phone}
                    onChange={e => setFormData({...formData, phone: e.target.value})}
                  />
                </div>
                <div>
                   <label className="block text-sm font-medium text-slate-700 mb-1">
                    <div className="flex items-center gap-1.5"><Calendar size={16}/> 入职日期</div>
                  </label>
                  <input 
                    type="date" 
                    className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500 text-slate-600"
                    value={formData.joinDate}
                    onChange={e => setFormData({...formData, joinDate: e.target.value})}
                  />
                </div>
              </div>
              
              <div className="pt-2">
                  <label className="block text-sm font-medium text-slate-700 mb-2">状态</label>
                  <div className="flex gap-4">
                      <label className={`flex-1 border rounded-lg p-3 cursor-pointer transition-colors flex items-center justify-center gap-2 ${formData.status === 'Active' ? 'bg-emerald-50 border-emerald-200 text-emerald-700 font-medium' : 'border-slate-200 hover:bg-slate-50'}`}>
                          <input type="radio" className="hidden" checked={formData.status === 'Active'} onChange={() => setFormData({...formData, status: 'Active'})} />
                          <UserCheck size={16} /> Active
                      </label>
                      <label className={`flex-1 border rounded-lg p-3 cursor-pointer transition-colors flex items-center justify-center gap-2 ${formData.status === 'Leave' ? 'bg-amber-50 border-amber-200 text-amber-700 font-medium' : 'border-slate-200 hover:bg-slate-50'}`}>
                          <input type="radio" className="hidden" checked={formData.status === 'Leave'} onChange={() => setFormData({...formData, status: 'Leave'})} />
                          <UserX size={16} /> Leave
                      </label>
                  </div>
              </div>

              <div className="pt-4 flex gap-3 border-t border-slate-100 mt-2">
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
                  {isEditMode ? '保存修改' : '确认添加'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};