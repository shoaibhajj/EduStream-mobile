# EduStream Mobile — How We Implement Each Feature

This file is a living implementation guide for the EduStream Mobile project.

For each feature, this document records:
- what the feature was
- the exact steps used to implement it
- the exact commands used
- why those steps were needed
- what issues happened
- how they were solved
- important React vs React Native differences
- engineering notes worth remembering later

---

# Feature 01 — Create Expo Project

## What this feature does

Creates the first working Expo app baseline for the EduStream Mobile project using:
- Expo
- TypeScript
- Expo Router
- the existing GitHub repository

This feature is only about project setup.
It does **not** build EduStream screens yet.

The final success condition for this feature is:
- the app runs on web
- the app runs on Android Expo Go
- the app is inside the real GitHub repo
- the repo is ready for the next feature

---

## Why this feature matters

Without a stable project baseline, every next feature becomes risky.

This setup feature gives us:
- a working mobile runtime
- TypeScript support
- a navigation foundation
- the correct repository base for the full app

In React web, setup problems are usually easier to recover from.
In React Native, project setup problems can affect:
- bundling
- device runtime
- native libraries
- Expo Go behavior
- platform-specific navigation

So this feature is more important than it first appears.

---

## Original implementation plan

The original plan was:

1. Check local prerequisites
2. Create a blank Expo TypeScript app
3. Install Expo Router manually
4. Configure the app for Router
5. Connect it to the existing GitHub repo
6. Push the first commit
7. Verify local mobile and web startup

This was a valid plan because Expo supports creating a new app with `create-expo-app`, and Expo Router can be added to a project by using the `app/` directory and root `_layout.tsx` conventions.[web:8][web:78]

---

## Step 1 — Check prerequisites

### What we did

Before creating the app, we verified that the local machine had the required tools:

```bash
node --version
npm --version
git --version
```

### Why we did it

This confirmed that:
- Node.js was installed
- npm was available
- git was available

This matters because Expo depends on Node and npm, and the project must be connected to Git.

### Important note

For Expo work, Node version matters more than many web projects.
If the Node version is unsupported, startup or package behavior can break even before app code is written.

### React vs React Native note

This step feels the same as React web setup.
The difference comes later, when React Native depends not only on JavaScript tooling, but also on the mobile runtime and Expo environment.

---

## Step 2 — Create the initial Expo project

### What we first did

We created the app from a blank TypeScript template:

```bash
npx create-expo-app@latest EduStream-mobile --template blank-typescript
cd EduStream-mobile
```

### Why we did it

We wanted:
- a clean start
- TypeScript support
- minimal files
- full control over adding Router ourselves

This is a normal frontend-engineering instinct: start small, then wire in only what is needed.

### What we expected

We expected to:
- install Expo Router manually
- create the route files ourselves
- keep the project intentionally minimal

### What actually happened

This setup worked at first on a structural level, but later became unstable on Android Expo Go.

That means the blank TypeScript base itself was not the problem, but the total manual setup path later became unreliable for this repo/device combination.

---

## Step 3 — Install Expo Router manually

### What we did

We installed the Router-related packages:

```bash
npx expo install expo-router react-native-safe-area-context react-native-screens expo-linking expo-constants expo-status-bar
```

### Why we did it

These packages were needed for a basic Router-enabled Expo app:

- `expo-router` → file-based navigation[web:74][web:78]
- `react-native-safe-area-context` → safe areas on phones
- `react-native-screens` → screen handling for navigation
- `expo-linking` → route/deep-link support
- `expo-constants` → runtime constants
- `expo-status-bar` → status bar control

### React vs React Native note

In Next.js, routing is built into the framework.

In React Native with Expo:
- routing is not “the browser route system”
- routing becomes an app navigation layer
- Expo Router uses file-based conventions, but the runtime is still native mobile navigation

So although the structure feels familiar, the execution model is different.[web:78][web:74]

---

## Step 4 — Point the app entry to Expo Router

### What we did

We changed `package.json` so the main entry used Expo Router:

