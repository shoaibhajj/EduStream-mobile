// lib/mock-data/shared.ts
// Shared lookup/reference data — academic years, subjects.
// These are called by both student AND teacher flows.

import type { AcademicYear, Subject } from "../types";

const ACADEMIC_YEARS: AcademicYear[] = [
  { id: "year-1", name: "الصف التاسع", subjectCount: 3 },
  { id: "year-2", name: "الصف العاشر", subjectCount: 4 },
  { id: "year-3", name: "الصف الحادي عشر", subjectCount: 4 },
  { id: "year-4", name: "الصف الثاني عشر", subjectCount: 3 },
];

const SUBJECTS: Subject[] = [
  { id: "sub-1", yearId: "year-1", name: "الرياضيات", courseCount: 2 },
  { id: "sub-2", yearId: "year-1", name: "العلوم", courseCount: 2 },
  { id: "sub-3", yearId: "year-1", name: "اللغة العربية", courseCount: 1 },
  { id: "sub-4", yearId: "year-2", name: "الفيزياء", courseCount: 3 },
  { id: "sub-5", yearId: "year-2", name: "الكيمياء", courseCount: 2 },
  { id: "sub-6", yearId: "year-2", name: "الرياضيات", courseCount: 3 },
  { id: "sub-7", yearId: "year-2", name: "الأحياء", courseCount: 2 },
  { id: "sub-8", yearId: "year-3", name: "الفيزياء", courseCount: 2 },
  { id: "sub-9", yearId: "year-3", name: "الكيمياء", courseCount: 3 },
  { id: "sub-10", yearId: "year-3", name: "الرياضيات", courseCount: 4 },
  { id: "sub-11", yearId: "year-3", name: "الأحياء", courseCount: 1 },
  { id: "sub-12", yearId: "year-4", name: "الفيزياء", courseCount: 3 },
  { id: "sub-13", yearId: "year-4", name: "الكيمياء", courseCount: 2 },
  { id: "sub-14", yearId: "year-4", name: "الرياضيات", courseCount: 3 },
];

export async function getAcademicYears(): Promise<AcademicYear[]> {
  return ACADEMIC_YEARS;
}

export async function getSubjectsByYear(yearId: string): Promise<Subject[]> {
  return SUBJECTS.filter((s) => s.yearId === yearId);
}

export async function getSubjectById(
  subjectId: string
): Promise<Subject | null> {
  return SUBJECTS.find((s) => s.id === subjectId) ?? null;
}

export async function getYearById(
  yearId: string
): Promise<AcademicYear | null> {
  return ACADEMIC_YEARS.find((y) => y.id === yearId) ?? null;
}
