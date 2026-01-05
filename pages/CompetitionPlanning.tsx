
import React, { useState, useMemo } from 'react';
import { Target, Calendar, MapPin, Flag, ChevronRight, Users, Plus, Award, Zap, Code, FlaskConical, Book, List, GraduationCap, ArrowRight, Database, CheckSquare, Square, ChevronDown, Folder, FileText, X, Edit2, Clock, Check } from 'lucide-react';
import { Competition, TrainingPlan, Student, KnowledgeNode, Question } from '../types';

// --- MOCK DATA: COMPETITIONS & SQUAD ---
const MOCK_COMPETITIONS: Competition[] = [
  { id: 'C1', name: '全国高中数学联赛 (CSMO)', subject: 'Math', level: 'National', date: '2024-09-15', location: '本省各考点', status: 'Upcoming' },
  { id: 'C2', name: '中国数学奥林匹克 (CMO)', subject: 'Math', level: 'National', date: '2024-11-20', location: '上海', status: 'Upcoming' },
  { id: 'C3', name: '美国数学竞赛 (AMC 10/12)', subject: 'Math', level: 'International', date: '2024-11-08', location: '校内考点', status: 'Upcoming' },
  { id: 'C4', name: '全国中学生物理竞赛 (CPhO) 复赛', subject: 'Physics', level: 'National', date: '2024-09-21', location: '省会城市', status: 'Upcoming' },
  { id: 'C5', name: '物理碗 (PhysicsBowl)', subject: 'Physics', level: 'International', date: '2025-03-20', location: '校内考点', status: 'Upcoming' },
  { id: 'C6', name: '中国化学奥林匹克 (初赛)', subject: 'Chemistry', level: 'Provincial', date: '2024-09-02', location: '各市考点', status: 'Completed' },
  { id: 'C7', name: '全国青少年信息学奥林匹克联赛 (NOIP)', subject: 'Informatics', level: 'National', date: '2024-11-30', location: '指定机房', status: 'Upcoming' },
  { id: 'C8', name: 'CSP-S/J 认证', subject: 'Informatics', level: 'Provincial', date: '2024-09-21', location: '各市考点', status: 'Upcoming' },
  { id: 'CJ1', name: 'AMC 8', subject: 'Math', level: 'International', date: '2025-01-18', location: '校内考点', status: 'Upcoming' },
  { id: 'CJ2', name: 'CSP-J (入门级)', subject: 'Informatics', level: 'Provincial', date: '2024-09-21', location: '各市考点', status: 'Upcoming' },
];

const MOCK_SQUAD_MEMBERS: Student[] = [
    { id: 'S001', name: '张小明', grade: 'Grade 10', class: 'Class 1', gpa: 4.0, attendance: 100, status: 'Active', tags: ['Math Squad'] },
    { id: 'S005', name: '王伟', grade: 'Grade 11', class: 'Class 2', gpa: 3.9, attendance: 98, status: 'Active', tags: ['Math Squad', 'Physics Squad'] },
    { id: 'S008', name: '李华', grade: 'Grade 12', class: 'Class 1', gpa: 3.8, attendance: 96, status: 'Active', tags: ['Informatics Squad'] },
    { id: 'S012', name: '赵丽', grade: 'Grade 10', class: 'Class 3', gpa: 3.7, attendance: 99, status: 'Active', tags: ['Chemistry Squad'] },
    { id: 'S020', name: 'Junior Team A', grade: 'Grade 8', class: 'Class 5', gpa: 3.9, attendance: 100, status: 'Active', tags: ['Math Squad'] },
];

// --- ROADMAP DATA ---
type RoadmapPhase = {
    term: string;
    goal: string;
    topics: string[];
    books: string[];
};

type RoadmapDB = Record<string, Record<string, RoadmapPhase[]>>;

