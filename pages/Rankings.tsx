import React, { useState, useMemo } from 'react';
import { Search, MapPin, BookOpen, TrendingUp, GraduationCap, Filter, FlaskConical, Star, Book, Microscope } from 'lucide-react';
import { University, HighSchool } from '../types';
import { useNavigate } from 'react-router-dom';

// --- DATA GENERATION HELPERS ---

// 1. Universities: Real Top 50 + Generated 51-100 for demo purposes
const REAL_TOP_UNIVERSITIES: Partial<University>[] = [
  { name: '清华大学', location: '北京', tags: ['985', '211', '双一流'], logoColor: 'bg-purple-700' },
  { name: '北京大学', location: '北京', tags: ['985', '211', '双一流'], logoColor: 'bg-red-800' },
  { name: '浙江大学', location: '杭州', tags: ['985', '211', '双一流'], logoColor: 'bg-blue-600' },
  { name: '上海交通大学', location: '上海', tags: ['985', '211', '双一流'], logoColor: 'bg-red-900' },
  { name: '复旦大学', location: '上海', tags: ['985', '211', '双一流'], logoColor: 'bg-blue-500' },
  { name: '南京大学', location: '南京', tags: ['985', '211', '双一流'], logoColor: 'bg-purple-600' },
  { name: '中国科学技术大学', location: '合肥', tags: ['985', '211', '双一流'], logoColor: 'bg-blue-700' },
  { name: '华中科技大学', location: '武汉', tags: ['985', '211', '双一流'], logoColor: 'bg-red-600' },
  { name: '武汉大学', location: '武汉', tags: ['985', '211', '双一流'], logoColor: 'bg-green-600' },
  { name: '西安交通大学', location: '西安', tags: ['985', '211', '双一流'], logoColor: 'bg-blue-800' },
  { name: '哈尔滨工业大学', location: '哈尔滨', tags: ['985', '211', '双一流'], logoColor: 'bg-yellow-600' },
  { name: '中山大学', location: '广州', tags: ['985', '211', '双一流'], logoColor: 'bg-green-700' },
  { name: '北京师范大学', location: '北京', tags: ['985', '211', '双一流'], logoColor: 'bg-blue-500' },
  { name: '四川大学', location: '成都', tags: ['985', '211', '双一流'], logoColor: 'bg-red-500' },
  { name: '东南大学', location: '南京', tags: ['985', '211', '双一流'], logoColor: 'bg-yellow-500' },
  { name: '同济大学', location: '上海', tags: ['985', '211', '双一流'], logoColor: 'bg-cyan-600' },
  { name: '北京航空航天大学', location: '北京', tags: ['985', '211', '双一流'], logoColor: 'bg-blue-600' },
  { name: '中国人民大学', location: '北京', tags: ['985', '211', '双一流'], logoColor: 'bg-red-700' },
  { name: '南开大学', location: '天津', tags: ['985', '211', '双一流'], logoColor: 'bg-purple-500' },
  { name: '天津大学', location: '天津', tags: ['985', '211', '双一流'], logoColor: 'bg-blue-600' },
  { name: '山东大学', location: '济南', tags: ['985', '211', '双一流'], logoColor: 'bg-red-600' },
  { name: '中南大学', location: '长沙', tags: ['985', '211', '双一流'], logoColor: 'bg-blue-500' },
  { name: '吉林大学', location: '长春', tags: ['985', '211', '双一流'], logoColor: 'bg-blue-400' },
  { name: '厦门大学', location: '厦门', tags: ['985', '211', '双一流'], logoColor: 'bg-blue-500' },
  { name: '西北工业大学', location: '西安', tags: ['985', '211', '双一流'], logoColor: 'bg-blue-600' },
  { name: '大连理工大学', location: '大连', tags: ['985', '211', '双一流'], logoColor: 'bg-blue-500' },
  { name: '华南理工大学', location: '广州', tags: ['985', '211', '双一流'], logoColor: 'bg-red-500' },
  { name: '电子科技大学', location: '成都', tags: ['985', '211', '双一流'], logoColor: 'bg-blue-600' },
  { name: '湖南大学', location: '长沙', tags: ['985', '211', '双一流'], logoColor: 'bg-red-600' },
  { name: '重庆大学', location: '重庆', tags: ['985', '211', '双一流'], logoColor: 'bg-blue-500' },
  { name: '兰州大学', location: '兰州', tags: ['985', '211', '双一流'], logoColor: 'bg-blue-400' },
  { name: '北京理工大学', location: '北京', tags: ['985', '211', '双一流'], logoColor: 'bg-green-600' },
  { name: '华东师范大学', location: '上海', tags: ['985', '211', '双一流'], logoColor: 'bg-red-500' },
  { name: '中国农业大学', location: '北京', tags: ['985', '211', '双一流'], logoColor: 'bg-green-500' },
  { name: '海洋大学', location: '青岛', tags: ['985', '211', '双一流'], logoColor: 'bg-blue-400' },
  { name: '中央民族大学', location: '北京', tags: ['985', '211', '双一流'], logoColor: 'bg-red-500' },
  { name: '东北大学', location: '沈阳', tags: ['985', '211', '双一流'], logoColor: 'bg-blue-600' },
  { name: '苏州大学', location: '苏州', tags: ['211', '双一流'], logoColor: 'bg-red-500' },
  { name: '南京师范大学', location: '南京', tags: ['211', '双一流'], logoColor: 'bg-green-500' },
  { name: '西安电子科技大学', location: '西安', tags: ['211', '双一流'], logoColor: 'bg-blue-600' },
];

