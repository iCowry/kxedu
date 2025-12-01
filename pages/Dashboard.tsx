
import React from 'react';
import { Users, Building2, BookOpen, DollarSign, TrendingUp, Calendar, CheckCircle2, Clock, AlertCircle, FileText, Target, Award, MessageCircle } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import { CurrentUser } from '../types';

// --- SHARED MOCK DATA ---
const ENROLLMENT_DATA = [
  { name: 'Jan', students: 4000 }, { name: 'Feb', students: 3000 }, { name: 'Mar', students: 2000 },
  { name: 'Apr', students: 2780 }, { name: 'May', students: 1890 }, { name: 'Jun', students: 2390 },
  { name: 'Jul', students: 3490 },
];

const TEACHER_SCHEDULE = [
    { id: 1, time: '08:00 - 08:45', class: 'Class 1 (G10)', subject: 'Mathematics', room: 'A-101' },
    { id: 2, time: '09:00 - 09:45', class: 'Class 2 (G10)', subject: 'Mathematics', room: 'A-102' },
    { id: 3, time: '10:30 - 11:15', class: 'Office Hour', subject: 'Tutoring', room: 'Office 302' },
    { id: 4, time: '14:00 - 14:45', class: 'Class 1 (G11)', subject: 'Advanced Math', room: 'B-201' },
];

const STUDENT_TASKS = [
    { id: 1, title: 'Calculus Homework Ch.3', subject: 'Math', due: 'Today 23:59', status: 'Pending' },
    { id: 2, title: 'English Essay Draft', subject: 'English', due: 'Tomorrow 12:00', status: 'In Progress' },
    { id: 3, title: 'Physics Lab Prep', subject: 'Physics', due: 'Wed 08:00', status: 'Done' },
];

interface DashboardProps {
    currentUser: CurrentUser;
}

// --- SUB-DASHBOARDS ---

const AdminDashboard = () => (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
            { label: '总租户数量', value: '124', change: '+12%', icon: Building2, color: 'bg-blue-500' },
            { label: '活跃学生', value: '45,231', change: '+5.4%', icon: Users, color: 'bg-emerald-500' },
            { label: '今日课程数', value: '1,203', change: '+0.8%', icon: BookOpen, color: 'bg-amber-500' },
            { label: '本月营收 (CNY)', value: '¥2.4M', change: '+15.2%', icon: DollarSign, color: 'bg-purple-500' },
        ].map((stat, index) => (
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
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <h3 className="text-lg font-bold text-slate-900 mb-6">平台学生增长趋势</h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={ENROLLMENT_DATA}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748b'}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b'}} />
                <Tooltip contentStyle={{ borderRadius: '8px' }}/>
                <Line type="monotone" dataKey="students" stroke="#3b82f6" strokeWidth={3} dot={{r: 4}} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-center items-center text-center">
            <div className="p-4 bg-purple-50 rounded-full mb-4">
                <Building2 size={48} className="text-purple-600"/>
            </div>
            <h3 className="text-xl font-bold text-slate-900">平台运营中心</h3>
            <p className="text-slate-500 max-w-sm mt-2">作为超级管理员，您可以管理租户订阅、配置全局系统参数以及查看全平台的财务报表。</p>
            <div className="mt-6 flex gap-3">
                <button className="px-4 py-2 bg-slate-900 text-white rounded-lg hover:bg-slate-800 text-sm">管理租户</button>
                <button className="px-4 py-2 border border-slate-200 rounded-lg hover:bg-slate-50 text-sm">系统设置</button>
            </div>
        </div>
      </div>
    </>
);

const TeacherDashboard = ({ name }: { name: string }) => (
    <>
       <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
           {/* Schedule */}
           <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200 shadow-sm p-6">
               <div className="flex justify-between items-center mb-6">
                   <h3 className="font-bold text-lg text-slate-800 flex items-center gap-2">
                       <Calendar size={20} className="text-brand-600"/> 今日课表
                   </h3>
                   <span className="text-sm text-slate-500">{new Date().toDateString()}</span>
               </div>
               <div className="space-y-4">
                   {TEACHER_SCHEDULE.map(item => (
                       <div key={item.id} className="flex items-center p-4 bg-slate-50 rounded-xl border border-slate-100 hover:border-brand-200 transition-colors">
                           <div className="w-24 font-bold text-slate-700 text-sm">{item.time}</div>
                           <div className="w-1 h-8 bg-brand-500 rounded-full mx-4"></div>
                           <div className="flex-1">
                               <h4 className="font-bold text-slate-900">{item.subject}</h4>
                               <p className="text-xs text-slate-500">{item.class} · {item.room}</p>
                           </div>
                           <button className="px-3 py-1 text-xs border border-brand-200 text-brand-700 rounded bg-white hover:bg-brand-50">
                               进入课堂
                           </button>
                       </div>
                   ))}
               </div>
           </div>

           {/* Quick Stats */}
           <div className="space-y-6">
               <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
                   <h3 className="font-bold text-slate-800 mb-4">待办事项</h3>
                   <div className="space-y-3">
                       <div className="flex justify-between items-center text-sm">
                           <span className="flex items-center gap-2 text-slate-600"><FileText size={16}/> 待批改作业</span>
                           <span className="bg-red-100 text-red-700 px-2 py-0.5 rounded-full text-xs font-bold">12</span>
                       </div>
                       <div className="flex justify-between items-center text-sm">
                           <span className="flex items-center gap-2 text-slate-600"><MessageCircle size={16}/> 家长留言</span>
                           <span className="bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full text-xs font-bold">3</span>
                       </div>
                       <div className="flex justify-between items-center text-sm">
                           <span className="flex items-center gap-2 text-slate-600"><Calendar size={16}/> 备课进度</span>
                           <span className="text-slate-400">进行中</span>
                       </div>
                   </div>
                   <button className="w-full mt-4 py-2 bg-brand-50 text-brand-700 rounded-lg text-sm font-medium hover:bg-brand-100">
                       查看所有任务
                   </button>
               </div>

               <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl p-6 text-white shadow-lg">
                   <h4 className="font-bold text-lg mb-1">班级出勤率</h4>
                   <p className="text-3xl font-bold">98.5%</p>
                   <p className="text-xs text-indigo-100 mt-2">Class 1 本周表现优异</p>
               </div>
           </div>
       </div>
    </>
);

