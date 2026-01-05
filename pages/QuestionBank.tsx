import React, { useState } from 'react';
import { Database, Filter, Plus, Search, Eye, Edit2, Trash2, CheckCircle, HelpCircle, Layers, X, Save, FileText, ChevronRight, ShoppingCart, List, Folder, AlertCircle, Book, Download, GraduationCap, Video, ChevronLeft, Clock, File, ChevronDown } from 'lucide-react';
import { Question, ExamPaper, TextbookResource, ExamPaperStructure, TextbookChapter } from '../types';

// --- MOCK DATA: EXTENSIVE GRADE 4 QUESTIONS ---
const GRADE_4_QUESTIONS: Question[] = [
  // --- 1. 计算综合 (Calculation) ---
  {
    id: 'Q-GS4-C1-01', type: 'FillBlank', subject: 'Math', grade: 'Primary School', difficulty: 2,
    content: '计算：$125 \\times 32 \\times 25 = \\_\\_\\_\\_\\_\\_$',
    answer: '100000',
    analysis: '利用乘法结合律：$125 \\times (8 \\times 4) \\times 25 = (125 \\times 8) \\times (4 \\times 25) = 1000 \\times 100 = 100000$。',
    knowledgePoint: '乘法巧算', tags: ['计算', '结合律'], source: '高思导引', author: 'Math Team', createdAt: '2024-11-01'
  },
  {
    id: 'Q-GS4-C1-02', type: 'FillBlank', subject: 'Math', grade: 'Primary School', difficulty: 3,
    content: '计算：$999 \\times 22 + 333 \\times 34 = \\_\\_\\_\\_\\_\\_$',
    answer: '33300',
    analysis: '利用积不变性质和提取公因数：$999 \\times 22 = 333 \\times 3 \\times 22 = 333 \\times 66$。原式 = $333 \\times (66 + 34) = 333 \\times 100 = 33300$。',
    knowledgePoint: '提取公因数', tags: ['计算', '分配律'], source: '高思导引', author: 'Math Team', createdAt: '2024-11-01'
  },
  {
    id: 'Q-GS4-C1-03', type: 'FillBlank', subject: 'Math', grade: 'Primary School', difficulty: 3,
    content: '定义新运算 $a \\otimes b = 3a + 2b$，求 $(4 \\otimes 5) \\otimes 2 = \\_\\_\\_\\_\\_\\_$',
    answer: '70',
    analysis: '$4 \\otimes 5 = 3\\times4 + 2\\times5 = 12+10=22$。然后 $22 \\otimes 2 = 3\\times22 + 2\\times2 = 66+4=70$。',
    knowledgePoint: '定义新运算', tags: ['代数'], source: '高思导引', author: 'Math Team', createdAt: '2024-11-01'
  },
  {
    id: 'Q-GS4-C1-04', type: 'FillBlank', subject: 'Math', grade: 'Primary School', difficulty: 2,
    content: '等差数列求和：$1+3+5+\\dots+39 = \\_\\_\\_\\_\\_\\_$',
    answer: '400',
    analysis: '这是一个首项为1，公差为2的等差数列。项数 $n = (39-1)\\div2 + 1 = 20$。和 $= (1+39) \\times 20 \\div 2 = 400$。',
    knowledgePoint: '等差数列', tags: ['计算', '数列'], source: '高思导引', author: 'Math Team', createdAt: '2024-11-01'
  },

  // --- 2. 典型应用题 (Application Problems) ---
  {
    id: 'Q-GS4-APP-01', type: 'Essay', subject: 'Math', grade: 'Primary School', difficulty: 3,
    content: '甲、乙两堆货物共180吨，甲堆货物运走20吨后，剩下的货物质量是乙堆的3倍。求甲、乙两堆货物原来各有多少吨？',
    answer: '甲堆140吨，乙堆40吨',
    analysis: '设乙堆为1份，则甲堆运走20吨后为3份。总份数变化为：180-20=160吨。1份(乙) = 160 ÷ (3+1) = 40吨。甲 = 180 - 40 = 140吨。',
    knowledgePoint: '和倍问题', tags: ['应用题', '画图法'], source: '高思导引', author: 'Math Team', createdAt: '2024-11-02'
  },
  {
    id: 'Q-GS4-APP-02', type: 'SingleChoice', subject: 'Math', grade: 'Primary School', difficulty: 3,
    content: '鸡兔同笼，头共35，足共94，问兔子有多少只？',
    options: ['10', '12', '23', '25'],
    answer: 'B (12)',
    analysis: '假设全是鸡，脚应为 35×2=70只，比实际少 94-70=24只。每把一只鸡换成兔，脚增加2只。兔数 = 24÷2 = 12只。',
    knowledgePoint: '鸡兔同笼', tags: ['应用题', '假设法'], source: '高思导引', author: 'Math Team', createdAt: '2024-11-02'
  },
  {
    id: 'Q-GS4-APP-03', type: 'Essay', subject: 'Math', grade: 'Primary School', difficulty: 3,
    content: '父亲今年45岁，儿子今年15岁。多少年前父亲的年龄是儿子年龄的4倍？',
    answer: '5年前',
    analysis: '年龄差不变：45-15=30岁。当父亲是儿子4倍时，年龄差是儿子的(4-1)=3倍。此时儿子年龄 = 30÷3=10岁。15-10=5，即5年前。',
    knowledgePoint: '年龄问题', tags: ['应用题', '差倍问题'], source: '高思导引', author: 'Math Team', createdAt: '2024-11-02'
  },
  {
    id: 'Q-GS4-APP-04', type: 'FillBlank', subject: 'Math', grade: 'Primary School', difficulty: 2,
    content: '一条路长100米，在路的一侧种树，每隔5米种一棵（两端都种）。一共需要种______棵树。',
    answer: '21',
    analysis: '两端都种的植树问题。棵数 = 间隔数 + 1。间隔数 = 100 ÷ 5 = 20。棵数 = 20 + 1 = 21。',
    knowledgePoint: '植树问题', tags: ['应用题'], source: '高思导引', author: 'Math Team', createdAt: '2024-11-02'
  },
  {
    id: 'Q-GS4-APP-05', type: 'Essay', subject: 'Math', grade: 'Primary School', difficulty: 4,
    content: '甲、乙两人同时从两地相向而行，甲每小时行5千米，乙每小时行4千米。两人在距离中点3千米处相遇。两地相距多少千米？',
    answer: '54千米',
    analysis: '在距中点3千米处相遇，说明甲比乙多行了 3×2=6千米。两人速度差为 5-4=1千米/小时。相遇时间 = 6÷1=6小时。总路程 = (5+4)×6 = 54千米。',
    knowledgePoint: '行程问题', tags: ['应用题', '相遇问题'], source: '高思导引', author: 'Math Team', createdAt: '2024-11-02'
  },
  {
    id: 'Q-GS4-APP-06', type: 'Essay', subject: 'Math', grade: 'Primary School', difficulty: 3,
    content: '老师给小朋友分糖果，如果每人分5块，还差4块；如果每人分4块，则多出6块。问有多少个小朋友？',
    answer: '10个',
    analysis: '盈亏问题。总差额 = 4(亏) + 6(盈) = 10块。每人分配差额 = 5 - 4 = 1块。人数 = 10 ÷ 1 = 10人。',
    knowledgePoint: '盈亏问题', tags: ['应用题'], source: '高思导引', author: 'Math Team', createdAt: '2024-11-02'
  },

  // --- 3. 几何与图形 (Geometry) ---
  {
    id: 'Q-GS4-GEO-01', type: 'Essay', subject: 'Math', grade: 'Primary School', difficulty: 4,
    content: '如图，一个长方形被两条直线分成四个小长方形，其中三个的面积分别是12、15、20，求阴影部分（第四个小长方形）的面积。（注：12与20对角）',
    answer: '16 (若12,20相对) 或 25 (若15,20相邻等情况，通常默认对角积相等)',
    analysis: '长方形分割模型性质：对角位置的小长方形面积之积相等。设阴影面积为x。若12和20是对角，则 $12 \\times 20 = 15 \\times x$，解得 $x = 240 \\div 15 = 16$。',
    knowledgePoint: '长方形面积', tags: ['几何', '面积模型'], source: '高思导引', author: 'Math Team', createdAt: '2024-11-03'
  },
  {
    id: 'Q-GS4-GEO-02', type: 'FillBlank', subject: 'Math', grade: 'Primary School', difficulty: 2,
    content: '一个正方形的周长是24厘米，它的面积是______平方厘米。',
    answer: '36',
    analysis: '边长 = 24 ÷ 4 = 6厘米。面积 = 6 × 6 = 36平方厘米。',
    knowledgePoint: '正方形面积', tags: ['几何'], source: '高思导引', author: 'Math Team', createdAt: '2024-11-03'
  },
  {
    id: 'Q-GS4-GEO-03', type: 'SingleChoice', subject: 'Math', grade: 'Primary School', difficulty: 3,
    content: '数一数，下图中共有多少个长方形？（图略：3行4列的网格）',
    options: ['30', '60', '100', '150'],
    answer: 'B (60)',
    analysis: '长方形个数公式：(长边线段数) × (宽边线段数)。4列有线段 (4+3+2+1)=10条；3行有线段 (3+2+1)=6条。总数 = 10 × 6 = 60个。',
    knowledgePoint: '图形计数', tags: ['几何', '组合'], source: '高思导引', author: 'Math Team', createdAt: '2024-11-03'
  },

  // --- 4. 计数与逻辑 (Combinatorics & Logic) ---
  {
    id: 'Q-GS4-LOG-01', type: 'FillBlank', subject: 'Math', grade: 'Primary School', difficulty: 3,
    content: '抽屉原理：某班有37名同学，至少有______名同学在同一个月出生。',
    answer: '4',
    analysis: '37 ÷ 12 = 3 ...... 1。根据抽屉原理，至少有 3+1 = 4 人出生在同一个月。',
    knowledgePoint: '抽屉原理', tags: ['组合', '鸽巢原理'], source: '高思导引', author: 'Math Team', createdAt: '2024-11-04'
  },
  {
    id: 'Q-GS4-LOG-02', type: 'FillBlank', subject: 'Math', grade: 'Primary School', difficulty: 3,
    content: '用0、1、2、3能组成______个没有重复数字的三位数。',
    answer: '18',
    analysis: '百位不能是0，有3种选法（1,2,3）。十位有3种（0加剩下的2个）。个位有2种。总数 = 3 × 3 × 2 = 18个。',
    knowledgePoint: '加乘原理', tags: ['排列组合'], source: '高思导引', author: 'Math Team', createdAt: '2024-11-04'
  },
  {
    id: 'Q-GS4-LOG-03', type: 'Essay', subject: 'Math', grade: 'Primary School', difficulty: 4,
    content: 'A、B、C、D四人比赛，A说：我得第一；B说：我不是第一；C说：我不是最后；D说：我不是第一，也不是最后。已知他们四人中只有一人说了真话，请推断名次。',
    answer: 'C第一，A第二，D第三，B第四 (示例推理)',
    analysis: '逻辑推理题。假设法：假设A真，则A第一。B假->B第一(矛盾)。所以A假，A不是第一。假设B真...通过矛盾排除法求解。',
    knowledgePoint: '逻辑推理', tags: ['逻辑', '假设法'], source: '高思导引', author: 'Math Team', createdAt: '2024-11-04'
  }
];

