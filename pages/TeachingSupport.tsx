import React, { useState } from 'react';
import { Coffee, Calendar, FileText, Download, Upload, Plus, MoreHorizontal, CheckCircle, Clock, Video, File, X, User } from 'lucide-react';
import { TutoringSession, LearningResource } from '../types';

// --- MOCK DATA ---
const MOCK_SESSIONS: TutoringSession[] = [
  { id: 'S1', studentName: '张小明', teacherName: 'Dr. Chen', subject: 'Math', date: '2024-11-26', startTime: '16:00', duration: 45, status: 'Scheduled', location: 'Office 302', notes: 'Review Calculus Ch.3' },
  { id: 'S2', studentName: '李华', teacherName: 'Ms. Zhang', subject: 'English', date: '2024-11-25', startTime: '12:30', duration: 30, status: 'Completed', location: 'Library', notes: 'Oral practice' },
  { id: 'S3', studentName: '王伟', teacherName: 'Mr. Brown', subject: 'Physics', date: '2024-11-27', startTime: '15:00', duration: 60, status: 'Scheduled', location: 'Lab 1', notes: 'Mechanics problems' },
];

const MOCK_RESOURCES: LearningResource[] = [
  { id: 'R1', title: '高一数学必修一复习提纲.pdf', type: 'PDF', subject: 'Math', url: '#', uploadDate: '2024-11-01', author: 'Dr. Chen', downloads: 128, size: '2.4 MB' },
  { id: 'R2', title: '牛顿运动定律讲解视频', type: 'Video', subject: 'Physics', url: '#', uploadDate: '2024-10-20', author: 'Mr. Brown', downloads: 85, size: '150 MB' },
  { id: 'R3', title: '英语写作常用句型汇总.ppt', type: 'PPT', subject: 'English', url: '#', uploadDate: '2024-11-10', author: 'Ms. Zhang', downloads: 210, size: '5.1 MB' },
];

