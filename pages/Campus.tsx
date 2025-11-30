import React, { useState } from 'react';
import { Building, Box, Calendar, Search, Filter, CheckCircle, Clock, AlertTriangle, MapPin } from 'lucide-react';
import { Asset, Reservation } from '../types';

const MOCK_ASSETS: Asset[] = [
  { id: 'AST-001', name: 'MacBook Pro 16"', category: 'Electronics', status: 'In Use', location: 'IT Lab 101', purchaseDate: '2023-01-15', value: 18000 },
  { id: 'AST-002', name: 'Projector Sony 4K', category: 'Electronics', status: 'In Use', location: 'Auditorium', purchaseDate: '2022-05-20', value: 35000 },
  { id: 'AST-003', name: 'School Bus A', category: 'Vehicle', status: 'Maintenance', location: 'Parking Lot', purchaseDate: '2020-09-01', value: 450000 },
  { id: 'AST-004', name: 'Conf Table L', category: 'Furniture', status: 'Idle', location: 'Storage B', purchaseDate: '2021-11-11', value: 5000 },
  { id: 'AST-005', name: 'Microscope Zeiss', category: 'Electronics', status: 'In Use', location: 'Bio Lab', purchaseDate: '2023-03-10', value: 12000 },
];

const MOCK_RESERVATIONS: Reservation[] = [
  { id: 'RES-101', resourceName: 'Meeting Room A', applicant: 'Mark Wilson', type: 'Room', startTime: '2023-11-25 09:00', endTime: '2023-11-25 11:00', status: 'Approved' },
  { id: 'RES-102', resourceName: 'Physics Lab', applicant: 'Michael Brown', type: 'Room', startTime: '2023-11-26 14:00', endTime: '2023-11-26 16:00', status: 'Pending' },
  { id: 'RES-103', resourceName: 'School Bus B', applicant: 'Sports Dept', type: 'Vehicle', startTime: '2023-11-28 08:00', endTime: '2023-11-28 18:00', status: 'Approved' },
];

