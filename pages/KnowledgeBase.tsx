
import React, { useState, useMemo } from 'react';
import { 
  GitBranch, Folder, FileText, ChevronRight, ChevronDown, Plus, 
  MoreVertical, Star, Trash2, Edit2, Check, X, Search, BookOpen, Calendar, Layers, Clock, Target, ArrowRight, Database, CheckSquare, Square
} from 'lucide-react';
import { KnowledgeNode, Question } from '../types';

// --- DATA STRUCTURE: COMPREHENSIVE KNOWLEDGE GRAPH ---
const COMPREHENSIVE_NODES: KnowledgeNode[] = [
  // ==================== HIGH SCHOOL (高中) ====================
  
  // --- High School Math ---
  { id: 'HM1', title: '集合与常用逻辑用语', type: 'Chapter', stage: 'High', subject: 'Math', parentId: undefined },
  { id: 'HM1-1', title: '集合的概念与运算', type: 'Section', stage: 'High', subject: 'Math', parentId: 'HM1' },
  { id: 'HM1-1-1', title: '集合的含义与表示', type: 'Point', stage: 'High', subject: 'Math', parentId: 'HM1-1', difficulty: 1, importance: 'Core' },
  { id: 'HM1-1-2', title: '集合间的基本关系', type: 'Point', stage: 'High', subject: 'Math', parentId: 'HM1-1', difficulty: 2, importance: 'Core' },
  { id: 'HM1-2', title: '充分条件与必要条件', type: 'Section', stage: 'High', subject: 'Math', parentId: 'HM1' },
  
  { id: 'HM2', title: '函数概念与性质', type: 'Chapter', stage: 'High', subject: 'Math', parentId: undefined },
  { id: 'HM2-1', title: '函数的单调性与最大(小)值', type: 'Section', stage: 'High', subject: 'Math', parentId: 'HM2' },
  { id: 'HM2-1-1', title: '利用导数研究函数单调性', type: 'Point', stage: 'High', subject: 'Math', parentId: 'HM2-1', difficulty: 4, importance: 'Core' },
  { id: 'HM2-2', title: '函数的奇偶性', type: 'Section', stage: 'High', subject: 'Math', parentId: 'HM2' },

  { id: 'HM3', title: '立体几何初步', type: 'Chapter', stage: 'High', subject: 'Math', parentId: undefined },
  { id: 'HM3-1', title: '空间点、直线、平面之间的位置关系', type: 'Section', stage: 'High', subject: 'Math', parentId: 'HM3' },
  { id: 'HM3-2', title: '直线、平面平行的判定及其性质', type: 'Point', stage: 'High', subject: 'Math', parentId: 'HM3-1', difficulty: 3, importance: 'Core' },

  { id: 'HM4', title: '平面解析几何', type: 'Chapter', stage: 'High', subject: 'Math', parentId: undefined },
  { id: 'HM4-1', title: '圆锥曲线', type: 'Section', stage: 'High', subject: 'Math', parentId: 'HM4' },
  { id: 'HM4-1-1', title: '椭圆的标准方程', type: 'Point', stage: 'High', subject: 'Math', parentId: 'HM4-1', difficulty: 4, importance: 'Core' },

  // --- High School Physics ---
  { id: 'HP1', title: '运动的描述', type: 'Chapter', stage: 'High', subject: 'Physics', parentId: undefined },
  { id: 'HP1-1', title: '质点 参考系', type: 'Point', stage: 'High', subject: 'Physics', parentId: 'HP1', difficulty: 1, importance: 'Core' },
  { id: 'HP2', title: '相互作用与牛顿运动定律', type: 'Chapter', stage: 'High', subject: 'Physics', parentId: undefined },
  { id: 'HP2-1', title: '牛顿第二定律', type: 'Point', stage: 'High', subject: 'Physics', parentId: 'HP2', difficulty: 4, importance: 'Core' },
  { id: 'HP3', title: '电磁感应', type: 'Chapter', stage: 'High', subject: 'Physics', parentId: undefined },
  { id: 'HP3-1', title: '楞次定律', type: 'Point', stage: 'High', subject: 'Physics', parentId: 'HP3', difficulty: 5, importance: 'Core' },
  { id: 'HP4', title: '机械振动与机械波', type: 'Chapter', stage: 'High', subject: 'Physics', parentId: undefined },

  // --- High School Chemistry ---
  { id: 'HC1', title: '物质结构 元素周期律', type: 'Chapter', stage: 'High', subject: 'Chemistry', parentId: undefined },
  { id: 'HC1-1', title: '元素周期表', type: 'Point', stage: 'High', subject: 'Chemistry', parentId: 'HC1', difficulty: 2, importance: 'Core' },
  { id: 'HC2', title: '化学反应与能量', type: 'Chapter', stage: 'High', subject: 'Chemistry', parentId: undefined },
  { id: 'HC2-1', title: '原电池', type: 'Point', stage: 'High', subject: 'Chemistry', parentId: 'HC2', difficulty: 3, importance: 'Core' },
  { id: 'HC3', title: '有机化学基础', type: 'Chapter', stage: 'High', subject: 'Chemistry', parentId: undefined },
  { id: 'HC3-1', title: '烃的衍生物', type: 'Section', stage: 'High', subject: 'Chemistry', parentId: 'HC3' },

  // --- High School English ---
  { id: 'HE1', title: '语法 (Grammar)', type: 'Chapter', stage: 'High', subject: 'English', parentId: undefined },
  { id: 'HE1-1', title: '定语从句 (Attributive Clause)', type: 'Section', stage: 'High', subject: 'English', parentId: 'HE1' },
  { id: 'HE1-1-1', title: '关系代词 which/that/who', type: 'Point', stage: 'High', subject: 'English', parentId: 'HE1-1', difficulty: 3, importance: 'Core' },
  { id: 'HE1-2', title: '虚拟语气 (Subjunctive Mood)', type: 'Section', stage: 'High', subject: 'English', parentId: 'HE1' },
  { id: 'HE2', title: '写作 (Writing)', type: 'Chapter', stage: 'High', subject: 'English', parentId: undefined },
  { id: 'HE2-1', title: '应用文写作', type: 'Point', stage: 'High', subject: 'English', parentId: 'HE2', difficulty: 3, importance: 'Core' },

  // --- High School Informatics ---
  { id: 'HI1', title: '算法基础', type: 'Chapter', stage: 'High', subject: 'Informatics', parentId: undefined },
  { id: 'HI1-1', title: '动态规划 (DP)', type: 'Section', stage: 'High', subject: 'Informatics', parentId: 'HI1' },
  { id: 'HI1-1-1', title: '背包问题', type: 'Point', stage: 'High', subject: 'Informatics', parentId: 'HI1-1', difficulty: 4, importance: 'Core' },
  { id: 'HI2', title: '数据结构', type: 'Chapter', stage: 'High', subject: 'Informatics', parentId: undefined },
  { id: 'HI2-1', title: '线段树与树状数组', type: 'Point', stage: 'High', subject: 'Informatics', parentId: 'HI2', difficulty: 5, importance: 'Expanded' },

  // ==================== MIDDLE SCHOOL (初中) ====================

  // --- Middle School Math ---
  { id: 'MM1', title: '数与式', type: 'Chapter', stage: 'Middle', subject: 'Math', parentId: undefined },
  { id: 'MM1-1', title: '实数', type: 'Section', stage: 'Middle', subject: 'Math', parentId: 'MM1' },
  { id: 'MM2', title: '方程与不等式', type: 'Chapter', stage: 'Middle', subject: 'Math', parentId: undefined },
  { id: 'MM2-1', title: '一元二次方程', type: 'Point', stage: 'Middle', subject: 'Math', parentId: 'MM2', difficulty: 3, importance: 'Core' },
  { id: 'MM3', title: '函数', type: 'Chapter', stage: 'Middle', subject: 'Math', parentId: undefined },
  { id: 'MM3-1', title: '二次函数的图像与性质', type: 'Point', stage: 'Middle', subject: 'Math', parentId: 'MM3', difficulty: 4, importance: 'Core' },
  { id: 'MM4', title: '几何图形', type: 'Chapter', stage: 'Middle', subject: 'Math', parentId: undefined },
  { id: 'MM4-1', title: '全等三角形', type: 'Section', stage: 'Middle', subject: 'Math', parentId: 'MM4' },
  { id: 'MM4-2', title: '圆', type: 'Section', stage: 'Middle', subject: 'Math', parentId: 'MM4' },

  // --- Middle School Physics ---
  { id: 'MP1', title: '声现象', type: 'Chapter', stage: 'Middle', subject: 'Physics', parentId: undefined },
  { id: 'MP2', title: '光现象', type: 'Chapter', stage: 'Middle', subject: 'Physics', parentId: undefined },
  { id: 'MP2-1', title: '光的折射', type: 'Point', stage: 'Middle', subject: 'Physics', parentId: 'MP2', difficulty: 3, importance: 'Core' },
  { id: 'MP3', title: '力与运动', type: 'Chapter', stage: 'Middle', subject: 'Physics', parentId: undefined },
  { id: 'MP3-1', title: '压强与浮力', type: 'Section', stage: 'Middle', subject: 'Physics', parentId: 'MP3' },
  { id: 'MP4', title: '电学', type: 'Chapter', stage: 'Middle', subject: 'Physics', parentId: undefined },
  { id: 'MP4-1', title: '欧姆定律', type: 'Point', stage: 'Middle', subject: 'Physics', parentId: 'MP4', difficulty: 4, importance: 'Core' },

  // --- Middle School Chemistry ---
  { id: 'MC1', title: '物质构成的奥秘', type: 'Chapter', stage: 'Middle', subject: 'Chemistry', parentId: undefined },
  { id: 'MC1-1', title: '分子与原子', type: 'Point', stage: 'Middle', subject: 'Chemistry', parentId: 'MC1', difficulty: 2, importance: 'Core' },
  { id: 'MC2', title: '身边的化学物质', type: 'Chapter', stage: 'Middle', subject: 'Chemistry', parentId: undefined },
  { id: 'MC2-1', title: '酸和碱', type: 'Section', stage: 'Middle', subject: 'Chemistry', parentId: 'MC2' },
  { id: 'MC2-1-1', title: '中和反应', type: 'Point', stage: 'Middle', subject: 'Chemistry', parentId: 'MC2-1', difficulty: 3, importance: 'Core' },
  { id: 'MC3', title: '金属与矿物', type: 'Chapter', stage: 'Middle', subject: 'Chemistry', parentId: undefined },

  // --- Middle School English ---
  { id: 'ME1', title: '时态 (Tenses)', type: 'Chapter', stage: 'Middle', subject: 'English', parentId: undefined },
  { id: 'ME1-1', title: '现在完成时', type: 'Point', stage: 'Middle', subject: 'English', parentId: 'ME1', difficulty: 3, importance: 'Core' },
  { id: 'ME1-2', title: '过去进行时', type: 'Point', stage: 'Middle', subject: 'English', parentId: 'ME1', difficulty: 2, importance: 'Core' },
  { id: 'ME2', title: '被动语态', type: 'Chapter', stage: 'Middle', subject: 'English', parentId: undefined },
  
  // --- Middle School Informatics ---
  { id: 'MI1', title: 'Python 基础', type: 'Chapter', stage: 'Middle', subject: 'Informatics', parentId: undefined },
  { id: 'MI1-1', title: '列表与字典', type: 'Point', stage: 'Middle', subject: 'Informatics', parentId: 'MI1', difficulty: 2, importance: 'Core' },
  { id: 'MI2', title: 'C++ 入门', type: 'Chapter', stage: 'Middle', subject: 'Informatics', parentId: undefined },
  { id: 'MI2-1', title: '循环结构', type: 'Point', stage: 'Middle', subject: 'Informatics', parentId: 'MI2', difficulty: 3, importance: 'Core' },

  // ==================== PRIMARY SCHOOL (小学) ====================

  // --- Primary Math ---
  { id: 'PM1', title: '数与代数', type: 'Chapter', stage: 'Primary', subject: 'Math', parentId: undefined },
  { id: 'PM1-1', title: '100以内的加减法', type: 'Point', stage: 'Primary', subject: 'Math', parentId: 'PM1', difficulty: 1, importance: 'Core' },
  { id: 'PM1-2', title: '分数的初步认识', type: 'Point', stage: 'Primary', subject: 'Math', parentId: 'PM1', difficulty: 2, importance: 'Core' },
  { id: 'PM2', title: '图形与几何', type: 'Chapter', stage: 'Primary', subject: 'Math', parentId: undefined },
  { id: 'PM2-1', title: '长方形与正方形的周长', type: 'Point', stage: 'Primary', subject: 'Math', parentId: 'PM2', difficulty: 2, importance: 'Core' },
  { id: 'PM3', title: '应用题', type: 'Chapter', stage: 'Primary', subject: 'Math', parentId: undefined },

  // --- Primary English ---
  { id: 'PE1', title: 'Phonics (自然拼读)', type: 'Chapter', stage: 'Primary', subject: 'English', parentId: undefined },
  { id: 'PE2', title: 'Basic Vocabulary (基础词汇)', type: 'Chapter', stage: 'Primary', subject: 'English', parentId: undefined },
  { id: 'PE2-1', title: 'Animals (动物)', type: 'Point', stage: 'Primary', subject: 'English', parentId: 'PE2', difficulty: 1, importance: 'Core' },
  { id: 'PE2-2', title: 'Colors & Shapes (颜色形状)', type: 'Point', stage: 'Primary', subject: 'English', parentId: 'PE2', difficulty: 1, importance: 'Core' },
  { id: 'PE3', title: 'Daily Dialogue (日常对话)', type: 'Chapter', stage: 'Primary', subject: 'English', parentId: undefined },

  // --- Primary Science (Using Physics/Chemistry key for simplicity in filter, displayed as Science) ---
  { id: 'PS1', title: '生命科学', type: 'Chapter', stage: 'Primary', subject: 'Physics', parentId: undefined },
  { id: 'PS1-1', title: '植物的生长', type: 'Point', stage: 'Primary', subject: 'Physics', parentId: 'PS1', difficulty: 1, importance: 'Core' },
  { id: 'PS2', title: '物质科学', type: 'Chapter', stage: 'Primary', subject: 'Physics', parentId: undefined },
  { id: 'PS2-1', title: '水的形态变化', type: 'Point', stage: 'Primary', subject: 'Physics', parentId: 'PS2', difficulty: 2, importance: 'Core' },

  // --- Primary Informatics ---
  { id: 'PI1', title: '图形化编程 (Scratch)', type: 'Chapter', stage: 'Primary', subject: 'Informatics', parentId: undefined },
  { id: 'PI1-1', title: '角色与舞台', type: 'Point', stage: 'Primary', subject: 'Informatics', parentId: 'PI1', difficulty: 1, importance: 'Core' },
  { id: 'PI1-2', title: '事件与循环', type: 'Point', stage: 'Primary', subject: 'Informatics', parentId: 'PI1', difficulty: 2, importance: 'Core' },
];