const StudentDashboard = ({ name }: { name: string }) => (
    <>
       <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
           <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
               <p className="text-slate-500 text-xs uppercase font-bold tracking-wider">GPA</p>
               <h3 className="text-3xl font-bold text-slate-900 mt-1">3.8</h3>
               <p className="text-xs text-emerald-600 mt-1">Top 10%</p>
           </div>
           <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
               <p className="text-slate-500 text-xs uppercase font-bold tracking-wider">作业完成</p>
               <h3 className="text-3xl font-bold text-brand-600 mt-1">95%</h3>
               <p className="text-xs text-slate-400 mt-1">本学期</p>
           </div>
           <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
               <p className="text-slate-500 text-xs uppercase font-bold tracking-wider">荣誉奖项</p>
               <h3 className="text-3xl font-bold text-amber-500 mt-1">2</h3>
               <p className="text-xs text-slate-400 mt-1">金牌 x1, 银牌 x1</p>
           </div>
           <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
               <p className="text-slate-500 text-xs uppercase font-bold tracking-wider">下次考试</p>
               <h3 className="text-xl font-bold text-slate-900 mt-2">11月20日</h3>
               <p className="text-xs text-red-500 mt-1">期中考试 (Math)</p>
           </div>
       </div>

       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
           {/* Task List */}
           <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
               <h3 className="font-bold text-lg text-slate-800 mb-4 flex items-center gap-2">
                   <Target size={20} className="text-red-500"/> 待办作业
               </h3>
               <div className="space-y-3">
                   {STUDENT_TASKS.map(task => (
                       <div key={task.id} className="flex items-center justify-between p-3 border border-slate-100 rounded-lg hover:bg-slate-50">
                           <div className="flex items-center gap-3">
                               <div className={`w-2 h-2 rounded-full ${task.status === 'Pending' ? 'bg-red-500' : task.status === 'In Progress' ? 'bg-amber-500' : 'bg-emerald-500'}`}></div>
                               <div>
                                   <p className="text-sm font-bold text-slate-900">{task.title}</p>
                                   <p className="text-xs text-slate-500">{task.subject} • Due: {task.due}</p>
                               </div>
                           </div>
                           <button className="text-xs px-3 py-1.5 bg-brand-600 text-white rounded hover:bg-brand-700">
                               去提交
                           </button>
                       </div>
                   ))}
               </div>
           </div>

           {/* Schedule / Banner */}
           <div className="space-y-6">
               <div className="bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl p-6 text-white shadow-lg">
                   <h3 className="text-xl font-bold mb-2">Hello, {name}!</h3>
                   <p className="opacity-90 text-sm mb-4">今天有 4 节课，第一节数学课将在 08:00 开始，请不要迟到。</p>
                   <button className="bg-white text-blue-600 px-4 py-2 rounded-lg text-sm font-bold shadow-sm hover:bg-blue-50">
                       查看完整课表
                   </button>
               </div>
               
               <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 flex items-center justify-between">
                   <div>
                       <h4 className="font-bold text-slate-800">错题本更新</h4>
                       <p className="text-xs text-slate-500 mt-1">数学科目新增 3 道错题</p>
                   </div>
                   <button className="p-3 bg-amber-50 text-amber-600 rounded-lg hover:bg-amber-100">
                       <FileText size={20}/>
                   </button>
               </div>
           </div>
       </div>
    </>
);

export const Dashboard: React.FC<DashboardProps> = ({ currentUser }) => {
  
  const getRoleDisplayName = (role: string) => {
      switch(role) {
          case 'SuperAdmin': return '超级管理员';
          case 'TenantAdmin': return '校级管理员';
          case 'AcademicDirector': return '教务主任';
          case 'HomeroomTeacher': return '班主任';
          case 'SubjectTeacher': return '教师';
          case 'Student': return '学生';
          case 'Parent': return '家长';
          default: return '用户';
      }
  };

  return (
    <div className="p-8 space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">工作台 Dashboard</h1>
        <p className="text-slate-500 mt-1">
            欢迎回来，{currentUser.name} 
            <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-brand-100 text-brand-800">
                {getRoleDisplayName(currentUser.role)}
            </span>
        </p>
      </div>

      {/* RENDER ROLE SPECIFIC CONTENT */}
      {currentUser.role === 'SuperAdmin' || currentUser.role === 'TenantAdmin' ? (
          <AdminDashboard />
      ) : currentUser.role === 'Student' || currentUser.role === 'Parent' ? (
          <StudentDashboard name={currentUser.name} />
      ) : (
          <TeacherDashboard name={currentUser.name} />
      )}

    </div>
  );
};
