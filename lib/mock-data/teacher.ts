// lib/mock-data/teacher.ts
// Mock data for teacher-side queries.

import type { Teacher, PaymentInfo, Course, Enrollment } from "../types";
import { COURSES } from "./student";
import type { Lesson } from "../types";
import { LESSONS } from "./student"; 

const TEACHERS: Teacher[] = [
  {
    id: "teacher-1",
    userId: "user-t1",
    name: "د. عمر حسن",
    bio: "مدرّس فيزياء بخبرة 10 سنوات.",
    phoneNumber: "0912345678",
    avatarUrl: null,
  },
  {
    id: "teacher-2",
    userId: "user-t2",
    name: "أ. ليلى محمود",
    bio: "متخصصة في تدريس الرياضيات.",
    phoneNumber: "0923456789",
    avatarUrl: null,
  },
  {
    id: "teacher-3",
    userId: "user-t3",
    name: "أ. رامي سليم",
    bio: "مدرّس رياضيات للمرحلة الثانوية.",
    phoneNumber: "0934567890",
    avatarUrl: null,
  },
  {
    id: "teacher-4",
    userId: "user-t4",
    name: "د. هناء جمال",
    bio: "دكتوراه في الرياضيات التطبيقية.",
    phoneNumber: "0945678901",
    avatarUrl: null,
  },
];

// let PAYMENT_INFO: PaymentInfo[] = [
//   {
//     teacherId: "teacher-1",
//     instructions: "يرجى التحويل عبر سيريتيل كاش ثم إرسال صورة الإيصال.",
//     bankName: null,
//     accountNumber: null,
//     phoneNumber: "0912345678",
//   },
//   {
//     teacherId: "teacher-2",
//     instructions: "التحويل عبر البنك الأهلي أو سيريتيل كاش.",
//     bankName: "البنك الأهلي السوري",
//     accountNumber: "SY12-3456-7890-1234",
//     phoneNumber: "0923456789",
//   },
//   {
//     teacherId: "teacher-3",
//     instructions: "التحويل عبر MTN كاش فقط.",
//     bankName: null,
//     accountNumber: null,
//     phoneNumber: "0934567890",
//   },
//   {
//     teacherId: "teacher-4",
//     instructions: "الدفع نقداً أو عبر سيريتيل كاش.",
//     bankName: null,
//     accountNumber: null,
//     phoneNumber: "0945678901",
//   },
// ];

// Enrollments across all teacher courses (used by teacher dashboard)
const ENROLLMENTS: Enrollment[] = [
  {
    id: "enr-1",
    studentId: "student-1",
    courseId: "c-1",
    status: "confirmed",
    requestedAt: "2025-09-01T10:00:00Z",
    confirmedAt: "2025-09-02T08:00:00Z",
  },
  {
    id: "enr-2",
    studentId: "student-2",
    courseId: "c-1",
    status: "pending",
    requestedAt: "2025-09-05T14:30:00Z",
    confirmedAt: null,
  },
  {
    id: "enr-3",
    studentId: "student-3",
    courseId: "c-2",
    status: "pending",
    requestedAt: "2025-09-06T09:15:00Z",
    confirmedAt: null,
  },
  {
    id: "enr-4",
    studentId: "student-1",
    courseId: "c-3",
    status: "confirmed",
    requestedAt: "2025-08-20T11:00:00Z",
    confirmedAt: "2025-08-21T10:00:00Z",
  },
];

export async function getTeacherById(
  teacherId: string
): Promise<Teacher | null> {
  return TEACHERS.find((t) => t.id === teacherId) ?? null;
}

export async function getPaymentInfoByTeacher(
  teacherId: string
): Promise<PaymentInfo | null> {
  return PAYMENT_INFO.find((p) => p.teacherId === teacherId) ?? null;
}

export async function getEnrollmentsByCourse(
  courseId: string
): Promise<Enrollment[]> {
  return ENROLLMENTS.filter((e) => e.courseId === courseId);
}

export async function getPendingEnrollmentsByCourse(
  courseId: string
): Promise<Enrollment[]> {
  return ENROLLMENTS.filter(
    (e) => e.courseId === courseId && e.status === "pending"
  );
}

export async function getEnrollmentsByTeacher(
  teacherId: string,
  courses: Course[]
): Promise<Enrollment[]> {
  const courseIds = new Set(courses.map((c) => c.id));
  return ENROLLMENTS.filter((e) => courseIds.has(e.courseId));
}
// ── Teacher Home helpers ─────────────────────────────────────────────
// These are home-screen-specific queries. Replace with Supabase calls later.


