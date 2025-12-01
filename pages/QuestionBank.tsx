import React, { useState } from 'react';
import { Database, Filter, Plus, Search, Eye, Edit2, Trash2, CheckCircle, HelpCircle, Layers, X, Save, FileText, ChevronRight, ShoppingCart, List, Folder, AlertCircle } from 'lucide-react';
import { Question } from '../types';

// --- MOCK DATA ---
const MOCK_QUESTIONS: Question[] = [
  { 
    id: 'Q1001', 
    type: 'SingleChoice', 
    subject: 'Math', 
    grade: 'High School', 
    difficulty: 2, 
    content: '已知函数 $f(x) = x^2 + 2x$，则 $f\'(1)$ 的值是？', 
    options: ['2', '3', '4', '5'], 
    answer: 'C (4)', 
    analysis: '对函数求导得 $f\'(x) = 2x + 2$，代入 $x=1$ 得 $f\'(1) = 2(1) + 2 = 4$。故选 C。',
    knowledgePoint: '导数的运算', 
    source: '2024年北京市海淀区高三期中考',
    tags: ['基础', '导数'], 
    createdAt: '2024-11-01', 
    author: 'Dr. Chen' 
  },
  { 
    id: 'Q1002', 
    type: 'MultipleChoice', 
    subject: 'Physics', 
    grade: 'High School', 
    difficulty: 3, 
    content: '下列物理量中，属于矢量的有？', 
    options: ['质量 (Mass)', '速度 (Velocity)', '力 (Force)', '温度 (Temperature)'], 
    answer: 'BC', 
    analysis: '矢量是既有大小又有方向的物理量。速度和力都是矢量；质量和温度只有大小没有方向，是标量。',
    knowledgePoint: '运动的描述', 
    source: '2023年全国物理竞赛预赛',
    tags: ['概念辨析'], 
    createdAt: '2024-11-02', 
    author: 'Mr. Brown' 
  },
  { 
    id: 'Q1003', 
    type: 'FillBlank', 
    subject: 'English', 
    grade: 'Middle School', 
    difficulty: 1, 
    content: 'She ______ (go) to school by bus every day.', 
    answer: 'goes', 
    analysis: 'every day 是一般现在时的标志词，主语 She 是第三人称单数，故谓语动词用 goes。',
    knowledgePoint: '一般现在时', 
    source: '2024年杭州中考英语真题',
    tags: ['Grammar'], 
    createdAt: '2024-11-03', 
    author: 'Ms. Zhang' 
  },
  { 
    id: 'Q1004', 
    type: 'Essay', 
    subject: 'Math', 
    grade: 'High School', 
    difficulty: 5, 
    content: '求证：$\sqrt{2}$ 是无理数。', 
    answer: '略 (见解析)', 
    analysis: '使用反证法。假设 $\sqrt{2}$ 是有理数，则可设 $\sqrt{2} = p/q$ (p,q互质)...最后推出矛盾。',
    knowledgePoint: '反证法', 
    source: '经典例题',
    tags: ['证明题', '逻辑'], 
    createdAt: '2024-11-05', 
    author: 'Dr. Chen' 
  },
  { 
    id: 'Q1005', 
    type: 'SingleChoice', 
    subject: 'Chemistry', 
    grade: 'High School', 
    difficulty: 2, 
    content: '常温下，将 0.01 mol/L 的 HCl 溶液稀释 10 倍，pH 变为？', 
    options: ['1', '2', '3', '4'], 
    answer: 'C (3)', 
    analysis: '0.01 mol/L HCl 的 pH = -lg(0.01) = 2。稀释 10 倍后浓度为 0.001 mol/L，pH = 3。',
    knowledgePoint: 'pH的计算', 
    source: '2024年期末模拟',
    tags: ['酸碱平衡'], 
    createdAt: '2024-11-06', 
    author: 'Ms. Liu' 
  },
];

// --- TREE DATA (MOCK) ---
const KNOWLEDGE_TREE = [
    { title: '集合与常用逻辑用语', id: 'T1' },
    { title: '一元二次函数、方程和不等式', id: 'T2' },
    { title: '函数的概念与性质', id: 'T3', children: [
        { title: '函数的概念', id: 'T3-1' },
        { title: '函数的单调性', id: 'T3-2' },
        { title: '函数的奇偶性', id: 'T3-3' },
    ]},
    { title: '导数及其应用', id: 'T4', children: [
        { title: '导数的概念', id: 'T4-1' },
        { title: '导数的运算', id: 'T4-2' },
        { title: '导数在研究函数中的应用', id: 'T4-3' },
    ]},
];

