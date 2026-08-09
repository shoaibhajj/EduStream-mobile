// lib/types.ts
// Shared data types — shapes mirror what Supabase will return later.
// snake_case column names are noted in comments where they differ from camelCase.

// ─── Academic Hierarchy ───────────────────────────────────────────────

export type AcademicYear = {
  id: string;
  name: string; // e.g. "الصف التاسع"
  subjectCount: number;
};

export type Subject = {
  id: string;
  yearId: string; // FK → academic_years.id
  name: string;
  courseCount: number;
};

// ─── Course ───────────────────────────────────────────────────────────

export type Course = {
  id: string;
  subjectId: string; // FK → subjects.id
  teacherId: string; // FK → teachers.id
  title: string;
  teacherName: string; // denormalised for display; comes from join in real query
  price: number; // in SYP (Syrian Pounds)
  lessonCount: number;
  isFree: boolean;
};

export type CourseDetail = {
  id: string;
  subjectId: string;
  teacherId: string;
  title: string;
  description: string;
  teacherName: string;
  price: number;
  lessonCount: number;
  isFree: boolean;
  thumbnailUrl: string | null;
};

// ─── Lesson ───────────────────────────────────────────────────────────

export type Lesson = {
  id: string;
  courseId: string; // FK → courses.id
  title: string;
  orderIndex: number; // column: order_index
  isPreview: boolean; // column: is_preview
  durationSeconds: number | null;
  videoUrl: string | null;
};

// ─── Teacher ──────────────────────────────────────────────────────────

export type Teacher = {
  id: string;
  userId: string; // FK → auth.users.id (Clerk user id)
  name: string;
  bio: string | null;
  phoneNumber: string | null; // used for manual payment info
  avatarUrl: string | null;
};

// ─── Student Profile ──────────────────────────────────────────────────

export type StudentProfile = {
  id: string;
  userId: string; // FK → auth.users.id
  name: string;
  gradeYear: string | null; // e.g. "year-1"
  avatarUrl: string | null;
};

// ─── Enrollment ───────────────────────────────────────────────────────

export type EnrollmentStatus = "pending" | "confirmed" | "rejected";

export type Enrollment = {
  id: string;
  studentId: string; // FK → student_profiles.id
  courseId: string; // FK → courses.id
  status: EnrollmentStatus;
  requestedAt: string; // ISO date string
  confirmedAt: string | null;
};

// ─── Payment Info ─────────────────────────────────────────────────────

export type PaymentInfo = {
  teacherId: string;
  instructions: string; // payment instructions text shown to student
  bankName: string | null;
  accountNumber: string | null;
  phoneNumber: string | null;
};


// ─── Auth / Profile (real backend-backed) ─────────────────────────────

export type AppRole = "student" | "teacher" | "admin";

export type TeacherApprovalStatus =
  | "not_applicable"
  | "pending"
  | "approved"
  | "rejected";

export type ApiProfile = {
  id: string; // DB profile id
  clerkUserId: string; // profiles.clerk_user_id
  role: AppRole;
  displayName: string | null;
  email: string | null;
  avatarUrl: string | null;
  hasActiveSubscription: boolean;
  teacherApprovalStatus: TeacherApprovalStatus;
  createdAt: string;
  updatedAt: string;
};

export type ProfileMeResponse = {
  actor: ApiProfile;
};