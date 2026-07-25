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

---

# Feature 02 — Install Core Dependencies

## What this feature does

This feature prepares the project for real UI work.

It installs and configures the first layer of mobile dependencies needed for:
- styling with NativeWind
- route-based screen development with Expo Router
- a predictable folder structure for the app codebase

Because the project is following a **mock-data-first** plan, this feature intentionally skips backend-related packages for now:
- no Clerk yet
- no Supabase yet

The final success condition for this feature is:
- Metro starts without errors
- NativeWind `className` styling renders correctly
- TypeScript passes without errors
- the agreed folder structure exists
- the project stays compatible with the current Expo baseline

---

## Why this feature matters

In a web React or Next.js app, styling setup is usually just a matter of:
- installing a package
- updating config
- restarting the dev server

In React Native with Expo, styling touches more layers:
- Babel
- Metro
- CSS entry handling
- route entry files
- TypeScript environment typing

That means this feature is not “just install Tailwind.”
It is really:
- installing NativeWind
- telling Expo how to transform style-aware JSX
- telling Metro how to process the CSS input file
- making sure the route-based app startup can see that styling setup

If this feature is done incorrectly, the project may fail in one of two ways:
- Metro fails to bundle
- the app runs, but `className` styles do nothing

So this feature creates the first real React Native styling pipeline.

---

## Original implementation plan

The original build plan said Feature 02 should install:
- Clerk
- Supabase
- NativeWind
- video packages
- secure storage

and use `npx expo install` where required.

However, the active project plan changed to **mock-data-first**, and backend work is deferred for now.

So for the real implementation of Feature 02, the plan became:

1. Read the architecture and UI docs again
2. Install only what is needed for UI styling now
3. Skip Clerk and Supabase for this phase
4. Configure NativeWind correctly for the current version
5. Create the base folder structure
6. Verify the app still runs cleanly

This is an important engineering adjustment.
We followed the project intent, not just the original static checklist.

---

## Step 1 — Re-read the implementation docs before touching the code

### What we did

Before changing anything, we re-read:
- `mobile-project-overview.md`
- `mobile-architecture.md`
- `mobile-code-standards.md`
- `mobile-ui-context.md`
- `mobile-build-plan.md`
- `mobile-progress-tracker.md`

### Why we did it

This prevented a common mistake:
assuming we remembered the architecture correctly from an earlier session.

The docs confirmed:
- Expo Router stays the navigation foundation
- NativeWind is the styling system
- folders must follow the documented architecture
- backend work is deferred for now in practice

### Engineering note

This is one of the healthiest habits in repo-driven work:
**re-read the source of truth before implementing the next feature**.

In a real team, this reduces drift between:
- architecture documents
- build plans
- actual code

---

## Step 2 — Decide what not to install yet

### What we did

We intentionally did **not** install:
- `@clerk/clerk-expo`
- `@supabase/supabase-js`
- `expo-secure-store`
- `expo-av`
- `react-native-webview`

### Why we did it

The original architecture and build plan include auth, database, video, and secure storage as part of the full app stack.

But the project is currently following a **UI-first / mock-data-first** approach, and the backend phase is deferred.

So the right engineering move was:
- install only what is required for current UI work
- defer backend and media packages to later phases

### Why this matters

This keeps the project smaller and cleaner during the early UI phase.

For a React/Next.js engineer, this is similar to not installing:
- auth SDKs
- API clients
- upload packages

before the screens and navigation shell actually exist

The difference in mobile is that every package decision can affect:
- bundling
- Expo compatibility
- native dependency alignment

So being selective matters even more here.

---

## Step 3 — Install NativeWind and its required dependencies

### What we did

We installed the styling-related packages:

```bash
npm install nativewind@^4.1.23
npm install --save-dev tailwindcss@^3.4.0
npx expo install react-native-css-interop
```

### Why we did it

NativeWind is the library that brings Tailwind-style utility classes to React Native components.[web:10]

The official NativeWind installation guide says to install:
- `nativewind`
- `tailwindcss`

and then continue with Babel setup, Metro config, CSS file setup, CSS import, and TypeScript type setup.[web:10]

### Important note

