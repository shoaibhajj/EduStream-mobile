# EduStream Mobile — Progress Tracker

## Current Status
Feature 05 complete — Course Detail screen, lesson list, free preview and locked states are fully built with mock data. Navigation from the course list into Course Detail, and from a preview lesson into the Watch screen placeholder, both work. Arabic is the default experience; English is confirmed working via the language toggle.

## Next Up
Feature 06 — Build Shared Design Foundations

## Build Progress

### Completed
- 01 — Create Expo Project
- 02 — Install Core Dependencies
- 03 — Build Student Browse Screens with Mock Data
- 04 — Add Arabic-First Localization Foundation
- 05 — Build Course Detail + Lesson List + Preview/Locked States

### In Progress
- None

### Not Started
- 06 — Build Shared Design Foundations
- 07 — Create Mock Data Layer
- 08 — Build Student Home Screen
- 09 — Build Subject/Course Browsing Screens
- 10 — Build Course Detail and Lessons Screens
- 11 — Build Teacher Home Screen
- 12 — Build Teacher Course Management UI
- 13 — Build Profile and Payment Info Screens
- 14 — Connect Navigation Flows
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

## Architecture Decisions
- Keep the project UI-first and mock-data-first until the dedicated backend phase.
- Use NativeWind as the styling system with shared design tokens defined through Tailwind config.
- Keep Expo Router file-based routing as the app navigation foundation.
- Use dynamic route segments for student browse flow: year → subject → courses → course detail → watch.
- Keep mock data functions async and aligned with future backend return shapes so the data layer can later swap to Supabase with minimal screen changes.
- Do not install Clerk or Supabase during the current mock-data-first phase, even though the original architecture/build docs include them, because backend integration is intentionally postponed.
- Arabic is the primary/default language. English is secondary. Language is hardcoded to Arabic for now; device locale detection is deferred until a later settings feature.
- RTL is enforced globally via `I18nManager.forceRTL(true)`. Full RTL layout takes effect after a full app restart on Android. All new screens must avoid hardcoded `left`/`right` assumptions in styles — use `Start`/`End` variants (e.g., `marginStart`, `paddingEnd`) where directional spacing is needed.
- All visible UI strings must live in translation files under `lib/i18n/`. Hardcoded text in JSX is not allowed from Feature 04 onward.
- Lesson access logic (preview vs locked) lives in the screen for now using the `isPreview` field. When Supabase is connected, this will be replaced by checking enrollment status from RLS-protected queries.

## Notes / Risks
- NativeWind v4 configuration must follow the current installation flow exactly; older Babel examples can break Metro bundling.
- Backend-related setup remains intentionally excluded for now, so auth, profile sync, and remote data files should wait until the backend phase.
- Current browse models are intentionally minimal; richer fields such as thumbnails, long descriptions, lessons, and video links should be added in later course-detail and player features rather than expanding browse scope too early.
- Future steps should build on the working NativeWind + Expo Router baseline without reintroducing outdated config patterns.
- `I18nManager.forceRTL(true)` requires a full app restart to take effect on Android (iOS Simulator restarts automatically). This is standard React Native behavior.
- The temporary language toggle added for testing should be removed or gated behind a `__DEV__` flag before any production build.
- Feature numbering shifted by +1 from Feature 05 onward due to the insertion of the localization feature at position 04.
- The Watch screen is a placeholder only. Real video playback (`expo-av` + WebView embed) is deferred to a later feature. The screen already receives the correct `lessonId` param via Expo Router dynamic routing.