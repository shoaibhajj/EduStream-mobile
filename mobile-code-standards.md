# EduStream Mobile — Code Standards

Repo: https://github.com/shoaibhajj/EduStream-mobile.git

## General Rules

- Read `mobile-project-overview.md` and `mobile-architecture.md` before implementing any feature.
- Build one feature at a time, in the order defined in `mobile-build-plan.md`.
- Keep components small and single-purpose.
- Prefer simple readable code over abstraction.

## TypeScript

- Strict mode enabled.
- Never use `any`.
- Type all function parameters and return values.
- Use `type` for objects and unions unless `interface` is genuinely better.

## Expo and React Native

- Use Expo Router for routing.
- Root auth logic belongs in `app/_layout.tsx`.
- Every screen must define loading, empty, and error states.
- Use `npx expo install` for native packages such as `expo-av`, `expo-secure-store`, and `react-native-webview`.

## Files and Naming

- Folders use kebab-case.
- Components use PascalCase.
- Utility files use camelCase.
- One component per file.
- Screen files may use default export because Expo Router expects it.
- Shared components should use named exports.

## Error Handling

- Every async function uses try/catch.
- Never show raw backend errors to users.
- Log errors with a context prefix like `[teacher/dashboard]`.

## Supabase Rules

- Use only the anon key in mobile.
- Always handle the `error` value returned by Supabase.
- Scope queries correctly to the current user where needed.
- Use `.single()` only when exactly one row is expected.

## Approved Dependencies

- `@clerk/clerk-expo`
- `@supabase/supabase-js`
- `expo-router`
- `expo-av`
- `react-native-webview`
- `expo-secure-store`
- `nativewind`
- `tailwindcss`
- `zod`
