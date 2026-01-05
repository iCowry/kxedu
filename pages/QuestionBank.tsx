import React, { useState } from 'react';
import { Database, Filter, Plus, Search, Eye, Edit2, Trash2, CheckCircle, HelpCircle, Layers, X, Save, FileText, ChevronRight, ShoppingCart, List, Folder, AlertCircle, Book, Download, GraduationCap, Video, ChevronLeft, Clock, File, ChevronDown } from 'lucide-react';
import { Question, ExamPaper, TextbookResource, ExamPaperStructure, TextbookChapter } from '../types';

// --- MOCK DATA ---
const MOCK_QUESTIONS: Question[] = [
  // --- High School Questions ---
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

  // --- Grade 4 Math Questions (Gaosi Guide Related) ---
  {
    id: 'Q-GS4-001',
    type: 'FillBlank',
    subject: 'Math',
    grade: 'Primary School',
    difficulty: 2,
    content: '计算：$125 \\times 32 \\times 25 = \\_\\_\\_\\_\\_\\_$',
    answer: '100000',
    analysis: '原式 = $125 \\times (8 \\times 4) \\times 25 = (125 \\times 8) \\times (4 \\times 25) = 1000 \\times 100 = 100000$。',
    knowledgePoint: '乘法巧算',
    source: '高思导引四年级',
    tags: ['计算', '结合律'],
    createdAt: '2024-11-20',
    author: 'Math Team'
  },
  {
    id: 'Q-GS4-002',
    type: 'Essay',
    subject: 'Math',
    grade: 'Primary School',
    difficulty: 3,
    content: '甲、乙两堆货物共180吨，甲堆货物运走20吨后，剩下的货物质量是乙堆的3倍。求甲、乙两堆货物原来各有多少吨？',
    answer: '甲堆140吨，乙堆40吨',
    analysis: '设乙堆为1份，则甲堆运走20吨后为3份。总份数变化为：180-20=160吨。1份(乙) = 160 ÷ (3+1) = 40吨。甲 = 180 - 40 = 140吨。',
    knowledgePoint: '和倍问题',
    source: '高思导引四年级',
    tags: ['应用题', '画图法'],
    createdAt: '2024-11-21',
    author: 'Math Team'
  },
  {
    id: 'Q-GS4-003',
    type: 'SingleChoice',
    subject: 'Math',
    grade: 'Primary School',
    difficulty: 3,
    content: '鸡兔同笼，头共35，足共94，问兔子有多少只？',
    options: ['12', '23', '10', '25'],
    answer: 'A (12)',
    analysis: '假设全是鸡，脚应为 35×2=70只，比实际少 94-70=24只。每把一只鸡换成兔，脚增加2只。兔数 = 24÷2 = 12只。',
    knowledgePoint: '鸡兔同笼',
    source: '经典奥数',
    tags: ['假设法', '应用题'],
    createdAt: '2024-11-22',
    author: 'Math Team'
  },
  {
    id: 'Q-GS4-004',
    type: 'FillBlank',
    subject: 'Math',
    grade: 'Primary School',
    difficulty: 4,
    content: '定义新运算 $a \\otimes b = 3a + 2b$，求 $(4 \\otimes 5) \\otimes 2 = \\_\\_\\_\\_\\_\\_$',
    answer: '70',
    analysis: '$4 \\otimes 5 = 3\\times4 + 2\\times5 = 12+10=22$。然后 $22 \\otimes 2 = 3\\times22 + 2\\times2 = 66+4=70$。',
    knowledgePoint: '定义新运算',
    source: '高思导引四年级',
    tags: ['代数', '新定义'],
    createdAt: '2024-11-22',
    author: 'Math Team'
  },
  {
    id: 'Q-GS4-005',
    type: 'Essay',
    subject: 'Math',
    grade: 'Primary School',
    difficulty: 4,
    content: '如图，一个长方形被两条直线分成四个小长方形，其中三个的面积分别是12、15、20，求阴影部分（第四个小长方形）的面积。',
    answer: '16 或 25 (取决于位置关系，本题缺图假设对角关系)',
    analysis: '长方形面积比性质：对角长方形面积乘积相等。若12与20对角，则 $12\\times20 = 15 \\times x$，x=16。',
    knowledgePoint: '长方形面积',
    source: '高思导引四年级',
    tags: ['几何', '面积模型'],
    createdAt: '2024-11-23',
    author: 'Math Team'
  }
];