// (You'll import from the place you define COURSES — see Step 1b)

export async function getTeacherCourses(teacherId: string): Promise<Course[]> {
  return COURSES.filter((c) => c.teacherId === teacherId);
}

export async function getTeacherHomeSummary(teacherId: string): Promise<{
  totalCourses: number;
  pendingCount: number;
  recentCourses: Course[];
}> {
  const courses = await getTeacherCourses(teacherId);
  const allEnrollments = await getEnrollmentsByTeacher(teacherId, courses);
  const pendingCount = allEnrollments.filter(
    (e) => e.status === "pending"
  ).length;
  const recentCourses = courses.slice(0, 3);
  return { totalCourses: courses.length, pendingCount, recentCourses };
}


// ── Course Management helpers ─────────────────────────────────────────
// These are mock-only. Replace with Supabase inserts/updates later.

// LESSONS is already exported from student.ts

// Returns all lessons for a course, sorted by orderIndex
export async function getLessonsByCourseForTeacher(
  courseId: string
): Promise<Lesson[]> {
  return LESSONS.filter((l) => l.courseId === courseId).sort(
    (a, b) => a.orderIndex - b.orderIndex
  );
}

// Mock "create course" — logs and returns a fake new Course id
export async function mockCreateCourse(data: {
  title: string;
  description: string;
  price: number;
  isFree: boolean;
  subjectId: string;
  teacherId: string;
}): Promise<{ id: string }> {
  console.log("[mock] createCourse →", data);
  return { id: `course-mock-${Date.now()}` };
}

// Mock "update course" — logs and resolves
export async function mockUpdateCourse(
  courseId: string,
  data: Partial<{ title: string; description: string; price: number; isFree: boolean }>
): Promise<void> {
  console.log("[mock] updateCourse →", courseId, data);
}

// Mock "create lesson" — logs and returns a fake id
export async function mockCreateLesson(data: {
  courseId: string;
  title: string;
  orderIndex: number;
  isPreview: boolean;
  durationSeconds: number | null;
  videoUrl: string | null;
}): Promise<{ id: string }> {
  console.log("[mock] createLesson →", data);
  return { id: `lesson-mock-${Date.now()}` };
}

// Mock "update lesson" — logs and resolves
export async function mockUpdateLesson(
  lessonId: string,
  data: Partial<{
    title: string;
    orderIndex: number;
    isPreview: boolean;
    durationSeconds: number | null;
    videoUrl: string | null;
  }>
): Promise<void> {
  console.log("[mock] updateLesson →", lessonId, data);
}

// Get a single course detail for the teacher (for edit form prefill)
export async function getTeacherCourseById(
  courseId: string
): Promise<Course | null> {
  return COURSES.find((c) => c.id === courseId) ?? null;
}

// Get a single lesson for the teacher (for edit form prefill)
export async function getTeacherLessonById(
  lessonId: string
): Promise<Lesson | null> {
  return LESSONS.find((l) => l.id === lessonId) ?? null;
}

// ─── Payment Info ─────────────────────────────────────────────────────



let PAYMENT_INFO: PaymentInfo[] = [
  {
    teacherId: "teacher-1",
    instructions: "يرجى التحويل على الرقم أدناه وإرسال صورة الإيصال.",
    bankName: "بنك سورية الدولي الإسلامي",
    accountNumber: "SY12 0000 1234 5678",
    phoneNumber: "0912345678",
  },
];

export async function getPaymentInfo(
  teacherId: string
): Promise<PaymentInfo | null> {
  return PAYMENT_INFO.find((p) => p.teacherId === teacherId) ?? null;
}

export async function updatePaymentInfo(
  teacherId: string,
  patch: Partial<Omit<PaymentInfo, "teacherId">>
): Promise<PaymentInfo> {
  const exists = PAYMENT_INFO.some((p) => p.teacherId === teacherId);
  if (exists) {
    PAYMENT_INFO = PAYMENT_INFO.map((p) =>
      p.teacherId === teacherId ? { ...p, ...patch } : p
    );
  } else {
    PAYMENT_INFO.push({ teacherId, instructions: "", bankName: null, accountNumber: null, phoneNumber: null, ...patch });
  }
  return PAYMENT_INFO.find((p) => p.teacherId === teacherId)!;
}