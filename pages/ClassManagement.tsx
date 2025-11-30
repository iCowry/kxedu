import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Layers, Users, Home, Plus, Edit2, Trash2, Search, X, Eye } from 'lucide-react';
import { GradeLevel, SchoolClass } from '../types';

const INITIAL_GRADES: GradeLevel[] = [
  { id: 'G10', name: 'Grade 10 (高一)', headOfGrade: 'Mr. Zhang', studentCount: 150, classCount: 4, academicYear: '2024-2025' },
  { id: 'G11', name: 'Grade 11 (高二)', headOfGrade: 'Ms. Li', studentCount: 140, classCount: 4, academicYear: '2024-2025' },
  { id: 'G12', name: 'Grade 12 (高三)', headOfGrade: 'Dr. Wang', studentCount: 120, classCount: 3, academicYear: '2024-2025' },
];

const INITIAL_CLASSES: SchoolClass[] = [
  { id: 'C10-1', name: 'Class 1', gradeId: 'G10', homeroomTeacher: 'Sarah Chen', room: 'Bldg A-101', studentCount: 38, capacity: 40, slogan: 'Dream Big, Work Hard' },
  { id: 'C10-2', name: 'Class 2', gradeId: 'G10', homeroomTeacher: 'John Doe', room: 'Bldg A-102', studentCount: 35, capacity: 40, slogan: 'Unity is Strength' },
  { id: 'C10-3', name: 'Class 3', gradeId: 'G10', homeroomTeacher: 'Jane Smith', room: 'Bldg A-103', studentCount: 36, capacity: 40 },
  { id: 'C11-1', name: 'Class 1', gradeId: 'G11', homeroomTeacher: 'Mike Brown', room: 'Bldg B-201', studentCount: 40, capacity: 40 },
  { id: 'C12-1', name: 'Class 1', gradeId: 'G12', homeroomTeacher: 'Emily White', room: 'Bldg C-301', studentCount: 30, capacity: 35 },
];

