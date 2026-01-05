
import React, { useState } from 'react';
import { Search, Filter, MoreHorizontal, Plus, CheckCircle, XCircle, ChevronLeft, ChevronRight, X, School, Calendar, User, Mail, Building2, Users } from 'lucide-react';
import { Tenant } from '../types';

const INITIAL_TENANTS: Tenant[] = [
  { id: 'T001', name: '育才实验中学', type: 'School', plan: 'Enterprise', status: 'Active', studentCount: 2400, renewalDate: '2026-09-01' },
  { id: 'T002', name: '春蕾小学', type: 'School', plan: 'Basic', status: 'Active', studentCount: 850, renewalDate: '2025-12-31' },
  { id: 'T003', name: '高新第一高中', type: 'School', plan: 'Pro', status: 'Inactive', studentCount: 1200, renewalDate: '2024-11-15' },
  { id: 'G001', name: '未来教育集团', type: 'Group', plan: 'Enterprise', status: 'Active', studentCount: 5500, renewalDate: '2026-06-30' },
  { id: 'T005', name: '博雅艺术学院', type: 'School', plan: 'Pro', status: 'Active', studentCount: 600, renewalDate: '2025-08-20' },
];

export const TenantList: React.FC = () => {
  const [tenants, setTenants] = useState<Tenant[]>(INITIAL_TENANTS);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  // New Tenant Form State
  const [newTenant, setNewTenant] = useState<Partial<Tenant>>({
    name: '',
    type: 'School',
    plan: 'Pro',
    status: 'Active',
    studentCount: 0,
    renewalDate: new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toISOString().split('T')[0]
  });

  const filteredTenants = tenants.filter(t => 
    t.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    t.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCreateTenant = (e: React.FormEvent) => {
    e.preventDefault();
    const tenant: Tenant = {
      id: `T${Math.floor(Math.random() * 1000).toString().padStart(3, '0')}`,
      name: newTenant.name || 'New School',
      type: newTenant.type as any,
      plan: newTenant.plan as any,
      status: newTenant.status as any,
      studentCount: Number(newTenant.studentCount),
      renewalDate: newTenant.renewalDate || '',
    };
    
    setTenants([tenant, ...tenants]);
    setIsModalOpen(false);
    // Reset form
    setNewTenant({
      name: '',
      type: 'School',
      plan: 'Pro',
      status: 'Active',
      studentCount: 0,
      renewalDate: new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toISOString().split('T')[0]
    });
  };

  return (
    <div className="p-8 space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">租户管理 Tenant Management</h1>
          <p className="text-slate-500 mt-1">管理所有入驻学校及教育集团账户。</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="flex items-center px-4 py-2 bg-brand-600 text-white rounded-lg hover:bg-brand-700 transition-colors shadow-sm"
        >
          <Plus size={18} className="mr-2" />
          新建租户
        </button>
      </div>

      {/* Filters */}
      <div className="flex items-center space-x-4 bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
        <div className="relative flex-1 max-w-md">
          <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input 
            type="text" 
            placeholder="搜索租户名称或ID..." 
            className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <button className="flex items-center px-3 py-2 border border-slate-200 rounded-lg text-slate-600 hover:bg-slate-50">
          <Filter size={18} className="mr-2" />
          筛选
        </button>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">租户名称</th>
                <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">类型</th>
                <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">订阅方案</th>
                <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">状态</th>
                <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">学生规模</th>
                <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">续费日期</th>
                <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider text-right">操作</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredTenants.map((tenant) => (
                <tr key={tenant.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <div className={`w-8 h-8 rounded flex items-center justify-center font-bold mr-3 ${tenant.type === 'Group' ? 'bg-indigo-100 text-indigo-600' : 'bg-brand-100 text-brand-600'}`}>
                        {tenant.type === 'Group' ? <Building2 size={16}/> : <School size={16}/>}
                      </div>
                      <div>
                        <div className="font-medium text-slate-900">{tenant.name}</div>
                        <div className="text-xs text-slate-500">ID: {tenant.id}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded text-xs font-medium border ${tenant.type === 'Group' ? 'bg-indigo-50 text-indigo-700 border-indigo-100' : 'bg-slate-50 text-slate-700 border-slate-200'}`}>
                        {tenant.type === 'Group' ? '教育集团' : '独立校区'}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      tenant.plan === 'Enterprise' ? 'bg-purple-100 text-purple-700' :
                      tenant.plan === 'Pro' ? 'bg-blue-100 text-blue-700' :
                      'bg-slate-100 text-slate-700'
                    }`}>
                      {tenant.plan}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                     <div className="flex items-center">
                      {tenant.status === 'Active' ? (
                        <CheckCircle size={16} className="text-emerald-500 mr-1.5" />
                      ) : (
                        <XCircle size={16} className="text-slate-400 mr-1.5" />
                      )}
                      <span className={`text-sm ${tenant.status === 'Active' ? 'text-emerald-700' : 'text-slate-500'}`}>
                        {tenant.status === 'Active' ? '正常' : '停用'}
                      </span>
                     </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-600">
                    {tenant.studentCount.toLocaleString()} 人
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-600">
                    {tenant.renewalDate}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="text-slate-400 hover:text-slate-600">
                      <MoreHorizontal size={20} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filteredTenants.length === 0 && (
            <div className="p-12 text-center text-slate-500">
              未找到匹配的租户信息
            </div>
          )}
        </div>

        {/* Pagination */}
        <div className="border-t border-slate-200 px-6 py-4 flex items-center justify-between">
          <div className="text-sm text-slate-500">
            显示 <span className="font-medium">1</span> 到 <span className="font-medium">{filteredTenants.length}</span> 条，共 <span className="font-medium">124</span> 条
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
            <button className="px-3 py-1 hover:bg-slate-50 text-slate-600 border border-slate-200 rounded-lg text-sm font-medium">3</button>
            <span className="px-2 text-slate-400">...</span>
            <button className="px-3 py-1 hover:bg-slate-50 text-slate-600 border border-slate-200 rounded-lg text-sm font-medium">12</button>
            <button 
              className="p-2 border border-slate-200 rounded-lg hover:bg-slate-50"
              onClick={() => setCurrentPage(prev => prev + 1)}
            >
              <ChevronRight size={16} className="text-slate-600" />
            </button>
          </div>
        </div>
      </div>

      {/* Create Tenant Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4 animate-fade-in">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg overflow-hidden animate-scale-up">
            <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-slate-50">
              <h3 className="text-lg font-bold text-slate-900">新建租户 / New Tenant</h3>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 hover:bg-slate-200 p-1 rounded-full transition-colors"
              >
                <X size={20} />
              </button>
            </div>
            
            <form onSubmit={handleCreateTenant} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  <div className="flex items-center gap-1.5"><School size={16}/> 学校/机构名称</div>
                </label>
                <input 
                  type="text" 
                  required
                  placeholder="例如：北京第一实验中学"
                  className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500"
                  value={newTenant.name}
                  onChange={e => setNewTenant({...newTenant, name: e.target.value})}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                   <label className="block text-sm font-medium text-slate-700 mb-1">
                    租户类型
                  </label>
                  <select 
                    className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500 bg-white"
                    value={newTenant.type}
                    onChange={e => setNewTenant({...newTenant, type: e.target.value as any})}
                  >
                    <option value="School">独立校区</option>
                    <option value="Group">教育集团</option>
                  </select>
                </div>
                <div>
                   <label className="block text-sm font-medium text-slate-700 mb-1">
                    订阅方案
                  </label>
                  <select 
                    className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500 bg-white"
                    value={newTenant.plan}
                    onChange={e => setNewTenant({...newTenant, plan: e.target.value as any})}
                  >
                    <option value="Basic">Basic (基础版)</option>
                    <option value="Pro">Pro (专业版)</option>
                    <option value="Enterprise">Enterprise (企业版)</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                   <label className="block text-sm font-medium text-slate-700 mb-1">
                    <div className="flex items-center gap-1.5"><Users size={16}/> 预计学生数</div>
                  </label>
                  <input 
                    type="number" 
                    className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500"
                    value={newTenant.studentCount}
                    onChange={e => setNewTenant({...newTenant, studentCount: Number(e.target.value)})}
                  />
                </div>
                <div>
                   <label className="block text-sm font-medium text-slate-700 mb-1">
                    <div className="flex items-center gap-1.5"><Calendar size={16}/> 续费日期</div>
                  </label>
                  <input 
                    type="date" 
                    required
                    className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500 text-slate-600"
                    value={newTenant.renewalDate}
                    onChange={e => setNewTenant({...newTenant, renewalDate: e.target.value})}
                  />
                </div>
              </div>

               <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  <div className="flex items-center gap-1.5"><User size={16}/> 管理员姓名</div>
                </label>
                <input 
                  type="text" 
                  placeholder="请输入初始管理员姓名"
                  className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  <div className="flex items-center gap-1.5"><Mail size={16}/> 管理员邮箱</div>
                </label>
                <input 
                  type="email" 
                  placeholder="admin@school.com"
                  className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500"
                />
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
                  确认创建
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
