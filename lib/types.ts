// lib/types.ts
// Shared data types — these shapes mirror what Supabase will return later.

export type AcademicYear = {
  id: string;
  name: string;
  subjectCount: number;
};

export type Subject = {
  id: string;
  yearId: string;
  name: string;
  courseCount: number;
};

export type Course = {
  id: string;
  subjectId: string;
  title: string;
  teacherName: string;
  price: number;
  lessonCount: number;
  isFree: boolean;
};

export type Lesson = {
  id: string;
  courseId: string;
  title: string;
  orderIndex: number; // matches Supabase column: order_index
  isPreview: boolean; // matches Supabase column: is_preview
  durationSeconds: number | null; // null if not yet set
  videoUrl: string | null; // null for locked lessons in mock
};

export type CourseDetail = {
  id: string;
  subjectId: string;
  title: string;
  description: string;
  teacherName: string;
  price: number;
  lessonCount: number;
  isFree: boolean;
};
