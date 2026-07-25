// lib/mock-data/profile.ts
import type { StudentProfile, Teacher } from "../types";

// ─── Student ──────────────────────────────────────────────────────────

let STUDENT_PROFILES: StudentProfile[] = [
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
];

export async function getCurrentStudentProfile(): Promise<StudentProfile> {
  return STUDENT_PROFILES[0];
}

export async function getStudentProfileById(
  studentId: string
): Promise<StudentProfile | null> {
  return STUDENT_PROFILES.find((s) => s.id === studentId) ?? null;
}

export async function updateStudentProfile(
  studentId: string,
  patch: Partial<Pick<StudentProfile, "name" | "gradeYear">>
): Promise<StudentProfile> {
  STUDENT_PROFILES = STUDENT_PROFILES.map((s) =>
    s.id === studentId ? { ...s, ...patch } : s
  );
  return STUDENT_PROFILES.find((s) => s.id === studentId)!;
}

// ─── Teacher ──────────────────────────────────────────────────────────

let TEACHER_PROFILES: Teacher[] = [
  {
    id: "teacher-1",
    userId: "user-t1",
    name: "د. محمد العمر",
    bio: "معلم رياضيات بخبرة ١٢ عاماً.",
    phoneNumber: "0912345678",
    avatarUrl: null,
  },
];

export async function getCurrentTeacherProfile(): Promise<Teacher> {
  return TEACHER_PROFILES[0];
}

export async function updateTeacherProfile(
  teacherId: string,
  patch: Partial<Pick<Teacher, "name" | "bio" | "phoneNumber">>
): Promise<Teacher> {
  TEACHER_PROFILES = TEACHER_PROFILES.map((t) =>
    t.id === teacherId ? { ...t, ...patch } : t
  );
  return TEACHER_PROFILES.find((t) => t.id === teacherId)!;
}