// --- TYPES ---
type FilterType = {
    stage: string;
    subject: string;
    type: string;
    difficulty: string;
};

export const QuestionBank: React.FC = () => {
  // Filters
  const [filters, setFilters] = useState<FilterType>({
      stage: 'High School',
      subject: 'Math',
      type: 'All',
      difficulty: 'All'
  });
  const [activeKnowledgeId, setActiveKnowledgeId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  // Data
  const [questions, setQuestions] = useState<Question[]>(MOCK_QUESTIONS);
  
  // Interaction
  const [paperBasket, setPaperBasket] = useState<string[]>([]);
  const [expandedAnalysis, setExpandedAnalysis] = useState<Set<string>>(new Set());
  
  // Modal State (Create/Edit)
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingQuestion, setEditingQuestion] = useState<Partial<Question>>({});

  // --- Logic ---
  const filteredQuestions = questions.filter(q => {
      const matchStage = filters.stage === 'All' || q.grade === filters.stage;
      const matchSubject = filters.subject === 'All' || q.subject === filters.subject;
      const matchType = filters.type === 'All' || q.type === filters.type;
      const matchDifficulty = filters.difficulty === 'All' || 
                              (filters.difficulty === 'Easy' && q.difficulty <= 2) ||
                              (filters.difficulty === 'Medium' && q.difficulty === 3) ||
                              (filters.difficulty === 'Hard' && q.difficulty >= 4);
      
      const matchSearch = q.content.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          q.knowledgePoint?.toLowerCase().includes(searchTerm.toLowerCase());
      
      // Mock knowledge point filtering (if we had IDs linked)
      // For now just basic
      return matchStage && matchSubject && matchType && matchDifficulty && matchSearch;
  });

  const toggleAnalysis = (id: string) => {
      const newSet = new Set(expandedAnalysis);
      if (newSet.has(id)) newSet.delete(id);
      else newSet.add(id);
      setExpandedAnalysis(newSet);
  };

  const toggleBasket = (id: string) => {
      if (paperBasket.includes(id)) {
          setPaperBasket(prev => prev.filter(pid => pid !== id));
      } else {
          setPaperBasket(prev => [...prev, id]);
      }
  };

  const handleDelete = (id: string) => {
      if(confirm('确定删除该试题吗？')) setQuestions(questions.filter(q => q.id !== id));
  };

  const handleSave = () => {
      if(!editingQuestion.content) return;
      if(editingQuestion.id) {
          setQuestions(questions.map(q => q.id === editingQuestion.id ? {...q, ...editingQuestion} as Question : q));
      } else {
          setQuestions([{...editingQuestion as Question, id: `Q${Date.now()}`, createdAt: new Date().toISOString().split('T')[0]}, ...questions]);
      }
      setIsModalOpen(false);
  };

  const FilterRow = ({ label, options, value, onChange }: { label: string, options: {label: string, value: string}[], value: string, onChange: (val: string) => void }) => (
      <div className="flex items-start gap-4 text-sm py-2 border-b border-slate-100 last:border-0">
          <span className="text-slate-500 font-medium whitespace-nowrap pt-1 w-16">{label}</span>
          <div className="flex flex-wrap gap-2">
              {options.map(opt => (
                  <button
                    key={opt.value}
                    onClick={() => onChange(opt.value)}
                    className={`px-3 py-1 rounded hover:text-brand-600 transition-colors ${
                        value === opt.value ? 'bg-brand-600 text-white hover:text-white' : 'text-slate-700 bg-transparent hover:bg-slate-100'
                    }`}
                  >
                      {opt.label}
                  </button>
              ))}
          </div>
      </div>
  );

  return (
    <div className="flex h-[calc(100vh-64px)] overflow-hidden bg-slate-50">
      
      {/* LEFT SIDEBAR: KNOWLEDGE TREE */}
      <div className="w-64 bg-white border-r border-slate-200 flex flex-col flex-shrink-0">
          <div className="p-4 border-b border-slate-200">
              <h3 className="font-bold text-slate-800 flex items-center gap-2">
                  <Layers size={18} className="text-brand-600"/> 知识点导航
              </h3>
          </div>
          <div className="flex-1 overflow-y-auto p-2">
              <div className="text-xs font-bold text-slate-400 uppercase px-2 mb-2 tracking-wider">
                  {filters.stage === 'All' ? 'High School' : filters.stage} · {filters.subject}
              </div>
              {KNOWLEDGE_TREE.map(node => (
                  <div key={node.id} className="mb-1">
                      <div 
                        className={`flex items-center gap-2 px-3 py-2 rounded cursor-pointer transition-colors ${activeKnowledgeId === node.id ? 'bg-brand-50 text-brand-700 font-medium' : 'text-slate-600 hover:bg-slate-50'}`}
                        onClick={() => setActiveKnowledgeId(node.id)}
                      >
                          <Folder size={16} className={activeKnowledgeId === node.id ? 'text-brand-500 fill-brand-100' : 'text-slate-400'}/>
                          <span className="truncate">{node.title}</span>
                      </div>
                      {node.children && (
                          <div className="pl-6 border-l border-slate-100 ml-3 mt-1 space-y-1">
                              {node.children.map(child => (
                                  <div 
                                    key={child.id} 
                                    onClick={() => setActiveKnowledgeId(child.id)}
                                    className={`text-sm py-1 px-2 rounded cursor-pointer ${activeKnowledgeId === child.id ? 'text-brand-600 bg-brand-50' : 'text-slate-500 hover:text-slate-800'}`}
                                  >
                                      {child.title}
                                  </div>
                              ))}
                          </div>
                      )}
                  </div>
              ))}
          </div>
      </div>

      {/* MAIN CONTENT */}
      <div className="flex-1 flex flex-col min-w-0">
          
          {/* HEADER & FILTERS */}
          <div className="bg-white border-b border-slate-200 p-6 shadow-sm z-10">
              <div className="flex justify-between items-center mb-6">
                  <div>
                      <h1 className="text-2xl font-bold text-slate-900">题库资源 Question Bank</h1>
                      <p className="text-slate-500 text-sm mt-1">海量试题 · 智能组卷 · 精准解析</p>
                  </div>
                  <div className="flex gap-3">
                      <div className="relative">
                          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                          <input 
                            type="text" 
                            placeholder="搜索题干关键词..." 
                            className="pl-9 pr-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 w-64"
                            value={searchTerm}
                            onChange={e => setSearchTerm(e.target.value)}
                          />
                      </div>
                      <button 
                        onClick={() => { setEditingQuestion({}); setIsModalOpen(true); }}
                        className="flex items-center px-4 py-2 bg-brand-600 text-white rounded-lg hover:bg-brand-700 transition-colors shadow-sm font-medium text-sm"
                      >
                          <Plus size={16} className="mr-2"/> 录入试题
                      </button>
                  </div>
              </div>

              <div className="bg-slate-50 rounded-lg p-4 border border-slate-100 space-y-1">
                  <FilterRow 
                    label="学段" 
                    value={filters.stage} 
                    onChange={(v) => setFilters({...filters, stage: v})}
                    options={[
                        {label: '全部', value: 'All'},
                        {label: '高中', value: 'High School'},
                        {label: '初中', value: 'Middle School'},
                        {label: '小学', value: 'Primary School'}
                    ]}
                  />
                  <FilterRow 
                    label="学科" 
                    value={filters.subject} 
                    onChange={(v) => setFilters({...filters, subject: v})}
                    options={[
                        {label: '全部', value: 'All'},
                        {label: '数学', value: 'Math'},
                        {label: '物理', value: 'Physics'},
                        {label: '化学', value: 'Chemistry'},
                        {label: '英语', value: 'English'},
                        {label: '语文', value: 'Chinese'}
                    ]}
                  />
                  <FilterRow 
                    label="题型" 
                    value={filters.type} 
                    onChange={(v) => setFilters({...filters, type: v})}
                    options={[
                        {label: '全部', value: 'All'},
                        {label: '单选题', value: 'SingleChoice'},
                        {label: '多选题', value: 'MultipleChoice'},
                        {label: '填空题', value: 'FillBlank'},
                        {label: '解答题', value: 'Essay'}
                    ]}
                  />
                  <FilterRow 
                    label="难度" 
                    value={filters.difficulty} 
                    onChange={(v) => setFilters({...filters, difficulty: v})}
                    options={[
                        {label: '全部', value: 'All'},
                        {label: '简单 (1-2)', value: 'Easy'},
                        {label: '中等 (3)', value: 'Medium'},
                        {label: '困难 (4-5)', value: 'Hard'}
                    ]}
                  />
              </div>
          </div>

          {/* QUESTIONS LIST */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-slate-50/50">
              {filteredQuestions.map(q => (
                  <div key={q.id} className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow group">
                      
                      {/* Meta Header */}
                      <div className="flex justify-between items-start mb-4">
                          <div className="flex items-center gap-2 text-xs">
                              <span className={`px-2 py-0.5 rounded border font-medium ${
                                  q.type === 'SingleChoice' ? 'bg-blue-50 text-blue-700 border-blue-100' :
                                  q.type === 'Essay' ? 'bg-purple-50 text-purple-700 border-purple-100' :
                                  'bg-slate-50 text-slate-700 border-slate-200'
                              }`}>
                                  {q.type}
                              </span>
                              <span className="flex gap-0.5" title={`Difficulty: ${q.difficulty}`}>
                                  {Array.from({length: 5}).map((_,i) => (
                                      <div key={i} className={`w-1.5 h-1.5 rounded-full ${i < q.difficulty ? 'bg-amber-400' : 'bg-slate-200'}`}></div>
                                  ))}
                              </span>
                              <span className="text-slate-400 px-2 border-l border-slate-200">{q.source || '校本题库'}</span>
                              <span className="text-slate-400">{q.createdAt}</span>
                          </div>
                          
                          <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                              <button onClick={() => { setEditingQuestion(q); setIsModalOpen(true); }} className="p-1.5 text-slate-400 hover:text-brand-600 hover:bg-slate-100 rounded">
                                  <Edit2 size={16}/>
                              </button>
                              <button onClick={() => handleDelete(q.id)} className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-slate-100 rounded">
                                  <Trash2 size={16}/>
                              </button>
                          </div>
                      </div>

                      {/* Content */}
                      <div className="mb-4">
                          <p className="text-slate-900 text-lg leading-relaxed font-serif">{q.content}</p>
                          {q.options && q.options.length > 0 && (
                              <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                                  {q.options.map((opt, idx) => (
                                      <div key={idx} className="flex items-center gap-2 text-slate-700">
                                          <span className="w-6 h-6 rounded-full border border-slate-300 flex items-center justify-center text-xs font-bold text-slate-500 flex-shrink-0">
                                              {String.fromCharCode(65+idx)}
                                          </span>
                                          <span>{opt}</span>
                                      </div>
                                  ))}
                              </div>
                          )}
                      </div>

                      {/* Footer Actions */}
                      <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                          <div className="flex gap-4">
                              <button 
                                onClick={() => toggleAnalysis(q.id)}
                                className={`text-sm font-medium flex items-center gap-1 transition-colors ${expandedAnalysis.has(q.id) ? 'text-brand-600' : 'text-slate-500 hover:text-brand-600'}`}
                              >
                                  {expandedAnalysis.has(q.id) ? '收起解析' : '查看解析'} <ChevronRight size={14} className={`transition-transform ${expandedAnalysis.has(q.id) ? 'rotate-90' : ''}`}/>
                              </button>
                              <div className="flex items-center gap-2 text-xs text-slate-400">
                                  <Layers size={14}/> 知识点: <span className="text-slate-600">{q.knowledgePoint}</span>
                              </div>
                          </div>
                          
                          <button 
                            onClick={() => toggleBasket(q.id)}
                            className={`flex items-center gap-2 px-4 py-1.5 rounded-lg text-sm font-medium transition-all ${
                                paperBasket.includes(q.id) 
                                ? 'bg-amber-100 text-amber-700 border border-amber-200' 
                                : 'bg-white border border-brand-200 text-brand-600 hover:bg-brand-50'
                            }`}
                          >
                              {paperBasket.includes(q.id) ? (
                                  <><CheckCircle size={16}/> 已加入试卷</>
                              ) : (
                                  <><Plus size={16}/> 加入试卷</>
                              )}
                          </button>
                      </div>

                      {/* Hidden Analysis Section */}
                      {expandedAnalysis.has(q.id) && (
                          <div className="mt-4 p-4 bg-slate-50 rounded-lg border border-slate-100 text-sm animate-fade-in">
                              <div className="mb-2">
                                  <span className="font-bold text-emerald-600 mr-2">[正确答案]</span>
                                  <span className="font-mono text-slate-800 font-bold">{q.answer}</span>
                              </div>
                              <div>
                                  <span className="font-bold text-slate-700 mr-2 block mb-1">[试题解析]</span>
                                  <p className="text-slate-600 leading-relaxed">{q.analysis || '暂无详细解析'}</p>
                              </div>
                          </div>
                      )}
                  </div>
              ))}
              
              {filteredQuestions.length === 0 && (
                  <div className="py-20 text-center text-slate-400 flex flex-col items-center">
                      <Database size={48} className="mb-4 opacity-30"/>
                      <p>未找到符合条件的题目，请尝试调整筛选条件</p>
                  </div>
              )}
          </div>
      </div>

      {/* FLOATING BASKET WIDGET */}
      <div className="fixed bottom-8 right-8 z-50">
          <button className="relative bg-brand-600 hover:bg-brand-700 text-white p-4 rounded-full shadow-lg shadow-brand-200 transition-all hover:scale-105 flex items-center justify-center group">
              <ShoppingCart size={24} />
              {paperBasket.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold w-6 h-6 flex items-center justify-center rounded-full border-2 border-white">
                      {paperBasket.length}
                  </span>
              )}
              {/* Tooltip-like popup on hover/focus could go here */}
              <div className="absolute bottom-full right-0 mb-3 hidden group-hover:block w-48 bg-white border border-slate-200 rounded-xl shadow-xl p-4 text-slate-800 animate-fade-in-up">
                  <h4 className="font-bold text-sm mb-2 border-b border-slate-100 pb-2">试卷篮 (Paper Basket)</h4>
                  <p className="text-xs text-slate-500 mb-3">已选 {paperBasket.length} 道试题</p>
                  <button className="w-full bg-brand-600 text-white text-xs py-2 rounded hover:bg-brand-700">去组卷</button>
              </div>
          </button>
      </div>

      {/* EDIT MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4 animate-fade-in">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-3xl overflow-hidden animate-scale-up flex flex-col max-h-[90vh]">
            <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-slate-50">
              <h3 className="text-lg font-bold text-slate-900">
                 {editingQuestion.id ? '编辑试题' : '录入新题'}
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-600 p-1 rounded-full"><X size={20}/></button>
            </div>
            <div className="p-6 overflow-y-auto space-y-4">
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-bold text-slate-700 mb-1">学科</label>
                        <select className="w-full px-3 py-2 border border-slate-200 rounded-lg" value={editingQuestion.subject} onChange={e => setEditingQuestion({...editingQuestion, subject: e.target.value})}>
                            <option>Math</option><option>Physics</option><option>Chemistry</option><option>English</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-slate-700 mb-1">题型</label>
                        <select className="w-full px-3 py-2 border border-slate-200 rounded-lg" value={editingQuestion.type} onChange={e => setEditingQuestion({...editingQuestion, type: e.target.value as any})}>
                            <option value="SingleChoice">单选</option><option value="MultipleChoice">多选</option><option value="FillBlank">填空</option><option value="Essay">解答</option>
                        </select>
                    </div>
                </div>
                <div>
                    <label className="block text-sm font-bold text-slate-700 mb-1">题干内容</label>
                    <textarea className="w-full px-3 py-2 border border-slate-200 rounded-lg h-24" value={editingQuestion.content} onChange={e => setEditingQuestion({...editingQuestion, content: e.target.value})} placeholder="输入题目..."></textarea>
                </div>
                <div>
                    <label className="block text-sm font-bold text-slate-700 mb-1">答案解析</label>
                    <textarea className="w-full px-3 py-2 border border-slate-200 rounded-lg h-20" value={editingQuestion.analysis} onChange={e => setEditingQuestion({...editingQuestion, analysis: e.target.value})} placeholder="输入详细解析..."></textarea>
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-bold text-slate-700 mb-1">正确答案</label>
                        <input type="text" className="w-full px-3 py-2 border border-slate-200 rounded-lg" value={editingQuestion.answer} onChange={e => setEditingQuestion({...editingQuestion, answer: e.target.value})}/>
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-slate-700 mb-1">知识点</label>
                        <input type="text" className="w-full px-3 py-2 border border-slate-200 rounded-lg" value={editingQuestion.knowledgePoint} onChange={e => setEditingQuestion({...editingQuestion, knowledgePoint: e.target.value})}/>
                    </div>
                </div>
            </div>
            <div className="p-4 border-t border-slate-100 bg-slate-50 flex justify-end gap-3">
                <button onClick={() => setIsModalOpen(false)} className="px-4 py-2 border border-slate-200 rounded-lg bg-white hover:bg-slate-50">取消</button>
                <button onClick={handleSave} className="px-4 py-2 bg-brand-600 text-white rounded-lg hover:bg-brand-700">保存</button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};