// lib/mock-data/student.ts
// Student-facing data queries.
// All functions are async so they can be swapped for Supabase calls later.

import type { Course, CourseDetail, Lesson, Enrollment } from "../types";
export { getAcademicYears, getSubjectsByYear } from "./shared";

// ─── Courses ──────────────────────────────────────────────────────────

const COURSES: Course[] = [
  {
    id: "c-1",
    subjectId: "sub-4",
    teacherId: "teacher-1",
    title: "أساسيات الفيزياء",
    teacherName: "د. عمر حسن",
    price: 15000,
    lessonCount: 12,
    isFree: false,
  },
  {
    id: "c-2",
    subjectId: "sub-4",
    teacherId: "teacher-2",
    title: "الميكانيكا المتقدمة",
    teacherName: "أ. ليلى محمود",
    price: 20000,
    lessonCount: 8,
    isFree: false,
  },
  {
    id: "c-3",
    subjectId: "sub-6",
    teacherId: "teacher-3",
    title: "إتقان الجبر",
    teacherName: "أ. رامي سليم",
    price: 12000,
    lessonCount: 10,
    isFree: false,
  },
  {
    id: "c-4",
    subjectId: "sub-6",
    teacherId: "teacher-4",
    title: "مدخل إلى التفاضل والتكامل",
    teacherName: "د. هناء جمال",
    price: 18000,
    lessonCount: 9,
    isFree: false,
  },
  {
    id: "c-5",
    subjectId: "sub-1",
    teacherId: "teacher-3",
    title: "رياضيات أساسية",
    teacherName: "أ. رامي سليم",
    price: 10000,
    lessonCount: 6,
    isFree: false,
  },
  {
    id: "c-6",
    subjectId: "sub-5",
    teacherId: "teacher-2",
    title: "أساسيات الكيمياء",
    teacherName: "أ. ليلى محمود",
    price: 14000,
    lessonCount: 8,
    isFree: false,
  },
];

const COURSE_DETAILS: CourseDetail[] = [
  {
    id: "c-1",
    subjectId: "sub-4",
    teacherId: "teacher-1",
    title: "أساسيات الفيزياء",
    description:
      "دورة شاملة تغطي مفاهيم الفيزياء الأساسية للصف العاشر: الحركة، القوى، الطاقة، والكهرباء. مناسبة للطلاب الراغبين في بناء أساس متين.",
    teacherName: "د. عمر حسن",
    price: 15000,
    lessonCount: 12,
    isFree: false,
    thumbnailUrl: null,
  },
  {
    id: "c-2",
    subjectId: "sub-4",
    teacherId: "teacher-2",
    title: "الميكانيكا المتقدمة",
    description:
      "تغطي الدورة موضوعات الميكانيكا المتقدمة بما فيها الديناميكا الدورانية وقوانين الحفاظ.",
    teacherName: "أ. ليلى محمود",
    price: 20000,
    lessonCount: 8,
    isFree: false,
    thumbnailUrl: null,
  },
  {
    id: "c-3",
    subjectId: "sub-6",
    teacherId: "teacher-3",
    title: "إتقان الجبر",
    description:
      "تدريب مكثف على الجبر يشمل المعادلات، المتباينات، والدوال. مناسب لطلاب الصف العاشر.",
    teacherName: "أ. رامي سليم",
    price: 12000,
    lessonCount: 10,
    isFree: false,
    thumbnailUrl: null,
  },
  {
    id: "c-4",
    subjectId: "sub-6",
    teacherId: "teacher-4",
    title: "مدخل إلى التفاضل والتكامل",
    description: "مقدمة واضحة لمفاهيم التفاضل والتكامل مع تمارين تطبيقية.",
    teacherName: "د. هناء جمال",
    price: 18000,
    lessonCount: 9,
    isFree: false,
    thumbnailUrl: null,
  },
  {
    id: "c-5",
    subjectId: "sub-1",
    teacherId: "teacher-3",
    title: "رياضيات أساسية",
    description: "تغطية كاملة للرياضيات الأساسية لطلاب الصف التاسع.",
    teacherName: "أ. رامي سليم",
    price: 10000,
    lessonCount: 6,
    isFree: false,
    thumbnailUrl: null,
  },
  {
    id: "c-6",
    subjectId: "sub-5",
    teacherId: "teacher-2",
    title: "أساسيات الكيمياء",
    description:
      "مفاهيم الكيمياء الأساسية: الذرة، الجدول الدوري، والتفاعلات الكيميائية.",
    teacherName: "أ. ليلى محمود",
    price: 14000,
    lessonCount: 8,
    isFree: false,
    thumbnailUrl: null,
  },
];

// ─── Lessons ──────────────────────────────────────────────────────────

