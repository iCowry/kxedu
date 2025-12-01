import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ChevronLeft, Users, Trophy, BookOpen, Calendar, Eye, Search, Mail, BookCheck, TrendingUp, AlertCircle, CheckCircle2 } from 'lucide-react';
import { SchoolClass, Student, SubjectTeacher, Award } from '../types';
import { ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Legend, Tooltip, LineChart, Line, XAxis, YAxis, CartesianGrid, BarChart, Bar } from 'recharts';

// --- MOCK DATA FOR CLASS DETAIL ---
const MOCK_CLASS_INFO: SchoolClass = { 
  id: 'C10-1', 
  name: 'Class 1 (重点班)', 
  gradeId: 'Grade 10', 
  homeroomTeacher: 'Sarah Chen', 
  room: 'Bldg A-101', 
  studentCount: 38, 
  capacity: 40,
  slogan: 'Pursue Excellence, Strive for Perfection' 
};

const MOCK_TEACHERS: SubjectTeacher[] = [
  { subject: 'Math', teacherName: 'Dr. Sarah Chen' },
  { subject: 'English', teacherName: 'Ms. Emily Zhang' },
  { subject: 'Physics', teacherName: 'Mr. Michael Brown' },
  { subject: 'History', teacherName: 'Mr. David Li' },
];

const MOCK_CLASS_STUDENTS: Student[] = [
    { id: '2023001', name: '张小明', grade: 'Grade 10', class: 'Class 1', gpa: 3.8, attendance: 98, status: 'Active' },
    { id: '2023002', name: '李华', grade: 'Grade 10', class: 'Class 1', gpa: 3.5, attendance: 95, status: 'Active' },
    { id: '2023006', name: 'Alice Guo', grade: 'Grade 10', class: 'Class 1', gpa: 3.9, attendance: 100, status: 'Active' },
    { id: '2023007', name: 'Bob Liu', grade: 'Grade 10', class: 'Class 1', gpa: 3.2, attendance: 90, status: 'Active' },
];

const MOCK_CLASS_AWARDS: Award[] = [
    { id: 'CA01', className: 'Class 1', competition: 'School Choir Contest', rank: 'Gold Medal', date: '2023-12-01', advisor: 'Ms. Zhang' },
    { id: 'CA02', className: 'Class 1', competition: 'Sports Meeting', rank: 'Total Score 1st', date: '2023-10-20', advisor: 'Mr. Wu' },
];

// --- NEW MOCK DATA FOR LEARNING TAB ---
const SUBJECT_RADAR_DATA = [
  { subject: '语文', classAvg: 115, gradeAvg: 110, fullMark: 150 },
  { subject: '数学', classAvg: 135, gradeAvg: 120, fullMark: 150 },
  { subject: '英语', classAvg: 128, gradeAvg: 115, fullMark: 150 },
  { subject: '物理', classAvg: 88, gradeAvg: 80, fullMark: 100 },
  { subject: '化学', classAvg: 92, gradeAvg: 85, fullMark: 100 },
  { subject: '生物', classAvg: 85, gradeAvg: 82, fullMark: 100 },
];

const EXAM_TREND_DATA = [
  { name: '月考 1', classAvg: 580, gradeAvg: 550 },
  { name: '期中', classAvg: 610, gradeAvg: 565 },
  { name: '月考 2', classAvg: 595, gradeAvg: 560 },
  { name: '期末模考', classAvg: 625, gradeAvg: 570 },
];

const RECENT_HOMEWORKS = [
    { id: 'h1', title: 'Math Ch.5 Derivatives', subject: 'Math', deadline: '2024-11-26', submitted: 35, total: 38, status: 'Grading' },
    { id: 'h2', title: 'English Essay Draft', subject: 'English', deadline: '2024-11-25', submitted: 38, total: 38, status: 'Completed' },
    { id: 'h3', title: 'Physics Lab Report', subject: 'Physics', deadline: '2024-11-24', submitted: 30, total: 38, status: 'Late' },
];

