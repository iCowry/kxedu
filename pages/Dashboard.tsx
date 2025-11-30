import React from 'react';
import { Users, Building2, BookOpen, DollarSign, TrendingUp, ArrowUpRight } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';

const stats = [
  { label: '总租户数量', value: '124', change: '+12%', icon: Building2, color: 'bg-blue-500' },
  { label: '活跃学生', value: '45,231', change: '+5.4%', icon: Users, color: 'bg-emerald-500' },
  { label: '今日课程数', value: '1,203', change: '+0.8%', icon: BookOpen, color: 'bg-amber-500' },
  { label: '本月营收 (CNY)', value: '¥2.4M', change: '+15.2%', icon: DollarSign, color: 'bg-purple-500' },
];

const enrollmentData = [
  { name: 'Jan', students: 4000 },
  { name: 'Feb', students: 3000 },
  { name: 'Mar', students: 2000 },
  { name: 'Apr', students: 2780 },
  { name: 'May', students: 1890 },
  { name: 'Jun', students: 2390 },
  { name: 'Jul', students: 3490 },
];

const revenueData = [
  { name: 'Mon', value: 4000 },
  { name: 'Tue', value: 3000 },
  { name: 'Wed', value: 2000 },
  { name: 'Thu', value: 2780 },
  { name: 'Fri', value: 1890 },
  { name: 'Sat', value: 2390 },
  { name: 'Sun', value: 3490 },
];

export const Dashboard: React.FC = () => {
  return (
    <div className="p-8 space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">平台概览 Dashboard</h1>
        <p className="text-slate-500 mt-1">欢迎回来，查看科昕智慧教育平台的实时数据。</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-between">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-slate-500">{stat.label}</p>
                <h3 className="text-2xl font-bold text-slate-900 mt-2">{stat.value}</h3>
              </div>
              <div className={`p-3 rounded-lg text-white ${stat.color}`}>
                <stat.icon size={20} />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm">
              <span className="text-emerald-600 font-medium flex items-center">
                <TrendingUp size={14} className="mr-1" />
                {stat.change}
              </span>
              <span className="text-slate-400 ml-2">vs 上月</span>
            </div>
          </div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Enrollment Chart */}
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-bold text-slate-900">学生增长趋势</h3>
            <button className="text-sm text-brand-600 font-medium hover:text-brand-700">查看详情</button>
          </div>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={enrollmentData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#fff', borderRadius: '8px', border: '1px solid #e2e8f0' }}
                />
                <Line type="monotone" dataKey="students" stroke="#3b82f6" strokeWidth={3} dot={{r: 4, fill: '#3b82f6', strokeWidth: 2, stroke: '#fff'}} activeDot={{r: 6}} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Revenue Chart */}
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-bold text-slate-900">周营收统计</h3>
            <button className="text-sm text-brand-600 font-medium hover:text-brand-700">下载报表</button>
          </div>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} />
                <Tooltip 
                  cursor={{fill: '#f1f5f9'}}
                  contentStyle={{ backgroundColor: '#fff', borderRadius: '8px', border: '1px solid #e2e8f0' }}
                />
                <Bar dataKey="value" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
        <h3 className="text-lg font-bold text-slate-900 mb-4">快捷操作</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <button className="p-4 border border-slate-200 rounded-lg hover:bg-slate-50 hover:border-brand-300 transition-all text-left group">
            <div className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center text-blue-600 mb-3 group-hover:bg-blue-100">
              <Building2 size={20} />
            </div>
            <p className="font-medium text-slate-900">新增租户</p>
            <p className="text-xs text-slate-500 mt-1">创建新的学校账号</p>
          </button>
          <button className="p-4 border border-slate-200 rounded-lg hover:bg-slate-50 hover:border-brand-300 transition-all text-left group">
            <div className="w-10 h-10 bg-emerald-50 rounded-full flex items-center justify-center text-emerald-600 mb-3 group-hover:bg-emerald-100">
              <Users size={20} />
            </div>
            <p className="font-medium text-slate-900">批量导入学生</p>
            <p className="text-xs text-slate-500 mt-1">Excel 数据上传</p>
          </button>
          <button className="p-4 border border-slate-200 rounded-lg hover:bg-slate-50 hover:border-brand-300 transition-all text-left group">
             <div className="w-10 h-10 bg-amber-50 rounded-full flex items-center justify-center text-amber-600 mb-3 group-hover:bg-amber-100">
              <BookOpen size={20} />
            </div>
            <p className="font-medium text-slate-900">排课管理</p>
            <p className="text-xs text-slate-500 mt-1">智能排课系统</p>
          </button>
          <button className="p-4 border border-slate-200 rounded-lg hover:bg-slate-50 hover:border-brand-300 transition-all text-left group">
             <div className="w-10 h-10 bg-purple-50 rounded-full flex items-center justify-center text-purple-600 mb-3 group-hover:bg-purple-100">
              <ArrowUpRight size={20} />
            </div>
            <p className="font-medium text-slate-900">升学分析报告</p>
            <p className="text-xs text-slate-500 mt-1">生成年度报表</p>
          </button>
        </div>
      </div>
    </div>
  );
};
