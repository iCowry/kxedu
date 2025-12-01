import React, { useState, useMemo, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ChevronLeft, MapPin, Award, BookOpen, FlaskConical, Users, Globe, Phone, History, TrendingUp, Edit2, Plus, Trash2, X, Save, Filter, FileSpreadsheet, Clipboard, RefreshCw, Upload } from 'lucide-react';
import { University, UniAdmissionRecord } from '../types';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

// --- CONSTANTS ---
const PROVINCES = ['北京', '河南', '江苏', '四川', '广东', '浙江'];
const TYPES = ['物理组', '历史组', '理科', '文科', '综合改革'];

// --- DATA SOURCE FOR LOOKUP (Matches Rankings.tsx) ---
const TOP_UNIVERSITIES_DB: Record<number, Partial<University>> = {
  1: { name: '清华大学', englishName: 'Tsinghua University', location: '北京', tags: ['985', '211', '双一流'], logoColor: 'bg-purple-700' },
  2: { name: '北京大学', englishName: 'Peking University', location: '北京', tags: ['985', '211', '双一流'], logoColor: 'bg-red-800' },
  3: { name: '浙江大学', englishName: 'Zhejiang University', location: '杭州', tags: ['985', '211', '双一流'], logoColor: 'bg-blue-600' },
  4: { name: '上海交通大学', englishName: 'Shanghai Jiao Tong University', location: '上海', tags: ['985', '211', '双一流'], logoColor: 'bg-red-900' },
  5: { name: '复旦大学', englishName: 'Fudan University', location: '上海', tags: ['985', '211', '双一流'], logoColor: 'bg-blue-500' },
  6: { name: '南京大学', englishName: 'Nanjing University', location: '南京', tags: ['985', '211', '双一流'], logoColor: 'bg-purple-600' },
  7: { name: '中国科学技术大学', englishName: 'University of Science and Technology of China', location: '合肥', tags: ['985', '211', '双一流'], logoColor: 'bg-blue-700' },
  8: { name: '华中科技大学', englishName: 'Huazhong University of Science and Technology', location: '武汉', tags: ['985', '211', '双一流'], logoColor: 'bg-red-600' },
  9: { name: '武汉大学', englishName: 'Wuhan University', location: '武汉', tags: ['985', '211', '双一流'], logoColor: 'bg-green-600' },
  10: { name: '西安交通大学', englishName: 'Xi\'an Jiaotong University', location: '西安', tags: ['985', '211', '双一流'], logoColor: 'bg-blue-800' },
  11: { name: '哈尔滨工业大学', englishName: 'Harbin Institute of Technology', location: '哈尔滨', tags: ['985', '211', '双一流'], logoColor: 'bg-yellow-600' },
  12: { name: '中山大学', englishName: 'Sun Yat-sen University', location: '广州', tags: ['985', '211', '双一流'], logoColor: 'bg-green-700' },
  13: { name: '北京师范大学', englishName: 'Beijing Normal University', location: '北京', tags: ['985', '211', '双一流'], logoColor: 'bg-blue-500' },
  14: { name: '四川大学', englishName: 'Sichuan University', location: '成都', tags: ['985', '211', '双一流'], logoColor: 'bg-red-500' },
  15: { name: '东南大学', englishName: 'Southeast University', location: '南京', tags: ['985', '211', '双一流'], logoColor: 'bg-yellow-500' },
  16: { name: '同济大学', englishName: 'Tongji University', location: '上海', tags: ['985', '211', '双一流'], logoColor: 'bg-cyan-600' },
  17: { name: '北京航空航天大学', englishName: 'Beihang University', location: '北京', tags: ['985', '211', '双一流'], logoColor: 'bg-blue-600' },
  18: { name: '中国人民大学', englishName: 'Renmin University of China', location: '北京', tags: ['985', '211', '双一流'], logoColor: 'bg-red-700' },
  19: { name: '南开大学', englishName: 'Nankai University', location: '天津', tags: ['985', '211', '双一流'], logoColor: 'bg-purple-500' },
  20: { name: '天津大学', englishName: 'Tianjin University', location: '天津', tags: ['985', '211', '双一流'], logoColor: 'bg-blue-600' },
};

