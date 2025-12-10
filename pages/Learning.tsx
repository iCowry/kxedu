
import React, { useState } from 'react';
import { BookCheck, FileText, Clock, Plus, Filter, MoreHorizontal, CheckCircle2, AlertCircle, X, Calendar, PenTool, Eye, ListChecks, Sun, Sparkles, Loader2 } from 'lucide-react';
import { Homework, Exam } from '../types';
import { useNavigate } from 'react-router-dom';
import { sendMessageToGemini } from '../services/geminiService';

const INITIAL_HOMEWORK: Homework[] = [
  { id: 'HW-001', title: '高等数学第三章习题', subject: 'Math', targetClass: 'Class 1 (Grade 10)', deadline: '2024-11-25 23:59', submittedCount: 35, totalCount: 38, status: 'Published', publisher: 'Dr. Sarah Chen', type: 'Normal' },
  { id: 'HW-002', title: '寒假英语阅读打卡', subject: 'English', targetClass: 'Class 1 (Grade 10)', startDate: '2025-01-15', endDate: '2025-02-15', deadline: '2025-02-15', submittedCount: 12, totalCount: 38, status: 'Published', publisher: 'Ms. Emily Zhang', type: 'DailyCheckIn' },
  { id: 'HW-003', title: '物理实验报告：力学', subject: 'Physics', targetClass: 'Class 2 (Grade 11)', deadline: '2024-11-28 23:59', submittedCount: 0, totalCount: 40, status: 'Draft', publisher: 'Mr. Michael Brown', type: 'Normal' },
];

const INITIAL_EXAMS: Exam[] = [
  { id: 'EX-001', name: '秋季期中考试', type: 'Midterm', subject: 'All', date: '2024-11-01', targetGrades: ['Grade 10', 'Grade 11'], status: 'Completed', avgScore: 85.4 },
  { id: 'EX-002', name: '高三数学月考 (11月)', type: 'Quiz', subject: 'Math', date: '2024-11-30', targetGrades: ['Grade 12'], status: 'Scheduled' },
  { id: 'EX-003', name: '英语期末模拟考', type: 'Mock', subject: 'English', date: '2024-12-15', targetGrades: ['Grade 12'], status: 'Scheduled' },
];

