# EduStream Mobile — Build Plan

Repo: https://github.com/shoaibhajj/EduStream-mobile.git

## Core Principle

Build mobile first. Start with the shared cloud backend setup, then the Expo project, then the student flow, then the teacher flow, and finally the APK build.

---

## Phase 0 — Shared Backend Setup

### 00a Create Supabase Project
- Create the Supabase project.
- Create the tables and storage bucket.
- Apply RLS policies.

### 00b Create Clerk Project
- Create the Clerk app.
- Enable email and Google sign-in.

### 00c Create Signed Video Edge Function
- Create a Supabase Edge Function for signed Cloudinary URLs.
- This function will be shared by mobile and web.

---

## Phase 1 — Mobile Foundation

### 01 Create Expo Project
- Create Expo app with Expo Router and TypeScript.
- Push first clean commit.

### 02 Install Core Dependencies
- Install Clerk, Supabase, NativeWind, video packages, and secure storage.
- Use `npx expo install` where required.

### 03 Build Auth Screens
- Sign in.
- Sign up.
- Select role.

### 04 Setup Supabase Client and Profile Sync
- Configure `lib/supabase.ts`.
- Ensure the signed-in user has a matching profile row.

---

## Phase 2 — Student Flow

### 05 Navigation Shell
- Add auth guard and role-based routing.

### 06 Browse Screens
- Academic Years list.
- Subjects list.
- Course list.

### 07 Course Detail Screen
- Course info.
- Lesson list.
- Free preview behavior.

### 08 Payment Flow Screen
- Show teacher payment info.
- Create pending enrollment.

### 09 Video Player Screen
- Play Cloudinary videos with signed URL.
- Play YouTube/Vimeo links.

---

## Phase 3 — Teacher Flow

### 10 Teacher Dashboard
- Show courses and pending enrollments.

### 11 Course and Lesson Editor
- Create course.
- Add lessons.
- Publish content.
- Confirm payments.

---

## Phase 4 — APK Build

### 12 Build Android APK
- Run EAS build.
- Install and test on real device.