const LESSONS: Lesson[] = [
  // c-1: أساسيات الفيزياء
  {
    id: "l-1",
    courseId: "c-1",
    title: "مقدمة في الفيزياء",
    orderIndex: 1,
    isPreview: true,
    durationSeconds: 600,
    videoUrl: "https://example.com/v/l-1",
  },
  {
    id: "l-2",
    courseId: "c-1",
    title: "الحركة المستقيمة",
    orderIndex: 2,
    isPreview: false,
    durationSeconds: 900,
    videoUrl: null,
  },
  {
    id: "l-3",
    courseId: "c-1",
    title: "قوانين نيوتن",
    orderIndex: 3,
    isPreview: false,
    durationSeconds: 1200,
    videoUrl: null,
  },
  {
    id: "l-4",
    courseId: "c-1",
    title: "الطاقة والشغل",
    orderIndex: 4,
    isPreview: false,
    durationSeconds: 850,
    videoUrl: null,
  },
  // c-2: الميكانيكا المتقدمة
  {
    id: "l-5",
    courseId: "c-2",
    title: "مراجعة الميكانيكا",
    orderIndex: 1,
    isPreview: true,
    durationSeconds: 720,
    videoUrl: "https://example.com/v/l-5",
  },
  {
    id: "l-6",
    courseId: "c-2",
    title: "الديناميكا الدورانية",
    orderIndex: 2,
    isPreview: false,
    durationSeconds: 1100,
    videoUrl: null,
  },
  {
    id: "l-7",
    courseId: "c-2",
    title: "قوانين الحفاظ",
    orderIndex: 3,
    isPreview: false,
    durationSeconds: 950,
    videoUrl: null,
  },
  // c-3: إتقان الجبر
  {
    id: "l-8",
    courseId: "c-3",
    title: "المعادلات الخطية",
    orderIndex: 1,
    isPreview: true,
    durationSeconds: 540,
    videoUrl: "https://example.com/v/l-8",
  },
  {
    id: "l-9",
    courseId: "c-3",
    title: "المتباينات",
    orderIndex: 2,
    isPreview: false,
    durationSeconds: 660,
    videoUrl: null,
  },
  {
    id: "l-10",
    courseId: "c-3",
    title: "الدوال والرسم البياني",
    orderIndex: 3,
    isPreview: false,
    durationSeconds: 780,
    videoUrl: null,
  },
  // c-4: مدخل إلى التفاضل والتكامل
  {
    id: "l-11",
    courseId: "c-4",
    title: "مفهوم النهايات",
    orderIndex: 1,
    isPreview: true,
    durationSeconds: 600,
    videoUrl: "https://example.com/v/l-11",
  },
  {
    id: "l-12",
    courseId: "c-4",
    title: "مشتقة الدالة",
    orderIndex: 2,
    isPreview: false,
    durationSeconds: 900,
    videoUrl: null,
  },
  // c-5: رياضيات أساسية
  {
    id: "l-13",
    courseId: "c-5",
    title: "الأعداد والعمليات",
    orderIndex: 1,
    isPreview: true,
    durationSeconds: 480,
    videoUrl: "https://example.com/v/l-13",
  },
  {
    id: "l-14",
    courseId: "c-5",
    title: "الكسور والنسب",
    orderIndex: 2,
    isPreview: false,
    durationSeconds: 540,
    videoUrl: null,
  },
  // c-6: أساسيات الكيمياء
  {
    id: "l-15",
    courseId: "c-6",
    title: "بنية الذرة",
    orderIndex: 1,
    isPreview: true,
    durationSeconds: 660,
    videoUrl: "https://example.com/v/l-15",
  },
  {
    id: "l-16",
    courseId: "c-6",
    title: "الجدول الدوري",
    orderIndex: 2,
    isPreview: false,
    durationSeconds: 720,
    videoUrl: null,
  },
];

// ─── Student Enrollments ──────────────────────────────────────────────

const MY_ENROLLMENTS: Enrollment[] = [
  {
    id: "enr-1",
    studentId: "student-1",
    courseId: "c-1",
    status: "confirmed",
    requestedAt: "2025-09-01T10:00:00Z",
    confirmedAt: "2025-09-02T08:00:00Z",
  },
  {
    id: "enr-4",
    studentId: "student-1",
    courseId: "c-3",
    status: "pending",
    requestedAt: "2025-09-10T11:00:00Z",
    confirmedAt: null,
  },
];

// ─── Query functions ──────────────────────────────────────────────────

export async function getCoursesBySubject(
  subjectId: string
): Promise<Course[]> {
  return COURSES.filter((c) => c.subjectId === subjectId);
}

export async function getCourseDetail(
  courseId: string
): Promise<CourseDetail | null> {
  return COURSE_DETAILS.find((c) => c.id === courseId) ?? null;
}

export async function getLessonsByCourse(courseId: string): Promise<Lesson[]> {
  return LESSONS.filter((l) => l.courseId === courseId).sort(
    (a, b) => a.orderIndex - b.orderIndex
  );
}

export async function getLessonById(lessonId: string): Promise<Lesson | null> {
  return LESSONS.find((l) => l.id === lessonId) ?? null;
}

export async function getMyEnrollments(): Promise<Enrollment[]> {
  return MY_ENROLLMENTS;
}

export async function getMyEnrollmentForCourse(
  courseId: string
): Promise<Enrollment | null> {
  return MY_ENROLLMENTS.find((e) => e.courseId === courseId) ?? null;
}

export async function getMyConfirmedCourseIds(): Promise<string[]> {
  return MY_ENROLLMENTS.filter((e) => e.status === "confirmed").map(
    (e) => e.courseId
  );
}
