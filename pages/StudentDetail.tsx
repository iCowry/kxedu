import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  ChevronLeft, User, MapPin, Phone, Mail, GraduationCap, 
  Calendar, Award, Activity, Clock, FileText, Download, Edit2, X, Save, FileJson, 
  Target, TrendingUp, BookOpen, MessageSquare, Star, Zap, AlertCircle
} from 'lucide-react';
import { Student, LeaveRecord, Award as AwardType, StudentCourse, TimelineEvent, TeacherComment } from '../types';
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
  avatar: 'Z',
  tags: ['数学课代表', '机器人社团', '全勤标兵'],
  targetUniversities: [
    { name: '清华大学', probability: 45 },
    { name: '浙江大学', probability: 75 },
    { name: '北京航空航天大学', probability: 85 }
  ]
};

const MOCK_COURSES: StudentCourse[] = [
    { id: 'C1', name: '高等数学 (Math)', teacher: 'Dr. Chen', currentScore: 95, classAverage: 82, rank: 3, trend: 'up' },
    { id: 'C2', name: '大学英语 (English)', teacher: 'Ms. Zhang', currentScore: 88, classAverage: 85, rank: 12, trend: 'stable' },
    { id: 'C3', name: '物理 (Physics)', teacher: 'Mr. Brown', currentScore: 92, classAverage: 78, rank: 5, trend: 'up' },
    { id: 'C4', name: '化学 (Chemistry)', teacher: 'Ms. Liu', currentScore: 85, classAverage: 84, rank: 18, trend: 'down' },
    { id: 'C5', name: '计算机科学 (CS)', teacher: 'Mr. Li', currentScore: 98, classAverage: 80, rank: 1, trend: 'up' },
];

const MOCK_TIMELINE: TimelineEvent[] = [
    { id: 'T1', title: '提交物理作业', timestamp: '2小时前', type: 'Academic', description: '《力学与运动》第三章习题' },
    { id: 'T2', title: '获得"全勤标兵"称号', timestamp: '1天前', type: 'Award' },
    { id: 'T3', title: '图书馆借阅', timestamp: '3天前', type: 'Activity', description: '借阅了《三体II：黑暗森林》' },
    { id: 'T4', title: '英语测验', timestamp: '1周前', type: 'Academic', description: '得分: 88/100' },
    { id: 'T5', title: '迟到记录', timestamp: '2周前', type: 'Behavior', description: '早读迟到 5 分钟' },
];

const MOCK_COMMENTS: TeacherComment[] = [
    { id: 'CM1', teacher: 'Dr. Chen', subject: 'Math', date: '2024-11-20', content: '张同学逻辑思维非常严密，在立体几何方面展现出极高的天赋。建议多参加竞赛训练。', tags: ['天赋异禀', '逻辑强'] },
    { id: 'CM2', teacher: 'Ms. Zhang', subject: 'English', date: '2024-11-15', content: '口语表达流利，但在写作细节上还需注意语法规范。课堂互动很积极。', tags: ['积极', '需细心'] },
];

const MOCK_LEAVE_RECORDS: LeaveRecord[] = [
  { id: 'L001', type: 'Sick', startDate: '2023-10-10', endDate: '2023-10-12', reason: 'Flu', status: 'Approved' },
  { id: 'L002', type: 'Personal', startDate: '2023-11-05', endDate: '2023-11-05', reason: 'Family Event', status: 'Approved' },
];

const MOCK_AWARDS: AwardType[] = [
  { id: 'A001', competition: 'Math Olympiad', rank: 'First Prize', date: '2023-09-15', advisor: 'Mr. Wang' },
  { id: 'A002', competition: 'Science Fair', rank: 'Best Innovation', date: '2023-06-20', advisor: 'Ms. Li' },
];

const GRADE_TREND_DATA = [
  { term: 'Mid-term 1', score: 85, avg: 80 },
  { term: 'Final 1', score: 88, avg: 81 },
  { term: 'Mid-term 2', score: 92, avg: 83 },
  { term: 'Final 2', score: 90, avg: 82 },
];

