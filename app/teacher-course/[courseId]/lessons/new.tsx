// app/teacher-course/[courseId]/lessons/new.tsx
import { useLocalSearchParams } from "expo-router";

import { mockCreateLesson } from "../../../../lib/mock-data/teacher";
import { LessonForm } from "../../../../components/teacher/LessonForm";

export default function NewLesson() {
  const { courseId } = useLocalSearchParams<{ courseId: string }>();

  return (
    <LessonForm
      initialValues={{
        title: "",
        videoUrl: "",
        durationSeconds: 0,
        isPreview: false,
        orderIndex: 1,
      }}
      onSave={async (values) => {
        await mockCreateLesson({
          courseId: courseId ?? "",
          ...values,
          videoUrl: values.videoUrl || null,
          durationSeconds: values.durationSeconds || null,
        });
      }}
    />
  );
}
