// lib/mock-data/student.ts
// Mock data functions — replace the body of each with a real Supabase query
// when the backend phase begins. The return types must never change.

import type {
  AcademicYear,
  Subject,
  Course,
  Lesson,
  CourseDetail,
} from "../types";

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

export async function getCourseDetail(
  courseId: string
): Promise<CourseDetail | null> {
  const all: CourseDetail[] = [
    {
      id: "c-1",
      subjectId: "sub-3",
      title: "Physics Fundamentals",
      description:
        "دورة شاملة في أساسيات الفيزياء تغطي الميكانيكا والكهرباء والموجات.",
      teacherName: "Dr. Omar",
      price: 15000,
      lessonCount: 4,
      isFree: true,
    },
    {
      id: "c-2",
      subjectId: "sub-3",
      title: "Advanced Mechanics",
      description:
        "ميكانيكا متقدمة للطلاب المتفوقين، تشمل القوى والحركة الدورانية.",
      teacherName: "Ms. Layla",
      price: 20000,
      lessonCount: 3,
      isFree: false,
    },
    {
      id: "c-3",
      subjectId: "sub-5",
      title: "Algebra Mastery",
      description: "إتقان الجبر من الأساسيات حتى المعادلات التربيعية.",
      teacherName: "Mr. Rami",
      price: 12000,
      lessonCount: 3,
      isFree: true,
    },
  ];
  return all.find((c) => c.id === courseId) ?? null;
}

export async function getLessonsByCourse(courseId: string): Promise<Lesson[]> {
  const all: Lesson[] = [
    // c-1 lessons
    {
      id: "l-1",
      courseId: "c-1",
      title: "مقدمة في الفيزياء",
      orderIndex: 1,
      isPreview: true,
      durationSeconds: 420,
      videoUrl: "https://example.com/video/l-1",
    },
    {
      id: "l-2",
      courseId: "c-1",
      title: "قوانين نيوتن",
      orderIndex: 2,
      isPreview: false,
      durationSeconds: 540,
      videoUrl: null,
    },
    {
      id: "l-3",
      courseId: "c-1",
      title: "الطاقة والشغل",
      orderIndex: 3,
      isPreview: false,
      durationSeconds: 600,
      videoUrl: null,
    },
    {
      id: "l-4",
      courseId: "c-1",
      title: "الموجات الصوتية",
      orderIndex: 4,
      isPreview: false,
      durationSeconds: 480,
      videoUrl: null,
    },
    // c-2 lessons
    {
      id: "l-5",
      courseId: "c-2",
      title: "الحركة الدورانية",
      orderIndex: 1,
      isPreview: false,
      durationSeconds: 510,
      videoUrl: null,
    },
    {
      id: "l-6",
      courseId: "c-2",
      title: "قوانين كبلر",
      orderIndex: 2,
      isPreview: false,
      durationSeconds: 630,
      videoUrl: null,
    },
    {
      id: "l-7",
      courseId: "c-2",
      title: "المد والجزر",
      orderIndex: 3,
      isPreview: false,
      durationSeconds: 450,
      videoUrl: null,
    },
    // c-3 lessons
    {
      id: "l-8",
      courseId: "c-3",
      title: "المعادلات الخطية",
      orderIndex: 1,
      isPreview: true,
      durationSeconds: 360,
      videoUrl: "https://example.com/video/l-8",
    },
    {
      id: "l-9",
      courseId: "c-3",
      title: "المعادلات التربيعية",
      orderIndex: 2,
      isPreview: false,
      durationSeconds: 490,
      videoUrl: null,
    },
    {
      id: "l-10",
      courseId: "c-3",
      title: "المتتاليات والمتسلسلات",
      orderIndex: 3,
      isPreview: false,
      durationSeconds: 520,
      videoUrl: null,
    },
  ];
  return all
    .filter((l) => l.courseId === courseId)
    .sort((a, b) => a.orderIndex - b.orderIndex);
}