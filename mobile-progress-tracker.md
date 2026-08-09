# EduStream Mobile — Progress Tracker


## Current Status
Feature 16 is **complete**. The first installable Android APK was built and confirmed working on a real device.
Feature 15 is **in progress** — UI polish, empty/error/loading states, and design-system-first refinement are ongoing.
The backend analysis phase (reading web repo + Postman collection) is now **complete** — the backend is ready for mobile consumption and Features 17–24 below represent the approved continuation plan.


## Next Up
Feature 15 — Complete UI Polish and Empty/Error States (finish before starting Feature 17)


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
- 16 — Prepare First APK Build


### In Progress
- 15 — Polish UI and Empty/Error States


### Not Started
- 17 — Install Auth Layer (Clerk + `@clerk/clerk-expo`)
- 18 — Build Real Sign-In / Sign-Up / Role-Selection Screens
- 19 — Wire Profile Resolution (`GET /api/profile/me`)
- 20 — Wire Browse + Course Listing to Real API
- 21 — Wire Course Detail + Lesson List to Real API
- 22 — Wire Enrollment Status + Payment Request Flow
- 23 — Wire Lesson Playback Access + Dailymotion Player
- 24 — Wire Teacher Dashboard to Real API


## Backend API Reference (Source of Truth)

The web repo (`EduStream-web`) is the backend source of truth.
All mobile routes must go through the following confirmed API groups:

| Group | Key Routes | Auth Required |
|---|---|---|
| Profile | `GET /api/profile/me` | Yes (Clerk Bearer token) |
| Browse | `GET /api/browse/years`, `GET /api/browse/subjects` | No |
| Courses | `GET /api/courses`, `GET /api/courses/:id`, `GET /api/courses/:id/lessons`, `GET /api/courses/:id/enrollment` | No / Optional / Yes |
| Playback | `GET /api/lessons/:id/playback-access` | Optional (preview) / Yes (locked) |
| Payment | `GET /api/payment/config`, `POST /api/payment/requests`, `GET /api/payment/requests` | Yes |
| Teacher | `GET /api/teacher/courses`, `GET /api/teacher/courses/:id/lessons` | Yes (teacher role) |
| Admin (review) | `POST /api/payment/requests/:id/review` | Yes (admin role) |