export const Learning: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'homework' | 'exams'>('homework');
  
  const [homeworkList, setHomeworkList] = useState<Homework[]>(INITIAL_HOMEWORK);
  const [examList, setExamList] = useState<Exam[]>(INITIAL_EXAMS);

  // Modals
  const [isHomeworkModalOpen, setIsHomeworkModalOpen] = useState(false);
  const [isExamModalOpen, setIsExamModalOpen] = useState(false);
  const [isAiGenerating, setIsAiGenerating] = useState(false);

  // Forms
  const [newHomework, setNewHomework] = useState<Partial<Homework>>({ title: '', subject: 'Math', targetClass: '', deadline: '', type: 'Normal', startDate: '', endDate: '', description: '' });
  const [newExam, setNewExam] = useState<Partial<Exam>>({ name: '', type: 'Quiz', subject: 'Math', date: '', targetGrades: [] });

  // --- Handlers ---
  const handleCreateHomework = (e: React.FormEvent) => {
    e.preventDefault();
    const hw: Homework = {
        id: `HW-${Date.now()}`,
        title: newHomework.title!,
        subject: newHomework.subject!,
        targetClass: newHomework.targetClass || 'All Classes',
        deadline: newHomework.type === 'Normal' ? newHomework.deadline! : newHomework.endDate!, // Use endDate as deadline for ranges
        startDate: newHomework.startDate,
        endDate: newHomework.endDate,
        submittedCount: 0,
        totalCount: 40, // Mock class size
        status: 'Published',
        publisher: 'Me',
        description: newHomework.description,
        type: newHomework.type as any
    };
    setHomeworkList([hw, ...homeworkList]);
    setIsHomeworkModalOpen(false);
    setNewHomework({ title: '', subject: 'Math', targetClass: '', deadline: '', type: 'Normal', startDate: '', endDate: '', description: '' });
  };

  const handleCreateExam = (e: React.FormEvent) => {
    e.preventDefault();
    const ex: Exam = {
        id: `EX-${Date.now()}`,
        name: newExam.name!,
        type: newExam.type as any,
        subject: newExam.subject!,
        date: newExam.date!,
        targetGrades: ['Grade 10'], // Simplified
        status: 'Scheduled'
    };
    setExamList([...examList, ex]);
    setIsExamModalOpen(false);
    setNewExam({ name: '', type: 'Quiz', subject: 'Math', date: '', targetGrades: [] });
  };

  const handleAiSuggest = async () => {
    if (!newHomework.title) {
        alert('请先输入作业标题，AI 需要根据标题生成建议。');
        return;
    }
    setIsAiGenerating(true);
    try {
        const prompt = `我是${newHomework.subject}老师，请为作业"${newHomework.title}"生成一段详细的作业说明。
        类型：${newHomework.type === 'DailyCheckIn' ? '每日打卡任务' : '普通作业'}
        内容包括：作业目标、具体要求、评分标准（如适用）和鼓励的话。
        保持简洁清晰。`;
        
        const text = await sendMessageToGemini(prompt);
        setNewHomework(prev => ({ ...prev, description: text }));
    } catch (e) {
        alert('AI 生成失败，请重试');
    } finally {
        setIsAiGenerating(false);
    }
  };

  const getHomeworkTypeLabel = (type?: string) => {
      switch(type) {
          case 'DailyCheckIn': return { label: '每日打卡', icon: Calendar, color: 'text-purple-600 bg-purple-50 border-purple-200' };
          case 'Vacation': return { label: '假期作业', icon: Sun, color: 'text-orange-600 bg-orange-50 border-orange-200' };
          default: return { label: '日常作业', icon: FileText, color: 'text-blue-600 bg-blue-50 border-blue-200' };
      }
  };

  return (
    <div className="p-8 space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">学情管理 Learning</h1>
          <p className="text-slate-500 mt-1">作业发布、批改与考试教务安排。</p>
        </div>
        <div className="flex gap-2">
            {activeTab === 'homework' ? (
                 <button 
                 onClick={() => setIsHomeworkModalOpen(true)}
                 className="flex items-center px-4 py-2 bg-brand-600 text-white rounded-lg hover:bg-brand-700 transition-colors shadow-sm font-medium"
               >
                   <Plus size={18} className="mr-2" /> 发布作业
               </button>
            ) : (
                <button 
                onClick={() => setIsExamModalOpen(true)}
                className="flex items-center px-4 py-2 bg-brand-600 text-white rounded-lg hover:bg-brand-700 transition-colors shadow-sm font-medium"
              >
                  <Plus size={18} className="mr-2" /> 安排考试
              </button>
            )}
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
              <div>
                  <p className="text-slate-500 text-sm font-medium">待批改作业</p>
                  <h3 className="text-2xl font-bold text-slate-900 mt-1">47 份</h3>
              </div>
              <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-lg flex items-center justify-center">
                  <PenTool size={20}/>
              </div>
          </div>
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
              <div>
                  <p className="text-slate-500 text-sm font-medium">本周考试安排</p>
                  <h3 className="text-2xl font-bold text-slate-900 mt-1">3 场</h3>
              </div>
              <div className="w-10 h-10 bg-purple-50 text-purple-600 rounded-lg flex items-center justify-center">
                  <Calendar size={20}/>
              </div>
          </div>
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
              <div>
                  <p className="text-slate-500 text-sm font-medium">作业平均完成率</p>
                  <h3 className="text-2xl font-bold text-emerald-600 mt-1">92.5%</h3>
              </div>
              <div className="w-10 h-10 bg-emerald-50 text-emerald-600 rounded-lg flex items-center justify-center">
                  <CheckCircle2 size={20}/>
              </div>
          </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-slate-200">
        <nav className="flex space-x-8">
          <button
            onClick={() => setActiveTab('homework')}
            className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors flex items-center gap-2 ${
              activeTab === 'homework'
                ? 'border-brand-600 text-brand-600'
                : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
            }`}
          >
            <ListChecks size={18}/> 作业管理
          </button>
          <button
            onClick={() => setActiveTab('exams')}
            className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors flex items-center gap-2 ${
              activeTab === 'exams'
                ? 'border-brand-600 text-brand-600'
                : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
            }`}
          >
            <BookCheck size={18}/> 考试管理
          </button>
        </nav>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden min-h-[400px]">
          {activeTab === 'homework' && (
             <div className="flex flex-col h-full">
                <div className="p-4 border-b border-slate-200 bg-slate-50/50 flex justify-between items-center">
                    <h3 className="font-bold text-slate-800">作业列表</h3>
                    <button className="flex items-center px-3 py-1.5 border border-slate-200 rounded-lg bg-white text-sm text-slate-600 hover:bg-slate-50">
                        <Filter size={16} className="mr-2" /> 筛选学科
                    </button>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-slate-50 text-slate-500 text-xs uppercase font-semibold">
                            <tr>
                                <th className="px-6 py-4">作业类型</th>
                                <th className="px-6 py-4">作业标题</th>
                                <th className="px-6 py-4">科目 / 班级</th>
                                <th className="px-6 py-4">时间安排</th>
                                <th className="px-6 py-4">进度</th>
                                <th className="px-6 py-4">状态</th>
                                <th className="px-6 py-4 text-right">操作</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {homeworkList.map(hw => {
                                const typeConfig = getHomeworkTypeLabel(hw.type);
                                return (
                                <tr key={hw.id} className="hover:bg-slate-50 group cursor-pointer" onClick={() => navigate(`/learning/homework/${hw.id}`)}>
                                    <td className="px-6 py-4">
                                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold border ${typeConfig.color}`}>
                                            <typeConfig.icon size={12}/> {typeConfig.label}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="font-medium text-slate-900 group-hover:text-brand-600 transition-colors">{hw.title}</div>
                                        <div className="text-xs text-slate-500">By: {hw.publisher}</div>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-slate-600">
                                        <span className="font-medium text-slate-800">{hw.subject}</span>
                                        <span className="text-slate-400 mx-1">|</span>
                                        {hw.targetClass}
                                    </td>
                                    <td className="px-6 py-4 text-sm text-slate-600">
                                        {hw.type === 'Normal' ? (
                                            <span>截止: {hw.deadline}</span>
                                        ) : (
                                            <span>{hw.startDate} <span className="text-slate-400">→</span> {hw.endDate}</span>
                                        )}
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="flex-1 w-24 bg-slate-100 rounded-full h-1.5">
                                                <div 
                                                    className="h-1.5 rounded-full bg-brand-500" 
                                                    style={{ width: `${(hw.submittedCount / hw.totalCount) * 100}%` }}
                                                ></div>
                                            </div>
                                            <span className="text-xs text-slate-500">{hw.submittedCount}/{hw.totalCount}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
                                            hw.status === 'Published' ? 'bg-emerald-50 text-emerald-700' :
                                            hw.status === 'Graded' ? 'bg-blue-50 text-blue-700' :
                                            'bg-slate-100 text-slate-600'
                                        }`}>
                                            {hw.status === 'Published' && <Clock size={12} className="mr-1"/>}
                                            {hw.status === 'Published' ? '进行中' : hw.status === 'Draft' ? '草稿' : '已批改'}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <button className="text-slate-400 hover:text-brand-600 p-1">
                                            <Eye size={18}/>
                                        </button>
                                    </td>
                                </tr>
                            )})}
                        </tbody>
                    </table>
                </div>
             </div>
          )}

          {activeTab === 'exams' && (
              <div className="flex flex-col h-full">
                <div className="p-4 border-b border-slate-200 bg-slate-50/50 flex justify-between items-center">
                    <h3 className="font-bold text-slate-800">考试安排列表</h3>
                    <button className="flex items-center px-3 py-1.5 border border-slate-200 rounded-lg bg-white text-sm text-slate-600 hover:bg-slate-50">
                        <Filter size={16} className="mr-2" /> 筛选学科
                    </button>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-slate-50 text-slate-500 text-xs uppercase font-semibold">
                            <tr>
                                <th className="px-6 py-4">考试名称</th>
                                <th className="px-6 py-4">类型 / 科目</th>
                                <th className="px-6 py-4">考试时间</th>
                                <th className="px-6 py-4">参考对象</th>
                                <th className="px-6 py-4">状态</th>
                                <th className="px-6 py-4">平均分</th>
                                <th className="px-6 py-4 text-right">操作</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {examList.map(exam => (
                                <tr key={exam.id} className="hover:bg-slate-50 group cursor-pointer" onClick={() => navigate(`/learning/exam/${exam.id}`)}>
                                    <td className="px-6 py-4 font-medium text-slate-900 group-hover:text-brand-600 transition-colors">{exam.name}</td>
                                    <td className="px-6 py-4 text-sm text-slate-600">
                                         <span className={`inline-block px-2 py-0.5 rounded text-xs mr-2 ${
                                             exam.type === 'Midterm' || exam.type === 'Final' ? 'bg-purple-50 text-purple-700' : 'bg-slate-100 text-slate-600'
                                         }`}>
                                             {exam.type}
                                         </span>
                                         {exam.subject}
                                    </td>
                                    <td className="px-6 py-4 text-sm text-slate-600 font-medium">
                                        {exam.date}
                                    </td>
                                    <td className="px-6 py-4 text-sm text-slate-500">
                                        {exam.targetGrades.join(', ')}
                                    </td>
                                    <td className="px-6 py-4">
                                         <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
                                            exam.status === 'Completed' ? 'bg-slate-100 text-slate-600' :
                                            exam.status === 'Grading' ? 'bg-amber-50 text-amber-700' :
                                            'bg-emerald-50 text-emerald-700'
                                        }`}>
                                            {exam.status === 'Completed' ? '已结束' : exam.status === 'Grading' ? '阅卷中' : '未开始'}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-sm font-bold text-slate-800">
                                        {exam.avgScore || '-'}
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <button className="text-brand-600 hover:text-brand-700 text-sm font-medium">详情</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
              </div>
          )}
      </div>

      {/* --- HOMEWORK MODAL --- */}
      {isHomeworkModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4 animate-fade-in">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg overflow-hidden animate-scale-up flex flex-col max-h-[90vh]">
            <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-slate-50 flex-shrink-0">
              <h3 className="text-lg font-bold text-slate-900">发布新作业</h3>
              <button onClick={() => setIsHomeworkModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                <X size={20} />
              </button>
            </div>
            <form onSubmit={handleCreateHomework} className="p-6 space-y-4 flex-1 overflow-y-auto">
               <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">作业标题</label>
                  <input 
                    type="text" required
                    className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500"
                    value={newHomework.title}
                    onChange={e => setNewHomework({...newHomework, title: e.target.value})}
                  />
               </div>
               <div>
                   <label className="block text-sm font-medium text-slate-700 mb-1">作业类型</label>
                   <select 
                      className="w-full px-4 py-2 border border-slate-200 rounded-lg bg-white"
                      value={newHomework.type}
                      onChange={e => setNewHomework({...newHomework, type: e.target.value as any})}
                    >
                        <option value="Normal">日常作业 (提交一次)</option>
                        <option value="DailyCheckIn">每日打卡 (假期/习惯养成)</option>
                        <option value="Vacation">假期作业 (项目式)</option>
                    </select>
               </div>
               <div className="grid grid-cols-2 gap-4">
                   <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">科目</label>
                      <select 
                        className="w-full px-4 py-2 border border-slate-200 rounded-lg bg-white"
                        value={newHomework.subject}
                        onChange={e => setNewHomework({...newHomework, subject: e.target.value})}
                      >
                          <option>Math</option>
                          <option>English</option>
                          <option>Physics</option>
                          <option>Chemistry</option>
                      </select>
                   </div>
                   <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">目标班级</label>
                      <input 
                        type="text" placeholder="e.g. Class 1"
                        className="w-full px-4 py-2 border border-slate-200 rounded-lg"
                        value={newHomework.targetClass}
                        onChange={e => setNewHomework({...newHomework, targetClass: e.target.value})}
                      />
                   </div>
               </div>

               {newHomework.type === 'Normal' ? (
                   <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">截止时间</label>
                      <input 
                        type="datetime-local" required
                        className="w-full px-4 py-2 border border-slate-200 rounded-lg text-slate-600"
                        value={newHomework.deadline}
                        onChange={e => setNewHomework({...newHomework, deadline: e.target.value})}
                      />
                   </div>
               ) : (
                   <div className="grid grid-cols-2 gap-4">
                       <div>
                          <label className="block text-sm font-medium text-slate-700 mb-1">开始日期</label>
                          <input 
                            type="date" required
                            className="w-full px-4 py-2 border border-slate-200 rounded-lg text-slate-600"
                            value={newHomework.startDate}
                            onChange={e => setNewHomework({...newHomework, startDate: e.target.value})}
                          />
                       </div>
                       <div>
                          <label className="block text-sm font-medium text-slate-700 mb-1">结束日期</label>
                          <input 
                            type="date" required
                            className="w-full px-4 py-2 border border-slate-200 rounded-lg text-slate-600"
                            value={newHomework.endDate}
                            onChange={e => setNewHomework({...newHomework, endDate: e.target.value})}
                          />
                       </div>
                   </div>
               )}
               
               <div>
                  <div className="flex justify-between items-center mb-1">
                      <label className="block text-sm font-medium text-slate-700">作业说明</label>
                      <button 
                        type="button"
                        onClick={handleAiSuggest}
                        disabled={isAiGenerating}
                        className="text-xs flex items-center gap-1 text-purple-600 hover:text-purple-700 bg-purple-50 px-2 py-1 rounded-lg border border-purple-100 transition-colors disabled:opacity-50"
                      >
                          {isAiGenerating ? <Loader2 size={12} className="animate-spin"/> : <Sparkles size={12}/>}
                          {isAiGenerating ? '生成中...' : 'AI 生成说明'}
                      </button>
                  </div>
                  <textarea 
                    rows={4}
                    className="w-full px-4 py-2 border border-slate-200 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-brand-500"
                    placeholder="请输入详细的作业要求、评分标准等..."
                    value={newHomework.description || ''}
                    onChange={e => setNewHomework({...newHomework, description: e.target.value})}
                  />
               </div>
            </form>
            
            <div className="p-6 pt-0 flex gap-3 bg-white border-t border-slate-100 mt-auto pt-4">
                <button type="button" onClick={() => setIsHomeworkModalOpen(false)} className="flex-1 py-2 border border-slate-200 rounded-lg hover:bg-slate-50">取消</button>
                <button type="button" onClick={handleCreateHomework} className="flex-1 py-2 bg-brand-600 text-white rounded-lg hover:bg-brand-700">发布</button>
            </div>
          </div>
        </div>
      )}

      {/* --- EXAM MODAL --- */}
      {isExamModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4 animate-fade-in">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg overflow-hidden animate-scale-up">
            <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-slate-50">
              <h3 className="text-lg font-bold text-slate-900">安排新考试</h3>
              <button onClick={() => setIsExamModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                <X size={20} />
              </button>
            </div>
            <form onSubmit={handleCreateExam} className="p-6 space-y-4">
               <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">考试名称</label>
                  <input 
                    type="text" required
                    className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500"
                    value={newExam.name}
                    onChange={e => setNewExam({...newExam, name: e.target.value})}
                  />
               </div>
               <div className="grid grid-cols-2 gap-4">
                   <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">类型</label>
                      <select 
                        className="w-full px-4 py-2 border border-slate-200 rounded-lg bg-white"
                        value={newExam.type}
                        onChange={e => setNewExam({...newExam, type: e.target.value as any})}
                      >
                          <option value="Quiz">Quiz (小测)</option>
                          <option value="Midterm">Midterm (期中)</option>
                          <option value="Final">Final (期末)</option>
                          <option value="Mock">Mock (模考)</option>
                      </select>
                   </div>
                   <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">科目</label>
                      <select 
                        className="w-full px-4 py-2 border border-slate-200 rounded-lg bg-white"
                        value={newExam.subject}
                        onChange={e => setNewExam({...newExam, subject: e.target.value})}
                      >
                          <option>Math</option>
                          <option>English</option>
                          <option>All</option>
                      </select>
                   </div>
               </div>
               <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">考试日期</label>
                  <input 
                    type="date" required
                    className="w-full px-4 py-2 border border-slate-200 rounded-lg text-slate-600"
                    value={newExam.date}
                    onChange={e => setNewExam({...newExam, date: e.target.value})}
                  />
               </div>
               <div className="pt-4 flex gap-3">
                   <button type="button" onClick={() => setIsExamModalOpen(false)} className="flex-1 py-2 border border-slate-200 rounded-lg hover:bg-slate-50">取消</button>
                   <button type="submit" className="flex-1 py-2 bg-brand-600 text-white rounded-lg hover:bg-brand-700">确认安排</button>
               </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};