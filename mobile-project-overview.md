# EduStream Mobile — Project Overview

Repo: https://github.com/shoaibhajj/EduStream-mobile.git

## Overview

EduStream Mobile is the Android APK for the EduStream school platform. It is built with Expo + React Native and is the primary product that must be delivered first. Teachers create courses, add lessons as uploaded videos or external video links, and manually confirm student payments. Students sign in, browse academic years and subjects, preview one free lesson per course, request enrollment, and watch unlocked lessons after payment confirmation.

This mobile app is a standalone project. It does not depend on the web repo to run. It connects directly to the shared Supabase backend and the shared Clerk project.

## Goals

1. Build the Android APK first, before the website.
2. Let a student install the app, sign in, browse courses, preview a lesson, and request enrollment.
3. Let a teacher create a course, add lessons, publish content, and confirm student payments from mobile.
4. Keep the project simple and stable — no monorepo, no shared npm workspace, no avoidable dependency conflicts.

## Core User Flow

### Student
1. Student signs up or signs in with Clerk.
2. Student selects the `student` role.
3. Student browses Academic Years that contain published courses.
4. Student opens a Year, then a Subject, then a Course.
5. Student watches a free preview lesson if available.
6. Student taps Enroll and sees the teacher payment info.
7. Student pays externally and taps "I've Paid".
8. Enrollment becomes `pending`.
9. Teacher confirms payment.
10. Student can now watch all lessons in that course.

### Teacher
1. Teacher signs up or signs in with Clerk.
2. Teacher selects the `teacher` role.
3. Teacher opens the dashboard.
4. Teacher creates a course with title, subject, year, description, price, and thumbnail.
5. Teacher adds lessons by either uploading a video or pasting a YouTube/Vimeo link.
6. Teacher marks one lesson as free preview if needed.
7. Teacher publishes the course.
8. Teacher reviews pending enrollments and confirms or rejects them.

## Features

### Authentication
- Clerk auth for email/password and Google sign-in.
- Role selection after first login.
- Role-aware routing between student and teacher areas.

### Student Features
- Browse hierarchy: Academic Year → Subject → Course.
- Course detail page with lesson list.
- Free preview lesson support.
- Manual payment request flow.
- Video playback for Cloudinary, YouTube, and Vimeo.

### Teacher Features
- Teacher dashboard.
- Course creation and editing.
- Lesson creation and editing.
- Pending enrollment management.
- Manual payment confirmation.

## Scope

### In Scope
- Android APK only.
- Expo + React Native app.
- Clerk authentication.
- Supabase database and storage.
- Cloudinary-hosted video support.
- YouTube/Vimeo link support.
- Student and teacher roles.
- Manual payment confirmation flow.

### Out of Scope
- Admin panel.
- Payment gateway integration.
- iOS build.
- Chat, notifications, certificates, and live classes.

## Success Criteria

1. A student can install the APK, sign in, browse courses, and watch a free preview lesson.
2. A student can submit a payment request and a teacher can confirm it from mobile.
3. A teacher can create a course and add at least one lesson from mobile.
4. Hidden or empty years and subjects do not appear in the student browse flow.
