import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Student } from '../types';
import { Search, Download, FileSpreadsheet, Eye, Plus, X, Upload, CheckCircle, Loader2, ChevronLeft, ChevronRight, GraduationCap, User } from 'lucide-react';

const INITIAL_STUDENTS: Student[] = [
  { id: '2023001', name: '张小明', grade: 'Grade 10', class: 'Class 1', gpa: 3.8, attendance: 98, status: 'Active' },
  { id: '2023002', name: '李华', grade: 'Grade 10', class: 'Class 1', gpa: 3.5, attendance: 95, status: 'Active' },
  { id: '2023003', name: '王伟', grade: 'Grade 10', class: 'Class 2', gpa: 2.9, attendance: 88, status: 'Suspended' },
  { id: '2023004', name: '赵丽', grade: 'Grade 11', class: 'Class 3', gpa: 4.0, attendance: 100, status: 'Active' },
  { id: '2023005', name: '孙强', grade: 'Grade 12', class: 'Class 1', gpa: 3.2, attendance: 92, status: 'Active' },
];

export const StudentList: React.FC = () => {
  const navigate = useNavigate();
  const [students, setStudents] = useState<Student[]>(INITIAL_STUDENTS);
  const [searchTerm, setSearchTerm] = useState('');
  const [gradeFilter, setGradeFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  
  // Modals State
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isImportModalOpen, setIsImportModalOpen] = useState(false);
  
  // Import State
  const [isImporting, setIsImporting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // New Student Form State
  const [newStudent, setNewStudent] = useState<Partial<Student>>({
    name: '',
    id: '',
    grade: 'Grade 10',
    class: 'Class 1',
    gpa: 0,
    attendance: 100,
    status: 'Active'
  });

  // --- Logic: Filtering ---
  const filteredStudents = students.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          student.id.includes(searchTerm);
    const matchesGrade = gradeFilter === 'All' || student.grade === gradeFilter;
    const matchesStatus = statusFilter === 'All' || student.status === statusFilter; 
    
    return matchesSearch && matchesGrade && matchesStatus;
  });

  // --- Logic: Add Student ---
  const handleAddStudent = (e: React.FormEvent) => {
    e.preventDefault();
    const studentToAdd: Student = {
        id: newStudent.id || `2024${Math.floor(Math.random() * 1000)}`,
        name: newStudent.name || 'New Student',
        grade: newStudent.grade || 'Grade 10',
        class: newStudent.class || 'Class 1',
        gpa: Number(newStudent.gpa) || 0,
        attendance: Number(newStudent.attendance) || 100,
        status: (newStudent.status as any) || 'Active'
    };
    setStudents([studentToAdd, ...students]);
    setIsAddModalOpen(false);
    // Reset
    setNewStudent({ name: '', id: '', grade: 'Grade 10', class: 'Class 1', gpa: 0, attendance: 100, status: 'Active' });
  };

  // --- Logic: Export CSV ---
  const handleExport = () => {
    const headers = "ID,Name,Grade,Class,GPA,Attendance,Status";
    const csvContent = [
        headers,
        ...filteredStudents.map(s => `${s.id},${s.name},${s.grade},${s.class},${s.gpa},${s.attendance}%,${s.status}`)
    ].join("\n");

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `students_export_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // --- Logic: Mock Import ---
  const handleImportFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
        setIsImporting(true);
        // Simulate network delay
        setTimeout(() => {
            const mockImportedStudents: Student[] = [
                { id: '2024088', name: 'Imported User 1', grade: 'Grade 10', class: 'Class 5', gpa: 3.0, attendance: 100, status: 'Active' },
                { id: '2024089', name: 'Imported User 2', grade: 'Grade 11', class: 'Class 2', gpa: 3.2, attendance: 98, status: 'Active' },
            ];
            setStudents([...mockImportedStudents, ...students]);
            setIsImporting(false);
            setIsImportModalOpen(false);
        }, 1500);
    }
  };

  return (
    <div className="p-8 space-y-6 flex flex-col h-[calc(100vh-64px)]">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">学生管理 Student Management</h1>
          <p className="text-slate-500 mt-1">学生档案、学籍异动与画像分析。</p>
        </div>
        <div className="flex gap-2">
            <button 
                onClick={() => setIsImportModalOpen(true)}
                className="flex items-center px-4 py-2 border border-slate-200 text-slate-700 bg-white rounded-lg hover:bg-slate-50 transition-colors shadow-sm"
            >
                <FileSpreadsheet size={18} className="mr-2" />
                批量导入
            </button>
            <button 
                onClick={handleExport}
                className="flex items-center px-4 py-2 border border-slate-200 text-slate-700 bg-white rounded-lg hover:bg-slate-50 transition-colors shadow-sm"
            >
                <Download size={18} className="mr-2" />
                导出数据
            </button>
            <button 
                onClick={() => setIsAddModalOpen(true)}
                className="flex items-center px-4 py-2 bg-brand-600 text-white rounded-lg hover:bg-brand-700 transition-colors shadow-sm font-medium"
            >
                <Plus size={18} className="mr-2" />
                新建学生
            </button>
        </div>
      </div>

       {/* Filters */}
       <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-wrap gap-4 items-center">
        <div className="relative flex-1 min-w-[200px]">
          <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input 
            type="text" 
            placeholder="搜索姓名或学号..." 
            className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <select 
            className="px-4 py-2 border border-slate-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-brand-500 text-slate-600"
            value={gradeFilter}
            onChange={(e) => setGradeFilter(e.target.value)}
        >
            <option value="All">所有年级</option>
            <option value="Grade 10">Grade 10</option>
            <option value="Grade 11">Grade 11</option>
            <option value="Grade 12">Grade 12</option>
        </select>
        <select 
            className="px-4 py-2 border border-slate-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-brand-500 text-slate-600"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
        >
            <option value="All">状态: 全部</option>
            <option value="Active">Active (在读)</option>
            <option value="Suspended">Suspended (休学)</option>
            <option value="Graduated">Graduated (毕业)</option>
        </select>
      </div>

      {/* List Area */}
      <div className="flex-1 overflow-y-auto min-h-0 space-y-4 pb-4">
          {filteredStudents.length > 0 ? (
             filteredStudents.map(student => (
              <div key={student.id} className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between hover:shadow-md transition-all gap-4">
                  <div className="flex items-center gap-4 cursor-pointer" onClick={() => navigate(`/students/${student.id}`)}>
                      <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 font-bold text-lg flex-shrink-0 group-hover:bg-brand-50 group-hover:text-brand-600 transition-colors">
                        {student.name.charAt(0)}
                      </div>
                      <div>
                          <h3 className="font-bold text-slate-900 group-hover:text-brand-600 transition-colors">{student.name}</h3>
                          <div className="flex items-center gap-2 text-xs text-slate-500 mt-1">
                             <span className="font-mono bg-slate-50 px-1.5 py-0.5 rounded border border-slate-100">ID: {student.id}</span>
                             <span>•</span>
                             <span>{student.grade}</span>
                             <span>•</span>
                             <span>{student.class}</span>
                          </div>
                      </div>
                  </div>
                  
                  <div className="flex flex-1 justify-between md:justify-end items-center gap-4 md:gap-12 text-sm border-t md:border-t-0 border-slate-100 pt-4 md:pt-0">
                        <div className="text-center min-w-[60px]">
                            <p className="text-slate-400 text-xs mb-1">GPA</p>
                            <p className={`font-bold ${student.gpa >= 3.5 ? 'text-emerald-600' : 'text-slate-700'}`}>{student.gpa}</p>
                        </div>
                        <div className="text-center min-w-[60px]">
                            <p className="text-slate-400 text-xs mb-1">出勤率</p>
                            <p className={`font-bold ${student.attendance >= 90 ? 'text-emerald-600' : 'text-amber-600'}`}>{student.attendance}%</p>
                        </div>
                        <div className="text-center min-w-[80px]">
                            <p className="text-slate-400 text-xs mb-1">状态</p>
                             <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
                                student.status === 'Active' ? 'bg-emerald-100 text-emerald-700' : 
                                student.status === 'Suspended' ? 'bg-red-100 text-red-700' : 'bg-slate-100 text-slate-600'
                             }`}>
                                {student.status === 'Active' && <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mr-1.5"></div>}
                                {student.status}
                             </span>
                        </div>
                        <button 
                            onClick={() => navigate(`/students/${student.id}`)}
                            className="p-2 text-slate-400 hover:text-brand-600 transition-colors hover:bg-slate-50 rounded-full"
                            title="查看详情"
                        >
                            <Eye size={20} />
                        </button>
                  </div>
              </div>
            ))
          ) : (
             <div className="h-64 flex flex-col items-center justify-center text-slate-400 border-2 border-dashed border-slate-200 rounded-xl bg-slate-50">
                <Search size={48} className="mb-4 opacity-50"/>
                <p>未找到匹配的学生记录</p>
             </div>
          )}
      </div>

       {/* Pagination Footer */}
      <div className="bg-white border-t border-slate-200 -mx-8 -mb-8 px-8 py-4 flex items-center justify-between mt-auto">
          <div className="text-sm text-slate-500">
            显示 <span className="font-medium">1</span> 到 <span className="font-medium">{Math.min(filteredStudents.length, 10)}</span> 条，共 <span className="font-medium">{filteredStudents.length}</span> 条
          </div>
          <div className="flex gap-2">
            <button 
              className="p-2 border border-slate-200 rounded-lg hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(prev => prev - 1)}
            >
              <ChevronLeft size={16} className="text-slate-600" />
            </button>
            <button className="px-3 py-1 bg-brand-50 text-brand-600 border border-brand-200 rounded-lg text-sm font-medium">1</button>
            <button className="px-3 py-1 hover:bg-slate-50 text-slate-600 border border-slate-200 rounded-lg text-sm font-medium">2</button>
            <button 
              className="p-2 border border-slate-200 rounded-lg hover:bg-slate-50"
              onClick={() => setCurrentPage(prev => prev + 1)}
            >
              <ChevronRight size={16} className="text-slate-600" />
            </button>
          </div>
      </div>

      {/* --- ADD STUDENT MODAL --- */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4 animate-fade-in">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg overflow-hidden animate-scale-up">
            <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-slate-50">
              <h3 className="text-lg font-bold text-slate-900">新建学生 / New Student</h3>
              <button onClick={() => setIsAddModalOpen(false)} className="text-slate-400 hover:text-slate-600 hover:bg-slate-200 p-1 rounded-full">
                <X size={20} />
              </button>
            </div>
            <form onSubmit={handleAddStudent} className="p-6 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">姓名</label>
                        <input 
                            type="text" required
                            className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500"
                            value={newStudent.name}
                            onChange={e => setNewStudent({...newStudent, name: e.target.value})}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">学号 (ID)</label>
                        <input 
                            type="text"
                            placeholder="自动生成"
                            className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500 bg-slate-50"
                            value={newStudent.id}
                            onChange={e => setNewStudent({...newStudent, id: e.target.value})}
                        />
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">年级</label>
                        <select 
                            className="w-full px-4 py-2 border border-slate-200 rounded-lg bg-white"
                            value={newStudent.grade}
                            onChange={e => setNewStudent({...newStudent, grade: e.target.value})}
                        >
                            <option>Grade 10</option>
                            <option>Grade 11</option>
                            <option>Grade 12</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">行政班</label>
                        <input 
                            type="text" placeholder="e.g. Class 1"
                            className="w-full px-4 py-2 border border-slate-200 rounded-lg"
                            value={newStudent.class}
                            onChange={e => setNewStudent({...newStudent, class: e.target.value})}
                        />
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                     <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">初始 GPA</label>
                        <input 
                            type="number" step="0.1" max="4.0"
                            className="w-full px-4 py-2 border border-slate-200 rounded-lg"
                            value={newStudent.gpa}
                            onChange={e => setNewStudent({...newStudent, gpa: Number(e.target.value)})}
                        />
                    </div>
                    <div>
                         <label className="block text-sm font-medium text-slate-700 mb-1">状态</label>
                         <select 
                            className="w-full px-4 py-2 border border-slate-200 rounded-lg bg-white"
                            value={newStudent.status}
                            onChange={e => setNewStudent({...newStudent, status: e.target.value as any})}
                        >
                            <option value="Active">Active</option>
                            <option value="Suspended">Suspended</option>
                        </select>
                    </div>
                </div>
                <div className="pt-4 flex gap-3">
                    <button type="button" onClick={() => setIsAddModalOpen(false)} className="flex-1 px-4 py-2 border border-slate-200 text-slate-700 rounded-lg hover:bg-slate-50">取消</button>
                    <button type="submit" className="flex-1 px-4 py-2 bg-brand-600 text-white rounded-lg hover:bg-brand-700 shadow-sm">确认添加</button>
                </div>
            </form>
          </div>
        </div>
      )}

      {/* --- IMPORT MODAL --- */}
      {isImportModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4 animate-fade-in">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden animate-scale-up">
            <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-slate-50">
              <h3 className="text-lg font-bold text-slate-900">批量导入 / Import Data</h3>
              <button onClick={() => !isImporting && setIsImportModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                <X size={20} />
              </button>
            </div>
            <div className="p-8 flex flex-col items-center text-center">
                {isImporting ? (
                    <div className="py-8 space-y-4">
                        <Loader2 size={48} className="text-brand-600 animate-spin mx-auto" />
                        <p className="text-slate-600 font-medium">正在解析 Excel 数据...</p>
                        <p className="text-xs text-slate-400">请勿关闭窗口</p>
                    </div>
                ) : (
                    <>
                        <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mb-4">
                            <FileSpreadsheet size={32} />
                        </div>
                        <h4 className="text-slate-900 font-bold text-lg mb-2">上传 Excel 表格</h4>
                        <p className="text-slate-500 text-sm mb-6">请下载模板并按照格式填入学生信息。<br/>支持 .xlsx 或 .csv 格式。</p>
                        
                        <div className="w-full space-y-3">
                             <button className="w-full py-2 text-sm text-brand-600 hover:bg-brand-50 rounded-lg border border-dashed border-brand-200 transition-colors">
                                下载标准模板.xlsx
                            </button>
                            <input 
                                type="file" 
                                ref={fileInputRef}
                                className="hidden" 
                                accept=".csv, .xlsx"
                                onChange={handleImportFile}
                            />
                            <button 
                                onClick={() => fileInputRef.current?.click()}
                                className="w-full py-2.5 bg-brand-600 hover:bg-brand-700 text-white rounded-lg font-medium shadow-sm flex items-center justify-center gap-2"
                            >
                                <Upload size={18} />
                                选择文件上传
                            </button>
                        </div>
                    </>
                )}
            </div>
          </div>
        </div>
      )}

    </div>
  );
};