const ROADMAP_DATA: RoadmapDB = {
    'Math': {
        'Primary': [
            {
                term: '小学低年级 (趣味启蒙)',
                goal: '培养数感与逻辑思维，激发兴趣',
                topics: ['图形找规律', '巧算与速算', '逻辑推理谜题', '简单周期问题'],
                books: ['《高思学校竞赛数学导引》', '《举一反三》', '《汉声数学》']
            },
            {
                term: '小学高年级 (思维拓展)',
                goal: '构建奥数知识体系，备战小升初/AMC8',
                topics: ['行程问题', '数论初步', '组合计数', '平面几何面积'],
                books: ['《小学奥数教程》', '《明心数学资优教程》', 'AMC8 真题']
            }
        ],
        'Grade 10': [
            {
                term: '高一上 (基础夯实)',
                goal: '完成高中课内数学，接触竞赛一试内容',
                topics: ['集合与逻辑', '函数与导数基础', '三角函数', '平面向量', '立体几何'],
                books: ['《奥数教程·高一》', '《高中数学联赛备考手册》']
            },
            {
                term: '高一下 (进阶专题)',
                goal: '攻克代数变形与几何，为预赛做准备',
                topics: ['不等式', '解析几何', '复数', '排列组合基础'],
                books: ['《奥赛经典·代数》', '《奥赛经典·几何》', '小蓝本系列']
            }
        ]
    },
    'Physics': {
        'Grade 10': [
            {
                term: '高一上 (力学基础)',
                goal: '建立微积分物理思维，攻克静力学与运动学',
                topics: ['微积分基础', '运动学', '静力学', '牛顿运动定律'],
                books: ['《程稼夫·力学篇》', '《高等数学(同济版)》']
            }
        ]
    },
    'Informatics': {
        'Grade 10': [
            {
                term: '高一上 (语言与基础)',
                goal: '掌握C++语法与基础算法，通过CSP-J/S',
                topics: ['C++ 语法/STL', '排序/查找', '递归与递推', '贪心算法'],
                books: ['《算法竞赛入门经典(紫书)》', '《深入浅出程序设计竞赛》']
            }
        ]
    }
};

// --- DATA FOR LINKING: KNOWLEDGE NODES & QUESTIONS ---
const COMPETITION_NODES: KnowledgeNode[] = [
    // Primary Math
    { id: 'PM1', title: '计算综合', type: 'Chapter', stage: 'Primary', subject: 'Math' },
    { id: 'PM1-1', title: '乘法巧算', type: 'Point', stage: 'Primary', subject: 'Math', parentId: 'PM1', difficulty: 2 },
    { id: 'PM1-2', title: '定义新运算', type: 'Point', stage: 'Primary', subject: 'Math', parentId: 'PM1', difficulty: 3 },
    { id: 'PM2', title: '应用题专题', type: 'Chapter', stage: 'Primary', subject: 'Math' },
    { id: 'PM2-1', title: '和差倍问题', type: 'Point', stage: 'Primary', subject: 'Math', parentId: 'PM2', difficulty: 3 },
    { id: 'PM2-2', title: '鸡兔同笼', type: 'Point', stage: 'Primary', subject: 'Math', parentId: 'PM2', difficulty: 3 },
    
    // High School Math
    { id: 'HM1', title: '集合与逻辑', type: 'Chapter', stage: 'High', subject: 'Math' },
    { id: 'HM1-1', title: '集合的运算', type: 'Point', stage: 'High', subject: 'Math', parentId: 'HM1', difficulty: 1 },
    { id: 'HM2', title: '函数与导数', type: 'Chapter', stage: 'High', subject: 'Math' },
    { id: 'HM2-1', title: '函数的单调性', type: 'Point', stage: 'High', subject: 'Math', parentId: 'HM2', difficulty: 4 },
    { id: 'HM2-2', title: '导数的运算', type: 'Point', stage: 'High', subject: 'Math', parentId: 'HM2', difficulty: 3 },
];

