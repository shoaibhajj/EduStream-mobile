// lib/types.ts
// Shared data types — these shapes mirror what Supabase will return later.

export type AcademicYear = {
  id: string;
  name: string; // e.g. "Grade 10"
  subjectCount: number;
};

export type Subject = {
  id: string;
  yearId: string;
  name: string; // e.g. "Physics"
  courseCount: number;
};

export type Course = {
  id: string;
  subjectId: string;
  title: string;
  teacherName: string;
  price: number; // in local currency
  lessonCount: number;
  isFree: boolean; // true if at least one free preview lesson
};