// --- MOCK QUESTIONS FOR LINKING ---
const MOCK_QUESTIONS_FOR_LINKING: Question[] = [
    { id: 'MQ1', type: 'SingleChoice', content: '集合 {1,2,3} 的子集个数是？', difficulty: 1, subject: 'Math', grade: 'High School', knowledgePointId: 'HM1-1-1', answer: '8', createdAt: '', author: '' },
    { id: 'MQ2', type: 'FillBlank', content: '若 A={1,2}, B={2,3}, 则 A∩B = ___', difficulty: 1, subject: 'Math', grade: 'High School', knowledgePointId: 'HM1-1-1', answer: '{2}', createdAt: '', author: '' },
    { id: 'MQ3', type: 'Essay', content: '证明：函数 f(x)=x^3 在 R 上单调递增。', difficulty: 3, subject: 'Math', grade: 'High School', knowledgePointId: 'HM2-1-1', answer: '略', createdAt: '', author: '' },
    { id: 'MQ4', type: 'MultipleChoice', content: '下列哪些是 Python 合法的变量名？', difficulty: 2, subject: 'Informatics', grade: 'Middle School', knowledgePointId: 'MI1-1', answer: 'A, C', options: ['_var', '2var', 'var_2', 'var-2'], createdAt: '', author: '' },
    { id: 'MQ5', type: 'SingleChoice', content: 'What color is the sky?', difficulty: 1, subject: 'English', grade: 'Primary School', knowledgePointId: 'PE2-2', answer: 'Blue', createdAt: '', author: '' }
];

