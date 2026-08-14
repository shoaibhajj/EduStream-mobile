# EduStream Mobile — Progress Tracker


## Current Status
Feature 16 is **complete**. The first installable Android APK was built and confirmed working on a real device.
Feature 15 is **in progress** — UI polish, empty/error/loading states, and design-system-first refinement are ongoing.
Feature 17 is **complete** — Clerk is fully wired, the root provider is in place, the Expo-compatible built-in token cache is configured, and the app boots successfully without runtime or TypeScript errors.
Feature 18 is now **complete** — real sign-in, sign-up, logout, and role-based route guards are implemented and verified on the emulator across all auth entry points and both protected route groups.
The backend analysis phase (reading web repo + Postman collection) is complete — the backend is ready for mobile consumption and Features 19–24 below represent the approved continuation plan.


## Next Up
Feature 19 — Wire Profile Resolution (`GET /api/profile/me`)
Feature 15 remains in progress in parallel and should be finished opportunistically alongside Feature 19+ work.


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
- 17 — Install Auth Layer (Clerk + `@clerk/expo`)
- 18 — Build Real Sign-In / Sign-Up / Logout / Route Guards


### In Progress
- 15 — Polish UI and Empty/Error States


### Not Started
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
- Restructured `app/(student)` navigation and tab flows for better separation between browse and course detail.
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
- Added EAS build configuration and produced the first installable APK.
- Completed backend analysis pass: read web repo API structure, all route groups, and full Postman collection.
- Confirmed backend is ready for mobile consumption — all student, teacher, payment, and playback routes exist and are tested.
- Confirmed backend uses Clerk for auth (Bearer token on all protected routes), Dailymotion for video (player `x1lwfu`), and Cloudinary for media.
- Playback access is resolved server-side via `/api/lessons/:id/playback-access` — mobile must call this route before attempting playback, not derive access locally.
- Payment flow is manual/offline: student submits a payment reference via `POST /api/payment/requests`; admin approves or rejects via `/api/payment/requests/:id/review`.
- `GET /api/profile/me` is the single source of truth for role and approval state after login — mobile must use it after every auth event.
- Browse routes (`/api/browse/years`, `/api/browse/subjects`) require no auth — safe to call at app startup before login.
- Enrollment status per course lives at `GET /api/courses/:id/enrollment` (auth required) — must be called on course detail open for authenticated users.
- Teacher routes (`/api/teacher/courses`, `/api/teacher/courses/:id/lessons`) are role-gated — must verify `role === "teacher"` from profile before showing teacher UI.
- Migrated the Clerk package from `@clerk/clerk-expo` to `@clerk/expo`, aligning with the newer native-component SDK (`AuthView`, `useClerk`, `useAuth`, native token cache from `@clerk/expo/token-cache`).
- Replaced the placeholder `app/(auth)/sign-in.tsx` and `app/(auth)/sign-up.tsx` screens with Clerk's native `<AuthView mode="signIn" />` and `<AuthView mode="signUp" />` components, which handle email/password and Google OAuth internally.
- Confirmed backend rule: new users are always created with `role: student` by default via the Clerk webhook; teacher role is assigned by an admin only, never selected by the user on mobile.
- Based on that backend rule, removed the planned real role-selection screen from the auth flow. `app/(auth)/select-role.tsx` was converted into a simple `<Redirect href="/" />` component instead of a real onboarding step.
- Updated `app/index.tsx` root routing logic: removed all `select-role` redirect targets; unexpected role and `404` (profile not yet synced by webhook) now retry `fetchProfileMe` with backoff delays before falling back, instead of routing to a role-picker.
- Discovered that `AuthView` does not navigate on its own after successful sign-in/sign-up/OAuth — it only syncs Clerk's internal auth state (`isSignedIn`). Added `app/(auth)/_layout.tsx` as a reactive layout that watches `isSignedIn` via `useAuth({ treatPendingAsSignedOut: false })` and issues a `<Redirect href="/" />` the moment sign-in completes, which then hands off to `index.tsx`'s existing role-based routing.
- Confirmed `treatPendingAsSignedOut: false` is required on `useAuth()` in the auth layout to avoid a brief false-negative "signed out" flicker immediately after native auth completes.
- Added a shared `components/ui/LogoutButton.tsx` using `useClerk().signOut()` with a confirmation `Alert`, followed by `router.replace("/")` so `index.tsx` re-evaluates auth state and routes back to sign-in.
- Wired `LogoutButton` into both `app/profile/student.tsx` and `app/profile/teacher.tsx`.
- Added `profile.logout_button`, `profile.logout_confirm_title`, and `profile.logout_confirm_message` to `lib/i18n/ar.ts` and `lib/i18n/en.ts`.
- Added auth guards to both protected tab-group layouts: `app/(student)/_layout.tsx` and `app/(teacher)/_layout.tsx` now check `isLoaded`/`isSignedIn` via `useAuth()` before rendering their `<Tabs>` tree, redirecting to `/(auth)/sign-in` if the user is signed out. This closes the direct-deep-link gap that existed when route protection only lived in `index.tsx`'s initial boot logic.
- Confirmed on the Android emulator: Google OAuth sign-in via `AuthView` works end-to-end and lands on the correct role-based home screen; logout via the new `LogoutButton` correctly clears the session and returns to sign-in; navigating to a protected `(student)`/`(teacher)` route while signed out correctly redirects to sign-in via the new layout guards.
- Hit an unrelated emulator stability issue while iterating on `config.ini` (`hw.lcd.density`, `hw.gpu.mode`) to try to fix blurry WebView/Chrome text during Google sign-in on the emulator: `swiftshader_indirect` GPU mode caused a segmentation fault on this machine's AMD/Intel hybrid GPU setup. Reverted to the previously stable `hw.gpu.mode=host` while keeping the `hw.lcd.density=320` increase. Documented this as a known emulator-only cosmetic issue, not a real-device concern, and deprioritized further GPU-mode tuning in favor of stability.
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


