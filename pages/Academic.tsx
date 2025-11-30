import React, { useState } from 'react';
import { BookOpen, Calendar, Clock, Search, Filter, MoreVertical, Plus, X, Settings, Loader2, CheckCircle, AlertCircle, Cpu } from 'lucide-react';
import { Course } from '../types';

const INITIAL_COURSES: Course[] = [
  { id: 'C101', code: 'MAT-101', name: 'Algebra I', department: 'Math', teacher: 'Dr. Sarah Chen', schedule: 'Mon/Wed 09:00', credits: 4, enrolled: 28, capacity: 30, type: 'Required' },
  { id: 'C102', code: 'ENG-101', name: 'World Literature', department: 'English', teacher: 'Emily Zhang', schedule: 'Tue/Thu 10:30', credits: 3, enrolled: 25, capacity: 30, type: 'Required' },
  { id: 'C103', code: 'PHY-201', name: 'Advanced Physics', department: 'Science', teacher: 'Michael Brown', schedule: 'Mon/Fri 13:00', credits: 4, enrolled: 18, capacity: 25, type: 'Elective' },
  { id: 'C104', code: 'ART-101', name: 'Intro to Art History', department: 'Arts', teacher: 'Lisa Wang', schedule: 'Wed 14:00', credits: 2, enrolled: 30, capacity: 30, type: 'Elective' },
  { id: 'C105', code: 'CS-101', name: 'Computer Science Principles', department: 'Technology', teacher: 'David Li', schedule: 'Tue 09:00', credits: 3, enrolled: 22, capacity: 25, type: 'Elective' },
];