**Auth provider:** Clerk. Token passed as `Authorization: Bearer <clerkToken>` on all protected routes.
**Video provider:** Dailymotion. Player ID: `x1lwfu`. Profile ID: `x5t43rm`. Playback access resolved server-side via `/api/lessons/:id/playback-access`.
**Media/thumbnail provider:** Cloudinary. Cloud name: `dawoemact`.
**Database:** Neon PostgreSQL (Prisma ORM on web side).


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
- Added Arabic-first localization using `expo-localization` and `i18n-js` following the official Expo localization pattern.
- Created `lib/i18n/ar.ts`, `lib/i18n/en.ts`, and `lib/i18n/index.ts`.
- Arabic set as the hardcoded default locale — device locale is intentionally ignored at this stage.
- RTL layout enabled globally via `I18nManager.forceRTL(true)` called at app startup from `app/_layout.tsx`.
- All three student screens (Academic Years, Subjects, Courses) updated to use `t()` translation keys — no hardcoded visible English strings remain on those screens.
- Price formatting updated to use `toLocaleString("ar-SA")` for Arabic-Eastern numeral rendering.
- Added `Lesson` and `CourseDetail` types to `lib/types.ts` aligned with the planned Supabase schema (`isPreview`, `orderIndex`, `videoUrl`, `durationSeconds`).
- Added `getCourseDetail()` and `getLessonsByCourse()` to `lib/mock-data/student.ts`, both async and shaped for easy Supabase replacement later.
- Built `app/(student)/course/[courseId].tsx` with course header, price, description, enroll button, and lesson list using `FlatList` with `ListHeaderComponent`.
- Lesson rows: preview lessons show accent play icon and "معاينة مجانية" badge; locked lessons show lock icon, muted styling, and "مقفل" badge.
- Locked lesson tap triggers `Alert` with locked message — no navigation.
- Preview lesson tap navigates to `app/(student)/watch/[lessonId].tsx`.
- Built watch screen placeholder showing lesson ID and "مشغّل الفيديو قيد الإعداد." — real video player deferred to later feature.
- All new visible strings added to `lib/i18n/ar.ts` and `lib/i18n/en.ts` — no hardcoded text in screens.
- RTL-safe styling used throughout: `me-3`, `ms-2` instead of hardcoded left/right margins.
- Confirmed full flow works in Arabic (default) and English (via toggle).
- Created `constants/design.ts` for spacing, radius, font-size, and font-weight tokens used outside `className` contexts.
- Created `components/ui/` with `ScreenContainer`, `AppText`, `PrimaryButton`, `SecondaryButton`, `Card`, `StatusBadge`, `EmptyState`, and `LoadingScreen`, plus a barrel `index.ts` export.
- Removed all hardcoded hex colors from screens in favor of shared tokens from `constants/colors.ts`.
- Migrated key student screens to use shared UI primitives instead of duplicated inline Tailwind class strings.
- Fixed a regression in `LessonRow` where the leading icon block had been mistakenly replaced with a duplicate `StatusBadge`.
- Verified no remaining hardcoded hex colors, no duplicated card style strings, and no raw `padding: 16` values remain in `app/` or `components/` via targeted grep checks.
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
- Updated student navigation flows across the browse and course experience to match the new route structure.
- Completed Feature 14 by cleaning up navigation flows across student, teacher, profile, and payment screens.
- Replaced the broken `router.replace()` redirect pattern in both student and teacher profile tabs with direct re-exports so the profile screen renders inside the tab with correct native back behavior.
- Made the teacher payment info screen reachable via a navigation button inside the teacher profile screen.
- Removed the ghost `teacher-course/index` `Stack.Screen` registration from `app/_layout.tsx`.
- Added a `__DEV__`-gated teacher-area button to the student home screen to support local role-switching during testing.
- Verified all navigation flows in Arabic (RTL) first, then in English.
- Started Feature 15 with a partial UI pass.
- Updated shared color tokens in `constants/colors.ts` and added `cta`, `ctaLight`, `preview`, and `previewLight` to support onboarding and newer UI states.
- Kept the implementation's own visual direction instead of adopting the previously proposed redesign palette and theme direction.
- Added onboarding under `app/(onboarding)/index.tsx`.
- The first onboarding implementation used horizontal paged scrolling, but it failed under the app's RTL/Android setup because the visible slide and the tracked index could fall out of sync.
- Replaced the fragile horizontal paging approach with a controlled single-slide onboarding flow driven directly by React state.
- The current onboarding now renders one slide at a time and transitions between slides using Reanimated `FadeIn` and `FadeOut`, which avoids the RTL horizontal scroll bug.
- `تخطّى` and the final onboarding action both use the same completion path, storing `onboarding_done` in AsyncStorage and navigating to `/(student)/home`.
- Onboarding is currently functional, but this does **not** complete Feature 15.
- Feature 15 still needs a broader design-system-first pass across the whole app, including shared primitives, student screens, teacher screens, profile/payment screens, loading states, empty states, and error states.
- The current UI direction should be treated as an intermediate pass, not the final production-level polish target.
- Completed Feature 16 by preparing the Expo project for its first installable Android APK build using EAS Build.
- Updated app branding metadata for **Moallem Academy** and aligned build-facing config values in `app.json`.
- Replaced the primary app icon, splash icon, and Android adaptive foreground asset with the new branded assets.
- Added or confirmed the minimum Android build metadata required for EAS Android builds, including package identifier and versionCode.
- Added EAS build configuration for a device-installable APK using a preview/internal profile.
- Confirmed `npx expo config --type public` resolves successfully after the config updates.
- Confirmed `npx tsc --noEmit` still passes clean after the build-readiness changes.
- Ran the Android EAS build flow and successfully produced the first installable APK.
- Downloaded and installed the APK on a real Android device and confirmed the app launches and works.
- Completed backend analysis pass: read web repo API structure, all route groups, and full Postman collection.
- Confirmed backend is ready for mobile consumption — all student, teacher, payment, and playback routes exist and are tested.
- Backend uses Clerk for auth (Bearer token on all protected routes), Dailymotion for video (player `x1lwfu`), and Cloudinary for media.
- Playback access is resolved server-side via `/api/lessons/:id/playback-access` — mobile must call this route before attempting playback, not derive access locally.
- Payment flow is manual/offline: student submits a payment reference via `POST /api/payment/requests`; admin approves or rejects via `/api/payment/requests/:id/review`.
- `GET /api/profile/me` is the single source of truth for role and approval state after login — mobile must use it after every auth event.
- Browse routes (`/api/browse/years`, `/api/browse/subjects`) require no auth — safe to call at app startup before login.
- Enrollment status per course lives at `GET /api/courses/:id/enrollment` (auth required) — must be called on course detail open for authenticated users.
- Teacher routes (`/api/teacher/courses`, `/api/teacher/courses/:id/lessons`) are role-gated — must verify `role === "teacher"` from profile before showing teacher UI.
- The current `app/index.tsx` always redirects to `/(onboarding)` regardless of `onboarding_done` state — this is a known placeholder and will be fixed in Feature 17 as part of the auth gate setup.
- The `app/(auth)/sign-in.tsx` and `app/(auth)/sign-up.tsx` screens are currently both plain `<Placeholder>` components — they contain no real implementation yet.
- The `app/(auth)/select-role.tsx` screen is also a placeholder — role selection after sign-up must be wired to match the web flow (`/select-role` post-signup redirect pattern confirmed in Postman environment).
- The `CURRENT_TEACHER_ID = "teacher-1"` and `MOCK_TEACHER_ID = "teacher-1"` hardcoded constants in teacher screens and payment screen are the primary identifiers to replace with real Clerk userId lookup in Feature 19.
- Identified that `getPaymentInfo` and `updatePaymentInfo` in `lib/mock-data/teacher.ts` operate on an in-memory mutable array — this is entirely mock-only and has no persistence; must be replaced by real API calls in Feature 22.


