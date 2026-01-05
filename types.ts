
import React from 'react';

// --- ROLE DEFINITIONS ---
export type UserRole = 
  | 'SuperAdmin'       // 平台超管
  | 'TenantAdmin'      // 租户/校级管理员
  | 'AcademicDirector' // 教务主任
  | 'GradeDirector'    // 年级主任
  | 'HomeroomTeacher'  // 班主任
  | 'SubjectTeacher'   // 任课老师
  | 'Student'          // 学生
  | 'Parent';          // 家长

export interface CurrentUser {
  id: string;
  name: string;
  role: UserRole;
  avatar?: string;
  grade?: string; // For Directors/Teachers/Students
  class?: string; // For Homeroom/Students
}

export interface Tenant {
  id: string;
  name: string;
  type: 'Group' | 'School'; // New: Distinguish between Group and School
  plan: 'Basic' | 'Pro' | 'Enterprise';
  status: 'Active' | 'Inactive';
  studentCount: number;
  renewalDate: string;
  parentId?: string; // New: Link to parent
  children?: Tenant[]; // New: Nested children for hierarchy
}

export interface Student {
  id: string;
  name: string;
  grade: string;
  class: string; // Acts as Class Name or ID for linking
  gpa: number;
  attendance: number;
  status: 'Active' | 'Suspended' | 'Graduated';
  avatar?: string;
  gender?: 'Male' | 'Female';
  dob?: string;
  address?: string;
  parentContact?: string;
  // New fields for rich profile
  tags?: string[]; // e.g., 'Math Whiz', 'Student Council'
  targetUniversities?: { name: string; probability: number }[];
}

export interface Course {
  id: string;
  name: string;
  code: string;
  department: string;
  teacher: string;
  schedule: string;
  credits: number;
  enrolled: number;
  capacity: number;
  type: 'Required' | 'Elective';
}

export interface Staff {
  id: string;
  name: string;
  role: 'Teacher' | 'Admin' | 'Support';
  department: string;
  phone: string;
  status: 'Active' | 'Leave';
  joinDate: string;
}

export interface Transaction {
  id: string;
  studentName: string;
  type: 'Tuition' | 'Dormitory' | 'Material' | 'Activity';
  amount: number;
  date: string;
  status: 'Paid' | 'Pending' | 'Overdue';
}

export interface Asset {
  id: string;
  name: string;
  category: 'Electronics' | 'Furniture' | 'Vehicle' | 'Other';
  status: 'In Use' | 'Idle' | 'Maintenance' | 'Scrapped';
  location: string;
  purchaseDate: string;
  value: number;
}

export interface Reservation {
  id: string;
  resourceName: string;
  applicant: string;
  type: 'Room' | 'Equipment' | 'Vehicle';
  startTime: string;
  endTime: string;
  status: 'Approved' | 'Pending' | 'Rejected';
}

export interface Announcement {
  id: string;
  title: string;
  content: string;
  targetGroup: 'All' | 'Teachers' | 'Students' | 'Parents';
  targetDetail?: string;
  priority: 'Normal' | 'High';
  sender: string;
  publishDate: string;
  readCount: number;
  totalCount: number;
}

export interface Alumni {
  id: string;
  name: string;
  graduationYear: number;
  degree: string;
  currentCompany?: string;
  email: string;
}

export interface Award {
  id: string;
  studentName?: string; // Optional if linked to class
  className?: string; // Optional if linked to student
  competition: string;
  rank: string;
  date: string;
  advisor: string;
}

export interface GradeLevel {
  id: string;
  name: string; 
  headOfGrade: string; 
  studentCount: number;
  classCount: number;
  academicYear: string;
}

export interface SchoolClass {
  id: string;
  name: string; 
  gradeId: string;
  homeroomTeacher: string;
  room: string;
  studentCount: number;
  capacity: number;
  slogan?: string; // Class Motto
}

export interface SubjectTeacher {
  subject: string;
  teacherName: string;
}

export interface LeaveRecord {
  id: string;
  type: 'Sick' | 'Personal';
  startDate: string;
  endDate: string;
  reason: string;
  status: 'Approved' | 'Pending' | 'Rejected';
}

export interface AdmissionScore {
  year: number;
  batch: string; // e.g. '统招', '指标到校' for High School; '本科一批' for Uni
  score: number;
  rankRequirement?: number; // Optional rank requirement in the city/province
}

// New complex structure for University Admissions
export interface UniAdmissionRecord {
  id: string;
  province: string; // e.g., 'Beijing', 'Henan'
  year: number;
  type: '物理组' | '历史组' | '理科' | '文科' | '综合改革'; 
  batch: string; // e.g., '本科一批', '强基计划'
  major: string; // e.g., '计算机科学与技术', '学校投档线'
  score: number;
  rank?: number;
}

