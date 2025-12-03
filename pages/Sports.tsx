
import React, { useState } from 'react';
import { Activity, Trophy, Users, Calendar, MapPin, Clock, Plus, Filter, Target, Award, Search, MoreHorizontal, ChevronLeft, TrendingUp, User, Settings, ClipboardList, CheckCircle, XCircle, Edit2, Save, X, FileText, Timer } from 'lucide-react';
import { SportLeague, SportTeam, SportMatch, LeagueRegistration, MatchEvent, PlayerGameStats } from '../types';

// --- MOCK DATA (Localized) ---
const MOCK_LEAGUES: SportLeague[] = [
  { id: 'L1', name: '高中篮球联赛 (HBL)', sport: 'Basketball', season: '2024-2025', status: 'Ongoing', startDate: '2024-10-01', endDate: '2025-05-20' },
  { id: 'L2', name: '校园足球杯', sport: 'Football', season: '2024 秋季赛', status: 'Completed', startDate: '2024-09-15', endDate: '2024-11-30' },
  { id: 'L3', name: '市级游泳锦标赛', sport: 'Swimming', season: '2025', status: 'Upcoming', startDate: '2025-06-10', endDate: '2025-06-12' },
  { id: 'L4', name: '校际羽毛球公开赛', sport: 'Badminton', season: '2025 春季赛', status: 'Upcoming', startDate: '2025-03-15', endDate: '2025-04-15' },
];

const MOCK_TEAMS: SportTeam[] = [
  { id: 'T1', name: '雄狮队 (男篮)', sport: 'Basketball', coach: '张教练', membersCount: 15, wins: 8, losses: 2, rank: 1 },
  { id: 'T2', name: '雄狮队 (女篮)', sport: 'Basketball', coach: '刘老师', membersCount: 12, wins: 5, losses: 4, rank: 3 },
  { id: 'T3', name: '金鹰足球队', sport: 'Football', coach: '王教练', membersCount: 22, wins: 10, losses: 1, draws: 1, rank: 1 },
  { id: 'T4', name: '飞鱼游泳队', sport: 'Swimming', coach: '李教练', membersCount: 18, wins: 0, losses: 0, rank: 0 },
];

const MOCK_REGISTRATIONS: LeagueRegistration[] = [
    { id: 'R1', leagueId: 'L1', teamName: '火箭队 (5班)', coach: '吴老师', contact: '13800001234', status: 'Pending', submitDate: '2024-11-20' },
    { id: 'R2', leagueId: 'L1', teamName: '雷霆队 (2班)', coach: '赵老师', contact: '13900005678', status: 'Approved', submitDate: '2024-11-18' },
    { id: 'R3', leagueId: 'L1', teamName: '野猫队 (8班)', coach: '刘老师', contact: '13700009876', status: 'Rejected', submitDate: '2024-11-15' },
];

const MOCK_MATCHES: SportMatch[] = [
  { id: 'M1', leagueId: 'L1', homeTeam: '雄狮队', awayTeam: '猛虎队 (四中)', date: '2024-11-20', time: '16:00', location: '本校体育馆', scoreHome: 78, scoreAway: 72, status: 'Finished' },
  { id: 'M2', leagueId: 'L1', homeTeam: '蓝鲨队 (实验中学)', awayTeam: '雄狮队', date: '2024-11-27', time: '16:30', location: '客场体育馆', status: 'Scheduled' },
  { id: 'M3', leagueId: 'L2', homeTeam: '金鹰队', awayTeam: '铁狼队', date: '2024-11-30', time: '14:00', location: '中心体育场', scoreHome: 3, scoreAway: 1, status: 'Finished' },
  { id: 'M4', leagueId: 'L4', homeTeam: '羽毛球A队', awayTeam: '市一中B队', date: '2025-03-16', time: '09:00', location: '奥体中心', status: 'Scheduled' },
];

// Mock Data for Match Detail
const MOCK_MATCH_EVENTS: MatchEvent[] = [
    { id: 'E1', time: 'Q1 08:20', type: 'Point', description: '中投得分 (2分)', team: 'Home', player: '张小明' },
    { id: 'E2', time: 'Q1 05:45', type: 'Point', description: '三分命中', team: 'Away', player: 'Mike Johnson' },
    { id: 'E3', time: 'Q2 02:10', type: 'Foul', description: '防守犯规', team: 'Home', player: '李伟' },
    { id: 'E4', time: 'Q3 09:30', type: 'Point', description: '上篮得分 (2分)', team: 'Home', player: '张小明' },
    { id: 'E5', time: 'Q4 01:05', type: 'Timeout', description: '战术暂停', team: 'Away' },
];

const MOCK_PLAYER_STATS: PlayerGameStats[] = [
    { id: 'P1', name: '张小明', number: 23, team: 'Home', stats: { Pts: 28, Reb: 5, Ast: 7, Stl: 2 } },
    { id: 'P2', name: '李伟', number: 11, team: 'Home', stats: { Pts: 15, Reb: 10, Ast: 2, Stl: 0 } },
    { id: 'P3', name: '王强', number: 5, team: 'Home', stats: { Pts: 8, Reb: 3, Ast: 8, Stl: 3 } },
    { id: 'P4', name: 'Mike Johnson', number: 1, team: 'Away', stats: { Pts: 32, Reb: 4, Ast: 5, Stl: 1 } },
    { id: 'P5', name: '陈浩', number: 34, team: 'Away', stats: { Pts: 12, Reb: 12, Ast: 1, Stl: 0 } },
];

// Mock Standings Data for Detail View
const MOCK_STANDINGS = [
    { rank: 1, team: '雄狮队', played: 10, won: 8, drawn: 0, lost: 2, points: 16, form: ['W', 'W', 'L', 'W', 'W'] },
    { rank: 2, team: '蓝鲨队', played: 10, won: 7, drawn: 0, lost: 3, points: 14, form: ['W', 'L', 'W', 'W', 'L'] },
    { rank: 3, team: '猛虎队', played: 10, won: 6, drawn: 0, lost: 4, points: 12, form: ['L', 'W', 'L', 'W', 'L'] },
    { rank: 4, team: '铁狼队', played: 10, won: 4, drawn: 0, lost: 6, points: 8, form: ['L', 'L', 'W', 'L', 'W'] },
];

const MOCK_TOP_PLAYERS = [
    { rank: 1, name: '张小明', team: '雄狮队', metric: '得分', value: 185 },
    { rank: 2, name: 'Mike Johnson', team: '蓝鲨队', metric: '得分', value: 172 },
    { rank: 3, name: '李伟', team: '雄狮队', metric: '得分', value: 160 },
];