This was the first place where version awareness really mattered.

Older blog posts and examples often show a different setup pattern.
NativeWind v4 has a specific install flow, and mixing old examples with the current version can break the build.[web:10]

### React vs React Native note

In Next.js, Tailwind usually feels like:
- install package
- add content globs
- import CSS
- done

In Expo + React Native, Tailwind-style support is not native to the runtime.
NativeWind builds a bridge between:
- utility-class authoring
- React Native style objects
- the Metro bundling process

So the setup is more infrastructure-heavy than on the web.

---

## Step 4 — Create `tailwind.config.js`

### What we did

We created a project-level Tailwind config:

```js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        background: "#F6F7FB",
        surface: "#FFFFFF",
        "surface-secondary": "#F9FAFB",
        border: "#E7EAF3",
        "text-primary": "#101828",
        "text-secondary": "#6A7282",
        "text-muted": "#99A1AF",
        accent: "#7C5CFC",
        "accent-light": "#F3E8FF",
        success: "#10B981",
        "success-light": "#D0FAE5",
        warning: "#FF8904",
        error: "#EF4444",
        locked: "#99A1AF",
      },
    },
  },
  plugins: [],
};
```

### Why we did it

The NativeWind docs say to create `tailwind.config.js`, include the paths to the component files, and add the NativeWind preset.[web:10]

We also needed the app’s design tokens from the UI context doc, which says to use NativeWind tokens in `tailwind.config.js` and not hardcode colors inside components.

### Why this matters

This file has two jobs:

1. Tell Tailwind which files may contain utility classes
2. Define the design tokens the app is allowed to use

That second job is especially important here.

This file is not just a build file.
It is also part of the design system.

### React vs React Native note

This part feels familiar to a web engineer.

The difference is:
in React Native, those class names are not going to the browser DOM.
They are being interpreted into React Native styling through NativeWind.

So the Tailwind config is similar in concept, but the runtime target is different.

---

## Step 5 — Create `global.css`

### What we did

We created a root CSS file:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

### Why we did it

The NativeWind installation guide explicitly says to create a CSS file and add the Tailwind directives.[web:10]

### Why this matters

Even though React Native is not browser CSS-based, NativeWind still uses a CSS entry file as part of its processing pipeline.

The CSS file is used as the input that Metro and NativeWind consume during bundling.
The NativeWind docs tell you to create the CSS file, then point Metro at it, then import it into the app.[web:10]

### React vs React Native note

In Next.js:
- `globals.css` is a real browser CSS asset

In NativeWind:
- `global.css` is not page CSS in the traditional browser sense
- it is part of the styling compilation pipeline

So it is closer to a **styling input artifact** than a classic DOM stylesheet.

---

## Step 6 — Update `babel.config.js`

### What we did

We updated Babel config for NativeWind-compatible JSX handling.

The working version used for this feature was:

```js
module.exports = function (api) {
  api.cache(true);
  return {
    presets: [
      ["babel-preset-expo", { jsxImportSource: "nativewind" }],
    ],
  };
};
```

### Why we did it

The NativeWind install flow includes a Babel setup step.[web:10]

Expo also documents `babel.config.js` as the root Babel configuration file for projects that need custom Babel behavior.[web:41]

For this setup, Babel needed to understand that JSX should be processed with the NativeWind-aware import source.

### What Babel is here

For a React/Next.js engineer, the simplest explanation is:

**Babel is the JavaScript and JSX transformation layer.**

Expo documents `babel.config.js` as the file used when you need to customize Babel in an Expo app, and new Expo apps use `babel-preset-expo` by default.[web:41]

In this project, Babel is not the bundler.
Babel’s job is more like:
- transform JSX and JavaScript
- apply configured syntax transforms
- prepare code before Metro bundles it

### Why `babel.config.js` exists

`babel.config.js` is the place where the Expo project defines custom Babel behavior.[web:41]

For this feature, the file mattered because NativeWind needed JSX transformation behavior to line up with its styling model.

### Important issue we hit

An earlier config attempt incorrectly used an older NativeWind-style Babel setup and caused Metro to fail with:

- `.plugins is not a valid Plugin property`