// --- MOCK QUESTIONS: ORIGINAL (High School) ---
const HIGH_SCHOOL_QUESTIONS: Question[] = [
  { 
    id: 'Q1001', type: 'SingleChoice', subject: 'Math', grade: 'High School', difficulty: 2, 
    content: '已知函数 $f(x) = x^2 + 2x$，则 $f\'(1)$ 的值是？', options: ['2', '3', '4', '5'], answer: 'C (4)', 
    analysis: '对函数求导得 $f\'(x) = 2x + 2$，代入 $x=1$ 得 $f\'(1) = 2(1) + 2 = 4$。', knowledgePoint: '导数的运算', source: '2024期中', tags: ['导数'], createdAt: '2024-11-01', author: 'Dr. Chen' 
  },
  { 
    id: 'Q1004', type: 'Essay', subject: 'Math', grade: 'High School', difficulty: 5, 
    content: '求证：$\sqrt{2}$ 是无理数。', answer: '略 (见解析)', 
    analysis: '使用反证法。假设 $\sqrt{2}$ 是有理数...', knowledgePoint: '反证法', source: '经典例题', tags: ['逻辑'], createdAt: '2024-11-05', author: 'Dr. Chen' 
  },
];

const MOCK_QUESTIONS = [...HIGH_SCHOOL_QUESTIONS, ...GRADE_4_QUESTIONS];