## Feature 15 Remaining Work
- [ ] Review all shared UI primitives for visual consistency after the color-token changes.
- [ ] Redesign loading states beyond the current basic implementation.
- [ ] Redesign empty states across student, teacher, and profile flows.
- [ ] Add reusable error-state UI instead of relying on basic fallbacks.
- [ ] Revisit button prominence and visibility on screens such as payment info, edit flows, and teacher management screens.
- [ ] Apply the polish pass consistently across onboarding, student, teacher, profile, and payment surfaces.
- [ ] Verify all Feature 15 updates in Arabic first, then in English.
- [ ] Run `npx tsc --noEmit` and manual RTL QA again after the remaining Feature 15 work is finished.


## Feature 17 Plan — Install Auth Layer (Clerk + `@clerk/clerk-expo`)

**Goal:** Install Clerk into the mobile app, protect routes with a real auth gate, and redirect users correctly based on auth state. No UI changes to auth screens yet — that is Feature 18.

### Steps
- [ ] Install `@clerk/clerk-expo` and required peer dependencies.
- [ ] Add `ClerkProvider` to `app/_layout.tsx` wrapping the entire `<Stack>`.
- [ ] Store Clerk publishable key in `.env` as `EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY` (value: `pk_test_dXAtc3BhcnJvdy03Mi5jbGVyay5hY2NvdW50cy5kZXYk`).
- [ ] Create `lib/auth.ts` with a `useAuthToken()` helper that returns the current Clerk session JWT for use in API headers.
- [ ] Replace the current `app/index.tsx` redirect logic: check `isSignedIn` from `useAuth()` first — if signed in, call `GET /api/profile/me` and redirect based on role; if not signed in, redirect to `/(onboarding)` (first time) or `/(auth)/sign-in`.
- [ ] Create `lib/api/client.ts` — a base `apiFetch()` helper that automatically injects the `Authorization: Bearer <token>` header for authenticated calls. Accepts `auth?: boolean` flag.
- [ ] Verify `npx tsc --noEmit` passes clean.
- [ ] Verify Arabic RTL layout still correct after provider wrapping.
- [ ] Test on Android device that the redirect logic behaves correctly for the unauthenticated case.