const MOCK_PAPERS: ExamPaper[] = [
    { 
        id: 'P001', 
        title: '2024年北京市高考数学真题卷 (含解析)', 
        type: 'Real', 
        year: 2024, 
        province: '北京', 
        subject: 'Math', 
        grade: 'Grade 12', 
        difficulty: 4, 
        downloadCount: 5200, 
        createdAt: '2024-06-10',
        timeLimit: 120,
        totalScore: 150,
        structure: [
            { name: '第一部分 选择题', desc: '共10小题，每题4分，共40分', score: 40 },
            { name: '第二部分 填空题', desc: '共5小题，每题5分，共25分', score: 25 },
            { name: '第三部分 解答题', desc: '共6小题，共85分', score: 85 },
        ]
    },
    { 
        id: 'P002', 
        title: '2024年浙江省高考数学真题卷', 
        type: 'Real', 
        year: 2024, 
        province: '浙江', 
        subject: 'Math', 
        grade: 'Grade 12', 
        difficulty: 5, 
        downloadCount: 4800, 
        createdAt: '2024-06-10',
        timeLimit: 120,
        totalScore: 150,
        structure: [
            { name: '第一卷 选择题', desc: '共8小题', score: 40 },
            { name: '第二卷 非选择题', desc: '填空与解答', score: 110 }
        ]
    },
    { 
        id: 'P003', 
        title: '2025届高三海淀区期中练习 (数学)', 
        type: 'Mock', 
        year: 2024, 
        province: '北京', 
        subject: 'Math', 
        grade: 'Grade 12', 
        difficulty: 3, 
        downloadCount: 1200, 
        createdAt: '2024-11-05',
        timeLimit: 120,
        totalScore: 150
    },
    { id: 'P004', title: '2023年全国中学生物理竞赛复赛真题', type: 'Real', year: 2023, province: '全国', subject: 'Physics', grade: 'High School', difficulty: 5, downloadCount: 3000, createdAt: '2023-09-25' },
];