That error taught an important lesson:
**version mismatch inside config files can break the entire build even if the rest of the app is fine**.

### Engineering note

For web engineers:
think of Babel here as the **code transformation layer**, not the final bundle packager.

A useful mental model is:
- Babel = transform step
- Metro = bundle step

That is not perfect, but it is accurate enough to reason about the setup.

---

## Step 7 — Create `metro.config.js`

### What we did

We created a Metro config file:

```js
const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require("nativewind/metro");

const config = getDefaultConfig(__dirname);

module.exports = withNativeWind(config, { input: "./global.css" });
```

### Why we did it

The NativeWind installation guide explicitly includes creating or modifying `metro.config.js`.[web:10]

The guide also says Metro must be configured to use the CSS input file.[web:10]

### What Metro is

For a web engineer, Metro is easiest to understand as:

**Metro is the JavaScript bundler used by Expo and React Native.**

Expo’s docs say Expo CLI uses Metro during `npx expo start` and `npx expo export` to bundle JavaScript code and assets, and that Metro is built and optimized for React Native.[web:40]

So if you come from Next.js or Vite, Metro occupies the space of:
- dev bundler
- module graph resolver
- asset bundler
- transformation pipeline coordinator

### Why we use `metro.config.js`

We use `metro.config.js` when the default bundler behavior needs project-specific customization.

For this feature, Metro had to be told:
- NativeWind is participating in bundling
- the CSS input file is `./global.css`

Without this file, NativeWind would not be correctly integrated into the bundling process described by the official install flow.[web:10]

### Why this matters

This is one of the biggest React web to React Native mindset changes.

On the web, you may think:
Tailwind config plus CSS import should be enough.

In Expo NativeWind, that is not enough.
Metro needs to be part of the solution.

### React vs React Native note

A helpful mental mapping is:

- Vite / Webpack / Turbopack in web → bundler role
- Metro in Expo / React Native → bundler role

But Metro is not just Webpack with another name.
It is specifically designed for the React Native runtime and asset model.[web:40]

---

## Step 8 — Import the CSS file in the app entry path

### What we did

We imported the CSS file in `app/_layout.tsx`:

```tsx
import "../global.css";
import { Stack } from "expo-router";

export default function RootLayout() {
  return <Stack />;
}
```

### Why we did it

The NativeWind install flow says the CSS file must be imported into the app.[web:10]

Because this project uses Expo Router, the root layout is a natural place to do that.
It ensures the styling pipeline is loaded from the app startup path.

### Why this matters

If the CSS file exists but is never imported:
- the config can look correct
- Metro can still start
- styles may not apply correctly

So this is one of those steps that looks small but is actually essential.

### React vs React Native note

For a Next.js engineer, this feels similar to importing a global stylesheet in:
- `app/layout.tsx`
or
- `_app.tsx`

That analogy is useful.

The difference is that here the CSS import participates in NativeWind’s style pipeline rather than styling DOM elements directly.

---

## Step 9 — Add NativeWind TypeScript support

### What we did

We created this file:

```ts
/// <reference types="nativewind/types" />
```

inside:

```bash
nativewind-env.d.ts
```

### Why we did it

The NativeWind docs say TypeScript projects should include the type definitions, and one simple method is to create `nativewind-env.d.ts` with the triple-slash reference.[web:10]

### Why this matters

Without this, TypeScript may not properly understand `className` support on React Native components.

For a strict TypeScript codebase, that matters immediately.

### React vs React Native note

In web React, `className` is native to JSX elements like `div` and `button`.

In React Native:
- `View`
- `Text`
- `Pressable`

do not natively mean DOM element with CSS classes.

NativeWind extends that model, and TypeScript needs to know that extension exists.

That is why this file matters.

---

## Step 10 — Create the base folder structure

### What we did

We created the documented app structure while deferring backend-specific files for later.

Example commands:

```bash
mkdir -p app/\(auth\)
touch app/\(auth\)/sign-in.tsx
touch app/\(auth\)/sign-up.tsx
touch app/\(auth\)/select-role.tsx

mkdir -p "app/(student)"
touch "app/(student)/index.tsx"
mkdir -p "app/(student)/[yearId]"
touch "app/(student)/[yearId]/index.tsx"
mkdir -p "app/(student)/[yearId]/[subjectId]"
touch "app/(student)/[yearId]/[subjectId]/index.tsx"
mkdir -p "app/(student)/course"
touch "app/(student)/course/[courseId].tsx"
mkdir -p "app/(student)/watch"
touch "app/(student)/watch/[lessonId].tsx"

mkdir -p "app/(teacher)"
touch "app/(teacher)/dashboard.tsx"
mkdir -p "app/(teacher)/course"
touch "app/(teacher)/course/new.tsx"
mkdir -p "app/(teacher)/course/[courseId]"
touch "app/(teacher)/course/[courseId]/edit.tsx"
mkdir -p "app/(teacher)/course/[courseId]/lessons"
touch "app/(teacher)/course/[courseId]/lessons/new.tsx"
touch "app/(teacher)/enrollments.tsx"

mkdir -p components/student components/teacher components/shared
mkdir -p lib
touch lib/types.ts
mkdir -p constants
touch constants/colors.ts
```

### Why we did it

The architecture doc defines the target app structure, including route groups and shared folders.

The code standards also define naming conventions:
- folders use kebab-case
- components use PascalCase
- utility files use camelCase

### Why this matters

This feature was not only about package installation.
It also created the code organization baseline needed for:
- student flow routes
- teacher flow routes
- shared components
- constants
- local type definitions

### Important implementation decision

The original architecture includes:
- `lib/supabase.ts`
- `lib/clerk.ts`

We intentionally skipped those files in this feature because backend setup is deferred.

That means we followed the architecture shape while still respecting the current delivery phase.

---

## Step 11 — Add placeholder files and a styling smoke test

### What we did

We added small placeholder route files so:
- the structure existed
- TypeScript would not complain about empty modules
- NativeWind could be tested immediately

Example screen:

```tsx
import { View, Text } from "react-native";

export default function PlaceholderScreen() {
  return (
    <View className="flex-1 items-center justify-center bg-background">
      <Text className="text-base font-semibold text-text-primary">
        Placeholder
      </Text>
    </View>
  );
}
```

### Why we did it

This gave us a direct test for the most important question:

**Is NativeWind actually working, not just installed?**

If this screen rendered with the configured token-based classes, we knew the full chain was working:
- Tailwind config
- Babel config
- Metro config
- CSS file
- type support
- startup import path

### Engineering note

This is a good mobile setup pattern:
after config work, create a tiny runtime proof immediately.

Do not trust installation success alone.
Trust a visible runtime confirmation.

---

## Step 12 — Verify the setup locally

### What we did

We started the app with a clean cache:

```bash
npx expo start --clear
```

Then verified:
- Metro starts without errors
- NativeWind `className` renders correctly
- TypeScript has no errors
- the folder structure exists as expected

### Why we did it

This converts configuration work into a real feature completion proof.

### What passed

The confirmed local checks were:
1. Metro starts without errors
2. NativeWind `className` renders correctly
3. No TypeScript errors
4. Folder structure check passed

### Why this matters

This is the real done state of Feature 02.

A configuration feature is not complete when the files merely exist.
It is complete when the app proves the configuration works.

---

## Problems encountered in Feature 02

### Problem 1 — NativeWind version confusion

At first, configuration advice mixed patterns from older NativeWind examples with the currently installed version.

### Why this was risky

NativeWind setup has changed across versions, and old examples are still common in blogs and tutorials.
The official installation flow clearly describes the current process with Tailwind config, Babel setup, Metro config, CSS import, and TypeScript types.[web:10]

### Problem 2 — Incorrect Babel configuration broke bundling

An incorrect Babel config caused Metro bundling to fail with a plugin-related error.

### Why this mattered

This made the app fail before runtime UI validation could even happen.

### Problem 3 — React Native styling pipeline was unfamiliar from a web mindset

The presence of:
- `global.css`
- `babel.config.js`
- `metro.config.js`

can feel strange if you expect styling to behave like web Tailwind.

---

## How those problems were solved

### Solution 1 — Re-check the official NativeWind install flow

We verified the setup against the official installation guide rather than relying on memory or mixed examples.[web:10]

