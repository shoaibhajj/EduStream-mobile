# EduStream Mobile — Progress Tracker

## Current Status
Feature 03 complete — the student browse flow now works with mock data, Expo Router navigation, and the Academic Years → Subjects → Courses path. The app still runs correctly with Expo Router and NativeWind.

## Next Up
Feature 04 — Build Shared Design Foundations

## Build Progress

### Completed
- 01 — Create Expo Project
- 02 — Install Core Dependencies
- 03 — Build Student Browse Screens with Mock Data

### In Progress
- None

### Not Started
- 04 — Build Shared Design Foundations
- 05 — Create Mock Data Layer
- 06 — Build Student Home Screen
- 07 — Build Subject/Course Browsing Screens
- 08 — Build Course Detail and Lessons Screens
- 09 — Build Teacher Home Screen
- 10 — Build Teacher Course Management UI
- 11 — Build Profile and Payment Info Screens
- 12 — Connect Navigation Flows
- 13 — Polish UI and Empty/Error States
- 14 — Prepare First APK Build
- 15 — Backend Phase (deferred for now per mock-data-first plan)

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

## Architecture Decisions
- Keep the project UI-first and mock-data-first until the dedicated backend phase.
- Use NativeWind as the styling system with shared design tokens defined through Tailwind config.
- Keep Expo Router file-based routing as the app navigation foundation.
- Use dynamic route segments for student browse flow: year → subject → courses.
- Keep mock data functions async and aligned with future backend return shapes so the data layer can later swap to Supabase with minimal screen changes.
- Do not install Clerk or Supabase during the current mock-data-first phase, even though the original architecture/build docs include them, because backend integration is intentionally postponed.

## Notes / Risks
- NativeWind v4 configuration must follow the current installation flow exactly; older Babel examples can break Metro bundling.
- Backend-related setup remains intentionally excluded for now, so auth, profile sync, and remote data files should wait until the backend phase.
- Current browse models are intentionally minimal; richer fields such as thumbnails, long descriptions, lessons, and video links should be added in later course-detail and player features rather than expanding browse scope too early.
- Future steps should build on the working NativeWind + Expo Router baseline without reintroducing outdated config patterns.