// --- MOCK DATA: TRAINING PLANS ---
interface TeachingPlan {
    id: string;
    title: string;
    stage: string;
    subject: string;
    duration: string; // e.g. "4 Weeks"
    nodeCount: number;
    status: 'Draft' | 'Active' | 'Archived';
    author: string;
    description?: string;
    linkedQuestionIds?: string[];
}

const INITIAL_PLANS: TeachingPlan[] = [
    { id: 'TP1', title: '高三数学一轮复习：函数与导数', stage: 'High', subject: 'Math', duration: '6 周', nodeCount: 12, status: 'Active', author: '陈老师', description: '全面复习函数性质、导数计算及其应用。', linkedQuestionIds: ['MQ3'] },
    { id: 'TP2', title: '初二物理力学专项突破', stage: 'Middle', subject: 'Physics', duration: '4 周', nodeCount: 8, status: 'Active', author: '王老师', description: '重点攻克力与运动、压强浮力模块。' },
    { id: 'TP3', title: 'NOIP 算法竞赛集训 (图论篇)', stage: 'High', subject: 'Informatics', duration: '3 周', nodeCount: 15, status: 'Draft', author: '李教练', description: '针对 NOIP 复赛图论考点进行强化训练。' },
    { id: 'TP4', title: '小学英语自然拼读入门', stage: 'Primary', subject: 'English', duration: '1 学期', nodeCount: 20, status: 'Active', author: 'Sarah', description: 'Phonics 基础发音规则教学。', linkedQuestionIds: ['MQ5'] },
];