const QUESTION_BANK: Question[] = [
    // Grade 4 Math
    { 
        id: 'Q-GS4-C1-01', type: 'FillBlank', content: '计算：125 × 32 × 25 = ______', answer: '100000', difficulty: 2, subject: 'Math', grade: 'Primary School', knowledgePointId: 'PM1-1', tags: ['计算'],
        createdAt: '2023-01-01', author: 'Math Team' 
    },
    { 
        id: 'Q-GS4-C1-03', type: 'FillBlank', content: '定义新运算 a ⊗ b = 3a + 2b，求 (4 ⊗ 5) ⊗ 2 = ______', answer: '70', difficulty: 3, subject: 'Math', grade: 'Primary School', knowledgePointId: 'PM1-2', tags: ['新定义'],
        createdAt: '2023-01-01', author: 'Math Team'
    },
    { 
        id: 'Q-GS4-APP-01', type: 'Essay', content: '甲、乙两堆货物共180吨，甲堆货物运走20吨后...', answer: '甲140, 乙40', difficulty: 3, subject: 'Math', grade: 'Primary School', knowledgePointId: 'PM2-1', tags: ['和倍'],
        createdAt: '2023-01-01', author: 'Math Team'
    },
    { 
        id: 'Q-GS4-APP-02', type: 'SingleChoice', content: '鸡兔同笼，头共35，足共94，问兔子有多少只？', options: ['12','23','10','25'], answer: 'A', difficulty: 3, subject: 'Math', grade: 'Primary School', knowledgePointId: 'PM2-2', tags: ['鸡兔同笼'],
        createdAt: '2023-01-01', author: 'Math Team'
    },
    
    // High School Math
    { 
        id: 'Q1001', type: 'SingleChoice', content: '已知函数 f(x) = x^2 + 2x，则 f\'(1) 的值是？', options: ['2', '3', '4', '5'], answer: 'C', difficulty: 2, subject: 'Math', grade: 'High School', knowledgePointId: 'HM2-2', tags: ['导数'],
        createdAt: '2023-01-01', author: 'Dr. Chen'
    },
    { 
        id: 'Q1004', type: 'Essay', content: '求证：√2 是无理数。', answer: '略', difficulty: 5, subject: 'Math', grade: 'High School', knowledgePointId: 'HM1', tags: ['逻辑'],
        createdAt: '2023-01-01', author: 'Dr. Chen'
    },
    { 
        id: 'Q-HM2-01', type: 'Essay', content: '讨论函数 f(x) = x - ln(x) 的单调性。', answer: '略', difficulty: 4, subject: 'Math', grade: 'High School', knowledgePointId: 'HM2-1', tags: ['单调性'],
        createdAt: '2023-01-01', author: 'Dr. Chen'
    },
];

// --- TYPES ---
interface TeachingPlan {
    id: string;
    title: string;
    stage: string;
    subject: string;
    duration: string;
    nodeCount: number;
    status: 'Draft' | 'Active' | 'Archived';
    author: string;
    description?: string;
    linkedQuestionIds?: string[];
}

const INITIAL_PLANS: TeachingPlan[] = [
    { id: 'TP1', title: '高三数学一轮复习：函数与导数', stage: 'High', subject: 'Math', duration: '6 周', nodeCount: 12, status: 'Active', author: '陈老师', description: '全面复习函数性质、导数计算及其应用。', linkedQuestionIds: ['Q1001', 'Q-HM2-01'] },
    { id: 'TP4', title: '四年级数学思维拓展', stage: 'Primary', subject: 'Math', duration: '1 学期', nodeCount: 20, status: 'Active', author: 'Math Team', description: '高思导引配套训练计划。', linkedQuestionIds: ['Q-GS4-C1-01', 'Q-GS4-APP-02'] },
];