export const Sports: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'leagues' | 'teams' | 'matches'>('overview');
  const [selectedLeague, setSelectedLeague] = useState<SportLeague | null>(null);
  const [selectedMatch, setSelectedMatch] = useState<SportMatch | null>(null); 
  const [leagueDetailTab, setLeagueDetailTab] = useState<'standings' | 'fixtures' | 'stats' | 'management'>('standings');
  const [matchDetailTab, setMatchDetailTab] = useState<'summary' | 'stats' | 'lineups'>('summary');

  // State for data management
  const [matches, setMatches] = useState<SportMatch[]>(MOCK_MATCHES);
  const [registrations, setRegistrations] = useState<LeagueRegistration[]>(MOCK_REGISTRATIONS);
  const [teams, setTeams] = useState<SportTeam[]>(MOCK_TEAMS);
  
  // Modal States
  const [isAddMatchModalOpen, setIsAddMatchModalOpen] = useState(false);
  const [isEditMatchModalOpen, setIsEditMatchModalOpen] = useState(false);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const [isCreateTeamModalOpen, setIsCreateTeamModalOpen] = useState(false);
  const [registeringLeague, setRegisteringLeague] = useState<SportLeague | null>(null);
  
  // Forms
  const [newMatch, setNewMatch] = useState<Partial<SportMatch>>({ homeTeam: '', awayTeam: '', date: '', time: '', location: '本校体育馆' });
  const [editingMatch, setEditingMatch] = useState<SportMatch | null>(null);
  const [registrationForm, setRegistrationForm] = useState({ teamName: '', coach: '', contact: '' });
  const [newTeamForm, setNewTeamForm] = useState({ name: '', sport: 'Basketball', coach: '', membersCount: 0 });

  // Helpers
  const getSportIcon = (sport: string) => {
      switch(sport) {
          case 'Basketball': return '🏀';
          case 'Football': return '⚽';
          case 'Volleyball': return '🏐';
          case 'Swimming': return '🏊';
          case 'Badminton': return '🏸';
          case 'Tennis': return '🎾';
          default: return '🏅';
      }
  };

  const getStatusColor = (status: string) => {
      switch(status) {
          case 'Ongoing': return 'text-emerald-600 bg-emerald-50 border-emerald-100';
          case 'Upcoming': return 'text-blue-600 bg-blue-50 border-blue-100';
          case 'Completed': return 'text-slate-500 bg-slate-100 border-slate-200';
          case 'Live': return 'text-red-600 bg-red-50 border-red-100 animate-pulse';
          default: return 'text-slate-600 bg-slate-50';
      }
  };

  const getStatusLabel = (status: string) => {
      switch(status) {
          case 'Ongoing': return '进行中';
          case 'Upcoming': return '即将开始';
          case 'Completed': return '已结束';
          case 'Live': return '直播中';
          default: return status;
      }
  };

  // --- Handlers ---
  
  const handleApproveRegistration = (id: string, approved: boolean) => {
      setRegistrations(prev => prev.map(reg => 
          reg.id === id ? { ...reg, status: approved ? 'Approved' : 'Rejected' } : reg
      ));
  };

  const handleAddMatch = (e: React.FormEvent) => {
      e.preventDefault();
      if (!selectedLeague) return;
      const match: SportMatch = {
          id: `M-${Date.now()}`,
          leagueId: selectedLeague.id,
          homeTeam: newMatch.homeTeam || '主队',
          awayTeam: newMatch.awayTeam || '客队',
          date: newMatch.date || '',
          time: newMatch.time || '',
          location: newMatch.location || '待定',
          status: 'Scheduled'
      };
      setMatches([...matches, match]);
      setIsAddMatchModalOpen(false);
      setNewMatch({ homeTeam: '', awayTeam: '', date: '', time: '', location: '本校体育馆' });
  };

  const handleUpdateScore = (e: React.FormEvent) => {
      e.preventDefault();
      if (!editingMatch) return;
      setMatches(prev => prev.map(m => m.id === editingMatch.id ? editingMatch : m));
      setIsEditMatchModalOpen(false);
      setEditingMatch(null);
  };

  const openRegisterModal = (league: SportLeague) => {
      setRegisteringLeague(league);
      setIsRegisterModalOpen(true);
  };

  const handleRegisterLeague = (e: React.FormEvent) => {
      e.preventDefault();
      const target = registeringLeague || selectedLeague;
      if (!target) return;
      
      const reg: LeagueRegistration = {
          id: `R-${Date.now()}`,
          leagueId: target.id,
          teamName: registrationForm.teamName,
          coach: registrationForm.coach,
          contact: registrationForm.contact,
          status: 'Pending',
          submitDate: new Date().toISOString().split('T')[0]
      };
      setRegistrations([...registrations, reg]);
      setIsRegisterModalOpen(false);
      setRegistrationForm({ teamName: '', coach: '', contact: '' });
      setRegisteringLeague(null);
      alert('报名申请已提交，请等待管理员审核！');
  };

  const handleCreateTeam = (e: React.FormEvent) => {
      e.preventDefault();
      const team: SportTeam = {
          id: `T-${Date.now()}`,
          name: newTeamForm.name,
          sport: newTeamForm.sport,
          coach: newTeamForm.coach,
          membersCount: newTeamForm.membersCount,
          wins: 0,
          losses: 0
      };
      setTeams([...teams, team]);
      setIsCreateTeamModalOpen(false);
      setNewTeamForm({ name: '', sport: 'Basketball', coach: '', membersCount: 0 });
  };

  // --- MATCH DETAIL VIEW RENDERER ---
  if (selectedMatch) {
      return (
          <div className="p-8 space-y-6 flex flex-col h-[calc(100vh-64px)]">
              <button 
                onClick={() => setSelectedMatch(null)}
                className="flex items-center gap-2 text-slate-500 hover:text-brand-600 transition-colors font-medium w-fit"
              >
                  <ChevronLeft size={20}/> 返回
              </button>

              {/* Match Header Scoreboard */}
              <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-xl shadow-lg p-8 text-white relative overflow-hidden flex-shrink-0">
                  <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
                  <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
                      {/* Home Team */}
                      <div className="flex flex-col items-center flex-1">
                          <div className="w-20 h-20 bg-white/10 rounded-full flex items-center justify-center text-3xl font-bold mb-3 border-2 border-white/20">
                              H
                          </div>
                          <h2 className="text-2xl font-bold text-center">{selectedMatch.homeTeam}</h2>
                          <p className="text-slate-400 text-sm">主队</p>
                      </div>

                      {/* Score */}
                      <div className="flex flex-col items-center">
                          <div className="text-sm font-bold bg-white/20 px-3 py-1 rounded mb-4 backdrop-blur-sm">
                              {selectedMatch.status === 'Finished' ? '终场比分' : getStatusLabel(selectedMatch.status)}
                          </div>
                          <div className="text-6xl font-black tracking-widest flex items-center gap-4">
                              <span>{selectedMatch.scoreHome || 0}</span>
                              <span className="text-slate-500">:</span>
                              <span>{selectedMatch.scoreAway || 0}</span>
                          </div>
                          <div className="flex items-center gap-4 mt-4 text-slate-400 text-sm">
                              <span className="flex items-center gap-1"><Calendar size={14}/> {selectedMatch.date}</span>
                              <span className="flex items-center gap-1"><MapPin size={14}/> {selectedMatch.location}</span>
                          </div>
                      </div>

                      {/* Away Team */}
                      <div className="flex flex-col items-center flex-1">
                          <div className="w-20 h-20 bg-white/10 rounded-full flex items-center justify-center text-3xl font-bold mb-3 border-2 border-white/20">
                              A
                          </div>
                          <h2 className="text-2xl font-bold text-center">{selectedMatch.awayTeam}</h2>
                          <p className="text-slate-400 text-sm">客队</p>
                      </div>
                  </div>
              </div>

              {/* Detail Tabs */}
              <div className="flex border-b border-slate-200 flex-shrink-0">
                  <button 
                    onClick={() => setMatchDetailTab('summary')}
                    className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors ${matchDetailTab === 'summary' ? 'border-brand-600 text-brand-600' : 'border-transparent text-slate-500 hover:text-slate-700'}`}
                  >
                      比赛概况
                  </button>
                  <button 
                    onClick={() => setMatchDetailTab('stats')}
                    className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors ${matchDetailTab === 'stats' ? 'border-brand-600 text-brand-600' : 'border-transparent text-slate-500 hover:text-slate-700'}`}
                  >
                      球员数据
                  </button>
              </div>

              {/* Detail Content */}
              <div className="flex-1 overflow-y-auto min-h-0">
                  {matchDetailTab === 'summary' && (
                      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
                          <h3 className="font-bold text-slate-800 mb-6 flex items-center gap-2">
                              <Timer size={20} className="text-slate-500"/> 比赛时间轴
                          </h3>
                          <div className="space-y-6 relative before:absolute before:left-1/2 before:top-0 before:bottom-0 before:w-px before:bg-slate-200 before:-translate-x-1/2">
                              {MOCK_MATCH_EVENTS.map((event, idx) => (
                                  <div key={idx} className={`flex items-center gap-4 ${event.team === 'Home' ? 'justify-end md:pr-[50%]' : 'justify-start md:pl-[50%] flex-row-reverse md:flex-row'}`}>
                                      <div className={`w-1/2 flex items-center gap-4 ${event.team === 'Home' ? 'justify-end' : 'justify-start'}`}>
                                          <div className={`flex flex-col ${event.team === 'Home' ? 'items-end text-right' : 'items-start text-left'}`}>
                                              <span className="font-bold text-slate-900">{event.type}</span>
                                              <span className="text-sm text-slate-600">{event.description}</span>
                                              {event.player && <span className="text-xs text-brand-600 font-medium">{event.player}</span>}
                                          </div>
                                          <div className={`w-12 h-12 rounded-full border-4 border-white shadow-sm flex items-center justify-center font-bold text-xs shrink-0 z-10 ${
                                              event.team === 'Home' ? 'bg-blue-100 text-blue-700' : 'bg-red-100 text-red-700'
                                          }`}>
                                              {event.time}
                                          </div>
                                      </div>
                                  </div>
                              ))}
                          </div>
                      </div>
                  )}

                  {matchDetailTab === 'stats' && (
                      <div className="space-y-6">
                          {/* Home Stats */}
                          <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                              <div className="p-4 border-b border-slate-200 bg-slate-50/50">
                                  <h3 className="font-bold text-slate-800">{selectedMatch.homeTeam} - 球员数据</h3>
                              </div>
                              <table className="w-full text-left text-sm">
                                  <thead className="bg-slate-50 text-slate-500">
                                      <tr>
                                          <th className="px-4 py-2">#</th>
                                          <th className="px-4 py-2">球员</th>
                                          <th className="px-4 py-2 text-right">得分 (Pts)</th>
                                          <th className="px-4 py-2 text-right">篮板 (Reb)</th>
                                          <th className="px-4 py-2 text-right">助攻 (Ast)</th>
                                          <th className="px-4 py-2 text-right">抢断 (Stl)</th>
                                      </tr>
                                  </thead>
                                  <tbody className="divide-y divide-slate-100">
                                      {MOCK_PLAYER_STATS.filter(p => p.team === 'Home').map(player => (
                                          <tr key={player.id}>
                                              <td className="px-4 py-3 text-slate-500 font-mono">{player.number}</td>
                                              <td className="px-4 py-3 font-medium text-slate-900">{player.name}</td>
                                              <td className="px-4 py-3 text-right font-bold">{player.stats.Pts}</td>
                                              <td className="px-4 py-3 text-right">{player.stats.Reb}</td>
                                              <td className="px-4 py-3 text-right">{player.stats.Ast}</td>
                                              <td className="px-4 py-3 text-right">{player.stats.Stl}</td>
                                          </tr>
                                      ))}
                                  </tbody>
                              </table>
                          </div>

                          {/* Away Stats */}
                          <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                              <div className="p-4 border-b border-slate-200 bg-slate-50/50">
                                  <h3 className="font-bold text-slate-800">{selectedMatch.awayTeam} - 球员数据</h3>
                              </div>
                              <table className="w-full text-left text-sm">
                                  <thead className="bg-slate-50 text-slate-500">
                                      <tr>
                                          <th className="px-4 py-2">#</th>
                                          <th className="px-4 py-2">球员</th>
                                          <th className="px-4 py-2 text-right">得分 (Pts)</th>
                                          <th className="px-4 py-2 text-right">篮板 (Reb)</th>
                                          <th className="px-4 py-2 text-right">助攻 (Ast)</th>
                                          <th className="px-4 py-2 text-right">抢断 (Stl)</th>
                                      </tr>
                                  </thead>
                                  <tbody className="divide-y divide-slate-100">
                                      {MOCK_PLAYER_STATS.filter(p => p.team === 'Away').map(player => (
                                          <tr key={player.id}>
                                              <td className="px-4 py-3 text-slate-500 font-mono">{player.number}</td>
                                              <td className="px-4 py-3 font-medium text-slate-900">{player.name}</td>
                                              <td className="px-4 py-3 text-right font-bold">{player.stats.Pts}</td>
                                              <td className="px-4 py-3 text-right">{player.stats.Reb}</td>
                                              <td className="px-4 py-3 text-right">{player.stats.Ast}</td>
                                              <td className="px-4 py-3 text-right">{player.stats.Stl}</td>
                                          </tr>
                                      ))}
                                  </tbody>
                              </table>
                          </div>
                      </div>
                  )}
              </div>
          </div>
      );
  }

  // --- LEAGUE DETAIL VIEW RENDERER ---
  if (selectedLeague) {
      return (
          <div className="p-8 space-y-6 flex flex-col h-[calc(100vh-64px)]">
              {/* Back Navigation */}
              <button 
                onClick={() => setSelectedLeague(null)}
                className="flex items-center gap-2 text-slate-500 hover:text-brand-600 transition-colors font-medium w-fit"
              >
                  <ChevronLeft size={20}/> 返回体育中心
              </button>

              {/* League Header */}
              <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-8 relative overflow-hidden flex-shrink-0">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-slate-100 rounded-full -mr-16 -mt-16 opacity-50 pointer-events-none"></div>
                  <div className="relative z-10 flex flex-col md:flex-row gap-8 items-start">
                      <div className="w-24 h-24 bg-slate-50 rounded-2xl flex items-center justify-center text-6xl shadow-sm border border-slate-100">
                          {getSportIcon(selectedLeague.sport)}
                      </div>
                      <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                              <h1 className="text-3xl font-bold text-slate-900">{selectedLeague.name}</h1>
                              <span className={`text-sm px-2.5 py-0.5 rounded-full font-bold border ${getStatusColor(selectedLeague.status)}`}>
                                  {getStatusLabel(selectedLeague.status)}
                              </span>
                          </div>
                          <p className="text-slate-500 flex items-center gap-4 text-sm font-medium">
                              <span className="flex items-center gap-1"><Trophy size={16}/> 赛季 {selectedLeague.season}</span>
                              <span className="flex items-center gap-1"><Calendar size={16}/> {selectedLeague.startDate} - {selectedLeague.endDate}</span>
                          </p>
                      </div>
                      <div className="flex gap-3">
                          <button 
                            onClick={() => setIsRegisterModalOpen(true)}
                            className="px-4 py-2 border border-brand-600 text-brand-600 bg-white rounded-lg hover:bg-brand-50 font-medium text-sm flex items-center gap-2"
                          >
                              <FileText size={16}/> 报名参赛
                          </button>
                          <button 
                            onClick={() => setLeagueDetailTab('management')}
                            className="px-4 py-2 bg-brand-600 text-white rounded-lg hover:bg-brand-700 shadow-sm font-medium text-sm"
                          >
                              赛事管理
                          </button>
                      </div>
                  </div>
              </div>

              {/* League Detail Tabs */}
              <div className="flex border-b border-slate-200 flex-shrink-0">
                  <button 
                    onClick={() => setLeagueDetailTab('standings')}
                    className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors ${leagueDetailTab === 'standings' ? 'border-brand-600 text-brand-600' : 'border-transparent text-slate-500 hover:text-slate-700'}`}
                  >
                      积分榜
                  </button>
                  <button 
                    onClick={() => setLeagueDetailTab('fixtures')}
                    className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors ${leagueDetailTab === 'fixtures' ? 'border-brand-600 text-brand-600' : 'border-transparent text-slate-500 hover:text-slate-700'}`}
                  >
                      赛程赛果
                  </button>
                  <button 
                    onClick={() => setLeagueDetailTab('stats')}
                    className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors ${leagueDetailTab === 'stats' ? 'border-brand-600 text-brand-600' : 'border-transparent text-slate-500 hover:text-slate-700'}`}
                  >
                      球员数据
                  </button>
                  <button 
                    onClick={() => setLeagueDetailTab('management')}
                    className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors ${leagueDetailTab === 'management' ? 'border-brand-600 text-brand-600' : 'border-transparent text-slate-500 hover:text-slate-700'}`}
                  >
                      管理后台
                  </button>
              </div>

              {/* Tab Content */}
              <div className="flex-1 overflow-y-auto min-h-0 pb-8">
                  {leagueDetailTab === 'standings' && (
                      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                          <table className="w-full text-left text-sm">
                              <thead className="bg-slate-50 text-slate-500 font-semibold border-b border-slate-200">
                                  <tr>
                                      <th className="px-6 py-4 w-20 text-center">排名</th>
                                      <th className="px-6 py-4">队伍</th>
                                      <th className="px-6 py-4 text-center">场次</th>
                                      <th className="px-6 py-4 text-center">胜</th>
                                      <th className="px-6 py-4 text-center">平</th>
                                      <th className="px-6 py-4 text-center">负</th>
                                      <th className="px-6 py-4 text-center">积分</th>
                                      <th className="px-6 py-4 text-right">近期战绩</th>
                                  </tr>
                              </thead>
                              <tbody className="divide-y divide-slate-100">
                                  {MOCK_STANDINGS.map((row) => (
                                      <tr key={row.rank} className="hover:bg-slate-50">
                                          <td className="px-6 py-4 text-center">
                                              <span className={`inline-flex items-center justify-center w-6 h-6 rounded-full text-xs font-bold ${row.rank === 1 ? 'bg-amber-100 text-amber-700' : 'bg-slate-100 text-slate-600'}`}>
                                                  {row.rank}
                                              </span>
                                          </td>
                                          <td className="px-6 py-4 font-bold text-slate-900">{row.team}</td>
                                          <td className="px-6 py-4 text-center text-slate-600">{row.played}</td>
                                          <td className="px-6 py-4 text-center text-slate-600">{row.won}</td>
                                          <td className="px-6 py-4 text-center text-slate-600">{row.drawn}</td>
                                          <td className="px-6 py-4 text-center text-slate-600">{row.lost}</td>
                                          <td className="px-6 py-4 text-center font-bold text-brand-600">{row.points}</td>
                                          <td className="px-6 py-4 text-right">
                                              <div className="flex items-center justify-end gap-1">
                                                  {row.form.map((f, i) => (
                                                      <span key={i} className={`w-5 h-5 flex items-center justify-center rounded text-[10px] font-bold text-white ${
                                                          f === 'W' ? 'bg-emerald-500' : f === 'D' ? 'bg-slate-400' : 'bg-red-500'
                                                      }`}>
                                                          {f}
                                                      </span>
                                                  ))}
                                              </div>
                                          </td>
                                      </tr>
                                  ))}
                              </tbody>
                          </table>
                      </div>
                  )}

                  {leagueDetailTab === 'fixtures' && (
                      <div className="space-y-4">
                          <div className="flex justify-between items-center mb-2">
                              <h3 className="font-bold text-slate-800">比赛日程</h3>
                              <button 
                                onClick={() => setIsAddMatchModalOpen(true)}
                                className="flex items-center text-sm bg-brand-600 text-white px-3 py-1.5 rounded-lg hover:bg-brand-700 transition-colors shadow-sm"
                              >
                                  <Plus size={16} className="mr-1"/> 添加比赛
                              </button>
                          </div>
                          {matches.filter(m => m.leagueId === selectedLeague.id).map(match => (
                              <div key={match.id} className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between hover:shadow-md transition-shadow cursor-pointer" onClick={() => setSelectedMatch(match)}>
                                  <div className="flex-1 text-right">
                                      <h4 className="font-bold text-slate-900 text-lg">{match.homeTeam}</h4>
                                  </div>
                                  <div className="px-8 flex flex-col items-center relative group">
                                      {match.status === 'Finished' ? (
                                          <div className="text-2xl font-black text-slate-900 bg-slate-100 px-4 py-1 rounded-lg hover:bg-slate-200" onClick={(e) => { e.stopPropagation(); setEditingMatch(match); setIsEditMatchModalOpen(true); }}>
                                              {match.scoreHome} - {match.scoreAway}
                                          </div>
                                      ) : (
                                          <div className="text-xl font-bold text-slate-500 bg-slate-50 px-4 py-1 rounded-lg border border-slate-100 hover:border-brand-300 hover:text-brand-600 transition-all" onClick={(e) => { e.stopPropagation(); setEditingMatch(match); setIsEditMatchModalOpen(true); }}>
                                              {match.time}
                                          </div>
                                      )}
                                      <span className="text-xs text-slate-400 mt-2">{match.date} • {match.location}</span>
                                      
                                      {/* Edit Hint */}
                                      <div className="absolute -top-6 opacity-0 group-hover:opacity-100 transition-opacity text-xs bg-slate-800 text-white px-2 py-1 rounded">
                                          点击修改
                                      </div>
                                  </div>
                                  <div className="flex-1 text-left">
                                      <h4 className="font-bold text-slate-900 text-lg">{match.awayTeam}</h4>
                                  </div>
                              </div>
                          ))}
                          {matches.filter(m => m.leagueId === selectedLeague.id).length === 0 && (
                              <div className="text-center py-12 text-slate-400">暂无比赛安排</div>
                          )}
                      </div>
                  )}

                  {leagueDetailTab === 'stats' && (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
                              <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
                                  <TrendingUp size={20} className="text-brand-600"/> 射手榜 / 得分榜
                              </h3>
                              <div className="space-y-4">
                                  {MOCK_TOP_PLAYERS.map((player) => (
                                      <div key={player.rank} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                                          <div className="flex items-center gap-4">
                                              <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-white ${
                                                  player.rank === 1 ? 'bg-amber-400' : player.rank === 2 ? 'bg-slate-400' : 'bg-orange-700'
                                              }`}>
                                                  {player.rank}
                                              </div>
                                              <div>
                                                  <p className="font-bold text-slate-900 text-sm">{player.name}</p>
                                                  <p className="text-xs text-slate-500">{player.team}</p>
                                              </div>
                                          </div>
                                          <div className="text-right">
                                              <span className="block font-bold text-brand-600 text-lg">{player.value}</span>
                                              <span className="text-xs text-slate-400">{player.metric}</span>
                                          </div>
                                      </div>
                                  ))}
                              </div>
                          </div>
                          
                          <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl p-6 text-white shadow-lg flex flex-col justify-between">
                              <div>
                                  <h3 className="font-bold text-xl mb-2">联赛 MVP 预测</h3>
                                  <p className="opacity-80 text-sm">基于综合表现评分 (PER)</p>
                              </div>
                              <div className="flex items-center gap-4 mt-6">
                                  <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center text-2xl">
                                      <User size={32}/>
                                  </div>
                                  <div>
                                      <p className="font-bold text-lg">张小明</p>
                                      <p className="text-indigo-200 text-sm">雄狮队</p>
                                      <div className="mt-2 text-xs bg-white/20 px-2 py-1 rounded inline-block">
                                          Rating: 9.8
                                      </div>
                                  </div>
                              </div>
                          </div>
                      </div>
                  )}

                  {leagueDetailTab === 'management' && (
                      <div className="space-y-6">
                          {/* League Settings */}
                          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
                              <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
                                  <Settings size={20} className="text-slate-500"/> 联赛设置
                              </h3>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                  <div>
                                      <label className="block text-sm font-medium text-slate-700 mb-1">联赛名称</label>
                                      <input type="text" defaultValue={selectedLeague.name} className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm bg-slate-50"/>
                                  </div>
                                  <div>
                                      <label className="block text-sm font-medium text-slate-700 mb-1">赛季</label>
                                      <input type="text" defaultValue={selectedLeague.season} className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm bg-slate-50"/>
                                  </div>
                                  <div>
                                      <label className="block text-sm font-medium text-slate-700 mb-1">状态</label>
                                      <select defaultValue={selectedLeague.status} className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm bg-slate-50">
                                          <option value="Upcoming">即将开始</option>
                                          <option value="Ongoing">进行中</option>
                                          <option value="Completed">已结束</option>
                                      </select>
                                  </div>
                              </div>
                              <div className="mt-4 flex justify-end">
                                  <button className="flex items-center gap-2 px-4 py-2 bg-brand-600 text-white rounded-lg hover:bg-brand-700 text-sm font-medium">
                                      <Save size={16}/> 保存更改
                                  </button>
                              </div>
                          </div>

                          {/* Registration Management */}
                          <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                              <div className="p-4 border-b border-slate-200 bg-slate-50/50 flex justify-between items-center">
                                  <h3 className="font-bold text-slate-800 flex items-center gap-2">
                                      <ClipboardList size={20} className="text-brand-600"/> 队伍报名管理
                                  </h3>
                                  <span className="text-xs bg-white border px-2 py-1 rounded text-slate-500">
                                      {registrations.filter(r => r.leagueId === selectedLeague.id).length} 条申请
                                  </span>
                              </div>
                              <table className="w-full text-left text-sm">
                                  <thead className="bg-slate-50 text-slate-500 font-semibold border-b border-slate-200">
                                      <tr>
                                          <th className="px-6 py-4">队伍名称</th>
                                          <th className="px-6 py-4">教练</th>
                                          <th className="px-6 py-4">联系方式</th>
                                          <th className="px-6 py-4">状态</th>
                                          <th className="px-6 py-4 text-right">操作</th>
                                      </tr>
                                  </thead>
                                  <tbody className="divide-y divide-slate-100">
                                      {registrations.filter(r => r.leagueId === selectedLeague.id).map(reg => (
                                          <tr key={reg.id} className="hover:bg-slate-50">
                                              <td className="px-6 py-4 font-bold text-slate-900">{reg.teamName}</td>
                                              <td className="px-6 py-4 text-slate-600">{reg.coach}</td>
                                              <td className="px-6 py-4 text-slate-600">{reg.contact}</td>
                                              <td className="px-6 py-4">
                                                  <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
                                                      reg.status === 'Approved' ? 'bg-emerald-100 text-emerald-700' :
                                                      reg.status === 'Rejected' ? 'bg-red-100 text-red-700' :
                                                      'bg-amber-100 text-amber-700'
                                                  }`}>
                                                      {reg.status === 'Approved' ? '已批准' : reg.status === 'Rejected' ? '已拒绝' : '待审核'}
                                                  </span>
                                              </td>
                                              <td className="px-6 py-4 text-right">
                                                  {reg.status === 'Pending' && (
                                                      <div className="flex items-center justify-end gap-2">
                                                          <button 
                                                            onClick={() => handleApproveRegistration(reg.id, true)}
                                                            className="p-1 text-emerald-600 hover:bg-emerald-50 rounded" title="批准"
                                                          >
                                                              <CheckCircle size={18}/>
                                                          </button>
                                                          <button 
                                                            onClick={() => handleApproveRegistration(reg.id, false)}
                                                            className="p-1 text-red-600 hover:bg-red-50 rounded" title="拒绝"
                                                          >
                                                              <XCircle size={18}/>
                                                          </button>
                                                      </div>
                                                  )}
                                              </td>
                                          </tr>
                                      ))}
                                      {registrations.filter(r => r.leagueId === selectedLeague.id).length === 0 && (
                                          <tr><td colSpan={5} className="text-center py-8 text-slate-400">暂无待审核的报名申请</td></tr>
                                      )}
                                  </tbody>
                              </table>
                          </div>
                      </div>
                  )}
              </div>

              {/* MODAL: REGISTER TEAM */}
              {isRegisterModalOpen && (registeringLeague || selectedLeague) && (
                  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4 animate-fade-in">
                      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden animate-scale-up">
                          <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-slate-50">
                              <h3 className="text-lg font-bold text-slate-900">
                                  报名参加 {registeringLeague?.name || selectedLeague?.name}
                              </h3>
                              <button onClick={() => setIsRegisterModalOpen(false)} className="text-slate-400 hover:text-slate-600 p-1 rounded-full"><X size={20}/></button>
                          </div>
                          <form onSubmit={handleRegisterLeague} className="p-6 space-y-4">
                              <div>
                                  <label className="block text-sm font-medium text-slate-700 mb-1">队伍名称</label>
                                  <input 
                                    type="text" required placeholder="例如：高一(5)班 火箭队"
                                    className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-brand-500 outline-none"
                                    value={registrationForm.teamName}
                                    onChange={e => setRegistrationForm({...registrationForm, teamName: e.target.value})}
                                  />
                              </div>
                              <div>
                                  <label className="block text-sm font-medium text-slate-700 mb-1">主教练</label>
                                  <input 
                                    type="text" required placeholder="教练姓名"
                                    className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-brand-500 outline-none"
                                    value={registrationForm.coach}
                                    onChange={e => setRegistrationForm({...registrationForm, coach: e.target.value})}
                                  />
                              </div>
                              <div>
                                  <label className="block text-sm font-medium text-slate-700 mb-1">联系电话</label>
                                  <input 
                                    type="tel" required placeholder="联系人手机号"
                                    className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-brand-500 outline-none"
                                    value={registrationForm.contact}
                                    onChange={e => setRegistrationForm({...registrationForm, contact: e.target.value})}
                                  />
                              </div>
                              <div className="bg-blue-50 p-3 rounded-lg text-xs text-blue-800 border border-blue-100 mt-2">
                                  注：您的申请将提交至联赛管理员进行审核，审核通过后您将收到通知。
                              </div>
                              <div className="pt-2">
                                  <button type="submit" className="w-full py-2 bg-brand-600 text-white rounded-lg hover:bg-brand-700 font-medium shadow-sm">提交报名</button>
                              </div>
                          </form>
                      </div>
                  </div>
              )}

              {/* MODAL: ADD MATCH */}
              {isAddMatchModalOpen && (
                  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4 animate-fade-in">
                      <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg overflow-hidden animate-scale-up">
                          <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-slate-50">
                              <h3 className="text-lg font-bold text-slate-900">安排新比赛</h3>
                              <button onClick={() => setIsAddMatchModalOpen(false)} className="text-slate-400 hover:text-slate-600 p-1 rounded-full"><X size={20}/></button>
                          </div>
                          <form onSubmit={handleAddMatch} className="p-6 space-y-4">
                              <div className="grid grid-cols-2 gap-4">
                                  <div>
                                      <label className="block text-sm font-medium text-slate-700 mb-1">主队</label>
                                      <input type="text" className="w-full px-3 py-2 border border-slate-200 rounded-lg" value={newMatch.homeTeam} onChange={e => setNewMatch({...newMatch, homeTeam: e.target.value})} required/>
                                  </div>
                                  <div>
                                      <label className="block text-sm font-medium text-slate-700 mb-1">客队</label>
                                      <input type="text" className="w-full px-3 py-2 border border-slate-200 rounded-lg" value={newMatch.awayTeam} onChange={e => setNewMatch({...newMatch, awayTeam: e.target.value})} required/>
                                  </div>
                              </div>
                              <div className="grid grid-cols-2 gap-4">
                                  <div>
                                      <label className="block text-sm font-medium text-slate-700 mb-1">日期</label>
                                      <input type="date" className="w-full px-3 py-2 border border-slate-200 rounded-lg text-slate-600" value={newMatch.date} onChange={e => setNewMatch({...newMatch, date: e.target.value})} required/>
                                  </div>
                                  <div>
                                      <label className="block text-sm font-medium text-slate-700 mb-1">时间</label>
                                      <input type="time" className="w-full px-3 py-2 border border-slate-200 rounded-lg text-slate-600" value={newMatch.time} onChange={e => setNewMatch({...newMatch, time: e.target.value})} required/>
                                  </div>
                              </div>
                              <div>
                                  <label className="block text-sm font-medium text-slate-700 mb-1">地点</label>
                                  <input type="text" className="w-full px-3 py-2 border border-slate-200 rounded-lg" value={newMatch.location} onChange={e => setNewMatch({...newMatch, location: e.target.value})} />
                              </div>
                              <div className="pt-2">
                                  <button type="submit" className="w-full py-2 bg-brand-600 text-white rounded-lg hover:bg-brand-700 font-medium">确认添加</button>
                              </div>
                          </form>
                      </div>
                  </div>
              )}

              {/* MODAL: EDIT MATCH / ENTER SCORE */}
              {isEditMatchModalOpen && editingMatch && (
                  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4 animate-fade-in">
                      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden animate-scale-up">
                          <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-slate-50">
                              <h3 className="text-lg font-bold text-slate-900">更新比赛结果</h3>
                              <button onClick={() => setIsEditMatchModalOpen(false)} className="text-slate-400 hover:text-slate-600 p-1 rounded-full"><X size={20}/></button>
                          </div>
                          <form onSubmit={handleUpdateScore} className="p-6 space-y-6">
                              <div className="flex items-center justify-between gap-4">
                                  <div className="text-center flex-1">
                                      <h4 className="font-bold text-slate-900 mb-2">{editingMatch.homeTeam}</h4>
                                      <input 
                                        type="number" 
                                        className="w-20 px-2 py-2 border border-slate-200 rounded-lg text-center text-2xl font-bold"
                                        value={editingMatch.scoreHome || 0}
                                        onChange={e => setEditingMatch({...editingMatch, scoreHome: Number(e.target.value)})}
                                      />
                                  </div>
                                  <span className="text-xl font-bold text-slate-300">-</span>
                                  <div className="text-center flex-1">
                                      <h4 className="font-bold text-slate-900 mb-2">{editingMatch.awayTeam}</h4>
                                      <input 
                                        type="number" 
                                        className="w-20 px-2 py-2 border border-slate-200 rounded-lg text-center text-2xl font-bold"
                                        value={editingMatch.scoreAway || 0}
                                        onChange={e => setEditingMatch({...editingMatch, scoreAway: Number(e.target.value)})}
                                      />
                                  </div>
                              </div>
                              
                              <div>
                                  <label className="block text-sm font-medium text-slate-700 mb-2">比赛状态</label>
                                  <select 
                                    className="w-full px-3 py-2 border border-slate-200 rounded-lg bg-white"
                                    value={editingMatch.status}
                                    onChange={e => setEditingMatch({...editingMatch, status: e.target.value as any})}
                                  >
                                      <option value="Scheduled">Scheduled (未开始)</option>
                                      <option value="Live">Live (进行中)</option>
                                      <option value="Finished">Finished (已结束)</option>
                                  </select>
                              </div>

                              <button type="submit" className="w-full py-2 bg-brand-600 text-white rounded-lg hover:bg-brand-700 font-medium">
                                  更新结果
                              </button>
                          </form>
                      </div>
                  </div>
              )}
          </div>
      );
  }

  // --- MAIN DASHBOARD RENDERER ---
  return (
    <div className="p-8 space-y-6 flex flex-col h-[calc(100vh-64px)]">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">体育管理 Sports</h1>
          <p className="text-slate-500 mt-1">校队管理、赛事联赛与比赛日程。</p>
        </div>
        <div className="flex bg-slate-100 p-1 rounded-lg">
            <button
                onClick={() => setActiveTab('overview')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${activeTab === 'overview' ? 'bg-white text-brand-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
            >
                总览
            </button>
            <button
                onClick={() => setActiveTab('leagues')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${activeTab === 'leagues' ? 'bg-white text-brand-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
            >
                联赛库
            </button>
            <button
                onClick={() => setActiveTab('teams')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${activeTab === 'teams' ? 'bg-white text-brand-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
            >
                校队管理
            </button>
            <button
                onClick={() => setActiveTab('matches')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${activeTab === 'matches' ? 'bg-white text-brand-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
            >
                比赛日程
            </button>
        </div>
      </div>

      {/* OVERVIEW TAB */}
      {activeTab === 'overview' && (
          <div className="space-y-6 overflow-y-auto flex-1 min-h-0 pb-20">
              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
                      <div className="flex justify-between items-start">
                          <div>
                              <p className="text-slate-500 text-xs uppercase font-bold tracking-wider">活跃校队</p>
                              <h3 className="text-3xl font-bold text-slate-900 mt-1">{teams.length}</h3>
                          </div>
                          <div className="p-3 bg-blue-50 text-blue-600 rounded-lg"><Users size={20}/></div>
                      </div>
                  </div>
                  <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
                      <div className="flex justify-between items-start">
                          <div>
                              <p className="text-slate-500 text-xs uppercase font-bold tracking-wider">本月比赛</p>
                              <h3 className="text-3xl font-bold text-slate-900 mt-1">12</h3>
                          </div>
                          <div className="p-3 bg-purple-50 text-purple-600 rounded-lg"><Calendar size={20}/></div>
                      </div>
                  </div>
                  <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
                      <div className="flex justify-between items-start">
                          <div>
                              <p className="text-slate-500 text-xs uppercase font-bold tracking-wider">参与联赛</p>
                              <h3 className="text-3xl font-bold text-slate-900 mt-1">{MOCK_LEAGUES.filter(l => l.status !== 'Completed').length}</h3>
                          </div>
                          <div className="p-3 bg-emerald-50 text-emerald-600 rounded-lg"><Activity size={20}/></div>
                      </div>
                  </div>
                  <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
                      <div className="flex justify-between items-start">
                          <div>
                              <p className="text-slate-500 text-xs uppercase font-bold tracking-wider">所获荣誉</p>
                              <h3 className="text-3xl font-bold text-amber-500 mt-1">5</h3>
                          </div>
                          <div className="p-3 bg-amber-50 text-amber-600 rounded-lg"><Trophy size={20}/></div>
                      </div>
                  </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Recent Results */}
                  <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
                      <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
                          <Target size={20} className="text-brand-600"/> 近期赛果
                      </h3>
                      <div className="space-y-4">
                          {matches.filter(m => m.status === 'Finished').map(match => (
                              <div key={match.id} className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-100 cursor-pointer hover:bg-slate-50" onClick={() => setSelectedMatch(match)}>
                                  <div className="text-right flex-1">
                                      <span className="font-bold text-slate-900">{match.homeTeam}</span>
                                  </div>
                                  <div className="px-4 flex flex-col items-center">
                                      <span className="text-xl font-black text-slate-800 tracking-widest bg-white px-3 py-1 rounded border border-slate-200 shadow-sm">
                                          {match.scoreHome} - {match.scoreAway}
                                      </span>
                                      <span className="text-xs text-slate-400 mt-1">{match.date}</span>
                                  </div>
                                  <div className="text-left flex-1">
                                      <span className="font-bold text-slate-700">{match.awayTeam}</span>
                                  </div>
                              </div>
                          ))}
                      </div>
                  </div>

                  {/* Ongoing Leagues */}
                  <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
                      <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
                          <Trophy size={20} className="text-amber-500"/> 进行中赛事
                      </h3>
                      <div className="space-y-3">
                          {MOCK_LEAGUES.filter(l => l.status === 'Ongoing').map(league => (
                              <div key={league.id} className="flex items-center justify-between p-4 border border-slate-100 rounded-xl hover:bg-slate-50 transition-colors cursor-pointer" onClick={() => setSelectedLeague(league)}>
                                  <div className="flex items-center gap-3">
                                      <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center text-lg">
                                          {getSportIcon(league.sport)}
                                      </div>
                                      <div>
                                          <h4 className="font-bold text-slate-900 hover:text-brand-600 transition-colors">{league.name}</h4>
                                          <p className="text-xs text-slate-500">{league.season}</p>
                                      </div>
                                  </div>
                                  <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded">进行中</span>
                              </div>
                          ))}
                          {MOCK_LEAGUES.filter(l => l.status === 'Ongoing').length === 0 && (
                              <div className="text-center py-8 text-slate-400">暂无进行中的赛事</div>
                          )}
                      </div>
                  </div>
              </div>
          </div>
      )}

      {/* LEAGUES TAB */}
      {activeTab === 'leagues' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 overflow-y-auto pb-20 flex-1 min-h-0">
              {MOCK_LEAGUES.map(league => (
                  <div key={league.id} className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden hover:shadow-md transition-all group flex flex-col h-full min-h-[560px]">
                      <div className="h-48 bg-slate-100 flex items-center justify-center text-6xl group-hover:scale-110 transition-transform duration-500 flex-shrink-0">
                          {getSportIcon(league.sport)}
                      </div>
                      <div className="p-6 flex flex-col flex-1">
                          <div className="flex justify-between items-start mb-2">
                              <h3 className="font-bold text-lg text-slate-900 line-clamp-1" title={league.name}>{league.name}</h3>
                          </div>
                          <div className="flex gap-2 mb-4">
                              <span className={`text-xs px-2 py-0.5 rounded font-medium border ${getStatusColor(league.status)}`}>
                                  {getStatusLabel(league.status)}
                              </span>
                              <span className="text-xs px-2 py-0.5 rounded font-medium bg-slate-100 text-slate-600 border border-slate-200">
                                  {league.sport}
                              </span>
                          </div>
                          <div className="space-y-3 text-sm text-slate-600 mb-6 flex-1">
                              <div className="flex items-center gap-2">
                                  <Calendar size={14}/> {league.startDate} - {league.endDate}
                              </div>
                              <div className="flex items-center gap-2">
                                  <Target size={14}/> 赛季: {league.season}
                              </div>
                          </div>
                          <div className="flex gap-2 mt-auto">
                              <button 
                                onClick={() => setSelectedLeague(league)}
                                className="flex-1 py-2 bg-white border border-slate-200 text-slate-700 rounded-lg hover:bg-slate-50 hover:text-brand-600 font-medium transition-colors"
                              >
                                  查看详情
                              </button>
                              <button 
                                onClick={() => openRegisterModal(league)}
                                className="flex-1 py-2 bg-brand-50 border border-brand-200 text-brand-600 rounded-lg hover:bg-brand-100 font-medium transition-colors flex items-center justify-center gap-1"
                              >
                                  <FileText size={14}/> 报名
                              </button>
                          </div>
                      </div>
                  </div>
              ))}
              <button className="border-2 border-dashed border-slate-200 rounded-xl flex flex-col items-center justify-center text-slate-400 hover:border-brand-300 hover:text-brand-600 transition-all min-h-[560px]">
                  <Plus size={32} className="mb-2"/>
                  <span className="font-medium">注册新联赛</span>
              </button>
          </div>
      )}

      {/* TEAMS TAB */}
      {activeTab === 'teams' && (
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col flex-1 min-h-0">
              <div className="p-4 border-b border-slate-200 bg-slate-50/50 flex justify-between items-center">
                  <h3 className="font-bold text-slate-800">校队列表</h3>
                  <button 
                    onClick={() => setIsCreateTeamModalOpen(true)}
                    className="flex items-center px-3 py-1.5 bg-brand-600 text-white rounded-lg hover:bg-brand-700 text-sm font-medium"
                  >
                      <Plus size={16} className="mr-2"/> 组建新队
                  </button>
              </div>
              <div className="overflow-y-auto flex-1">
                  <table className="w-full text-left">
                      <thead className="bg-slate-50 text-slate-500 text-xs uppercase font-semibold sticky top-0 z-10">
                          <tr>
                              <th className="px-6 py-4">队伍名称</th>
                              <th className="px-6 py-4">项目</th>
                              <th className="px-6 py-4">教练</th>
                              <th className="px-6 py-4">成员数</th>
                              <th className="px-6 py-4">战绩 (胜-负)</th>
                              <th className="px-6 py-4 text-right">操作</th>
                          </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                          {teams.map(team => (
                              <tr key={team.id} className="hover:bg-slate-50">
                                  <td className="px-6 py-4">
                                      <div className="font-bold text-slate-900">{team.name}</div>
                                      {team.rank && team.rank <= 3 && <span className="text-xs text-amber-600 flex items-center gap-1 mt-0.5"><Award size={10}/> 排名 #{team.rank}</span>}
                                  </td>
                                  <td className="px-6 py-4">
                                      <span className="flex items-center gap-2 text-sm text-slate-700">
                                          {getSportIcon(team.sport)} {team.sport}
                                      </span>
                                  </td>
                                  <td className="px-6 py-4 text-sm text-slate-600">{team.coach}</td>
                                  <td className="px-6 py-4 text-sm text-slate-600">{team.membersCount} 人</td>
                                  <td className="px-6 py-4">
                                      <span className="font-mono font-bold text-slate-800">{team.wins}</span>
                                      <span className="text-slate-400 mx-1">-</span>
                                      <span className="font-mono font-bold text-slate-800">{team.losses}</span>
                                  </td>
                                  <td className="px-6 py-4 text-right">
                                      <button className="text-slate-400 hover:text-brand-600 p-1">
                                          <MoreHorizontal size={18}/>
                                      </button>
                                  </td>
                              </tr>
                          ))}
                      </tbody>
                  </table>
              </div>
          </div>
      )}

      {/* MATCHES TAB */}
      {activeTab === 'matches' && (
          <div className="space-y-4 overflow-y-auto flex-1 min-h-0 pb-20">
              <div className="flex gap-4 items-center mb-4">
                  <div className="relative flex-1">
                      <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                      <input 
                        type="text" 
                        placeholder="搜索比赛..." 
                        className="w-full pl-9 pr-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
                      />
                  </div>
                  <button className="px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-50 flex items-center gap-2">
                      <Filter size={16}/> 筛选
                  </button>
              </div>

              {matches.map(match => (
                  <div key={match.id} className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow cursor-pointer" onClick={() => setSelectedMatch(match)}>
                      <div className="flex justify-between items-center mb-4">
                          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">{MOCK_LEAGUES.find(l => l.id === match.leagueId)?.name}</span>
                          <span className={`text-xs px-2 py-0.5 rounded font-medium border ${getStatusColor(match.status)}`}>
                              {getStatusLabel(match.status)}
                          </span>
                      </div>
                      
                      <div className="flex items-center justify-between">
                          <div className="flex-1 text-right pr-8">
                              <h3 className="text-xl font-bold text-slate-900">{match.homeTeam}</h3>
                              <p className="text-xs text-slate-500">主队</p>
                          </div>
                          
                          <div className="px-6 py-2 bg-slate-100 rounded-lg text-center min-w-[120px]">
                              {match.status === 'Scheduled' ? (
                                  <div className="text-slate-600 font-bold">{match.time}</div>
                              ) : (
                                  <div className="text-2xl font-black text-slate-900 tracking-widest">
                                      {match.scoreHome} : {match.scoreAway}
                                  </div>
                              )}
                              <div className="text-xs text-slate-400 mt-1">{match.date}</div>
                          </div>

                          <div className="flex-1 text-left pl-8">
                              <h3 className="text-xl font-bold text-slate-900">{match.awayTeam}</h3>
                              <p className="text-xs text-slate-500">客队</p>
                          </div>
                      </div>
                      
                      <div className="mt-4 pt-4 border-t border-slate-100 flex justify-center text-xs text-slate-500 gap-6">
                          <span className="flex items-center gap-1"><MapPin size={12}/> {match.location}</span>
                          <span className="flex items-center gap-1"><Clock size={12}/> 常规时间</span>
                      </div>
                  </div>
              ))}
          </div>
      )}

      {/* --- MODAL: REGISTER TEAM --- */}
      {isRegisterModalOpen && (registeringLeague || selectedLeague) && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4 animate-fade-in">
              <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden animate-scale-up">
                  <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-slate-50">
                      <h3 className="text-lg font-bold text-slate-900">
                          报名参加 {registeringLeague?.name || selectedLeague?.name}
                      </h3>
                      <button onClick={() => setIsRegisterModalOpen(false)} className="text-slate-400 hover:text-slate-600 p-1 rounded-full"><X size={20}/></button>
                  </div>
                  <form onSubmit={handleRegisterLeague} className="p-6 space-y-4">
                      <div>
                          <label className="block text-sm font-medium text-slate-700 mb-1">队伍名称</label>
                          <input 
                            type="text" required placeholder="例如：高一(5)班 火箭队"
                            className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-brand-500 outline-none"
                            value={registrationForm.teamName}
                            onChange={e => setRegistrationForm({...registrationForm, teamName: e.target.value})}
                          />
                      </div>
                      <div>
                          <label className="block text-sm font-medium text-slate-700 mb-1">主教练</label>
                          <input 
                            type="text" required placeholder="教练姓名"
                            className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-brand-500 outline-none"
                            value={registrationForm.coach}
                            onChange={e => setRegistrationForm({...registrationForm, coach: e.target.value})}
                          />
                      </div>
                      <div>
                          <label className="block text-sm font-medium text-slate-700 mb-1">联系电话</label>
                          <input 
                            type="tel" required placeholder="联系人手机号"
                            className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-brand-500 outline-none"
                            value={registrationForm.contact}
                            onChange={e => setRegistrationForm({...registrationForm, contact: e.target.value})}
                          />
                      </div>
                      <div className="bg-blue-50 p-3 rounded-lg text-xs text-blue-800 border border-blue-100 mt-2">
                          注：您的申请将提交至联赛管理员进行审核，审核通过后您将收到通知。
                      </div>
                      <div className="pt-2">
                          <button type="submit" className="w-full py-2 bg-brand-600 text-white rounded-lg hover:bg-brand-700 font-medium shadow-sm">提交报名</button>
                      </div>
                  </form>
              </div>
          </div>
      )}

      {/* --- MODAL: CREATE TEAM --- */}
      {isCreateTeamModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4 animate-fade-in">
              <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden animate-scale-up">
                  <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-slate-50">
                      <h3 className="text-lg font-bold text-slate-900">组建新队伍</h3>
                      <button onClick={() => setIsCreateTeamModalOpen(false)} className="text-slate-400 hover:text-slate-600 p-1 rounded-full"><X size={20}/></button>
                  </div>
                  <form onSubmit={handleCreateTeam} className="p-6 space-y-4">
                      <div>
                          <label className="block text-sm font-medium text-slate-700 mb-1">队伍名称</label>
                          <input 
                            type="text" required
                            className="w-full px-3 py-2 border border-slate-200 rounded-lg"
                            value={newTeamForm.name}
                            onChange={e => setNewTeamForm({...newTeamForm, name: e.target.value})}
                          />
                      </div>
                      <div>
                          <label className="block text-sm font-medium text-slate-700 mb-1">运动项目</label>
                          <select 
                            className="w-full px-3 py-2 border border-slate-200 rounded-lg bg-white"
                            value={newTeamForm.sport}
                            onChange={e => setNewTeamForm({...newTeamForm, sport: e.target.value})}
                          >
                              <option value="Basketball">篮球</option>
                              <option value="Football">足球</option>
                              <option value="Volleyball">排球</option>
                              <option value="Swimming">游泳</option>
                              <option value="Badminton">羽毛球</option>
                              <option value="Tennis">网球</option>
                          </select>
                      </div>
                      <div>
                          <label className="block text-sm font-medium text-slate-700 mb-1">主教练</label>
                          <input 
                            type="text" required
                            className="w-full px-3 py-2 border border-slate-200 rounded-lg"
                            value={newTeamForm.coach}
                            onChange={e => setNewTeamForm({...newTeamForm, coach: e.target.value})}
                          />
                      </div>
                      <div>
                          <label className="block text-sm font-medium text-slate-700 mb-1">队员人数</label>
                          <input 
                            type="number" min="0"
                            className="w-full px-3 py-2 border border-slate-200 rounded-lg"
                            value={newTeamForm.membersCount}
                            onChange={e => setNewTeamForm({...newTeamForm, membersCount: Number(e.target.value)})}
                          />
                      </div>
                      <div className="pt-2">
                          <button type="submit" className="w-full py-2 bg-brand-600 text-white rounded-lg hover:bg-brand-700 font-medium">确认创建</button>
                      </div>
                  </form>
              </div>
          </div>
      )}

      {/* --- MODAL: ADD MATCH --- */}
      {isAddMatchModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4 animate-fade-in">
              <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg overflow-hidden animate-scale-up">
                  <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-slate-50">
                      <h3 className="text-lg font-bold text-slate-900">安排新比赛</h3>
                      <button onClick={() => setIsAddMatchModalOpen(false)} className="text-slate-400 hover:text-slate-600 p-1 rounded-full"><X size={20}/></button>
                  </div>
                  <form onSubmit={handleAddMatch} className="p-6 space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                          <div>
                              <label className="block text-sm font-medium text-slate-700 mb-1">主队</label>
                              <input type="text" className="w-full px-3 py-2 border border-slate-200 rounded-lg" value={newMatch.homeTeam} onChange={e => setNewMatch({...newMatch, homeTeam: e.target.value})} required/>
                          </div>
                          <div>
                              <label className="block text-sm font-medium text-slate-700 mb-1">客队</label>
                              <input type="text" className="w-full px-3 py-2 border border-slate-200 rounded-lg" value={newMatch.awayTeam} onChange={e => setNewMatch({...newMatch, awayTeam: e.target.value})} required/>
                          </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                          <div>
                              <label className="block text-sm font-medium text-slate-700 mb-1">日期</label>
                              <input type="date" className="w-full px-3 py-2 border border-slate-200 rounded-lg text-slate-600" value={newMatch.date} onChange={e => setNewMatch({...newMatch, date: e.target.value})} required/>
                          </div>
                          <div>
                              <label className="block text-sm font-medium text-slate-700 mb-1">时间</label>
                              <input type="time" className="w-full px-3 py-2 border border-slate-200 rounded-lg text-slate-600" value={newMatch.time} onChange={e => setNewMatch({...newMatch, time: e.target.value})} required/>
                          </div>
                      </div>
                      <div>
                          <label className="block text-sm font-medium text-slate-700 mb-1">地点</label>
                          <input type="text" className="w-full px-3 py-2 border border-slate-200 rounded-lg" value={newMatch.location} onChange={e => setNewMatch({...newMatch, location: e.target.value})} />
                      </div>
                      <div className="pt-2">
                          <button type="submit" className="w-full py-2 bg-brand-600 text-white rounded-lg hover:bg-brand-700 font-medium">确认添加</button>
                      </div>
                  </form>
              </div>
          </div>
      )}

      {/* --- MODAL: EDIT MATCH / ENTER SCORE --- */}
      {isEditMatchModalOpen && editingMatch && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4 animate-fade-in">
              <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden animate-scale-up">
                  <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-slate-50">
                      <h3 className="text-lg font-bold text-slate-900">更新比赛结果</h3>
                      <button onClick={() => setIsEditMatchModalOpen(false)} className="text-slate-400 hover:text-slate-600 p-1 rounded-full"><X size={20}/></button>
                  </div>
                  <form onSubmit={handleUpdateScore} className="p-6 space-y-6">
                      <div className="flex items-center justify-between gap-4">
                          <div className="text-center flex-1">
                              <h4 className="font-bold text-slate-900 mb-2">{editingMatch.homeTeam}</h4>
                              <input 
                                type="number" 
                                className="w-20 px-2 py-2 border border-slate-200 rounded-lg text-center text-2xl font-bold"
                                value={editingMatch.scoreHome || 0}
                                onChange={e => setEditingMatch({...editingMatch, scoreHome: Number(e.target.value)})}
                              />
                          </div>
                          <span className="text-xl font-bold text-slate-300">-</span>
                          <div className="text-center flex-1">
                              <h4 className="font-bold text-slate-900 mb-2">{editingMatch.awayTeam}</h4>
                              <input 
                                type="number" 
                                className="w-20 px-2 py-2 border border-slate-200 rounded-lg text-center text-2xl font-bold"
                                value={editingMatch.scoreAway || 0}
                                onChange={e => setEditingMatch({...editingMatch, scoreAway: Number(e.target.value)})}
                              />
                          </div>
                      </div>
                      
                      <div>
                          <label className="block text-sm font-medium text-slate-700 mb-2">比赛状态</label>
                          <select 
                            className="w-full px-3 py-2 border border-slate-200 rounded-lg bg-white"
                            value={editingMatch.status}
                            onChange={e => setEditingMatch({...editingMatch, status: e.target.value as any})}
                          >
                              <option value="Scheduled">Scheduled (未开始)</option>
                              <option value="Live">Live (进行中)</option>
                              <option value="Finished">Finished (已结束)</option>
                          </select>
                      </div>

                      <button type="submit" className="w-full py-2 bg-brand-600 text-white rounded-lg hover:bg-brand-700 font-medium">
                          更新结果
                      </button>
                  </form>
              </div>
          </div>
      )}
    </div>
  );
};
