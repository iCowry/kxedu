import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Legend, Tooltip } from 'recharts';

const graduateData = [
  { name: '985/211 高校', value: 35, color: '#3b82f6' }, // Blue
  { name: '普通本科', value: 45, color: '#10b981' }, // Emerald
  { name: '海外留学', value: 15, color: '#f59e0b' }, // Amber
  { name: '其他', value: 5, color: '#94a3b8' }, // Slate
];

const subjectRadarData = [
  { subject: '语文', A: 120, B: 110, fullMark: 150 },
  { subject: '数学', A: 98, B: 130, fullMark: 150 },
  { subject: '英语', A: 86, B: 130, fullMark: 150 },
  { subject: '物理', A: 99, B: 100, fullMark: 100 },
  { subject: '化学', A: 85, B: 90, fullMark: 100 },
  { subject: '生物', A: 65, B: 85, fullMark: 100 },
];

export const Analytics: React.FC = () => {
  return (
    <div className="p-8 space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">升学分析 Analytics</h1>
        <p className="text-slate-500 mt-1">深度洞察教学质量与升学成果。</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Graduate Distribution */}
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
            <h3 className="text-lg font-bold text-slate-900 mb-6">2024届毕业生去向分布</h3>
            <div className="h-80 relative">
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <Pie
                            data={graduateData}
                            cx="50%"
                            cy="50%"
                            innerRadius={80}
                            outerRadius={120}
                            paddingAngle={5}
                            dataKey="value"
                        >
                            {graduateData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                        </Pie>
                        <Tooltip />
                        <Legend verticalAlign="bottom" height={36}/>
                    </PieChart>
                </ResponsiveContainer>
                {/* Center Label */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center pointer-events-none pb-8">
                    <span className="text-3xl font-bold text-slate-900">482</span>
                    <p className="text-xs text-slate-500">毕业生总数</p>
                </div>
            </div>
        </div>

        {/* Subject Performance Radar */}
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
            <h3 className="text-lg font-bold text-slate-900 mb-6">年级学科能力模型对比</h3>
             <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                    <RadarChart cx="50%" cy="50%" outerRadius="80%" data={subjectRadarData}>
                        <PolarGrid />
                        <PolarAngleAxis dataKey="subject" tick={{ fill: '#64748b', fontSize: 12 }} />
                        <PolarRadiusAxis angle={30} domain={[0, 150]} tick={false} />
                        <Radar name="重点班平均" dataKey="B" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.3} />
                        <Radar name="年级平均" dataKey="A" stroke="#f59e0b" fill="#f59e0b" fillOpacity={0.3} />
                        <Legend />
                        <Tooltip />
                    </RadarChart>
                </ResponsiveContainer>
            </div>
        </div>
      </div>
    </div>
  );
};