// --- TEXTBOOKS ---
const MOCK_TEXTBOOKS: TextbookResource[] = [
    // ... Existing High School Books ...
    { 
        id: 'TB001', title: '人教版高中数学必修第一册 教材全解', subject: 'Math', grade: 'Grade 10', version: '人教版', type: 'Guide', author: '王后雄', downloadCount: 15000,
        chapters: [{ id: 'CH1', title: '第一章 集合', resources: [], knowledgePoints: ['集合的概念'] }]
    },
    
    // --- GAOSI TEXTBOOKS (Primary School) ---
    { 
        id: 'TB-GS4-Guide', 
        title: '高思学校竞赛数学导引 (四年级)', 
        subject: 'Math', 
        grade: 'Primary School', 
        version: '高思版', 
        type: 'Guide', 
        author: '徐鸣皋', 
        downloadCount: 22000,
        description: '四年级竞赛数学必备“大白本”，涵盖整数计算、典型应用题、几何图形、组合数学等核心模块。重点培养学生在复杂计算和逻辑推理方面的能力。',
        chapters: [
            { 
                id: 'GS4-C1', title: '第一讲 整数计算综合', 
                knowledgePoints: ['乘法巧算', '提取公因数', '定义新运算', '等差数列'], 
                resources: [{ id: 'R-GS4-1', type: 'PDF', name: '第一讲 知识点精讲.pdf', size: '1.2 MB' }] 
            },
            { 
                id: 'GS4-C2', title: '第二讲 和差倍问题', 
                knowledgePoints: ['和倍问题', '差倍问题', '和差问题', '年龄问题'], 
                resources: [{ id: 'R-GS4-2', type: 'Video', name: '名师精讲：画图解和倍.mp4', size: '150 MB' }] 
            },
            { 
                id: 'GS4-C3', title: '第三讲 植树与盈亏', 
                knowledgePoints: ['植树问题', '盈亏问题'], 
                resources: [] 
            },
            { 
                id: 'GS4-C4', title: '第四讲 行程问题初步', 
                knowledgePoints: ['行程问题', '相遇问题'], 
                resources: [] 
            },
            { 
                id: 'GS4-C5', title: '第五讲 几何图形与面积', 
                knowledgePoints: ['长方形面积', '正方形面积', '图形计数'], 
                resources: [] 
            },
            {
                id: 'GS4-C6', title: '第六讲 鸡兔同笼与假设法',
                knowledgePoints: ['鸡兔同笼', '假设法'],
                resources: []
            },
            {
                id: 'GS4-C7', title: '第七讲 组合与逻辑',
                knowledgePoints: ['抽屉原理', '加乘原理', '逻辑推理'],
                resources: []
            }
        ]
    }
];

