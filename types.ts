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
  admissionScores?: AdmissionScore[]; // 历年分数线
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