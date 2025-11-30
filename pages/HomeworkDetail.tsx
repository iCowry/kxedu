import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ChevronLeft, Calendar, FileText, CheckCircle2, Clock, XCircle, PenTool, Download, MessageSquare } from 'lucide-react';
import { Homework, HomeworkSubmission } from '../types';

// Mock Data
const MOCK_HOMEWORK: Homework = {
  id: 'HW-001',
  title: 'Calculus Ch.3 Exercises',
  subject: 'Math',
  targetClass: 'Class 1 (Grade 10)',
  deadline: '2024-11-25 23:59',
  submittedCount: 35,
  totalCount: 38,
  status: 'Published',
  publisher: 'Dr. Sarah Chen',
  description: 'Complete problems 1-20 in Chapter 3. Show all work for derivatives. Submit as PDF.'
};

const MOCK_SUBMISSIONS: HomeworkSubmission[] = [
  { studentId: '2023001', studentName: '张小明', status: 'Graded', submitTime: '2024-11-25 20:30', score: 95, comment: 'Excellent work!' },
  { studentId: '2023002', studentName: '李华', status: 'Submitted', submitTime: '2024-11-25 22:15' },
  { studentId: '2023003', studentName: '王伟', status: 'Late', submitTime: '2024-11-26 09:00' },
  { studentId: '2023004', studentName: '赵丽', status: 'Missing' },
  { studentId: '2023005', studentName: '孙强', status: 'Graded', submitTime: '2024-11-24 16:00', score: 88, comment: 'Good, but check q5' },
];

