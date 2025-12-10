import React, { useState } from 'react';
import { MessageCircle, Bell, Users, Eye, Send, FileText, CheckCircle2, X, Plus, AlertTriangle, Paperclip, Layout, Sparkles, Loader2 } from 'lucide-react';
import { Announcement } from '../types';
import { sendMessageToGemini } from '../services/geminiService';

const INITIAL_ANNOUNCEMENTS: Announcement[] = [
  { id: 'ANN-001', title: '关于2025年寒假放假安排的通知', content: '各位师生、家长：\n根据教育局规定，我校2025年寒假放假时间定于...', targetGroup: 'All', priority: 'High', sender: '教务处', publishDate: '2025-01-10', readCount: 2150, totalCount: 2400 },
  { id: 'ANN-002', title: '春季运动会报名开启', content: '请各班体育委员统计参赛名单...', targetGroup: 'Students', targetDetail: 'All Grades', priority: 'Normal', sender: '体育组', publishDate: '2025-03-01', readCount: 890, totalCount: 1200 },
  { id: 'ANN-003', title: '致家长的一封信：关于预防流感', content: '近期流感高发，请家长注意...', targetGroup: 'Parents', targetDetail: 'Primary Section', priority: 'High', sender: '校医务室', publishDate: '2024-11-20', readCount: 1800, totalCount: 2400 },
];