const generateUniversities = (): University[] => {
  const list: University[] = [];
  
  // Add real top universities
  REAL_TOP_UNIVERSITIES.forEach((uni, index) => {
    // Generate Stats based on rank
    const keyLabs = Math.max(1, Math.floor(20 - index * 0.3)); 
    const aPlusCount = Math.max(0, Math.floor(25 - index * 0.5));

    list.push({
      rank: index + 1,
      name: uni.name!,
      englishName: `University of ${uni.location} No.${index + 1}`, // Placeholder English Name
      location: uni.location!,
      tags: uni.tags!,
      score: +(100 - index * 0.5).toFixed(1),
      logoColor: uni.logoColor || 'bg-blue-500',
      keyLabs: keyLabs,
      aPlusCount: aPlusCount,
    });
  });

  // Generate remaining up to 100
  const cities = ['北京', '上海', '南京', '武汉', '西安', '成都', '广州', '长沙'];
  const types = ['理工大学', '师范大学', '工业大学', '科技大学', '财经大学', '医科大学', '农业大学'];
  
  for (let i = REAL_TOP_UNIVERSITIES.length; i < 100; i++) {
    const city = cities[i % cities.length];
    const type = types[i % types.length];
    list.push({
      rank: i + 1,
      name: `${city}${type}`,
      englishName: `${city} ${type.replace('大学', ' University')}`,
      location: city,
      tags: i < 60 ? ['211', '双一流'] : ['省属重点'],
      score: +(80 - (i - 40) * 0.4).toFixed(1),
      logoColor: 'bg-slate-500',
      keyLabs: Math.max(0, 5 - Math.floor((i - 40) / 10)),
      aPlusCount: i < 50 ? Math.max(0, 2 - Math.floor((i - 40) / 5)) : 0
    });
  }
  return list;
};