// --- MOCK DETAIL DATA GENERATOR ---
const getUniversityData = (rankId: number): University => {
  const baseData = TOP_UNIVERSITIES_DB[rankId] || {
    name: `第${rankId}大学`,
    englishName: `University No.${rankId}`,
    location: '中国',
    tags: ['省属重点'],
    logoColor: 'bg-slate-500'
  };

  // Generate some dynamic stats based on rank to make it look realistic
  const score = +(100 - rankId * 0.5).toFixed(1);
  const keyLabs = Math.max(1, Math.floor(20 - rankId * 0.3));
  const aPlusCount = Math.max(0, Math.floor(25 - rankId * 0.5));
  const academicians = Math.max(5, Math.floor(100 - rankId * 1.5));

  return {
    rank: rankId,
    name: baseData.name!,
    englishName: baseData.englishName!,
    location: baseData.location!,
    tags: baseData.tags!,
    score: score > 60 ? score : 60,
    logoColor: baseData.logoColor!,
    keyLabs: keyLabs,
    aPlusCount: aPlusCount,
    academicians: academicians,
    establishedYear: 1900 + (rankId % 100),
    description: `${baseData.name!}是一所位于${baseData.location!}的顶尖学府。学校历史悠久，学科门类齐全，科研实力雄厚。在国家“双一流”建设中，学校始终走在前列，培养了大批优秀人才。`,
    subjectRatings: [
      { name: '计算机科学与技术', grade: rankId <= 5 ? 'A+' : 'A' },
      { name: '数学', grade: rankId <= 10 ? 'A+' : 'A-' },
      { name: '物理学', grade: rankId <= 15 ? 'A' : 'B+' },
      { name: '材料科学', grade: 'A' },
      { name: '临床医学', grade: 'A-' },
    ],
    admissionRecords: [] // Populated via state
  };
};

const GENERATE_MOCK_RECORDS = (uniName: string): UniAdmissionRecord[] => {
    const records: UniAdmissionRecord[] = [];
    let idCounter = 1;

    const addRecord = (prov: string, yr: number, tp: any, mj: string, sc: number, rk: number) => {
        records.push({
            id: `REC-${idCounter++}`,
            province: prov,
            year: yr,
            type: tp,
            batch: '本科一批',
            major: mj,
            score: sc,
            rank: rk
        });
    };

    // Generate score base based on "rank" implied by name (simple hash for demo)
    const baseScore = uniName === '清华大学' ? 685 : 
                      uniName === '北京大学' ? 686 : 
                      uniName === '浙江大学' ? 660 : 620;

    // Beijing Data
    [2024, 2023, 2022].forEach(year => {
        const volatility = (2024 - year) * 2;
        const currentBase = baseScore - volatility;
        
        addRecord('北京', year, '物理组', '学校投档线', currentBase, 1500); 
        addRecord('北京', year, '物理组', '计算机科学与技术', currentBase + 8, 500);
        addRecord('北京', year, '物理组', '电子信息类', currentBase + 5, 800);
        
        const baseArt = currentBase - 10;
        addRecord('北京', year, '历史组', '学校投档线', baseArt, 1200);
        addRecord('北京', year, '历史组', '汉语言文学', baseArt + 5, 600);
    });

    // Henan Data
    [2024, 2023, 2022].forEach(year => {
        const currentBase = baseScore + 20; // Henan scores are higher
        addRecord('河南', year, '理科', '学校投档线', currentBase, 2000);
        addRecord('河南', year, '理科', '计算机类', currentBase + 10, 800);
        addRecord('河南', year, '文科', '学校投档线', currentBase - 30, 1000);
    });

    return records;
};

