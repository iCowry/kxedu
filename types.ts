import React from 'react';

export interface Tenant {
  id: string;
  name: string;
  plan: 'Basic' | 'Pro' | 'Enterprise';
  status: 'Active' | 'Inactive';
  studentCount: number;
  renewalDate: string;
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
  deadline: string;
  submittedCount: number;
  totalCount: number;
  status: 'Draft' | 'Published' | 'Graded';
  publisher: string;
  description?: string;
}

export interface HomeworkSubmission {
  studentId: string;
  studentName: string;
  status: 'Submitted' | 'Late' | 'Missing' | 'Graded';
  submitTime?: string;
  score?: number;
  comment?: string;
  attachmentUrl?: string;
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