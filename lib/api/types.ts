export type AppRole = "student" | "teacher" | "admin";

export type TeacherApprovalStatus =
  | "not_applicable"
  | "pending"
  | "approved"
  | "rejected";

export interface ApiProfile {
  id: string;
  clerkUserId: string;
  role: AppRole;
  displayName: string | null;
  email: string | null;
  avatarUrl: string | null;
  hasActiveSubscription: boolean;
  teacherApprovalStatus: TeacherApprovalStatus;
  createdAt: string;
  updatedAt: string;
}

export interface ProfileMeResponse {
  actor: ApiProfile;
}