export interface University {
  rank: number;
  name: string;
  englishName: string;
  location: string;
  tags: string[]; // e.g., '985', '211', 'Double First-Class'
  score: number;
  logoColor: string;
  // New detailed fields
  keyLabs?: number; // 国家重点实验室数量
  aPlusCount?: number; // A+ 学科数量
  academicians?: number; // 院士数量
  establishedYear?: number; // 建校年份
  description?: string; // 学校简介
  subjectRatings?: { name: string; grade: 'A+' | 'A' | 'A-' | 'B+' | 'B' }[]; // 学科评估
  admissionRecords?: UniAdmissionRecord[]; // Updated field for detailed admission data
}

export interface HighSchool {
  rank: number;
  name: string;
  city: string;
  district: string;
  tags: string[]; // e.g., 'Provincial Model'
  enrollmentRate: number; // 985/211 admission rate
  topScore?: number; // Highest Gaokao score this year
  admissionScores?: AdmissionScore[]; // Historical Zhongkao scores
  description?: string;
  address?: string;
  phone?: string;
}

export interface NavItem {
  label: string;
  path: string;
  icon: React.ComponentType<any>;
  allowedRoles?: UserRole[]; // RBAC
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
}

// --- NEW TYPES FOR RICH STUDENT PROFILE ---
export interface StudentCourse {
  id: string;
  name: string;
  teacher: string;
  currentScore: number;
  classAverage: number;
  rank: number;
  trend: 'up' | 'down' | 'stable';
}

export interface TimelineEvent {
  id: string;
  title: string;
  timestamp: string;
  type: 'Academic' | 'Behavior' | 'Activity' | 'Award';
  description?: string;
}

export interface TeacherComment {
  id: string;
  teacher: string;
  subject: string;
  date: string;
  content: string;
  tags: string[];
}

// --- NEW TYPES FOR LEARNING MODULE ---
export interface Homework {
  id: string;
  title: string;
  subject: string;
  targetClass: string;
  deadline: string; // Used for Normal, or end of vacation
  submittedCount: number;
  totalCount: number;
  status: 'Draft' | 'Published' | 'Graded';
  publisher: string;
  description?: string;
  // New fields
  type: 'Normal' | 'Vacation' | 'DailyCheckIn';
  startDate?: string;
  endDate?: string;
}

export interface CheckInLog {
  date: string;
  status: 'Completed' | 'Missed';
  imageUrl?: string;
  timestamp?: string;
  comment?: string;
}

export interface HomeworkSubmission {
  studentId: string;
  studentName: string;
  status: 'Submitted' | 'Late' | 'Missing' | 'Graded' | 'InProgress';
  submitTime?: string;
  score?: number;
  comment?: string;
  attachmentUrl?: string;
  checkInLogs?: CheckInLog[];
}

export interface Exam {
  id: string;
  name: string;
  type: 'Quiz' | 'Midterm' | 'Final' | 'Mock';
  subject: string; // 'All' for comprehensive
  date: string;
  targetGrades: string[];
  status: 'Scheduled' | 'Ongoing' | 'Grading' | 'Completed';
  avgScore?: number;
  maxScore?: number;
  minScore?: number;
}

export interface ExamResult {
  studentId: string;
  studentName: string;
  score: number;
  rank: number;
  change: number; // Rank change
}

// --- COMPETITION MODULE TYPES ---
export interface Competition {
  id: string;
  name: string;
  subject: 'Math' | 'Physics' | 'Chemistry' | 'Informatics';
  level: 'Provincial' | 'National' | 'International';
  date: string;
  location?: string;
  status: 'Upcoming' | 'Ongoing' | 'Completed';
  organizer?: string;
}

export interface TrainingPlan {
  id: string;
  subject: 'Math' | 'Physics' | 'Chemistry' | 'Informatics';
  phase: 'Basic' | 'Advanced' | 'Sprint';
  title: string;
  startDate: string;
  endDate: string;
  description: string;
  coach: string;
  linkedQuestionIds?: string[];
  questionCount?: number;
}

// --- KNOWLEDGE BASE TYPES ---
export interface KnowledgeNode {
  id: string;
  title: string;
  type: 'Chapter' | 'Section' | 'Point';
  stage: 'Primary' | 'Middle' | 'High';
  subject: string; // e.g. 'Math', 'Physics'
  difficulty?: 1 | 2 | 3 | 4 | 5; // 1: Easy, 5: Hard
  importance?: 'Core' | 'Optional' | 'Expanded'; // 核心/选修/拓展
  parentId?: string;
  description?: string;
  children?: KnowledgeNode[]; // Helper for recursive rendering
}