export const KnowledgeBase: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'graph' | 'plans'>('graph');
  
  // Graph State
  const [nodes, setNodes] = useState<KnowledgeNode[]>(COMPREHENSIVE_NODES);
  const [activeStage, setActiveStage] = useState<'Primary' | 'Middle' | 'High'>('High');
  const [activeSubject, setActiveSubject] = useState<string>('Math');
  const [expandedNodes, setExpandedNodes] = useState<Set<string>>(new Set(['HM1', 'HM1-1', 'HM2', 'MM3', 'PE2']));
  const [selectedNode, setSelectedNode] = useState<KnowledgeNode | null>(null);
  
  // Plan State
  const [plans, setPlans] = useState<TeachingPlan[]>(INITIAL_PLANS);
  
  // Edit Plan Modal
  const [isPlanEditModalOpen, setIsPlanEditModalOpen] = useState(false);
  const [editingPlan, setEditingPlan] = useState<Partial<TeachingPlan>>({});

  // Link Questions Modal
  const [isLinkModalOpen, setIsLinkModalOpen] = useState(false);
  const [currentLinkingPlan, setCurrentLinkingPlan] = useState<TeachingPlan | null>(null);
  const [selectedNodeForLinking, setSelectedNodeForLinking] = useState<KnowledgeNode | null>(null);
  const [tempLinkedQuestions, setTempLinkedQuestions] = useState<Set<string>>(new Set());

  // Edit State (Graph)
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState<Partial<KnowledgeNode>>({});

  // Helpers
  const getSubjectLabel = (key: string) => {
      const map: Record<string, string> = {
          'Math': '数学', 'Physics': '物理/科学', 'Chemistry': '化学', 
          'English': '英语', 'Informatics': '信息技术'
      };
      return map[key] || key;
  };

  const getStageLabel = (key: string) => {
      const map: Record<string, string> = { 'Primary': '小学', 'Middle': '初中', 'High': '高中' };
      return map[key] || key;
  };

  const getNodeTypeLabel = (type: string) => {
      const map: Record<string, string> = { 'Chapter': '章', 'Section': '节', 'Point': '知识点' };
      return map[type] || type;
  };

  const getImportanceLabel = (imp: string) => {
       const map: Record<string, string> = { 'Core': '核心', 'Expanded': '拓展', 'Optional': '选修' };
       return map[imp] || imp;
  };

  // --- LOGIC: GRAPH ---
  const treeData = useMemo(() => {
    const stageNodes = nodes.filter(n => n.stage === activeStage && n.subject === activeSubject);
    const nodeMap = new Map<string, KnowledgeNode>();
    
    // Create copies
    stageNodes.forEach(n => nodeMap.set(n.id, { ...n, children: [] }));
    
    const roots: KnowledgeNode[] = [];
    
    stageNodes.forEach(n => {
      if (n.parentId && nodeMap.has(n.parentId)) {
        nodeMap.get(n.parentId)!.children!.push(nodeMap.get(n.id)!);
      } else {
        roots.push(nodeMap.get(n.id)!);
      }
    });
    
    return roots;
  }, [nodes, activeStage, activeSubject]);

  const toggleExpand = (id: string) => {
    const newSet = new Set(expandedNodes);
    if (newSet.has(id)) newSet.delete(id);
    else newSet.add(id);
    setExpandedNodes(newSet);
  };

  const handleSelectNode = (node: KnowledgeNode) => {
    setSelectedNode(node);
    setIsEditing(false);
  };

  const handleDeleteNode = (id: string) => {
      if(confirm('确定要删除该知识点及其子节点吗？')) {
          setNodes(nodes.filter(n => n.id !== id && n.parentId !== id)); // Simple filtering, real app needs recursive delete
          if (selectedNode?.id === id) setSelectedNode(null);
      }
  };
  const handleAddNode = (parentId?: string) => {
      const newNode: KnowledgeNode = {
          id: `NEW-${Date.now()}`, 
          title: '新知识点', 
          type: parentId ? 'Point' : 'Chapter',
          stage: activeStage, 
          subject: activeSubject, 
          parentId, 
          difficulty: 1, 
          importance: 'Core'
      };
      setNodes([...nodes, newNode]);
      if(parentId) setExpandedNodes(new Set(expandedNodes).add(parentId));
      setSelectedNode(newNode);
      setEditForm(newNode);
      setIsEditing(true);
  };
  const handleSave = () => {
      if(selectedNode) {
          setNodes(nodes.map(n => n.id === selectedNode.id ? {...n, ...editForm} as KnowledgeNode : n));
          setSelectedNode({...selectedNode, ...editForm} as KnowledgeNode);
          setIsEditing(false);
      }
  };

  // --- LOGIC: PLANS ---
  const handleAddPlan = () => {
      const newPlan: TeachingPlan = {
          id: `TP-${Date.now()}`,
          title: '新建教学计划',
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

  // --- LOGIC: LINK QUESTIONS ---
  const handleOpenLink = (plan: TeachingPlan) => {
      setCurrentLinkingPlan(plan);
      setTempLinkedQuestions(new Set(plan.linkedQuestionIds || []));
      setIsLinkModalOpen(true);
      // Ensure we are viewing the correct subject/stage context in the modal tree
      setActiveStage(plan.stage as any);
      setActiveSubject(plan.subject as any);
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

  // --- RENDER HELPERS ---
  const TreeNode: React.FC<{ node: KnowledgeNode, level: number, onSelect?: (node: KnowledgeNode) => void, selectedId?: string }> = ({ node, level, onSelect, selectedId }) => {
    const isExpanded = expandedNodes.has(node.id);
    const hasChildren = node.children && node.children.length > 0;
    // Use either the local 'selectedId' prop (for modal) or global 'selectedNode' state
    const isSelected = selectedId ? selectedId === node.id : selectedNode?.id === node.id;
    const clickHandler = onSelect ? () => onSelect(node) : () => handleSelectNode(node);

    return (
      <div className="select-none">
        <div 
          className={`flex items-center gap-2 py-2 px-3 rounded-lg cursor-pointer transition-colors ${
            isSelected ? 'bg-brand-50 text-brand-700' : 'hover:bg-slate-50 text-slate-700'
          }`}
          style={{ marginLeft: `${level * 16}px` }}
          onClick={clickHandler}
        >
          <button 
            className={`p-0.5 rounded hover:bg-black/5 ${!hasChildren ? 'invisible' : ''}`}
            onClick={(e) => { e.stopPropagation(); toggleExpand(node.id); }}
          >
            {isExpanded ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
          </button>
          
          {node.type === 'Chapter' && <Folder size={16} className="text-amber-500 fill-amber-500/20"/>}
          {node.type === 'Section' && <Folder size={16} className="text-blue-500 fill-blue-500/20"/>}
          {node.type === 'Point' && <FileText size={16} className="text-emerald-500"/>}
          
          <span className="text-sm font-medium flex-1 truncate">{node.title}</span>
          
          {node.type === 'Point' && node.difficulty && (
             <div className="flex gap-0.5">
               {Array.from({length: node.difficulty}).map((_, i) => (
                 <div key={i} className="w-1.5 h-1.5 rounded-full bg-red-400"></div>
               ))}
             </div>
          )}
        </div>
        
        {isExpanded && node.children?.map(child => (
          <TreeNode key={child.id} node={child} level={level + 1} onSelect={onSelect} selectedId={selectedId} />
        ))}
      </div>
    );
  };

  return (
    <div className="p-8 space-y-6 h-[calc(100vh-64px)] flex flex-col">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">教研中心 Research & Knowledge</h1>
          <p className="text-slate-500 mt-1">学科知识图谱构建与教学计划管理。</p>
        </div>
        
        {/* VIEW TOGGLE */}
        <div className="flex bg-slate-100 p-1 rounded-lg">
            <button 
                onClick={() => setActiveTab('graph')}
                className={`px-4 py-2 rounded-md text-sm font-medium flex items-center gap-2 transition-all ${
                    activeTab === 'graph' ? 'bg-white text-brand-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'
                }`}
            >
                <GitBranch size={16}/> 知识图谱
            </button>
            <button 
                onClick={() => setActiveTab('plans')}
                className={`px-4 py-2 rounded-md text-sm font-medium flex items-center gap-2 transition-all ${
                    activeTab === 'plans' ? 'bg-white text-brand-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'
                }`}
            >
                <Layers size={16}/> 教学计划
            </button>
        </div>
      </div>

      {/* FILTERS (Common for both tabs) */}
      <div className="flex gap-4 items-center bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
         <div className="flex gap-2">
            {(['Primary', 'Middle', 'High'] as const).map(stage => (
                <button
                    key={stage}
                    onClick={() => setActiveStage(stage)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                        activeStage === stage ? 'bg-brand-600 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                >
                    {getStageLabel(stage)}
                </button>
            ))}
         </div>
         <div className="h-8 w-px bg-slate-200"></div>
         <div className="flex gap-2 overflow-x-auto">
            {(['Math', 'Physics', 'Chemistry', 'English', 'Informatics'] as const).map(subject => (
                <button
                    key={subject}
                    onClick={() => setActiveSubject(subject)}
                    className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors border whitespace-nowrap ${
                        activeSubject === subject ? 'bg-brand-50 text-brand-700 border-brand-200' : 'bg-white text-slate-600 border-transparent hover:bg-slate-50'
                    }`}
                >
                    {getSubjectLabel(subject)}
                </button>
            ))}
         </div>
      </div>

      {/* === CONTENT: KNOWLEDGE GRAPH === */}
      {activeTab === 'graph' && (
        <div className="flex gap-6 flex-1 min-h-0">
            {/* Tree View */}
            <div className="w-1/3 bg-white rounded-xl border border-slate-200 shadow-sm flex flex-col overflow-hidden">
                <div className="p-4 border-b border-slate-200 bg-slate-50 flex justify-between items-center">
                    <h3 className="font-bold text-slate-800 flex items-center gap-2">
                        <GitBranch size={18} className="text-brand-600"/> 目录结构
                    </h3>
                    <button onClick={() => handleAddNode()} className="p-1.5 hover:bg-white rounded text-slate-600 transition-all" title="添加章"><Plus size={18}/></button>
                </div>
                <div className="flex-1 overflow-y-auto p-2">
                    {treeData.length > 0 ? (
                        treeData.map(node => <TreeNode key={node.id} node={node} level={0} />)
                    ) : (
                        <div className="text-center py-12 text-slate-400 text-sm">暂无数据，请点击右上角添加</div>
                    )}
                </div>
            </div>

            {/* Detail View */}
            <div className="flex-1 bg-white rounded-xl border border-slate-200 shadow-sm flex flex-col overflow-hidden">
                {selectedNode ? (
                    <>
                        <div className="p-6 border-b border-slate-100 flex justify-between items-start">
                            <div>
                                <div className="flex items-center gap-3 mb-2">
                                    <span className="px-2 py-0.5 rounded text-xs font-bold bg-slate-100 text-slate-700 uppercase">
                                        {getNodeTypeLabel(selectedNode.type)}
                                    </span>
                                    {isEditing ? (
                                        <input type="text" className="text-2xl font-bold border-b-2 border-brand-500 outline-none bg-transparent" value={editForm.title || ''} onChange={e => setEditForm({...editForm, title: e.target.value})}/>
                                    ) : (
                                        <h2 className="text-2xl font-bold text-slate-900">{selectedNode.title}</h2>
                                    )}
                                </div>
                                <p className="text-sm text-slate-500">ID: {selectedNode.id}</p>
                            </div>
                            <div className="flex gap-2">
                                {isEditing ? (
                                    <><button onClick={handleSave} className="p-2 bg-brand-600 text-white rounded"><Check size={18}/></button><button onClick={() => setIsEditing(false)} className="p-2 text-slate-500"><X size={18}/></button></>
                                ) : (
                                    <><button onClick={() => { setEditForm(selectedNode); setIsEditing(true); }} className="p-2 text-slate-400 hover:text-brand-600"><Edit2 size={18}/></button><button onClick={() => handleDeleteNode(selectedNode.id)} className="p-2 text-slate-400 hover:text-red-600"><Trash2 size={18}/></button></>
                                )}
                            </div>
                        </div>
                        <div className="p-6 space-y-6 flex-1 overflow-y-auto">
                            {!isEditing && (
                                <div className="grid grid-cols-2 gap-6">
                                    <div className="bg-slate-50 p-4 rounded-lg border border-slate-100">
                                        <h4 className="text-xs font-bold text-slate-500 uppercase mb-3">基本属性</h4>
                                        <div className="space-y-3 text-sm">
                                            <div className="flex justify-between"><span className="text-slate-500">学段</span><span className="font-medium">{getStageLabel(selectedNode.stage)}</span></div>
                                            <div className="flex justify-between"><span className="text-slate-500">学科</span><span className="font-medium">{getSubjectLabel(selectedNode.subject)}</span></div>
                                            {selectedNode.type === 'Point' && (
                                                <>
                                                    <div className="flex justify-between"><span className="text-slate-500">重要程度</span><span className="font-medium">{getImportanceLabel(selectedNode.importance || 'Core')}</span></div>
                                                    <div className="flex justify-between"><span className="text-slate-500">难度系数</span><div className="flex">{Array.from({length: selectedNode.difficulty||0}).map((_,i)=><Star key={i} size={12} className="text-amber-400 fill-amber-400"/>)}</div></div>
                                                </>
                                            )}
                                        </div>
                                    </div>
                                    <div className="bg-slate-50 p-4 rounded-lg flex flex-col justify-center items-center text-center border border-slate-100">
                                        <h4 className="text-xs font-bold text-slate-500 uppercase mb-1">关联题目</h4>
                                        <p className="text-2xl font-bold text-slate-900">0</p>
                                        <p className="text-xs text-slate-400">暂无题目关联</p>
                                    </div>
                                </div>
                            )}

                            {isEditing && (
                                <div className="space-y-4">
                                     <div>
                                        <label className="block text-sm font-medium text-slate-700 mb-1">节点类型</label>
                                        <select 
                                            className="w-full px-3 py-2 border border-slate-200 rounded-lg bg-white"
                                            value={editForm.type}
                                            onChange={e => setEditForm({...editForm, type: e.target.value as any})}
                                        >
                                            <option value="Chapter">章 (Chapter)</option>
                                            <option value="Section">节 (Section)</option>
                                            <option value="Point">知识点 (Point)</option>
                                        </select>
                                    </div>
                                    {editForm.type === 'Point' && (
                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-sm font-medium text-slate-700 mb-1">难度 (1-5)</label>
                                                <input type="number" min="1" max="5" className="w-full px-3 py-2 border border-slate-200 rounded-lg" value={editForm.difficulty} onChange={e => setEditForm({...editForm, difficulty: Number(e.target.value) as any})}/>
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-slate-700 mb-1">重要性</label>
                                                <select className="w-full px-3 py-2 border border-slate-200 rounded-lg bg-white" value={editForm.importance} onChange={e => setEditForm({...editForm, importance: e.target.value as any})}>
                                                    <option value="Core">核心</option>
                                                    <option value="Expanded">拓展</option>
                                                    <option value="Optional">选修</option>
                                                </select>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            )}

                            <div className="prose prose-sm">
                                <h4 className="text-sm font-bold text-slate-900 mb-2">详细描述 / 教学目标</h4>
                                {isEditing ? (
                                    <textarea rows={5} className="w-full px-3 py-2 border border-slate-200 rounded-lg" value={editForm.description || ''} onChange={e => setEditForm({...editForm, description: e.target.value})}/>
                                ) : (
                                    <p className="text-slate-600 bg-white p-4 border border-slate-100 rounded-lg min-h-[100px]">{selectedNode.description || '暂无描述...'}</p>
                                )}
                            </div>

                            {!isEditing && selectedNode.type !== 'Point' && (
                                <div className="pt-4 border-t border-slate-100">
                                    <button 
                                        onClick={() => handleAddNode(selectedNode.id)}
                                        className="w-full py-2 border border-dashed border-brand-300 text-brand-600 bg-brand-50 rounded-lg hover:bg-brand-100 flex items-center justify-center gap-2 font-medium"
                                    >
                                        <Plus size={16}/> 在当前节点下添加子节点
                                    </button>
                                </div>
                            )}
                        </div>
                    </>
                ) : (
                    <div className="flex-1 flex flex-col items-center justify-center text-slate-400">
                        <GitBranch size={48} className="mb-4 opacity-50"/>
                        <p>请选择左侧节点查看详情</p>
                    </div>
                )}
            </div>
        </div>
      )}

      {/* === CONTENT: TRAINING PLANS === */}
      {activeTab === 'plans' && (
          <div className="flex-1 bg-white rounded-xl border border-slate-200 shadow-sm flex flex-col overflow-hidden">
              <div className="p-6 border-b border-slate-200 flex justify-between items-center bg-slate-50/50">
                  <h3 className="font-bold text-slate-800 flex items-center gap-2">
                      <Target size={18} className="text-brand-600"/> 教学计划列表 ({getStageLabel(activeStage)} - {getSubjectLabel(activeSubject)})
                  </h3>
                  <button onClick={handleAddPlan} className="flex items-center px-4 py-2 bg-brand-600 text-white rounded-lg hover:bg-brand-700 shadow-sm text-sm font-medium">
                      <Plus size={16} className="mr-2"/> 创建新计划
                  </button>
              </div>
              
              <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 overflow-y-auto">
                  {plans.filter(p => p.stage === activeStage && p.subject === activeSubject).map(plan => (
                      <div key={plan.id} className="border border-slate-200 rounded-xl p-5 hover:shadow-md transition-all hover:border-brand-300 group cursor-pointer bg-white flex flex-col">
                          <div className="flex justify-between items-start mb-3">
                              <span className={`px-2 py-0.5 rounded text-xs font-bold border ${
                                  plan.status === 'Active' ? 'bg-emerald-50 text-emerald-700 border-emerald-100' : 'bg-slate-100 text-slate-600 border-slate-200'
                              }`}>
                                  {plan.status === 'Active' ? '进行中' : '草稿'}
                              </span>
                              <button 
                                onClick={() => handleEditPlan(plan)}
                                className="text-slate-400 hover:text-brand-600"
                              >
                                  <Edit2 size={16}/>
                              </button>
                          </div>
                          
                          <h4 className="font-bold text-slate-900 text-lg mb-2 group-hover:text-brand-600 transition-colors line-clamp-2">{plan.title}</h4>
                          <p className="text-xs text-slate-500 line-clamp-2 mb-4 h-8">{plan.description || '暂无描述'}</p>
                          
                          <div className="space-y-2 text-sm text-slate-600 mb-4 mt-auto">
                              <div className="flex items-center gap-2">
                                  <Clock size={14}/> 周期: {plan.duration}
                              </div>
                              <div className="flex items-center gap-2">
                                  <Database size={14}/> 关联题目: <span className="font-bold text-brand-600">{plan.linkedQuestionIds?.length || 0}</span> 题
                              </div>
                              <div className="flex items-center gap-2">
                                  <Target size={14}/> 负责人: {plan.author}
                              </div>
                          </div>
                          
                          <div className="pt-3 border-t border-slate-100 flex gap-2">
                              <button 
                                onClick={() => handleEditPlan(plan)}
                                className="flex-1 py-1.5 text-xs font-medium text-slate-600 bg-slate-50 rounded hover:bg-slate-100 transition-colors"
                              >
                                  编辑详情
                              </button>
                              <button 
                                onClick={() => handleOpenLink(plan)}
                                className="flex-1 py-1.5 text-xs font-bold text-brand-600 bg-brand-50 rounded hover:bg-brand-100 transition-colors"
                              >
                                  关联题库
                              </button>
                          </div>
                      </div>
                  ))}
                  
                  {/* Add New Placeholder Card */}
                  <button 
                    onClick={handleAddPlan}
                    className="border-2 border-dashed border-slate-200 rounded-xl p-5 flex flex-col items-center justify-center text-slate-400 hover:border-brand-400 hover:text-brand-600 transition-all min-h-[250px]"
                  >
                      <Plus size={32} className="mb-2"/>
                      <span className="font-medium">创建一个新计划</span>
                  </button>
              </div>
          </div>
      )}

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
                            
                            {/* Filter mock questions loosely by ID prefix or random if strictly filtering is hard with mocks */}
                            <div className="space-y-3">
                                {MOCK_QUESTIONS_FOR_LINKING.map(q => {
                                    // In a real app, filtering would be real. Here we show all or basic filter.
                                    // Let's pretend to filter if knowledgePointId matches or just show all for demo interaction.
                                    const isMatch = q.knowledgePointId?.startsWith(selectedNodeForLinking.id.split('-')[0]); // Simple prefix match mock
                                    if (!isMatch && selectedNodeForLinking.type === 'Point') return null;

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
                                {MOCK_QUESTIONS_FOR_LINKING.every(q => !q.knowledgePointId?.startsWith(selectedNodeForLinking.id.split('-')[0]) && selectedNodeForLinking.type === 'Point') && (
                                    <div className="text-center py-10 text-slate-400">该知识点暂无匹配试题 (Mock Data Limit)</div>
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