## Feature 18 Plan — Build Real Sign-In / Sign-Up / Role-Selection Screens

**Goal:** Replace placeholder auth screens with real Clerk-powered forms, following the same role-selection flow the web app uses after sign-up.

### Steps
- [ ] Build `app/(auth)/sign-in.tsx` using `useSignIn()` from `@clerk/clerk-expo` — email/password form, Arabic-first labels, RTL-safe layout.
- [ ] Build `app/(auth)/sign-up.tsx` using `useSignUp()` — same form pattern, Arabic-first.
- [ ] Build `app/(auth)/select-role.tsx` — two options: Student / Teacher. On selection, POST role choice to backend (or set Clerk metadata) then redirect to appropriate home screen. Must match web post-signup flow (`/select-role` path confirmed in Postman environment).
- [ ] Add all new visible strings to `lib/i18n/ar.ts` and `lib/i18n/en.ts`.
- [ ] Handle error states inline (wrong password, network failure, email already taken).
- [ ] Remove the `__DEV__`-gated teacher-area button from student home once real role-based routing works.
- [ ] Verify `npx tsc --noEmit` passes clean.
- [ ] Verify Arabic RTL layout on both sign-in and sign-up screens on a real device.


## Feature 19 Plan — Wire Profile Resolution (`GET /api/profile/me`)

**Goal:** After any login event, resolve the real backend profile and make `role`, `approvalState`, and profile data available globally across the app.

### Steps
- [ ] Create `lib/api/profile.ts` with `fetchMyProfile()` calling `GET /api/profile/me` using `apiFetch()`.
- [ ] Create `lib/context/ProfileContext.tsx` — a React context that stores `{ profile, role, loading, error }` and exposes a `refreshProfile()` method.
- [ ] Wrap the root layout in `<ProfileProvider>` after `<ClerkProvider>`.
- [ ] Replace all `MOCK_TEACHER_ID = "teacher-1"` and `CURRENT_TEACHER_ID = "teacher-1"` hardcoded constants with real `profile.id` / `profile.userId` from context.
- [ ] Add a role guard hook `useRequireRole(role)` that redirects to sign-in if the user is not authenticated or not the required role.
- [ ] Apply `useRequireRole("teacher")` to all `(teacher)` screens.
- [ ] Handle `profile.approvalState !== "approved"` for teacher accounts — show a pending-approval screen instead of the teacher dashboard if the teacher is not yet approved.
- [ ] Verify `npx tsc --noEmit` passes clean.
- [ ] Verify profile loads correctly after sign-in on a real device.


## Feature 20 Plan — Wire Browse + Course Listing to Real API

**Goal:** Replace mock academic years, subjects, and course listing data with real data from the backend. Browse routes require no auth.

### API routes used
- `GET /api/browse/years` — academic years list
- `GET /api/browse/subjects` — all subjects (optional `?academicYearId=` filter)
- `GET /api/courses?subjectId=&page=1&limit=20` — published courses by subject
- `GET /api/courses?search=&page=1&limit=20` — search published courses