export const CompetitionPlanning: React.FC = () => {
  const [activeSubject, setActiveSubject] = useState<'Math' | 'Physics' | 'Chemistry' | 'Informatics'>('Math');
  const [activeStage, setActiveStage] = useState<'Primary' | 'Middle' | 'Grade 10' | 'Grade 11' | 'Grade 12'>('Grade 10');

  const [plans, setPlans] = useState<TeachingPlan[]>(INITIAL_PLANS);
  const [isPlanEditModalOpen, setIsPlanEditModalOpen] = useState(false);
  const [editingPlan, setEditingPlan] = useState<Partial<TeachingPlan>>({});

  // Link Questions Modal
  const [isLinkModalOpen, setIsLinkModalOpen] = useState(false);
  const [currentLinkingPlan, setCurrentLinkingPlan] = useState<TeachingPlan | null>(null);
  const [selectedNodeForLinking, setSelectedNodeForLinking] = useState<KnowledgeNode | null>(null);
  const [tempLinkedQuestions, setTempLinkedQuestions] = useState<Set<string>>(new Set());
  const [expandedNodes, setExpandedNodes] = useState<Set<string>>(new Set(['PM1', 'PM2', 'HM1', 'HM2']));

  // Config
  const SUBJECT_CONFIG = {
      'Math': { icon: Target, color: 'text-blue-600', bg: 'bg-blue-50', border: 'border-blue-200', label: '数学竞赛' },
      'Physics': { icon: Zap, color: 'text-purple-600', bg: 'bg-purple-50', border: 'border-purple-200', label: '物理竞赛' },
      'Chemistry': { icon: FlaskConical, color: 'text-emerald-600', bg: 'bg-emerald-50', border: 'border-emerald-200', label: '化学竞赛' },
      'Informatics': { icon: Code, color: 'text-slate-700', bg: 'bg-slate-100', border: 'border-slate-300', label: '信息学奥赛' }
  };

  // Logic
  const filteredCompetitions = MOCK_COMPETITIONS.filter(c => c.subject === activeSubject).sort((a,b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  const filteredStudents = MOCK_SQUAD_MEMBERS.filter(s => s.tags?.some(tag => tag.includes(activeSubject)));
  const currentRoadmap = ROADMAP_DATA[activeSubject]?.[activeStage] || [];

  // Tree Logic
  const toggleExpand = (id: string) => {
    const newSet = new Set(expandedNodes);
    if (newSet.has(id)) newSet.delete(id);
    else newSet.add(id);
    setExpandedNodes(newSet);
  };

  const treeData = useMemo(() => {
      // Map stages for filtering
      const stageMap: Record<string, string> = { 'Primary': 'Primary', 'Grade 10': 'High', 'Grade 11': 'High', 'Grade 12': 'High', 'Middle': 'Middle' };
      const targetStage = currentLinkingPlan ? stageMap[currentLinkingPlan.stage] || 'High' : 'High';
      const targetSubject = currentLinkingPlan ? currentLinkingPlan.subject : 'Math';

      const nodes = COMPETITION_NODES.filter(n => n.stage === targetStage && n.subject === targetSubject);
      const nodeMap = new Map<string, KnowledgeNode>();
      nodes.forEach(n => nodeMap.set(n.id, { ...n, children: [] }));
      const roots: KnowledgeNode[] = [];
      nodes.forEach(n => {
          if (n.parentId && nodeMap.has(n.parentId)) {
              nodeMap.get(n.parentId)!.children!.push(nodeMap.get(n.id)!);
          } else {
              roots.push(nodeMap.get(n.id)!);
          }
      });
      return roots;
  }, [currentLinkingPlan]);

  const handleAddPlan = () => {
      const newPlan: TeachingPlan = {
          id: `TP-${Date.now()}`,
          title: '新建训练计划',
          stage: activeStage,
          subject: activeSubject,
          duration: '4 周',
          nodeCount: 0,
          status: 'Draft',
          author: '我'
      };
      setPlans([newPlan, ...plans]);
      setEditingPlan(newPlan);
      setIsPlanEditModalOpen(true);
  };

  const handleEditPlan = (plan: TeachingPlan) => {
      setEditingPlan({ ...plan });
      setIsPlanEditModalOpen(true);
  };

  const handleUpdatePlan = (e: React.FormEvent) => {
      e.preventDefault();
      if (editingPlan.id) {
          setPlans(prev => prev.map(p => p.id === editingPlan.id ? { ...p, ...editingPlan } as TeachingPlan : p));
      }
      setIsPlanEditModalOpen(false);
  };

  const handleOpenLink = (plan: TeachingPlan) => {
      setCurrentLinkingPlan(plan);
      setTempLinkedQuestions(new Set(plan.linkedQuestionIds || []));
      setSelectedNodeForLinking(null);
      setIsLinkModalOpen(true);
  };

  const handleToggleQuestion = (qId: string) => {
      const newSet = new Set(tempLinkedQuestions);
      if (newSet.has(qId)) newSet.delete(qId);
      else newSet.add(qId);
      setTempLinkedQuestions(newSet);
  };

  const handleSaveLinks = () => {
      if (currentLinkingPlan) {
          const updatedPlan = { ...currentLinkingPlan, linkedQuestionIds: Array.from(tempLinkedQuestions) };
          setPlans(prev => prev.map(p => p.id === currentLinkingPlan.id ? updatedPlan : p));
      }
      setIsLinkModalOpen(false);
      setCurrentLinkingPlan(null);
  };

  const TreeNode: React.FC<{ node: KnowledgeNode, level: number, onSelect: (node: KnowledgeNode) => void, selectedId?: string }> = ({ node, level, onSelect, selectedId }) => {
    const isExpanded = expandedNodes.has(node.id);
    const hasChildren = node.children && node.children.length > 0;
    const isSelected = selectedId === node.id;

    return (
      <div className="select-none">
        <div 
          className={`flex items-center gap-2 py-2 px-3 rounded-lg cursor-pointer transition-colors ${
            isSelected ? 'bg-brand-50 text-brand-700 font-medium' : 'hover:bg-slate-50 text-slate-700'
          }`}
          style={{ marginLeft: `${level * 16}px` }}
          onClick={() => onSelect(node)}
        >
          <button 
            className={`p-0.5 rounded hover:bg-black/5 ${!hasChildren ? 'invisible' : ''}`}
            onClick={(e) => { e.stopPropagation(); toggleExpand(node.id); }}
          >
            {isExpanded ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
          </button>
          
          {node.type === 'Chapter' ? <Folder size={16} className="text-amber-500 fill-amber-500/20"/> : <FileText size={16} className="text-emerald-500"/>}
          <span className="text-sm flex-1 truncate">{node.title}</span>
        </div>
        {isExpanded && node.children?.map(child => (
          <TreeNode key={child.id} node={child} level={level + 1} onSelect={onSelect} selectedId={selectedId} />
        ))}
      </div>
    );
  };

  return (
    <div className="p-8 space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">竞赛规划 Competition Planning</h1>
          <p className="text-slate-500 mt-1">学科竞赛训练营、赛事日历与全周期培养路线图。</p>
        </div>
      </div>

      {/* Subject Tabs */}
      <div className="flex gap-4 overflow-x-auto pb-2">
          {(Object.keys(SUBJECT_CONFIG) as Array<keyof typeof SUBJECT_CONFIG>).map(subject => {
              const Icon = SUBJECT_CONFIG[subject].icon;
              return (
                <button
                    key={subject}
                    onClick={() => setActiveSubject(subject)}
                    className={`flex items-center gap-2 px-6 py-3 rounded-xl border-2 transition-all ${
                        activeSubject === subject 
                        ? `${SUBJECT_CONFIG[subject].border} ${SUBJECT_CONFIG[subject].bg} ${SUBJECT_CONFIG[subject].color} shadow-sm font-bold` 
                        : 'border-white bg-white text-slate-500 hover:bg-slate-50'
                    }`}
                >
                    <Icon size={20} />
                    {SUBJECT_CONFIG[subject].label}
                </button>
              );
          })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Left Column: Curriculum Roadmap */}
          <div className="lg:col-span-2 space-y-6">
              
              {/* Detailed Roadmap Card */}
              <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                  <div className="p-6 border-b border-slate-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                      <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                          <Flag size={20} className={SUBJECT_CONFIG[activeSubject].color}/>
                          培养规划路线图
                      </h3>
                      
                      {/* Grade/Stage Tabs */}
                      <div className="flex bg-slate-100 rounded-lg p-1 overflow-x-auto max-w-full">
                          {(['Primary', 'Middle', 'Grade 10', 'Grade 11', 'Grade 12'] as const).map(stage => (
                              <button
                                key={stage}
                                onClick={() => setActiveStage(stage)}
                                className={`px-3 py-1.5 text-sm font-medium rounded-md transition-all whitespace-nowrap ${
                                    activeStage === stage 
                                    ? 'bg-white text-slate-900 shadow-sm' 
                                    : 'text-slate-500 hover:text-slate-700'
                                }`}
                              >
                                  {stage === 'Primary' ? '小学' : 
                                   stage === 'Middle' ? '初中' :
                                   stage === 'Grade 10' ? '高一' : 
                                   stage === 'Grade 11' ? '高二' : '高三'}
                              </button>
                          ))}
                      </div>
                  </div>
                  
                  <div className="p-6 bg-slate-50/30">
                      {currentRoadmap.length > 0 ? (
                          <div className="space-y-6">
                              {currentRoadmap.map((phase, idx) => (
                                  <div key={idx} className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm relative overflow-hidden group hover:border-brand-300 transition-colors">
                                      <div className={`absolute top-0 left-0 w-1.5 h-full ${
                                          idx === 0 ? 'bg-blue-500' : 'bg-indigo-500'
                                      }`}></div>
                                      
                                      <div className="flex flex-col md:flex-row gap-6">
                                          <div className="md:w-1/3">
                                              <div className="flex items-center gap-2 mb-2">
                                                  <span className="px-2 py-1 bg-slate-100 text-slate-600 text-xs font-bold rounded uppercase tracking-wider">
                                                      阶段 {idx + 1}
                                                  </span>
                                                  <h4 className="font-bold text-slate-900 text-lg">{phase.term}</h4>
                                              </div>
                                              <p className="text-sm text-slate-500 leading-relaxed">
                                                  <span className="font-semibold text-slate-700">阶段目标：</span>
                                                  {phase.goal}
                                              </p>
                                          </div>
                                          
                                          <div className="md:w-2/3 grid grid-cols-1 sm:grid-cols-2 gap-4">
                                              <div className="bg-slate-50 rounded-lg p-3">
                                                  <h5 className="text-xs font-bold text-slate-500 mb-2 flex items-center gap-1">
                                                      <List size={14}/> 核心知识点 (Topics)
                                                  </h5>
                                                  <ul className="space-y-1">
                                                      {phase.topics.map((topic, i) => (
                                                          <li key={i} className="text-sm text-slate-700 flex items-start gap-2">
                                                              <span className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-1.5 flex-shrink-0"></span>
                                                              {topic}
                                                          </li>
                                                      ))}
                                                  </ul>
                                              </div>
                                              <div className="bg-slate-50 rounded-lg p-3">
                                                  <h5 className="text-xs font-bold text-slate-500 mb-2 flex items-center gap-1">
                                                      <Book size={14}/> 推荐教材 (Books)
                                                  </h5>
                                                  <ul className="space-y-1">
                                                      {phase.books.map((book, i) => (
                                                          <li key={i} className="text-sm text-slate-700 flex items-start gap-2">
                                                              <span className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-1.5 flex-shrink-0"></span>
                                                              {book}
                                                          </li>
                                                      ))}
                                                  </ul>
                                              </div>
                                          </div>
                                      </div>
                                  </div>
                              ))}
                          </div>
                      ) : (
                          <div className="text-center py-12 text-slate-400">
                              该阶段暂无详细规划数据。
                          </div>
                      )}
                  </div>
              </div>

              {/* Training Plans List */}
              <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                  <div className="p-4 border-b border-slate-200 bg-slate-50/50 flex justify-between items-center">
                      <h3 className="font-bold text-slate-800 flex items-center gap-2">
                          <Target size={18} className={SUBJECT_CONFIG[activeSubject].color}/>
                          训练计划 ({getStageLabel(activeStage)} - {getSubjectLabel(activeSubject)})
                      </h3>
                      <button onClick={handleAddPlan} className="flex items-center px-3 py-1.5 bg-brand-600 text-white rounded-lg hover:bg-brand-700 text-xs font-medium">
                          <Plus size={14} className="mr-1"/> 创建计划
                      </button>
                  </div>
                  <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                      {plans.filter(p => p.subject === activeSubject && 
                          ((p.stage === 'Primary' && activeStage === 'Primary') || 
                           (p.stage === 'High' && activeStage.startsWith('Grade')))).map(plan => (
                          <div key={plan.id} className="border border-slate-200 rounded-xl p-4 hover:shadow-md transition-all bg-white flex flex-col">
                              <div className="flex justify-between items-start mb-2">
                                  <h4 className="font-bold text-slate-900 text-sm line-clamp-1">{plan.title}</h4>
                                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${plan.status === 'Active' ? 'bg-emerald-50 text-emerald-700 border-emerald-100' : 'bg-slate-50 text-slate-500'}`}>
                                      {plan.status}
                                  </span>
                              </div>
                              <p className="text-xs text-slate-500 line-clamp-2 mb-3 flex-1">{plan.description}</p>
                              <div className="flex items-center justify-between mt-auto pt-3 border-t border-slate-50">
                                  <span className="text-xs text-slate-400 flex items-center gap-1"><Database size={12}/> {plan.linkedQuestionIds?.length || 0} 题</span>
                                  <button 
                                    onClick={() => handleOpenLink(plan)}
                                    className="text-xs text-brand-600 font-medium hover:underline flex items-center gap-1"
                                  >
                                      关联题库 <ArrowRight size={12}/>
                                  </button>
                              </div>
                          </div>
                      ))}
                      {plans.filter(p => p.subject === activeSubject && 
                          ((p.stage === 'Primary' && activeStage === 'Primary') || 
                           (p.stage === 'High' && activeStage.startsWith('Grade')))).length === 0 && (
                          <div className="col-span-full text-center py-8 text-slate-400 text-sm border-2 border-dashed border-slate-100 rounded-xl">
                              暂无训练计划
                          </div>
                      )}
                  </div>
              </div>
          </div>

          {/* Right Column: Competition Calendar */}
          <div className="space-y-6">
              <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
                  <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                      <Calendar size={20} className="text-red-500"/>
                      近期赛事日历
                  </h3>
                  <div className="space-y-4">
                      {filteredCompetitions.map(comp => (
                          <div key={comp.id} className="border border-slate-100 rounded-xl p-4 hover:shadow-md transition-shadow relative overflow-hidden group">
                              {comp.status === 'Completed' && (
                                  <div className="absolute top-0 right-0 bg-slate-100 text-slate-500 text-xs px-2 py-1 rounded-bl-lg font-medium">已结束</div>
                              )}
                              {comp.status === 'Upcoming' && (
                                  <div className="absolute top-0 right-0 bg-red-50 text-red-600 text-xs px-2 py-1 rounded-bl-lg font-medium">即将开始</div>
                              )}
                              
                              <p className="text-sm font-bold text-slate-400 mb-1">{comp.date}</p>
                              <h4 className="font-bold text-slate-900 mb-2 group-hover:text-brand-600 transition-colors">{comp.name}</h4>
                              
                              <div className="flex flex-wrap gap-2 mb-3">
                                  <span className={`text-xs px-2 py-0.5 rounded border ${
                                      comp.level === 'National' ? 'bg-purple-50 text-purple-700 border-purple-100' :
                                      comp.level === 'International' ? 'bg-amber-50 text-amber-700 border-amber-100' :
                                      'bg-blue-50 text-blue-700 border-blue-100'
                                  }`}>
                                      {comp.level}
                                  </span>
                                  {comp.location && (
                                      <span className="text-xs flex items-center gap-1 text-slate-500 bg-slate-50 px-2 py-0.5 rounded">
                                          <MapPin size={10}/> {comp.location}
                                      </span>
                                  )}
                              </div>
                          </div>
                      ))}
                      {filteredCompetitions.length === 0 && (
                          <div className="text-center py-8 text-slate-400 border border-dashed rounded-xl">
                              近期无赛事安排
                          </div>
                      )}
                  </div>
              </div>
          </div>
      </div>

      {/* --- MODAL: EDIT PLAN --- */}
      {isPlanEditModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4 animate-fade-in">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg overflow-hidden animate-scale-up">
            <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-slate-50">
              <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                 <Edit2 size={18} className="text-brand-600"/> 编辑教学计划
              </h3>
              <button onClick={() => setIsPlanEditModalOpen(false)} className="text-slate-400 hover:text-slate-600 p-1 rounded-full"><X size={20}/></button>
            </div>
            <form onSubmit={handleUpdatePlan} className="p-6 space-y-4">
               <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">计划标题</label>
                  <input 
                    type="text" required
                    className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500"
                    value={editingPlan.title || ''}
                    onChange={e => setEditingPlan({...editingPlan, title: e.target.value})}
                  />
               </div>
               <div className="grid grid-cols-2 gap-4">
                   <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">周期</label>
                      <input 
                        type="text" placeholder="e.g. 4 周"
                        className="w-full px-4 py-2 border border-slate-200 rounded-lg"
                        value={editingPlan.duration || ''}
                        onChange={e => setEditingPlan({...editingPlan, duration: e.target.value})}
                      />
                   </div>
                   <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">状态</label>
                      <select 
                        className="w-full px-4 py-2 border border-slate-200 rounded-lg bg-white"
                        value={editingPlan.status || 'Draft'}
                        onChange={e => setEditingPlan({...editingPlan, status: e.target.value as any})}
                      >
                          <option value="Draft">草稿 (Draft)</option>
                          <option value="Active">进行中 (Active)</option>
                          <option value="Archived">归档 (Archived)</option>
                      </select>
                   </div>
               </div>
               <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">详细描述</label>
                  <textarea 
                    rows={4}
                    className="w-full px-4 py-2 border border-slate-200 rounded-lg resize-none"
                    value={editingPlan.description || ''}
                    onChange={e => setEditingPlan({...editingPlan, description: e.target.value})}
                  />
               </div>
               <div className="pt-4 flex gap-3">
                   <button type="button" onClick={() => setIsPlanEditModalOpen(false)} className="flex-1 py-2 border border-slate-200 rounded-lg hover:bg-slate-50">取消</button>
                   <button type="submit" className="flex-1 py-2 bg-brand-600 text-white rounded-lg hover:bg-brand-700">保存计划</button>
               </div>
            </form>
          </div>
        </div>
      )}

      {/* --- MODAL: LINK QUESTIONS --- */}
      {isLinkModalOpen && currentLinkingPlan && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4 animate-fade-in">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-5xl h-[85vh] overflow-hidden animate-scale-up flex flex-col">
            <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-slate-50 flex-shrink-0">
              <div>
                  <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                    <Database size={18} className="text-brand-600"/> 关联题库
                  </h3>
                  <p className="text-xs text-slate-500 mt-1">
                      当前计划：{currentLinkingPlan.title} ({getSubjectLabel(currentLinkingPlan.subject)})
                  </p>
              </div>
              <button onClick={() => setIsLinkModalOpen(false)} className="text-slate-400 hover:text-slate-600 p-1 rounded-full"><X size={20}/></button>
            </div>
            
            <div className="flex flex-1 min-h-0">
                {/* Left: Knowledge Tree Selector */}
                <div className="w-1/3 border-r border-slate-200 overflow-y-auto p-4 bg-slate-50/30">
                    <h4 className="text-xs font-bold text-slate-400 uppercase mb-3 px-2">选择知识点</h4>
                    {treeData.map(node => (
                        <TreeNode 
                            key={node.id} 
                            node={node} 
                            level={0} 
                            onSelect={setSelectedNodeForLinking} 
                            selectedId={selectedNodeForLinking?.id}
                        />
                    ))}
                </div>

                {/* Right: Question List */}
                <div className="flex-1 overflow-y-auto p-6 bg-white">
                    {selectedNodeForLinking ? (
                        <>
                            <div className="flex justify-between items-center mb-4">
                                <h4 className="font-bold text-slate-800">
                                    "{selectedNodeForLinking.title}" 下的试题
                                </h4>
                                <span className="text-xs text-slate-500">
                                    已选 {tempLinkedQuestions.size} 题
                                </span>
                            </div>
                            
                            <div className="space-y-3">
                                {QUESTION_BANK.filter(q => q.knowledgePointId === selectedNodeForLinking.id).map(q => {
                                    const isSelected = tempLinkedQuestions.has(q.id);
                                    return (
                                        <div 
                                            key={q.id} 
                                            onClick={() => handleToggleQuestion(q.id)}
                                            className={`p-4 rounded-lg border cursor-pointer transition-all flex gap-3 items-start ${
                                                isSelected ? 'bg-brand-50 border-brand-200 ring-1 ring-brand-200' : 'bg-white border-slate-200 hover:border-brand-200'
                                            }`}
                                        >
                                            <div className={`mt-1 text-brand-600 ${isSelected ? 'opacity-100' : 'opacity-20'}`}>
                                                {isSelected ? <CheckSquare size={20}/> : <Square size={20}/>}
                                            </div>
                                            <div className="flex-1">
                                                <div className="flex gap-2 mb-1">
                                                    <span className="text-xs font-bold bg-slate-100 text-slate-600 px-1.5 rounded">{q.type}</span>
                                                    <span className="text-xs text-slate-400">Diff: {q.difficulty}/5</span>
                                                </div>
                                                <p className="text-sm text-slate-800 font-medium">{q.content}</p>
                                            </div>
                                        </div>
                                    );
                                })}
                                {QUESTION_BANK.filter(q => q.knowledgePointId === selectedNodeForLinking.id).length === 0 && (
                                    <div className="text-center py-10 text-slate-400">该知识点暂无匹配试题</div>
                                )}
                            </div>
                        </>
                    ) : (
                        <div className="flex flex-col items-center justify-center h-full text-slate-400">
                            <Folder size={48} className="mb-4 opacity-20"/>
                            <p>请在左侧选择一个知识点以浏览试题</p>
                        </div>
                    )}
                </div>
            </div>

            <div className="p-4 border-t border-slate-100 bg-white flex justify-between items-center flex-shrink-0">
                <span className="text-sm text-slate-600">
                    当前共关联 <span className="font-bold text-brand-600">{tempLinkedQuestions.size}</span> 道题目
                </span>
                <div className="flex gap-3">
                    <button onClick={() => setIsLinkModalOpen(false)} className="px-4 py-2 border border-slate-200 rounded-lg hover:bg-slate-50 text-sm">取消</button>
                    <button onClick={handleSaveLinks} className="px-6 py-2 bg-brand-600 text-white rounded-lg hover:bg-brand-700 font-medium text-sm shadow-sm">保存关联</button>
                </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

// --- HELPER HELPERS ---
const getSubjectLabel = (key: string) => {
    const map: Record<string, string> = { 'Math': '数学', 'Physics': '物理', 'Chemistry': '化学', 'English': '英语', 'Informatics': '信息学' };
    return map[key] || key;
};

const getStageLabel = (key: string) => {
    const map: Record<string, string> = { 'Primary': '小学', 'Middle': '初中', 'High': '高中', 'Grade 10': '高一', 'Grade 11': '高二', 'Grade 12': '高三' };
    return map[key] || key;
};