### Solution 2 — Treat Metro and Babel as separate concerns

We clarified the roles:

- **Babel** = code transformation layer.[web:41]
- **Metro** = bundler used by Expo and React Native.[web:40]

That made the config easier to reason about.

### Solution 3 — Use runtime proof instead of config confidence

The final verification was not that the files look right.
It was:
- Metro clean
- `className` works
- TypeScript clean
- folder structure ready

That is the right engineering standard.

---

## React vs React Native lessons from this feature

## Lesson 1 — Tailwind in React Native is not just Tailwind

In web React, Tailwind is mostly a CSS authoring workflow.

In React Native with NativeWind, it becomes a coordination between:
- Tailwind config
- JSX transformation
- Metro bundling
- React Native style resolution

So it is conceptually similar, but mechanically deeper.

## Lesson 2 — Metro matters much earlier than a web engineer expects

A web engineer can often ignore the bundler most of the day.

In Expo and React Native, Metro is front-and-center because Expo uses it directly during development and export, and NativeWind hooks into that flow.[web:40][web:10]

## Lesson 3 — `className` is not native to React Native

NativeWind makes React Native components feel more familiar to a web engineer, but that familiarity is provided by tooling, not by the base runtime.

That is why the config files are necessary.

## Lesson 4 — Config files are part of app behavior

In React Native, a wrong config can be as app-breaking as wrong component code.

That is a more serious reality than many web projects, where some config mistakes still let the page limp along.

---

## Discussion notes for Feature 02

### Why do we need both Babel and Metro?

Because they solve different problems.

- Babel transforms source code and JSX according to project rules.[web:41]
- Metro builds the running app bundle that Expo serves to the device or browser.[web:40]

A useful mental model is:

1. source files enter the transform pipeline
2. Babel applies syntax and JSX transforms
3. Metro resolves modules and assets and serves the app bundle

That is simplified, but directionally correct.

### Why is there a `global.css` file in a React Native app?

Because NativeWind uses a CSS input file as part of its setup flow.
The official install guide explicitly tells you to create one, add Tailwind directives, wire Metro to it, and import it.[web:10]

So the file exists because NativeWind needs a styling input source, not because the app is using browser DOM CSS in the traditional sense.

### Why did we not install video, auth, or backend packages yet?

Because the current project flow is mock-data-first and backend is explicitly deferred for later.

That means doing less now was actually the more correct implementation.

---

## Final output of Feature 02

At the end of this feature, the project had:
- NativeWind installed
- Tailwind config created
- CSS input file created
- Babel config updated
- Metro config added
- NativeWind TypeScript typing enabled
- base folder structure created
- placeholder files created
- verified `className` rendering
- a stable styling foundation for the next UI features

---

## Completion checklist for Feature 02

Feature 02 is complete when all of these are true:

- NativeWind is installed.[web:10]
- Tailwind config exists and includes app and component paths.[web:10]
- NativeWind preset is enabled.[web:10]
- `global.css` exists with Tailwind directives.[web:10]
- `babel.config.js` is updated for the NativeWind setup.[web:10][web:41]
- `metro.config.js` exists and points to the CSS input.[web:10][web:40]
- `global.css` is imported from app startup.[web:10]
- `nativewind-env.d.ts` exists for TypeScript.[web:10]
- the documented folder structure exists
- no Clerk or Supabase packages were installed yet, by design
- Metro starts without errors
- NativeWind `className` renders correctly
- TypeScript passes without errors
- the project is ready for the next feature

---

## Official references

These are the two most important references for this feature:

- NativeWind installation guide: [https://www.nativewind.dev/docs/getting-started/installation](https://www.nativewind.dev/docs/getting-started/installation) [web:10]
- Expo Metro docs: [https://docs.expo.dev/guides/customizing-metro/](https://docs.expo.dev/guides/customizing-metro/) [web:40]
- Expo Babel docs: [https://docs.expo.dev/versions/latest/config/babel/](https://docs.expo.dev/versions/latest/config/babel/) [web:41]

One important caution: because NativeWind examples online vary by version, always prefer the official install guide over third-party snippets when updating this setup.[web:10]