// 2. High Schools: REAL DATA ONLY
const HS_DATA_SOURCE: Record<string, string[]> = {
  '北京': [
    '人大附中', '北京四中', '清华附中', '北师大实验中学', '北京一零一中', '十一学校', 
    '北大附中', '首师大附中', '北京八中', '北京二中', '北京一七一中学', '北京八十中学', 
    '汇文中学', '陈经纶中学', '人大附中朝阳学校', '清华附中朝阳学校'
  ],
  '上海': [
    '上海中学', '华师大二附中', '复旦附中', '交大附中', '七宝中学', '建平中学', 
    '南洋模范', '延安中学', '格致中学', '曹杨二中', '控江中学', '大同中学', '松江二中'
  ],
  '广州': [
    '华南师大附中', '广东实验中学', '广雅中学', '执信中学', '广州二中', '广州六中', 
    '广大附中', '铁一中学', '真光中学', '广州外国语学校'
  ],
  '深圳': [
    '深圳中学', '深圳实验学校(高中部)', '深圳外国语学校', '深圳高级中学(中心校区)', 
    '红岭中学', '宝安中学', '育才中学', '翠园中学', '深大附中', '深圳科学高中'
  ],
  '杭州': [
    '杭州二中(滨江校区)', 
    '学军中学(西溪校区)', 
    '杭州高级中学(贡院校区)', 
    '杭州十四中(凤起校区)', 
    '杭州四中(下沙校区)', 
    '浙大附中(玉泉校区)', 
    '萧山中学', 
    '余杭高级中学', 
    '学军中学(紫金港校区)', 
    '富阳中学', 
    '杭州师范大学附属中学', 
    '长河高级中学', 
    '杭州高级中学(钱江校区)', 
    '杭州二中(东河校区)', 
    '杭州十四中(康桥校区)', 
    '浙大附中(丁兰校区)', 
    '学军中学海创园学校', 
    '杭二中钱江学校', 
    '源清中学'
  ],
  '南京': [
    '南京外国语学校', '南师附中', '金陵中学', '南京一中', '中华中学', '南京二十九中', 
    '南京十三中', '南京九中', '南京师范大学附属中学江宁分校'
  ],
  '成都': [
    '成都七中(林荫校区)', '成都七中(高新校区)', '树德中学(宁夏街校区)', '树德中学(光华校区)', 
    '石室中学(文庙校区)', '石室中学(北湖校区)', '师大附中', '成都外国语学校', '成都实验外国语学校'
  ],
  '武汉': [
    '华师一附中', '武汉二中', '武汉外国语学校', '武钢三中', '湖北省实验中学', '武汉一中', 
    '武汉三中', '武汉六中', '武汉十一中', '洪山高中'
  ],
  '西安': [
    '西工大附中', '高新一中', '铁一中', '交大附中', '师大附中', '西安中学', 
    '西安一中', '长安一中', '西安高级中学'
  ],
};

const generateHighSchools = (city: string): HighSchool[] => {
  const realNames = HS_DATA_SOURCE[city] || [];
  const list: HighSchool[] = [];

  // Add Real Schools Only
  realNames.forEach((name, index) => {
    let tags = ['省一级重点'];
    if (index < 3) tags = ['省重点', '超级中学', '重本率95%+'];
    else if (index < 8) tags = ['省重点', '示范高中'];

    list.push({
      rank: index + 1,
      name: name,
      city: city,
      district: '市区/重点片区',
      tags: tags,
      enrollmentRate: +(98 - index * 1.2).toFixed(1), // Mock data logic
      topScore: 715 - index * 2
    });
  });

  return list;
};

// 3. Subject Rankings Data
const SUBJECT_CATEGORIES: Record<string, string[]> = {
  '工学': ['计算机科学与技术', '软件工程', '电子科学与技术', '信息与通信工程', '机械工程', '土木工程', '材料科学与工程'],
  '理学': ['数学', '物理学', '化学', '生物学', '统计学'],
  '医学': ['临床医学', '口腔医学', '基础医学', '公共卫生与预防医学'],
  '人文社科': ['法学', '应用经济学', '工商管理', '中国语言文学', '外国语言文学'],
  '农学': ['作物学', '农业资源与环境']
};

interface SubjectRankingItem {
  rank: number;
  uniName: string;
  grade: 'A+' | 'A' | 'A-' | 'B+' | 'B';
  location: string;
  tags: string[];
}