const ABILITY_RADAR_DATA = [
  { subject: '语文', A: 120, fullMark: 150 },
  { subject: '数学', A: 140, fullMark: 150 },
  { subject: '英语', A: 130, fullMark: 150 },
  { subject: '物理', A: 95, fullMark: 100 },
  { subject: '化学', A: 88, fullMark: 100 },
  { subject: '生物', A: 92, fullMark: 100 },
];

export const StudentDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'overview' | 'academic' | 'records'>('overview');

  // --- STATE MANAGEMENT ---
  const [student, setStudent] = useState<Student>({ ...MOCK_STUDENT_DET, id: id || 'Unknown' });
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editForm, setEditForm] = useState<Partial<Student>>({});

  // --- HANDLERS ---
  const handleEditClick = () => {
    setEditForm({ ...student });
    setIsEditModalOpen(true);
  };

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    setStudent(prev => ({ ...prev, ...editForm }));
    setIsEditModalOpen(false);
  };

  const handleExportPortrait = () => {
    const portraitData = {
        profile: student,
        courses: MOCK_COURSES,
        stats: {
            awardsCount: MOCK_AWARDS.length,
            leaveRecordsCount: MOCK_LEAVE_RECORDS.length,
            abilityModel: ABILITY_RADAR_DATA,
            gradeTrend: GRADE_TREND_DATA
        },
        timeline: MOCK_TIMELINE,
        comments: MOCK_COMMENTS,
        generatedAt: new Date().toISOString()
    };

    const blob = new Blob([JSON.stringify(portraitData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `student_portrait_${student.id}_${student.name}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

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
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-brand-50 rounded-full -mr-16 -mt-16 opacity-50 pointer-events-none"></div>
        
        <div className="relative z-10 flex flex-col md:flex-row gap-6 items-start">
          <div className="w-24 h-24 rounded-full bg-gradient-to-br from-brand-500 to-indigo-600 flex items-center justify-center text-3xl font-bold text-white shadow-lg flex-shrink-0 border-4 border-white">
            {student.avatar || student.name.charAt(0)}
          </div>
          <div className="flex-1 w-full">
            <div className="flex justify-between items-start">
              <div>
                <div className="flex items-center gap-3">
                    <h1 className="text-2xl font-bold text-slate-900">{student.name}</h1>
                    {student.tags?.map(tag => (
                        <span key={tag} className="px-2 py-0.5 rounded-full bg-amber-50 text-amber-700 text-xs font-medium border border-amber-100">
                            {tag}
                        </span>
                    ))}
                </div>
                <p className="text-slate-500 mt-2 flex items-center gap-2">
                  <span className="bg-slate-100 text-slate-600 px-2 py-0.5 rounded text-xs font-mono">ID: {student.id}</span>
                  <span>•</span>
                  <span>{student.gender === 'Male' ? '男' : '女'}</span>
                  <span>•</span>
                  <span>{student.dob}</span>
                </p>
              </div>
              <div className="flex gap-2">
                <button 
                  onClick={handleEditClick}
                  className="px-4 py-2 border border-slate-200 text-slate-700 rounded-lg hover:bg-slate-50 text-sm font-medium flex items-center gap-2"
                >
                  <Edit2 size={16}/> 编辑档案
                </button>
                <button 
                  onClick={handleExportPortrait}
                  className="px-4 py-2 bg-brand-600 text-white rounded-lg hover:bg-brand-700 text-sm font-medium flex items-center gap-2 shadow-sm"
                >
                  <FileJson size={16}/> 导出画像
                </button>
              </div>
            </div>
            
            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="flex items-center gap-3 text-sm text-slate-600 bg-slate-50 p-3 rounded-lg border border-slate-100">
                <div className="p-2 bg-white rounded-full shadow-sm text-brand-500"><GraduationCap size={16}/></div>
                <div className="flex flex-col">
                  <span className="text-xs text-slate-400">所在班级</span>
                  <button onClick={() => navigate('/organization/class/C10-1')} className="font-medium hover:text-brand-600 text-left transition-colors">
                    {student.grade} - {student.class}
                  </button>
                </div>
              </div>
              <div className="flex items-center gap-3 text-sm text-slate-600 bg-slate-50 p-3 rounded-lg border border-slate-100">
                 <div className="p-2 bg-white rounded-full shadow-sm text-brand-500"><Phone size={16}/></div>
                <div className="flex flex-col">
                  <span className="text-xs text-slate-400">紧急联系人</span>
                  <span className="font-medium">{student.parentContact}</span>
                </div>
              </div>
              <div className="flex items-center gap-3 text-sm text-slate-600 bg-slate-50 p-3 rounded-lg border border-slate-100">
                 <div className="p-2 bg-white rounded-full shadow-sm text-brand-500"><MapPin size={16}/></div>
                <div className="flex flex-col min-w-0">
                   <span className="text-xs text-slate-400">家庭住址</span>
                   <span className="font-medium truncate max-w-[150px]" title={student.address}>{student.address}</span>
                </div>
              </div>
              <div className="flex items-center gap-3 text-sm text-slate-600 bg-slate-50 p-3 rounded-lg border border-slate-100">
                 <div className="p-2 bg-white rounded-full shadow-sm text-emerald-500"><Activity size={16}/></div>
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
              {tab === 'records' && '档案与行为 Records'}
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      <div className="min-h-[400px]">
        
        {/* TAB: OVERVIEW */}
        {activeTab === 'overview' && (
           <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Left Column (2/3) */}
              <div className="lg:col-span-2 space-y-6">
                 {/* Stats Row */}
                 <div className="grid grid-cols-3 gap-6">
                    <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col items-center justify-center relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-full h-1 bg-brand-500"></div>
                        <p className="text-slate-500 text-xs uppercase font-bold tracking-wider mb-2">GPA</p>
                        <h3 className="text-4xl font-bold text-slate-900">{student.gpa}</h3>
                        <p className="text-xs text-emerald-600 font-medium mt-1 bg-emerald-50 px-2 py-0.5 rounded-full">Top 5%</p>
                    </div>
                    <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col items-center justify-center relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-full h-1 bg-emerald-500"></div>
                        <p className="text-slate-500 text-xs uppercase font-bold tracking-wider mb-2">出勤率</p>
                        <h3 className="text-4xl font-bold text-slate-900">{student.attendance}%</h3>
                        <p className="text-xs text-slate-400 mt-1">缺勤 2 天</p>
                    </div>
                    <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col items-center justify-center relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-full h-1 bg-amber-500"></div>
                        <p className="text-slate-500 text-xs uppercase font-bold tracking-wider mb-2">荣誉奖项</p>
                        <h3 className="text-4xl font-bold text-amber-500">{MOCK_AWARDS.length}</h3>
                        <p className="text-xs text-slate-400 mt-1">本学年</p>
                    </div>
                 </div>

                 {/* Ability & Goals Row */}
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                     <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                        <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
                             <Zap className="text-brand-600" size={18}/> 综合能力模型
                        </h3>
                        <div className="h-60 w-full">
                           <ResponsiveContainer width="100%" height="100%">
                              <RadarChart cx="50%" cy="50%" outerRadius="80%" data={ABILITY_RADAR_DATA}>
                                <PolarGrid stroke="#e2e8f0"/>
                                <PolarAngleAxis dataKey="subject" tick={{ fill: '#64748b', fontSize: 12 }} />
                                <PolarRadiusAxis angle={30} domain={[0, 150]} tick={false}/>
                                <Radar name="Student" dataKey="A" stroke="#3b82f6" strokeWidth={2} fill="#3b82f6" fillOpacity={0.2} />
                                <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}/>
                              </RadarChart>
                           </ResponsiveContainer>
                        </div>
                     </div>
                     
                     <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col">
                         <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
                             <Target className="text-red-500" size={18}/> 升学目标
                        </h3>
                        <div className="flex-1 space-y-4">
                            {student.targetUniversities?.map((uni, idx) => (
                                <div key={idx} className="bg-slate-50 rounded-lg p-3 border border-slate-100">
                                    <div className="flex justify-between items-center mb-2">
                                        <span className="font-bold text-slate-800">{uni.name}</span>
                                        <span className={`text-xs font-bold px-2 py-0.5 rounded ${
                                            uni.probability >= 80 ? 'bg-emerald-100 text-emerald-700' : 
                                            uni.probability >= 50 ? 'bg-amber-100 text-amber-700' : 'bg-red-100 text-red-700'
                                        }`}>
                                            录取概率: {uni.probability}%
                                        </span>
                                    </div>
                                    <div className="w-full bg-slate-200 rounded-full h-1.5">
                                        <div 
                                            className={`h-1.5 rounded-full ${
                                                uni.probability >= 80 ? 'bg-emerald-500' : 
                                                uni.probability >= 50 ? 'bg-amber-500' : 'bg-red-500'
                                            }`} 
                                            style={{ width: `${uni.probability}%` }}
                                        ></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <button className="mt-4 w-full py-2 border border-dashed border-slate-300 rounded-lg text-slate-500 hover:bg-slate-50 text-sm">
                            + 添加目标院校
                        </button>
                     </div>
                 </div>
                 
                 {/* Teachers Comments */}
                 <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                    <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
                         <MessageSquare className="text-indigo-500" size={18}/> 教师评语墙
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {MOCK_COMMENTS.map(comment => (
                            <div key={comment.id} className="p-4 bg-indigo-50/50 rounded-lg border border-indigo-100 relative">
                                <div className="flex justify-between items-start mb-2">
                                    <div className="flex items-center gap-2">
                                        <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center text-xs font-bold text-indigo-600 shadow-sm">
                                            {comment.teacher.charAt(0)}
                                        </div>
                                        <div>
                                            <p className="text-sm font-bold text-slate-800">{comment.teacher}</p>
                                            <p className="text-xs text-slate-500">{comment.subject}</p>
                                        </div>
                                    </div>
                                    <span className="text-xs text-slate-400">{comment.date}</span>
                                </div>
                                <p className="text-sm text-slate-600 italic">"{comment.content}"</p>
                                <div className="mt-3 flex gap-2">
                                    {comment.tags.map(tag => (
                                        <span key={tag} className="text-xs bg-white text-indigo-600 px-2 py-0.5 rounded border border-indigo-100">
                                            #{tag}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                 </div>
              </div>

              {/* Right Column (1/3) */}
              <div className="space-y-6">
                 {/* Timeline */}
                 <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                     <h3 className="font-bold text-slate-800 mb-6 flex items-center gap-2">
                         <Clock className="text-brand-600" size={18}/> 最近活动
                    </h3>
                    <div className="relative border-l-2 border-slate-100 ml-3 space-y-8 pb-4">
                        {MOCK_TIMELINE.map((event, idx) => (
                            <div key={event.id} className="relative pl-8">
                                <div className={`absolute -left-[9px] top-1 w-4 h-4 rounded-full border-2 border-white shadow-sm ${
                                    event.type === 'Award' ? 'bg-amber-500' :
                                    event.type === 'Behavior' ? 'bg-red-500' :
                                    event.type === 'Academic' ? 'bg-brand-500' : 'bg-slate-400'
                                }`}></div>
                                <div>
                                    <p className="text-xs text-slate-400 mb-0.5">{event.timestamp}</p>
                                    <h4 className="text-sm font-bold text-slate-800">{event.title}</h4>
                                    {event.description && <p className="text-xs text-slate-500 mt-1 bg-slate-50 p-2 rounded">{event.description}</p>}
                                </div>
                            </div>
                        ))}
                    </div>
                 </div>

                 {/* Honors Wall Mini */}
                 <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                    <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
                         <Award className="text-amber-500" size={18}/> 荣誉墙
                    </h3>
                    <div className="space-y-3">
                        {MOCK_AWARDS.map(award => (
                            <div key={award.id} className="flex gap-3 items-center p-2 hover:bg-slate-50 rounded-lg transition-colors">
                                <div className="w-10 h-10 bg-amber-50 rounded-lg flex items-center justify-center text-amber-600 flex-shrink-0">
                                    <Award size={20} />
                                </div>
                                <div>
                                    <p className="text-sm font-bold text-slate-800">{award.competition}</p>
                                    <div className="flex items-center gap-2 mt-0.5">
                                        <span className="text-xs font-bold text-amber-600 bg-amber-50 border border-amber-100 px-1.5 rounded">{award.rank}</span>
                                        <span className="text-xs text-slate-400">{award.date}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                 </div>
              </div>
           </div>
        )}

        {/* TAB: ACADEMIC */}
        {activeTab === 'academic' && (
           <div className="space-y-6">
              {/* Trend Chart */}
              <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                 <h3 className="font-bold text-slate-800 mb-6 flex items-center gap-2">
                    <TrendingUp className="text-brand-600" size={20}/> 成绩趋势跟踪
                 </h3>
                 <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                       <LineChart data={GRADE_TREND_DATA}>
                          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                          <XAxis dataKey="term" axisLine={false} tickLine={false} tick={{fill: '#64748b'}} />
                          <YAxis domain={[60, 100]} axisLine={false} tickLine={false} tick={{fill: '#64748b'}} />
                          <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}/>
                          <Line type="monotone" dataKey="score" stroke="#3b82f6" strokeWidth={3} dot={{r: 4, fill: '#3b82f6', strokeWidth: 2, stroke: '#fff'}} name="个人成绩" />
                          <Line type="monotone" dataKey="avg" stroke="#cbd5e1" strokeWidth={2} strokeDasharray="5 5" dot={false} name="年级平均" />
                       </LineChart>
                    </ResponsiveContainer>
                 </div>
              </div>

              {/* Course Detail Table */}
              <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                 <div className="p-4 border-b border-slate-200 bg-slate-50/50 flex justify-between items-center">
                    <h3 className="font-bold text-slate-800 flex items-center gap-2">
                        <BookOpen size={18} className="text-brand-600"/> 本学期修读课程
                    </h3>
                    <span className="text-xs text-slate-500">2024-2025 学年第一学期</span>
                 </div>
                 <table className="w-full text-left">
                    <thead className="bg-slate-50 text-slate-500 text-xs uppercase font-semibold">
                        <tr>
                            <th className="px-6 py-4">课程名称</th>
                            <th className="px-6 py-4">任课教师</th>
                            <th className="px-6 py-4">当前成绩</th>
                            <th className="px-6 py-4">班级平均</th>
                            <th className="px-6 py-4">班级排名</th>
                            <th className="px-6 py-4">趋势</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {MOCK_COURSES.map(course => (
                            <tr key={course.id} className="hover:bg-slate-50">
                                <td className="px-6 py-4 font-medium text-slate-900">{course.name}</td>
                                <td className="px-6 py-4 text-sm text-slate-600">{course.teacher}</td>
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-3">
                                        <span className={`font-bold text-lg ${
                                            course.currentScore >= 90 ? 'text-emerald-600' : 
                                            course.currentScore >= 80 ? 'text-brand-600' : 'text-amber-600'
                                        }`}>
                                            {course.currentScore}
                                        </span>
                                        <div className="w-24 bg-slate-100 rounded-full h-1.5">
                                            <div 
                                                className={`h-1.5 rounded-full ${
                                                    course.currentScore >= 90 ? 'bg-emerald-500' : 
                                                    course.currentScore >= 80 ? 'bg-brand-500' : 'bg-amber-500'
                                                }`} 
                                                style={{width: `${course.currentScore}%`}}
                                            ></div>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4 text-sm text-slate-500">{course.classAverage}</td>
                                <td className="px-6 py-4 text-sm font-medium text-slate-900">#{course.rank}</td>
                                <td className="px-6 py-4">
                                    {course.trend === 'up' && <TrendingUp size={16} className="text-emerald-500"/>}
                                    {course.trend === 'down' && <TrendingUp size={16} className="text-red-500 rotate-180"/>}
                                    {course.trend === 'stable' && <span className="text-slate-400">-</span>}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                 </table>
              </div>
           </div>
        )}

        {/* TAB: RECORDS */}
        {activeTab === 'records' && (
           <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-2 bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                    <div className="p-4 border-b border-slate-200 bg-slate-50/50 flex justify-between items-center">
                        <h3 className="font-bold text-slate-800 flex items-center gap-2">
                             <FileText size={18} className="text-slate-600"/> 请假与考勤记录
                        </h3>
                        <button className="text-sm text-brand-600 hover:text-brand-700 font-medium flex items-center gap-1">
                            <Download size={14}/> 导出列表
                        </button>
                    </div>
                    <table className="w-full text-left">
                        <thead className="bg-slate-50 text-slate-500 text-xs uppercase font-semibold">
                            <tr>
                                <th className="px-6 py-4">类型</th>
                                <th className="px-6 py-4">时间段</th>
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
                                    {record.startDate} <span className="text-slate-300 mx-1">→</span> {record.endDate}
                                </td>
                                <td className="px-6 py-4 text-sm text-slate-900 font-medium">
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

                <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                     <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
                         <AlertCircle size={18} className="text-red-500"/> 行为预警
                    </h3>
                    <div className="space-y-4">
                        <div className="bg-red-50 border border-red-100 rounded-lg p-3">
                            <h4 className="text-sm font-bold text-red-800 mb-1">迟到次数较多</h4>
                            <p className="text-xs text-red-600 leading-relaxed">
                                本月早读迟到已达 3 次，建议班主任介入沟通，了解原因。
                            </p>
                        </div>
                         <div className="bg-amber-50 border border-amber-100 rounded-lg p-3">
                            <h4 className="text-sm font-bold text-amber-800 mb-1">化学成绩下滑</h4>
                            <p className="text-xs text-amber-600 leading-relaxed">
                                连续两次小测成绩低于班级平均分，需关注学习状态。
                            </p>
                        </div>
                    </div>
                </div>
           </div>
        )}
      </div>

      {/* --- EDIT PROFILE MODAL --- */}
      {isEditModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4 animate-fade-in">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg overflow-hidden animate-scale-up">
            <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-slate-50">
              <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                 <Edit2 size={18} className="text-brand-600"/> 编辑学生档案
              </h3>
              <button 
                onClick={() => setIsEditModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 hover:bg-slate-200 p-1 rounded-full transition-colors"
              >
                <X size={20} />
              </button>
            </div>
            
            <form onSubmit={handleSaveProfile} className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                 <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">姓名</label>
                    <input 
                      type="text" 
                      required
                      className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500"
                      value={editForm.name || ''}
                      onChange={e => setEditForm({...editForm, name: e.target.value})}
                    />
                 </div>
                 <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">性别</label>
                    <select 
                      className="w-full px-4 py-2 border border-slate-200 rounded-lg bg-white"
                      value={editForm.gender || 'Male'}
                      onChange={e => setEditForm({...editForm, gender: e.target.value as any})}
                    >
                       <option value="Male">男 (Male)</option>
                       <option value="Female">女 (Female)</option>
                    </select>
                 </div>
              </div>

              <div>
                 <label className="block text-sm font-medium text-slate-700 mb-1">出生日期</label>
                 <input 
                    type="date" 
                    className="w-full px-4 py-2 border border-slate-200 rounded-lg text-slate-700"
                    value={editForm.dob || ''}
                    onChange={e => setEditForm({...editForm, dob: e.target.value})}
                  />
              </div>

              <div>
                 <label className="block text-sm font-medium text-slate-700 mb-1">家庭住址</label>
                 <input 
                    type="text" 
                    className="w-full px-4 py-2 border border-slate-200 rounded-lg"
                    value={editForm.address || ''}
                    onChange={e => setEditForm({...editForm, address: e.target.value})}
                  />
              </div>

              <div>
                 <label className="block text-sm font-medium text-slate-700 mb-1">紧急联系人</label>
                 <input 
                    type="text" 
                    className="w-full px-4 py-2 border border-slate-200 rounded-lg"
                    value={editForm.parentContact || ''}
                    onChange={e => setEditForm({...editForm, parentContact: e.target.value})}
                  />
              </div>
              
              <div className="pt-4 flex gap-3 border-t border-slate-100 mt-2">
                <button 
                  type="button"
                  onClick={() => setIsEditModalOpen(false)}
                  className="flex-1 px-4 py-2 border border-slate-200 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors"
                >
                  取消
                </button>
                <button 
                  type="submit"
                  className="flex-1 px-4 py-2 bg-brand-600 text-white rounded-lg hover:bg-brand-700 transition-colors font-medium shadow-sm flex items-center justify-center gap-2"
                >
                  <Save size={16}/> 保存更改
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};