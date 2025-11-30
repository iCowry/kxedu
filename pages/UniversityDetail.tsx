import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ChevronLeft, MapPin, Award, BookOpen, FlaskConical, Users, Globe, Phone, History, TrendingUp, Edit2, Plus, Trash2, X, Save } from 'lucide-react';
import { University, AdmissionScore } from '../types';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// --- MOCK DETAIL DATA ---
const MOCK_UNI_SCORES: AdmissionScore[] = [
    { year: 2024, batch: '本科一批', score: 685, rankRequirement: 500 },
    { year: 2023, batch: '本科一批', score: 682, rankRequirement: 480 },
    { year: 2022, batch: '本科一批', score: 678, rankRequirement: 520 },
];

const MOCK_UNI_DETAIL: University = {
  rank: 1,
  name: '清华大学',
  englishName: 'Tsinghua University',
  location: '北京 / Beijing',
  tags: ['985', '211', '双一流', 'C9联盟'],
  score: 98.5,
  logoColor: 'bg-purple-700',
  keyLabs: 13,
  aPlusCount: 21,
  academicians: 89,
  establishedYear: 1911,
  description: '清华大学（Tsinghua University），简称“清华”，位于北京市海淀区，是中华人民共和国教育部直属的全国重点大学，位列国家“双一流”、“985工程”、“211工程”，入选“2011计划”、“珠峰计划”、“强基计划”、“111计划”。学校前身清华学堂始建于1911年，校名“清华”源于校址“清华园”地名，是晚清政府设立的留美预备学校。',
  subjectRatings: [
    { name: '计算机科学与技术', grade: 'A+' },
    { name: '控制科学与工程', grade: 'A+' },
    { name: '材料科学与工程', grade: 'A+' },
    { name: '动力工程及工程热物理', grade: 'A+' },
    { name: '核科学与技术', grade: 'A+' },
    { name: '生物学', grade: 'A+' },
    { name: '力学', grade: 'A+' },
    { name: '机械工程', grade: 'A+' },
    { name: '仪器科学与技术', grade: 'A+' },
  ],
  admissionScores: MOCK_UNI_SCORES
};