const generateSubjectRankings = (subject: string): SubjectRankingItem[] => {
  // Use a pool of real universities to create mock rankings for the specific subject
  // We pseudo-randomize based on subject name length to get deterministic but varied results per subject
  const pool = [...REAL_TOP_UNIVERSITIES];
  
  // Custom sort to simulate subject strength variance
  pool.sort((a, b) => {
      const scoreA = (a.name!.length * 7 + subject.length * 3) % 100;
      const scoreB = (b.name!.length * 7 + subject.length * 3) % 100;
      // Also bias towards famous engineering schools for engineering subjects
      const isEng = SUBJECT_CATEGORIES['工学'].includes(subject);
      const isEngSchoolA = a.tags!.includes('985') && (a.name!.includes('理工') || a.name!.includes('科技') || a.name!.includes('交通'));
      const isEngSchoolB = b.tags!.includes('985') && (b.name!.includes('理工') || b.name!.includes('科技') || b.name!.includes('交通'));
      
      let valA = scoreA + (isEng && isEngSchoolA ? 50 : 0);
      let valB = scoreB + (isEng && isEngSchoolB ? 50 : 0);

      // Force Tsinghua/Peking/ZJU to be near top generally
      if (['清华大学','北京大学','浙江大学'].includes(a.name!)) valA += 80;
      if (['清华大学','北京大学','浙江大学'].includes(b.name!)) valB += 80;

      return valB - valA;
  });

  const list: SubjectRankingItem[] = [];
  pool.slice(0, 30).forEach((uni, index) => {
      let grade: 'A+' | 'A' | 'A-' | 'B+' = 'B+';
      // Mock grade distribution
      if (index < 4) grade = 'A+'; // Top 2% (approx)
      else if (index < 12) grade = 'A'; // Top 2-5%
      else if (index < 25) grade = 'A-'; // Top 5-10%
      
      list.push({
          rank: index + 1,
          uniName: uni.name!,
          location: uni.location!,
          tags: uni.tags!,
          grade: grade
      });
  });
  
  return list;
};

const AVAILABLE_CITIES = Object.keys(HS_DATA_SOURCE);

