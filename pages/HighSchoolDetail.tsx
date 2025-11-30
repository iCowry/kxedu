import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ChevronLeft, MapPin, Phone, GraduationCap, TrendingUp, School, Edit2, Plus, Trash2, X, Save } from 'lucide-react';
import { HighSchool, AdmissionScore } from '../types';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// --- MOCK DATA ---
const MOCK_SCORES: AdmissionScore[] = [
  { year: 2024, batch: '统招批次', score: 658, rankRequirement: 1200 },
  { year: 2023, batch: '统招批次', score: 654, rankRequirement: 1150 },
  { year: 2022, batch: '统招批次', score: 651, rankRequirement: 1300 },
  { year: 2021, batch: '统招批次', score: 645, rankRequirement: 1280 },
];

const MOCK_HS_DETAIL: HighSchool = {
  rank: 1,
  name: '人民大学附属中学',
  city: '北京',
  district: '海淀区',
  tags: ['省重点', '示范高中', '超级中学'],
  enrollmentRate: 98.5,
  topScore: 708,
  address: '北京市海淀区中关村大街37号',
  phone: '010-62512094',
  description: '中国人民大学附属中学（The High School Affiliated to Renmin University of China），简称“人大附中”，是北京市首批示范高中校。学校享誉中外，办学成绩斐然，历年高考成绩均名列北京市前茅，是国内顶尖的超级中学之一，培养了众多优秀人才。',
  admissionScores: MOCK_SCORES
};