export const ClassManagement: React.FC = () => {
  const navigate = useNavigate();
  const [grades, setGrades] = useState<GradeLevel[]>(INITIAL_GRADES);
  const [classes, setClasses] = useState<SchoolClass[]>(INITIAL_CLASSES);
  const [selectedGradeId, setSelectedGradeId] = useState<string>(INITIAL_GRADES[0].id);
  
  // Modal States
  const [isGradeModalOpen, setIsGradeModalOpen] = useState(false);
  const [isClassModalOpen, setIsClassModalOpen] = useState(false);

  // Forms
  const [newGrade, setNewGrade] = useState<Partial<GradeLevel>>({ name: '', headOfGrade: '', academicYear: '2024-2025' });
  const [newClass, setNewClass] = useState<Partial<SchoolClass>>({ name: '', homeroomTeacher: '', room: '', capacity: 40 });

  // Logic
  const filteredClasses = classes.filter(c => c.gradeId === selectedGradeId);
  const activeGrade = grades.find(g => g.id === selectedGradeId);

  const handleAddGrade = (e: React.FormEvent) => {
    e.preventDefault();
    const grade: GradeLevel = {
      id: `G${Math.floor(Math.random() * 100)}`,
      name: newGrade.name || 'New Grade',
      headOfGrade: newGrade.headOfGrade || 'TBD',
      studentCount: 0,
      classCount: 0,
      academicYear: newGrade.academicYear || '2024-2025'
    };
    setGrades([...grades, grade]);
    setIsGradeModalOpen(false);
    setNewGrade({ name: '', headOfGrade: '', academicYear: '2024-2025' });
  };

  const handleAddClass = (e: React.FormEvent) => {
    e.preventDefault();
    const cls: SchoolClass = {
      id: `C-${Math.floor(Math.random() * 1000)}`,
      gradeId: selectedGradeId,
      name: newClass.name || 'New Class',
      homeroomTeacher: newClass.homeroomTeacher || 'TBD',
      room: newClass.room || 'TBD',
      studentCount: 0,
      capacity: Number(newClass.capacity) || 40
    };
    
    // Update classes list
    setClasses([...classes, cls]);
    
    // Update grade count
    setGrades(grades.map(g => g.id === selectedGradeId ? { ...g, classCount: g.classCount + 1 } : g));

    setIsClassModalOpen(false);
    setNewClass({ name: '', homeroomTeacher: '', room: '', capacity: 40 });
  };

  const handleDeleteClass = (classId: string) => {
    if (confirm('确认删除该班级吗？')) {
      setClasses(classes.filter(c => c.id !== classId));
      setGrades(grades.map(g => g.id === selectedGradeId ? { ...g, classCount: g.classCount - 1 } : g));
    }
  };

  return (
    <div className="p-8 h-[calc(100vh-64px)] flex flex-col">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-900">组织架构 Organization</h1>
        <p className="text-slate-500 mt-1">管理年级、行政班级及组织层级关系。</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-6 flex-1 min-h-0">
        
        {/* Left Column: Grade Management */}
        <div className="w-full lg:w-80 flex flex-col gap-4">
          <div className="flex justify-between items-center mb-2">
             <h2 className="font-bold text-slate-800 flex items-center gap-2">
                <Layers size={18} className="text-brand-600"/> 年级列表
             </h2>
             <button 
                onClick={() => setIsGradeModalOpen(true)}
                className="p-1.5 bg-brand-50 text-brand-600 rounded-md hover:bg-brand-100 transition-colors"
             >
                <Plus size={18} />
             </button>
          </div>
          
          <div className="flex-1 overflow-y-auto space-y-3 pr-1">
            {grades.map(grade => (
              <div 
                key={grade.id}
                onClick={() => setSelectedGradeId(grade.id)}
                className={`p-4 rounded-xl border cursor-pointer transition-all ${
                  selectedGradeId === grade.id 
                    ? 'bg-brand-600 border-brand-600 text-white shadow-md' 
                    : 'bg-white border-slate-200 hover:border-brand-300 hover:shadow-sm text-slate-700'
                }`}
              >
                <div className="flex justify-between items-start">
                  <h3 className="font-bold text-lg">{grade.name}</h3>
                  {selectedGradeId === grade.id && <div className="w-2 h-2 rounded-full bg-white mt-2"></div>}
                </div>
                <p className={`text-xs mt-1 ${selectedGradeId === grade.id ? 'text-brand-100' : 'text-slate-500'}`}>
                  年级组长: {grade.headOfGrade}
                </p>
                <div className="mt-4 flex gap-4 text-sm">
                   <div className="flex items-center gap-1.5">
                      <Home size={14} className={selectedGradeId === grade.id ? 'text-brand-200' : 'text-slate-400'}/>
                      <span className="font-medium">{grade.classCount}</span> 班级
                   </div>
                   <div className="flex items-center gap-1.5">
                      <Users size={14} className={selectedGradeId === grade.id ? 'text-brand-200' : 'text-slate-400'}/>
                      <span className="font-medium">{grade.studentCount}</span> 学生
                   </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Class Management */}
        <div className="flex-1 bg-white rounded-xl border border-slate-200 shadow-sm flex flex-col overflow-hidden">
          {/* Header */}
          <div className="p-4 border-b border-slate-200 flex flex-wrap gap-4 justify-between items-center bg-slate-50">
            <div>
               <h3 className="text-lg font-bold text-slate-900">{activeGrade?.name} - 班级管理</h3>
               <p className="text-xs text-slate-500 mt-1">
                 共有 {filteredClasses.length} 个班级 • 学年: {activeGrade?.academicYear}
               </p>
            </div>
            <div className="flex gap-2">
                <div className="relative">
                    <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input 
                        type="text" 
                        placeholder="搜索班级..." 
                        className="pl-9 pr-4 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500 w-48"
                    />
                </div>
                <button 
                  onClick={() => setIsClassModalOpen(true)}
                  className="flex items-center px-4 py-2 bg-brand-600 text-white rounded-lg hover:bg-brand-700 transition-colors shadow-sm text-sm font-medium"
                >
                  <Plus size={16} className="mr-2"/> 新建班级
                </button>
            </div>
          </div>

          {/* Table */}
          <div className="flex-1 overflow-auto">
            <table className="w-full text-left">
              <thead className="bg-slate-50 text-slate-500 text-xs uppercase font-semibold sticky top-0 z-10">
                <tr>
                  <th className="px-6 py-4">班级名称</th>
                  <th className="px-6 py-4">班主任</th>
                  <th className="px-6 py-4">所在教室</th>
                  <th className="px-6 py-4">人数 / 容量</th>
                  <th className="px-6 py-4">饱和度</th>
                  <th className="px-6 py-4 text-right">操作</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredClasses.length > 0 ? (
                  filteredClasses.map(cls => (
                    <tr key={cls.id} className="hover:bg-slate-50">
                      <td className="px-6 py-4">
                        <div className="font-medium text-slate-900">{cls.name}</div>
                        <div className="text-xs text-slate-500">ID: {cls.id}</div>
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-600">
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center text-xs font-bold">
                             {cls.homeroomTeacher.charAt(0)}
                          </div>
                          {cls.homeroomTeacher}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-600">
                         {cls.room}
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-600 font-medium">
                        {cls.studentCount} <span className="text-slate-400 font-normal">/ {cls.capacity}</span>
                      </td>
                      <td className="px-6 py-4 align-middle">
                        <div className="w-24 bg-slate-100 rounded-full h-1.5">
                            <div 
                                className={`h-1.5 rounded-full ${cls.studentCount >= cls.capacity ? 'bg-red-500' : 'bg-emerald-500'}`} 
                                style={{ width: `${Math.min((cls.studentCount / cls.capacity) * 100, 100)}%` }}
                            ></div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                           <button 
                             onClick={() => navigate(`/organization/class/${cls.id}`)}
                             className="p-1 text-brand-600 hover:bg-brand-50 rounded"
                             title="查看详情"
                           >
                             <Eye size={16} />
                           </button>
                           <button className="p-1 text-slate-400 hover:text-brand-600 hover:bg-slate-100 rounded">
                             <Edit2 size={16} />
                           </button>
                           <button 
                             onClick={() => handleDeleteClass(cls.id)}
                             className="p-1 text-slate-400 hover:text-red-600 hover:bg-slate-100 rounded"
                           >
                             <Trash2 size={16} />
                           </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                   <tr>
                      <td colSpan={6} className="px-6 py-12 text-center text-slate-400">
                         该年级下暂无班级数据
                      </td>
                   </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Grade Modal */}
      {isGradeModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4 animate-fade-in">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden animate-scale-up">
            <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-slate-50">
              <h3 className="text-lg font-bold text-slate-900">添加年级</h3>
              <button onClick={() => setIsGradeModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                <X size={20} />
              </button>
            </div>
            <form onSubmit={handleAddGrade} className="p-6 space-y-4">
               <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">年级名称</label>
                  <input 
                    type="text" required placeholder="例如：Grade 9"
                    className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500"
                    value={newGrade.name}
                    onChange={e => setNewGrade({...newGrade, name: e.target.value})}
                  />
               </div>
               <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">年级组长</label>
                  <input 
                    type="text" placeholder="教师姓名"
                    className="w-full px-4 py-2 border border-slate-200 rounded-lg"
                    value={newGrade.headOfGrade}
                    onChange={e => setNewGrade({...newGrade, headOfGrade: e.target.value})}
                  />
               </div>
               <div className="pt-2">
                   <button type="submit" className="w-full py-2.5 bg-brand-600 text-white rounded-lg hover:bg-brand-700">确认添加</button>
               </div>
            </form>
          </div>
        </div>
      )}

      {/* Class Modal */}
      {isClassModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4 animate-fade-in">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden animate-scale-up">
            <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-slate-50">
              <h3 className="text-lg font-bold text-slate-900">新建班级 ({activeGrade?.name})</h3>
              <button onClick={() => setIsClassModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                <X size={20} />
              </button>
            </div>
            <form onSubmit={handleAddClass} className="p-6 space-y-4">
               <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">班级名称</label>
                  <input 
                    type="text" required placeholder="例如：Class 1 (Honors)"
                    className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500"
                    value={newClass.name}
                    onChange={e => setNewClass({...newClass, name: e.target.value})}
                  />
               </div>
               <div className="grid grid-cols-2 gap-4">
                 <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">班主任</label>
                    <input 
                        type="text" required placeholder="教师姓名"
                        className="w-full px-4 py-2 border border-slate-200 rounded-lg"
                        value={newClass.homeroomTeacher}
                        onChange={e => setNewClass({...newClass, homeroomTeacher: e.target.value})}
                    />
                 </div>
                 <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">所在教室</label>
                    <input 
                        type="text" placeholder="例如：A-101"
                        className="w-full px-4 py-2 border border-slate-200 rounded-lg"
                        value={newClass.room}
                        onChange={e => setNewClass({...newClass, room: e.target.value})}
                    />
                 </div>
               </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">班级容量</label>
                  <input 
                    type="number" required
                    className="w-full px-4 py-2 border border-slate-200 rounded-lg"
                    value={newClass.capacity}
                    onChange={e => setNewClass({...newClass, capacity: Number(e.target.value)})}
                  />
               </div>
               <div className="pt-2">
                   <button type="submit" className="w-full py-2.5 bg-brand-600 text-white rounded-lg hover:bg-brand-700">确认创建</button>
               </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};