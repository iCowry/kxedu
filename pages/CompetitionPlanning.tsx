import React, { useState } from 'react';
import { Target, Calendar, MapPin, Flag, ChevronRight, Users, Plus, Award, Zap, Code, FlaskConical, Book, List, GraduationCap, ArrowRight } from 'lucide-react';
import { Competition, TrainingPlan, Student } from '../types';

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
  // Junior Competitions
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

// --- ROADMAP DATA STRUCTURE ---
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
        'Middle': [
            {
                term: '初一/初二 (联赛基础)',
                goal: '夯实代数几何基础，衔接高中思维',
                topics: ['因式分解技巧', '全等与相似', '一次函数与不等式', '整除与同余'],
                books: ['《奥数教程·七/八年级》', '《培优竞赛新方法》']
            },
            {
                term: '初三 (高联预备)',
                goal: '完成初中数学竞赛内容，提前接触高中模块',
                topics: ['二次函数综合', '圆与几何变换', '代数变形', '初等数论进阶'],
                books: ['《挑战中考数学压轴题》', '高中必修一教材']
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
        ],
        'Grade 11': [
            {
                term: '高二上 (加试突破)',
                goal: '主攻二试四大板块，冲击省一',
                topics: ['平面几何进阶', '初等数论', '组合数学', '数列与极限'],
                books: ['《命题人讲座·数论/组合》', '《走向IMO》']
            },
            {
                term: '高二下 (真题演练)',
                goal: '全真模拟，查漏补缺，备战联赛',
                topics: ['历年联赛真题训练', 'CMO 模拟题', '压轴题专项'],
                books: ['《历年高中数学联赛真题解析》', '《中等数学》月刊']
            }
        ],
        'Grade 12': [
            {
                term: '高三上 (冬令营/决赛)',
                goal: '省队集训，冲击金银牌 (CMO)',
                topics: ['CMO 难度专题', '国家集训队测试题'],
                books: ['《奥赛经典·奥林匹克数学中的组合问题》']
            }
        ]
    },
    'Physics': {
        'Primary': [
            {
                term: '科学启蒙 (STEM)',
                goal: '保持好奇心，通过现象看本质',
                topics: ['简单机械结构', '光与影', '浮力与密度', '生活中的电'],
                books: ['《DK儿童科学百科》', '《可怕的科学》系列']
            }
        ],
        'Middle': [
            {
                term: '初二 (物理入门)',
                goal: '掌握声光热力电基础，培养物理直觉',
                topics: ['声现象', '光现象', '透镜成像', '力与运动基础'],
                books: ['《初中物理竞赛教程》', '《更高更妙的物理(初中版)》']
            },
            {
                term: '初三 (自招/衔接)',
                goal: '深化力学电学，接触高中物理思维',
                topics: ['压强与浮力', '简单机械', '欧姆定律', '电功率'],
                books: ['《全国中学生物理竞赛专辑(初中)》']
            }
        ],
        'Grade 10': [
            {
                term: '高一上 (力学基础)',
                goal: '建立微积分物理思维，攻克静力学与运动学',
                topics: ['微积分基础', '运动学', '静力学', '牛顿运动定律'],
                books: ['《程稼夫·力学篇》', '《高等数学(同济版)》']
            },
            {
                term: '高一下 (能量与动量)',
                goal: '完备力学体系，接触电学基础',
                topics: ['动量与能量', '角动量', '刚体转动', '静电场'],
                books: ['《物理学难题集萃》', '《费曼物理学讲义》']
            }
        ],
        'Grade 11': [
            {
                term: '高二上 (电磁与光学)',
                goal: '完成电磁学、光学、热学，备战复赛',
                topics: ['恒定电流', '磁场与电磁感应', '波动光学', '热力学定律'],
                books: ['《程稼夫·电磁学篇》', '《新概念物理教程》']
            },
            {
                term: '高二下 (近代与实验)',
                goal: '近代物理与实验操作，全真模拟',
                topics: ['狭义相对论', '量子物理基础', '竞赛实验操作'],
                books: ['《全国中学生物理竞赛实验指导书》', '历年CPhO真题']
            }
        ],
        'Grade 12': [
            {
                term: '高三上 (决赛冲刺)',
                goal: '冲击CPhO决赛金牌',
                topics: ['理论力学初步', '电动力学初步', '决赛模拟'],
                books: ['《国际物理奥赛(IPhO)试题全解》']
            }
        ]
    },
    'Chemistry': {
        'Primary': [
            {
                term: '生活中的化学',
                goal: '观察物质变化，培养实验安全意识',
                topics: ['酸碱变色实验', '晶体培养', '燃烧与灭火', '水的净化'],
                books: ['《疯狂化学》', '《元素公馆》']
            }
        ],
        'Middle': [
            {
                term: '初三 (化学启蒙)',
                goal: '掌握元素周期表，理解化学反应本质',
                topics: ['物质构成奥秘', '质量守恒定律', '酸碱盐性质', '金属冶炼'],
                books: ['《初中化学竞赛教程》', '《天原杯历年真题》']
            }
        ],
        'Grade 10': [
            {
                term: '高一全 (无机化学)',
                goal: '打通高考与竞赛无机部分，掌握化学原理',
                topics: ['化学热力学', '化学动力学', '元素化学(主族/副族)', '原子结构'],
                books: ['《普通化学原理(华彤文)》', '《无机化学(宋天佑)》']
            }
        ],
        'Grade 11': [
            {
                term: '高二上 (有机与结构)',
                goal: '攻克有机化学与物质结构难点',
                topics: ['有机反应机理', '立体化学', '晶体结构', '配合物'],
                books: ['《基础有机化学(邢其毅)》', '《结构化学基础(周公度)》']
            },
            {
                term: '高二下 (综合提升)',
                goal: '初赛(CChO)模拟训练',
                topics: ['分析化学', '历年国初真题', '综合实验设计'],
                books: ['《化学竞赛教程》', '历年真题']
            }
        ],
        'Grade 12': [
            {
                term: '高三上 (决赛/冬令营)',
                goal: '冲击CChO决赛',
                topics: ['高等无机', '高等有机', '决赛模拟'],
                books: ['《高等有机化学》']
            }
        ]
    },
    'Informatics': {
        'Primary': [
            {
                term: '小学阶段 (计算思维)',
                goal: '熟悉图形化编程，培养逻辑与算法意识',
                topics: ['Scratch/Python入门', '流程图绘制', '简单逻辑判断', '循环结构'],
                books: ['《Scratch编程趣味屋》', '《父与子的编程之旅》']
            }
        ],
        'Middle': [
            {
                term: '初中阶段 (普及组 CSP-J)',
                goal: '掌握C++基础语法，通过CSP-J认证',
                topics: ['C++ 变量与运算', '数组与字符串', '简单模拟与枚举', '初等数论'],
                books: ['《信息学奥赛一本通》', '《深入浅出程序设计竞赛》']
            }
        ],
        'Grade 10': [
            {
                term: '高一上 (语言与基础)',
                goal: '掌握C++语法与基础算法，通过CSP-J/S',
                topics: ['C++ 语法/STL', '排序/查找', '递归与递推', '贪心算法'],
                books: ['《算法竞赛入门经典(紫书)》', '《深入浅出程序设计竞赛》']
            },
            {
                term: '高一下 (数据结构)',
                goal: '掌握常见数据结构，图论入门',
                topics: ['栈/队列/链表', '树与二叉树', '图论基础(DFS/BFS)', '并查集'],
                books: ['《大话数据结构》', '洛谷题单']
            }
        ],
        'Grade 11': [
            {
                term: '高二上 (算法进阶)',
                goal: '动态规划与高级图论，备战NOIP',
                topics: ['动态规划(DP)', '最短路/生成树', '数论算法', '字符串算法'],
                books: ['《算法竞赛进阶指南(李煜东)》', '《算法导论》']
            },
            {
                term: '高二下 (省选难度)',
                goal: '冲击省队，高级数据结构',
                topics: ['线段树/平衡树', '网络流', '计算几何', '省选模拟'],
                books: ['OI Wiki', 'Codeforces Div1/2']
            }
        ],
        'Grade 12': [
            {
                term: '高三上 (NOI/IOI)',
                goal: '国赛冲刺',
                topics: ['非传统题', '交互题', '构造题'],
                books: ['历年NOI/IOI真题']
            }
        ]
    }
};