const MOCK_TEXTBOOKS: TextbookResource[] = [
    { 
        id: 'TB001', 
        title: '人教版高中数学必修第一册 教材全解', 
        subject: 'Math', 
        grade: 'Grade 10', 
        version: '人教版', 
        type: 'Guide', 
        author: '王后雄', 
        downloadCount: 15000,
        description: '深度解析必修一核心知识点，配套课后习题详解。适合高一新生同步学习使用。',
        chapters: [
            { 
                id: 'CH1', title: '第一章 集合与常用逻辑用语', 
                resources: [
                    { id: 'R1-1', type: 'PPT', name: '1.1 集合的概念.ppt', size: '5.2 MB' },
                    { id: 'R1-2', type: 'Video', name: '名师讲解：集合的运算.mp4', size: '120 MB' },
                    { id: 'R1-3', type: 'PDF', name: '第一章同步练习题.pdf', size: '1.5 MB' }
                ],
                knowledgePoints: ['集合的概念', '集合的运算', '充分必要条件']
            },
            { 
                id: 'CH2', title: '第二章 一元二次函数、方程和不等式', 
                resources: [
                    { id: 'R2-1', type: 'PPT', name: '2.1 基本不等式.ppt', size: '4.8 MB' },
                    { id: 'R2-2', type: 'Word', name: '单元测试卷.docx', size: '0.8 MB' }
                ],
                knowledgePoints: ['一元二次不等式', '基本不等式']
            },
            { id: 'CH3', title: '第三章 函数的概念与性质', resources: [], knowledgePoints: ['函数的概念', '单调性', '奇偶性'] }
        ]
    },
    { id: 'TB002', title: '北师大版初中物理八年级下册 课课练', subject: 'Physics', grade: 'Grade 8', version: '北师大版', type: 'Workbook', author: '编写组', downloadCount: 8000 },
    { id: 'TB003', title: '新概念英语第二册 重点语法微课', subject: 'English', grade: 'Middle School', version: '通用', type: 'MicroClass', author: '新东方', downloadCount: 20000 },
    
    // --- GAOSI TEXTBOOKS (Primary School) ---
    { 
        id: 'TB-GS3-Guide', 
        title: '高思学校竞赛数学导引 (三年级)', 
        subject: 'Math', 
        grade: 'Primary School', 
        version: '高思版', 
        type: 'Guide', 
        author: '徐鸣皋', 
        downloadCount: 25000,
        description: '华语世界最畅销的小学数学竞赛辅导用书之一，被誉为“奥数红宝书”。包含兴趣篇、拓展篇、超越篇不同难度试题。',
        chapters: [
            { 
                id: 'GS3-C1', title: '第1讲 加减法巧算', 
                knowledgePoints: ['凑整法', '基准数法', '分组法'],
                resources: [
                    { id: 'R-GS3-1-1', type: 'PDF', name: '第1讲 电子教材.pdf', size: '4.5 MB' },
                    { id: 'R-GS3-1-2', type: 'Video', name: '名师精讲：速算巧算.mp4', size: '85 MB' }
                ]
            },
            { 
                id: 'GS3-C2', title: '第2讲 基本应用题', 
                knowledgePoints: ['和差倍问题', '植树问题'],
                resources: [
                    { id: 'R-GS3-2-1', type: 'PDF', name: '第2讲 电子教材.pdf', size: '4.2 MB' }
                ]
            },
            { id: 'GS3-C3', title: '第3讲 间隔与方阵', resources: [], knowledgePoints: ['植树问题', '方阵问题'] },
            { id: 'GS3-C4', title: '第4讲 简单枚举', resources: [], knowledgePoints: ['分类枚举', '有序枚举'] },
        ]
    },
    { 
        id: 'TB-GS3-Textbook', 
        title: '高思学校竞赛数学课本 (三年级上)', 
        subject: 'Math', 
        grade: 'Primary School', 
        version: '高思版', 
        type: 'Textbook', 
        author: '高思教育', 
        downloadCount: 18000,
        description: '适合基础知识的学习与巩固，内容生动有趣，配合导引使用效果更佳。',
        chapters: [
            { 
                id: 'GSKB3-C1', title: '第一课 乘除法入门', 
                knowledgePoints: ['乘法口诀', '除法竖式'],
                resources: [
                    { id: 'R-GSKB3-1', type: 'PDF', name: '第一课 课本扫描件.pdf', size: '15 MB' }
                ]
            },
            { 
                id: 'GSKB3-C2', title: '第二课 巧算乘除法', 
                knowledgePoints: ['乘法分配律', '提取公因数'],
                resources: [
                    { id: 'R-GSKB3-2', type: 'PDF', name: '第二课 课本扫描件.pdf', size: '14 MB' },
                    { id: 'R-GSKB3-2-2', type: 'Word', name: '课后作业.docx', size: '0.5 MB' }
                ]
            }
        ]
    },
    { 
        id: 'TB-GS4-Guide', 
        title: '高思学校竞赛数学导引 (四年级)', 
        subject: 'Math', 
        grade: 'Primary School', 
        version: '高思版', 
        type: 'Guide', 
        author: '徐鸣皋', 
        downloadCount: 22000,
        description: '四年级竞赛数学必备，涵盖整数计算、几何图形、行程问题等核心模块。重点培养学生在复杂计算和逻辑推理方面的能力。',
        chapters: [
            { 
                id: 'GS4-C1', title: '第1讲 整数计算综合', 
                knowledgePoints: ['乘法巧算', '提取公因数', '定义新运算'], 
                resources: [
                    { id: 'R-GS4-1-1', type: 'PDF', name: '第一讲 知识点总结.pdf', size: '1.2 MB' }
                ] 
            },
            { 
                id: 'GS4-C2', title: '第2讲 和差倍问题', 
                knowledgePoints: ['和倍问题', '差倍问题', '和差问题'], 
                resources: [
                    { id: 'R-GS4-2-1', type: 'Video', name: '名师精讲：画图解和差倍.mp4', size: '150 MB' }
                ] 
            },
            { 
                id: 'GS4-C3', title: '第3讲 鸡兔同笼与假设法', 
                knowledgePoints: ['鸡兔同笼', '假设法'], 
                resources: [] 
            },
            { 
                id: 'GS4-C4', title: '第4讲 多位数与小数', 
                knowledgePoints: ['小数的意义', '位值原理'], 
                resources: [] 
            },
            { 
                id: 'GS4-C5', title: '第5讲 几何图形与面积', 
                knowledgePoints: ['长方形面积', '正方形面积', '割补法'], 
                resources: [] 
            }
        ]
    },
    { 
        id: 'TB-GS5-Guide', 
        title: '高思学校竞赛数学导引 (五年级)', 
        subject: 'Math', 
        grade: 'Primary School', 
        version: '高思版', 
        type: 'Guide', 
        author: '徐鸣皋', 
        downloadCount: 28000,
        description: '高年级竞赛冲刺。重点攻克分数计算、比例模型、数论综合。',
        chapters: [
            { id: 'GS5-C1', title: '第1讲 分数计算', knowledgePoints: ['裂项消去', '换元法'], resources: [] },
            { id: 'GS5-C2', title: '第2讲 直线形计算', knowledgePoints: ['鸟头模型', '蝴蝶模型', '燕尾模型'], resources: [] }
        ]
    },
    { 
        id: 'TB-GS6-Guide', 
        title: '高思学校竞赛数学导引 (六年级)', 
        subject: 'Math', 
        grade: 'Primary School', 
        version: '高思版', 
        type: 'Guide', 
        author: '徐鸣皋', 
        downloadCount: 30000,
        description: '小升初及各大杯赛总复习利器。',
        chapters: []
    }
];