### Steps
- [ ] Create `lib/api/browse.ts` with `fetchYears()`, `fetchSubjects(academicYearId?)`, `fetchCourses(params)`, and `searchCourses(query)`.
- [ ] Replace mock calls in `app/(student)/browse/index.tsx` (years screen) with `fetchYears()`.
- [ ] Replace mock calls in the subjects screen with `fetchSubjects(yearId)`.
- [ ] Replace mock calls in the courses-by-subject screen with `fetchCourses({ subjectId })`.
- [ ] Add search bar to the courses screen wired to `fetchCourses({ search })`.
- [ ] Add loading states using the shared `LoadingScreen` component.
- [ ] Add error states using the shared error-state UI from Feature 15.
- [ ] Add empty states for "no courses in this subject" and "no search results".
- [ ] Add all new visible strings to `lib/i18n/ar.ts` and `lib/i18n/en.ts`.
- [ ] Verify `npx tsc --noEmit` passes clean.
- [ ] Verify Arabic RTL layout on browse screens on a real device.


## Feature 21 Plan — Wire Course Detail + Lesson List to Real API

**Goal:** Replace mock course detail and lesson list with real API data. Wire enrollment status display on the course detail screen.

### API routes used
- `GET /api/courses/:id` — course detail + lesson metadata
- `GET /api/courses/:id/lessons` — full lesson list (public; auth optional to get unlock states)
- `GET /api/courses/:id/enrollment` — enrollment status for authenticated users (auth required)

### Steps
- [ ] Create `lib/api/courses.ts` with `fetchCourseDetail(courseId)`, `fetchCourseLessons(courseId, token?)`, and `fetchEnrollmentStatus(courseId, token)`.
- [ ] Replace mock calls in `app/student-course/[courseId].tsx` with real API calls.
- [ ] For authenticated users: call `fetchEnrollmentStatus()` in parallel with course detail to show correct enrollment badge.
- [ ] For unauthenticated users: skip enrollment status call and show "enroll" CTA.
- [ ] Use server-returned `isPreview` and lock state from lesson list — do not derive lock state locally from mock assumptions.
- [ ] Update the lesson row rendering to use the real `isPreview` field from the API response (not mock data).
- [ ] Add loading, error, and not-found states for the course detail screen.
- [ ] Add all new visible strings to `lib/i18n/ar.ts` and `lib/i18n/en.ts`.
- [ ] Verify `npx tsc --noEmit` passes clean.
- [ ] Verify RTL + Arabic layout on course detail and lesson list on a real device.


## Feature 22 Plan — Wire Enrollment Status + Payment Request Flow

**Goal:** Replace the mock enrollment request flow with the real manual payment submission flow. Students submit a payment reference; the backend creates a pending enrollment awaiting admin approval.

### API routes used
- `GET /api/payment/config` — fetch payment instructions + Sham Cash details (no auth)
- `POST /api/payment/requests` — submit payment reference (`requestType: "course"`, `courseId`, `phoneNumber`, `paymentReference`)
- `GET /api/payment/requests` — list student's own payment requests and their statuses (auth required)

### Steps
- [ ] Create `lib/api/payment.ts` with `fetchPaymentConfig()`, `submitPaymentRequest(body, token)`, and `fetchMyPaymentRequests(token)`.
- [ ] Build a new `app/student-enroll/[courseId].tsx` screen (or modal) — the real enrollment flow:
  1. Display payment instructions from `GET /api/payment/config`.
  2. Show the course price.
  3. Accept phone number and payment reference inputs.
  4. Submit via `POST /api/payment/requests`.
  5. Show success state: "تم إرسال طلب الدفع — سيتم مراجعته قريباً."
  6. Show error state for validation failures or network errors.
- [ ] Update the "Enroll" button on course detail to navigate to this new screen instead of the current mock alert.
- [ ] Wire `GET /api/payment/requests` to the student home screen's "pending enrollments" section to show real pending statuses.
- [ ] Add all new visible strings to `lib/i18n/ar.ts` and `lib/i18n/en.ts`.
- [ ] Verify `npx tsc --noEmit` passes clean.
- [ ] Verify RTL + Arabic layout on the enrollment/payment screen on a real device.


