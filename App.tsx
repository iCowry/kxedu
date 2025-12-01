import React from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Sidebar } from './components/Sidebar';
import { Dashboard } from './pages/Dashboard';
import { TenantList } from './pages/TenantList';
import { StudentList } from './pages/StudentList';
import { StudentDetail } from './pages/StudentDetail'; 
import { Analytics } from './pages/Analytics';
import { StaffList } from './pages/StaffList';
import { Academic } from './pages/Academic';
import { Finance } from './pages/Finance';
import { Campus } from './pages/Campus';
import { Communication } from './pages/Communication';
import { Extension } from './pages/Extension';
import { Settings } from './pages/Settings';
import { ClassManagement } from './pages/ClassManagement';
import { ClassDetail } from './pages/ClassDetail';
import { Rankings } from './pages/Rankings'; 
import { UniversityDetail } from './pages/UniversityDetail'; 
import { HighSchoolDetail } from './pages/HighSchoolDetail'; 
import { Learning } from './pages/Learning'; 
import { HomeworkDetail } from './pages/HomeworkDetail';
import { ExamDetail } from './pages/ExamDetail';
import { CompetitionPlanning } from './pages/CompetitionPlanning';
import { KnowledgeBase } from './pages/KnowledgeBase';
import { QuestionBank } from './pages/QuestionBank';
import { TeachingSupport } from './pages/TeachingSupport';
import { AIChatBot } from './components/AIChatBot';

const App: React.FC = () => {
  return (
    <Router>
      <div className="flex h-screen bg-slate-50">
        <Sidebar />
        
        <main className="flex-1 ml-64 overflow-y-auto">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/tenants" element={<TenantList />} />
            
            <Route path="/organization" element={<ClassManagement />} />
            <Route path="/organization/class/:id" element={<ClassDetail />} /> 
            
            <Route path="/rankings" element={<Rankings />} /> 
            <Route path="/rankings/university/:id" element={<UniversityDetail />} />
            <Route path="/rankings/highschool/:id" element={<HighSchoolDetail />} />

            <Route path="/competitions" element={<CompetitionPlanning />} />

            <Route path="/students" element={<StudentList />} />
            <Route path="/students/:id" element={<StudentDetail />} /> 
            
            <Route path="/learning" element={<Learning />} />
            <Route path="/learning/homework/:id" element={<HomeworkDetail />} />
            <Route path="/learning/exam/:id" element={<ExamDetail />} />
            
            <Route path="/research" element={<KnowledgeBase />} />
            <Route path="/questions" element={<QuestionBank />} />
            <Route path="/tutoring" element={<TeachingSupport />} />

            <Route path="/staff" element={<StaffList />} />
            <Route path="/academic" element={<Academic />} />
            <Route path="/finance" element={<Finance />} />
            <Route path="/campus" element={<Campus />} />
            <Route path="/communication" element={<Communication />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/extension" element={<Extension />} />
            <Route path="/settings" element={<Settings />} />
            
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
        
        <AIChatBot />
      </div>
    </Router>
  );
};

export default App;