export const ClassDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState<'overview' | 'learning'>('overview');

  // Ideally fetch data based on ID.
  const classInfo = { ...MOCK_CLASS_INFO, id: id || 'Unknown' };

  return (
    <div className="p-8 space-y-6">
      {/* Breadcrumb / Back */}
      <div className="flex items-center gap-2 mb-4">
        <button onClick={() => navigate(-1)} className="p-2 hover:bg-slate-100 rounded-lg text-slate-500">
          <ChevronLeft size={20} />
        </button>
        <span className="text-slate-500">/ 组织架构 / 班级详情</span>
      </div>

      {/* Header Profile Card */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-brand-50 rounded-full -mr-16 -mt-16 opacity-50 pointer-events-none"></div>
        <div className="relative z-10 flex flex-col md:flex-row justify-between items-start">
            <div>
                <div className="flex items-center gap-3">
                    <h1 className="text-3xl font-bold text-slate-900">{classInfo.name}</h1>
                    <span className="bg-brand-100 text-brand-700 px-3 py-1 rounded-full text-sm font-medium">{classInfo.gradeId}</span>
                </div>
                <p className="text-slate-500 mt-2 italic">"{classInfo.slogan}"</p>
                <div className="flex items-center gap-6 mt-6">
                    <div className="flex items-center gap-2">
                         <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 font-bold">
                             {classInfo.homeroomTeacher.charAt(0)}
                         </div>
                         <div className="flex flex-col">
                             <span className="text-xs text-slate-500">班主任</span>
                             <span className="font-medium text-slate-900">{classInfo.homeroomTeacher}</span>
                         </div>
                    </div>
                     <div className="h-8 w-px bg-slate-200"></div>
                     <div className="flex flex-col">
                         <span className="text-xs text-slate-500">所在教室</span>
                         <span className="font-medium text-slate-900 flex items-center gap-1">
                             <Calendar size={14}/> {classInfo.room}
                         </span>
                     </div>
                     <div className="h-8 w-px bg-slate-200"></div>
                     <div className="flex flex-col">
                         <span className="text-xs text-slate-500">学生人数</span>
                         <span className="font-medium text-slate-900">{classInfo.studentCount} / {classInfo.capacity}</span>
                     </div>
                </div>
            </div>
            <div className="flex gap-2 mt-4 md:mt-0">
                <button className="px-4 py-2 border border-slate-200 bg-white rounded-lg hover:bg-slate-50 shadow-sm flex items-center gap-2">
                    <Mail size={16}/> 群发通知
                </button>
                <button className="px-4 py-2 bg-brand-600 text-white rounded-lg hover:bg-brand-700 shadow-sm flex items-center gap-2">
                    <Calendar size={16}/> 查看课表
                </button>
            </div>
        </div>
      </div>

       {/* Tabs */}
       <div className="border-b border-slate-200">
        <nav className="flex space-x-8">
          <button
            onClick={() => setActiveTab('overview')}
            className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors flex items-center gap-2 ${
              activeTab === 'overview'
                ? 'border-brand-600 text-brand-600'
                : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
            }`}
          >
            <Users size={18}/> 班级概况
          </button>
          <button
            onClick={() => setActiveTab('learning')}
            className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors flex items-center gap-2 ${
              activeTab === 'learning'
                ? 'border-brand-600 text-brand-600'
                : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
            }`}
          >
            <BookCheck size={18}/> 学情分析
          </button>
        </nav>
      </div>

      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Col: Teachers & Honors */}
            <div className="space-y-6">
                {/* Teachers */}
                <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
                    <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
                        <BookOpen size={18} className="text-brand-600"/> 任课教师团队
                    </h3>
                    <div className="space-y-3">
                        {MOCK_TEACHERS.map((t, idx) => (
                            <div key={idx} className="flex items-center justify-between p-3 rounded-lg hover:bg-slate-50 transition-colors">
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center text-xs text-slate-600 font-bold">
                                        {t.teacherName.charAt(0)}
                                    </div>
                                    <div>
                                        <p className="font-medium text-slate-900 text-sm">{t.teacherName}</p>
                                        <p className="text-xs text-slate-500">{t.subject}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                
                {/* Honors */}
                <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
                    <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
                        <Trophy size={18} className="text-amber-500"/> 班级荣誉
                    </h3>
                    <div className="space-y-4">
                        {MOCK_CLASS_AWARDS.map(award => (
                            <div key={award.id} className="flex gap-3">
                                <div className="mt-1"><Trophy size={14} className="text-amber-500"/></div>
                                <div>
                                    <p className="text-sm font-bold text-slate-800">{award.competition}</p>
                                    <p className="text-xs text-slate-500">{award.rank} • {award.date}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Right Col: Student Roster */}
            <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200 shadow-sm flex flex-col min-h-[500px]">
                <div className="p-4 border-b border-slate-200 flex justify-between items-center">
                    <h3 className="font-bold text-slate-800 flex items-center gap-2">
                        <Users size={18} className="text-brand-600"/> 学生花名册
                    </h3>
                    <div className="relative">
                        <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                        <input 
                            type="text" 
                            placeholder="搜索学生..." 
                            className="pl-8 pr-4 py-1.5 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-brand-500"
                            value={searchTerm}
                            onChange={e => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>
                <div className="flex-1 overflow-auto">
                    <table className="w-full text-left">
                        <thead className="bg-slate-50 text-slate-500 text-xs uppercase font-semibold sticky top-0">
                            <tr>
                                <th className="px-6 py-3">姓名 / 学号</th>
                                <th className="px-6 py-3">GPA</th>
                                <th className="px-6 py-3">出勤</th>
                                <th className="px-6 py-3 text-right">操作</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {MOCK_CLASS_STUDENTS.map(student => (
                                <tr key={student.id} className="hover:bg-slate-50 group">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-xs font-bold text-slate-500">
                                                {student.name.charAt(0)}
                                            </div>
                                            <div>
                                                <p className="font-medium text-slate-900 text-sm group-hover:text-brand-600 cursor-pointer" onClick={() => navigate(`/students/${student.id}`)}>{student.name}</p>
                                                <p className="text-xs text-slate-400">{student.id}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-sm font-medium text-slate-900">{student.gpa}</td>
                                    <td className="px-6 py-4">
                                        <span className={`text-xs px-2 py-1 rounded-full ${student.attendance >= 95 ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700'}`}>
                                            {student.attendance}%
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <button 
                                            onClick={() => navigate(`/students/${student.id}`)}
                                            className="p-1.5 text-slate-400 hover:text-brand-600 hover:bg-brand-50 rounded transition-colors"
                                            title="查看档案"
                                        >
                                            <Eye size={16}/>
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
      )}

      {activeTab === 'learning' && (
        <div className="space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
                    <div>
                        <p className="text-slate-500 text-sm font-medium">班级平均分 (Midterm)</p>
                        <h3 className="text-3xl font-bold text-slate-900 mt-1">610</h3>
                        <p className="text-xs text-emerald-600 font-medium mt-1">高于年级平均 45 分</p>
                    </div>
                    <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-lg flex items-center justify-center">
                        <TrendingUp size={20}/>
                    </div>
                </div>
                <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
                    <div>
                        <p className="text-slate-500 text-sm font-medium">作业平均提交率</p>
                        <h3 className="text-3xl font-bold text-emerald-600 mt-1">98.5%</h3>
                        <p className="text-xs text-slate-400 mt-1">全校排名 #1</p>
                    </div>
                    <div className="w-10 h-10 bg-emerald-50 text-emerald-600 rounded-lg flex items-center justify-center">
                        <CheckCircle2 size={20}/>
                    </div>
                </div>
                <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
                    <div>
                        <p className="text-slate-500 text-sm font-medium">学业预警学生</p>
                        <h3 className="text-3xl font-bold text-amber-500 mt-1">3 人</h3>
                        <p className="text-xs text-slate-400 mt-1">需重点关注</p>
                    </div>
                    <div className="w-10 h-10 bg-amber-50 text-amber-600 rounded-lg flex items-center justify-center">
                        <AlertCircle size={20}/>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                 {/* Subject Radar */}
                 <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                    <h3 className="font-bold text-slate-800 mb-2 flex items-center gap-2">
                        <BookOpen className="text-brand-600" size={18}/> 学科能力雷达 (vs 年级平均)
                    </h3>
                    <div className="h-72">
                        <ResponsiveContainer width="100%" height="100%">
                            <RadarChart cx="50%" cy="50%" outerRadius="80%" data={SUBJECT_RADAR_DATA}>
                                <PolarGrid stroke="#e2e8f0"/>
                                <PolarAngleAxis dataKey="subject" tick={{ fill: '#64748b', fontSize: 12 }} />
                                <PolarRadiusAxis angle={30} domain={[0, 150]} tick={false}/>
                                <Radar name="本班平均" dataKey="classAvg" stroke="#3b82f6" strokeWidth={2} fill="#3b82f6" fillOpacity={0.2} />
                                <Radar name="年级平均" dataKey="gradeAvg" stroke="#cbd5e1" strokeWidth={2} fill="#cbd5e1" fillOpacity={0.1} />
                                <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}/>
                                <Legend />
                            </RadarChart>
                        </ResponsiveContainer>
                    </div>
                 </div>

                 {/* Exam Trend */}
                 <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                    <h3 className="font-bold text-slate-800 mb-2 flex items-center gap-2">
                        <TrendingUp className="text-emerald-600" size={18}/> 考试总分趋势
                    </h3>
                    <div className="h-72">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={EXAM_TREND_DATA}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748b'}} />
                                <YAxis domain={[500, 700]} axisLine={false} tickLine={false} tick={{fill: '#64748b'}} />
                                <Tooltip contentStyle={{ borderRadius: '8px' }}/>
                                <Legend />
                                <Line type="monotone" dataKey="classAvg" stroke="#3b82f6" strokeWidth={3} dot={{r: 4}} name="本班平均" />
                                <Line type="monotone" dataKey="gradeAvg" stroke="#cbd5e1" strokeWidth={2} strokeDasharray="5 5" name="年级平均" />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                 </div>
            </div>

            {/* Recent Homeworks */}
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="p-4 border-b border-slate-200 bg-slate-50/50">
                    <h3 className="font-bold text-slate-800">近期作业与测验</h3>
                </div>
                <table className="w-full text-left">
                    <thead className="bg-slate-50 text-slate-500 text-xs uppercase font-semibold">
                        <tr>
                            <th className="px-6 py-4">作业标题</th>
                            <th className="px-6 py-4">学科</th>
                            <th className="px-6 py-4">截止日期</th>
                            <th className="px-6 py-4">提交进度</th>
                            <th className="px-6 py-4">状态</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {RECENT_HOMEWORKS.map((hw, idx) => (
                            <tr key={idx} className="hover:bg-slate-50">
                                <td className="px-6 py-4 font-medium text-slate-900">{hw.title}</td>
                                <td className="px-6 py-4 text-sm text-slate-600">{hw.subject}</td>
                                <td className="px-6 py-4 text-sm text-slate-600">{hw.deadline}</td>
                                <td className="px-6 py-4">
                                     <div className="flex items-center gap-3">
                                        <div className="flex-1 w-24 bg-slate-100 rounded-full h-1.5">
                                            <div 
                                                className={`h-1.5 rounded-full ${
                                                    (hw.submitted / hw.total) < 0.8 ? 'bg-red-500' : 'bg-emerald-500'
                                                }`} 
                                                style={{ width: `${(hw.submitted / hw.total) * 100}%` }}
                                            ></div>
                                        </div>
                                        <span className="text-xs text-slate-500">{hw.submitted}/{hw.total}</span>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
                                        hw.status === 'Completed' ? 'bg-emerald-50 text-emerald-700' : 
                                        hw.status === 'Late' ? 'bg-red-50 text-red-700' : 'bg-blue-50 text-blue-700'
                                    }`}>
                                        {hw.status}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
      )}
    </div>
  );
};