export const Communication: React.FC = () => {
  const [announcements, setAnnouncements] = useState<Announcement[]>(INITIAL_ANNOUNCEMENTS);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  
  // Form State
  const [newAnnounce, setNewAnnounce] = useState<Partial<Announcement>>({
    title: '',
    targetGroup: 'All',
    targetDetail: '',
    priority: 'Normal',
    sender: '教务处',
    content: ''
  });

  const handlePublish = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simulate target count based on group
    let targetCount = 2400; // All
    if (newAnnounce.targetGroup === 'Students') targetCount = 1200;
    if (newAnnounce.targetGroup === 'Teachers') targetCount = 200;
    if (newAnnounce.targetGroup === 'Parents') targetCount = 2000;

    const announcement: Announcement = {
      id: `ANN-${Date.now()}`,
      title: newAnnounce.title || '无标题通知',
      content: newAnnounce.content || '',
      targetGroup: newAnnounce.targetGroup as any,
      targetDetail: newAnnounce.targetDetail || 'General',
      priority: newAnnounce.priority as any || 'Normal',
      sender: newAnnounce.sender || '行政处',
      publishDate: new Date().toISOString().split('T')[0],
      readCount: 0,
      totalCount: targetCount
    };

    setAnnouncements([announcement, ...announcements]);
    setIsModalOpen(false);
    
    // Reset Form
    setNewAnnounce({
      title: '',
      targetGroup: 'All',
      targetDetail: '',
      priority: 'Normal',
      sender: '教务处',
      content: ''
    });
  };

  const handleAiDraft = async () => {
    if (!newAnnounce.title) {
        alert('请先输入通知标题，以便AI生成相关内容。');
        return;
    }
    
    setIsGenerating(true);
    try {
        const prompt = `请为学校"${newAnnounce.sender}"起草一份通知。
        标题：${newAnnounce.title}
        接收对象：${newAnnounce.targetGroup === 'All' ? '全体师生' : newAnnounce.targetGroup}
        要求：语气正式、亲切，包含开头问候、正文详情（根据标题合理推断）和结尾落款。内容控制在200字以内。`;
        
        const generatedText = await sendMessageToGemini(prompt);
        setNewAnnounce(prev => ({ ...prev, content: generatedText }));
    } catch (error) {
        console.error('AI Draft failed', error);
        alert('AI 生成失败，请重试');
    } finally {
        setIsGenerating(false);
    }
  };

  return (
    <div className="p-8 space-y-6 flex flex-col h-[calc(100vh-64px)]">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">家校互通 Communication</h1>
          <p className="text-slate-500 mt-1">通知公告、家校留言与成长档案。</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="flex items-center px-4 py-2 bg-brand-600 text-white rounded-lg hover:bg-brand-700 transition-colors shadow-sm font-medium"
        >
            <Send size={18} className="mr-2" />
            发布新通知
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 flex-1 min-h-0">
        {/* Left Column: Announcements List */}
        <div className="lg:col-span-2 space-y-6 flex flex-col min-h-0">
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm flex flex-col flex-1 overflow-hidden">
                <div className="p-4 border-b border-slate-200 bg-slate-50/50 flex justify-between items-center flex-shrink-0">
                    <h3 className="font-bold text-slate-800 flex items-center gap-2">
                        <Bell size={18} className="text-brand-600"/>
                        已发通知列表
                    </h3>
                    <span className="text-xs text-slate-500">本学期共发布 {announcements.length} 条</span>
                </div>
                <div className="divide-y divide-slate-100 overflow-y-auto flex-1">
                    {announcements.map(ann => (
                        <div key={ann.id} className="p-6 hover:bg-slate-50 transition-colors group cursor-pointer relative">
                            {/* Priority Indicator */}
                            {ann.priority === 'High' && (
                                <div className="absolute top-0 right-0 p-2">
                                    <span className="flex items-center gap-1 text-xs font-bold text-red-600 bg-red-50 border border-red-100 px-2 py-0.5 rounded-bl-lg rounded-tr-lg">
                                        <AlertTriangle size={10}/> 紧急
                                    </span>
                                </div>
                            )}

                            <div className="flex justify-between items-start mb-2 pr-12">
                                <h4 className="text-lg font-semibold text-slate-900 group-hover:text-brand-600 transition-colors line-clamp-1">{ann.title}</h4>
                                <span className="text-xs text-slate-400 whitespace-nowrap ml-4">{ann.publishDate}</span>
                            </div>
                            <p className="text-sm text-slate-600 mb-3 line-clamp-2 whitespace-pre-wrap">{ann.content}</p>
                            <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500">
                                <span className={`flex items-center gap-1 px-2 py-0.5 rounded border ${
                                    ann.targetGroup === 'All' ? 'bg-blue-50 text-blue-700 border-blue-100' :
                                    ann.targetGroup === 'Parents' ? 'bg-purple-50 text-purple-700 border-purple-100' :
                                    ann.targetGroup === 'Teachers' ? 'bg-amber-50 text-amber-700 border-amber-100' :
                                    'bg-slate-100 text-slate-700 border-slate-200'
                                }`}>
                                    <Users size={12}/> 对象: {ann.targetGroup === 'All' ? '全校师生' : ann.targetGroup}
                                    {ann.targetDetail && ann.targetDetail !== 'General' && <span className="ml-1 opacity-75">({ann.targetDetail})</span>}
                                </span>
                                <span className="flex items-center gap-1">
                                    <CheckCircle2 size={12} className="text-emerald-500"/> {ann.sender}
                                </span>
                                <div className="flex-1"></div>
                                <div className="flex items-center gap-1" title="阅读率">
                                    <Eye size={12}/> 
                                    <span className="font-medium text-slate-700">
                                        {ann.totalCount > 0 ? Math.round((ann.readCount/ann.totalCount)*100) : 0}%
                                    </span>
                                    <span className="text-slate-400">({ann.readCount}/{ann.totalCount})</span>
                                </div>
                            </div>
                            <div className="mt-3 h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                                <div className="h-full bg-brand-500 rounded-full" style={{width: `${ann.totalCount > 0 ? (ann.readCount/ann.totalCount)*100 : 0}%`}}></div>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="p-4 border-t border-slate-200 text-center flex-shrink-0">
                    <button className="text-sm text-brand-600 hover:text-brand-700 font-medium">查看更早的历史通知</button>
                </div>
            </div>
        </div>

        {/* Right Column: Quick Stats & Messages */}
        <div className="space-y-6 overflow-y-auto">
            <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl p-6 text-white shadow-lg">
                <h3 className="font-bold text-lg mb-4">今日概览</h3>
                <div className="grid grid-cols-2 gap-4">
                    <div className="bg-white/10 rounded-lg p-3 backdrop-blur-sm">
                        <p className="text-indigo-100 text-xs">家长留言</p>
                        <p className="text-2xl font-bold mt-1">15</p>
                    </div>
                    <div className="bg-white/10 rounded-lg p-3 backdrop-blur-sm">
                        <p className="text-indigo-100 text-xs">需处理回执</p>
                        <p className="text-2xl font-bold mt-1">3</p>
                    </div>
                </div>
            </div>

            <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="p-4 border-b border-slate-200 flex justify-between items-center">
                    <h3 className="font-bold text-slate-800 flex items-center gap-2">
                        <MessageCircle size={18} className="text-emerald-500"/>
                        最新留言
                    </h3>
                </div>
                <div className="p-4 space-y-4">
                    <div className="flex gap-3 items-start">
                        <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center text-orange-600 font-bold text-xs flex-shrink-0">
                            李
                        </div>
                        <div className="bg-slate-50 p-3 rounded-lg rounded-tl-none text-sm">
                            <div className="flex justify-between items-center mb-1">
                                <span className="font-bold text-slate-700">李华家长</span>
                                <span className="text-xs text-slate-400">10:30 AM</span>
                            </div>
                            <p className="text-slate-600">老师您好，李华今天身体不适，想请假一天，请问需要什么手续？</p>
                        </div>
                    </div>
                    <div className="flex gap-3 items-start">
                        <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-xs flex-shrink-0">
                            张
                        </div>
                        <div className="bg-slate-50 p-3 rounded-lg rounded-tl-none text-sm">
                            <div className="flex justify-between items-center mb-1">
                                <span className="font-bold text-slate-700">张伟家长</span>
                                <span className="text-xs text-slate-400">昨天</span>
                            </div>
                            <p className="text-slate-600">收到成绩单了，感谢老师这学期的辛苦付出！</p>
                        </div>
                    </div>
                </div>
                 <div className="p-3 border-t border-slate-200 text-center">
                    <button className="text-xs text-slate-500 hover:text-brand-600">进入消息中心 →</button>
                </div>
            </div>
            
            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
                    <FileText size={18} className="text-amber-500"/>
                    成长档案更新
                </h3>
                <p className="text-sm text-slate-500 mb-4">本周已有 <span className="font-bold text-slate-900">85%</span> 的班主任更新了学生周评。</p>
                <div className="w-full bg-slate-100 rounded-full h-2">
                    <div className="h-2 rounded-full bg-amber-500" style={{width: '85%'}}></div>
                </div>
            </div>
        </div>
      </div>

      {/* --- Publish Announcement Modal --- */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4 animate-fade-in">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg overflow-hidden animate-scale-up flex flex-col max-h-[90vh]">
            <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-slate-50">
              <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                 <Send size={18} className="text-brand-600"/> 发布新通知
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-600 hover:bg-slate-200 p-1 rounded-full transition-colors">
                <X size={20} />
              </button>
            </div>
            
            <form onSubmit={handlePublish} className="p-6 space-y-4 flex-1 overflow-y-auto">
               <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">通知标题</label>
                  <input 
                    type="text" required placeholder="请输入标题..."
                    className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500"
                    value={newAnnounce.title}
                    onChange={e => setNewAnnounce({...newAnnounce, title: e.target.value})}
                  />
               </div>

               <div className="grid grid-cols-2 gap-4">
                 <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">发布部门/人</label>
                    <input 
                        type="text" required placeholder="例如：教务处"
                        className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500"
                        value={newAnnounce.sender}
                        onChange={e => setNewAnnounce({...newAnnounce, sender: e.target.value})}
                    />
                 </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">优先级</label>
                    <div className="flex gap-2">
                        <label className={`flex-1 flex items-center justify-center gap-1 py-2 border rounded-lg cursor-pointer transition-all ${newAnnounce.priority === 'Normal' ? 'bg-blue-50 border-blue-200 text-blue-700 font-medium' : 'border-slate-200 hover:bg-slate-50'}`}>
                            <span className="w-2 h-2 rounded-full bg-blue-500"></span> 普通
                            <input type="radio" name="priority" value="Normal" className="hidden" checked={newAnnounce.priority === 'Normal'} onChange={() => setNewAnnounce({...newAnnounce, priority: 'Normal'})} />
                        </label>
                        <label className={`flex-1 flex items-center justify-center gap-1 py-2 border rounded-lg cursor-pointer transition-all ${newAnnounce.priority === 'High' ? 'bg-red-50 border-red-200 text-red-700 font-medium' : 'border-slate-200 hover:bg-slate-50'}`}>
                            <AlertTriangle size={14}/> 紧急
                            <input type="radio" name="priority" value="High" className="hidden" checked={newAnnounce.priority === 'High'} onChange={() => setNewAnnounce({...newAnnounce, priority: 'High'})} />
                        </label>
                    </div>
                 </div>
               </div>

               <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">接收对象</label>
                    <div className="flex gap-3">
                        <select 
                            className="flex-1 px-4 py-2 border border-slate-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-brand-500"
                            value={newAnnounce.targetGroup}
                            onChange={e => setNewAnnounce({...newAnnounce, targetGroup: e.target.value as any})}
                        >
                            <option value="All">全校师生 (All)</option>
                            <option value="Students">仅学生 (Students)</option>
                            <option value="Parents">仅家长 (Parents)</option>
                            <option value="Teachers">仅教师 (Teachers)</option>
                        </select>
                        {newAnnounce.targetGroup !== 'All' && (
                             <input 
                                type="text" 
                                placeholder={newAnnounce.targetGroup === 'Teachers' ? "如：数学组" : "如：Grade 10"}
                                className="flex-1 px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500"
                                value={newAnnounce.targetDetail}
                                onChange={e => setNewAnnounce({...newAnnounce, targetDetail: e.target.value})}
                             />
                        )}
                    </div>
               </div>

               <div>
                  <div className="flex justify-between items-center mb-1">
                      <label className="block text-sm font-medium text-slate-700">通知正文</label>
                      <button 
                        type="button"
                        onClick={handleAiDraft}
                        disabled={isGenerating}
                        className="text-xs flex items-center gap-1 text-purple-600 hover:text-purple-700 bg-purple-50 px-2 py-1 rounded-lg border border-purple-100 transition-colors disabled:opacity-50"
                      >
                          {isGenerating ? <Loader2 size={12} className="animate-spin"/> : <Sparkles size={12}/>}
                          {isGenerating ? 'AI 撰写中...' : 'AI 帮我写'}
                      </button>
                  </div>
                  <textarea 
                    required placeholder="请输入通知详细内容，或使用 AI 辅助生成..."
                    rows={6}
                    className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500 resize-none"
                    value={newAnnounce.content}
                    onChange={e => setNewAnnounce({...newAnnounce, content: e.target.value})}
                  />
               </div>

               <div className="flex items-center justify-between p-3 border border-dashed border-slate-300 rounded-lg bg-slate-50/50">
                    <span className="text-sm text-slate-500 flex items-center gap-2">
                        <Paperclip size={16}/> 添加附件 (可选)
                    </span>
                    <button type="button" className="text-xs text-brand-600 hover:text-brand-700 font-medium border border-brand-200 px-3 py-1 rounded bg-white">
                        选择文件
                    </button>
               </div>
            </form>

            <div className="p-6 border-t border-slate-100 flex gap-3 bg-slate-50">
                <button 
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 px-4 py-2 border border-slate-200 text-slate-700 rounded-lg hover:bg-slate-100 transition-colors"
                >
                  取消
                </button>
                <button 
                  type="button"
                  onClick={handlePublish}
                  className="flex-1 px-4 py-2 bg-brand-600 text-white rounded-lg hover:bg-brand-700 transition-colors font-medium shadow-sm flex justify-center items-center gap-2"
                >
                  <Send size={16} /> 确认发布
                </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};