// app/teacher-course/new.tsx

import { CourseForm } from "../../components/teacher/CourseForm";
import { mockCreateCourse } from "../../lib/mock-data/teacher";

const MOCK_TEACHER_ID = "teacher-1";
const MOCK_SUBJECT_ID = "subj-1"; // use an existing subject id from shared.ts

export default function NewCourse() {
  return (
    <CourseForm
      initialValues={{
        title: "",
        description: "",
        price: 0,
        isFree: false,
      }}
      onSave={async (values) => {
        await mockCreateCourse({
          ...values,
          teacherId: MOCK_TEACHER_ID,
          subjectId: MOCK_SUBJECT_ID,
        });
      }}
    />
  );
}