// --- TREE DATA (MOCK) ---
const KNOWLEDGE_TREE = [
    // --- High School ---
    { title: '高中数学 (High School)', id: 'HS', children: [
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
    ]},
    // --- Primary School (Grade 4) ---
    { title: '小学数学 (四年级)', id: 'PS4', children: [
        { title: '计算综合', id: 'PS4-Calc', children: [
            { title: '乘法巧算', id: 'PS4-Calc-1' },
            { title: '提取公因数', id: 'PS4-Calc-2' },
            { title: '定义新运算', id: 'PS4-Calc-3' },
        ]},
        { title: '应用题专题', id: 'PS4-App', children: [
            { title: '和差倍问题', id: 'PS4-App-1' },
            { title: '鸡兔同笼', id: 'PS4-App-2' },
            { title: '年龄问题', id: 'PS4-App-3' },
            { title: '还原问题', id: 'PS4-App-4' },
        ]},
        { title: '几何与图形', id: 'PS4-Geo', children: [
            { title: '长方形面积', id: 'PS4-Geo-1' },
            { title: '巧求周长', id: 'PS4-Geo-2' },
            { title: '图形计数', id: 'PS4-Geo-3' },
        ]},
        { title: '组合与逻辑', id: 'PS4-Comb', children: [
            { title: '抽屉原理', id: 'PS4-Comb-1' },
            { title: '加乘原理', id: 'PS4-Comb-2' },
        ]}
    ]},
];

