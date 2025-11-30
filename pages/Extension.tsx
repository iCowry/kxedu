import React from 'react';
import { Trophy, Users, Award as AwardIcon, Star, GraduationCap, MapPin } from 'lucide-react';
import { Alumni, Award } from '../types';

const MOCK_ALUMNI: Alumni[] = [
  { id: 'AL-2018001', name: 'James Liu', graduationYear: 2018, degree: 'Computer Science', currentCompany: 'Google', email: 'james.liu@example.com' },
  { id: 'AL-2019045', name: 'Sophia Chen', graduationYear: 2019, degree: 'Finance', currentCompany: 'Goldman Sachs', email: 'sophia.c@example.com' },
  { id: 'AL-2015088', name: 'Robert Wang', graduationYear: 2015, degree: 'Medicine', currentCompany: 'Peking Union Medical College Hospital', email: 'dr.wang@example.com' },
];

const MOCK_AWARDS: Award[] = [
  { id: 'AWD-001', studentName: 'Team Alpha', competition: 'National Robotics Competition', rank: 'First Prize', date: '2023-10-15', advisor: 'Mr. Zhang' },
  { id: 'AWD-002', studentName: 'Emily Zhao', competition: 'High School Math Olympiad', rank: 'Gold Medal', date: '2023-09-20', advisor: 'Dr. Chen' },
  { id: 'AWD-003', studentName: 'Creative Writing Club', competition: 'National Youth Literature Contest', rank: 'Best Organization', date: '2023-11-05', advisor: 'Ms. Li' },
];

export const Extension: React.FC = () => {
  return (
    <div className="p-8 space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">拓展模块 Extension</h1>
          <p className="text-slate-500 mt-1">校友网络、竞赛荣誉与课外活动管理。</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Alumni Section */}
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                    <GraduationCap className="text-brand-600" size={24}/>
                    杰出校友
                </h2>
                <button className="text-sm text-brand-600 font-medium hover:text-brand-700">查看全部</button>
            </div>
            <div className="grid gap-4">
                {MOCK_ALUMNI.map(alum => (
                    <div key={alum.id} className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex items-start gap-4 hover:shadow-md transition-shadow">
                        <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center text-slate-500 font-bold text-lg">
                            {alum.name.charAt(0)}
                        </div>
                        <div className="flex-1">
                            <h3 className="font-bold text-slate-900">{alum.name}</h3>
                            <p className="text-sm text-slate-500">{alum.degree} · Class of {alum.graduationYear}</p>
                            <div className="flex items-center gap-2 mt-2 text-xs text-slate-600">
                                <MapPin size={12} className="text-slate-400"/>
                                <span>{alum.currentCompany || 'N/A'}</span>
                            </div>
                        </div>
                        <button className="text-slate-400 hover:text-brand-600">
                            <Users size={18}/>
                        </button>
                    </div>
                ))}
            </div>
        </div>

        {/* Competitions & Awards */}
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                    <Trophy className="text-amber-500" size={24}/>
                    竞赛荣誉榜
                </h2>
                <button className="text-sm text-brand-600 font-medium hover:text-brand-700">录入奖项</button>
            </div>
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="divide-y divide-slate-100">
                    {MOCK_AWARDS.map(award => (
                        <div key={award.id} className="p-5 flex items-center gap-4 hover:bg-slate-50 transition-colors">
                            <div className="w-10 h-10 bg-amber-50 text-amber-600 rounded-lg flex items-center justify-center flex-shrink-0">
                                <AwardIcon size={20} />
                            </div>
                            <div className="flex-1">
                                <h4 className="font-bold text-slate-900 text-sm">{award.competition}</h4>
                                <p className="text-xs text-brand-600 font-semibold mt-0.5">{award.rank}</p>
                                <p className="text-xs text-slate-500 mt-1">获奖者: {award.studentName} | 指导: {award.advisor}</p>
                            </div>
                            <div className="text-right">
                                <span className="text-xs text-slate-400">{award.date}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            
            {/* Quick Activity Stat */}
            <div className="bg-gradient-to-r from-pink-500 to-rose-500 rounded-xl p-5 text-white shadow-lg flex items-center justify-between">
                <div>
                    <p className="font-medium opacity-90">本学期竞赛参与人次</p>
                    <h3 className="text-3xl font-bold mt-1">452</h3>
                </div>
                <div className="bg-white/20 p-3 rounded-lg">
                    <Star size={24} className="text-white" />
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};