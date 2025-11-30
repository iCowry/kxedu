import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ChevronLeft, Calendar, FileText, CheckCircle2, TrendingUp, TrendingDown, Minus, Download, BarChart2 } from 'lucide-react';
import { Exam, ExamResult } from '../types';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

// Mock Data
const MOCK_EXAM: Exam = {
    id: 'EX-001',
    name: 'Fall Midterm Examination',
    type: 'Midterm',
    subject: 'Mathematics',
    date: '2024-11-01',
    targetGrades: ['Grade 10'],
    status: 'Completed',
    avgScore: 85.4,
    maxScore: 148,
    minScore: 52
};

const DISTRIBUTION_DATA = [
    { name: '0-59', value: 2 },
    { name: '60-69', value: 5 },
    { name: '70-79', value: 12 },
    { name: '80-89', value: 18 },
    { name: '90-100', value: 8 },
    { name: '100+', value: 5 }, // Assuming >100 for 150 scale or bonus
];

const MOCK_RESULTS: ExamResult[] = [
    { studentId: '2023001', studentName: '张小明', score: 145, rank: 1, change: 0 },
    { studentId: '2023006', studentName: 'Alice Guo', score: 142, rank: 2, change: 2 },
    { studentId: '2023002', studentName: '李华', score: 138, rank: 3, change: -1 },
    { studentId: '2023007', studentName: 'Bob Liu', score: 125, rank: 12, change: 5 },
    { studentId: '2023003', studentName: '王伟', score: 88, rank: 35, change: -5 },
];

export const ExamDetail: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="p-8 space-y-6">
       {/* Header */}
       <div className="flex items-center gap-2 mb-4">
        <button onClick={() => navigate(-1)} className="p-2 hover:bg-slate-100 rounded-lg text-slate-500">
          <ChevronLeft size={20} />
        </button>
        <span className="text-slate-500">/ 学情管理 / 考试分析</span>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-purple-50 rounded-full -mr-16 -mt-16 opacity-50 pointer-events-none"></div>
        <div className="relative z-10 flex justify-between items-start">
            <div>
                <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-3">
                    {MOCK_EXAM.name}
                    <span className="text-sm font-medium bg-purple-100 text-purple-700 px-2 py-0.5 rounded border border-purple-200">{MOCK_EXAM.type}</span>
                </h1>
                <p className="text-slate-500 mt-2 flex items-center gap-4">
                    <span className="flex items-center gap-1"><FileText size={16}/> {MOCK_EXAM.subject}</span>
                    <span className="flex items-center gap-1"><Calendar size={16}/> {MOCK_EXAM.date}</span>
                    <span className="text-slate-300">|</span>
                    <span>{MOCK_EXAM.targetGrades.join(', ')}</span>
                </p>
            </div>
            <button className="px-4 py-2 bg-brand-600 text-white rounded-lg hover:bg-brand-700 shadow-sm text-sm font-medium flex items-center gap-2">
                <Download size={16}/> 导出分析报告
            </button>
        </div>

        <div className="grid grid-cols-4 gap-6 mt-8 pt-6 border-t border-slate-100">
            <div>
                <p className="text-xs text-slate-500 mb-1">平均分 (Avg)</p>
                <p className="text-3xl font-bold text-slate-900">{MOCK_EXAM.avgScore}</p>
            </div>
            <div>
                <p className="text-xs text-slate-500 mb-1">最高分 (Max)</p>
                <p className="text-3xl font-bold text-emerald-600">{MOCK_EXAM.maxScore}</p>
            </div>
            <div>
                <p className="text-xs text-slate-500 mb-1">最低分 (Min)</p>
                <p className="text-3xl font-bold text-red-500">{MOCK_EXAM.minScore}</p>
            </div>
             <div>
                <p className="text-xs text-slate-500 mb-1">参考人数</p>
                <p className="text-3xl font-bold text-blue-600">50</p>
            </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Chart */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
            <h3 className="font-bold text-slate-800 mb-6 flex items-center gap-2">
                <BarChart2 size={20} className="text-brand-600"/> 成绩分布直方图
            </h3>
            <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={DISTRIBUTION_DATA}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                        <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} />
                        <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} />
                        <Tooltip cursor={{fill: '#f8fafc'}} contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}/>
                        <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                            {DISTRIBUTION_DATA.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={index < 2 ? '#ef4444' : '#3b82f6'} />
                            ))}
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>

        {/* Student List */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
             <div className="p-4 border-b border-slate-200 bg-slate-50/50">
                <h3 className="font-bold text-slate-800">学生成绩单 (Top 5)</h3>
            </div>
            <div className="flex-1 overflow-auto">
                <table className="w-full text-left">
                    <thead className="bg-slate-50 text-slate-500 text-xs uppercase font-semibold">
                        <tr>
                            <th className="px-6 py-4">排名</th>
                            <th className="px-6 py-4">姓名</th>
                            <th className="px-6 py-4">分数</th>
                            <th className="px-6 py-4 text-right">进退步</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {MOCK_RESULTS.map(res => (
                            <tr key={res.studentId} className="hover:bg-slate-50">
                                <td className="px-6 py-4">
                                    <span className={`inline-flex items-center justify-center w-6 h-6 rounded-full text-xs font-bold ${
                                        res.rank <= 3 ? 'bg-amber-100 text-amber-700' : 'bg-slate-100 text-slate-600'
                                    }`}>
                                        {res.rank}
                                    </span>
                                </td>
                                <td className="px-6 py-4 font-medium text-slate-900">{res.studentName}</td>
                                <td className="px-6 py-4 font-bold text-slate-900">{res.score}</td>
                                <td className="px-6 py-4 text-right">
                                    <div className="flex items-center justify-end gap-1">
                                        {res.change > 0 && <TrendingUp size={14} className="text-emerald-500"/>}
                                        {res.change < 0 && <TrendingDown size={14} className="text-red-500"/>}
                                        {res.change === 0 && <Minus size={14} className="text-slate-400"/>}
                                        <span className={`text-sm ${
                                            res.change > 0 ? 'text-emerald-600' : 
                                            res.change < 0 ? 'text-red-600' : 'text-slate-400'
                                        }`}>
                                            {res.change === 0 ? '-' : Math.abs(res.change)}
                                        </span>
                                    </div>
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