```json
"main": "expo-router/entry"
```

### Why we did it

Without this, the app can still behave like a classic Expo app using the default app entry, rather than starting through the Router.

Expo Router expects the app to boot through its Router entry so it can resolve routes from the `app/` directory.[web:78]

### Why this matters

This was one of the most important setup steps.
If the app entry is wrong:
- `app/index.tsx` may not be used correctly
- `App.tsx` may still appear to control startup
- Router behavior may be confusing

### React vs React Native note

In Next.js, route wiring is framework-native and mostly hidden.

In Expo Router, the route file system is also convention-based, but startup still depends on the app entry being configured correctly.

---

## Step 5 — Configure `app.json` for Router

### What we did

We updated `app.json` with:
- app name
- slug
- scheme
- android package
- router plugin
- typed route experiment

The config looked like this:

```json
{
  "expo": {
    "name": "EduStream",
    "slug": "edustream-mobile",
    "version": "1.0.0",
    "orientation": "portrait",
    "scheme": "edustream",
    "userInterfaceStyle": "light",
    "android": {
      "adaptiveIcon": {
        "foregroundImage": "./assets/adaptive-icon.png",
        "backgroundColor": "#7C5CFC"
      },
      "package": "com.shoaibhajj.edustream"
    },
    "plugins": [
      "expo-router"
    ],
    "experiments": {
      "typedRoutes": true
    }
  }
}
```

### Why we did it

This gave the app:
- proper app identity
- Router plugin support
- route typing support
- Android package identity
- deep-link scheme support

### Why this matters

Even if the app boots, incomplete app configuration creates problems later for:
- navigation behavior
- package behavior
- build identity
- deep linking
- future distribution

---

## Step 6 — Create the first Router route files

### What we did

We created the base folder structure:

```bash
mkdir -p app components/student components/teacher components/shared lib constants
```

Then we created `app/_layout.tsx`:

```tsx
import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: 'EduStream' }} />
    </Stack>
  );
}
```

And `app/index.tsx`:

```tsx
import { View, Text } from 'react-native';

export default function HomeScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>EduStream Mobile — Setup OK ✓</Text>
    </View>
  );
}
```

### Why we did it

Expo Router requires route files inside the `app/` directory, and the root `_layout.tsx` controls the route tree.[web:78][web:315]

Important concepts:
- `app/index.tsx` becomes the first route at `/`.[web:78]
- `app/_layout.tsx` is the root layout.[web:78]
- non-route components should live outside `app/`.[web:78]

### React vs React Native note

This feels close to Next.js app routing, but with a mobile-native result.

Think of it like this:
- `app/index.tsx` = route file
- `_layout.tsx` = shared route wrapper
- but instead of HTML pages in a browser, these are native mobile screens

---

## Step 7 — Connect the app to the existing GitHub repo

### What we did

We connected the new local project to the existing GitHub repository:

```bash
git init
git remote add origin https://github.com/shoaibhajj/EduStream-mobile.git
git fetch origin
git checkout -b main --track origin/main
```

If the branch already existed locally, we used:

```bash
git checkout main
```

Then we staged and pushed:

```bash
git add .
git commit -m "feat: 01 — Create Expo project with TypeScript and Expo Router"
git push origin main
```

### Why we did it

The GitHub repo already existed and already contained the project context markdown files.
So we had to connect the local app setup to that existing repo instead of creating a separate unrelated project.

### Why this matters

In this project, the repo is not just source code storage.
It also contains:
- planning files
- architecture rules
- workflow rules
- progress tracking

So connecting the app correctly to the repo is part of the feature, not a side detail.

---

## Step 8 — Verify local startup

### What we did

We started the app locally:

```bash
npx expo start
```

Then tested:
- web
- Expo Go on Android

### What we expected

We expected the app to show the Router screen from `app/index.tsx`.

### What happened first

The app opened, but mobile behavior was incorrect.
At one point, the app still showed `App.tsx` content instead of the Router route.

