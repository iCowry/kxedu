
import React, { useState } from 'react';
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
import { Sports } from './pages/Sports';
import { AIChatBot } from './components/AIChatBot';
import { CurrentUser, UserRole, Tenant } from './types';

// --- MOCK TENANT HIERARCHY DATA ---
const MOCK_HIERARCHICAL_TENANTS: Tenant[] = [
  {
    id: 'G001',
    name: '未来教育集团 (总部)',
    type: 'Group',
    plan: 'Enterprise',
    status: 'Active',
    studentCount: 15000,
    renewalDate: '2026-01-01',
    children: [
      {
        id: 'G001-R1',
        name: '华东大区',
        type: 'Group',
        plan: 'Enterprise',
        status: 'Active',
        studentCount: 8000,
        renewalDate: '2026-01-01',
        parentId: 'G001',
        children: [
          { id: 'T001', name: '上海未来国际学校', type: 'School', parentId: 'G001-R1', plan: 'Enterprise', status: 'Active', studentCount: 3500, renewalDate: '2026-01-01' },
          { id: 'T002', name: '杭州未来双语小学', type: 'School', parentId: 'G001-R1', plan: 'Pro', status: 'Active', studentCount: 1200, renewalDate: '2025-06-01' },
        ]
      },
      {
        id: 'G001-R2',
        name: '华北大区',
        type: 'Group',
        plan: 'Enterprise',
        status: 'Active',
        studentCount: 4000,
        renewalDate: '2026-01-01',
        parentId: 'G001',
        children: [
          { id: 'T003', name: '北京未来艺术高中', type: 'School', parentId: 'G001-R2', plan: 'Pro', status: 'Active', studentCount: 800, renewalDate: '2025-09-01' },
        ]
      }
    ]
  },
  {
    id: 'G002',
    name: '博雅教育联盟',
    type: 'Group',
    plan: 'Pro',
    status: 'Active',
    studentCount: 5000,
    renewalDate: '2025-12-31',
    children: [
      { id: 'T004', name: '博雅实验中学', type: 'School', parentId: 'G002', plan: 'Pro', status: 'Active', studentCount: 2000, renewalDate: '2025-12-31' }
    ]
  },
  {
    id: 'T005',
    name: '独立示范小学',
    type: 'School',
    plan: 'Basic',
    status: 'Active',
    studentCount: 600,
    renewalDate: '2024-12-31',
  }
];

const App: React.FC = () => {
  // Global User State for RBAC Demo
  const [currentUser, setCurrentUser] = useState<CurrentUser>({
    id: 'ADMIN-001',
    name: 'Super Admin',
    role: 'SuperAdmin',
    avatar: 'A'
  });

  // Global Tenant State (Context)
  // Default to a school within a region for realistic context
  const [currentTenant, setCurrentTenant] = useState<Tenant>(MOCK_HIERARCHICAL_TENANTS[0].children![0].children![0]);

  const handleSwitchRole = (role: UserRole) => {
    let newUser: CurrentUser = { id: 'U-001', name: 'User', role: role, avatar: 'U' };
    
    switch(role) {
      case 'SuperAdmin':
        newUser = { id: 'ADMIN-001', name: 'Super Admin', role: 'SuperAdmin', avatar: 'A' };
        break;
      case 'TenantAdmin':
        newUser = { id: 'SCH-ADMIN', name: 'Principal Zhang', role: 'TenantAdmin', avatar: 'P' };
        break;
      case 'AcademicDirector':
        newUser = { id: 'DIR-001', name: 'Director Li', role: 'AcademicDirector', avatar: 'D' };
        break;
      case 'HomeroomTeacher':
        newUser = { id: 'TEA-001', name: 'Sarah Chen', role: 'HomeroomTeacher', avatar: 'S', class: 'Class 1' };
        break;
      case 'Student':
        newUser = { id: 'STU-2023', name: 'Zhang Xiaoming', role: 'Student', avatar: 'Z', grade: 'Grade 10', class: 'Class 1' };
        break;
      case 'Parent':
        newUser = { id: 'PAR-001', name: 'Mr. Zhang', role: 'Parent', avatar: 'P' };
        break;
      default:
        newUser = { id: 'USER-001', name: 'Demo User', role: role, avatar: 'U' };
    }
    setCurrentUser(newUser);
  };

  const handleSwitchTenant = (tenant: Tenant) => {
    setCurrentTenant(tenant);
    // In a real app, this would trigger data refetching for the new tenant context
    console.log(`Switched to tenant: ${tenant.name} (${tenant.id})`);
  };

  return (
    <Router>
      <div className="flex h-screen bg-slate-50">
        {/* Pass user, tenant context, and handlers to Sidebar */}
        <Sidebar 
          currentUser={currentUser} 
          onSwitchRole={handleSwitchRole} 
          currentTenant={currentTenant}
          availableTenants={MOCK_HIERARCHICAL_TENANTS}
          onSwitchTenant={handleSwitchTenant}
        />
        
        <main className="flex-1 ml-64 overflow-y-auto">
          <Routes>
            {/* Dashboard receives user props to render role-specific view */}
            <Route path="/" element={<Dashboard currentUser={currentUser} />} />
            
            <Route path="/tenants" element={<TenantList />} />
            
            <Route path="/organization" element={<ClassManagement />} />
            <Route path="/organization/class/:id" element={<ClassDetail />} /> 
            
            {/* Separate Routes for Universities and High Schools */}
            <Route path="/universities" element={<Rankings view="universities" />} />
            <Route path="/universities/:id" element={<UniversityDetail />} />
            
            <Route path="/highschools" element={<Rankings view="highschools" />} />
            <Route path="/highschools/:id" element={<HighSchoolDetail />} />

            <Route path="/competitions" element={<CompetitionPlanning />} />

            <Route path="/students" element={<StudentList />} />
            <Route path="/students/:id" element={<StudentDetail />} /> 
            
            <Route path="/learning" element={<Learning />} />
            <Route path="/learning/homework/:id" element={<HomeworkDetail />} />
            <Route path="/learning/exam/:id" element={<ExamDetail />} />
            
            <Route path="/research" element={<KnowledgeBase />} />
            <Route path="/questions" element={<QuestionBank />} />
            <Route path="/tutoring" element={<TeachingSupport />} />
            <Route path="/sports" element={<Sports />} />

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
