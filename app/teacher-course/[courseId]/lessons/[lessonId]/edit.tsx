// app/teacher-course/[courseId]/lessons/[lessonId]/edit.tsx
import { useEffect, useState } from "react";
import { useLocalSearchParams } from "expo-router";
import {
  getTeacherLessonById,
  mockUpdateLesson,
} from "../../../../../lib/mock-data/teacher";
import { LoadingScreen } from "../../../../../components/ui";
import type { Lesson } from "../../../../../lib/types";
import { LessonForm } from "../../../../../components/teacher/LessonForm";

export default function EditLesson() {
  const { lessonId } = useLocalSearchParams<{ lessonId: string }>();
  const [lesson, setLesson] = useState<Lesson | null>(null);

  useEffect(() => {
    if (lessonId) getTeacherLessonById(lessonId).then(setLesson);
  }, [lessonId]);

  if (!lesson) return <LoadingScreen />;

  return (
    <LessonForm
      initialValues={{
        title: lesson.title,
        videoUrl: lesson.videoUrl ?? "",
        durationSeconds: lesson.durationSeconds ?? 0,
        isPreview: lesson.isPreview,
        orderIndex: lesson.orderIndex,
      }}
      onSave={async (values) => {
        await mockUpdateLesson(lessonId, {
          ...values,
          videoUrl: values.videoUrl || null,
          durationSeconds: values.durationSeconds || null,
        });
      }}
    />
  );
}