export const TeachingSupport: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'sessions' | 'resources'>('sessions');
  const [sessions, setSessions] = useState<TutoringSession[]>(MOCK_SESSIONS);
  const [resources, setResources] = useState<LearningResource[]>(MOCK_RESOURCES);

  // Modal State
  const [isSessionModalOpen, setIsSessionModalOpen] = useState(false);
  const [newSession, setNewSession] = useState<Partial<TutoringSession>>({
      studentName: '',
      date: '',
      startTime: '',
      duration: 30,
      subject: 'Math',
      location: 'Office'
  });

  const handleCreateSession = (e: React.FormEvent) => {
      e.preventDefault();
      const session: TutoringSession = {
          id: `S${Date.now()}`,
          studentName: newSession.studentName!,
          teacherName: 'Me',
          subject: newSession.subject!,
          date: newSession.date!,
          startTime: newSession.startTime!,
          duration: newSession.duration!,
          status: 'Scheduled',
          location: newSession.location,
          notes: newSession.notes
      };
      setSessions([session, ...sessions]);
      setIsSessionModalOpen(false);
  };

  const getFileIcon = (type: string) => {
      if(type === 'PDF') return <FileText size={24} className="text-red-500"/>;
      if(type === 'Video') return <Video size={24} className="text-blue-500"/>;
      return <File size={24} className="text-slate-500"/>;
  };

  return (
    <div className="p-8 space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">教学辅导 Teaching Support</h1>
          <p className="text-slate-500 mt-1">个性化辅导排期与教学资源共享中心。</p>
        </div>
        <div className="flex bg-slate-100 rounded-lg p-1">
            <button 
                onClick={() => setActiveTab('sessions')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-all flex items-center gap-2 ${activeTab === 'sessions' ? 'bg-white text-brand-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
            >
                <Calendar size={16}/> 辅导排期
            </button>
            <button 
                onClick={() => setActiveTab('resources')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-all flex items-center gap-2 ${activeTab === 'resources' ? 'bg-white text-brand-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
            >
                <FileText size={16}/> 资源中心
            </button>
        </div>
      </div>

      {activeTab === 'sessions' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Upcoming Sessions List */}
              <div className="lg:col-span-2 space-y-4">
                  <div className="flex justify-between items-center">
                      <h3 className="font-bold text-slate-800 text-lg">近期辅导安排</h3>
                      <button 
                        onClick={() => setIsSessionModalOpen(true)}
                        className="flex items-center px-3 py-1.5 bg-brand-600 text-white rounded-lg hover:bg-brand-700 text-sm shadow-sm"
                      >
                          <Plus size={16} className="mr-2"/> 新增排期
                      </button>
                  </div>
                  
                  <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                      <div className="divide-y divide-slate-100">
                          {sessions.map(session => (
                              <div key={session.id} className="p-5 flex items-start gap-4 hover:bg-slate-50 transition-colors">
                                  <div className="flex flex-col items-center justify-center w-14 h-14 bg-slate-100 rounded-lg text-slate-600 flex-shrink-0">
                                      <span className="text-xs font-bold uppercase">{new Date(session.date).toLocaleString('default', { month: 'short' })}</span>
                                      <span className="text-xl font-bold">{new Date(session.date).getDate()}</span>
                                  </div>
                                  <div className="flex-1">
                                      <div className="flex justify-between items-start">
                                          <h4 className="font-bold text-slate-900">{session.studentName} <span className="font-normal text-slate-500 text-sm">({session.subject})</span></h4>
                                          <span className={`px-2 py-0.5 rounded text-xs font-medium ${
                                              session.status === 'Scheduled' ? 'bg-blue-50 text-blue-700' :
                                              session.status === 'Completed' ? 'bg-emerald-50 text-emerald-700' :
                                              'bg-slate-100 text-slate-500'
                                          }`}>
                                              {session.status}
                                          </span>
                                      </div>
                                      <div className="flex items-center gap-4 mt-2 text-sm text-slate-500">
                                          <span className="flex items-center gap-1"><Clock size={14}/> {session.startTime} ({session.duration} min)</span>
                                          <span className="flex items-center gap-1"><User size={14}/> {session.location}</span>
                                      </div>
                                      {session.notes && <p className="mt-2 text-sm text-slate-600 bg-slate-50 p-2 rounded">{session.notes}</p>}
                                  </div>
                                  <button className="text-slate-400 hover:text-brand-600 pt-1">
                                      <MoreHorizontal size={20}/>
                                  </button>
                              </div>
                          ))}
                      </div>
                  </div>
              </div>

              {/* Stats / Quick View */}
              <div className="space-y-6">
                  <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl p-6 text-white shadow-lg">
                      <h3 className="font-bold mb-1">本周辅导时长</h3>
                      <p className="text-3xl font-bold">8.5 <span className="text-sm font-normal opacity-80">小时</span></p>
                      <div className="mt-4 flex gap-2">
                          <span className="px-2 py-1 bg-white/20 rounded text-xs">已完成: 6</span>
                          <span className="px-2 py-1 bg-white/20 rounded text-xs">待进行: 4</span>
                      </div>
                  </div>
                  
                  <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
                      <h4 className="font-bold text-slate-800 mb-3">学生问题箱</h4>
                      <ul className="space-y-3">
                          <li className="text-sm text-slate-600 pb-2 border-b border-slate-100 last:border-0">
                              <p className="font-medium text-slate-900 mb-1">张小明: 导数应用题</p>
                              <p className="line-clamp-2">老师，第15题关于极值点的判断我不太理解...</p>
                          </li>
                          <li className="text-sm text-slate-600 pb-2 border-b border-slate-100 last:border-0">
                              <p className="font-medium text-slate-900 mb-1">李华: 作文批改</p>
                              <p className="line-clamp-2">我的草稿已经提交了，请问什么时候可以看...</p>
                          </li>
                      </ul>
                      <button className="w-full mt-3 py-2 text-sm text-brand-600 bg-brand-50 rounded-lg hover:bg-brand-100 font-medium">查看所有留言</button>
                  </div>
              </div>
          </div>
      )}

      {activeTab === 'resources' && (
          <div className="space-y-4">
              <div className="flex justify-between items-center">
                  <h3 className="font-bold text-slate-800 text-lg">教学资源库</h3>
                  <button className="flex items-center px-4 py-2 border border-slate-200 bg-white rounded-lg hover:bg-slate-50 text-sm shadow-sm text-slate-700">
                      <Upload size={16} className="mr-2"/> 上传资源
                  </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {resources.map(res => (
                      <div key={res.id} className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow group cursor-pointer">
                          <div className="flex items-start justify-between mb-4">
                              <div className="p-3 bg-slate-50 rounded-xl">
                                  {getFileIcon(res.type)}
                              </div>
                              <span className="text-xs text-slate-400">{res.uploadDate}</span>
                          </div>
                          <h4 className="font-bold text-slate-900 line-clamp-1 mb-1 group-hover:text-brand-600 transition-colors">{res.title}</h4>
                          <p className="text-xs text-slate-500 mb-4">{res.subject} • {res.size} • {res.author}</p>
                          
                          <div className="flex items-center justify-between pt-3 border-t border-slate-100">
                              <span className="text-xs text-slate-400 flex items-center gap-1">
                                  <Download size={12}/> {res.downloads} 次下载
                              </span>
                              <button className="text-brand-600 hover:text-brand-700 text-sm font-medium">下载</button>
                          </div>
                      </div>
                  ))}
                  
                  {/* Upload Placeholder */}
                  <div className="border-2 border-dashed border-slate-200 rounded-xl p-6 flex flex-col items-center justify-center text-slate-400 hover:border-brand-300 hover:text-brand-600 hover:bg-brand-50/30 transition-all cursor-pointer min-h-[180px]">
                      <Upload size={32} className="mb-2 opacity-50"/>
                      <span className="font-medium text-sm">点击上传新文件</span>
                      <span className="text-xs mt-1 opacity-70">支持 PDF, PPT, Word, MP4</span>
                  </div>
              </div>
          </div>
      )}

      {/* Create Session Modal */}
      {isSessionModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4 animate-fade-in">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden animate-scale-up">
            <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-slate-50">
              <h3 className="text-lg font-bold text-slate-900">新增辅导排期</h3>
              <button onClick={() => setIsSessionModalOpen(false)} className="text-slate-400 hover:text-slate-600 hover:bg-slate-200 p-1 rounded-full">
                <X size={20} />
              </button>
            </div>
            
            <form onSubmit={handleCreateSession} className="p-6 space-y-4">
                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">学生姓名</label>
                    <input type="text" required className="w-full px-3 py-2 border border-slate-200 rounded-lg" value={newSession.studentName} onChange={e => setNewSession({...newSession, studentName: e.target.value})} />
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">日期</label>
                        <input type="date" required className="w-full px-3 py-2 border border-slate-200 rounded-lg text-slate-600" value={newSession.date} onChange={e => setNewSession({...newSession, date: e.target.value})} />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">开始时间</label>
                        <input type="time" required className="w-full px-3 py-2 border border-slate-200 rounded-lg text-slate-600" value={newSession.startTime} onChange={e => setNewSession({...newSession, startTime: e.target.value})} />
                    </div>
                </div>
                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">时长 (分钟)</label>
                    <input type="number" step="15" className="w-full px-3 py-2 border border-slate-200 rounded-lg" value={newSession.duration} onChange={e => setNewSession({...newSession, duration: Number(e.target.value)})} />
                </div>
                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">辅导内容/备注</label>
                    <textarea rows={3} className="w-full px-3 py-2 border border-slate-200 rounded-lg" value={newSession.notes || ''} onChange={e => setNewSession({...newSession, notes: e.target.value})}></textarea>
                </div>
                <div className="pt-2">
                    <button type="submit" className="w-full bg-brand-600 text-white py-2 rounded-lg font-medium hover:bg-brand-700">确认排期</button>
                </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
