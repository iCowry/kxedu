import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  ChevronLeft, User, MapPin, Phone, Mail, GraduationCap, 
  Calendar, Award, Activity, Clock, FileText, Download 
} from 'lucide-react';
import { Student, LeaveRecord, Award as AwardType } from '../types';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';

// --- MOCK DATA FOR DETAIL VIEW ---
const MOCK_STUDENT_DET: Student = {
  id: '2023001',
  name: '张小明',
  grade: 'Grade 10',
  class: 'Class 1',
  gpa: 3.8,
  attendance: 98,
  status: 'Active',
  gender: 'Male',
  dob: '2008-05-15',
  address: 'No. 123, Education Road, Haidian District',
  parentContact: '139-8888-9999 (Mother)',
  avatar: 'Z'
};

const MOCK_LEAVE_RECORDS: LeaveRecord[] = [
  { id: 'L001', type: 'Sick', startDate: '2023-10-10', endDate: '2023-10-12', reason: 'Flu', status: 'Approved' },
  { id: 'L002', type: 'Personal', startDate: '2023-11-05', endDate: '2023-11-05', reason: 'Family Event', status: 'Approved' },
];

const MOCK_AWARDS: AwardType[] = [
  { id: 'A001', competition: 'Math Olympiad', rank: 'First Prize', date: '2023-09-15', advisor: 'Mr. Wang' },
  { id: 'A002', competition: 'Science Fair', rank: 'Best Innovation', date: '2023-06-20', advisor: 'Ms. Li' },
];

const GRADE_TREND_DATA = [
  { term: 'Mid-term 1', score: 85 },
  { term: 'Final 1', score: 88 },
  { term: 'Mid-term 2', score: 92 },
  { term: 'Final 2', score: 90 },
];

const ABILITY_RADAR_DATA = [
  { subject: 'Chinese', A: 120, fullMark: 150 },
  { subject: 'Math', A: 140, fullMark: 150 },
  { subject: 'English', A: 130, fullMark: 150 },
  { subject: 'Physics', A: 95, fullMark: 100 },
  { subject: 'Chem', A: 88, fullMark: 100 },
  { subject: 'Bio', A: 92, fullMark: 100 },
];

