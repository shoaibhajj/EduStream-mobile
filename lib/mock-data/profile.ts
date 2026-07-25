// lib/mock-data/profile.ts
// Student and teacher profile queries.

import type { StudentProfile } from "../types";

const STUDENT_PROFILES: StudentProfile[] = [
  {
    id: "student-1",
    userId: "user-s1",
    name: "أحمد الخالد",
    gradeYear: "year-2",
    avatarUrl: null,
  },
  {
    id: "student-2",
    userId: "user-s2",
    name: "سارة مصطفى",
    gradeYear: "year-3",
    avatarUrl: null,
  },
  {
    id: "student-3",
    userId: "user-s3",
    name: "يوسف عبد الله",
    gradeYear: "year-4",
    avatarUrl: null,
  },
];

// In real app: userId comes from Clerk → look up profile in Supabase.
// For mock: we use the first student as "current user".
export async function getCurrentStudentProfile(): Promise<StudentProfile> {
  return STUDENT_PROFILES[0];
}

export async function getStudentProfileById(
  studentId: string
): Promise<StudentProfile | null> {
  return STUDENT_PROFILES.find((s) => s.id === studentId) ?? null;
}
