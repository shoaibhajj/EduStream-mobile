// app/teacher-course/[courseId]/edit.tsx
import { useEffect, useState } from "react";
import { useLocalSearchParams } from "expo-router";

import {
  getTeacherCourseById,
  mockUpdateCourse,
} from "../../../lib/mock-data/teacher";
import { LoadingScreen } from "../../../components/ui";
import type { Course } from "../../../lib/types";
import { CourseForm } from "../../../components/teacher/CourseForm";

export default function EditCourse() {
  const { courseId } = useLocalSearchParams<{ courseId: string }>();
  const [course, setCourse] = useState<Course | null>(null);

  useEffect(() => {
    if (courseId) getTeacherCourseById(courseId).then(setCourse);
  }, [courseId]);

  if (!course) return <LoadingScreen />;

  return (
    <CourseForm
      initialValues={{
        title: course.title,
        description: "", // CourseDetail has description; Course doesn't — use empty string here
        price: course.price,
        isFree: course.isFree,
      }}
      onSave={async (values) => {
        await mockUpdateCourse(courseId, values);
      }}
    />
  );
}