export const HomeworkDetail: React.FC = () => {
  const navigate = useNavigate();
  const [filter, setFilter] = useState<'All' | 'Submitted' | 'Missing'>('All');
  const [submissions, setSubmissions] = useState(MOCK_SUBMISSIONS);

  const filteredList = submissions.filter(s => {
    if (filter === 'All') return true;
    if (filter === 'Submitted') return s.status !== 'Missing';
    if (filter === 'Missing') return s.status === 'Missing';
    return true;
  });

  const handleGrade = (id: string) => {
    const score = prompt('Enter score (0-100):');
    if (score) {
      setSubmissions(prev => prev.map(s => 
        s.studentId === id ? { ...s, status: 'Graded', score: Number(score) } : s
      ));
    }
  };

  return (
    <div className="p-8 space-y-6">
      {/* Header */}
      <div className="flex items-center gap-2 mb-4">
        <button onClick={() => navigate(-1)} className="p-2 hover:bg-slate-100 rounded-lg text-slate-500">
          <ChevronLeft size={20} />
        </button>
        <span className="text-slate-500">/ 学情管理 / 作业详情</span>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
        <div className="flex justify-between items-start">
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-bold text-slate-900">{MOCK_HOMEWORK.title}</h1>
              <span className="px-2 py-0.5 rounded text-xs font-medium bg-emerald-50 text-emerald-700 border border-emerald-100">
                {MOCK_HOMEWORK.status}
              </span>
            </div>
            <p className="text-slate-500 mt-2 flex items-center gap-4">
              <span className="flex items-center gap-1"><FileText size={16}/> {MOCK_HOMEWORK.subject}</span>
              <span className="flex items-center gap-1"><Calendar size={16}/> {MOCK_HOMEWORK.deadline} 截止</span>
              <span className="text-slate-300">|</span>
              <span>{MOCK_HOMEWORK.targetClass}</span>
            </p>
          </div>
          <button className="px-4 py-2 border border-slate-200 rounded-lg text-slate-600 hover:bg-slate-50 text-sm font-medium flex items-center gap-2">
            <PenTool size={16}/> 编辑作业
          </button>
        </div>
        <div className="mt-6 p-4 bg-slate-50 rounded-lg border border-slate-100 text-slate-700 text-sm">
           <p className="font-bold mb-1 text-slate-900">作业要求：</p>
           {MOCK_HOMEWORK.description}
        </div>
        
        {/* Stats */}
        <div className="grid grid-cols-3 gap-6 mt-8 border-t border-slate-100 pt-6">
           <div>
              <p className="text-xs text-slate-500 mb-1">提交率</p>
              <div className="flex items-end gap-2">
                <span className="text-2xl font-bold text-slate-900">
                    {Math.round((MOCK_HOMEWORK.submittedCount / MOCK_HOMEWORK.totalCount) * 100)}%
                </span>
                <span className="text-sm text-slate-400 mb-1">
                    ({MOCK_HOMEWORK.submittedCount}/{MOCK_HOMEWORK.totalCount})
                </span>
              </div>
              <div className="w-full bg-slate-100 h-1.5 rounded-full mt-2">
                  <div className="bg-brand-500 h-1.5 rounded-full" style={{width: `${(MOCK_HOMEWORK.submittedCount / MOCK_HOMEWORK.totalCount) * 100}%`}}></div>
              </div>
           </div>
           <div>
              <p className="text-xs text-slate-500 mb-1">已批改</p>
              <div className="flex items-end gap-2">
                <span className="text-2xl font-bold text-emerald-600">
                    25
                </span>
                <span className="text-sm text-slate-400 mb-1">份</span>
              </div>
           </div>
           <div>
              <p className="text-xs text-slate-500 mb-1">缺交</p>
              <div className="flex items-end gap-2">
                <span className="text-2xl font-bold text-red-500">
                    {MOCK_HOMEWORK.totalCount - MOCK_HOMEWORK.submittedCount}
                </span>
                <span className="text-sm text-slate-400 mb-1">人</span>
              </div>
           </div>
        </div>
      </div>

      {/* Submission List */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
         <div className="p-4 border-b border-slate-200 bg-slate-50/50 flex justify-between items-center">
            <div className="flex gap-4">
                <button 
                  onClick={() => setFilter('All')}
                  className={`text-sm font-medium ${filter === 'All' ? 'text-brand-600' : 'text-slate-500 hover:text-slate-700'}`}
                >
                    全部名单
                </button>
                <button 
                  onClick={() => setFilter('Submitted')}
                  className={`text-sm font-medium ${filter === 'Submitted' ? 'text-brand-600' : 'text-slate-500 hover:text-slate-700'}`}
                >
                    已提交
                </button>
                <button 
                  onClick={() => setFilter('Missing')}
                  className={`text-sm font-medium ${filter === 'Missing' ? 'text-brand-600' : 'text-slate-500 hover:text-slate-700'}`}
                >
                    未提交
                </button>
            </div>
            <button className="flex items-center gap-1 text-sm text-slate-500 hover:text-brand-600">
                <Download size={14}/> 导出成绩单
            </button>
         </div>
         <table className="w-full text-left">
            <thead className="bg-slate-50 text-slate-500 text-xs uppercase font-semibold">
                <tr>
                    <th className="px-6 py-4">学生姓名</th>
                    <th className="px-6 py-4">状态</th>
                    <th className="px-6 py-4">提交时间</th>
                    <th className="px-6 py-4">评分</th>
                    <th className="px-6 py-4">评语</th>
                    <th className="px-6 py-4 text-right">操作</th>
                </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
                {filteredList.map((sub, idx) => (
                    <tr key={idx} className="hover:bg-slate-50">
                        <td className="px-6 py-4 font-medium text-slate-900">{sub.studentName}</td>
                        <td className="px-6 py-4">
                            <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
                                sub.status === 'Graded' ? 'bg-blue-50 text-blue-700' :
                                sub.status === 'Submitted' ? 'bg-emerald-50 text-emerald-700' :
                                sub.status === 'Late' ? 'bg-amber-50 text-amber-700' :
                                'bg-red-50 text-red-700'
                            }`}>
                                {sub.status === 'Graded' && <CheckCircle2 size={12} className="mr-1"/>}
                                {sub.status === 'Late' && <Clock size={12} className="mr-1"/>}
                                {sub.status === 'Missing' && <XCircle size={12} className="mr-1"/>}
                                {sub.status}
                            </span>
                        </td>
                        <td className="px-6 py-4 text-sm text-slate-600">
                            {sub.submitTime || '-'}
                        </td>
                        <td className="px-6 py-4 font-bold text-slate-900">
                            {sub.score !== undefined ? sub.score : '-'}
                        </td>
                         <td className="px-6 py-4 text-sm text-slate-500 truncate max-w-xs">
                            {sub.comment || '-'}
                        </td>
                        <td className="px-6 py-4 text-right">
                            {sub.status !== 'Missing' && (
                                <button 
                                    onClick={() => handleGrade(sub.studentId)}
                                    className="text-brand-600 hover:text-brand-800 text-sm font-medium"
                                >
                                    {sub.status === 'Graded' ? '修改评分' : '批改'}
                                </button>
                            )}
                             {sub.status === 'Missing' && (
                                <button className="text-slate-400 hover:text-brand-600 text-sm font-medium flex items-center gap-1 justify-end w-full">
                                    <MessageSquare size={14}/> 催交
                                </button>
                            )}
                        </td>
                    </tr>
                ))}
            </tbody>
         </table>
      </div>
    </div>
  );
};