// --- TYPES ---
type FilterType = {
    stage: string;
    subject: string;
    type: string;
    difficulty: string;
    // New filters for papers/textbooks
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
  const [expandedTreeNodes, setExpandedTreeNodes] = useState<Set<string>>(new Set(['HS', 'PS4']));

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
      
      const matchSearch = q.content.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          q.knowledgePoint?.toLowerCase().includes(searchTerm.toLowerCase());
      
      return matchStage && matchSubject && matchType && matchDifficulty && matchSearch;
  });

  const filteredPapers = MOCK_PAPERS.filter(p => {
      const matchSubject = filters.subject === 'All' || p.subject === filters.subject;
      const matchType = filters.type === 'All' || p.type === filters.type;
      const matchYear = filters.year === 'All' || p.year.toString() === filters.year;
      const matchProvince = filters.province === 'All' || p.province === filters.province;
      const matchSearch = p.title.toLowerCase().includes(searchTerm.toLowerCase());
      return matchSubject && matchType && matchYear && matchProvince && matchSearch;
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

  const navigateToRelatedQuestions = (chapterTitle: string) => {
      if (!selectedTextbook) return;

      // Determine target stage based on textbook grade to switch context correctly
      let targetStage = 'All';
      const grade = selectedTextbook.grade;
      if (grade.includes('Primary') || grade.match(/Grade [1-6]/)) {
          targetStage = 'Primary School';
      } else if (grade.includes('Middle') || grade.match(/Grade [7-9]/)) {
          targetStage = 'Middle School';
      } else if (grade.includes('High') || grade.match(/Grade 1[0-2]/)) {
          targetStage = 'High School';
      }

      // Update filters to match the textbook's context
      setFilters(prev => ({
          ...prev,
          subject: selectedTextbook.subject,
          stage: targetStage,
          type: 'All', // Reset type to show all relevant questions
          difficulty: 'All' // Reset difficulty
      }));

      // Pre-fill search with the chapter title (or better, strip "第x讲" for better search)
      const keyword = chapterTitle.replace(/^第\d+讲\s+/, '');
      setSearchTerm(keyword);
      
      // Switch view back to questions list
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
                      else setActiveKnowledgeId(node.id);
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
      
      {/* LEFT SIDEBAR: KNOWLEDGE TREE (Shared for all, hidden in detail view if needed, but let's keep it for context) */}
      {!selectedPaper && !selectedTextbook && (
        <div className="w-64 bg-white border-r border-slate-200 flex flex-col flex-shrink-0">
            <div className="p-4 border-b border-slate-200">
                <h3 className="font-bold text-slate-800 flex items-center gap-2">
                    <Layers size={18} className="text-brand-600"/> 知识点导航
                </h3>
            </div>
            <div className="flex-1 overflow-y-auto p-2">
                <div className="text-xs font-bold text-slate-400 uppercase px-3 mb-2 tracking-wider mt-2">
                    学科知识体系
                </div>
                {renderTree(KNOWLEDGE_TREE)}
            </div>
        </div>
      )}

      {/* MAIN CONTENT */}
      <div className="flex-1 flex flex-col min-w-0">
          
          {/* HEADER (Only show filters if not in detail view) */}
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
                            onClick={() => setActiveModule('papers')}
                            className={`px-4 py-2 text-sm font-medium rounded-md transition-all ${activeModule === 'papers' ? 'bg-white text-brand-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                          >
                              试卷库
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
                            placeholder="搜索资源..." 
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
                  
                  {/* Dynamic Filters based on Module */}
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
                                {label: '简单', value: 'Easy'},
                                {label: '中等', value: 'Medium'},
                                {label: '困难', value: 'Hard'}
                            ]}
                        />
                      </>
                  )}

                  {activeModule === 'papers' && (
                      <>
                        <FilterRow 
                            label="类型" 
                            value={filters.type} 
                            onChange={(v) => setFilters({...filters, type: v})}
                            options={[
                                {label: '全部', value: 'All'},
                                {label: '真题卷', value: 'Real'},
                                {label: '模拟卷', value: 'Mock'},
                                {label: '课后练习', value: 'Exercise'}
                            ]}
                        />
                        <FilterRow 
                            label="年份" 
                            value={filters.year} 
                            onChange={(v) => setFilters({...filters, year: v})}
                            options={[
                                {label: '全部', value: 'All'},
                                {label: '2024', value: '2024'},
                                {label: '2023', value: '2023'},
                                {label: '2022', value: '2022'}
                            ]}
                        />
                        <FilterRow 
                            label="地区" 
                            value={filters.province} 
                            onChange={(v) => setFilters({...filters, province: v})}
                            options={[
                                {label: '全部', value: 'All'},
                                {label: '全国', value: '全国'},
                                {label: '北京', value: '北京'},
                                {label: '浙江', value: '浙江'},
                                {label: '江苏', value: '江苏'}
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
                                {label: '课本(Textbook)', value: 'Textbook'},
                                {label: '练习册', value: 'Workbook'},
                                {label: '微课', value: 'MicroClass'}
                            ]}
                        />
                        <FilterRow 
                            label="版本" 
                            value={filters.version} 
                            onChange={(v) => setFilters({...filters, version: v})}
                            options={[
                                {label: '全部', value: 'All'},
                                {label: '高思版', value: '高思版'},
                                {label: '人教版', value: '人教版'},
                                {label: '北师大版', value: '北师大版'},
                                {label: '苏教版', value: '苏教版'},
                                {label: '通用', value: '通用'}
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
                                            {q.type}
                                        </span>
                                        <span className="flex gap-0.5" title={`Difficulty: ${q.difficulty}`}>
                                            {Array.from({length: 5}).map((_,i) => (
                                                <div key={i} className={`w-1.5 h-1.5 rounded-full ${i < q.difficulty ? 'bg-amber-400' : 'bg-slate-200'}`}></div>
                                            ))}
                                        </span>
                                        <span className="text-slate-400 px-2 border-l border-slate-200">{q.source || '校本题库'}</span>
                                        {q.grade === 'Primary School' && <span className="bg-orange-50 text-orange-600 px-2 py-0.5 rounded-full">小学</span>}
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

                {activeModule === 'papers' && (
                    <div className="space-y-4">
                        {filteredPapers.map(paper => (
                            <div 
                                key={paper.id} 
                                onClick={() => setSelectedPaper(paper)}
                                className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-all flex items-center gap-4 cursor-pointer group"
                            >
                                <div className={`w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0 transition-colors ${
                                    paper.type === 'Real' ? 'bg-red-50 text-red-600 group-hover:bg-red-100' : 'bg-blue-50 text-blue-600 group-hover:bg-blue-100'
                                }`}>
                                    <FileText size={24}/>
                                </div>
                                <div className="flex-1">
                                    <div className="flex items-center gap-2 mb-1">
                                        <span className={`text-xs px-1.5 py-0.5 rounded border ${
                                            paper.type === 'Real' ? 'bg-red-50 text-red-700 border-red-100' : 'bg-blue-50 text-blue-700 border-blue-100'
                                        }`}>
                                            {paper.type === 'Real' ? '真题' : '模拟'}
                                        </span>
                                        <h4 className="font-bold text-slate-900 group-hover:text-brand-600 transition-colors">{paper.title}</h4>
                                    </div>
                                    <div className="flex items-center gap-4 text-xs text-slate-500">
                                        <span>{paper.year}年</span>
                                        <span>{paper.province}</span>
                                        <span>{paper.grade}</span>
                                        <span className="flex items-center gap-1">
                                            难度: {Array.from({length: 5}).map((_,i) => (
                                                <div key={i} className={`w-1.5 h-1.5 rounded-full ${i < paper.difficulty ? 'bg-amber-400' : 'bg-slate-200'}`}></div>
                                            ))}
                                        </span>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <div className="text-xs text-slate-400 mb-2">{paper.downloadCount} 次下载</div>
                                    <button className="flex items-center gap-1 px-3 py-1.5 bg-slate-100 text-slate-700 rounded hover:bg-brand-600 hover:text-white transition-colors text-sm font-medium">
                                        <Eye size={14}/> 预览/下载
                                    </button>
                                </div>
                            </div>
                        ))}
                        {filteredPapers.length === 0 && <EmptyState/>}
                    </div>
                )}

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
                                            {tb.type === 'MicroClass' ? '微课视频' : tb.type === 'Guide' ? '教材解读' : tb.type === 'Textbook' ? '课本' : '同步练习'}
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

          {/* DETAIL VIEW: EXAM PAPER */}
          {selectedPaper && (
              <div className="flex-1 overflow-y-auto bg-slate-50 p-8 animate-fade-in">
                  <button onClick={() => setSelectedPaper(null)} className="flex items-center gap-2 text-slate-500 hover:text-brand-600 mb-4 transition-colors font-medium">
                      <ChevronLeft size={20}/> 返回试卷列表
                  </button>
                  
                  <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                      <div className="p-8 border-b border-slate-100 flex justify-between items-start">
                          <div>
                              <div className="flex items-center gap-3 mb-2">
                                  <h1 className="text-2xl font-bold text-slate-900">{selectedPaper.title}</h1>
                                  <span className={`px-2 py-0.5 rounded text-xs font-bold ${
                                      selectedPaper.type === 'Real' ? 'bg-red-100 text-red-700' : 'bg-blue-100 text-blue-700'
                                  }`}>{selectedPaper.type === 'Real' ? '真题' : '模拟'}</span>
                              </div>
                              <div className="flex items-center gap-6 text-sm text-slate-500">
                                  <span className="flex items-center gap-1"><Clock size={16}/> {selectedPaper.timeLimit} 分钟</span>
                                  <span className="flex items-center gap-1"><GraduationCap size={16}/> 总分 {selectedPaper.totalScore} 分</span>
                                  <span className="flex items-center gap-1">难度: {selectedPaper.difficulty}/5</span>
                              </div>
                          </div>
                          <div className="flex gap-3">
                              <button className="flex items-center gap-2 px-4 py-2 border border-slate-200 rounded-lg text-slate-700 hover:bg-slate-50 font-medium">
                                  <Eye size={18}/> 在线预览
                              </button>
                              <button className="flex items-center gap-2 px-4 py-2 bg-brand-600 text-white rounded-lg hover:bg-brand-700 font-medium shadow-sm">
                                  <Download size={18}/> 下载试卷包
                              </button>
                          </div>
                      </div>
                      
                      <div className="p-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
                          <div className="lg:col-span-2 space-y-6">
                              <h3 className="font-bold text-lg text-slate-800 border-l-4 border-brand-500 pl-3">试卷结构</h3>
                              {selectedPaper.structure ? (
                                  <div className="space-y-4">
                                      {selectedPaper.structure.map((sec, idx) => (
                                          <div key={idx} className="bg-slate-50 rounded-xl p-5 border border-slate-100 flex justify-between items-center">
                                              <div>
                                                  <h4 className="font-bold text-slate-900">{sec.name}</h4>
                                                  <p className="text-sm text-slate-500 mt-1">{sec.desc}</p>
                                              </div>
                                              <div className="text-xl font-bold text-slate-300">{sec.score}分</div>
                                          </div>
                                      ))}
                                  </div>
                              ) : (
                                  <p className="text-slate-400 italic">暂无结构数据</p>
                              )}
                          </div>
                          
                          <div className="space-y-6">
                              <div className="bg-brand-50 rounded-xl p-5 border border-brand-100">
                                  <h4 className="font-bold text-brand-800 mb-3 flex items-center gap-2"><Download size={18}/> 资源下载</h4>
                                  <ul className="space-y-3">
                                      <li className="flex justify-between items-center text-sm">
                                          <span className="flex items-center gap-2 text-slate-700"><FileText size={16} className="text-red-500"/> 试题卷 (PDF)</span>
                                          <button className="text-brand-600 hover:underline">下载</button>
                                      </li>
                                      <li className="flex justify-between items-center text-sm">
                                          <span className="flex items-center gap-2 text-slate-700"><FileText size={16} className="text-blue-500"/> 答案解析 (Word)</span>
                                          <button className="text-brand-600 hover:underline">下载</button>
                                      </li>
                                      <li className="flex justify-between items-center text-sm">
                                          <span className="flex items-center gap-2 text-slate-700"><Video size={16} className="text-purple-500"/> 讲解视频 (MP4)</span>
                                          <button className="text-brand-600 hover:underline">下载</button>
                                      </li>
                                  </ul>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
          )}

          {/* DETAIL VIEW: TEXTBOOK RESOURCE */}
          {selectedTextbook && (
              <div className="flex-1 overflow-y-auto bg-slate-50 p-8 animate-fade-in">
                  <button onClick={() => setSelectedTextbook(null)} className="flex items-center gap-2 text-slate-500 hover:text-brand-600 mb-4 transition-colors font-medium">
                      <ChevronLeft size={20}/> 返回资源列表
                  </button>

                  <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col md:flex-row">
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
                          <div className="flex gap-3">
                              <button className="px-4 py-2 bg-brand-600 text-white rounded-lg hover:bg-brand-700 font-medium shadow-sm">
                                  一键下载全套资料
                              </button>
                          </div>
                      </div>
                  </div>

                  <div className="mt-6 bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden p-6">
                      <h3 className="font-bold text-lg text-slate-800 mb-6 flex items-center gap-2">
                          <List size={20} className="text-brand-600"/> 章节目录与资源
                      </h3>
                      
                      <div className="space-y-4">
                          {selectedTextbook.chapters && selectedTextbook.chapters.length > 0 ? (
                              selectedTextbook.chapters.map((chapter, idx) => (
                                  <div key={idx} className="border border-slate-200 rounded-xl overflow-hidden">
                                      <div className="bg-slate-50 px-4 py-3 font-bold text-slate-700 border-b border-slate-100 flex justify-between items-center flex-wrap gap-2">
                                          <span>{chapter.title}</span>
                                          <div className="flex items-center gap-3">
                                              {chapter.knowledgePoints && chapter.knowledgePoints.length > 0 && (
                                                  <span className="text-xs bg-slate-100 text-slate-500 px-2 py-1 rounded border border-slate-200 hidden sm:inline-block">
                                                      关联知识点: {chapter.knowledgePoints.join(', ')}
                                                  </span>
                                              )}
                                              <button 
                                                onClick={() => navigateToRelatedQuestions(chapter.title)}
                                                className="text-xs flex items-center gap-1 bg-brand-50 text-brand-600 px-2 py-1.5 rounded border border-brand-100 hover:bg-brand-100 transition-colors font-normal"
                                              >
                                                  <Database size={12}/> 查看相关试题
                                              </button>
                                          </div>
                                      </div>
                                      <div className="divide-y divide-slate-100">
                                          {chapter.resources.map(res => (
                                              <div key={res.id} className="px-4 py-3 flex items-center justify-between hover:bg-brand-50/50 transition-colors group">
                                                  <div className="flex items-center gap-3">
                                                      {getFileIcon(res.type)}
                                                      <span className="text-sm text-slate-700 font-medium group-hover:text-brand-700">{res.name}</span>
                                                  </div>
                                                  <div className="flex items-center gap-4">
                                                      <span className="text-xs text-slate-400">{res.size}</span>
                                                      <button className="text-brand-600 hover:text-brand-800 text-xs font-bold border border-brand-200 px-2 py-1 rounded bg-white hover:bg-brand-50">
                                                          下载
                                                      </button>
                                                  </div>
                                              </div>
                                          ))}
                                          {chapter.resources.length === 0 && (
                                              <div className="px-4 py-3 text-sm text-slate-400 italic">本章节暂无资源</div>
                                          )}
                                      </div>
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

      {/* FLOATING BASKET WIDGET (Only for questions view) */}
      {activeModule === 'questions' && !selectedPaper && !selectedTextbook && (
        <div className="fixed bottom-8 right-8 z-50">
            <button className="relative bg-brand-600 hover:bg-brand-700 text-white p-4 rounded-full shadow-lg shadow-brand-200 transition-all hover:scale-105 flex items-center justify-center group">
                <ShoppingCart size={24} />
                {paperBasket.length > 0 && (
                    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold w-6 h-6 flex items-center justify-center rounded-full border-2 border-white">
                        {paperBasket.length}
                    </span>
                )}
                {/* Tooltip-like popup on hover/focus */}
                <div className="absolute bottom-full right-0 mb-3 hidden group-hover:block w-48 bg-white border border-slate-200 rounded-xl shadow-xl p-4 text-slate-800 animate-fade-in-up">
                    <h4 className="font-bold text-sm mb-2 border-b border-slate-100 pb-2">试卷篮 (Paper Basket)</h4>
                    <p className="text-xs text-slate-500 mb-3">已选 {paperBasket.length} 道试题</p>
                    <button className="w-full bg-brand-600 text-white text-xs py-2 rounded hover:bg-brand-700">去组卷</button>
                </div>
            </button>
        </div>
      )}

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