# EduStream Mobile — Progress Tracker


## Current Status
Feature 14 complete — Navigation flows across student, teacher, profile, and payment screens have been connected and cleaned up. The broken `router.replace()` redirect pattern in both student and teacher profile tabs has been replaced with direct re-exports so the profile screen renders inside the tab with correct native back behavior. The teacher payment info screen is now reachable via a navigation button inside the teacher profile screen. The ghost `teacher-course/index` Stack.Screen registration has been removed from `app/_layout.tsx`. A `__DEV__`-gated teacher-area button was added to the student home screen to support role-switching during local testing. All navigation flows were verified in Arabic (RTL) first, then in English. `npx tsc --noEmit` passes clean.


## Next Up
Feature 15 — Polish UI and Empty/Error States


## Build Progress


### Completed
- 01 — Create Expo Project
- 02 — Install Core Dependencies
- 03 — Build Student Browse Screens with Mock Data
- 04 — Add Arabic-First Localization Foundation
- 05 — Build Course Detail + Lesson List + Preview/Locked States
- 06 — Build Shared Design Foundations
- 07 — Create Mock Data Layer
- 08 — Build Student Home Screen
- 09 — Build Subject/Course Browsing Screens
- 10 — Build Course Detail and Lessons Screens
- 11 — Build Teacher Home Screen
- 12 — Build Teacher Course Management UI
- 13 — Build Profile and Payment Info Screens
- 14 — Connect Navigation Flows


### In Progress
- None


### Not Started
- 15 — Polish UI and Empty/Error States
- 16 — Prepare First APK Build
- 17 — Backend Phase (deferred for now per mock-data-first plan)


## Session Notes
- Confirmed Feature 01 baseline remained stable before continuing.
- Installed NativeWind and its required setup for the Expo project.
- Added Tailwind/NativeWind configuration and verified the app builds successfully.
- Fixed the initial Babel configuration mistake by aligning the setup with the NativeWind v4 installation flow.
- Confirmed all local checks passed:
  - Metro starts without errors.
  - NativeWind `className` renders correctly.
  - No TypeScript errors.
  - Folder structure matches the expected layout.
- Built the student browse flow with mock data and Expo Router navigation for Academic Years, Subjects, and Courses.
- Confirmed local navigation works through the browse path and back navigation behaves correctly with Expo Router.
- Continued to defer Clerk and Supabase packages as part of the mock-data-first approach.
- Added Arabic-first localization using `expo-localization` and `i18n-js` (official Expo localization guide pattern).
- Created `lib/i18n/ar.ts`, `lib/i18n/en.ts`, and `lib/i18n/index.ts`.
- Arabic set as the hardcoded default locale — device locale is intentionally ignored at this stage.
- RTL layout enabled globally via `I18nManager.forceRTL(true)` called at app startup from `app/_layout.tsx`.
- All three student screens (Academic Years, Subjects, Courses) updated to use `t()` translation keys — no hardcoded visible English strings remain on those screens.
- Price formatting updated to use `toLocaleString("ar-SA")` for Arabic-Eastern numeral rendering.
- Added `Lesson` and `CourseDetail` types to `lib/types.ts` aligned with the planned Supabase schema (`isPreview`, `orderIndex`, `videoUrl`, `durationSeconds`).
- Added `getCourseDetail()` and `getLessonsByCourse()` to `lib/mock-data/student.ts` — both async, shaped for easy Supabase swap later.
- Built `app/(student)/course/[courseId].tsx` — Course Detail screen with course header, price, description, enroll button, and lesson list using `FlatList` with `ListHeaderComponent`.
- Lesson rows: preview lessons show accent play icon and "معاينة مجانية" badge; locked lessons show lock icon, muted styling, and "مقفل" badge.
- Locked lesson tap triggers `Alert` with locked message — no navigation.
- Preview lesson tap navigates to `app/(student)/watch/[lessonId].tsx`.
- Built Watch screen placeholder showing lesson ID and "مشغّل الفيديو قيد الإعداد." — real video player deferred to later feature.
- All new visible strings added to `lib/i18n/ar.ts` and `lib/i18n/en.ts` — no hardcoded text in screens.
- RTL-safe styling used throughout: `me-3`, `ms-2` instead of hardcoded left/right margins.
- Confirmed full flow works in Arabic (default) and English (via toggle).
- Created `constants/design.ts` for spacing, radius, font-size, and font-weight tokens used outside `className` contexts (e.g. `contentContainerStyle`).
- Created `components/ui/` with ScreenContainer, AppText, PrimaryButton, SecondaryButton, Card, StatusBadge, EmptyState, and LoadingScreen, plus a barrel `index.ts` export.
- Removed all hardcoded hex colors from screens (e.g. `#7C5CFC` on `ActivityIndicator`) in favor of `LoadingScreen`, which reads from `constants/colors.ts`.
- Migrated `app/(student)/index.tsx`, `app/(student)/[yearId]/index.tsx`, `app/(student)/[yearId]/[subjectId]/index.tsx`, and `app/(student)/course/[courseId].tsx` to use shared UI primitives instead of duplicated inline Tailwind class strings.
- Fixed a regression in `LessonRow` where the leading icon block had been mistakenly replaced with a duplicate `StatusBadge` — restored to icon-circle (start) + title/duration (middle) + status badge (end) layout.
- Verified no remaining hardcoded hex colors, no duplicated card style strings, and no raw `padding: 16` values remain in `app/` or `components/` via targeted `grep` checks.
- Confirmed `npx tsc --noEmit` runs clean and `npx expo start --clear` starts without errors after the full migration.
- Confirmed Arabic remains default and RTL layout still renders correctly across all migrated screens; English toggle confirmed working on each.
- Restructured the mock data layer under `lib/mock-data/` into shared, student, teacher, and profile concerns.
- Expanded `lib/types.ts` with backend-aligned types for teachers, profiles, enrollments, and payment information.
- Kept student screen behavior unchanged while moving mock relationships and query-like shaping into the data layer.
- Confirmed the existing student browse and course detail flow still works after the mock-data refactor.
- Confirmed Arabic remains the default app experience after the refactor, and English still works through the existing toggle.
- Verified the new `shared.ts`, `teacher.ts`, and `profile.ts` files are intentionally structural for upcoming features and do not need visible UI yet.
- Built the student home screen as the new default landing screen for student users using mock-data-driven sections for enrolled courses, pending enrollments, and featured courses.
- Added home-screen-specific mock query helpers in `lib/mock-data/student.ts` so home data stays inside the mock data layer and remains easy to replace with a real backend later.
- Added all student home visible strings to `lib/i18n/ar.ts` and `lib/i18n/en.ts` with Arabic-first coverage and English fallback support.
- Added a student tabs layout so Home and Browse are the only visible student entry points in bottom navigation.
- Moved browse flow screens under `app/(student)/browse/` so the browse experience owns its own nested stack without flattening every route into the tab bar.
- Moved course detail and watch screens out of the student tab tree into top-level dynamic routes so they remain navigable but no longer appear as visible tabs.
- Updated student navigation calls to 