## Feature 17 — Install Auth Layer (Clerk + `@clerk/expo`) — COMPLETE


**Goal:** Install Clerk into the mobile app, wire the root auth provider correctly for Expo, define the authenticated API foundation, and replace the placeholder app-entry redirect with a real auth-aware boot gate.


### Final Status
- [x] Installed `@clerk/expo` (migrated from initial `@clerk/clerk-expo` install).
- [x] Installed `expo-secure-store`.
- [x] Added `ClerkProvider` to `app/_layout.tsx` wrapping the root `<Stack>`.
- [x] Confirmed the correct token cache strategy is the built-in `tokenCache` import from `@clerk/expo/token-cache`.
- [x] Confirmed `npx tsc --noEmit` passes clean after Clerk setup.
- [x] Confirmed the app starts successfully without runtime errors after provider wiring.
- [x] Replaced the placeholder `app/index.tsx` redirect logic with a real auth-aware boot gate (loading → signed-out → onboarding/sign-in; signed-in → `fetchProfileMe` → role-based redirect with retry/backoff on 404).
- [x] Registered the `(auth)` route group with its own reactive layout (`app/(auth)/_layout.tsx`) for clean post-auth navigation.
- [x] Verified signed-out boot behavior on the Android emulator.
- [x] Verified invalid/missing-token and 404-profile fallback routes cleanly to sign-in after retries.

### Deferred to later features
- [ ] Add `.env.example` documenting required mobile env vars (not blocking, low priority).
- [ ] Extend `lib/types.ts` with full real auth/profile types for the backend `Profile` shape — deferred to Feature 19 alongside `ProfileContext`.
- [ ] Create `lib/api/client.ts` base `apiFetch()` helper — deferred to Feature 19/20 when real data wiring begins.


## Feature 18 — Build Real Sign-In / Sign-Up / Logout / Route Guards — COMPLETE


**Goal:** Replace placeholder auth screens with real Clerk-powered forms and enforce route protection across signed-in-only areas. Role-selection UI was removed from scope after confirming the backend always assigns `role: student` by default and teacher role is admin-managed only.


### Steps Completed
- [x] Replaced `app/(auth)/sign-in.tsx` with Clerk's native `<AuthView mode="signIn" isDismissible={false} />` (handles email/password + Google OAuth).
- [x] Replaced `app/(auth)/sign-up.tsx` with Clerk's native `<AuthView mode="signUp" isDismissible={false} />`.
- [x] Converted `app/(auth)/select-role.tsx` into a `<Redirect href="/" />` — no real role-selection UI, since role is server-assigned.
- [x] Updated `app/index.tsx` to remove all `select-role` navigation targets; added retry/backoff logic (`PROFILE_RETRY_DELAYS_MS`) for the 404 "profile not yet synced by webhook" case.
- [x] Added `app/(auth)/_layout.tsx` — reactive layout using `useAuth({ treatPendingAsSignedOut: false })` that redirects to `/` the moment `isSignedIn` becomes true, since `AuthView` does not navigate on its own.
- [x] Built `components/ui/LogoutButton.tsx` using `useClerk().signOut()` with a confirmation `Alert`, followed by `router.replace("/")`.
- [x] Wired `LogoutButton` into `app/profile/student.tsx` and `app/profile/teacher.tsx`.
- [x] Added auth guards to `app/(student)/_layout.tsx` and `app/(teacher)/_layout.tsx` — both now check `isLoaded`/`isSignedIn` before rendering their `<Tabs>` tree and redirect to `/(auth)/sign-in` otherwise, closing the deep-link protection gap.
- [x] Added `profile.logout_button`, `profile.logout_confirm_title`, and `profile.logout_confirm_message` to `lib/i18n/ar.ts` and `lib/i18n/en.ts`.
- [x] Verified `npx tsc --noEmit` passes clean.
- [x] Verified on Android emulator: Google OAuth sign-in end-to-end, logout end-to-end, and both `(student)`/`(teacher)` layout guards correctly block direct navigation while signed out.