export const Academic: React.FC = () => {
  const [courses, setCourses] = useState<Course[]>(INITIAL_COURSES);
  const [searchTerm, setSearchTerm] = useState('');
  
  // --- Modal States ---
  const [isCourseModalOpen, setIsCourseModalOpen] = useState(false);
  const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false);

  // --- New Course Form State ---
  const [newCourse, setNewCourse] = useState<Partial<Course>>({
    name: '',
    code: '',
    department: '',
    teacher: '',
    schedule: '',
    credits: 3,
    capacity: 30,
    type: 'Required',
    enrolled: 0
  });

  // --- Scheduler State ---
  const [scheduleStep, setScheduleStep] = useState<'config' | 'processing' | 'result'>('config');
  const [scheduleProgress, setScheduleProgress] = useState(0);

  // --- Logic: Add Course ---
  const handleAddCourse = (e: React.FormEvent) => {
    e.preventDefault();
    const course: Course = {
      id: `C${Math.floor(Math.random() * 10000)}`,
      name: newCourse.name || 'New Course',
      code: newCourse.code || 'N/A',
      department: newCourse.department || 'General',
      teacher: newCourse.teacher || 'TBD',
      schedule: newCourse.schedule || 'TBD',
      credits: Number(newCourse.credits),
      capacity: Number(newCourse.capacity),
      enrolled: 0,
      type: newCourse.type as any,
    };
    setCourses([course, ...courses]);
    setIsCourseModalOpen(false);
    // Reset form
    setNewCourse({
      name: '', code: '', department: '', teacher: '', schedule: '', credits: 3, capacity: 30, type: 'Required', enrolled: 0
    });
  };

  // --- Logic: Run Scheduler ---
  const startScheduling = () => {
    setScheduleStep('processing');
    setScheduleProgress(0);
    
    // Simulate complex algorithm
    let progress = 0;
    const interval = setInterval(() => {
        progress += Math.floor(Math.random() * 15) + 5;
        if (progress >= 100) {
            progress = 100;
            clearInterval(interval);
            setTimeout(() => setScheduleStep('result'), 500);
        }
        setScheduleProgress(progress);
    }, 300);
  };

  const closeScheduler = () => {
      setIsScheduleModalOpen(false);
      setScheduleStep('config');
      setScheduleProgress(0);
  };

  const filteredCourses = courses.filter(c => 
    c.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    c.code.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-8 space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">教学教务 Academic</h1>
          <p className="text-slate-500 mt-1">课程库管理、排课与选课中心。</p>
        </div>
        <div className="flex gap-2">
            <button 
                onClick={() => setIsScheduleModalOpen(true)}
                className="px-4 py-2 border border-slate-200 bg-white text-slate-700 rounded-lg hover:bg-slate-50 flex items-center shadow-sm transition-colors"
            >
                <Cpu size={18} className="mr-2 text-brand-600"/>
                智能排课工具
            </button>
            <button 
                onClick={() => setIsCourseModalOpen(true)}
                className="px-4 py-2 bg-brand-600 text-white rounded-lg hover:bg-brand-700 flex items-center shadow-sm transition-colors"
            >
                <Plus size={18} className="mr-2"/>
                新建课程
            </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-6 text-white shadow-lg">
            <div className="flex justify-between items-start">
                <div>
                    <p className="text-blue-100 text-sm font-medium">本学期开设课程</p>
                    <h3 className="text-3xl font-bold mt-2">{courses.length}</h3>
                </div>
                <div className="p-2 bg-white/20 rounded-lg">
                    <BookOpen size={24} />
                </div>
            </div>
            <p className="text-sm mt-4 text-blue-100">+8 门新课同比去年</p>
        </div>
        <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm">
             <div className="flex justify-between items-start">
                <div>
                    <p className="text-slate-500 text-sm font-medium">平均班额</p>
                    <h3 className="text-3xl font-bold mt-2 text-slate-900">24.5</h3>
                </div>
                <div className="p-2 bg-amber-50 text-amber-600 rounded-lg">
                    <Calendar size={24} />
                </div>
            </div>
            <p className="text-sm mt-4 text-slate-400">最拥挤: Grade 10 Math (32人)</p>
        </div>
        <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm">
             <div className="flex justify-between items-start">
                <div>
                    <p className="text-slate-500 text-sm font-medium">教学时长/周</p>
                    <h3 className="text-3xl font-bold mt-2 text-slate-900">1,280h</h3>
                </div>
                <div className="p-2 bg-emerald-50 text-emerald-600 rounded-lg">
                    <Clock size={24} />
                </div>
            </div>
            <p className="text-sm mt-4 text-slate-400">资源利用率: 88%</p>
        </div>
      </div>

      {/* Course Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden min-h-[400px]">
        <div className="p-4 border-b border-slate-200 flex justify-between items-center bg-slate-50/50">
            <h3 className="font-bold text-slate-800">课程列表</h3>
            <div className="flex gap-2">
                <div className="relative">
                    <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input 
                        type="text" 
                        placeholder="搜索课程代码或名称..." 
                        className="pl-9 pr-4 py-1.5 text-sm border border-slate-200 rounded-md focus:outline-none focus:ring-1 focus:ring-brand-500 w-64"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <button className="p-1.5 border border-slate-200 rounded-md bg-white hover:bg-slate-50 text-slate-600">
                    <Filter size={16} />
                </button>
            </div>
        </div>
        <div className="overflow-x-auto">
            <table className="w-full text-left">
            <thead className="bg-slate-50 text-slate-500 text-xs uppercase font-semibold">
                <tr>
                <th className="px-6 py-4">课程代码/名称</th>
                <th className="px-6 py-4">部门</th>
                <th className="px-6 py-4">任课教师</th>
                <th className="px-6 py-4">时间安排</th>
                <th className="px-6 py-4 text-center">学分</th>
                <th className="px-6 py-4">选课情况</th>
                <th className="px-6 py-4 text-right">操作</th>
                </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
                {filteredCourses.map(course => (
                <tr key={course.id} className="hover:bg-slate-50">
                    <td className="px-6 py-4">
                        <div className="font-medium text-slate-900">{course.name}</div>
                        <div className="text-xs text-slate-500">{course.code} • <span className={course.type === 'Required' ? 'text-blue-600' : 'text-slate-500'}>{course.type}</span></div>
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-600">{course.department}</td>
                    <td className="px-6 py-4 text-sm text-slate-600">
                        <div className="flex items-center gap-2">
                            <div className="w-6 h-6 rounded-full bg-slate-200 flex items-center justify-center text-xs font-bold text-slate-600">
                                {course.teacher.charAt(0)}
                            </div>
                            {course.teacher}
                        </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-600">{course.schedule}</td>
                    <td className="px-6 py-4 text-center text-sm text-slate-900 font-medium">{course.credits}</td>
                    <td className="px-6 py-4">
                        <div className="w-full bg-slate-100 rounded-full h-2 mb-1">
                            <div className={`h-2 rounded-full ${course.enrolled/course.capacity > 0.9 ? 'bg-red-500' : 'bg-brand-500'}`} style={{width: `${(course.enrolled/course.capacity)*100}%`}}></div>
                        </div>
                        <div className="text-xs text-slate-500 text-right">{course.enrolled} / {course.capacity}</div>
                    </td>
                    <td className="px-6 py-4 text-right">
                        <button className="text-slate-400 hover:text-slate-600"><MoreVertical size={18} /></button>
                    </td>
                </tr>
                ))}
            </tbody>
            </table>
        </div>
      </div>

      {/* --- New Course Modal --- */}
      {isCourseModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4 animate-fade-in">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg overflow-hidden animate-scale-up">
            <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-slate-50">
              <h3 className="text-lg font-bold text-slate-900">新建课程 / New Course</h3>
              <button 
                onClick={() => setIsCourseModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 hover:bg-slate-200 p-1 rounded-full"
              >
                <X size={20} />
              </button>
            </div>
            <form onSubmit={handleAddCourse} className="p-6 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">课程名称</label>
                        <input 
                            type="text" required
                            className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500"
                            value={newCourse.name}
                            onChange={e => setNewCourse({...newCourse, name: e.target.value})}
                        />
                    </div>
                     <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">课程代码 (Code)</label>
                        <input 
                            type="text" required placeholder="e.g. MAT-101"
                            className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500"
                            value={newCourse.code}
                            onChange={e => setNewCourse({...newCourse, code: e.target.value})}
                        />
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">所属部门</label>
                        <input 
                            type="text" required
                            className="w-full px-4 py-2 border border-slate-200 rounded-lg"
                            value={newCourse.department}
                            onChange={e => setNewCourse({...newCourse, department: e.target.value})}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">类型</label>
                        <select 
                            className="w-full px-4 py-2 border border-slate-200 rounded-lg bg-white"
                            value={newCourse.type}
                            onChange={e => setNewCourse({...newCourse, type: e.target.value as any})}
                        >
                            <option value="Required">Required (必修)</option>
                            <option value="Elective">Elective (选修)</option>
                        </select>
                    </div>
                </div>
                 <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">学分 (Credits)</label>
                        <input 
                            type="number" min="0" required
                            className="w-full px-4 py-2 border border-slate-200 rounded-lg"
                            value={newCourse.credits}
                            onChange={e => setNewCourse({...newCourse, credits: Number(e.target.value)})}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">容量 (Capacity)</label>
                        <input 
                            type="number" min="0" required
                            className="w-full px-4 py-2 border border-slate-200 rounded-lg"
                            value={newCourse.capacity}
                            onChange={e => setNewCourse({...newCourse, capacity: Number(e.target.value)})}
                        />
                    </div>
                </div>
                 <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">任课教师</label>
                    <input 
                        type="text" placeholder="Teacher Name"
                        className="w-full px-4 py-2 border border-slate-200 rounded-lg"
                        value={newCourse.teacher}
                        onChange={e => setNewCourse({...newCourse, teacher: e.target.value})}
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">时间安排 (预览)</label>
                    <input 
                        type="text" placeholder="e.g. Mon/Wed 10:00"
                        className="w-full px-4 py-2 border border-slate-200 rounded-lg"
                        value={newCourse.schedule}
                        onChange={e => setNewCourse({...newCourse, schedule: e.target.value})}
                    />
                </div>

                <div className="pt-4 flex gap-3">
                    <button type="button" onClick={() => setIsCourseModalOpen(false)} className="flex-1 px-4 py-2 border border-slate-200 text-slate-700 rounded-lg hover:bg-slate-50">取消</button>
                    <button type="submit" className="flex-1 px-4 py-2 bg-brand-600 text-white rounded-lg hover:bg-brand-700 shadow-sm">提交保存</button>
                </div>
            </form>
          </div>
        </div>
      )}

      {/* --- Schedule Tool Modal (Wizard) --- */}
      {isScheduleModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4 animate-fade-in">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg overflow-hidden flex flex-col max-h-[90vh] animate-scale-up">
            
            {/* Header */}
            <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-slate-50">
              <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                 <Cpu size={20} className="text-brand-600"/> 智能排课向导
              </h3>
              <button 
                onClick={closeScheduler} 
                className="text-slate-400 hover:text-slate-600 p-1 rounded-full hover:bg-slate-200"
              >
                <X size={20} />
              </button>
            </div>

            {/* Content Body */}
            <div className="p-8">
                {scheduleStep === 'config' && (
                    <div className="space-y-6">
                        <div className="bg-blue-50 p-4 rounded-lg border border-blue-100 text-sm text-blue-800 flex gap-3">
                            <Settings size={18} className="flex-shrink-0 mt-0.5"/>
                            <p>系统将根据教室资源、教师时间表和学生选课意愿自动生成最优课表。</p>
                        </div>
                        
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">排课学期</label>
                            <select className="w-full px-4 py-2 border border-slate-200 rounded-lg bg-white">
                                <option>2024-2025 第一学期 (Fall)</option>
                                <option>2024-2025 第二学期 (Spring)</option>
                            </select>
                        </div>

                        <div>
                             <label className="block text-sm font-medium text-slate-700 mb-2">优化策略</label>
                             <div className="grid grid-cols-2 gap-4">
                                <label className="border border-brand-200 bg-brand-50 p-4 rounded-lg cursor-pointer flex flex-col items-center text-center transition-all ring-2 ring-brand-500 ring-offset-1">
                                    <span className="font-bold text-brand-700 block mb-1">均衡模式</span>
                                    <span className="text-xs text-brand-600">平衡教师工作量与学生空闲时间</span>
                                    <input type="radio" name="strategy" className="hidden" defaultChecked/>
                                </label>
                                <label className="border border-slate-200 p-4 rounded-lg cursor-pointer flex flex-col items-center text-center hover:bg-slate-50 transition-all">
                                    <span className="font-bold text-slate-700 block mb-1">紧凑模式</span>
                                    <span className="text-xs text-slate-500">尽可能减少课间空档</span>
                                    <input type="radio" name="strategy" className="hidden"/>
                                </label>
                             </div>
                        </div>

                        <div className="pt-4">
                            <button 
                                onClick={startScheduling}
                                className="w-full py-3 bg-brand-600 text-white rounded-lg font-bold hover:bg-brand-700 shadow-lg shadow-brand-200 transition-all flex items-center justify-center"
                            >
                                开始自动排课
                            </button>
                        </div>
                    </div>
                )}

                {scheduleStep === 'processing' && (
                    <div className="py-8 text-center space-y-6">
                        <div className="relative w-20 h-20 mx-auto">
                            <Loader2 size={80} className="text-slate-200 animate-spin"/>
                            <Loader2 size={80} className="text-brand-600 animate-spin absolute top-0 left-0" style={{ animationDirection: 'reverse', opacity: 0.5 }}/>
                            <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-bold text-brand-600">
                                {scheduleProgress}%
                            </span>
                        </div>
                        <div>
                            <h4 className="font-bold text-lg text-slate-900">正在计算最优解...</h4>
                            <p className="text-sm text-slate-500 mt-2">
                                {scheduleProgress < 30 ? '正在加载资源约束...' : 
                                 scheduleProgress < 60 ? '正在解决时间冲突...' : 
                                 scheduleProgress < 90 ? '正在优化教室分配...' : '即将完成...'}
                            </p>
                        </div>
                        {/* Progress Bar */}
                        <div className="w-full bg-slate-100 rounded-full h-3 overflow-hidden">
                            <div className="bg-brand-600 h-full transition-all duration-300 ease-out" style={{ width: `${scheduleProgress}%` }}></div>
                        </div>
                    </div>
                )}

                {scheduleStep === 'result' && (
                    <div className="text-center space-y-6">
                         <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto text-emerald-600 mb-4 animate-scale-up">
                            <CheckCircle size={40} />
                         </div>
                         <div>
                            <h4 className="font-bold text-xl text-slate-900">排课完成！</h4>
                            <p className="text-slate-500 mt-2">系统已成功生成 124 门课程的时间表。</p>
                        </div>

                        <div className="grid grid-cols-2 gap-4 text-left">
                            <div className="bg-slate-50 p-3 rounded-lg border border-slate-100">
                                <p className="text-xs text-slate-500">排课成功率</p>
                                <p className="font-bold text-emerald-600 text-lg">100%</p>
                            </div>
                            <div className="bg-slate-50 p-3 rounded-lg border border-slate-100">
                                <p className="text-xs text-slate-500">资源冲突</p>
                                <p className="font-bold text-slate-900 text-lg">0</p>
                            </div>
                        </div>

                         <div className="pt-4 flex gap-3">
                            <button onClick={closeScheduler} className="flex-1 py-2.5 border border-slate-200 text-slate-600 rounded-lg hover:bg-slate-50">
                                返回
                            </button>
                            <button className="flex-1 py-2.5 bg-brand-600 text-white rounded-lg hover:bg-brand-700 shadow-sm">
                                查看详细课表
                            </button>
                        </div>
                    </div>
                )}
            </div>
          </div>
        </div>
      )}

    </div>
  );
};