## Feature 23 Plan — Wire Lesson Playback Access + Dailymotion Player

**Goal:** Replace the placeholder watch screen with a real access-gated Dailymotion video player. Playback access must be resolved server-side before the player is shown.

### API routes used
- `GET /api/lessons/:id/playback-access` — resolves access decision (allowed/denied) and returns provider-aware data (Dailymotion video ID or embed URL)

### Steps
- [ ] Create `lib/api/lessons.ts` with `fetchPlaybackAccess(lessonId, token?)`.
- [ ] Call `fetchPlaybackAccess()` at the start of `app/student-watch/[lessonId].tsx` before rendering anything.
- [ ] Handle three states from the access response:
  - `allowed: true` + video data → render the player.
  - `allowed: false`, reason `"not_enrolled"` → show "يجب التسجيل في الدورة أولاً" with a back button.
  - `allowed: false`, reason `"not_authenticated"` → show "يجب تسجيل الدخول أولاً" with a sign-in button.
- [ ] Install `react-native-webview` (required for Dailymotion embed).
- [ ] Build a `components/player/DailymotionPlayer.tsx` component:
  - Renders a `WebView` with the Dailymotion embed URL using player ID `x1lwfu`.
  - Passes `allowsFullscreenVideo`, `mediaPlaybackRequiresUserAction={false}`.
  - Disables JavaScript-reachable download links in the WebView.
  - Shows a loading indicator while the WebView is loading.
- [ ] On Android: add `android.permission.INTERNET` to `app.json` if not already present.
- [ ] Do NOT store or cache the video URL locally beyond the current screen session.
- [ ] Add all new visible strings to `lib/i18n/ar.ts` and `lib/i18n/en.ts`.
- [ ] Verify `npx tsc --noEmit` passes clean.
- [ ] Verify playback on a real Android device — test preview lesson (no auth), locked lesson (no auth), and enrolled lesson (with auth).


## Feature 24 Plan — Wire Teacher Dashboard to Real API

**Goal:** Replace all mock teacher data with real API calls. Teacher screens must be role-gated using the profile context from Feature 19.

### API routes used
- `GET /api/teacher/courses` — teacher's own course listing (auth required, teacher role)
- `GET /api/teacher/courses/:id/lessons` — lessons for a teacher-owned course (auth required, teacher role)

### Steps
- [ ] Create `lib/api/teacher.ts` with `fetchTeacherCourses(token)` and `fetchTeacherCourseLessons(courseId, token)`.
- [ ] Replace mock calls in `app/(teacher)/dashboard.tsx` with `fetchTeacherCourses()`.
- [ ] Replace mock calls in `app/(teacher)/courses.tsx` with `fetchTeacherCourses()`.
- [ ] Replace mock calls in the teacher course detail / lesson management screens with `fetchTeacherCourseLessons()`.
- [ ] Apply `useRequireRole("teacher")` guard (from Feature 19) to all `(teacher)` layout screens.
- [ ] Wire the teacher payment info screen (`app/profile/payment.tsx`) to `GET /api/profile/me` to fetch real teacher payment info — replace the `getPaymentInfo("teacher-1")` mock call.
- [ ] Wire `updatePaymentInfo` to the correct backend PATCH/PUT route when confirmed available (check web repo for teacher profile update route).
- [ ] Add loading, error, and empty states on teacher dashboard and course list.
- [ ] Add all new visible strings to `lib/i18n/ar.ts` and `lib/i18n/en.ts`.
- [ ] Verify `npx tsc --noEmit` passes clean.
- [ ] Verify Arabic RTL layout on teacher screens on a real device.


## Architecture Notes

### Auth Flow (after Features 17–19)