### Not yet explicitly re-verified (low risk, revisit opportunistically)
- [ ] Email/password sign-up path (new account → verification → landing on `/(student)/home`) — Google OAuth and logout were explicitly confirmed; sign-up specifically has not been walked through step-by-step since the layout guards were added.
- [ ] Teacher role routing — requires manually setting a test profile's `role` to `teacher` in the database (e.g. via Prisma Studio) to confirm `/(teacher)/dashboard` redirect and the teacher `_layout.tsx` guard both behave correctly.
- [ ] Swap `app/index.tsx`'s loading branch from `return null` to the shared `<LoadingScreen />` component for a smoother boot instead of a blank flash.
- [ ] Remove the `__DEV__`-gated teacher-area button from student home now that real auth exists (originally scheduled for this feature, still present).


## Feature 19 Plan — Wire Profile Resolution (`GET /api/profile/me`)


**Goal:** After any login event, resolve the real backend profile and make `role`, `approvalState`, and profile data available globally across the app.


### Steps
- [ ] Create `lib/api/profile.ts` with `fetchMyProfile()` calling `GET /api/profile/me` using `apiFetch()`.
- [ ] Create `lib/api/client.ts` with a base `apiFetch()` helper (deferred from Feature 17).
- [ ] Create `lib/context/ProfileContext.tsx` — a React context that stores `{ profile, role, loading, error }` and exposes a `refreshProfile()` method.
- [ ] Wrap the root layout in `<ProfileProvider>` after `<ClerkProvider>`.
- [ ] Replace all `MOCK_TEACHER_ID = "teacher-1"` and `CURRENT_TEACHER_ID = "teacher-1"` hardcoded constants with real `profile.id` / `profile.userId` from context.
- [ ] Add a role guard hook `useRequireRole(role)` that redirects to sign-in if the user is not authenticated or not the required role.
- [ ] Apply `useRequireRole("teacher")` to all `(teacher)` screens.
- [ ] Handle `profile.approvalState !== "approved"` for teacher accounts — show a pending-approval screen instead of the teacher dashboard if the teacher is not yet approved.
- [ ] Remove the `__DEV__`-gated teacher-area button from student home now that real role-based routing and guards exist.
- [ ] Verify `npx tsc --noEmit` passes clean.
- [ ] Verify profile loads correctly after sign-in on a real device.
- [ ] While here, verify the deferred Feature 18 items: email/password sign-up end-to-end, and teacher-role routing via a manually flipped test profile.


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


### Auth Flow (after Features 17–18)
- Clerk is the auth provider; mobile uses `@clerk/expo` with the native `AuthView`/`UserButton`-style component SDK and the built-in token cache (backed by `expo-secure-store`).
- Sign-in and sign-up UI is handled entirely by Clerk's native `<AuthView />` component (email/password + Google OAuth) — no custom form fields were built.
- `AuthView` does not perform navigation itself; a reactive `app/(auth)/_layout.tsx` watches `isSignedIn` and redirects to `/` on completion, handing off to `index.tsx`'s role-based routing.
- Role is always server-assigned: new users default to `role: student` via the Clerk webhook; teacher role is admin-managed only. There is no client-side role-selection step — `select-role.tsx` is a dead-end redirect, not a real screen.
- After any successful sign-in, the mobile app calls `GET /api/profile/me` (server-side profile resolution) to obtain canonical `role` and `teacherApprovalStatus`, with retry/backoff for the 404 "not yet synced" case.
- All protected backend routes must receive `Authorization: Bearer <clerkToken>` header carrying Clerk session tokens obtained via `getToken()` from `useAuth()` (or via a small helper).
- Role-guarded UI (teacher area) must check the server-resolved profile role (not Clerk metadata) before rendering sensitive screens.
- Teacher approval-state gating is enforced server-side; the mobile app must reflect the server's `teacherApprovalStatus` in the UI (Feature 19).
- Route protection is layered: `index.tsx` handles initial boot routing, while `app/(auth)/_layout.tsx`, `app/(student)/_layout.tsx`, and `app/(teacher)/_layout.tsx` each independently guard their own route groups against direct/deep-link navigation while signed out.
- Logout is handled via a shared `components/ui/LogoutButton.tsx` using `useClerk().signOut()`, present on both student and teacher profile screens.


### Env variables (mobile)
- Only add the following to mobile `.env`:
  - `EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY`
  - `EXPO_PUBLIC_API_BASE_URL`
- Do NOT add server-side secrets from web `.env.local` (such as `CLERK_SECRET_KEY` or webhook secrets) to the mobile `.env`.


### Quick verification checklist after Feature 18
- `npx tsc --noEmit` passes.
- `npx expo start --clear` boots without runtime errors.
- App boots signed-out to onboarding or sign-in as expected.
- `ClerkProvider` is present and `tokenCache` is passed in `app/_layout.tsx`.
- Sign-in via `AuthView` (Google OAuth) works and redirects to the correct role-based home screen.
- Logout via `LogoutButton` correctly clears the session and returns to sign-in.
- Navigating directly to a `(student)` or `(teacher)` route while signed out redirects to sign-in via the layout guards.
- Arabic RTL layout unchanged and verified in main screens.