export const Rankings: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'universities' | 'subjects' | 'highschools'>('universities');
  const [selectedCity, setSelectedCity] = useState<string>('杭州');
  const [searchTerm, setSearchTerm] = useState('');

  // Subject Filter States
  const [selectedSubjectCategory, setSelectedSubjectCategory] = useState('工学');
  const [selectedSubject, setSelectedSubject] = useState(SUBJECT_CATEGORIES['工学'][0]);

  // Memoize data generation
  const allUniversities = useMemo(() => generateUniversities(), []);
  const currentHighSchools = useMemo(() => generateHighSchools(selectedCity), [selectedCity]);
  const currentSubjectRankings = useMemo(() => generateSubjectRankings(selectedSubject), [selectedSubject]);

  // Filters
  const filteredUniversities = allUniversities.filter(uni => 
    uni.name.includes(searchTerm) || uni.englishName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredHighSchools = currentHighSchools.filter(hs => 
    hs.name.includes(searchTerm)
  );

  const filteredSubjectRankings = currentSubjectRankings.filter(item => 
    item.uniName.includes(searchTerm)
  );

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
      const cat = e.target.value;
      setSelectedSubjectCategory(cat);
      setSelectedSubject(SUBJECT_CATEGORIES[cat][0]);
  };

  return (
    <div className="p-8 space-y-6 flex flex-col h-[calc(100vh-64px)]">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">院校排行 Rankings</h1>
          <p className="text-slate-500 mt-1">权威教育资源数据库与升学参考。</p>
        </div>
      </div>

      {/* Tabs & Controls */}
      <div className="flex flex-col xl:flex-row gap-4 justify-between items-center bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
        {/* Tab Switcher */}
        <div className="flex p-1 bg-slate-100 rounded-lg overflow-x-auto max-w-full">
           <button 
             onClick={() => setActiveTab('universities')}
             className={`px-4 py-2 rounded-md text-sm font-medium transition-all whitespace-nowrap ${activeTab === 'universities' ? 'bg-white text-brand-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
           >
             <div className="flex items-center gap-2">
               <GraduationCap size={16}/> 全国高校 Top 100
             </div>
           </button>
           <button 
             onClick={() => setActiveTab('subjects')}
             className={`px-4 py-2 rounded-md text-sm font-medium transition-all whitespace-nowrap ${activeTab === 'subjects' ? 'bg-white text-brand-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
           >
             <div className="flex items-center gap-2">
               <Microscope size={16}/> 学科评估排名
             </div>
           </button>
           <button 
             onClick={() => setActiveTab('highschools')}
             className={`px-4 py-2 rounded-md text-sm font-medium transition-all whitespace-nowrap ${activeTab === 'highschools' ? 'bg-white text-brand-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
           >
             <div className="flex items-center gap-2">
               <BookOpen size={16}/> 重点高中榜单
             </div>
           </button>
        </div>

        {/* Filters */}
        <div className="flex gap-3 w-full xl:w-auto overflow-x-auto pb-2 xl:pb-0">
          {activeTab === 'highschools' && (
            <div className="relative min-w-[120px]">
              <MapPin size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <select 
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
                className="w-full pl-9 pr-8 py-2 border border-slate-200 rounded-lg bg-slate-50 focus:outline-none focus:ring-2 focus:ring-brand-500 text-sm font-medium text-slate-700 appearance-none cursor-pointer hover:bg-slate-100 transition-colors"
              >
                {AVAILABLE_CITIES.map(city => (
                   <option key={city} value={city}>{city}</option>
                ))}
              </select>
            </div>
          )}

          {activeTab === 'subjects' && (
            <>
               <div className="relative min-w-[120px]">
                 <Filter size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                 <select 
                   value={selectedSubjectCategory}
                   onChange={handleCategoryChange}
                   className="w-full pl-9 pr-8 py-2 border border-slate-200 rounded-lg bg-slate-50 focus:outline-none focus:ring-2 focus:ring-brand-500 text-sm font-medium text-slate-700 appearance-none cursor-pointer hover:bg-slate-100 transition-colors"
                 >
                   {Object.keys(SUBJECT_CATEGORIES).map(cat => <option key={cat} value={cat}>{cat}</option>)}
                 </select>
               </div>
               <div className="relative min-w-[180px]">
                 <Book size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                 <select 
                   value={selectedSubject}
                   onChange={(e) => setSelectedSubject(e.target.value)}
                   className="w-full pl-9 pr-8 py-2 border border-slate-200 rounded-lg bg-slate-50 focus:outline-none focus:ring-2 focus:ring-brand-500 text-sm font-medium text-slate-700 appearance-none cursor-pointer hover:bg-slate-100 transition-colors"
                 >
                   {SUBJECT_CATEGORIES[selectedSubjectCategory].map(sub => <option key={sub} value={sub}>{sub}</option>)}
                 </select>
               </div>
            </>
          )}
          
          <div className="relative flex-1 xl:w-64 min-w-[200px]">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input 
              type="text" 
              placeholder="搜索学校名称..."
              className="w-full pl-9 pr-4 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-1 overflow-y-auto bg-white rounded-xl border border-slate-200 shadow-sm">
        
        {/* University List */}
        {activeTab === 'universities' && (
          <table className="w-full text-left">
            <thead className="bg-slate-50 text-slate-500 text-xs uppercase font-semibold sticky top-0 z-10 shadow-sm">
              <tr>
                <th className="px-6 py-4 w-20 text-center">排名</th>
                <th className="px-6 py-4">学校名称</th>
                <th className="px-6 py-4">所在地</th>
                <th className="px-6 py-4">办学层次</th>
                <th className="px-6 py-4 text-center">重点实验室</th>
                <th className="px-6 py-4 text-center">A+学科数</th>
                <th className="px-6 py-4 text-right">综合评分</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredUniversities.map((uni) => (
                <tr 
                  key={uni.rank} 
                  className="hover:bg-slate-50 transition-colors group cursor-pointer"
                  onClick={() => navigate(`/rankings/university/${uni.rank}`)}
                >
                  <td className="px-6 py-4 text-center">
                    <span className={`inline-flex items-center justify-center w-8 h-8 rounded-full text-sm font-bold ${
                      uni.rank <= 3 ? 'bg-amber-100 text-amber-600' : 
                      uni.rank <= 10 ? 'bg-slate-100 text-slate-700' : 'text-slate-500'
                    }`}>
                      {uni.rank}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-4">
                      <div className={`w-10 h-10 rounded-lg ${uni.logoColor} flex items-center justify-center text-white font-bold text-lg shadow-sm flex-shrink-0`}>
                        {uni.name.charAt(0)}
                      </div>
                      <div>
                        <div className="font-bold text-slate-900 group-hover:text-brand-600 transition-colors">{uni.name}</div>
                        <div className="text-xs text-slate-400 hidden sm:block">{uni.englishName}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-600">
                     <div className="flex items-center gap-1.5">
                       <MapPin size={14} className="text-slate-400"/>
                       {uni.location}
                     </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-wrap gap-2">
                      {uni.tags.map(tag => (
                        <span key={tag} className={`px-2 py-0.5 rounded text-xs font-medium border ${
                          tag === '985' ? 'bg-blue-50 text-blue-600 border-blue-100' : 
                          tag === '211' ? 'bg-cyan-50 text-cyan-600 border-cyan-100' :
                          tag === '双一流' ? 'bg-purple-50 text-purple-600 border-purple-100' :
                          'bg-slate-50 text-slate-600 border-slate-100'
                        }`}>
                          {tag}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-center">
                    {uni.keyLabs && uni.keyLabs > 0 ? (
                        <span className="inline-flex items-center gap-1 text-slate-700 font-medium">
                            <FlaskConical size={14} className="text-slate-400"/> {uni.keyLabs}
                        </span>
                    ) : <span className="text-slate-300">-</span>}
                  </td>
                   <td className="px-6 py-4 text-center">
                    {uni.aPlusCount && uni.aPlusCount > 0 ? (
                        <span className="inline-flex items-center gap-1 text-amber-600 font-bold">
                            <Star size={14} className="text-amber-500"/> {uni.aPlusCount}
                        </span>
                    ) : <span className="text-slate-300">-</span>}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <span className={`font-bold ${uni.rank <= 10 ? 'text-brand-600' : 'text-slate-700'}`}>{uni.score}</span>
                  </td>
                </tr>
              ))}
              {filteredUniversities.length === 0 && (
                <tr>
                   <td colSpan={7} className="py-12 text-center text-slate-400">
                     未找到匹配的大学
                   </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
        
        {/* Subject Rankings List */}
        {activeTab === 'subjects' && (
          <div>
            <div className="p-4 bg-slate-50 border-b border-slate-100 flex items-center justify-between">
               <div className="flex items-center gap-2 text-slate-700 font-bold">
                  <Microscope size={18} className="text-brand-600"/>
                  {selectedSubject} <span className="text-slate-400 font-normal mx-1">/</span> <span className="text-sm font-medium text-slate-500">{selectedSubjectCategory}</span>
               </div>
               <span className="text-xs text-slate-500">基于第四轮学科评估结果模拟</span>
            </div>
            <table className="w-full text-left">
              <thead className="bg-slate-50 text-slate-500 text-xs uppercase font-semibold sticky top-0 z-10 shadow-sm">
                <tr>
                  <th className="px-6 py-4 w-20 text-center">排名</th>
                  <th className="px-6 py-4">学校名称</th>
                  <th className="px-6 py-4 text-center">评估等级</th>
                  <th className="px-6 py-4">学校标签</th>
                  <th className="px-6 py-4 text-right">所在地</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredSubjectRankings.length > 0 ? filteredSubjectRankings.map((item) => (
                  <tr key={item.rank} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4 text-center">
                       <span className={`inline-flex items-center justify-center w-8 h-8 rounded-full text-sm font-bold ${
                        item.rank <= 3 ? 'bg-amber-100 text-amber-600' : 
                        item.rank <= 10 ? 'bg-slate-100 text-slate-700' : 'text-slate-400'
                      }`}>
                        {item.rank}
                      </span>
                    </td>
                    <td className="px-6 py-4 font-bold text-slate-900">{item.uniName}</td>
                    <td className="px-6 py-4 text-center">
                      <span className={`inline-block px-3 py-1 rounded font-bold text-sm ${
                        item.grade === 'A+' ? 'bg-red-50 text-red-600 border border-red-100' :
                        item.grade === 'A' ? 'bg-brand-50 text-brand-600 border border-brand-100' :
                        'bg-slate-100 text-slate-600'
                      }`}>
                        {item.grade}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                       <div className="flex gap-2">
                        {item.tags.slice(0, 2).map(tag => (
                           <span key={tag} className="text-xs px-2 py-0.5 bg-slate-100 text-slate-500 rounded border border-slate-200">{tag}</span>
                        ))}
                       </div>
                    </td>
                    <td className="px-6 py-4 text-right text-sm text-slate-500">{item.location}</td>
                  </tr>
                )) : (
                  <tr>
                    <td colSpan={5} className="py-12 text-center text-slate-400">未找到该学科的排名数据</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}

        {/* High School List */}
        {activeTab === 'highschools' && (
          <table className="w-full text-left">
            <thead className="bg-slate-50 text-slate-500 text-xs uppercase font-semibold sticky top-0 z-10 shadow-sm">
              <tr>
                <th className="px-6 py-4 w-20 text-center">排名</th>
                <th className="px-6 py-4">学校名称</th>
                <th className="px-6 py-4">城市 / 区域</th>
                <th className="px-6 py-4">办学特色</th>
                <th className="px-6 py-4">名校录取率 (估)</th>
                <th className="px-6 py-4 text-right">参考最高分</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredHighSchools.length > 0 ? filteredHighSchools.map((hs) => (
                <tr 
                  key={hs.rank} 
                  className="hover:bg-slate-50 transition-colors cursor-pointer"
                  onClick={() => navigate(`/rankings/highschool/${hs.rank}`)}
                >
                  <td className="px-6 py-4 text-center">
                     <span className={`inline-flex items-center justify-center w-8 h-8 rounded-full text-sm font-bold ${
                      hs.rank <= 3 ? 'bg-amber-100 text-amber-600' : 'bg-slate-100 text-slate-500'
                    }`}>
                      {hs.rank}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                     <div className="font-bold text-slate-900">{hs.name}</div>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-600">
                    {hs.city} · {hs.district}
                  </td>
                  <td className="px-6 py-4">
                     <div className="flex flex-wrap gap-2">
                      {hs.tags.map(tag => (
                        <span key={tag} className="px-2 py-0.5 rounded text-xs font-medium bg-slate-100 text-slate-600 border border-slate-200">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div className="flex-1 w-24 bg-slate-100 rounded-full h-1.5">
                        <div className={`h-1.5 rounded-full ${hs.enrollmentRate > 90 ? 'bg-emerald-500' : 'bg-brand-500'}`} style={{width: `${hs.enrollmentRate}%`}}></div>
                      </div>
                      <span className="text-xs font-bold text-slate-700">{hs.enrollmentRate}%</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-1 text-amber-600 font-bold">
                       <TrendingUp size={14} />
                       {hs.topScore}
                    </div>
                  </td>
                </tr>
              )) : (
                 <tr>
                    <td colSpan={6} className="py-12 text-center text-slate-400">
                      <div className="flex flex-col items-center gap-2">
                        <MapPin size={32} className="opacity-50"/>
                        <p>未找到该城市的匹配高中数据</p>
                      </div>
                    </td>
                 </tr>
              )}
            </tbody>
          </table>
        )}

      </div>
    </div>
  );
};