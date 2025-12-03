import React, { useState } from 'react';
import { Activity, Trophy, Users, Calendar, MapPin, Clock, Plus, Filter, Target, Award, Search, MoreHorizontal, ChevronLeft, TrendingUp, User, Settings, ClipboardList, CheckCircle, XCircle, Edit2, Save, X } from 'lucide-react';
import { SportLeague, SportTeam, SportMatch, LeagueRegistration } from '../types';

// --- MOCK DATA ---
const MOCK_LEAGUES: SportLeague[] = [
  { id: 'L1', name: 'High School Basketball League (HBL)', sport: 'Basketball', season: '2024-2025', status: 'Ongoing', startDate: '2024-10-01', endDate: '2025-05-20' },
  { id: 'L2', name: 'Campus Football Cup', sport: 'Football', season: '2024 Fall', status: 'Completed', startDate: '2024-09-15', endDate: '2024-11-30' },
  { id: 'L3', name: 'City Swimming Championship', sport: 'Swimming', season: '2025', status: 'Upcoming', startDate: '2025-06-10', endDate: '2025-06-12' },
  { id: 'L4', name: 'Inter-School Badminton Open', sport: 'Badminton', season: '2025 Spring', status: 'Upcoming', startDate: '2025-03-15', endDate: '2025-04-15' },
];

const MOCK_TEAMS: SportTeam[] = [
  { id: 'T1', name: 'Varsity Lions (Men)', sport: 'Basketball', coach: 'Coach Carter', membersCount: 15, wins: 8, losses: 2, rank: 1 },
  { id: 'T2', name: 'Varsity Lions (Women)', sport: 'Basketball', coach: 'Ms. Liu', membersCount: 12, wins: 5, losses: 4, rank: 3 },
  { id: 'T3', name: 'Golden Eagles', sport: 'Football', coach: 'Mr. Zhang', membersCount: 22, wins: 10, losses: 1, draws: 1, rank: 1 },
  { id: 'T4', name: 'Aqua Squad', sport: 'Swimming', coach: 'Coach Wang', membersCount: 18, wins: 0, losses: 0, rank: 0 },
];

const MOCK_REGISTRATIONS: LeagueRegistration[] = [
    { id: 'R1', leagueId: 'L1', teamName: 'Rockets (Class 5)', coach: 'Mr. Wu', contact: '13800001234', status: 'Pending', submitDate: '2024-11-20' },
    { id: 'R2', leagueId: 'L1', teamName: 'Thunders (Class 2)', coach: 'Ms. Zhao', contact: '13900005678', status: 'Approved', submitDate: '2024-11-18' },
    { id: 'R3', leagueId: 'L1', teamName: 'Wildcats (Class 8)', coach: 'Mr. Liu', contact: '13700009876', status: 'Rejected', submitDate: '2024-11-15' },
];

const MOCK_MATCHES: SportMatch[] = [
  { id: 'M1', leagueId: 'L1', homeTeam: 'Varsity Lions', awayTeam: 'Red Tigers (No.4 High)', date: '2024-11-20', time: '16:00', location: 'Home Gym', scoreHome: 78, scoreAway: 72, status: 'Finished' },
  { id: 'M2', leagueId: 'L1', homeTeam: 'Blue Sharks (Experimental)', awayTeam: 'Varsity Lions', date: '2024-11-27', time: '16:30', location: 'Away Gym', status: 'Scheduled' },
  { id: 'M3', leagueId: 'L2', homeTeam: 'Golden Eagles', awayTeam: 'Iron Wolves', date: '2024-11-30', time: '14:00', location: 'Main Stadium', scoreHome: 3, scoreAway: 1, status: 'Finished' },
  { id: 'M4', leagueId: 'L4', homeTeam: 'Kexin Badminton A', awayTeam: 'City High B', date: '2025-03-16', time: '09:00', location: 'Sports Center', status: 'Scheduled' },
];

