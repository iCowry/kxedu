import React from 'react';
import { DollarSign, Download, PieChart, CreditCard, AlertCircle, CheckCircle } from 'lucide-react';
import { Transaction } from '../types';

const MOCK_TRANSACTIONS: Transaction[] = [
  { id: 'TRX-9001', studentName: '张小明', type: 'Tuition', amount: 15000, date: '2023-11-20', status: 'Paid' },
  { id: 'TRX-9002', studentName: '李华', type: 'Dormitory', amount: 2000, date: '2023-11-21', status: 'Pending' },
  { id: 'TRX-9003', studentName: '王伟', type: 'Activity', amount: 500, date: '2023-11-19', status: 'Paid' },
  { id: 'TRX-9004', studentName: '赵丽', type: 'Tuition', amount: 15000, date: '2023-10-15', status: 'Overdue' },
  { id: 'TRX-9005', studentName: '孙强', type: 'Material', amount: 800, date: '2023-11-22', status: 'Paid' },
];

export const Finance: React.FC = () => {
  return (
    <div className="p-8 space-y-6">
       <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">财务管理 Finance</h1>
          <p className="text-slate-500 mt-1">收费方案、账单管理与财务报表。</p>
        </div>
        <div className="flex gap-2">
            <button className="px-4 py-2 border border-slate-200 bg-white text-slate-700 rounded-lg hover:bg-slate-50 flex items-center">
                <Download size={18} className="mr-2"/> 导出报表
            </button>
            <button className="px-4 py-2 bg-brand-600 text-white rounded-lg hover:bg-brand-700 flex items-center">
                <CreditCard size={18} className="mr-2"/> 发布账单
            </button>
        </div>
      </div>

       {/* Summary Cards */}
       <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
            <div>
                <p className="text-sm font-medium text-slate-500">本月实收 (CNY)</p>
                <h3 className="text-3xl font-bold text-slate-900 mt-2">¥2,450,000</h3>
                <p className="text-xs text-emerald-600 mt-1 font-medium">+15.2% vs 上月</p>
            </div>
            <div className="p-4 bg-emerald-100 text-emerald-600 rounded-full">
                <DollarSign size={24} />
            </div>
        </div>
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
            <div>
                <p className="text-sm font-medium text-slate-500">待缴费用 (CNY)</p>
                <h3 className="text-3xl font-bold text-slate-900 mt-2">¥324,500</h3>
                <p className="text-xs text-amber-600 mt-1 font-medium">85 笔待处理</p>
            </div>
            <div className="p-4 bg-amber-100 text-amber-600 rounded-full">
                <AlertCircle size={24} />
            </div>
        </div>
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
            <div>
                <p className="text-sm font-medium text-slate-500">支出预算 (CNY)</p>
                <h3 className="text-3xl font-bold text-slate-900 mt-2">¥850,000</h3>
                <p className="text-xs text-slate-400 mt-1">剩余额度: 45%</p>
            </div>
            <div className="p-4 bg-purple-100 text-purple-600 rounded-full">
                <PieChart size={24} />
            </div>
        </div>
      </div>

      {/* Transaction List */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-200">
            <h3 className="font-bold text-slate-800">近期交易记录</h3>
        </div>
        <table className="w-full text-left">
            <thead className="bg-slate-50 text-slate-500 text-xs uppercase font-semibold">
                <tr>
                    <th className="px-6 py-4">流水号 / 学生</th>
                    <th className="px-6 py-4">费用类型</th>
                    <th className="px-6 py-4">金额</th>
                    <th className="px-6 py-4">日期</th>
                    <th className="px-6 py-4">状态</th>
                    <th className="px-6 py-4 text-right">操作</th>
                </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
                {MOCK_TRANSACTIONS.map(trx => (
                    <tr key={trx.id} className="hover:bg-slate-50">
                        <td className="px-6 py-4">
                            <div className="font-medium text-slate-900">{trx.studentName}</div>
                            <div className="text-xs text-slate-500 font-mono">{trx.id}</div>
                        </td>
                        <td className="px-6 py-4">
                            <span className="inline-block px-2 py-1 rounded-md bg-slate-100 text-slate-600 text-xs font-medium">
                                {trx.type}
                            </span>
                        </td>
                        <td className="px-6 py-4 font-medium text-slate-900">
                            ¥{trx.amount.toLocaleString()}
                        </td>
                        <td className="px-6 py-4 text-slate-600 text-sm">
                            {trx.date}
                        </td>
                        <td className="px-6 py-4">
                            <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${
                                trx.status === 'Paid' ? 'bg-emerald-100 text-emerald-800' :
                                trx.status === 'Pending' ? 'bg-amber-100 text-amber-800' :
                                'bg-red-100 text-red-800'
                            }`}>
                                {trx.status === 'Paid' && <CheckCircle size={12} />}
                                {trx.status === 'Pending' && <AlertCircle size={12} />}
                                {trx.status === 'Overdue' && <AlertCircle size={12} />}
                                {trx.status === 'Paid' ? '已支付' : trx.status === 'Pending' ? '待支付' : '已逾期'}
                            </span>
                        </td>
                        <td className="px-6 py-4 text-right text-sm">
                            <button className="text-brand-600 hover:text-brand-800 font-medium">查看详情</button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
      </div>
    </div>
  );
};