export const UniversityDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>(); 
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'overview' | 'subjects' | 'scores'>('overview');
  
  // --- STATE FOR SCORES ---
  const [scores, setScores] = useState<AdmissionScore[]>(MOCK_UNI_SCORES);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [newScore, setNewScore] = useState<AdmissionScore>({
    year: new Date().getFullYear(),
    batch: '本科一批',
    score: 0,
    rankRequirement: 0
  });

  const uni = { ...MOCK_UNI_DETAIL, admissionScores: scores };

  // Handlers for Score Editing
  const handleDeleteScore = (index: number) => {
    setScores(scores.filter((_, i) => i !== index));
  };

  const handleAddScore = () => {
      if (newScore.score > 0) {
          setScores([...scores, newScore]);
          setNewScore({ year: new Date().getFullYear(), batch: '本科一批', score: 0, rankRequirement: 0 });
      }
  };

  // Sort for chart
  const chartData = [...scores].sort((a,b) => a.year - b.year);

  return (
    <div className="p-8 space-y-6">
      {/* Breadcrumb / Back */}
      <div className="flex items-center gap-2 mb-4">
        <button onClick={() => navigate(-1)} className="p-2 hover:bg-slate-100 rounded-lg text-slate-500">
          <ChevronLeft size={20} />
        </button>
        <span className="text-slate-500">/ 院校排行 / 大学详情</span>
      </div>

      {/* Header Profile Card */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-brand-50 rounded-full -mr-32 -mt-32 opacity-60 pointer-events-none"></div>
        <div className="relative z-10 flex flex-col md:flex-row gap-8 items-start">
           <div className={`w-32 h-32 rounded-xl ${uni.logoColor} flex items-center justify-center text-white font-bold text-5xl shadow-lg flex-shrink-0`}>
              {uni.name.charAt(0)}
           </div>
           <div className="flex-1">
              <div className="flex flex-col md:flex-row md:items-center gap-4 mb-2">
                 <h1 className="text-3xl font-bold text-slate-900">{uni.name}</h1>
                 <span className="text-xl text-slate-400 font-light">{uni.englishName}</span>
              </div>
              <div className="flex flex-wrap gap-2 mb-6">
                  {uni.tags.map(tag => (
                    <span key={tag} className={`px-2.5 py-0.5 rounded text-sm font-medium border ${
                        tag === '985' ? 'bg-blue-50 text-blue-700 border-blue-200' : 
                        tag === '211' ? 'bg-cyan-50 text-cyan-700 border-cyan-200' :
                        tag === '双一流' ? 'bg-purple-50 text-purple-700 border-purple-200' :
                        'bg-slate-50 text-slate-700 border-slate-200'
                    }`}>
                        {tag}
                    </span>
                  ))}
                  <span className="flex items-center gap-1 text-slate-500 text-sm ml-2">
                    <MapPin size={16}/> {uni.location}
                  </span>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-6 border-t border-slate-100">
                  <div>
                      <p className="text-xs text-slate-500 mb-1">综合排名</p>
                      <p className="text-2xl font-bold text-slate-900">#{uni.rank}</p>
                  </div>
                  <div>
                      <p className="text-xs text-slate-500 mb-1">A+ 学科数</p>
                      <p className="text-2xl font-bold text-amber-600">{uni.aPlusCount}</p>
                  </div>
                  <div>
                      <p className="text-xs text-slate-500 mb-1">国家重点实验室</p>
                      <p className="text-2xl font-bold text-brand-600">{uni.keyLabs}</p>
                  </div>
                  <div>
                      <p className="text-xs text-slate-500 mb-1">综合评分</p>
                      <p className="text-2xl font-bold text-emerald-600">{uni.score}</p>
                  </div>
              </div>
           </div>
        </div>
      </div>

       {/* Navigation Tabs */}
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
            <BookOpen size={18}/> 学校概况
          </button>
          <button
            onClick={() => setActiveTab('subjects')}
            className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors flex items-center gap-2 ${
              activeTab === 'subjects'
                ? 'border-brand-600 text-brand-600'
                : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
            }`}
          >
            <Award size={18}/> 学科评估
          </button>
           <button
            onClick={() => setActiveTab('scores')}
            className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors flex items-center gap-2 ${
              activeTab === 'scores'
                ? 'border-brand-600 text-brand-600'
                : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
            }`}
          >
            <TrendingUp size={18}/> 历年分数线
          </button>
        </nav>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: Main Content */}
        <div className="lg:col-span-2 space-y-6">
            {activeTab === 'overview' && (
                <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
                    <h3 className="text-lg font-bold text-slate-900 mb-4">学校简介</h3>
                    <p className="text-slate-600 leading-relaxed text-justify">
                        {uni.description}
                    </p>
                    
                    <h3 className="text-lg font-bold text-slate-900 mt-8 mb-4">科研实力</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="p-4 bg-slate-50 rounded-lg flex items-center gap-4">
                            <div className="p-3 bg-white rounded-full shadow-sm text-brand-600">
                                <FlaskConical size={24} />
                            </div>
                            <div>
                                <p className="text-slate-500 text-xs">国家重点实验室</p>
                                <p className="font-bold text-slate-900 text-lg">{uni.keyLabs} 个</p>
                            </div>
                        </div>
                        <div className="p-4 bg-slate-50 rounded-lg flex items-center gap-4">
                            <div className="p-3 bg-white rounded-full shadow-sm text-purple-600">
                                <Users size={24} />
                            </div>
                            <div>
                                <p className="text-slate-500 text-xs">两院院士</p>
                                <p className="font-bold text-slate-900 text-lg">{uni.academicians} 人</p>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {activeTab === 'subjects' && (
                <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                    <div className="p-4 border-b border-slate-100 bg-slate-50/50">
                        <h3 className="font-bold text-slate-800">第四轮学科评估结果 (部分)</h3>
                        <p className="text-xs text-slate-500 mt-1">A+学科代表该专业处于全国顶尖水平 (前2%)</p>
                    </div>
                    <table className="w-full text-left">
                        <thead className="bg-slate-50 text-slate-500 text-xs uppercase font-semibold">
                            <tr>
                                <th className="px-6 py-4">学科名称</th>
                                <th className="px-6 py-4 text-center">评级</th>
                                <th className="px-6 py-4">专业实力标签</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {uni.subjectRatings?.map((sub, idx) => (
                                <tr key={idx} className="hover:bg-slate-50">
                                    <td className="px-6 py-4 font-medium text-slate-900">{sub.name}</td>
                                    <td className="px-6 py-4 text-center">
                                        <span className={`inline-block px-3 py-1 rounded-md font-bold text-sm ${
                                            sub.grade === 'A+' ? 'bg-red-50 text-red-600 border border-red-100' :
                                            sub.grade === 'A' ? 'bg-brand-50 text-brand-600 border border-brand-100' :
                                            'bg-slate-100 text-slate-600'
                                        }`}>
                                            {sub.grade}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-slate-500">
                                        {sub.grade === 'A+' ? '★ 国家双一流建设学科' : '国家重点学科'}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {activeTab === 'scores' && (
                 <div className="space-y-6">
                    {/* Chart */}
                    <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
                        <h3 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
                            <TrendingUp className="text-brand-600" size={20}/>
                            录取分数线走势 (理科/物理组)
                        </h3>
                        <div className="h-72">
                             <ResponsiveContainer width="100%" height="100%">
                                <LineChart data={chartData}>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                                    <XAxis dataKey="year" axisLine={false} tickLine={false} tick={{fill: '#64748b'}} />
                                    <YAxis domain={['dataMin - 10', 'dataMax + 10']} axisLine={false} tickLine={false} tick={{fill: '#64748b'}} />
                                    <Tooltip contentStyle={{ borderRadius: '8px' }}/>
                                    <Line type="monotone" dataKey="score" stroke="#3b82f6" strokeWidth={3} dot={{r: 4}} activeDot={{r: 6}} name="录取分" />
                                </LineChart>
                             </ResponsiveContainer>
                        </div>
                    </div>
                    
                    {/* Table */}
                    <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                        <div className="p-4 border-b border-slate-100 bg-slate-50/50 flex justify-between items-center">
                            <h3 className="font-bold text-slate-800">历年录取数据</h3>
                            <button 
                                onClick={() => setIsEditModalOpen(true)}
                                className="flex items-center gap-1 text-sm text-brand-600 hover:text-brand-700 font-medium bg-brand-50 px-3 py-1.5 rounded-lg transition-colors"
                            >
                                <Edit2 size={14}/> 管理分数线
                            </button>
                        </div>
                        <table className="w-full text-left">
                            <thead className="bg-slate-50 text-slate-500 text-xs uppercase font-semibold">
                                <tr>
                                    <th className="px-6 py-4">年份</th>
                                    <th className="px-6 py-4">录取批次</th>
                                    <th className="px-6 py-4">平均分/最低分</th>
                                    <th className="px-6 py-4">最低位次</th>
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
                                        <td className="px-6 py-4 text-sm text-slate-500">{item.rankRequirement || '-'}</td>
                                    </tr>
                                ))}
                                {scores.length === 0 && (
                                    <tr><td colSpan={4} className="text-center py-6 text-slate-400">暂无数据</td></tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                 </div>
            )}
        </div>

        {/* Right Column: Info Sidebar */}
        <div className="space-y-6">
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
                <h3 className="text-sm font-bold text-slate-900 mb-4 uppercase tracking-wider">基本信息</h3>
                <ul className="space-y-4">
                    <li className="flex items-center justify-between text-sm">
                        <span className="flex items-center gap-2 text-slate-500"><History size={16}/> 建校年份</span>
                        <span className="font-medium text-slate-900">{uni.establishedYear}年</span>
                    </li>
                    <li className="flex items-center justify-between text-sm">
                        <span className="flex items-center gap-2 text-slate-500"><MapPin size={16}/> 所在地</span>
                        <span className="font-medium text-slate-900">{uni.location}</span>
                    </li>
                    <li className="flex items-center justify-between text-sm">
                        <span className="flex items-center gap-2 text-slate-500"><FlaskConical size={16}/> 办学性质</span>
                        <span className="font-medium text-slate-900">公立 / 综合类</span>
                    </li>
                </ul>
                <div className="border-t border-slate-100 my-4 pt-4 space-y-3">
                     <button className="w-full py-2 border border-slate-200 rounded-lg text-sm text-slate-600 hover:bg-slate-50 flex items-center justify-center gap-2">
                        <Globe size={16}/> 访问官网
                     </button>
                     <button className="w-full py-2 border border-slate-200 rounded-lg text-sm text-slate-600 hover:bg-slate-50 flex items-center justify-center gap-2">
                        <Phone size={16}/> 招生办电话
                     </button>
                </div>
            </div>

            <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl p-6 text-white shadow-lg">
                <h3 className="font-bold mb-2">报考指南</h3>
                <p className="text-sm opacity-90 mb-4">关注该校2025年最新招生简章与计划动态。</p>
                <button 
                  onClick={() => setActiveTab('scores')}
                  className="w-full bg-white text-brand-600 py-2 rounded-lg text-sm font-bold hover:bg-slate-50 transition-colors"
                >
                    查看历年分数线
                </button>
            </div>
        </div>
      </div>

       {/* EDIT MODAL FOR UNIVERSITY SCORES */}
      {isEditModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4 animate-fade-in">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl overflow-hidden animate-scale-up flex flex-col max-h-[85vh]">
             <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-slate-50">
                <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                   <Edit2 size={18} className="text-brand-600"/> 管理大学分数线
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
                            <option>本科一批</option>
                            <option>本科二批</option>
                            <option>强基计划</option>
                            <option>国家专项</option>
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