export const StudentDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'overview' | 'academic' | 'records'>('overview');

  // Ideally fetch data based on ID. Using Mock for now.
  const student = { ...MOCK_STUDENT_DET, id: id || 'Unknown' };

  return (
    <div className="p-8 space-y-6">
      {/* Breadcrumb / Back */}
      <div className="flex items-center gap-2 mb-4">
        <button onClick={() => navigate(-1)} className="p-2 hover:bg-slate-100 rounded-lg text-slate-500">
          <ChevronLeft size={20} />
        </button>
        <span className="text-slate-500">/ 学生管理 / 学生详情</span>
      </div>

      {/* Header Profile Card */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
        <div className="flex flex-col md:flex-row gap-6 items-start">
          <div className="w-24 h-24 rounded-full bg-slate-100 flex items-center justify-center text-3xl font-bold text-slate-500">
            {student.avatar || student.name.charAt(0)}
          </div>
          <div className="flex-1">
            <div className="flex justify-between items-start">
              <div>
                <h1 className="text-2xl font-bold text-slate-900">{student.name}</h1>
                <p className="text-slate-500 mt-1 flex items-center gap-2">
                  <span className="bg-slate-100 text-slate-600 px-2 py-0.5 rounded text-xs font-mono">ID: {student.id}</span>
                  <span>•</span>
                  <span>{student.gender === 'Male' ? '男' : '女'}</span>
                  <span>•</span>
                  <span>{student.dob}</span>
                </p>
              </div>
              <div className="flex gap-2">
                <button className="px-4 py-2 border border-slate-200 text-slate-700 rounded-lg hover:bg-slate-50 text-sm font-medium">
                  编辑档案
                </button>
                <button className="px-4 py-2 bg-brand-600 text-white rounded-lg hover:bg-brand-700 text-sm font-medium">
                  导出画像
                </button>
              </div>
            </div>
            
            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="flex items-center gap-3 text-sm text-slate-600">
                <GraduationCap size={16} className="text-brand-500"/>
                <div className="flex flex-col">
                  <span className="text-xs text-slate-400">班级</span>
                  <button 
                    onClick={() => navigate('/organization/class/C10-1')} // Mock Link
                    className="font-medium hover:text-brand-600 text-left"
                  >
                    {student.grade} - {student.class}
                  </button>
                </div>
              </div>
              <div className="flex items-center gap-3 text-sm text-slate-600">
                <Phone size={16} className="text-brand-500"/>
                <div className="flex flex-col">
                  <span className="text-xs text-slate-400">紧急联系人</span>
                  <span className="font-medium">{student.parentContact}</span>
                </div>
              </div>
              <div className="flex items-center gap-3 text-sm text-slate-600">
                <MapPin size={16} className="text-brand-500"/>
                <div className="flex flex-col">
                   <span className="text-xs text-slate-400">家庭住址</span>
                   <span className="font-medium truncate max-w-[200px]" title={student.address}>{student.address}</span>
                </div>
              </div>
              <div className="flex items-center gap-3 text-sm text-slate-600">
                <Activity size={16} className="text-emerald-500"/>
                <div className="flex flex-col">
                   <span className="text-xs text-slate-400">在校状态</span>
                   <span className="font-medium text-emerald-600">{student.status}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="border-b border-slate-200">
        <nav className="flex space-x-8">
          {(['overview', 'academic', 'records'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === tab
                  ? 'border-brand-600 text-brand-600'
                  : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
              }`}
            >
              {tab === 'overview' && '综合概览 Overview'}
              {tab === 'academic' && '学情分析 Academic'}
              {tab === 'records' && '档案记录 Records'}
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      <div className="min-h-[400px]">
        
        {/* TAB: OVERVIEW */}
        {activeTab === 'overview' && (
           <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Stats Cards */}
              <div className="lg:col-span-2 grid grid-cols-3 gap-6">
                 <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm text-center">
                    <p className="text-slate-500 text-sm mb-2">GPA</p>
                    <h3 className="text-4xl font-bold text-slate-900">{student.gpa}</h3>
                    <p className="text-xs text-emerald-500 mt-2">Rank: Top 5%</p>
                 </div>
                 <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm text-center">
                    <p className="text-slate-500 text-sm mb-2">出勤率</p>
                    <h3 className="text-4xl font-bold text-slate-900">{student.attendance}%</h3>
                    <p className="text-xs text-slate-400 mt-2">缺勤 2 天</p>
                 </div>
                 <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm text-center">
                    <p className="text-slate-500 text-sm mb-2">荣誉奖项</p>
                    <h3 className="text-4xl font-bold text-amber-500">{MOCK_AWARDS.length}</h3>
                    <p className="text-xs text-slate-400 mt-2">本学年</p>
                 </div>

                 {/* Ability Chart */}
                 <div className="col-span-3 bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                    <h3 className="font-bold text-slate-800 mb-4">综合能力模型</h3>
                    <div className="h-64 w-full">
                       <ResponsiveContainer width="100%" height="100%">
                          <RadarChart cx="50%" cy="50%" outerRadius="80%" data={ABILITY_RADAR_DATA}>
                            <PolarGrid />
                            <PolarAngleAxis dataKey="subject" tick={{ fill: '#64748b', fontSize: 12 }} />
                            <PolarRadiusAxis angle={30} domain={[0, 150]} tick={false}/>
                            <Radar name="Student" dataKey="A" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.3} />
                            <Tooltip />
                          </RadarChart>
                       </ResponsiveContainer>
                    </div>
                 </div>
              </div>

              {/* Honors Wall */}
              <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                 <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
                    <Award className="text-amber-500" size={20}/> 荣誉墙
                 </h3>
                 <div className="space-y-4">
                    {MOCK_AWARDS.map(award => (
                      <div key={award.id} className="p-4 bg-amber-50 rounded-lg border border-amber-100">
                         <h4 className="font-bold text-amber-900 text-sm">{award.competition}</h4>
                         <div className="flex justify-between items-center mt-2">
                            <span className="text-xs font-bold text-amber-600 bg-white px-2 py-1 rounded-full shadow-sm">{award.rank}</span>
                            <span className="text-xs text-amber-700/60">{award.date}</span>
                         </div>
                      </div>
                    ))}
                 </div>
              </div>
           </div>
        )}

        {/* TAB: ACADEMIC */}
        {activeTab === 'academic' && (
           <div className="space-y-6">
              <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                 <h3 className="font-bold text-slate-800 mb-6">成绩趋势跟踪</h3>
                 <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                       <LineChart data={GRADE_TREND_DATA}>
                          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                          <XAxis dataKey="term" axisLine={false} tickLine={false} tick={{fill: '#64748b'}} />
                          <YAxis domain={[0, 100]} axisLine={false} tickLine={false} tick={{fill: '#64748b'}} />
                          <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}/>
                          <Line type="monotone" dataKey="score" stroke="#3b82f6" strokeWidth={3} dot={{r: 4, fill: '#3b82f6', strokeWidth: 2, stroke: '#fff'}} />
                       </LineChart>
                    </ResponsiveContainer>
                 </div>
              </div>
           </div>
        )}

        {/* TAB: RECORDS */}
        {activeTab === 'records' && (
           <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
              <div className="p-4 border-b border-slate-200 bg-slate-50/50 flex justify-between items-center">
                  <h3 className="font-bold text-slate-800">请假与考勤记录</h3>
                  <button className="text-sm text-brand-600 hover:text-brand-700 font-medium flex items-center gap-1">
                     <Download size={14}/> 导出记录
                  </button>
              </div>
              <table className="w-full text-left">
                 <thead className="bg-slate-50 text-slate-500 text-xs uppercase font-semibold">
                    <tr>
                       <th className="px-6 py-4">类型</th>
                       <th className="px-6 py-4">起止时间</th>
                       <th className="px-6 py-4">天数</th>
                       <th className="px-6 py-4">原因</th>
                       <th className="px-6 py-4">状态</th>
                    </tr>
                 </thead>
                 <tbody className="divide-y divide-slate-100">
                    {MOCK_LEAVE_RECORDS.map(record => (
                       <tr key={record.id} className="hover:bg-slate-50">
                          <td className="px-6 py-4">
                             <span className={`inline-block px-2 py-1 rounded text-xs font-medium ${
                                record.type === 'Sick' ? 'bg-red-50 text-red-700' : 'bg-blue-50 text-blue-700'
                             }`}>
                                {record.type === 'Sick' ? '病假' : '事假'}
                             </span>
                          </td>
                          <td className="px-6 py-4 text-sm text-slate-600">
                             {record.startDate} 至 {record.endDate}
                          </td>
                          <td className="px-6 py-4 text-sm text-slate-900 font-medium">
                             {/* Mock calculation */}
                             {record.startDate === record.endDate ? 1 : 3} 天
                          </td>
                          <td className="px-6 py-4 text-sm text-slate-600 max-w-xs truncate">
                             {record.reason}
                          </td>
                          <td className="px-6 py-4">
                             <span className="inline-flex items-center text-xs font-medium text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full">
                                {record.status}
                             </span>
                          </td>
                       </tr>
                    ))}
                 </tbody>
              </table>
           </div>
        )}
      </div>
    </div>
  );
};