import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ChevronLeft, Users, Trophy, BookOpen, GraduationCap, Calendar, Eye, Search, Mail } from 'lucide-react';
import { SchoolClass, Student, SubjectTeacher, Award } from '../types';

// --- MOCK DATA FOR CLASS DETAIL ---
const MOCK_CLASS_INFO: SchoolClass = { 
  id: 'C10-1', 
  name: 'Class 1 (重点班)', 
  gradeId: 'G10', 
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

export const ClassDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');

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
    </div>
  );
};