That told us the app startup path was still not behaving as expected.

### What we investigated

We checked:
- `package.json`
- `app.json`
- `babel.config.js`
- route files
- existence of `App.tsx`
- root `index.js` / `index.ts`
- Metro logs
- Android logs

This was necessary to prove whether Router was really active.

---

## Step 9 — Debug the broken manual setup

### What we did

We performed multiple debugging steps:

#### A. Clean caches
```bash
rm -rf .expo
rm -rf node_modules
rm package-lock.json
npm install
npx expo start --clear
```

#### B. Remove old conflicting root files
We checked for:
- `App.tsx`
- `index.js`
- `index.ts`

#### C. Validate config
We confirmed:
- `"main": "expo-router/entry"`
- Router files existed
- Babel config used `babel-preset-expo`

#### D. Read runtime logs
We checked Android log output and Metro output.

### What we learned from logs

The logs proved:
- Router bundle was loading
- mobile was not failing because Router was missing
- the runtime later crashed in native execution after startup[ file:252 ]

This changed the debugging strategy.

### Engineering lesson

This is important:

A React Native app can be “configured correctly” on paper and still fail at runtime on device.

That is a major difference from typical React web setup.

---

## Step 10 — Stop patching the broken setup

### Why we changed strategy

At this point:
- the manual setup had already consumed time
- web worked
- mobile still had unstable behavior
- logs showed runtime-level failure

So continuing to patch the same setup was not the best engineering choice.

### Better approach

Use a fresh official template that is already known to work.

This is often the right move in mobile:
- reduce unknown state
- replace unstable setup
- continue from a known-good baseline

---

## Step 11 — Create a fresh working Expo Router app

### What we did

We created a fresh second app:

```bash
npx create-expo-app@latest EduStream-mobile-fresh
```

Then we selected the Router-enabled navigation TypeScript template from the official starter flow.[web:8][web:25]

### Why we did it

We needed to answer one question:

Is the problem:
- our repo project state?
or
- the device / Expo Go / environment?

### Result

The fresh app worked.
That proved:
- Expo Go was fine
- the phone was fine
- the problem was in our repo setup state, not the device

This was the most important debugging proof in Feature 01.

---

## Step 12 — Replace the broken repo runtime with the fresh working baseline

### What we did

We copied the working app files from `EduStream-mobile-fresh` into the real repo project, while keeping the project markdown files and repo identity.

In practice, this involved:
- backing up the broken repo version
- removing app/runtime files from the repo app
- copying the working fresh-template files into the repo app
- reinstalling dependencies
- starting Expo again

### Why we did it

The fresh template was already proven to run on mobile.
So it became the safest baseline for the actual repo.

### Important idea

We did **not** abandon the repo.
We only replaced the unstable app runtime files with known-good ones.

That allowed us to keep:
- GitHub repo continuity
- context markdown files
- project workflow files
- progress tracking

---

## Step 13 — Reinstall and test again

### What we did

Inside the real repo app, we ran:

```bash
npm install
npx expo start --clear
```

Then tested the repo app again in Expo Go.

### Final result

This time the repo app worked.
The app launched successfully on Android Expo Go and Metro bundled `expo-router/entry.js`.

That means the actual repo was now in a good state.

---

## Step 14 — Update progress tracking

### What we did

After Feature 01 became truly complete, we prepared updates for:
- `mobile-progress-tracker.md`

The tracker needed to reflect:
- Feature 01 completed
- current status
- next up
- session notes
- architecture decision about using the fresh official Expo Router baseline

### Why we did it

This project’s workflow explicitly requires the tracker to be updated when a feature is completed.

That means progress tracking is not optional documentation.
It is part of implementation completeness.

---

## Step 15 — Prepare the final commit

### What we did

Once the repo app worked and tracker updates were ready, the final step was:

```bash
git status
git add .
git commit -m "feat: 01 — create Expo Router project and update progress tracker"
git push origin main
```

### Why we did it

This creates a clean checkpoint:
- working app
- tracker updated
- repo synchronized
- ready for Feature 02

