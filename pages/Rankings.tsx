import React, { useState, useMemo } from 'react';
import { Search, MapPin, BookOpen, TrendingUp, GraduationCap, Filter, FlaskConical, Star } from 'lucide-react';
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

// 2. High Schools: Real data for Top 5-8 of each city, filled to Top 20
const HS_DATA_SOURCE: Record<string, string[]> = {
  '北京': ['人大附中', '北京四中', '清华附中', '北师大实验', '北京一零一中', '十一学校', '北大附中', '首师大附中', '北京八中', '北京二中'],
  '上海': ['上海中学', '华师大二附中', '复旦附中', '交大附中', '七宝中学', '建平中学', '南洋模范', '延安中学', '格致中学', '曹杨二中'],
  '广州': ['华南师大附中', '广东实验中学', '广雅中学', '执信中学', '广州二中', '广州六中', '广大附中', '铁一中学'],
  '深圳': ['深圳中学', '深圳实验学校', '深圳外国语', '深圳高级中学', '红岭中学', '宝安中学', '育才中学', '翠园中学', '深大附中'],
  '杭州': ['杭州二中', '学军中学', '杭州高级中学', '杭州十四中', '杭州四中', '浙大附中', '杭师大附中', '长河高级中学'],
  '南京': ['南京外国语', '南师附中', '金陵中学', '南京一中', '中华中学', '南京二十九中', '南京十三中', '南京九中'],
  '成都': ['成都七中', '树德中学', '石室中学', '师大附中', '成外', '实外', '七中万达', '石室天府'],
  '武汉': ['华师一附中', '武汉二中', '武汉外校', '武钢三中', '省实验中学', '武汉一中', '武汉三中', '武汉六中'],
  '西安': ['西工大附中', '高新一中', '铁一中', '交大附中', '师大附中', '西安中学', '西安一中', '长安一中'],
};

const generateHighSchools = (city: string): HighSchool[] => {
  const realNames = HS_DATA_SOURCE[city] || [];
  const list: HighSchool[] = [];

  // Add Real Schools
  realNames.forEach((name, index) => {
    list.push({
      rank: index + 1,
      name: name,
      city: city,
      district: '市直属/重点区', // Simplified
      tags: index < 3 ? ['省重点', '超级中学'] : ['省重点', '示范高中'],
      enrollmentRate: +(98 - index * 1.5).toFixed(1), // Mock 985/211 admission rate
      topScore: 720 - index * 5 // Mock Score
    });
  });

  // Fill up to 20
  for (let i = realNames.length; i < 20; i++) {
    list.push({
      rank: i + 1,
      name: `${city}第${i + 1}中学`,
      city: city,
      district: '市区',
      tags: ['市重点'],
      enrollmentRate: +(80 - (i - 10) * 2).toFixed(1),
      topScore: 650 - (i * 5)
    });
  }
  return list;
};

const AVAILABLE_CITIES = Object.keys(HS_DATA_SOURCE);

export const Rankings: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'universities' | 'highschools'>('universities');
  const [selectedCity, setSelectedCity] = useState<string>('北京');
  const [searchTerm, setSearchTerm] = useState('');

  // Memoize data generation so it doesn't run on every render
  const allUniversities = useMemo(() => generateUniversities(), []);
  const currentHighSchools = useMemo(() => generateHighSchools(selectedCity), [selectedCity]);

  // Filter Universities
  const filteredUniversities = allUniversities.filter(uni => 
    uni.name.includes(searchTerm) || uni.englishName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Filter High Schools (Client side search on the current 20)
  const filteredHighSchools = currentHighSchools.filter(hs => 
    hs.name.includes(searchTerm)
  );

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
      <div className="flex flex-col md:flex-row gap-4 justify-between items-center bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
        {/* Tab Switcher */}
        <div className="flex p-1 bg-slate-100 rounded-lg">
           <button 
             onClick={() => setActiveTab('universities')}
             className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${activeTab === 'universities' ? 'bg-white text-brand-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
           >
             <div className="flex items-center gap-2">
               <GraduationCap size={16}/> 全国高校 Top 100
             </div>
           </button>
           <button 
             onClick={() => setActiveTab('highschools')}
             className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${activeTab === 'highschools' ? 'bg-white text-brand-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
           >
             <div className="flex items-center gap-2">
               <BookOpen size={16}/> 重点高中 Top 20
             </div>
           </button>
        </div>

        {/* Filters */}
        <div className="flex gap-4 w-full md:w-auto">
          {activeTab === 'highschools' && (
            <div className="relative">
              <MapPin size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <select 
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
                className="pl-9 pr-8 py-2 border border-slate-200 rounded-lg bg-slate-50 focus:outline-none focus:ring-2 focus:ring-brand-500 text-sm font-medium text-slate-700 appearance-none cursor-pointer hover:bg-slate-100 transition-colors"
              >
                {AVAILABLE_CITIES.map(city => (
                   <option key={city} value={city}>{city}</option>
                ))}
              </select>
            </div>
          )}
          
          <div className="relative flex-1 md:w-64">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input 
              type="text" 
              placeholder={activeTab === 'universities' ? "搜索大学名称..." : "搜索高中名称..."}
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
                        <p>未找到匹配的高中数据</p>
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