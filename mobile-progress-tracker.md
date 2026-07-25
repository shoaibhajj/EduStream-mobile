# EduStream Mobile — Progress Tracker


## Current Status
Feature 09 complete — The student subject/course browsing flow is now polished and connected from the student home experience through academic year, subject, course list, and course detail using the mock data layer only. Arabic remains the default experience, RTL was rechecked after the browsing refinements, English still works for the same flow, and local verification passed after the nested Expo Router header cleanup and safe-area handling adjustments.


## Next Up
Feature 10 — Build Course Detail and Lessons Screens


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


### In Progress
- None


### Not Started
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
- Updated student navigation calls to use the new route structure and corrected Expo Router typed-route usage for dynamic params.
- Confirmed the app now opens to the student home screen by default through the root redirect.
- Confirmed students can navigate from Home to Browse, then into Year → Subject → Course Detail → Watch flow after the route restructure.
- Confirmed Arabic home layout was visually tested first in RTL, then rechecked in English after the same navigation changes.
- Confirmed mock-data-driven content renders on Home without embedding arrays directly in the screen component.
- Confirmed the tab bar now shows only the intended student destinations instead of detail routes.
- Refined the subject/course browsing flow under the current Feature 09 scope using the tracker numbering as the source of truth.
- Fixed the broken subjects empty-state translation key so browse empty states now render valid localized text instead of a placeholder key.
- Added localized browse-screen titles and section labels for academic year selection, subject selection, and subject course browsing.
- Loaded year and subject metadata from the mock data layer so nested browse screens show contextual headers without embedding lookup logic inside components.
- Fixed RTL-sensitive course list spacing by replacing directional margin usage with end-safe spacing.
- Updated the root Expo Router stack so hidden parent headers no longer leak route-group labels like `(student)` into the visible UI.
- Confirmed the remaining visible header is the intended nested browse stack header, with screen titles controlled by `title` options rather than route names.
- Reused `ScreenContainer` for headerless screens where safe-area padding is needed after removing the native header.
- Confirmed the student home greeting no longer renders under the device notch/camera area after applying the safe-area wrapper.
- Verified local flow works from Home → Browse → Academic Year → Subject → Course List → Course Detail in Arabic first, then English.
- Confirmed `npx tsc --noEmit` still passes after the browsing-flow refinements and navigation header cleanup.


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
- All shared visual primitives live in `components/ui/` and are the required building blocks for new screens going forward — no new screen should re-declare card, button, or badge styles inline.
- Spacing, radius, and typography size tokens used outside `className` contexts live in `constants/design.ts`; color tokens remain the single responsibility of `constants/colors.ts` and `tailwind.config.js`.
- Mock data is now intentionally separated by concern under `lib/mock-data/` so upcoming student home, teacher dashboard, and profile/payment screens can import stable query-like functions instead of embedding ad hoc arrays in screen files.
- `shared.ts` owns reusable academic hierarchy lookup data, while `student.ts`, `teacher.ts`, and `profile.ts` own role-specific query functions.
- The student area now uses a tabs-plus-nested-browse-stack structure: visible student entry points stay in the tab bar, while detail routes live outside the tab tree and are pushed as standalone dynamic screens.
- Dynamic navigation should follow Expo Router typed-route-safe patterns for parameterized screens when string interpolation causes route typing conflicts.
- Parent navigator headers should stay hidden when a nested child navigator is responsible for the visible page header, to avoid duplicate headers or leaked route-group labels.
- `ScreenContainer` should be the default outer wrapper for headerless full-screen pages that need safe-area protection; screens with visible native headers should only add safe-area edges when visually necessary.


## Notes / Risks
- NativeWind v4 configuration must follow the current installation flow exactly; older Babel examples can break Metro bundling.
- Backend-related setup remains intentionally excluded for now, so auth, profile sync, and remote data files should wait until the backend phase.
- Current browse models are intentionally minimal; richer fields such as thumbnails, long descriptions, lessons, and video links should be added in later course-detail and player features rather than expanding browse scope too early.
- Future steps should build on the working NativeWind + Expo Router baseline without reintroducing outdated config patterns.
- `I18nManager.forceRTL(true)` requires a full app restart to take effect on Android (iOS Simulator restarts automatically). This is standard React Native behavior.
- The temporary language toggle added for testing should be removed or gated behind a `__DEV__` flag before any production build.
- Feature numbering shifted by +1 from Feature 05 onward due to the insertion of the localization feature at position 04.
- The Watch screen is a placeholder only. Real video playback (`expo-av` + WebView embed) is deferred to a later feature. The screen already receives the correct `lessonId` param via Expo Router dynamic routing.
- Going forward, any new screen that needs a card, button, badge, empty state, or loading spinner must import from `components/ui/` rather than writing new inline Tailwind class strings, to keep the design system from fragmenting again.
- The new `teacher.ts` and `profile.ts` mock modules are expected to have no visible effect until the teacher, home, profile, and payment-related screens are implemented.
- Expo Router route restructuring can easily create confusion between route groups, visible tabs, and standalone detail routes; future navigation changes should keep top-level destinations and pushed detail screens clearly separated.
- Dynamic routes should be rechecked with TypeScript after any file move so generated typed-route definitions stay aligned with the current app tree.
- Safe-area handling now depends on whether a screen owns its own visible header or relies on a headerless layout; future screens should choose wrappers accordingly to avoid either notch overlap or double top spacing.