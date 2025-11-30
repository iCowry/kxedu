import React from 'react';
import { Settings as SettingsIcon, Shield, Bell, Globe, Save } from 'lucide-react';

export const Settings: React.FC = () => {
  return (
    <div className="p-8 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">系统设置 Settings</h1>
        <p className="text-slate-500 mt-1">平台参数配置、权限管理与安全设置。</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar Navigation */}
        <div className="w-full lg:w-64 space-y-1">
            <button className="w-full text-left px-4 py-3 rounded-lg bg-brand-50 text-brand-700 font-medium flex items-center">
                <SettingsIcon size={18} className="mr-3"/> 基础设置
            </button>
            <button className="w-full text-left px-4 py-3 rounded-lg text-slate-600 hover:bg-slate-50 font-medium flex items-center transition-colors">
                <Shield size={18} className="mr-3"/> 安全与权限
            </button>
            <button className="w-full text-left px-4 py-3 rounded-lg text-slate-600 hover:bg-slate-50 font-medium flex items-center transition-colors">
                <Bell size={18} className="mr-3"/> 通知配置
            </button>
            <button className="w-full text-left px-4 py-3 rounded-lg text-slate-600 hover:bg-slate-50 font-medium flex items-center transition-colors">
                <Globe size={18} className="mr-3"/> 语言与地区
            </button>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 space-y-6">
            
            {/* School Info Card */}
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
                <h3 className="text-lg font-bold text-slate-900 mb-4 border-b border-slate-100 pb-2">学校基础信息</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">学校/机构名称</label>
                        <input type="text" defaultValue="育才实验中学" className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500 text-slate-900"/>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">官方网站</label>
                        <input type="text" defaultValue="https://www.yucai-edu.com" className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500 text-slate-900"/>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">联系电话</label>
                        <input type="text" defaultValue="010-88888888" className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500 text-slate-900"/>
                    </div>
                     <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">管理员邮箱</label>
                        <input type="email" defaultValue="admin@kxedu.com" className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500 text-slate-900"/>
                    </div>
                </div>
            </div>

            {/* Academic Year Config */}
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
                <h3 className="text-lg font-bold text-slate-900 mb-4 border-b border-slate-100 pb-2">学年学期配置</h3>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">当前学年</label>
                        <select className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500 text-slate-900 bg-white">
                            <option>2024-2025 学年</option>
                            <option>2023-2024 学年</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">当前学期</label>
                         <select className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500 text-slate-900 bg-white">
                            <option>第一学期 (Fall)</option>
                            <option>第二学期 (Spring)</option>
                        </select>
                    </div>
                    <div className="md:col-span-2">
                         <div className="flex items-center p-4 bg-amber-50 rounded-lg border border-amber-100 text-sm text-amber-800">
                            <Shield size={16} className="mr-2 flex-shrink-0"/>
                            注意：切换学年会影响全校所有模块的数据展示范围，请在学期结束后进行操作。
                         </div>
                    </div>
                 </div>
            </div>

            <div className="flex justify-end">
                <button className="flex items-center px-6 py-2 bg-brand-600 text-white rounded-lg hover:bg-brand-700 transition-colors font-medium shadow-sm">
                    <Save size={18} className="mr-2"/>
                    保存设置
                </button>
            </div>
        </div>
      </div>
    </div>
  );
};