// --- QUESTION BANK TYPES ---
export interface Question {
  id: string;
  type: 'SingleChoice' | 'MultipleChoice' | 'TrueFalse' | 'FillBlank' | 'Essay';
  content: string;
  options?: string[]; // For choices
  answer: string;
  difficulty: 1 | 2 | 3 | 4 | 5;
  subject: string;
  grade: string; // e.g. "High School" or "Grade 10"
  knowledgePoint?: string; // Linked knowledge point title
  knowledgePointId?: string; // ID Link
  tags?: string[];
  createdAt: string;
  author: string;
  analysis?: string; // Detailed solution/analysis
  source?: string; // e.g. "2024 Beijing Final"
}

export interface ExamPaperStructure {
  name: string; // e.g. "第一部分 选择题"
  desc: string; // e.g. "共8小题，每题5分"
  score: number;
}

export interface ExamPaper {
  id: string;
  title: string;
  type: 'Mock' | 'Real' | 'Exercise'; // 模拟卷 / 真题卷 / 课后练习
  year: number;
  province?: string;
  subject: string;
  grade: string;
  difficulty: number;
  downloadCount: number;
  createdAt: string;
  // Extended fields
  timeLimit?: number; // minutes
  totalScore?: number;
  structure?: ExamPaperStructure[];
}

export interface TextbookChapterResource {
  id: string;
  type: 'PPT' | 'Video' | 'PDF' | 'Word';
  name: string;
  size: string;
}

export interface TextbookChapter {
  id: string;
  title: string;
  resources: TextbookChapterResource[];
  knowledgePoints?: string[]; // Linked knowledge points for this chapter
}

export interface TextbookResource {
  id: string;
  title: string;
  subject: string;
  grade: string;
  version: string; // e.g. 人教版, 北师大版, 高思版
  type: 'Guide' | 'Workbook' | 'MicroClass' | 'Textbook'; // 教材解读 / 练习册 / 微课 / 课本
  author: string;
  downloadCount: number;
  // Extended fields
  coverImage?: string; // Mock URL or placeholder color
  description?: string;
  chapters?: TextbookChapter[];
}

// --- TEACHING & TUTORING TYPES ---
export interface TutoringSession {
  id: string;
  studentName: string;
  teacherName: string;
  subject: string;
  date: string;
  startTime: string;
  duration: number; // minutes
  status: 'Scheduled' | 'Completed' | 'Cancelled';
  notes?: string;
  location?: string; // e.g. "Room 303" or "Online"
}

export interface LearningResource {
  id: string;
  title: string;
  type: 'PDF' | 'Video' | 'PPT' | 'Link';
  subject: string;
  url: string; // Mock url
  size?: string;
  uploadDate: string;
  author: string;
  downloads: number;
}

// --- SPORTS MODULE TYPES ---
export interface SportLeague {
  id: string;
  name: string; // e.g. "High School Basketball League (HBL)"
  sport: 'Basketball' | 'Football' | 'Volleyball' | 'Tennis' | 'Badminton' | 'Swimming' | 'TrackAndField';
  season: string; // e.g. "2024-2025"
  status: 'Upcoming' | 'Ongoing' | 'Completed';
  startDate: string;
  endDate: string;
}

export interface LeagueRegistration {
  id: string;
  leagueId: string;
  teamName: string;
  coach: string;
  contact: string;
  status: 'Pending' | 'Approved' | 'Rejected';
  submitDate: string;
}

export interface SportTeam {
  id: string;
  name: string;
  sport: string; // Linked to SportLeague sport
  coach: string;
  membersCount: number;
  wins: number;
  losses: number;
  draws?: number;
  rank?: number;
}

export interface MatchEvent {
  id: string;
  time: string; // e.g. "12'" or "Q2 04:30"
  type: 'Goal' | 'Point' | 'Foul' | 'Card' | 'Sub' | 'Timeout';
  description: string;
  team: 'Home' | 'Away';
  player?: string;
}

export interface PlayerGameStats {
  id: string;
  name: string;
  number: number;
  team: 'Home' | 'Away';
  // Generic stats map (e.g. { Pts: 20, Reb: 5 } or { Goals: 1, Asst: 0 })
  stats: Record<string, string | number>; 
}

export interface SportMatch {
  id: string;
  leagueId: string;
  homeTeam: string;
  awayTeam: string;
  date: string;
  time: string;
  location: string;
  scoreHome?: number;
  scoreAway?: number;
  status: 'Scheduled' | 'Live' | 'Finished';
}