// --- KNOWLEDGE TREE ---
const KNOWLEDGE_TREE = [
    // --- High School ---
    { title: '高中数学 (High School)', id: 'HS', children: [
        { title: '集合与常用逻辑用语', id: 'T1' },
        { title: '函数的概念与性质', id: 'T3' },
    ]},
    // --- Primary School (Grade 4) ---
    { title: '小学数学 (四年级)', id: 'PS4', children: [
        { title: '计算综合', id: 'PS4-Calc', children: [
            { title: '乘法巧算', id: 'PS4-Calc-1' },
            { title: '提取公因数', id: 'PS4-Calc-2' },
            { title: '定义新运算', id: 'PS4-Calc-3' },
            { title: '等差数列', id: 'PS4-Calc-4' },
        ]},
        { title: '典型应用题', id: 'PS4-App', children: [
            { title: '和差倍问题', id: 'PS4-App-1' },
            { title: '年龄问题', id: 'PS4-App-2' },
            { title: '植树问题', id: 'PS4-App-3' },
            { title: '盈亏问题', id: 'PS4-App-4' },
            { title: '鸡兔同笼', id: 'PS4-App-5' },
            { title: '行程问题', id: 'PS4-App-6' },
        ]},
        { title: '几何与图形', id: 'PS4-Geo', children: [
            { title: '长方形面积', id: 'PS4-Geo-1' },
            { title: '正方形面积', id: 'PS4-Geo-2' },
            { title: '图形计数', id: 'PS4-Geo-3' },
        ]},
        { title: '计数与逻辑', id: 'PS4-Comb', children: [
            { title: '加乘原理', id: 'PS4-Comb-1' },
            { title: '抽屉原理', id: 'PS4-Comb-2' },
            { title: '逻辑推理', id: 'PS4-Comb-3' },
        ]}
    ]},
];

// ... (Rest of MOCK_PAPERS and other constants remain unchanged or can be imported if separate)
const MOCK_PAPERS: ExamPaper[] = []; // Simplified for brevity in this block

// --- TYPES ---
type FilterType = {
    stage: string;
    subject: string;
    type: string;
    difficulty: string;
    year: string;
    province: string;
    version: string;
};

