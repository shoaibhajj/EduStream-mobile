// lib/mock-data/student.ts
// Mock data functions — replace the body of each with a real Supabase query
// when the backend phase begins. The return types must never change.

import type { AcademicYear, Subject, Course } from "../types";

export async function getAcademicYears(): Promise<AcademicYear[]> {
  return [
    { id: "year-1", name: "Grade 9", subjectCount: 5 },
    { id: "year-2", name: "Grade 10", subjectCount: 6 },
    { id: "year-3", name: "Grade 11", subjectCount: 7 },
    { id: "year-4", name: "Grade 12", subjectCount: 6 },
  ];
}

export async function getSubjectsByYear(yearId: string): Promise<Subject[]> {
  const all: Subject[] = [
    { id: "sub-1", yearId: "year-1", name: "Mathematics", courseCount: 3 },
    { id: "sub-2", yearId: "year-1", name: "Science", courseCount: 2 },
    { id: "sub-3", yearId: "year-2", name: "Physics", courseCount: 4 },
    { id: "sub-4", yearId: "year-2", name: "Chemistry", courseCount: 3 },
    { id: "sub-5", yearId: "year-2", name: "Mathematics", courseCount: 5 },
    { id: "sub-6", yearId: "year-3", name: "Biology", courseCount: 2 },
    { id: "sub-7", yearId: "year-3", name: "Physics", courseCount: 3 },
    { id: "sub-8", yearId: "year-4", name: "Chemistry", courseCount: 4 },
  ];
  return all.filter((s) => s.yearId === yearId);
}

export async function getCoursesBySubject(
  subjectId: string
): Promise<Course[]> {
  const all: Course[] = [
    {
      id: "c-1",
      subjectId: "sub-3",
      title: "Physics Fundamentals",
      teacherName: "Dr. Omar",
      price: 15000,
      lessonCount: 12,
      isFree: true,
    },
    {
      id: "c-2",
      subjectId: "sub-3",
      title: "Advanced Mechanics",
      teacherName: "Ms. Layla",
      price: 20000,
      lessonCount: 8,
      isFree: false,
    },
    {
      id: "c-3",
      subjectId: "sub-5",
      title: "Algebra Mastery",
      teacherName: "Mr. Rami",
      price: 12000,
      lessonCount: 10,
      isFree: true,
    },
    {
      id: "c-4",
      subjectId: "sub-5",
      title: "Calculus Intro",
      teacherName: "Dr. Hana",
      price: 18000,
      lessonCount: 9,
      isFree: false,
    },
    {
      id: "c-5",
      subjectId: "sub-1",
      title: "Math Basics",
      teacherName: "Mr. Karim",
      price: 10000,
      lessonCount: 6,
      isFree: true,
    },
  ];
  return all.filter((c) => c.subjectId === subjectId);
}