// Mock Standings Data for Detail View
const MOCK_STANDINGS = [
    { rank: 1, team: 'Varsity Lions', played: 10, won: 8, drawn: 0, lost: 2, points: 16, form: ['W', 'W', 'L', 'W', 'W'] },
    { rank: 2, team: 'Blue Sharks', played: 10, won: 7, drawn: 0, lost: 3, points: 14, form: ['W', 'L', 'W', 'W', 'L'] },
    { rank: 3, team: 'Red Tigers', played: 10, won: 6, drawn: 0, lost: 4, points: 12, form: ['L', 'W', 'L', 'W', 'L'] },
    { rank: 4, team: 'Iron Wolves', played: 10, won: 4, drawn: 0, lost: 6, points: 8, form: ['L', 'L', 'W', 'L', 'W'] },
];

const MOCK_TOP_PLAYERS = [
    { rank: 1, name: 'Zhang Xiaoming', team: 'Varsity Lions', metric: 'Points', value: 185 },
    { rank: 2, name: 'Mike Johnson', team: 'Blue Sharks', metric: 'Points', value: 172 },
    { rank: 3, name: 'Li Wei', team: 'Varsity Lions', metric: 'Points', value: 160 },
];

export const Sports: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'leagues' | 'teams' | 'matches'>('overview');
  const [selectedLeague, setSelectedLeague] = useState<SportLeague | null>(null);
  const [leagueDetailTab, setLeagueDetailTab] = useState<'standings' | 'fixtures' | 'stats' | 'management'>('standings');

  // State for data management
  const [matches, setMatches] = useState<SportMatch[]>(MOCK_MATCHES);
  const [registrations, setRegistrations] = useState<LeagueRegistration[]>(MOCK_REGISTRATIONS);
  
  // Modal States
  const [isAddMatchModalOpen, setIsAddMatchModalOpen] = useState(false);
  const [isEditMatchModalOpen, setIsEditMatchModalOpen] = useState(false);
  
  // Forms
  const [newMatch, setNewMatch] = useState<Partial<SportMatch>>({ homeTeam: '', awayTeam: '', date: '', time: '', location: 'School Gym' });
  const [editingMatch, setEditingMatch] = useState<SportMatch | null>(null);

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
          homeTeam: newMatch.homeTeam || 'Home Team',
          awayTeam: newMatch.awayTeam || 'Away Team',
          date: newMatch.date || '',
          time: newMatch.time || '',
          location: newMatch.location || 'TBD',
          status: 'Scheduled'
      };
      setMatches([...matches, match]);
      setIsAddMatchModalOpen(false);
      setNewMatch({ homeTeam: '', awayTeam: '', date: '', time: '', location: 'School Gym' });
  };

  const handleUpdateScore = (e: React.FormEvent) => {
      e.preventDefault();
      if (!editingMatch) return;
      setMatches(prev => prev.map(m => m.id === editingMatch.id ? editingMatch : m));
      setIsEditMatchModalOpen(false);
      setEditingMatch(null);
  };

  // --- LEAGUE DETAIL VIEW RENDERER ---
  if (selectedLeague) {
      return (
          <div className="p-8 space-y-6 flex flex-col h-[calc(100vh-64px)]">
              {/* Back Navigation */}
              <button 
                onClick={() => setSelectedLeague(null)}
                className="flex items-center gap-2 text-slate-500 hover:text-brand-600 transition-colors font-medium w-fit"
              >
                  <ChevronLeft size={20}/> Back to Sports Hub
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
                                  {selectedLeague.status}
                              </span>
                          </div>
                          <p className="text-slate-500 flex items-center gap-4 text-sm font-medium">
                              <span className="flex items-center gap-1"><Trophy size={16}/> Season {selectedLeague.season}</span>
                              <span className="flex items-center gap-1"><Calendar size={16}/> {selectedLeague.startDate} - {selectedLeague.endDate}</span>
                          </p>
                      </div>
                      <div className="flex gap-3">
                          <button className="px-4 py-2 border border-slate-200 rounded-lg bg-white hover:bg-slate-50 text-slate-700 font-medium text-sm">
                              Download Rulebook
                          </button>
                          <button 
                            onClick={() => setLeagueDetailTab('management')}
                            className="px-4 py-2 bg-brand-600 text-white rounded-lg hover:bg-brand-700 shadow-sm font-medium text-sm"
                          >
                              Manage League
                          </button>
                      </div>
                  </div>
              </div>

              {/* League Detail Tabs */}
              <div className="flex border-b border-slate-200 flex-shrink-0">
                  {(['standings', 'fixtures', 'stats', 'management'] as const).map(tab => (
                      <button 
                        key={tab}
                        onClick={() => setLeagueDetailTab(tab)}
                        className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors capitalize ${leagueDetailTab === tab ? 'border-brand-600 text-brand-600' : 'border-transparent text-slate-500 hover:text-slate-700'}`}
                      >
                          {tab}
                      </button>
                  ))}
              </div>

              {/* Tab Content */}
              <div className="flex-1 overflow-y-auto min-h-0 pb-8">
                  {leagueDetailTab === 'standings' && (
                      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                          <table className="w-full text-left text-sm">
                              <thead className="bg-slate-50 text-slate-500 font-semibold border-b border-slate-200">
                                  <tr>
                                      <th className="px-6 py-4 w-20 text-center">Pos</th>
                                      <th className="px-6 py-4">Team</th>
                                      <th className="px-6 py-4 text-center">Played</th>
                                      <th className="px-6 py-4 text-center">Won</th>
                                      <th className="px-6 py-4 text-center">Drawn</th>
                                      <th className="px-6 py-4 text-center">Lost</th>
                                      <th className="px-6 py-4 text-center">Points</th>
                                      <th className="px-6 py-4 text-right">Form</th>
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
                              <h3 className="font-bold text-slate-800">Match Schedule</h3>
                              <button 
                                onClick={() => setIsAddMatchModalOpen(true)}
                                className="flex items-center text-sm bg-brand-600 text-white px-3 py-1.5 rounded-lg hover:bg-brand-700 transition-colors shadow-sm"
                              >
                                  <Plus size={16} className="mr-1"/> Add Match
                              </button>
                          </div>
                          {matches.filter(m => m.leagueId === selectedLeague.id).map(match => (
                              <div key={match.id} className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between hover:shadow-md transition-shadow">
                                  <div className="flex-1 text-right">
                                      <h4 className="font-bold text-slate-900 text-lg">{match.homeTeam}</h4>
                                  </div>
                                  <div className="px-8 flex flex-col items-center relative group">
                                      {match.status === 'Finished' ? (
                                          <div className="text-2xl font-black text-slate-900 bg-slate-100 px-4 py-1 rounded-lg cursor-pointer hover:bg-slate-200" onClick={() => { setEditingMatch(match); setIsEditMatchModalOpen(true); }}>
                                              {match.scoreHome} - {match.scoreAway}
                                          </div>
                                      ) : (
                                          <div className="text-xl font-bold text-slate-500 bg-slate-50 px-4 py-1 rounded-lg border border-slate-100 cursor-pointer hover:border-brand-300 hover:text-brand-600 transition-all" onClick={() => { setEditingMatch(match); setIsEditMatchModalOpen(true); }}>
                                              {match.time}
                                          </div>
                                      )}
                                      <span className="text-xs text-slate-400 mt-2">{match.date} • {match.location}</span>
                                      
                                      {/* Edit Hint */}
                                      <div className="absolute -top-6 opacity-0 group-hover:opacity-100 transition-opacity text-xs bg-slate-800 text-white px-2 py-1 rounded">
                                          Click to Edit
                                      </div>
                                  </div>
                                  <div className="flex-1 text-left">
                                      <h4 className="font-bold text-slate-900 text-lg">{match.awayTeam}</h4>
                                  </div>
                              </div>
                          ))}
                          {matches.filter(m => m.leagueId === selectedLeague.id).length === 0 && (
                              <div className="text-center py-12 text-slate-400">No matches found for this league</div>
                          )}
                      </div>
                  )}

                  {leagueDetailTab === 'stats' && (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
                              <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
                                  <TrendingUp size={20} className="text-brand-600"/> Top Scorers
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
                                  <h3 className="font-bold text-xl mb-2">League MVP Race</h3>
                                  <p className="opacity-80 text-sm">Based on performance rating</p>
                              </div>
                              <div className="flex items-center gap-4 mt-6">
                                  <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center text-2xl">
                                      <User size={32}/>
                                  </div>
                                  <div>
                                      <p className="font-bold text-lg">Zhang Xiaoming</p>
                                      <p className="text-indigo-200 text-sm">Varsity Lions</p>
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
                                  <Settings size={20} className="text-slate-500"/> League Settings
                              </h3>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                  <div>
                                      <label className="block text-sm font-medium text-slate-700 mb-1">League Name</label>
                                      <input type="text" defaultValue={selectedLeague.name} className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm bg-slate-50"/>
                                  </div>
                                  <div>
                                      <label className="block text-sm font-medium text-slate-700 mb-1">Season</label>
                                      <input type="text" defaultValue={selectedLeague.season} className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm bg-slate-50"/>
                                  </div>
                                  <div>
                                      <label className="block text-sm font-medium text-slate-700 mb-1">Status</label>
                                      <select defaultValue={selectedLeague.status} className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm bg-slate-50">
                                          <option>Upcoming</option>
                                          <option>Ongoing</option>
                                          <option>Completed</option>
                                      </select>
                                  </div>
                              </div>
                              <div className="mt-4 flex justify-end">
                                  <button className="flex items-center gap-2 px-4 py-2 bg-brand-600 text-white rounded-lg hover:bg-brand-700 text-sm font-medium">
                                      <Save size={16}/> Save Changes
                                  </button>
                              </div>
                          </div>

                          {/* Registration Management */}
                          <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                              <div className="p-4 border-b border-slate-200 bg-slate-50/50 flex justify-between items-center">
                                  <h3 className="font-bold text-slate-800 flex items-center gap-2">
                                      <ClipboardList size={20} className="text-brand-600"/> Team Registrations
                                  </h3>
                                  <span className="text-xs bg-white border px-2 py-1 rounded text-slate-500">
                                      {registrations.filter(r => r.leagueId === selectedLeague.id).length} Applicants
                                  </span>
                              </div>
                              <table className="w-full text-left text-sm">
                                  <thead className="bg-slate-50 text-slate-500 font-semibold border-b border-slate-200">
                                      <tr>
                                          <th className="px-6 py-4">Team Name</th>
                                          <th className="px-6 py-4">Coach</th>
                                          <th className="px-6 py-4">Contact</th>
                                          <th className="px-6 py-4">Status</th>
                                          <th className="px-6 py-4 text-right">Actions</th>
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
                                                      {reg.status}
                                                  </span>
                                              </td>
                                              <td className="px-6 py-4 text-right">
                                                  {reg.status === 'Pending' && (
                                                      <div className="flex items-center justify-end gap-2">
                                                          <button 
                                                            onClick={() => handleApproveRegistration(reg.id, true)}
                                                            className="p-1 text-emerald-600 hover:bg-emerald-50 rounded" title="Approve"
                                                          >
                                                              <CheckCircle size={18}/>
                                                          </button>
                                                          <button 
                                                            onClick={() => handleApproveRegistration(reg.id, false)}
                                                            className="p-1 text-red-600 hover:bg-red-50 rounded" title="Reject"
                                                          >
                                                              <XCircle size={18}/>
                                                          </button>
                                                      </div>
                                                  )}
                                              </td>
                                          </tr>
                                      ))}
                                      {registrations.filter(r => r.leagueId === selectedLeague.id).length === 0 && (
                                          <tr><td colSpan={5} className="text-center py-8 text-slate-400">No registrations pending</td></tr>
                                      )}
                                  </tbody>
                              </table>
                          </div>
                      </div>
                  )}
              </div>

              {/* MODAL: ADD MATCH */}
              {isAddMatchModalOpen && (
                  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4 animate-fade-in">
                      <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg overflow-hidden animate-scale-up">
                          <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-slate-50">
                              <h3 className="text-lg font-bold text-slate-900">Schedule New Match</h3>
                              <button onClick={() => setIsAddMatchModalOpen(false)} className="text-slate-400 hover:text-slate-600 p-1 rounded-full"><X size={20}/></button>
                          </div>
                          <form onSubmit={handleAddMatch} className="p-6 space-y-4">
                              <div className="grid grid-cols-2 gap-4">
                                  <div>
                                      <label className="block text-sm font-medium text-slate-700 mb-1">Home Team</label>
                                      <input type="text" className="w-full px-3 py-2 border border-slate-200 rounded-lg" value={newMatch.homeTeam} onChange={e => setNewMatch({...newMatch, homeTeam: e.target.value})} required/>
                                  </div>
                                  <div>
                                      <label className="block text-sm font-medium text-slate-700 mb-1">Away Team</label>
                                      <input type="text" className="w-full px-3 py-2 border border-slate-200 rounded-lg" value={newMatch.awayTeam} onChange={e => setNewMatch({...newMatch, awayTeam: e.target.value})} required/>
                                  </div>
                              </div>
                              <div className="grid grid-cols-2 gap-4">
                                  <div>
                                      <label className="block text-sm font-medium text-slate-700 mb-1">Date</label>
                                      <input type="date" className="w-full px-3 py-2 border border-slate-200 rounded-lg text-slate-600" value={newMatch.date} onChange={e => setNewMatch({...newMatch, date: e.target.value})} required/>
                                  </div>
                                  <div>
                                      <label className="block text-sm font-medium text-slate-700 mb-1">Time</label>
                                      <input type="time" className="w-full px-3 py-2 border border-slate-200 rounded-lg text-slate-600" value={newMatch.time} onChange={e => setNewMatch({...newMatch, time: e.target.value})} required/>
                                  </div>
                              </div>
                              <div>
                                  <label className="block text-sm font-medium text-slate-700 mb-1">Location</label>
                                  <input type="text" className="w-full px-3 py-2 border border-slate-200 rounded-lg" value={newMatch.location} onChange={e => setNewMatch({...newMatch, location: e.target.value})} />
                              </div>
                              <div className="pt-2">
                                  <button type="submit" className="w-full py-2 bg-brand-600 text-white rounded-lg hover:bg-brand-700 font-medium">Add Match</button>
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
                              <h3 className="text-lg font-bold text-slate-900">Update Match Result</h3>
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
                                  <label className="block text-sm font-medium text-slate-700 mb-2">Match Status</label>
                                  <select 
                                    className="w-full px-3 py-2 border border-slate-200 rounded-lg bg-white"
                                    value={editingMatch.status}
                                    onChange={e => setEditingMatch({...editingMatch, status: e.target.value as any})}
                                  >
                                      <option value="Scheduled">Scheduled</option>
                                      <option value="Live">Live</option>
                                      <option value="Finished">Finished</option>
                                  </select>
                              </div>

                              <button type="submit" className="w-full py-2 bg-brand-600 text-white rounded-lg hover:bg-brand-700 font-medium">
                                  Update Result
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
            {(['overview', 'leagues', 'teams', 'matches'] as const).map(tab => (
                <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-4 py-2 rounded-md text-sm font-medium transition-all capitalize ${
                        activeTab === tab ? 'bg-white text-brand-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'
                    }`}
                >
                    {tab}
                </button>
            ))}
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
                              <p className="text-slate-500 text-xs uppercase font-bold tracking-wider">Active Teams</p>
                              <h3 className="text-3xl font-bold text-slate-900 mt-1">{MOCK_TEAMS.length}</h3>
                          </div>
                          <div className="p-3 bg-blue-50 text-blue-600 rounded-lg"><Users size={20}/></div>
                      </div>
                  </div>
                  <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
                      <div className="flex justify-between items-start">
                          <div>
                              <p className="text-slate-500 text-xs uppercase font-bold tracking-wider">Matches This Month</p>
                              <h3 className="text-3xl font-bold text-slate-900 mt-1">12</h3>
                          </div>
                          <div className="p-3 bg-purple-50 text-purple-600 rounded-lg"><Calendar size={20}/></div>
                      </div>
                  </div>
                  <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
                      <div className="flex justify-between items-start">
                          <div>
                              <p className="text-slate-500 text-xs uppercase font-bold tracking-wider">Leagues Joined</p>
                              <h3 className="text-3xl font-bold text-slate-900 mt-1">{MOCK_LEAGUES.filter(l => l.status !== 'Completed').length}</h3>
                          </div>
                          <div className="p-3 bg-emerald-50 text-emerald-600 rounded-lg"><Activity size={20}/></div>
                      </div>
                  </div>
                  <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
                      <div className="flex justify-between items-start">
                          <div>
                              <p className="text-slate-500 text-xs uppercase font-bold tracking-wider">Trophies Won</p>
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
                              <div key={match.id} className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-100">
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
                          <Trophy size={20} className="text-amber-500"/> 正在进行的赛事
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
                                          <p className="text-xs text-slate-500">{league.season} Season</p>
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
                                  {league.status}
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
                                  <Target size={14}/> Season: {league.season}
                              </div>
                          </div>
                          <button 
                            onClick={() => setSelectedLeague(league)}
                            className="w-full py-2 bg-white border border-slate-200 text-slate-700 rounded-lg hover:bg-slate-50 hover:text-brand-600 font-medium transition-colors"
                          >
                              View Details
                          </button>
                      </div>
                  </div>
              ))}
              <button className="border-2 border-dashed border-slate-200 rounded-xl flex flex-col items-center justify-center text-slate-400 hover:border-brand-300 hover:text-brand-600 transition-all min-h-[560px]">
                  <Plus size={32} className="mb-2"/>
                  <span className="font-medium">Register New League</span>
              </button>
          </div>
      )}

      {/* TEAMS TAB */}
      {activeTab === 'teams' && (
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col flex-1 min-h-0">
              <div className="p-4 border-b border-slate-200 bg-slate-50/50 flex justify-between items-center">
                  <h3 className="font-bold text-slate-800">校队列表 (School Teams)</h3>
                  <button className="flex items-center px-3 py-1.5 bg-brand-600 text-white rounded-lg hover:bg-brand-700 text-sm font-medium">
                      <Plus size={16} className="mr-2"/> Create Team
                  </button>
              </div>
              <div className="overflow-y-auto flex-1">
                  <table className="w-full text-left">
                      <thead className="bg-slate-50 text-slate-500 text-xs uppercase font-semibold sticky top-0 z-10">
                          <tr>
                              <th className="px-6 py-4">Team Name</th>
                              <th className="px-6 py-4">Sport</th>
                              <th className="px-6 py-4">Coach</th>
                              <th className="px-6 py-4">Members</th>
                              <th className="px-6 py-4">Record (W-L)</th>
                              <th className="px-6 py-4 text-right">Actions</th>
                          </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                          {MOCK_TEAMS.map(team => (
                              <tr key={team.id} className="hover:bg-slate-50">
                                  <td className="px-6 py-4">
                                      <div className="font-bold text-slate-900">{team.name}</div>
                                      {team.rank && team.rank <= 3 && <span className="text-xs text-amber-600 flex items-center gap-1 mt-0.5"><Award size={10}/> Ranked #{team.rank}</span>}
                                  </td>
                                  <td className="px-6 py-4">
                                      <span className="flex items-center gap-2 text-sm text-slate-700">
                                          {getSportIcon(team.sport)} {team.sport}
                                      </span>
                                  </td>
                                  <td className="px-6 py-4 text-sm text-slate-600">{team.coach}</td>
                                  <td className="px-6 py-4 text-sm text-slate-600">{team.membersCount} Athletes</td>
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
                        placeholder="Search matches..." 
                        className="w-full pl-9 pr-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
                      />
                  </div>
                  <button className="px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-50 flex items-center gap-2">
                      <Filter size={16}/> Filter
                  </button>
              </div>

              {matches.map(match => (
                  <div key={match.id} className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                      <div className="flex justify-between items-center mb-4">
                          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">{MOCK_LEAGUES.find(l => l.id === match.leagueId)?.name}</span>
                          <span className={`text-xs px-2 py-0.5 rounded font-medium border ${getStatusColor(match.status)}`}>
                              {match.status}
                          </span>
                      </div>
                      
                      <div className="flex items-center justify-between">
                          <div className="flex-1 text-right pr-8">
                              <h3 className="text-xl font-bold text-slate-900">{match.homeTeam}</h3>
                              <p className="text-xs text-slate-500">Home</p>
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
                              <p className="text-xs text-slate-500">Away</p>
                          </div>
                      </div>
                      
                      <div className="mt-4 pt-4 border-t border-slate-100 flex justify-center text-xs text-slate-500 gap-6">
                          <span className="flex items-center gap-1"><MapPin size={12}/> {match.location}</span>
                          <span className="flex items-center gap-1"><Clock size={12}/> Full Time</span>
                      </div>
                  </div>
              ))}
          </div>
      )}
    </div>
  );
};