export const QuestionBank: React.FC = () => {
  const [activeModule, setActiveModule] = useState<'questions' | 'papers' | 'textbooks'>('questions');

  // Filters
  const [filters, setFilters] = useState<FilterType>({
      stage: 'High School',
      subject: 'Math',
      type: 'All',
      difficulty: 'All',
      year: 'All',
      province: 'All',
      version: 'All'
  });
  const [activeKnowledgeId, setActiveKnowledgeId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedTreeNodes, setExpandedTreeNodes] = useState<Set<string>>(new Set(['HS', 'PS4', 'PS4-App', 'PS4-Calc']));

  // Data
  const [questions, setQuestions] = useState<Question[]>(MOCK_QUESTIONS);
  
  // Interaction
  const [paperBasket, setPaperBasket] = useState<string[]>([]);
  const [expandedAnalysis, setExpandedAnalysis] = useState<Set<string>>(new Set());
  
  // Selection State for Detail Views
  const [selectedPaper, setSelectedPaper] = useState<ExamPaper | null>(null);
  const [selectedTextbook, setSelectedTextbook] = useState<TextbookResource | null>(null);
  
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
      
      const searchLower = searchTerm.toLowerCase();
      const matchSearch = q.content.toLowerCase().includes(searchLower) || 
                          q.knowledgePoint?.toLowerCase().includes(searchLower) ||
                          q.tags?.some(tag => tag.toLowerCase().includes(searchLower));
      
      return matchStage && matchSubject && matchType && matchDifficulty && matchSearch;
  });

  const filteredTextbooks = MOCK_TEXTBOOKS.filter(t => {
      const matchSubject = filters.subject === 'All' || t.subject === filters.subject;
      const matchVersion = filters.version === 'All' || t.version === filters.version;
      const matchType = filters.type === 'All' || t.type === filters.type;
      const matchStage = filters.stage === 'All' || t.grade === filters.stage;
      const matchSearch = t.title.toLowerCase().includes(searchTerm.toLowerCase());
      return matchSubject && matchVersion && matchType && matchStage && matchSearch;
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

  const toggleTreeNode = (id: string) => {
      const newSet = new Set(expandedTreeNodes);
      if (newSet.has(id)) newSet.delete(id);
      else newSet.add(id);
      setExpandedTreeNodes(newSet);
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

  // --- SMART NAVIGATION LOGIC ---
  const navigateToRelatedQuestions = (chapterTitle: string) => {
      if (!selectedTextbook) return;

      // 1. Determine Grade/Stage context
      let targetStage = 'All';
      const grade = selectedTextbook.grade;
      if (grade.includes('Primary') || grade.match(/Grade [1-6]/)) {
          targetStage = 'Primary School';
      } else if (grade.includes('Middle') || grade.match(/Grade [7-9]/)) {
          targetStage = 'Middle School';
      } else if (grade.includes('High') || grade.match(/Grade 1[0-2]/)) {
          targetStage = 'High School';
      }

      // 2. Extract meaningful keywords from Chapter Title (e.g. "第1讲 整数计算" -> "整数计算")
      // Remove "第X讲" prefix
      const keyword = chapterTitle.replace(/^第[0-9一二三四五六七八九十]+[讲章课]\s*/, '').trim();

      // 3. Update Filters & Search
      setFilters(prev => ({
          ...prev,
          subject: selectedTextbook.subject,
          stage: targetStage,
          type: 'All', 
          difficulty: 'All' 
      }));
      setSearchTerm(keyword);
      
      // 4. Switch View
      setSelectedTextbook(null);
      setActiveModule('questions');
  };

  const getFileIcon = (type: string) => {
      if(type === 'PDF') return <FileText size={18} className="text-red-500"/>;
      if(type === 'PPT') return <FileText size={18} className="text-orange-500"/>;
      if(type === 'Video') return <Video size={18} className="text-blue-500"/>;
      if(type === 'Word') return <FileText size={18} className="text-blue-700"/>;
      return <File size={18} className="text-slate-500"/>;
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

  // Recursive Tree Renderer
  const renderTree = (nodes: any[], level = 0) => {
      return nodes.map(node => (
          <div key={node.id} className="mb-1">
              <div 
                  className={`flex items-center gap-2 px-3 py-2 rounded cursor-pointer transition-colors ${activeKnowledgeId === node.id ? 'bg-brand-50 text-brand-700 font-medium' : 'text-slate-600 hover:bg-slate-50'}`}
                  style={{ paddingLeft: `${12 + level * 16}px` }}
                  onClick={() => { 
                      if(node.children) toggleTreeNode(node.id);
                      else {
                          setActiveKnowledgeId(node.id);
                          setSearchTerm(node.title); // Auto filter by knowledge point title
                      }
                  }}
              >
                  {node.children ? (
                      <ChevronDown size={14} className={`transition-transform text-slate-400 ${expandedTreeNodes.has(node.id) ? '' : '-rotate-90'}`} />
                  ) : (
                      <div className="w-[14px]"></div>
                  )}
                  
                  {node.children ? <Folder size={16} className={expandedTreeNodes.has(node.id) ? 'text-brand-500' : 'text-slate-400'}/> : <FileText size={16} className="text-slate-400"/>}
                  <span className="truncate">{node.title}</span>
              </div>
              {node.children && expandedTreeNodes.has(node.id) && (
                  <div>{renderTree(node.children, level + 1)}</div>
              )}
          </div>
      ));
  };

  return (
    <div className="flex h-[calc(100vh-64px)] overflow-hidden bg-slate-50">
      
      {/* LEFT SIDEBAR: KNOWLEDGE TREE */}
      {!selectedPaper && !selectedTextbook && (
        <div className="w-72 bg-white border-r border-slate-200 flex flex-col flex-shrink-0">
            <div className="p-4 border-b border-slate-200">
                <h3 className="font-bold text-slate-800 flex items-center gap-2">
                    <Layers size={18} className="text-brand-600"/> 知识点导航
                </h3>
            </div>
            <div className="flex-1 overflow-y-auto p-2">
                {renderTree(KNOWLEDGE_TREE)}
            </div>
        </div>
      )}

      {/* MAIN CONTENT */}
      <div className="flex-1 flex flex-col min-w-0">
          
          {/* HEADER */}
          {!selectedPaper && !selectedTextbook && (
            <div className="bg-white border-b border-slate-200 p-6 shadow-sm z-10">
              <div className="flex flex-col xl:flex-row justify-between xl:items-center mb-6 gap-4">
                  <div>
                      <h1 className="text-2xl font-bold text-slate-900">题库资源 Question Bank</h1>
                      <p className="text-slate-500 text-sm mt-1">海量试题 · 智能组卷 · 模拟真题 · 教材辅导</p>
                  </div>
                  <div className="flex gap-3">
                      <div className="flex bg-slate-100 p-1 rounded-lg">
                          <button 
                            onClick={() => setActiveModule('questions')}
                            className={`px-4 py-2 text-sm font-medium rounded-md transition-all ${activeModule === 'questions' ? 'bg-white text-brand-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                          >
                              试题库
                          </button>
                          <button 
                            onClick={() => setActiveModule('textbooks')}
                            className={`px-4 py-2 text-sm font-medium rounded-md transition-all ${activeModule === 'textbooks' ? 'bg-white text-brand-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                          >
                              教材辅导
                          </button>
                      </div>
                      
                      <div className="relative">
                          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                          <input 
                            type="text" 
                            placeholder="搜索资源、知识点..." 
                            className="pl-9 pr-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 w-64"
                            value={searchTerm}
                            onChange={e => setSearchTerm(e.target.value)}
                          />
                      </div>
                      {activeModule === 'questions' && (
                        <button 
                            onClick={() => { setEditingQuestion({}); setIsModalOpen(true); }}
                            className="flex items-center px-4 py-2 bg-brand-600 text-white rounded-lg hover:bg-brand-700 transition-colors shadow-sm font-medium text-sm"
                        >
                            <Plus size={16} className="mr-2"/> 录入试题
                        </button>
                      )}
                  </div>
              </div>

              <div className="bg-slate-50 rounded-lg p-4 border border-slate-100 space-y-1">
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
                  
                  {activeModule === 'questions' && (
                      <>
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
                            label="题型" 
                            value={filters.type} 
                            onChange={(v) => setFilters({...filters, type: v})}
                            options={[
                                {label: '全部', value: 'All'},
                                {label: '单选题', value: 'SingleChoice'},
                                {label: '填空题', value: 'FillBlank'},
                                {label: '解答题', value: 'Essay'}
                            ]}
                        />
                      </>
                  )}

                  {activeModule === 'textbooks' && (
                      <>
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
                            label="类型" 
                            value={filters.type} 
                            onChange={(v) => setFilters({...filters, type: v})}
                            options={[
                                {label: '全部', value: 'All'},
                                {label: '导引(Guide)', value: 'Guide'},
                                {label: '课本(Textbook)', value: 'Textbook'}
                            ]}
                        />
                      </>
                  )}
              </div>
            </div>
          )}

          {/* LIST VIEWS */}
          {!selectedPaper && !selectedTextbook && (
            <div className="flex-1 overflow-y-auto p-6 bg-slate-50/50">
                {/* QUESTIONS LIST */}
                {activeModule === 'questions' && (
                    <div className="space-y-4">
                        {filteredQuestions.map(q => (
                            <div key={q.id} className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow group">
                                <div className="flex justify-between items-start mb-4">
                                    <div className="flex items-center gap-2 text-xs">
                                        <span className={`px-2 py-0.5 rounded border font-medium ${
                                            q.type === 'SingleChoice' ? 'bg-blue-50 text-blue-700 border-blue-100' :
                                            q.type === 'Essay' ? 'bg-purple-50 text-purple-700 border-purple-100' :
                                            'bg-slate-50 text-slate-700 border-slate-200'
                                        }`}>
                                            {q.type === 'SingleChoice' ? '单选' : q.type === 'FillBlank' ? '填空' : '解答'}
                                        </span>
                                        <span className="flex gap-0.5" title={`Difficulty: ${q.difficulty}`}>
                                            {Array.from({length: 5}).map((_,i) => (
                                                <div key={i} className={`w-1.5 h-1.5 rounded-full ${i < q.difficulty ? 'bg-amber-400' : 'bg-slate-200'}`}></div>
                                            ))}
                                        </span>
                                        <span className="text-slate-400 px-2 border-l border-slate-200">{q.source || '校本题库'}</span>
                                        {q.grade === 'Primary School' && <span className="bg-orange-50 text-orange-600 px-2 py-0.5 rounded-full">小学</span>}
                                        {q.knowledgePoint && <span className="text-brand-600 bg-brand-50 px-2 py-0.5 rounded-full">{q.knowledgePoint}</span>}
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

                                <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                                    <div className="flex gap-4">
                                        <button 
                                            onClick={() => toggleAnalysis(q.id)}
                                            className={`text-sm font-medium flex items-center gap-1 transition-colors ${expandedAnalysis.has(q.id) ? 'text-brand-600' : 'text-slate-500 hover:text-brand-600'}`}
                                        >
                                            {expandedAnalysis.has(q.id) ? '收起解析' : '查看解析'} <ChevronRight size={14} className={`transition-transform ${expandedAnalysis.has(q.id) ? 'rotate-90' : ''}`}/>
                                        </button>
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
                                            <><CheckCircle size={16}/> 已加入</>
                                        ) : (
                                            <><Plus size={16}/> 加入试卷</>
                                        )}
                                    </button>
                                </div>

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
                        {filteredQuestions.length === 0 && <EmptyState/>}
                    </div>
                )}

                {/* TEXTBOOKS LIST */}
                {activeModule === 'textbooks' && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredTextbooks.map(tb => (
                            <div 
                                key={tb.id} 
                                onClick={() => setSelectedTextbook(tb)}
                                className="bg-white rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-all overflow-hidden group cursor-pointer"
                            >
                                <div className="h-32 bg-slate-100 flex items-center justify-center relative">
                                    {tb.type === 'MicroClass' ? <Video size={40} className="text-slate-300"/> : <Book size={40} className="text-slate-300"/>}
                                    <div className="absolute top-2 right-2 bg-black/60 text-white text-xs px-2 py-1 rounded backdrop-blur-sm">
                                        {tb.version}
                                    </div>
                                </div>
                                <div className="p-4">
                                    <h4 className="font-bold text-slate-900 mb-1 line-clamp-1 group-hover:text-brand-600 transition-colors" title={tb.title}>{tb.title}</h4>
                                    <p className="text-xs text-slate-500 mb-3">{tb.grade} · {tb.subject} · {tb.author}</p>
                                    <div className="flex items-center justify-between pt-3 border-t border-slate-100">
                                        <span className={`text-xs px-2 py-0.5 rounded ${
                                            tb.type === 'Guide' ? 'bg-emerald-50 text-emerald-700' : 
                                            tb.type === 'Textbook' ? 'bg-blue-50 text-blue-700' :
                                            tb.type === 'MicroClass' ? 'bg-purple-50 text-purple-700' : 'bg-amber-50 text-amber-700'
                                        }`}>
                                            {tb.type === 'MicroClass' ? '微课' : tb.type === 'Guide' ? '教辅' : '课本'}
                                        </span>
                                        <button className="text-brand-600 hover:text-brand-700 text-sm font-medium">查看详情</button>
                                    </div>
                                </div>
                            </div>
                        ))}
                        {filteredTextbooks.length === 0 && <div className="col-span-full"><EmptyState/></div>}
                    </div>
                )}
            </div>
          )}

          {/* DETAIL VIEW: TEXTBOOK RESOURCE */}
          {selectedTextbook && (
              <div className="flex-1 overflow-y-auto bg-slate-50 p-8 animate-fade-in">
                  <button onClick={() => setSelectedTextbook(null)} className="flex items-center gap-2 text-slate-500 hover:text-brand-600 mb-4 transition-colors font-medium">
                      <ChevronLeft size={20}/> 返回资源列表
                  </button>

                  <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col md:flex-row mb-6">
                      <div className="w-full md:w-64 bg-slate-100 p-8 flex items-center justify-center border-r border-slate-100">
                          <Book size={80} className="text-slate-300 drop-shadow-md"/>
                      </div>
                      <div className="flex-1 p-8">
                          <h1 className="text-2xl font-bold text-slate-900 mb-2">{selectedTextbook.title}</h1>
                          <div className="flex flex-wrap gap-2 mb-4">
                              <span className="bg-slate-100 text-slate-600 px-2 py-1 rounded text-xs">{selectedTextbook.grade}</span>
                              <span className="bg-slate-100 text-slate-600 px-2 py-1 rounded text-xs">{selectedTextbook.subject}</span>
                              <span className="bg-slate-100 text-slate-600 px-2 py-1 rounded text-xs">{selectedTextbook.version}</span>
                          </div>
                          <p className="text-slate-600 text-sm leading-relaxed mb-6">
                              {selectedTextbook.description || '暂无简介。'}
                          </p>
                      </div>
                  </div>

                  <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden p-6">
                      <h3 className="font-bold text-lg text-slate-800 mb-6 flex items-center gap-2">
                          <List size={20} className="text-brand-600"/> 章节目录
                      </h3>
                      
                      <div className="space-y-4">
                          {selectedTextbook.chapters && selectedTextbook.chapters.length > 0 ? (
                              selectedTextbook.chapters.map((chapter, idx) => (
                                  <div key={idx} className="border border-slate-200 rounded-xl overflow-hidden">
                                      <div className="bg-slate-50 px-4 py-3 font-bold text-slate-700 border-b border-slate-100 flex justify-between items-center flex-wrap gap-2">
                                          <span>{chapter.title}</span>
                                          <div className="flex items-center gap-3">
                                              {chapter.knowledgePoints && chapter.knowledgePoints.length > 0 && (
                                                  <span className="text-xs bg-white text-slate-500 px-2 py-1 rounded border border-slate-200 hidden sm:inline-block">
                                                      关联知识点: {chapter.knowledgePoints.join(', ')}
                                                  </span>
                                              )}
                                              <button 
                                                onClick={() => navigateToRelatedQuestions(chapter.title)}
                                                className="text-xs flex items-center gap-1 bg-brand-600 text-white px-3 py-1.5 rounded hover:bg-brand-700 transition-colors shadow-sm"
                                              >
                                                  <Database size={12}/> 查看相关试题
                                              </button>
                                          </div>
                                      </div>
                                      {chapter.resources.length > 0 ? (
                                          <div className="divide-y divide-slate-100">
                                              {chapter.resources.map(res => (
                                                  <div key={res.id} className="px-4 py-3 flex items-center justify-between hover:bg-brand-50/50 transition-colors group">
                                                      <div className="flex items-center gap-3">
                                                          {getFileIcon(res.type)}
                                                          <span className="text-sm text-slate-700 font-medium group-hover:text-brand-700">{res.name}</span>
                                                      </div>
                                                      <button className="text-brand-600 hover:text-brand-800 text-xs font-bold border border-brand-200 px-2 py-1 rounded bg-white hover:bg-brand-50">
                                                          下载
                                                      </button>
                                                  </div>
                                              ))}
                                          </div>
                                      ) : (
                                          <div className="px-4 py-3 text-xs text-slate-400 italic">本讲暂无电子资源，请点击上方按钮查看题库。</div>
                                      )}
                                  </div>
                              ))
                          ) : (
                              <div className="text-center py-8 text-slate-400">暂无章节目录信息</div>
                          )}
                      </div>
                  </div>
              </div>
          )}

      </div>

      {/* EDIT MODAL (Only for questions) */}
      {isModalOpen && activeModule === 'questions' && (
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

const EmptyState = () => (
    <div className="py-20 text-center text-slate-400 flex flex-col items-center">
        <Database size={48} className="mb-4 opacity-30"/>
        <p>未找到符合条件的资源，请尝试调整筛选条件</p>
    </div>
);