export const Campus: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'assets' | 'reservations'>('assets');

  return (
    <div className="p-8 space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">校园行政 Campus</h1>
          <p className="text-slate-500 mt-1">固定资产管理、资源预约与宿舍管理。</p>
        </div>
        <div className="flex gap-2">
            <button 
                onClick={() => setActiveTab('assets')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${activeTab === 'assets' ? 'bg-brand-600 text-white' : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'}`}
            >
                资产列表
            </button>
            <button 
                onClick={() => setActiveTab('reservations')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${activeTab === 'reservations' ? 'bg-brand-600 text-white' : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'}`}
            >
                资源预约
            </button>
        </div>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex items-center gap-4">
            <div className="p-4 bg-blue-100 text-blue-600 rounded-full">
                <Box size={24} />
            </div>
            <div>
                <p className="text-sm font-medium text-slate-500">固定资产总值</p>
                <h3 className="text-2xl font-bold text-slate-900">¥12.5M</h3>
            </div>
        </div>
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex items-center gap-4">
             <div className="p-4 bg-purple-100 text-purple-600 rounded-full">
                <Calendar size={24} />
            </div>
            <div>
                <p className="text-sm font-medium text-slate-500">今日预约</p>
                <h3 className="text-2xl font-bold text-slate-900">28</h3>
            </div>
        </div>
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex items-center gap-4">
             <div className="p-4 bg-orange-100 text-orange-600 rounded-full">
                <Building size={24} />
            </div>
            <div>
                <p className="text-sm font-medium text-slate-500">宿舍入住率</p>
                <h3 className="text-2xl font-bold text-slate-900">96.5%</h3>
            </div>
        </div>
      </div>

      {/* Content Area */}
      {activeTab === 'assets' ? (
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
             <div className="p-4 border-b border-slate-200 flex flex-wrap gap-4 justify-between items-center bg-slate-50/50">
                <div className="relative flex-1 max-w-sm">
                    <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input type="text" placeholder="搜索资产名称或编号..." className="w-full pl-9 pr-4 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-brand-500"/>
                </div>
                <button className="flex items-center px-3 py-2 border border-slate-200 rounded-lg bg-white text-sm text-slate-600 hover:bg-slate-50">
                    <Filter size={16} className="mr-2" /> 筛选状态
                </button>
            </div>
            <table className="w-full text-left">
                <thead className="bg-slate-50 text-slate-500 text-xs uppercase font-semibold">
                    <tr>
                        <th className="px-6 py-4">资产名称 / 编号</th>
                        <th className="px-6 py-4">分类</th>
                        <th className="px-6 py-4">存放位置</th>
                        <th className="px-6 py-4">购入日期</th>
                        <th className="px-6 py-4">原值</th>
                        <th className="px-6 py-4">状态</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                    {MOCK_ASSETS.map(asset => (
                        <tr key={asset.id} className="hover:bg-slate-50">
                            <td className="px-6 py-4">
                                <div className="font-medium text-slate-900">{asset.name}</div>
                                <div className="text-xs text-slate-500">{asset.id}</div>
                            </td>
                            <td className="px-6 py-4 text-sm text-slate-600">{asset.category}</td>
                            <td className="px-6 py-4 text-sm text-slate-600">
                                <div className="flex items-center gap-1.5">
                                    <MapPin size={14} className="text-slate-400"/>
                                    {asset.location}
                                </div>
                            </td>
                            <td className="px-6 py-4 text-sm text-slate-600">{asset.purchaseDate}</td>
                            <td className="px-6 py-4 text-sm text-slate-900 font-medium">¥{asset.value.toLocaleString()}</td>
                            <td className="px-6 py-4">
                                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                    asset.status === 'In Use' ? 'bg-emerald-100 text-emerald-800' :
                                    asset.status === 'Maintenance' ? 'bg-red-100 text-red-800' :
                                    'bg-slate-100 text-slate-800'
                                }`}>
                                    {asset.status === 'In Use' ? '使用中' : asset.status === 'Maintenance' ? '维修中' : '闲置'}
                                </span>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="p-4 border-b border-slate-200 bg-slate-50/50">
                <h3 className="font-bold text-slate-800">当前预约申请</h3>
            </div>
            <div className="divide-y divide-slate-100">
                {MOCK_RESERVATIONS.map(res => (
                    <div key={res.id} className="p-6 flex flex-col md:flex-row md:items-center justify-between hover:bg-slate-50 transition-colors">
                        <div className="flex items-start gap-4 mb-4 md:mb-0">
                            <div className="w-10 h-10 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-600">
                                <Calendar size={20} />
                            </div>
                            <div>
                                <h4 className="text-sm font-bold text-slate-900">{res.resourceName}</h4>
                                <p className="text-xs text-slate-500 mt-0.5">申请人: {res.applicant} • 类型: {res.type}</p>
                                <div className="flex items-center gap-3 mt-2 text-xs text-slate-600">
                                    <span className="flex items-center gap-1"><Clock size={12}/> {res.startTime}</span>
                                    <span>→</span>
                                    <span className="flex items-center gap-1"><Clock size={12}/> {res.endTime}</span>
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center gap-4">
                             <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                                res.status === 'Approved' ? 'bg-emerald-100 text-emerald-700' : 
                                res.status === 'Pending' ? 'bg-amber-100 text-amber-700' : 'bg-red-100 text-red-700'
                            }`}>
                                {res.status === 'Approved' ? '已通过' : res.status === 'Pending' ? '待审批' : '已拒绝'}
                            </span>
                            {res.status === 'Pending' && (
                                <div className="flex gap-2">
                                    <button className="px-3 py-1 bg-emerald-600 text-white text-xs rounded hover:bg-emerald-700 transition-colors">批准</button>
                                    <button className="px-3 py-1 bg-red-50 text-red-600 border border-red-200 text-xs rounded hover:bg-red-100 transition-colors">拒绝</button>
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
      )}
    </div>
  );
};