export const HighSchoolDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  // State for scores to allow editing
  const [scores, setScores] = useState<AdmissionScore[]>(MOCK_SCORES);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  // New Score Form State
  const [newScore, setNewScore] = useState<AdmissionScore>({
    year: new Date().getFullYear(),
    batch: '统招批次',
    score: 0,
    rankRequirement: 0
  });

  const school = { ...MOCK_HS_DETAIL, name: id === '1' ? MOCK_HS_DETAIL.name : '示范高中示例' };

  // Prepare chart data: Sort by year ascending for correct graph display
  const chartData = [...scores].sort((a, b) => a.year - b.year);

  const handleDeleteScore = (index: number) => {
    const updatedScores = scores.filter((_, i) => i !== index);
    setScores(updatedScores);
  };

  const handleAddScore = () => {
    if (newScore.score > 0 && newScore.year > 2000) {
      setScores([...scores, newScore]);
      setNewScore({ year: new Date().getFullYear(), batch: '统招批次', score: 0, rankRequirement: 0 });
    }
  };

  return (
    <div className="p-8 space-y-6">
       {/* Breadcrumb / Back */}
       <div className="flex items-center gap-2 mb-4">
        <button onClick={() => navigate(-1)} className="p-2 hover:bg-slate-100 rounded-lg text-slate-500">
          <ChevronLeft size={20} />
        </button>
        <span className="text-slate-500">/ 院校排行 / 高中详情</span>
      </div>

      {/* Header Profile Card */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-red-50 rounded-full -mr-20 -mt-20 opacity-60 pointer-events-none"></div>
        <div className="relative z-10 flex flex-col md:flex-row gap-8 items-start">
           <div className="w-24 h-24 rounded-lg bg-red-700 flex items-center justify-center text-white font-bold text-4xl shadow-md flex-shrink-0">
              <School size={40} />
           </div>
           <div className="flex-1">
              <div className="flex flex-col md:flex-row md:items-center gap-4 mb-2">
                 <h1 className="text-3xl font-bold text-slate-900">{school.name}</h1>
                 <div className="flex gap-2">
                    {school.tags.map(tag => (
                        <span key={tag} className="bg-red-50 text-red-700 text-xs px-2 py-1 rounded border border-red-100 font-medium">
                            {tag}
                        </span>
                    ))}
                 </div>
              </div>
              <p className="text-slate-500 text-sm flex items-center gap-2 mb-6">
                <MapPin size={14}/> {school.city} · {school.district}
                <span className="mx-1 text-slate-300">|</span>
                <Phone size={14}/> {school.phone}
              </p>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-6 border-t border-slate-100">
                  <div>
                      <p className="text-xs text-slate-500 mb-1">重点本科录取率</p>
                      <p className="text-2xl font-bold text-emerald-600">{school.enrollmentRate}%</p>
                  </div>
                  <div>
                      <p className="text-xs text-slate-500 mb-1">高考最高分(参考)</p>
                      <p className="text-2xl font-bold text-amber-600">{school.topScore}</p>
                  </div>
                   <div>
                      <p className="text-xs text-slate-500 mb-1">中考录取均分</p>
                      <p className="text-2xl font-bold text-brand-600">{scores.length > 0 ? (scores.reduce((acc, curr) => acc + curr.score, 0) / scores.length).toFixed(0) : '-'}</p>
                  </div>
              </div>
           </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Scores & Analysis */}
        <div className="lg:col-span-2 space-y-6">
             {/* Score Trend Chart */}
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
                <h3 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
                    <TrendingUp className="text-brand-600" size={20}/>
                    历年录取分数线趋势 (统招)
                </h3>
                <div className="h-72">
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                            <defs>
                                <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
                                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                                </linearGradient>
                            </defs>
                            <XAxis dataKey="year" axisLine={false} tickLine={false} tick={{fill: '#64748b'}} />
                            <YAxis domain={['dataMin - 10', 'dataMax + 10']} axisLine={false} tickLine={false} tick={{fill: '#64748b'}} />
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                            <Tooltip 
                                contentStyle={{ backgroundColor: '#fff', borderRadius: '8px', border: '1px solid #e2e8f0' }}
                                labelStyle={{ color: '#64748b' }}
                            />
                            <Area type="monotone" dataKey="score" stroke="#3b82f6" fillOpacity={1} fill="url(#colorScore)" name="录取分数" />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* Score Table */}
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="p-4 border-b border-slate-100 bg-slate-50/50 flex justify-between items-center">
                    <h3 className="font-bold text-slate-800">详细录取数据</h3>
                    <button 
                      onClick={() => setIsEditModalOpen(true)}
                      className="text-sm flex items-center gap-1 text-brand-600 hover:text-brand-700 font-medium px-3 py-1.5 rounded-lg hover:bg-brand-50 transition-colors"
                    >
                      <Edit2 size={14}/> 管理分数线
                    </button>
                </div>
                <table className="w-full text-left">
                    <thead className="bg-slate-50 text-slate-500 text-xs uppercase font-semibold">
                        <tr>
                            <th className="px-6 py-4">年份</th>
                            <th className="px-6 py-4">录取批次</th>
                            <th className="px-6 py-4">录取分数线</th>
                            <th className="px-6 py-4">对应区排名 (参考)</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {[...scores].sort((a,b) => b.year - a.year).map((item, idx) => (
                            <tr key={idx} className="hover:bg-slate-50">
                                <td className="px-6 py-4 font-medium text-slate-900">{item.year}</td>
                                <td className="px-6 py-4 text-sm text-slate-600">
                                    <span className="bg-blue-50 text-blue-700 px-2 py-0.5 rounded text-xs">{item.batch}</span>
                                </td>
                                <td className="px-6 py-4 font-bold text-slate-900">{item.score}</td>
                                <td className="px-6 py-4 text-sm text-slate-500">前 {item.rankRequirement} 名</td>
                            </tr>
                        ))}
                        {scores.length === 0 && (
                          <tr>
                            <td colSpan={4} className="text-center py-8 text-slate-400">暂无数据，请点击上方“管理分数线”添加</td>
                          </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>

        {/* Right Column: Info & Intro */}
        <div className="space-y-6">
             <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
                <h3 className="text-lg font-bold text-slate-900 mb-4">学校简介</h3>
                <p className="text-slate-600 text-sm leading-relaxed text-justify">
                    {school.description}
                </p>
                <div className="mt-4 pt-4 border-t border-slate-100">
                    <h4 className="font-bold text-sm text-slate-800 mb-2">学校地址</h4>
                    <p className="text-sm text-slate-500 flex items-start gap-2">
                        <MapPin size={16} className="mt-0.5 flex-shrink-0 text-slate-400"/>
                        {school.address}
                    </p>
                </div>
             </div>

             <div className="bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl p-6 text-white shadow-lg">
                <h3 className="font-bold mb-2 flex items-center gap-2">
                    <GraduationCap size={20}/> 升学喜报
                </h3>
                <p className="text-sm opacity-90 mb-4">
                    2024年高考，我校清北录取人数再创新高，共有XX人被清华大学、北京大学录取。
                </p>
                <button className="w-full bg-white text-emerald-600 py-2 rounded-lg text-sm font-bold hover:bg-slate-50 transition-colors">
                    查看详细榜单
                </button>
             </div>
        </div>
      </div>

      {/* EDIT MODAL */}
      {isEditModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4 animate-fade-in">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl overflow-hidden animate-scale-up flex flex-col max-h-[85vh]">
             <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-slate-50">
                <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                   <Edit2 size={18} className="text-brand-600"/> 管理录取分数线
                </h3>
                <button onClick={() => setIsEditModalOpen(false)} className="text-slate-400 hover:text-slate-600 hover:bg-slate-200 p-1 rounded-full transition-colors">
                  <X size={20} />
                </button>
             </div>
             
             <div className="p-6 overflow-y-auto flex-1">
                {/* Add New Row */}
                <div className="bg-slate-50 p-4 rounded-lg border border-slate-200 mb-6">
                    <h4 className="text-sm font-bold text-slate-700 mb-3 flex items-center gap-2"><Plus size={16}/> 添加新记录</h4>
                    <div className="grid grid-cols-5 gap-3">
                        <input 
                          type="number" placeholder="年份" 
                          className="px-3 py-2 border border-slate-200 rounded-md text-sm"
                          value={newScore.year}
                          onChange={e => setNewScore({...newScore, year: Number(e.target.value)})}
                        />
                        <select 
                          className="px-3 py-2 border border-slate-200 rounded-md text-sm col-span-2"
                          value={newScore.batch}
                          onChange={e => setNewScore({...newScore, batch: e.target.value})}
                        >
                            <option>统招批次</option>
                            <option>提前批</option>
                            <option>校额到校</option>
                            <option>国际部</option>
                        </select>
                        <input 
                          type="number" placeholder="分数" 
                          className="px-3 py-2 border border-slate-200 rounded-md text-sm"
                          value={newScore.score || ''}
                          onChange={e => setNewScore({...newScore, score: Number(e.target.value)})}
                        />
                        <button 
                          onClick={handleAddScore}
                          disabled={!newScore.score}
                          className="bg-brand-600 text-white rounded-md text-sm font-medium hover:bg-brand-700 disabled:opacity-50"
                        >
                          添加
                        </button>
                    </div>
                </div>

                {/* Edit List */}
                <h4 className="text-sm font-bold text-slate-700 mb-3">现有记录 ({scores.length})</h4>
                <div className="border border-slate-200 rounded-lg overflow-hidden">
                   <table className="w-full text-left">
                       <thead className="bg-slate-50 text-xs text-slate-500 uppercase">
                           <tr>
                               <th className="px-4 py-3">年份</th>
                               <th className="px-4 py-3">批次</th>
                               <th className="px-4 py-3">分数</th>
                               <th className="px-4 py-3 text-right">操作</th>
                           </tr>
                       </thead>
                       <tbody className="divide-y divide-slate-100">
                           {[...scores].sort((a,b) => b.year - a.year).map((item, idx) => (
                               <tr key={idx} className="hover:bg-slate-50">
                                   <td className="px-4 py-3 text-sm font-medium text-slate-900">{item.year}</td>
                                   <td className="px-4 py-3 text-sm text-slate-600">{item.batch}</td>
                                   <td className="px-4 py-3 text-sm font-bold text-slate-900">{item.score}</td>
                                   <td className="px-4 py-3 text-right">
                                       <button 
                                         onClick={() => handleDeleteScore(scores.indexOf(item))}
                                         className="text-red-400 hover:text-red-600 p-1 hover:bg-red-50 rounded"
                                       >
                                           <Trash2 size={16}/>
                                       </button>
                                   </td>
                               </tr>
                           ))}
                       </tbody>
                   </table>
                </div>
             </div>

             <div className="p-4 border-t border-slate-100 bg-slate-50 flex justify-end gap-3">
                 <button 
                    onClick={() => setIsEditModalOpen(false)} 
                    className="px-4 py-2 bg-brand-600 text-white rounded-lg hover:bg-brand-700 shadow-sm flex items-center gap-2"
                 >
                    <Save size={16} /> 保存更改
                 </button>
             </div>
          </div>
        </div>
      )}
    </div>
  );
};