---

## Problems encountered in Feature 01

### Problem 1 — Router did not behave correctly on mobile at first
At one stage, `App.tsx` behavior appeared to take precedence over the Router route.

### Problem 2 — Web worked, mobile did not
This created misleading confidence, because the project looked “almost correct.”

### Problem 3 — Android app opened then closed
This showed the issue had moved from configuration-level failure into runtime-level failure.

### Problem 4 — Manual setup became unreliable
Even when files looked correct, the mobile app was still unstable.

---

## How those problems were solved

### Solution 1 — Verify the Router entry path
We confirmed:
- `main` in `package.json`
- route files
- root layout behavior

### Solution 2 — Use runtime logs, not guesses
Instead of assuming the issue, we checked actual mobile logs.

### Solution 3 — Prove whether the device was the problem
The fresh template test isolated the issue.

### Solution 4 — Replace broken runtime files with a known-good baseline
This was the actual fix.

---

## React vs React Native lessons from this feature

## Lesson 1 — Similar routing idea, different runtime reality

Expo Router feels familiar to a Next.js developer because it is file-based.[web:78]

But React Native routing is still tied to:
- native screen transitions
- app startup
- mobile runtime
- Expo client behavior

So the mental model transfers partially, but not completely.

## Lesson 2 — Mobile startup is more fragile than web startup

In web React:
- if the dev server runs and the route exists, the page often renders

In React Native:
- the route may exist
- Metro may bundle correctly
- the app may still fail on device

That is a major practical difference.

## Lesson 3 — Official scaffolds are often more valuable in mobile

Web developers often enjoy hand-building setup.

In React Native, official scaffolds reduce risk because:
- native runtime compatibility matters
- startup wiring matters
- platform-specific behavior matters

## Lesson 4 — The `app/` directory is route-only space

Expo Router expects route files inside `app/`, while other code should live elsewhere.[web:78]

This is similar to route separation in a framework, but in React Native it matters even more because route misplacement can affect navigation resolution.

---

## Discussion notes for Feature 01

### Why did the fresh template work when the manual setup struggled?

Because official templates are already aligned across:
- dependencies
- generated files
- Router conventions
- Expo expectations

A manual setup can be logically correct but still contain one or more small mismatches that are hard to spot.

### Was the original manual approach wrong?

Not completely.
It was a valid attempt.

But once the setup became unstable on Android, continuing to fight it was no longer the best engineering decision.

### What is the main React Native lesson here?

Building the app is not only about React components.
It is also about maintaining a healthy relationship between:
- JavaScript code
- routing setup
- package versions
- Expo runtime
- real device execution

---

## Final output of Feature 01

At the end of this feature, the project had:
- a working Expo app
- TypeScript
- Expo Router
- a real GitHub repo integration
- successful mobile startup
- successful web startup
- updated progress tracking
- a stable baseline for the next feature

---

## Completion checklist for Feature 01

Feature 01 is complete when all of these are true:

- Node, npm, and git are available
- the Expo app exists inside the repo
- TypeScript is enabled
- Expo Router is active
- `app/_layout.tsx` exists
- `app/index.tsx` exists
- the app runs on Android Expo Go
- the app runs on web
- repo files are pushed to GitHub
- `mobile-progress-tracker.md` is updated

---

## Reusable format for future features

For every next feature, use this structure:

# Feature XX — [Feature Name]

## What this feature does
A plain explanation of the feature.

## Why this feature matters
Why it exists in the bigger app.

## Original implementation plan
The intended first approach.

## Step 1 — ...
- what we did
- exact commands
- why we did it

## Step 2 — ...
- what we did
- exact commands
- why we did it

## Problems encountered
What went wrong.

## How we solved them
What actually fixed the feature.

## React vs React Native notes
Concepts a React / Next.js engineer should understand here.

## Discussion notes
Engineering lessons, tradeoffs, and reasoning.

## Final output
What the feature produced.

## Completion checklist
How we know the feature is really done.