export const UniversityDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>(); 
  const rankId = parseInt(id || '1', 10);
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'overview' | 'subjects' | 'scores'>('overview');
  
  // --- STATE FOR UNIVERSITY DATA ---
  // Initialize with dynamic data based on ID
  const [uni, setUni] = useState<University>(getUniversityData(rankId));

  // --- STATE FOR ADMISSION RECORDS ---
  const [records, setRecords] = useState<UniAdmissionRecord[]>([]);

  // Initialize records when component mounts or ID changes
  useEffect(() => {
    const newUniData = getUniversityData(rankId);
    setUni(newUniData);
    setRecords(GENERATE_MOCK_RECORDS(newUniData.name));
  }, [rankId]);

  // Filters
  const [selectedProvince, setSelectedProvince] = useState('北京');
  const [selectedType, setSelectedType] = useState('物理组');
  const [selectedYear, setSelectedYear] = useState<number>(2024);

  // Edit Modal State
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [modalTab, setModalTab] = useState<'manual' | 'import'>('manual');
  const [importText, setImportText] = useState('');
  
  // Form State
  const [editingId, setEditingId] = useState<string | null>(null);
  const [newRecord, setNewRecord] = useState<Partial<UniAdmissionRecord>>({
    province: '北京',
    year: 2024,
    type: '物理组',
    batch: '本科一批',
    major: '',
    score: 0,
    rank: 0
  });

  // --- LOGIC: DATA FILTERING ---
  
  // 1. Chart Data: Get the "School Line" (Minimum score) trend for Selected Province + Type
  const chartData = useMemo(() => {
    // Group by year, find minimum score entry (usually labeled '学校投档线' or just min value)
    const filtered = records.filter(r => r.province === selectedProvince && r.type === selectedType);
    const years = Array.from(new Set(filtered.map(r => r.year))).sort((a: number, b: number) => a - b);
    
    return years.map(year => {
        const recsOfYear = filtered.filter(r => r.year === year);
        // Try to find explicit "School Line" first, otherwise min score
        const schoolLine = recsOfYear.find(r => r.major === '学校投档线') || 
                           recsOfYear.sort((a,b) => a.score - b.score)[0];
        
        return {
            year,
            score: schoolLine ? schoolLine.score : null
        };
    }).filter(d => d.score !== null);
  }, [records, selectedProvince, selectedType]);

  // 2. Table Data: Specific majors for Selected Province + Type + Year
  const tableData = useMemo(() => {
      return records.filter(r => 
        r.province === selectedProvince && 
        r.type === selectedType && 
        r.year === selectedYear
      ).sort((a,b) => b.score - a.score); // High to low
  }, [records, selectedProvince, selectedType, selectedYear]);

  // Handlers
  const handleDeleteRecord = (recordId: string) => {
    if (confirm('确认删除该条记录吗？')) {
        setRecords(records.filter(r => r.id !== recordId));
    }
  };

  const handleEditRecord = (record: UniAdmissionRecord) => {
    setNewRecord(record);
    setEditingId(record.id);
    setModalTab('manual'); // Ensure we are on the form tab
  };

  const handleSaveRecord = () => {
      if (newRecord.score && newRecord.major) {
          if (editingId) {
             // Update existing
             setRecords(records.map(r => r.id === editingId ? { ...newRecord, id: editingId } as UniAdmissionRecord : r));
             setEditingId(null);
          } else {
             // Add new
             const rec: UniAdmissionRecord = {
                id: `REC-${Date.now()}`,
                province: newRecord.province!,
                year: Number(newRecord.year),
                type: newRecord.type as any,
                batch: newRecord.batch!,
                major: newRecord.major!,
                score: Number(newRecord.score),
                rank: Number(newRecord.rank) || 0
            };
            setRecords([...records, rec]);
          }
          // Reset Partial Form (keep province/year/type for convenience)
          setNewRecord({ ...newRecord, major: '', score: 0, rank: 0 });
      }
  };

  const handleBatchImport = () => {
    if (!importText.trim()) return;
    
    const rows = importText.trim().split('\n');
    const importedRecords: UniAdmissionRecord[] = [];
    
    rows.forEach((row, idx) => {
        // Simple Parser: Province, Year, Type, Major, Score, Rank
        // Supports comma or tab separation
        const cols = row.split(/,|\t/).map(c => c.trim());
        if (cols.length >= 5) {
            importedRecords.push({
                id: `IMP-${Date.now()}-${idx}`,
                province: cols[0],
                year: parseInt(cols[1]) || 2024,
                type: cols[2] as any,
                major: cols[3],
                score: parseInt(cols[4]) || 0,
                rank: parseInt(cols[5]) || 0,
                batch: '本科一批' // Default
            });
        }
    });

    if (importedRecords.length > 0) {
        setRecords([...records, ...importedRecords]);
        setImportText('');
        alert(`成功导入 ${importedRecords.length} 条数据`);
        setModalTab('manual');
    } else {
        alert('格式无法解析，请检查输入');
    }
  };

  const handleSimulateSync = () => {
      // Simulate fetching data
      const mockSyncData: UniAdmissionRecord[] = [
          { id: `SYNC-1`, province: '浙江', year: 2024, type: '综合改革', batch: '本科一批', major: '人工智能', score: 688, rank: 150 },
          { id: `SYNC-2`, province: '浙江', year: 2024, type: '综合改革', batch: '本科一批', major: '软件工程', score: 685, rank: 200 },
      ];
      setRecords([...records, ...mockSyncData]);
      alert('已从省教育考试院同步最新数据！');
  };

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
            <TrendingUp size={18}/> 录取数据
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
                    {/* --- FILTERS --- */}
                    <div className="flex flex-col sm:flex-row gap-4 bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                        <div className="flex-1">
                            <label className="text-xs font-bold text-slate-500 mb-1 block">生源省份</label>
                            <select 
                                value={selectedProvince}
                                onChange={e => setSelectedProvince(e.target.value)}
                                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm font-medium focus:ring-2 focus:ring-brand-500 outline-none"
                            >
                                {PROVINCES.map(p => <option key={p} value={p}>{p}</option>)}
                            </select>
                        </div>
                        <div className="flex-1">
                            <label className="text-xs font-bold text-slate-500 mb-1 block">科类/选科</label>
                            <select 
                                value={selectedType}
                                onChange={e => setSelectedType(e.target.value)}
                                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm font-medium focus:ring-2 focus:ring-brand-500 outline-none"
                            >
                                {TYPES.map(t => <option key={t} value={t}>{t}</option>)}
                            </select>
                        </div>
                         <div className="flex items-end">
                            <button 
                                onClick={() => setIsEditModalOpen(true)}
                                className="flex items-center gap-2 text-sm text-brand-600 hover:text-brand-700 font-medium bg-brand-50 px-4 py-2 rounded-lg transition-colors h-[38px]"
                            >
                                <Edit2 size={16}/> 数据管理
                            </button>
                        </div>
                    </div>

                    {/* Chart */}
                    <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
                        <h3 className="text-lg font-bold text-slate-900 mb-2 flex items-center gap-2">
                            <TrendingUp className="text-brand-600" size={20}/>
                            最低投档线趋势
                        </h3>
                         <p className="text-xs text-slate-500 mb-6">
                            展示 {selectedProvince} - {selectedType} 在各年份的学校最低录取分
                        </p>
                        <div className="h-72">
                             <ResponsiveContainer width="100%" height="100%">
                                <LineChart data={chartData}>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                                    <XAxis dataKey="year" axisLine={false} tickLine={false} tick={{fill: '#64748b'}} />
                                    <YAxis domain={['dataMin - 5', 'dataMax + 5']} axisLine={false} tickLine={false} tick={{fill: '#64748b'}} />
                                    <Tooltip contentStyle={{ borderRadius: '8px' }}/>
                                    <Line type="monotone" dataKey="score" stroke="#3b82f6" strokeWidth={3} dot={{r: 4}} activeDot={{r: 6}} name="最低投档分" />
                                </LineChart>
                             </ResponsiveContainer>
                        </div>
                    </div>
                    
                    {/* Table */}
                    <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                        <div className="p-4 border-b border-slate-100 bg-slate-50/50 flex flex-wrap justify-between items-center gap-4">
                            <div>
                                <h3 className="font-bold text-slate-800">各专业详细录取数据</h3>
                                <p className="text-xs text-slate-500 mt-1">
                                    {selectedProvince} · {selectedType}
                                </p>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="text-xs text-slate-500">年份筛选:</span>
                                <select 
                                    value={selectedYear}
                                    onChange={e => setSelectedYear(Number(e.target.value))}
                                    className="px-2 py-1 bg-white border border-slate-200 rounded text-sm outline-none focus:border-brand-500"
                                >
                                    {[2024, 2023, 2022, 2021, 2020].map(y => <option key={y} value={y}>{y}</option>)}
                                </select>
                            </div>
                        </div>
                        <table className="w-full text-left">
                            <thead className="bg-slate-50 text-slate-500 text-xs uppercase font-semibold">
                                <tr>
                                    <th className="px-6 py-4">专业名称</th>
                                    <th className="px-6 py-4">批次</th>
                                    <th className="px-6 py-4">录取分数</th>
                                    <th className="px-6 py-4">最低位次</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {tableData.map((item) => (
                                    <tr key={item.id} className="hover:bg-slate-50">
                                        <td className="px-6 py-4 font-medium text-slate-900">
                                            {item.major}
                                            {item.major === '学校投档线' && <span className="ml-2 text-xs bg-slate-100 text-slate-500 px-1.5 py-0.5 rounded">基准</span>}
                                        </td>
                                        <td className="px-6 py-4 text-sm text-slate-600">
                                            <span className="bg-blue-50 text-blue-700 px-2 py-0.5 rounded text-xs">{item.batch}</span>
                                        </td>
                                        <td className="px-6 py-4 font-bold text-slate-900">{item.score}</td>
                                        <td className="px-6 py-4 text-sm text-slate-500">{item.rank || '-'}</td>
                                    </tr>
                                ))}
                                {tableData.length === 0 && (
                                    <tr><td colSpan={4} className="text-center py-8 text-slate-400">暂无该年份筛选数据</td></tr>
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
                    查看录取数据
                </button>
            </div>
        </div>
      </div>

       {/* EDIT MODAL FOR UNIVERSITY SCORES */}
      {isEditModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4 animate-fade-in">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-4xl overflow-hidden animate-scale-up flex flex-col max-h-[85vh]">
             <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-slate-50">
                <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                   <Edit2 size={18} className="text-brand-600"/> 数据管理中心
                </h3>
                <button onClick={() => setIsEditModalOpen(false)} className="text-slate-400 hover:text-slate-600 hover:bg-slate-200 p-1 rounded-full transition-colors">
                  <X size={20} />
                </button>
             </div>
             
             {/* Modal Tabs */}
             <div className="flex border-b border-slate-100 px-6">
                 <button 
                    onClick={() => setModalTab('manual')}
                    className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors ${modalTab === 'manual' ? 'border-brand-600 text-brand-600' : 'border-transparent text-slate-500 hover:text-slate-700'}`}
                 >
                    手动录入/管理
                 </button>
                 <button 
                    onClick={() => setModalTab('import')}
                    className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors flex items-center gap-2 ${modalTab === 'import' ? 'border-brand-600 text-brand-600' : 'border-transparent text-slate-500 hover:text-slate-700'}`}
                 >
                    <FileSpreadsheet size={16}/> 批量导入
                 </button>
             </div>
             
             <div className="p-6 overflow-y-auto flex-1">
                
                {modalTab === 'manual' && (
                  <>
                    {/* Add/Edit Form */}
                    <div className={`p-4 rounded-lg border mb-6 transition-colors ${editingId ? 'bg-amber-50 border-amber-200' : 'bg-slate-50 border-slate-200'}`}>
                        <h4 className={`text-sm font-bold mb-3 flex items-center gap-2 ${editingId ? 'text-amber-700' : 'text-slate-700'}`}>
                            {editingId ? <Edit2 size={16}/> : <Plus size={16}/>} 
                            {editingId ? '编辑记录' : '录入新数据'}
                        </h4>
                        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3">
                            <select 
                            className="px-2 py-2 border border-slate-200 rounded-md text-sm bg-white"
                            value={newRecord.province}
                            onChange={e => setNewRecord({...newRecord, province: e.target.value})}
                            >
                                {PROVINCES.map(p => <option key={p} value={p}>{p}</option>)}
                            </select>
                            <select 
                            className="px-2 py-2 border border-slate-200 rounded-md text-sm bg-white"
                            value={newRecord.year}
                            onChange={e => setNewRecord({...newRecord, year: Number(e.target.value)})}
                            >
                                {[2024, 2023, 2022, 2021].map(y => <option key={y} value={y}>{y}</option>)}
                            </select>
                            <select 
                            className="px-2 py-2 border border-slate-200 rounded-md text-sm bg-white"
                            value={newRecord.type}
                            onChange={e => setNewRecord({...newRecord, type: e.target.value as any})}
                            >
                                {TYPES.map(t => <option key={t} value={t}>{t}</option>)}
                            </select>
                            <input 
                            type="text" placeholder="专业名称" 
                            className="px-3 py-2 border border-slate-200 rounded-md text-sm col-span-2"
                            value={newRecord.major}
                            onChange={e => setNewRecord({...newRecord, major: e.target.value})}
                            />
                            <input 
                            type="number" placeholder="分数" 
                            className="px-3 py-2 border border-slate-200 rounded-md text-sm"
                            value={newRecord.score || ''}
                            onChange={e => setNewRecord({...newRecord, score: Number(e.target.value)})}
                            />
                            <button 
                            onClick={handleSaveRecord}
                            disabled={!newRecord.score || !newRecord.major}
                            className={`text-white rounded-md text-sm font-medium transition-colors disabled:opacity-50 ${editingId ? 'bg-amber-600 hover:bg-amber-700' : 'bg-brand-600 hover:bg-brand-700'}`}
                            >
                            {editingId ? '更新' : '添加'}
                            </button>
                        </div>
                        {editingId && (
                            <div className="mt-2 text-right">
                                <button 
                                    onClick={() => { setEditingId(null); setNewRecord({ ...newRecord, major: '', score: 0 }); }}
                                    className="text-xs text-slate-500 hover:text-slate-700 underline"
                                >
                                    取消编辑
                                </button>
                            </div>
                        )}
                    </div>

                    {/* Edit List */}
                    <div className="flex justify-between items-center mb-3">
                        <h4 className="text-sm font-bold text-slate-700">现有记录总览 ({records.length})</h4>
                    </div>
                    <div className="border border-slate-200 rounded-lg overflow-hidden max-h-[400px] overflow-y-auto">
                    <table className="w-full text-left">
                        <thead className="bg-slate-50 text-xs text-slate-500 uppercase sticky top-0">
                            <tr>
                                <th className="px-4 py-3">省份</th>
                                <th className="px-4 py-3">年份</th>
                                <th className="px-4 py-3">科类</th>
                                <th className="px-4 py-3">专业</th>
                                <th className="px-4 py-3">分数</th>
                                <th className="px-4 py-3 text-right">操作</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {[...records].sort((a,b) => b.year - a.year).map((item) => (
                                <tr key={item.id} className={`hover:bg-slate-50 ${editingId === item.id ? 'bg-amber-50' : ''}`}>
                                    <td className="px-4 py-3 text-sm text-slate-900">{item.province}</td>
                                    <td className="px-4 py-3 text-sm font-medium text-slate-900">{item.year}</td>
                                    <td className="px-4 py-3 text-sm text-slate-600">{item.type}</td>
                                    <td className="px-4 py-3 text-sm text-slate-900">{item.major}</td>
                                    <td className="px-4 py-3 text-sm font-bold text-slate-900">{item.score}</td>
                                    <td className="px-4 py-3 text-right flex justify-end gap-2">
                                        <button 
                                            onClick={() => handleEditRecord(item)}
                                            className="text-brand-500 hover:text-brand-700 p-1 hover:bg-brand-50 rounded"
                                            title="编辑"
                                        >
                                            <Edit2 size={16}/>
                                        </button>
                                        <button 
                                            onClick={() => handleDeleteRecord(item.id)}
                                            className="text-red-400 hover:text-red-600 p-1 hover:bg-red-50 rounded"
                                            title="删除"
                                        >
                                            <Trash2 size={16}/>
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    </div>
                  </>
                )}

                {modalTab === 'import' && (
                    <div className="space-y-6">
                        <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 text-sm text-blue-800">
                            <h5 className="font-bold flex items-center gap-2 mb-2"><Clipboard size={16}/> 使用说明</h5>
                            <p className="mb-2">请直接粘贴 Excel 或 CSV 数据，每行一条记录。格式顺序如下：</p>
                            <code className="bg-white px-2 py-1 rounded border border-blue-200 block w-full mb-2">
                                省份, 年份, 科类, 专业名称, 分数, 位次(可选)
                            </code>
                            <p className="text-xs text-blue-600">例如：北京, 2024, 物理组, 计算机科学与技术, 695, 120</p>
                        </div>

                        <div>
                            <textarea 
                                className="w-full h-48 p-4 border border-slate-200 rounded-lg text-sm font-mono focus:ring-2 focus:ring-brand-500 focus:border-transparent"
                                placeholder="在此处粘贴文本..."
                                value={importText}
                                onChange={(e) => setImportText(e.target.value)}
                            ></textarea>
                        </div>

                        <div className="flex gap-4">
                            <button 
                                onClick={handleBatchImport}
                                disabled={!importText.trim()}
                                className="flex-1 bg-brand-600 text-white py-2 rounded-lg font-medium hover:bg-brand-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                            >
                                <Upload size={18}/> 执行导入
                            </button>
                             <button 
                                onClick={handleSimulateSync}
                                className="flex-1 bg-slate-100 text-slate-700 border border-slate-200 py-2 rounded-lg font-medium hover:bg-slate-200 flex items-center justify-center gap-2"
                            >
                                <RefreshCw size={18}/> 模拟从数据源同步
                            </button>
                        </div>
                    </div>
                )}

             </div>

             <div className="p-4 border-t border-slate-100 bg-slate-50 flex justify-end gap-3">
                 <button 
                    onClick={() => setIsEditModalOpen(false)} 
                    className="px-4 py-2 bg-brand-600 text-white rounded-lg hover:bg-brand-700 shadow-sm flex items-center gap-2"
                 >
                    <Save size={16} /> 完成并关闭
                 </button>
             </div>
          </div>
        </div>
      )}

    </div>
  );
};