export const CompetitionPlanning: React.FC = () => {
  const [activeSubject, setActiveSubject] = useState<'Math' | 'Physics' | 'Chemistry' | 'Informatics'>('Math');
  const [activeStage, setActiveStage] = useState<'Primary' | 'Middle' | 'Grade 10' | 'Grade 11' | 'Grade 12'>('Grade 10');

  const filteredCompetitions = MOCK_COMPETITIONS.filter(c => c.subject === activeSubject).sort((a,b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  const filteredStudents = MOCK_SQUAD_MEMBERS.filter(s => s.tags?.some(tag => tag.includes(activeSubject)));
  
  const currentRoadmap = ROADMAP_DATA[activeSubject]?.[activeStage] || [];

  // Subject Configuration
  const SUBJECT_CONFIG = {
      'Math': { icon: Target, color: 'text-blue-600', bg: 'bg-blue-50', border: 'border-blue-200', label: '数学竞赛 (Math)' },
      'Physics': { icon: Zap, color: 'text-purple-600', bg: 'bg-purple-50', border: 'border-purple-200', label: '物理竞赛 (Physics)' },
      'Chemistry': { icon: FlaskConical, color: 'text-emerald-600', bg: 'bg-emerald-50', border: 'border-emerald-200', label: '化学竞赛 (Chemistry)' },
      'Informatics': { icon: Code, color: 'text-slate-700', bg: 'bg-slate-100', border: 'border-slate-300', label: '信息学 (Informatics)' }
  };

  const ActiveIcon = SUBJECT_CONFIG[activeSubject].icon;

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
                    {subject}
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
                                                      Phase {idx + 1}
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
                              该阶段暂无详细规划数据，建议以兴趣培养为主。
                          </div>
                      )}
                  </div>
              </div>

              {/* Squad List */}
              <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                  <div className="p-4 border-b border-slate-200 bg-slate-50/50 flex justify-between items-center">
                      <h3 className="font-bold text-slate-800 flex items-center gap-2">
                          <Users size={18} className={SUBJECT_CONFIG[activeSubject].color}/>
                          集训队成员 (Squad)
                      </h3>
                      <span className="text-xs font-medium px-2 py-1 bg-white rounded border border-slate-200">
                          共 {filteredStudents.length} 人
                      </span>
                  </div>
                  <table className="w-full text-left">
                      <thead className="bg-slate-50 text-slate-500 text-xs uppercase font-semibold">
                          <tr>
                              <th className="px-6 py-4">姓名</th>
                              <th className="px-6 py-4">年级</th>
                              <th className="px-6 py-4">最近成绩</th>
                              <th className="px-6 py-4 text-right">状态</th>
                          </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                          {filteredStudents.map(student => (
                              <tr key={student.id} className="hover:bg-slate-50">
                                  <td className="px-6 py-4 font-medium text-slate-900">{student.name}</td>
                                  <td className="px-6 py-4 text-sm text-slate-600">{student.grade}</td>
                                  <td className="px-6 py-4 text-sm font-bold text-emerald-600">Top 5%</td>
                                  <td className="px-6 py-4 text-right">
                                      <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-emerald-50 text-emerald-700">
                                          在训
                                      </span>
                                  </td>
                              </tr>
                          ))}
                          {filteredStudents.length === 0 && (
                              <tr><td colSpan={4} className="text-center py-8 text-slate-400">集训队名单为空</td></tr>
                          )}
                      </tbody>
                  </table>
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
                              
                              <button className="w-full py-2 mt-2 text-sm text-center border border-slate-200 rounded-lg text-slate-600 hover:bg-slate-50 hover:text-brand-600 font-medium transition-colors flex items-center justify-center gap-1">
                                  查看报名详情 <ChevronRight size={14}/>
                              </button>
                          </div>
                      ))}
                      {filteredCompetitions.length === 0 && (
                          <div className="text-center py-8 text-slate-400 border border-dashed rounded-xl">
                              近期无赛事安排
                          </div>
                      )}
                  </div>
              </div>

              {/* Honor Highlight */}
              <div className="bg-gradient-to-br from-amber-400 to-orange-500 rounded-xl p-6 text-white shadow-lg">
                  <div className="flex items-start justify-between">
                      <div>
                          <p className="font-medium opacity-90 text-sm mb-1">上届 {activeSubject} 最佳成绩</p>
                          <h3 className="text-2xl font-bold">国家一等奖</h3>
                          <p className="text-sm mt-1 opacity-90">2 人入选省队，1 人保送清北</p>
                      </div>
                      <div className="p-3 bg-white/20 rounded-xl">
                          <Award size={24} />
                      </div>
                  </div>
              </div>
              
              {/* Resources Link */}
              <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
                  <h4 className="font-bold text-slate-800 mb-3">常用资源库</h4>
                  <ul className="space-y-2">
                      <li className="flex items-center justify-between text-sm text-slate-600 hover:text-brand-600 cursor-pointer group">
                          <span>历年真题库 (PDF)</span>
                          <ArrowRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity"/>
                      </li>
                      <li className="flex items-center justify-between text-sm text-slate-600 hover:text-brand-600 cursor-pointer group">
                          <span>名师讲座视频</span>
                          <ArrowRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity"/>
                      </li>
                      <li className="flex items-center justify-between text-sm text-slate-600 hover:text-brand-600 cursor-pointer group">
                          <span>模拟测试系统</span>
                          <ArrowRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity"/>
                      </li>
                  </ul>
              </div>
          </div>
      </div>
    </div>
  );
};