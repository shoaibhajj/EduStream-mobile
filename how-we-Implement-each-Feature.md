# EduStream Mobile — How We Implement Each Feature

> ## Important note for any AI agent writing in this file
>
> This file is not just project documentation.
> It is a **practical implementation guide** for the EduStream Mobile project.
>
> The main audience for this file is a software engineer who already works with:
> - React
> - Next.js
>
> but is using this project to learn and reason more deeply about:
> - React Native
> - Expo
> - Expo Router
> - NativeWind
> - mobile-specific engineering decisions
>
> Because of that, every feature written in this file must do more than summarize the result.
> It must explain the feature in a way that helps a React / Next.js engineer understand:
> - what was built
> - why it was built that way
> - how it was implemented step by step
> - what problems happened
> - how those problems were solved
> - what is different in React Native compared with React web / Next.js
> - what engineering lessons are important to remember later
>
> This file should always be written as a **real guide**, not as short release notes, not as a vague summary, and not as AI-style generic documentation.
>
> ### Writing purpose
>
> The purpose of each feature entry in this file is:
> 1. to document exactly what was done
> 2. to explain the implementation decisions clearly
> 3. to preserve engineering reasoning for future sessions
> 4. to teach React Native concepts through real project work
> 5. to produce content that is immediately useful to copy, study, and revisit later
>
> ### Required writing style
>
> Any AI agent writing in this file should follow these rules:
>
> - Write in clean Markdown that is ready to **copy and paste directly into this `.md` file**
> - Use proper headings and structure
> - Write complete sections, not partial notes
> - Be concrete and specific, not vague
> - Include exact commands when commands were part of the implementation
> - Include exact file names and folders when they matter
> - Include code snippets only when they help explain the implementation
> - Explain **why** each step mattered, not only **what** happened
> - Include practical React vs React Native notes where useful
> - Include engineering discussion and lessons, not only mechanical steps
> - Keep the writing clear enough for later reuse in future features
>
> ### Required format for each feature
>
> Unless there is a strong reason to change it, each feature should follow this structure:
>
> ```md
> # Feature XX — [Feature Name]
>
> ## What this feature does
> ## Why this feature matters
> ## Original implementation plan
> ## Step 1 — ...
> ## Step 2 — ...
> ## Problems encountered
> ## How those problems were solved
> ## React vs React Native lessons from this feature
> ## Discussion notes
> ## Final output of Feature XX
> ## Completion checklist for Feature XX
> ## Official references
> ```
>
> ### Important quality rule
>
> The output must be good enough to be pasted into this file **without needing rewriting**.
>
> That means the writing should already be:
> - organized
> - readable
> - technically useful
> - consistent with the rest of the file
> - suitable for long-term project documentation
>
> ### What to avoid
>
> Any AI agent writing here should avoid:
> - short shallow summaries
> - generic AI phrasing
> - bullet-only explanations with no reasoning
> - undocumented code dumps with no context
> - writing that assumes the reader is new to programming
> - writing that ignores the React / Next.js background of the reader
> - output that is not ready to paste directly into Markdown
>
> ### Final reminder
>
> This file is a **real React Native learning-and-implementation guide** built from the actual EduStream Mobile project.
>
> Write each feature so that a future AI agent — or the engineer reading it later — can quickly understand:
> - what happened
> - why it happened
> - how it was implemented
> - what should be remembered for the next feature



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



------

# Feature 04 — Add Arabic-First Localization Foundation

## What this feature does

This feature adds the first real localization foundation to the EduStream mobile app.

It does **not** add backend localization, server-driven translation, or user profile language sync.

Instead, it prepares the app to:
- launch in Arabic by default
- support English as a secondary language
- render the UI with RTL awareness
- move visible UI strings out of screen files and into translation files
- keep the project ready for future screens without repeating hardcoded text

This feature was inserted into the plan before the old Feature 04, so from this point forward the remaining feature numbers shift by +1.

The final success condition for this feature is:
- Arabic is the default app language
- the student browse flow renders in Arabic first
- the app is prepared for RTL layout behavior
- translation files exist for Arabic and English
- the previously built student screens no longer use hardcoded visible English strings
- the project now has a reusable translation foundation for future screens

---

## Why this feature matters

Localization is not just about translating text.

In a mobile app, localization also affects:
- layout direction
- spacing assumptions
- number formatting
- screen titles
- future maintainability

If localization is delayed too long, later screens become more expensive to fix because hardcoded strings spread across the codebase.

That is especially risky for Arabic-first apps because Arabic introduces RTL behavior, which changes how mobile layouts behave. React Native provides built-in RTL support through `I18nManager`, and Expo’s official localization guide shows using `expo-localization` together with `i18n-js` as a straightforward app-level translation setup.[web:17][web:18]

For this project, localization had to happen **before** building more screens, because the app is Arabic-first by product direction, not English-first with Arabic added later.

---

## Original implementation plan

The implementation plan for this feature became:

1. Re-read the project docs from the real repo
2. use the current official Expo localization guidance
3. install only the localization packages needed now
4. create translation files for Arabic and English
5. make Arabic the app default
6. enable RTL-aware app behavior
7. replace hardcoded visible strings in the student flow
8. add a temporary language switch method for testing if needed
9. verify the student browse flow works in Arabic first

An important project constraint remained active here:
- still mock-data-first
- no Supabase yet
- no Clerk yet

So this feature had to focus purely on client-side localization and UI behavior.

---

## Step 1 — Re-read the repo documents before implementation

### What we did

Before writing any localization code, we re-read the latest versions of:
- `mobile-project-overview.md`
- `mobile-architecture.md`
- `mobile-code-standards.md`
- `mobile-ui-context.md`
- `mobile-build-plan.md`
- `mobile-progress-tracker.md`
- `mobile-ai-workflow-rules.md`

### Why we did it

This confirmed the current source of truth for the mobile app.

That mattered because:
- the feature numbering had changed
- the project was still mock-data-first
- the architecture and build plan had to stay aligned
- we needed to avoid introducing backend assumptions too early

### Engineering note

This is an important discipline in repo-driven implementation:
do not rely on memory for project state.

Re-reading the docs before implementation reduces drift between:
- actual code
- project plan
- feature numbering
- architecture decisions

---

## Step 2 — Choose the localization approach based on official Expo guidance

### What we did

We chose the setup pattern described in Expo’s official localization guide:
- `expo-localization` for locale-related information
- `i18n-js` for translation management[web:17]

### Why we did it

Expo explicitly documents using `expo-localization` and uses `i18n-js` as the example translation library in its guide.[web:17]

That made it the correct foundation for this project because:
- it is simple
- it fits Expo well
- it avoids unnecessary abstraction too early
- it is easy to extend later
- it keeps future migration flexible

### Why this matters

This was the right level of architecture for the current phase.

The app still uses mock/static data only.
So this feature needed:
- local translation files
- local locale selection logic
- no remote translation loading
- no account-based language persistence yet

### React vs React Native note

For a Next.js engineer, this is different from web i18n frameworks that often integrate with:
- route prefixes
- middleware
- server rendering
- locale-based URL segments

In this React Native app:
- there is no browser URL locale strategy
- there is no server-rendered translation layer
- localization happens inside the app runtime itself

So the mobile mental model is:
**translation state lives inside the app runtime, not in URL routing or server rendering**.

---

## Step 3 — Install the localization packages

### What we did

We installed:

```bash
npx expo install expo-localization
npm install i18n-js
npm install --save-dev @types/i18n-js
```

### Why we did it

- `expo-localization` gives access to locale-related device information in Expo apps.[web:17]
- `i18n-js` gives a small translation dictionary system that works well for local app strings.[web:17]

### Why we used `npx expo install`

We used `npx expo install` for the Expo package because Expo aligns installed package versions with the current SDK version.[web:17]

That matters more in Expo than in many web projects, because package compatibility can affect app runtime behavior more directly.

### React vs React Native note

For a React/Next.js engineer, package installation feels familiar.

The difference is:
in Expo, version alignment is more important because dependencies may be tied to the Expo SDK and native runtime expectations.

So in Expo projects:
- prefer `npx expo install` for Expo-managed packages
- use `npm install` for regular JavaScript packages unless Expo says otherwise

---

## Step 4 — Create the translation file structure

### What we did

We created this structure:

```bash
mkdir -p lib/i18n
touch lib/i18n/ar.ts
touch lib/i18n/en.ts
touch lib/i18n/index.ts
```

### Why we did it

We wanted a clean, scalable translation structure:
- one file per language
- one index file for setup
- a reusable `t()` helper for screens

This keeps localization concerns out of route components as much as possible.

### Why this matters

If translation dictionaries are scattered through screen files:
- reuse becomes harder
- maintenance becomes messy
- missing keys become harder to track
- future features become slower to implement

By centralizing language content under `lib/i18n`, we created a stable app-level localization layer.

### Engineering note

This is similar to how a web engineer might create:
- `locales/ar.json`
- `locales/en.json`
- a shared i18n setup file

The difference in this project is that we used TypeScript files instead of JSON so the setup stays close to the app runtime and can evolve with helper logic more easily.

---

## Step 5 — Add Arabic and English translation dictionaries

### What we did

We created language objects for:
- Arabic
- English

The Arabic file became the primary source for visible UI text in the current phase.

We added keys for the existing student browse flow, including:
- academic years
- subjects
- courses
- loading and error messages
- empty states
- preview badge
- lesson count labels
- price suffix

### Why we did it

The existing student screens already had visible text such as:
- error messages
- empty states
- item labels
- badge text

Those strings needed to move into translation files so the app could:
- launch in Arabic first
- switch to English if needed for testing
- stop depending on hardcoded English text in screen code

### Why this matters

This is the real beginning of localization.

Installing packages alone does not localize anything.
The actual localization value appears only when visible UI text is moved into translation keys.

### Engineering note

A useful rule from this point onward is:

**all visible UI strings must come from translation keys**

That means future screens should not introduce raw text such as:

```tsx
<Text>Courses</Text>
```

They should instead use something like:

```tsx
<Text>{t("student.courses_title")}</Text>
```

This rule is especially important in Arabic-first apps because later conversion is painful if hardcoded English spreads through the codebase.

---

## Step 6 — Build the `i18n` setup layer

### What we did

Inside `lib/i18n/index.ts`, we:
- created an `I18n` instance
- registered the `ar` and `en` dictionaries
- set Arabic as the default language
- enabled fallback behavior
- exported a reusable `t()` helper
- exported a small language-switch helper for testing

### Why we did it

This file became the central translation engine for the app.

Its job is:
- hold the active locale
- resolve keys
- provide one import path for screens
- keep screen code simple

### Why Arabic was hardcoded as default

Even though `expo-localization` can read device locale information, we intentionally set Arabic as the default language for this stage.[web:17]

That was the correct decision because the product requirement for this feature was:
- Arabic must be the primary/default language
- English is secondary
- later settings can decide if device-based selection should be allowed

So at this stage, language choice is a **product rule**, not a device rule.

### React vs React Native note

In Next.js, locale often comes from:
- URL segments
- cookies
- middleware
- request headers

In this Expo app, locale is currently set directly in runtime code.

That means the mobile app is behaving more like a client-side stateful application than a server-routed locale-aware web app.

---

## Step 7 — Enable RTL layout behavior with `I18nManager`

### What we did

We enabled RTL support using React Native’s `I18nManager` API and triggered it early during app startup.[web:18]

The setup used:
- `I18nManager.forceRTL(true)` for Arabic
- root-level initialization from the app startup path

### Why we did it

Arabic is an RTL language.
That means localization is not complete if only text changes but layout direction stays LTR.

React Native documents `I18nManager` as the module used to control RTL layout behavior and check whether the app is currently in RTL mode.[web:18]

### Why this matters

Without RTL handling:
- text may appear Arabic, but layout still behaves like English
- spacing may feel wrong
- row alignment may look unnatural
- future screen polish becomes harder

Arabic-first means:
- translated text
- correct direction behavior
- fewer left/right assumptions in UI implementation

### Important runtime behavior

React Native’s RTL changes through `I18nManager.forceRTL()` do not always apply instantly.
A full app restart is often required for the layout direction change to fully take effect, especially on Android.[web:18]

This is normal platform behavior, not a bug.

### React vs React Native note

This is a major difference from web development.

In web React or Next.js, switching RTL may involve:
- `dir="rtl"` on HTML
- CSS logical properties
- instant browser reflow

In React Native:
- there is no DOM
- layout direction is handled by the native layout system
- forcing RTL can require restart behavior

So the React Native app runtime has stronger control over directionality than the browser model.

---

## Step 8 — Initialize localization from the root app layout

### What we did

We imported the i18n setup from `app/_layout.tsx`, so localization and RTL initialization happen at the app startup path.

### Why we did it

This is the earliest stable point in the route-based app where shared initialization belongs.

It ensured:
- the app starts with the correct locale logic
- RTL setup runs before screens are rendered
- all route screens share the same translation context

### Why this matters

If localization is initialized too late:
- some screens may render before translation state is ready
- RTL setup may be inconsistent
- startup behavior becomes harder to reason about

### React vs React Native note

For a Next.js engineer, this feels somewhat similar to putting global app setup in:
- `app/layout.tsx`
or
- `_app.tsx`

That analogy is useful.

The difference is that in this mobile app, the root layout is also the right place to trigger app-wide runtime setup like localization and direction handling.

---

## Step 9 — Replace hardcoded strings in the existing student screens

### What we did

We updated the existing student browse screens:
- Academic Years
- Subjects
- Courses

We replaced hardcoded visible strings such as:
- error messages
- empty states
- count labels
- preview badge text
- lesson labels
- price suffix text

with translation keys through `t()`.

### Why we did it

This was required to make the feature real.

If localization files exist but existing screens still contain visible English strings, the app is not truly localized.

### Why this matters

This step converted localization from “infrastructure” into “visible behavior.”

It also established a project rule for future work:
new screens should start with translation keys from day one.

### Important implementation detail

The data itself, such as:
- year names
- subject names
- course titles
- teacher names

can remain mock data for now.

The localization feature only required visible app-controlled UI strings to move into translation files.

That distinction is important.

We localized:
- interface language

We did **not** yet localize:
- all mock content records
- backend content
- database-driven curriculum text

---

## Step 10 — Add a simple language switch path for testing

### What we did

We prepared a minimal language switch helper so Arabic and English could both be tested during development.

### Why we did it

Even though Arabic is the required default, a temporary switch path is useful to confirm:
- keys exist in both languages
- fallback behavior works
- screens do not break when language changes

### Why this matters

Testing both languages early helps catch:
- missing translation keys
- untranslated strings
- UI width issues
- assumptions hidden in the screen code

### Engineering note

This switch mechanism is mainly a **development testing tool** at this stage.

It does not yet represent the final user-facing language settings feature.

---

## Step 11 — Handle Arabic number formatting for prices

### What we did

We updated price formatting in the Courses screen to use:

```ts
toLocaleString("ar-SA")
```

for Arabic-style numeric formatting.

### Why we did it

Localization is not only about text labels.
It also includes how users read numbers.

Using locale-aware number formatting makes the Arabic-first experience feel more native and intentional.

### Why this matters

Without localized formatting:
- labels may be Arabic
- but numeric presentation may still feel foreign or inconsistent

That reduces the quality of the Arabic-first experience.

### React vs React Native note

This is conceptually the same as locale-aware formatting on the web, but in a mobile app it is often more noticeable because screen density is tighter and users scan UI labels and numbers very quickly.

---

## Step 12 — Verify the student browse flow in Arabic first

### What we did

We verified the existing student flow still worked after localization changes:
- Academic Years screen
- Subjects screen
- Courses screen
- related labels and headings already built

We also checked:
- Arabic appears first by default
- visible text no longer depends on hardcoded English strings
- the app remains stable after the RTL setup

### Why we did it

This turned the feature from configuration work into a complete implementation.

### Why this matters

A localization feature is not complete when translation files merely exist.

It is complete when:
- the app launches in the correct language
- the user can navigate existing screens
- visible text actually comes from translation keys
- RTL does not break previously working screens

---

## Problems encountered in Feature 04

### Problem 1 — Choosing between device locale and product-default locale

`expo-localization` can expose device locale information, which could lead to device-driven language selection.[web:17]

But this feature required Arabic to be the default language regardless of device settings.

### Why this was a real design decision

This was not a technical limitation.
It was a product decision.

The app is Arabic-first, so product rules had to override automatic device preference behavior for now.

### Problem 2 — RTL is not just “translated text”

A common mistake is thinking localization is done once strings are translated.

But Arabic also changes directional layout expectations, and React Native handles this through RTL-aware layout behavior and `I18nManager` rather than DOM direction attributes.[web:18]

### Problem 3 — Existing screens already had visible hardcoded strings

The student browse flow was built before localization.
That meant strings had to be migrated after the fact.

This is always more expensive than starting with translation keys from the beginning.

### Problem 4 — Web instincts can create left/right assumptions

A React/Next.js engineer often writes spacing and alignment with a left-to-right default in mind.

That becomes risky in Arabic-first mobile UI.

Examples of risky assumptions include:
- `marginLeft`
- `paddingRight`
- fixed left alignment assumptions in row layouts

---

## How those problems were solved

### Solution 1 — Treat Arabic as a product-default locale

We intentionally hardcoded Arabic as the initial app language instead of deriving it from device locale.

That satisfied the current product rule cleanly.

### Solution 2 — Enable RTL at app startup

We used `I18nManager` from the root startup path so RTL handling becomes part of app initialization rather than a late screen-level concern.[web:18]

### Solution 3 — Move UI strings into translation files immediately

Instead of postponing the migration, we replaced visible strings in the already-built student flow now.

That prevents future localization debt.

### Solution 4 — Establish a new coding rule for future screens

From Feature 04 onward:
- visible text must use translation keys
- directional styles should avoid hardcoded left/right assumptions when possible
- future screens should be Arabic-ready from the first implementation

---

## React vs React Native lessons from this feature

## Lesson 1 — Mobile localization is not route localization

A Next.js engineer often thinks about localization in terms of:
- routes
- middleware
- locale segments
- SSR content

In React Native with Expo, localization is primarily:
- app runtime configuration
- translation dictionaries
- direction-aware layout behavior

That is a different mental model.

## Lesson 2 — RTL on mobile is more runtime-oriented than on the web

On the web, adding `dir="rtl"` can change layout direction immediately.

In React Native, direction handling belongs to the native layout environment and is controlled through `I18nManager`, which may require a restart for full effect.[web:18]

That is a very important practical difference.

## Lesson 3 — Translation keys are a scalability decision, not just a localization decision

A screen with hardcoded strings is faster to write once, but slower to maintain forever.

Translation keys make future work easier:
- English testing
- Arabic consistency
- future settings screen
- future content expansion

This is true on web too, but it becomes more critical in Arabic-first mobile apps because layout and string length change together.

## Lesson 4 — Product-default language can intentionally override device locale

A web engineer may assume “respect the browser locale” by default.

But in app product design, sometimes the correct choice is:
- the product launches in one language first
- device locale support comes later

This feature followed that pattern intentionally.

---

## Discussion notes for Feature 04

### Why did we implement localization now instead of later?

Because the app had already started building real screens.

If more screens were added first, localization work would spread across more files and cost more to retrofit.

Doing it now kept the codebase cleaner.

### Why use `i18n-js` instead of a larger i18n framework?

Because the project needed:
- a simple Expo-compatible setup
- quick translation dictionaries
- local runtime control
- no unnecessary complexity yet

Expo’s guide explicitly demonstrates using `i18n-js` together with `expo-localization`, which made it a good fit for this phase.[web:17]

### Why force Arabic instead of reading device language?

Because this feature’s requirement was product-driven:
Arabic must be the primary/default language.

So device locale support was intentionally not the main decision-maker yet.

### What is the main React Native lesson here?

Localization in mobile is a combination of:
- text translation
- startup configuration
- layout direction
- testing behavior
- future screen discipline

So this feature is not “just dictionaries.”
It is part of app architecture.

---

## Final output of Feature 04

At the end of this feature, the project had:
- `expo-localization` installed[web:17]
- `i18n-js` installed[web:17]
- Arabic translation file created
- English translation file created
- centralized `lib/i18n` setup
- Arabic set as the default app language
- RTL initialization through `I18nManager`[web:18]
- root-layout localization startup wiring
- student browse screens migrated away from hardcoded visible English strings
- a temporary path for language testing
- an Arabic-first foundation for all future UI features

---

## Completion checklist for Feature 04

Feature 04 is complete when all of these are true:

- `expo-localization` is installed and available.[web:17]
- `i18n-js` is installed and used for app translations.[web:17]
- `lib/i18n/ar.ts` exists
- `lib/i18n/en.ts` exists
- `lib/i18n/index.ts` exists
- Arabic is the default language
- English exists as a secondary language
- RTL support is enabled through React Native localization direction handling.[web:18]
- localization setup is initialized from app startup
- Academic Years screen uses translation keys
- Subjects screen uses translation keys
- Courses screen uses translation keys
- visible hardcoded English strings are removed from those screens
- Arabic is shown first when the app launches
- the student browse flow still works after localization changes
- the project is ready for future screens to use translation keys by default

---

## Official references

These are the most important references for this feature:

- Expo localization guide: [https://docs.expo.dev/guides/localization/](https://docs.expo.dev/guides/localization/) [web:17]
- React Native `I18nManager` docs: [https://reactnative.dev/docs/i18nmanager](https://reactnative.dev/docs/i18nmanager) [web:18]

One important caution:
for Arabic-first support, translating strings is only part of the work.
RTL behavior must also be considered from the start, especially when building future layouts with directional spacing and alignment assumptions.[web:18]



---

# Feature 05 — Build Course Detail + Lesson List + Preview/Locked States

## What this feature does

This feature adds the first real **course consumption screen** for the student flow.

It builds:
- the Course Detail screen
- the lesson list UI
- the free preview lesson state
- the locked lesson state
- navigation from the Courses screen into Course Detail
- navigation from a preview lesson into the Watch screen placeholder
- blocked behavior for locked lessons using mock logic only

This feature still uses **mock/static data only**.
It does **not** use Supabase, Clerk, real enrollment checks, or real video playback yet.

The final success condition for this feature is:
- a student can open a course from the course list
- the Course Detail screen opens correctly
- lessons render in a tappable list
- preview lessons are visually distinct from locked lessons
- preview lessons open the Watch screen placeholder
- locked lessons do not navigate and instead show blocked behavior
- Arabic works as the default language
- English still works as the secondary language
- the UI remains RTL-safe

---

## Why this feature matters

Up to this point, the student flow could browse into a list of courses, but could not yet enter the actual content structure of a course.

This feature matters because it introduces the first real **content access model** for students:
- one course
- multiple lessons
- one or more preview lessons
- the rest locked until enrollment

That model is central to the product described in the project overview, where students browse a course, preview one free lesson, and later unlock the rest after payment confirmation.[cite:1]

This feature also matters architecturally because it forces the app to handle:
- richer data shapes
- deeper route navigation
- conditional interaction behavior
- Arabic-first text and RTL-safe layout decisions

For a React / Next.js engineer, this is similar to moving from:
- a listing page
to
- a detail page with nested actionable items

But in React Native, that move also includes mobile interaction patterns like:
- large tappable rows
- alert-based blocked actions
- native stack navigation behavior
- RTL-aware spacing choices

---

## Original implementation plan

The implementation plan for this feature became:

1. Re-read the repo documents before changing anything
2. inspect the current student flow and existing placeholder screens
3. extend the shared type layer for course details and lessons
4. extend the mock data layer with course-detail and lesson-list functions
5. add new localization keys for all visible text
6. build the Course Detail screen
7. build preview and locked lesson row behavior
8. build the Watch screen placeholder
9. connect navigation from Courses to Course Detail
10. verify the full flow in Arabic first, then English

An important project constraint remained active here:
- Arabic is the default language
- all visible text must come from translation keys
- mock data only
- no Supabase yet
- no Clerk yet
- no hardcoded directional left/right assumptions

So this feature had to behave like a real app flow while still remaining fully local and mock-driven.[cite:1][file:2]

---

## Step 1 — Re-read the repo documents before implementation

### What we did

Before changing the code, we re-read the latest versions of:
- `mobile-project-overview.md`
- `mobile-architecture.md`
- `mobile-code-standards.md`
- `mobile-ui-context.md`
- `mobile-build-plan.md`
- `mobile-progress-tracker.md`
- `mobile-ai-workflow-rules.md`

### Why we did it

This confirmed the current source of truth before implementation.

That mattered because:
- feature numbering had changed after the localization feature was inserted
- Arabic-first rules were now mandatory
- the app was still mock-data-first
- the route structure for course and watch screens already existed in the architecture doc
- the UI context defined how lesson rows, cards, badges, and locked states should look

The architecture doc already defines route paths for:
- `app/(student)/course/[courseId].tsx`
- `app/(student)/watch/[lessonId].tsx`[cite:1]

The build plan also places Course Detail as a dedicated student-flow feature, which confirms this feature is part of the intended navigation sequence rather than an optional enhancement.[cite:1]

### Engineering note

This is a strong engineering habit in repo-driven work:
**read the current docs, not your memory of the docs**.

That matters even more in mobile projects because:
- startup structure
- route structure
- feature sequencing
- package decisions

tend to have more runtime consequences than in many web-only projects.[file:2]

---

## Step 2 — Inspect the current student flow and placeholder screens

### What we did

We inspected the current repo state before adding new code.

We confirmed that:
- the student browse flow already existed
- the `course/[courseId].tsx` screen existed only as a placeholder
- the `watch/[lessonId].tsx` screen existed only as a placeholder
- localization files already existed
- the mock-data layer existed under `lib/mock-data/student.ts`
- the shared type file existed under `lib/types.ts`[cite:1]

### Why we did it

This step was necessary to avoid rebuilding anything that was already in place.

It also helped identify the minimum required work:
- extend types
- extend mock data
- replace placeholders
- connect navigation

### React vs React Native note

For a Next.js engineer, this is similar to checking:
- existing route segments
- data helpers
- i18n setup
- current page placeholders

before building a real detail page.

The difference is that in Expo Router those routes are still native mobile screens, not browser pages, even though the file-based structure feels familiar.[cite:1][file:2]

---

## Step 3 — Extend the shared type layer for lessons and course detail

### What we did

We updated `lib/types.ts` to add:
- `Lesson`
- `CourseDetail`

The new types included fields such as:
- `courseId`
- `title`
- `orderIndex`
- `isPreview`
- `durationSeconds`
- `videoUrl`

and for the course detail:
- `id`
- `subjectId`
- `title`
- `description`
- `teacherName`
- `price`
- `lessonCount`
- `isFree`

### Why we did it

The existing types were enough for the browse flow, but not enough for a real course-detail experience.

The earlier `Course` type was intentionally small:
- enough to render a card in a course list
- not enough to describe a course in detail
- not enough to model lessons within the course

So this feature introduced a second layer of data modeling:
- list-level course shape
- detail-level course shape
- lesson-level item shape

### Why this matters

This is an important backend-alignment decision.

Even though the app still uses mock data, the type shapes were designed to stay close to the planned backend model, especially for fields like:
- `orderIndex`
- `isPreview`
- `videoUrl`

That makes later migration easier because the screen logic can stay stable while only the data source changes.

### React vs React Native note

This part is not specifically “mobile.”
It is more like good product engineering.

But in a React Native app, getting data shapes right early matters because screens often become tightly tied to:
- navigation params
- list rendering
- interaction states
- layout assumptions

So good types reduce UI churn later.

---

## Step 4 — Extend the mock data layer with async helper functions

### What we did

We updated `lib/mock-data/student.ts` to add:
- `getCourseDetail(courseId)`
- `getLessonsByCourse(courseId)`

These functions remained `async`, just like the earlier mock-data helpers.

The lesson mock records included both preview and locked lessons so the screen could render mixed access states.

### Why we did it

The current project is still mock-data-first, and the progress tracker explicitly says backend setup remains intentionally deferred for now.[cite:1]

That means the new screen needed realistic local data, not placeholder inline arrays inside the screen itself.

We kept the mock helpers in the data layer because that preserves a clean separation:
- screen = presentation and interaction
- helper = data retrieval shape

### Why this matters

This is one of the biggest “build it like a real app even before the backend exists” decisions.

If the screen directly hardcodes large arrays inside the component:
- the component becomes noisy
- future backend migration becomes harder
- testing the route flow becomes less realistic

By keeping mock data in async functions, we make the future swap easier:
- today: return arrays
- later: query Supabase

The component can keep calling the same function names.

### React vs React Native note

For a Next.js engineer, this is like keeping a temporary repository layer or service function instead of stuffing mock JSON into the page component.

The difference is that mobile screens often hold more UI state locally, so preserving clean separation in the data layer helps prevent screen files from becoming overloaded.

---

## Step 5 — Add localization keys for all new visible UI text

### What we did

We added new keys to:
- `lib/i18n/ar.ts`
- `lib/i18n/en.ts`

These keys covered:
- course detail labels
- teacher label
- lessons header
- empty state text
- error text
- free preview badge
- locked badge
- preview hint
- locked hint
- enroll button label
- watch screen placeholder text
- duration label

### Why we did it

Feature 04 established a new project rule:
all visible UI strings must come from translation files, and Arabic must be the default experience.[file:2][cite:1]

So this feature could not add raw JSX strings such as:
- `Teacher`
- `Lessons`
- `Locked`
- `Free Preview`

directly inside screen files.

### Why this matters

This is where Arabic-first moved from a rule into day-to-day implementation discipline.

Every new screen now has to assume:
- Arabic first
- English second
- no hardcoded visible strings
- test both languages
- avoid layout choices that break in RTL

### React vs React Native note

This is conceptually familiar to web engineers who have used i18n dictionaries.

The important mobile-specific difference is that localization and layout direction affect each other more visibly in dense small-screen UI.
A short badge or label that looks harmless in English can change row balance in Arabic very quickly, so translation discipline and layout discipline are tightly connected.[file:2]

---

## Step 6 — Build the Course Detail screen route

### What we did

We replaced the placeholder in:

- `app/(student)/course/[courseId].tsx`

with a real screen that:
- reads `courseId` using `useLocalSearchParams()`
- loads course detail and lessons together in `useEffect`
- stores them in local state
- shows loading and error states
- renders the course information
- renders the lesson list with `FlatList`

### Why we did it

The architecture already defines this route as a dynamic student route, so the correct implementation path was to use the route param rather than build a temporary non-route screen.[cite:1]

We used Expo Router param reading because that is the intended way to access dynamic route values in file-based navigation.[cite:1]

We used `FlatList` because React Native’s official docs recommend it for rendering long or structured lists efficiently in mobile apps, and it supports patterns like `ListHeaderComponent`, which fit this screen well.[cite:1]

### Why this matters

This screen is more than a page.
It is a composed mobile view with:
- top content
- list content
- interactive items
- loading state
- empty state
- error state

Using `FlatList` with `ListHeaderComponent` is a strong mobile pattern because the screen becomes one scrollable surface instead of mixing separate scroll containers awkwardly.[cite:1]

### React vs React Native note

For a React / Next.js engineer, this may feel like:
- `useRouter().query` or route params
- fetching data based on URL segment
- rendering a detail page
- mapping nested items

But two differences matter:

1. `FlatList` is not just `.map()` with divs.
   It is a purpose-built native list primitive with performance behavior and list lifecycle assumptions.[cite:1]

2. the route is not a browser URL page transition.
   It is a native screen navigation event handled through Expo Router and the underlying native navigation stack.[cite:1]

---

## Step 7 — Design the lesson row states: preview vs locked

### What we did

We created lesson rows that visually distinguish access states.

Preview lesson rows show:
- play icon
- accent styling
- preview badge
- active interaction path

Locked lesson rows show:
- lock icon
- muted styling
- locked badge
- blocked interaction path

We followed the UI context rules for:
- card styling
- badge styling
- lesson row tapability
- preview accent use
- locked muted appearance[ cite:1 ]

### Why we did it

The UI context explicitly says:
- free preview lessons should show play icon and accent styling
- locked lessons should show lock icon and muted styling
- lesson rows should be easy to tap[ cite:1 ]

So this was not just design preference.
It was the documented UI requirement.

### Why this matters

This is the first place where the student learns the app’s access model visually.

A good lesson list should communicate, at a glance:
- what can be watched now
- what requires enrollment
- what is interactive
- what is blocked

That reduces confusion before backend logic even exists.

### React vs React Native note

On the web, you might rely more heavily on:
- hover states
- tooltips
- cursor changes

In mobile UI, that does not help much.

Instead, clarity comes from:
- row color treatment
- icon choice
- label/badge language
- opacity
- immediate tap feedback

That is why mobile state design must be stronger at first glance.

---

## Step 8 — Add blocked behavior for locked lessons

### What we did

We implemented the lesson press behavior as:

- if `lesson.isPreview === true` → navigate to watch route
- otherwise → show a native `Alert`

So locked lessons did not navigate.

### Why we did it

The architecture says students can watch a lesson only if it is a free preview or if they have a confirmed enrollment.[cite:1]

Because the app is still mock-data-first and has no real enrollment state yet, we needed a temporary local rule that simulates the same behavior:
- preview lesson = allowed
- locked lesson = blocked

We used `Alert` because React Native provides it as a built-in native feedback pattern for simple blocked actions.[cite:1]

### Why this matters

This is a small feature with a very important behavioral meaning.

It teaches the student flow:
- some lessons are available now
- others are intentionally blocked
- blocked does not mean broken

That difference is essential for product trust.

### React vs React Native note

In web React, a blocked action might become:
- a toast
- a modal
- an inline warning
- a disabled link state

In React Native, `Alert` is often the fastest and most native-feeling way to communicate a simple blocked action without building a custom modal first.[cite:1]

This is one example of a broader mobile engineering principle:
**use the native primitive first unless the product really needs something custom**.

---

## Step 9 — Build the Watch screen placeholder

### What we did

We replaced the placeholder in:

- `app/(student)/watch/[lessonId].tsx`

with a simple watch placeholder screen that:
- reads `lessonId` from route params
- shows translated text
- confirms the route is working
- leaves real video playback for a later feature

### Why we did it

The project overview and architecture both include a watch/player path as part of the student flow, but real video playback is a later feature.[cite:1]

So this screen needed to exist now as a navigation target without pretending that the player was already built.

### Why this matters

This is a strong incremental delivery pattern.

Instead of waiting for the entire media stack, we confirmed:
- route exists
- param passing works
- flow works
- future player screen has a stable entry point

### React vs React Native note

For a Next.js engineer, this is similar to creating a routed placeholder page before integrating the real player component.

The difference is that in mobile navigation, placeholder screens are especially useful because they confirm:
- native route transition
- back behavior
- param wiring
- future feature boundary

before introducing heavier runtime dependencies like media playback.

---

## Step 10 — Connect navigation from the course list into Course Detail

### What we did

We updated the subject-level course list screen so tapping a course pushes:

- `/(student)/course/${item.id}`

using Expo Router navigation.

### Why we did it

The new Course Detail screen is only useful if the existing browse flow can reach it.

The student route tree already existed conceptually as:
- year
- subject
- course
- watch

So this step connected the old browse flow to the new detail route.

### Why this matters

This is the difference between:
- a new screen existing in the codebase
and
- a new screen actually being part of the product flow

Mobile features are only real when the user can move through them naturally.

### React vs React Native note

This feels very familiar to a web engineer:
click a card, route to detail page.

But in Expo Router the navigation call results in a native screen push, not browser document navigation.
So although `router.push()` looks familiar, the runtime behavior is closer to a mobile navigation stack than a URL-only transition.[cite:1]

---

## Step 11 — Make the layout RTL-safe

### What we did

We avoided hardcoded directional styling choices such as:
- `marginLeft`
- `marginRight`
- `paddingLeft`
- `paddingRight`

Instead, the implementation used RTL-friendly approaches such as:
- `me-*`
- `ms-*`
- layout choices that do not assume English-first visual flow

### Why we did it

Feature 04 introduced the Arabic-first rule that future screens must avoid layout/styling decisions that break RTL.[file:2][cite:1]

React Native also supports logical start/end spacing, which is the safer choice for RTL-aware UI than left/right-specific properties.[cite:1]

### Why this matters

This is one of the most important mobile-i18n habits.

A UI can be fully translated and still feel wrong in Arabic if spacing and row composition silently assume LTR structure.

### React vs React Native note

On the web, a Next.js engineer may rely on:
- CSS logical properties
- `dir="rtl"`
- browser layout correction

In React Native, the equivalent mindset is:
- avoid left/right assumptions
- use start/end-safe spacing
- test the real mobile layout in RTL mode

So the principle is similar, but the APIs and feedback loop are different.[cite:1]

---

## Step 12 — Verify the feature locally in Arabic first, then English

### What we did

We tested the flow end-to-end:

1. open the app in Arabic by default
2. browse to a subject and open a course
3. verify course detail content renders
4. verify preview vs locked lesson states
5. tap a preview lesson and confirm watch navigation
6. tap a locked lesson and confirm blocked behavior
7. switch to English
8. repeat the same flow
9. confirm the UI still works in both languages

### Why we did it

This feature was not complete when the files existed.
It was complete when the real route flow worked with:
- Arabic default behavior
- English fallback behavior
- visual differentiation
- mock access logic
- no broken navigation

### Why this matters

This verification step proved:
- the route chain works
- the mock data shape is usable
- translation keys are complete
- RTL-safe UI holds up
- the watch placeholder receives the right param

That is the real completion proof.

---

## Problems encountered in Feature 05

### Problem 1 — The existing feature numbering had shifted

The project had inserted Arabic-first localization as the new Feature 04, which meant all later feature numbers moved by +1.[file:2][cite:1]

### Why this mattered

This could easily create documentation drift between:
- the old build plan
- the progress tracker
- the actual implementation order

So the implementation had to explicitly follow the new numbering.

### Problem 2 — Browse-level course data was not enough for a detail screen

The existing `Course` shape worked for course cards, but not for a detail page with:
- description
- ordered lessons
- preview state
- watch-route navigation target

### Why this mattered

Without extending the data layer first, the screen would either:
- become full of temporary hacks
or
- tightly couple itself to bad mock data structure

### Problem 3 — Localization discipline had to remain strict

The feature added many new visible labels:
- lessons
- teacher
- preview
- locked
- watch placeholder
- enroll button

That created a high risk of slipping back into hardcoded strings.

### Problem 4 — RTL can break small row layouts faster than full screens

Lesson rows are dense UI elements:
- icon
- title
- metadata
- badge

That makes them more sensitive to directional spacing assumptions than a simple vertical page layout.

### Problem 5 — The watch screen exists before the player exists

This can feel incomplete if not handled deliberately.

### Why this mattered

The placeholder still had to behave like a real product step, not like dead-end scaffolding.

---

## How those problems were solved

### Solution 1 — Follow the updated numbering consistently

We treated this implementation as Feature 05 from start to finish and aligned the progress tracking accordingly.[cite:1]

### Solution 2 — Add separate detail and lesson types

Instead of stretching the old list type too far, we introduced proper shapes for:
- `CourseDetail`
- `Lesson`

That kept the model cleaner and closer to the future backend design.

### Solution 3 — Add translation keys before finalizing the UI

We treated localization as part of the feature, not cleanup after the feature.

That prevented new hardcoded visible strings from spreading into the codebase.

### Solution 4 — Use start/end-safe spacing and simple row composition

We designed the lesson rows to stay readable in RTL by avoiding left/right-specific assumptions and keeping the composition straightforward.[cite:1]

### Solution 5 — Use a deliberate placeholder for the watch route

Instead of skipping the route or faking a player, we built a real routed placeholder screen.
That preserved the student flow and created a clean boundary for the later video feature.

---

## React vs React Native lessons from this feature

## Lesson 1 — A mobile detail screen is often “header + list,” not arbitrary nested scroll UI

In web React, a detail page might naturally become:
- a div layout
- a mapped list
- maybe a sticky section

In React Native, `FlatList` is a more important primitive much earlier, especially when a screen contains repeated rows and needs to behave well as a single mobile scroll surface.[cite:1]

A useful mental model is:
- web: `.map()` is often enough
- mobile: reach for list primitives sooner

## Lesson 2 — File-based routing familiarity transfers, but interaction semantics do not

Expo Router feels familiar to a Next.js developer because it is file-based and uses dynamic route segments.[cite:1]

But the user experience is still native app navigation:
- push
- back
- stack
- screen transitions

So the route structure transfers well, while the runtime behavior is mobile-first.

## Lesson 3 — Blocked behavior is part of product UX, not an error state

A locked lesson is not a failed route.
It is an intentional product state.

That mindset is important in mobile apps, where interaction feedback has to be immediate and obvious without relying on hover or browser cues.

## Lesson 4 — Localization and layout are tightly connected in mobile row design

On the web, a large responsive layout may absorb translation differences more easily.

On mobile, especially in list rows, changing language can affect:
- title wrapping
- badge width
- icon spacing
- row balance

So Arabic-first implementation is not just string replacement.
It is component-shape awareness.

## Lesson 5 — Placeholder screens are valid engineering milestones in route-driven mobile apps

A routed placeholder is useful when it confirms:
- route correctness
- param correctness
- back-stack correctness
- future feature boundary

That is often better than rushing a partial heavy integration too early.

---

## Discussion notes for Feature 05

### Why did we create new data types instead of reusing the existing `Course` type everywhere?

Because list-level and detail-level concerns are different.

A list card needs only summary information.
A detail screen needs richer structured content.

Keeping those shapes separate reduces accidental coupling and makes future backend mapping cleaner.

### Why not add real enrollment logic already?

Because the current project phase is still explicitly mock-data-first, and the progress tracker states backend integration is intentionally deferred for now.[cite:1]

So adding real gating logic here would fight the current project strategy.

### Why use `Alert` for locked lessons instead of building a custom modal?

Because the product need at this stage was simple:
communicate that the lesson is locked.

`Alert` is enough for that and matches React Native’s built-in native interaction model for simple blocked actions.[cite:1]

A custom modal can come later if the product needs richer upsell or enrollment messaging.

### Why build the watch placeholder now if the player is later?

Because navigation paths should be validated as early as possible.

This confirms:
- the student flow shape
- the route naming
- the param passing
- the future screen boundary

without introducing media complexity too early.

### What is the main React Native lesson here?

A mobile feature is not only a screen.
It is usually a combination of:
- route structure
- typed data shape
- local loading state
- list primitives
- interaction feedback
- localization discipline
- platform-appropriate behavior

That combination becomes visible very quickly once the app moves from simple browse cards into real content flows.

---

## Final output of Feature 05

At the end of this feature, the project had:

- a real Course Detail route under `app/(student)/course/[courseId].tsx`
- a real Watch placeholder route under `app/(student)/watch/[lessonId].tsx`
- new shared types for `CourseDetail` and `Lesson`
- new mock-data helpers for course detail and lesson retrieval
- lesson list UI using `FlatList`
- free preview lesson styling
- locked lesson styling
- blocked locked-lesson behavior using `Alert`
- preview-lesson navigation into the Watch placeholder
- course-list navigation into Course Detail
- Arabic-first translation coverage for all new visible text
- English translation coverage for testing and fallback
- RTL-safe layout decisions for the lesson row UI
- a stable navigation and data foundation for later player and enrollment features

---

## Completion checklist for Feature 05

Feature 05 is complete when all of these are true:

- `lib/types.ts` includes the new course-detail and lesson types
- `lib/mock-data/student.ts` includes async helpers for course detail and lessons
- `lib/i18n/ar.ts` includes all new visible Arabic strings
- `lib/i18n/en.ts` includes all matching English strings
- `app/(student)/course/[courseId].tsx` is no longer a placeholder
- `app/(student)/watch/[lessonId].tsx` is no longer a placeholder-only stub
- the Courses screen can navigate to Course Detail
- Course Detail loads by route param
- the lesson list renders in order
- preview lessons are visually distinct
- locked lessons are visually distinct
- tapping a preview lesson navigates to the Watch screen
- tapping a locked lesson does not navigate
- blocked behavior is shown through a native alert
- Arabic is the default experience
- all visible new UI text comes from translation keys
- the layout remains usable in RTL
- English can still be tested successfully
- the feature works using mock data only
- no Supabase or Clerk integration was introduced yet

---

## Official references

These were the most important official references for this feature:

- Expo Router navigation and routing docs: [https://docs.expo.dev/router/navigating-pages/](https://docs.expo.dev/router/navigating-pages/) [cite:1]
- React Native `FlatList` docs: [https://reactnative.dev/docs/flatlist](https://reactnative.dev/docs/flatlist) [cite:1]
- React Native `Alert` docs: [https://reactnative.dev/docs/alert](https://reactnative.dev/docs/alert) [cite:1]
- React Native layout props, including logical spacing like `marginStart`: [https://reactnative.dev/docs/layout-props#marginstart](https://reactnative.dev/docs/layout-props#marginstart) [cite:1]

One important caution:
for Arabic-first mobile UI, lesson-row design must be tested in RTL first, not only after the English layout looks correct.[file:2][cite:1]

----------

# Feature 06 — Build Shared Design Foundations

## What this feature does

This feature creates the first reusable shared UI foundation for the EduStream mobile app.

It does **not** add backend logic, real API data, Supabase, Clerk, or advanced theming infrastructure.

Instead, it creates a small design system layer that future screens can reuse consistently, including:
- shared design tokens/constants
- reusable UI primitives
- shared loading / empty / badge / button patterns
- RTL-safe layout habits
- migration of existing student screens away from repeated ad-hoc styling

The final success condition for this feature is:
- the existing student screens still work
- those screens now use shared design foundations where appropriate
- Arabic remains the default language
- English still works as a secondary language
- visible UI text still uses translation keys
- future screens can reuse shared UI patterns instead of re-deciding styles each time

---

## Why this feature matters

Up to Feature 05, the project already had working student browse and course-detail screens.

But those screens still repeated many of the same style decisions directly inside route files, such as:
- card container classes
- text style combinations
- loading-state layout
- empty-state layout
- badge styling
- button styling

That works for a few early screens, but it becomes expensive later.

Without a shared design foundation:
- the UI becomes inconsistent
- screen files become noisy
- refactoring becomes harder
- RTL mistakes become easier to repeat
- future features take longer because styling decisions are re-made every time

So this feature is not “visual cleanup.”
It is a structural UI engineering feature.

For a React / Next.js engineer, this is similar to the moment when a project moves from:
- page-local class strings
to
- shared UI primitives like `Button`, `Card`, `SectionTitle`, and layout wrappers

In React Native, this matters even more because:
- screens are often dense
- repeated list patterns appear quickly
- mobile interaction patterns should stay consistent
- Arabic-first and RTL-safe choices need to become defaults, not reminders

---

## Original implementation plan

The implementation plan for this feature became:

1. Re-read the latest repo documents before changing code
2. inspect the current student screens and identify repeated UI patterns
3. create shared design constants for spacing / radius / typography
4. create a minimal `components/ui` foundation layer
5. migrate current student screens to use those shared primitives
6. keep Arabic-first and RTL-safe rules intact
7. verify Arabic first, then English
8. confirm the new primitives are enough for the next feature without over-engineering

Important project constraints remained active here:
- still mock-data-first
- no Supabase yet
- no Clerk yet
- Arabic is the default language
- all visible UI text must use translation keys
- avoid hardcoded left/right directional styling
- keep the shared UI system simple and reusable

---

## Step 1 — Re-read the repo documents before implementation

### What we did

Before changing code, we re-read the latest versions of:
- `mobile-project-overview.md`
- `mobile-architecture.md`
- `mobile-code-standards.md`
- `mobile-ui-context.md`
- `mobile-build-plan.md`
- `mobile-progress-tracker.md`
- `mobile-ai-workflow-rules.md`

### Why we did it

This confirmed the current source of truth before implementation.

That mattered because:
- the feature numbering had already shifted earlier when the Arabic-first localization foundation was inserted
- the project was still in the mock-data-first phase
- Arabic-first rules were now mandatory for every next feature
- the UI context document already defined the intended mobile visual language
- the progress tracker was the source of truth for current feature order

### Engineering note

This is one of the healthiest habits in repo-driven implementation:

**read the current repo docs before writing the next feature**

That prevents drift between:
- architecture documents
- progress tracking
- feature numbering
- actual implementation decisions

---

## Step 2 — Inspect the current screens and identify duplicated styling

### What we did

We inspected the student screens already built in the project, especially:
- Academic Years
- Subjects
- Courses
- Course Detail
- Watch placeholder

We looked for repeated patterns such as:
- `bg-surface border border-border rounded-xl p-4`
- loading-state wrappers
- empty-state wrappers
- section-title text styles
- price text styles
- badge styles for preview / locked
- button styles
- repeated `contentContainerStyle` spacing values

### Why we did it

This step was necessary to avoid building abstractions blindly.

A common mistake in early design-system work is:
- creating too many components
- abstracting patterns that only appear once
- making the UI layer more complex than the app needs

So instead of inventing a large “design system,” we extracted only the patterns already visible in the current student flow and the immediately upcoming screens.

### Engineering note

This is similar to a good React web refactor:

do not start by asking,
> “What full design system could exist?”

Start by asking,
> “What repeated UI decisions already exist, and which ones are worth centralizing now?”

That keeps the shared layer practical instead of theoretical.

---

## Step 3 — Add shared design token constants

### What we did

We created:

```bash
touch constants/design.ts
```

Then we added shared constants for:
- spacing
- border radius
- typography labels

Example:

```ts
export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  "2xl": 24,
} as const;

export const radius = {
  sm: 8,
  md: 12,
  lg: 16,
  full: 9999,
} as const;

export const typography = {
  caption: "text-xs",
  body: "text-sm",
  title: "text-base",
  price: "text-lg",
} as const;
```

### Why we did it

The project already had shared color tokens in the Tailwind / NativeWind setup.

But non-color design values such as spacing and radius were still being repeated in screens directly, especially in:
- `contentContainerStyle`
- layout wrappers
- reusable component decisions

So this file became the shared source of truth for non-color layout values that are easier to reuse from TypeScript than from utility classes alone.

### Why this matters

This is an important React Native difference.

In web React with Tailwind, many spacing decisions can stay entirely in class strings.

In React Native, some places still need numeric values, especially:
- `contentContainerStyle`
- inline numeric props
- hybrid component APIs

So a small constants file is more useful than it first appears.

---

## Step 4 — Create the shared `components/ui` folder

### What we did

We created the shared UI folder:

```bash
mkdir -p components/ui
```

Then we created these files:

```bash
touch components/ui/AppText.tsx
touch components/ui/ScreenContainer.tsx
touch components/ui/Card.tsx
touch components/ui/PrimaryButton.tsx
touch components/ui/SecondaryButton.tsx
touch components/ui/StatusBadge.tsx
touch components/ui/EmptyState.tsx
touch components/ui/LoadingScreen.tsx
touch components/ui/ListRow.tsx
touch components/ui/index.ts
```

### Why we did it

The architecture already separates route files from reusable code.

So the correct place for shared presentational building blocks was outside `app/`, inside a dedicated shared components folder.

This keeps route files focused on:
- route params
- local state
- data loading
- navigation
- interaction behavior

while moving reusable visual structure into shared components.

### Why this matters

This is the beginning of a real UI layer.

It is still intentionally small, but it creates a cleaner separation between:
- screen logic
- shared presentation patterns

For a React / Next.js engineer, this is the same kind of maturity step as introducing:
- `components/ui/Button.tsx`
- `components/ui/Card.tsx`
- `components/ui/Text.tsx`

instead of repeating class strings in every page.

---

## Step 5 — Create `AppText` as the typography primitive

### What we did

We created:

```tsx
// components/ui/AppText.tsx
import { Text, type TextProps } from "react-native";

type Variant =
  | "title"
  | "body"
  | "muted"
  | "secondary"
  | "caption"
  | "price"
  | "error"
  | "button";

const variantClasses: Record<Variant, string> = {
  title: "text-base font-semibold text-text-primary",
  body: "text-sm font-medium text-text-primary",
  muted: "text-xs text-text-muted",
  secondary: "text-sm text-text-secondary",
  caption: "text-xs font-medium text-text-secondary",
  price: "text-lg font-bold text-accent",
  error: "text-base font-semibold text-error",
  button: "text-sm font-medium",
};

type Props = TextProps & {
  variant?: Variant;
  className?: string;
};

export function AppText({
  variant = "body",
  className = "",
  children,
  ...props
}: Props) {
  return (
    <Text className={`${variantClasses[variant]} ${className}`} {...props}>
      {children}
    </Text>
  );
}
```

### Why we did it

Text styling was one of the most repeated decisions in the app.

The same combinations appeared repeatedly:
- title text
- secondary descriptive text
- muted metadata text
- price text
- error text

So `AppText` became the smallest useful typography primitive.

### Why this matters

This component does **not** contain visible product strings.
It only centralizes typography decisions.

That is important because the project rule still remains:

**all visible UI text must come from translation keys or data, not from hardcoded component defaults**

So `AppText` standardizes style only, not content.

### React vs React Native note

For a web engineer, this is similar to having a shared `Text` component or typography wrapper.

The difference is that React Native text styling often becomes noisier faster because `Text` nodes are reused heavily and there is no browser default typographic baseline to lean on.

So a small text primitive pays off early.

---

## Step 6 — Create `ScreenContainer` as the page wrapper

### What we did

We created:

```tsx
// components/ui/ScreenContainer.tsx
import { SafeAreaView, View, type ViewProps } from "react-native";

type Props = ViewProps & {
  className?: string;
};

export function ScreenContainer({
  className = "",
  children,
  ...props
}: Props) {
  return (
    <SafeAreaView className="flex-1 bg-background">
      <View className={`flex-1 bg-background ${className}`} {...props}>
        {children}
      </View>
    </SafeAreaView>
  );
}
```

### Why we did it

Multiple screens repeated the same full-screen wrapper pattern:
- `flex-1`
- background color
- safe screen structure

This wrapper ensures a consistent page baseline for current and future screens.

### Why this matters

This is a small abstraction, but it is strategically useful.

It reduces repeated screen boilerplate and gives future features a shared place to apply screen-level behavior consistently if needed later.

### React vs React Native note

In Next.js, the equivalent idea might be:
- a page shell
- a layout wrapper
- a content container component

In React Native, wrapping screens consistently matters because:
- safe-area behavior matters on real devices
- full-screen layout is the default screen shape
- background consistency is more visible in mobile transitions

---

## Step 7 — Create `Card` as the shared surface container

### What we did

We created:

```tsx
// components/ui/Card.tsx
import { View, type ViewProps } from "react-native";

type Props = ViewProps & {
  className?: string;
};

export function Card({ className = "", children, ...props }: Props) {
  return (
    <View
      className={`bg-surface border border-border rounded-xl p-4 ${className}`}
      {...props}
    >
      {children}
    </View>
  );
}
```

### Why we did it

Card styling was one of the most repeated visual patterns in the student flow.

It appeared in:
- academic year rows
- subject rows
- course rows
- course detail content blocks
- lesson row containers

So extracting `Card` immediately reduced duplication across the app.

### Why this matters

This is one of the clearest wins of the feature.

When card styling changes later, the update can happen once rather than across every screen manually.

That gives the app a stronger shared visual language with less code noise.

---

## Step 8 — Create shared button primitives

### What we did

We created:
- `PrimaryButton.tsx`
- `SecondaryButton.tsx`

Example:

```tsx
// components/ui/PrimaryButton.tsx
import { TouchableOpacity, type TouchableOpacityProps } from "react-native";
import { AppText } from "./AppText";

type Props = TouchableOpacityProps & {
  label: string;
  className?: string;
};

export function PrimaryButton({
  label,
  className = "",
  ...props
}: Props) {
  return (
    <TouchableOpacity
      className={`bg-accent rounded-md px-4 py-3 items-center justify-center active:opacity-70 ${className}`}
      accessibilityRole="button"
      {...props}
    >
      <AppText variant="button" className="text-white">
        {label}
      </AppText>
    </TouchableOpacity>
  );
}
```

```tsx
// components/ui/SecondaryButton.tsx
import { TouchableOpacity, type TouchableOpacityProps } from "react-native";
import { AppText } from "./AppText";

type Props = TouchableOpacityProps & {
  label: string;
  className?: string;
};

export function SecondaryButton({
  label,
  className = "",
  ...props
}: Props) {
  return (
    <TouchableOpacity
      className={`bg-surface border border-border rounded-md px-4 py-3 items-center justify-center active:opacity-70 ${className}`}
      accessibilityRole="button"
      {...props}
    >
      <AppText variant="button" className="text-text-primary">
        {label}
      </AppText>
    </TouchableOpacity>
  );
}
```

### Why we did it

Buttons are one of the first components that become inconsistent if they are left inline in screen files.

This feature already had at least one clear primary-action pattern in the course-detail screen, so extracting button components was justified.

### Why this matters

These components stay intentionally simple:
- no icon system yet
- no loading-button state yet
- no size variants yet
- no theme engine yet

That restraint is important.

The project needed:
- reusable buttons
- not a full component library

---

## Step 9 — Create `StatusBadge` for preview / locked / status states

### What we did

We created:

```tsx
// components/ui/StatusBadge.tsx
import { View } from "react-native";
import { AppText } from "./AppText";

type Variant = "preview" | "locked" | "success" | "warning";

const styles: Record<
  Variant,
  { container: string; text: string }
> = {
  preview: {
    container: "bg-accent-light",
    text: "text-accent",
  },
  locked: {
    container: "bg-surface-secondary",
    text: "text-locked",
  },
  success: {
    container: "bg-success-light",
    text: "text-success",
  },
  warning: {
    container: "bg-orange-100",
    text: "text-warning",
  },
};

type Props = {
  label: string;
  variant: Variant;
};

export function StatusBadge({ label, variant }: Props) {
  return (
    <View className={`px-2 py-1 rounded-full ${styles[variant].container}`}>
      <AppText variant="caption" className={styles[variant].text}>
        {label}
      </AppText>
    </View>
  );
}
```

### Why we did it

Feature 05 already introduced the need for preview vs locked lesson states.

Those states had:
- specific colors
- repeated shape styling
- short translated labels

So `StatusBadge` became the right place to centralize that state styling.

### Why this matters

This is a strong example of extracting a **semantic** component, not just a visual one.

The badge does not just look reusable.
It represents reusable product states such as:
- preview
- locked
- success
- warning

That makes future screens clearer and more consistent.

---

## Step 10 — Create shared loading and empty-state components

### What we did

We created:
- `LoadingScreen.tsx`
- `EmptyState.tsx`

Example:

```tsx
// components/ui/LoadingScreen.tsx
import { ActivityIndicator, View } from "react-native";
import { Colors } from "../../constants/colors";

export function LoadingScreen() {
  return (
    <View className="flex-1 items-center justify-center bg-background">
      <ActivityIndicator size="large" color={Colors.accent} />
    </View>
  );
}
```

```tsx
// components/ui/EmptyState.tsx
import { View } from "react-native";
import { AppText } from "./AppText";

type Props = {
  title?: string;
  description: string;
  className?: string;
};

export function EmptyState({
  title,
  description,
  className = "",
}: Props) {
  return (
    <View className={`flex-1 items-center justify-center px-6 ${className}`}>
      {title ? (
        <AppText variant="title" className="text-center mb-2">
          {title}
        </AppText>
      ) : null}
      <AppText variant="secondary" className="text-center">
        {description}
      </AppText>
    </View>
  );
}
```

### Why we did it

Loading and empty/error states are some of the easiest places for duplication to spread.

Earlier screens already repeated:
- centered wrapper layout
- background color
- spacing
- text styling

So these two components removed repetition and made screen files easier to read.

### Why this matters

This is especially useful in mobile apps because loading and empty states appear frequently in data-driven screens.

If every screen builds them differently:
- the app feels inconsistent
- the code grows noisier
- small UI bugs become easier to introduce

---

## Step 11 — Create `ListRow` as a basic reusable row pattern

### What we did

We created:

```tsx
// components/ui/ListRow.tsx
import { TouchableOpacity, View, type TouchableOpacityProps } from "react-native";
import { Card } from "./Card";

type Props = TouchableOpacityProps & {
  disabled?: boolean;
  className?: string;
};

export function ListRow({
  children,
  disabled = false,
  className = "",
  ...props
}: Props) {
  return (
    <TouchableOpacity
      className={`mb-3 active:opacity-70 ${disabled ? "opacity-60" : ""}`}
      disabled={disabled}
      {...props}
    >
      <Card className={className}>
        <View className="flex-row items-center justify-between">{children}</View>
      </Card>
    </TouchableOpacity>
  );
}
```

### Why we did it

The app already had multiple tappable row-like patterns, especially in:
- list cards
- lesson rows
- navigable item blocks

We did not want to create a large and over-configured row abstraction.

But a small reusable row primitive was justified because it supports current and near-next screens without over-engineering.

### Why this matters

This is a good example of the design rule for the feature:

**build only what current and near-next screens need**

`ListRow` is helpful because:
- it centralizes touch feedback
- it centralizes disabled-state opacity
- it reuses `Card`
- it provides a predictable row shell

but it still stays simple.

---

## Step 12 — Add the `components/ui/index.ts` barrel export

### What we did

We created:

```ts
export * from "./AppText";
export * from "./ScreenContainer";
export * from "./Card";
export * from "./PrimaryButton";
export * from "./SecondaryButton";
export * from "./StatusBadge";
export * from "./EmptyState";
export * from "./LoadingScreen";
export * from "./ListRow";
```

### Why we did it

This gave the project one clean import path for shared UI primitives.

Instead of importing every component through long relative paths, screens can now import from:

```ts
../../components/ui
```

or the appropriate relative equivalent.

### Why this matters

This is a small DX improvement, but it makes the shared layer feel like a real foundation instead of a pile of unrelated files.

That also makes future feature work smoother.

---

## Step 13 — Migrate the existing student screens to the shared foundations

### What we did

We updated the already-built student screens so they would use the new shared UI layer.

The main screens updated were:
- `app/(student)/index.tsx`
- `app/(student)/[yearId]/index.tsx`
- `app/(student)/[yearId]/[subjectId]/index.tsx`
- `app/(student)/course/[courseId].tsx`

We replaced repeated inline UI patterns with:
- `ScreenContainer`
- `AppText`
- `Card`
- `LoadingScreen`
- `EmptyState`
- `PrimaryButton`
- `StatusBadge`
- `ListRow`

### Why we did it

This step is what makes Feature 06 real.

If the shared components exist but existing screens do not adopt them, then the feature is only scaffolding, not actual implementation progress.

So the migration step was essential.

### Why this matters

This is the moment where the app stops being:
- a few styled screens

and becomes:
- a screen set built on reusable UI foundations

That is a meaningful engineering shift.

---

## Step 14 — Keep Arabic-first and RTL-safe rules intact

### What we did

While creating the shared UI components and migrating screens, we kept the Arabic-first rule active:
- visible UI text still comes from translation keys
- no screen/component text defaults were introduced as hardcoded UI copy
- no left/right-specific spacing habits were introduced into the shared patterns
- layouts remained usable for Arabic-first rendering

We also preserved the existing localization flow rather than bypassing it.

### Why we did it

A design system can accidentally break localization discipline if it starts embedding visible strings inside shared components.

That would be especially harmful here because the project already established:
- Arabic as default
- English as secondary
- translation keys for visible UI text
- RTL awareness as a permanent requirement

So Feature 06 had to strengthen those rules, not weaken them.

### Why this matters

A shared UI foundation is only valuable if it is compatible with the app’s core product rules.

For EduStream Mobile, that means:
- Arabic-first
- translation-key-driven
- RTL-safe by default

If the shared layer ignores those, it becomes technical debt instead of a foundation.

---

## Step 15 — Example migrated code for the Course Detail screen

### What we did

A representative result of this feature was the migration of the Course Detail screen to the shared UI layer.

Example:

```tsx
import { Alert, FlatList, View } from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";

import { getCourseDetail, getLessonsByCourse } from "../../../lib/mock-data/student";
import type { CourseDetail, Lesson } from "../../../lib/types";
import { t, isRTL } from "../../../lib/i18n";
import {
  AppText,
  Card,
  EmptyState,
  ListRow,
  LoadingScreen,
  PrimaryButton,
  ScreenContainer,
  StatusBadge,
} from "../../../components/ui";
import { spacing } from "../../../constants/design";

function LessonItem({ lesson }: { lesson: Lesson }) {
  const handlePress = () => {
    if (lesson.isPreview) {
    router.push(`/student-watch/${lesson.id}`);
      return;
    }

    Alert.alert(
      t("student.lesson_locked_title"),
      t("student.lesson_locked_message")
    );
  };

  return (
    <ListRow onPress={handlePress} disabled={!lesson.isPreview}>
      <View className="flex-1">
        <AppText variant="body">{lesson.title}</AppText>

        <AppText variant="muted" className="mt-1">
          {t("student.lesson_number")} {lesson.orderIndex}
        </AppText>
      </View>

      <StatusBadge
        variant={lesson.isPreview ? "preview" : "locked"}
        label={
          lesson.isPreview
            ? t("student.badge_free_preview")
            : t("student.badge_locked")
        }
      />
    </ListRow>
  );
}

export default function CourseDetailScreen() {
  const { courseId } = useLocalSearchParams<{ courseId: string }>();
  const [course, setCourse] = useState<CourseDetail | null>(null);
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let mounted = true;

    async function load() {
      try {
        setLoading(true);
        setError("");

        const [courseData, lessonData] = await Promise.all([
          getCourseDetail(courseId),
          getLessonsByCourse(courseId),
        ]);

        if (!mounted) return;
        setCourse(courseData);
        setLessons(lessonData);
      } catch {
        if (mounted) setError(t("student.error_load_course"));
      } finally {
        if (mounted) setLoading(false);
      }
    }

    load();
    return () => {
      mounted = false;
    };
  }, [courseId]);

  if (loading) return <LoadingScreen />;
  if (error || !course) {
    return <EmptyState description={error || t("student.error_load_course")} />;
  }

  return (
    <ScreenContainer>
      <FlatList
        data={lessons}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ padding: spacing.lg }}
        ListHeaderComponent={
          <View className="mb-4">
            <Card>
              <AppText variant="title">{course.title}</AppText>

              <AppText variant="secondary" className="mt-2">
                {t("student.by_teacher")} {course.teacherName}
              </AppText>

              <AppText variant="secondary" className="mt-3">
                {course.description}
              </AppText>

              <AppText variant="price" className="mt-4">
                {course.price.toLocaleString(isRTL() ? "ar-SA" : "en-US")}{" "}
                {t("student.price_suffix")}
              </AppText>

              <PrimaryButton
                className="mt-4"
                label={t("student.enroll_button")}
                onPress={() =>
                  Alert.alert(
                    t("student.enroll_button"),
                    t("student.mock_action_not_ready")
                  )
                }
              />
            </Card>

            <AppText variant="title" className="mt-4 mb-3">
              {t("student.lessons_header")}
            </AppText>
          </View>
        }
        renderItem={({ item }) => <LessonItem lesson={item} />}
        ListEmptyComponent={
          <EmptyState description={t("student.no_lessons")} />
        }
      />
    </ScreenContainer>
  );
}
```

### Why we did it

This screen was a strong test case because it already contained:
- card sections
- list rows
- lesson badges
- button styling
- loading/error/empty states
- Arabic-aware text

So if the shared design foundation worked well here, it would be strong enough for the next features too.

---

## Problems encountered in Feature 06

### Problem 1 — Repeated UI patterns existed, but not all of them were worth abstracting

Some repeated patterns were obvious candidates:
- cards
- text variants
- loading/empty states
- badges
- buttons

But not every repeated JSX structure should become a reusable component.

### Why this mattered

If the feature extracted too much:
- components would become overly generic
- props would become messy
- the UI layer would become harder to understand than the original screen code

So the design system had to stay intentionally small.

### Problem 2 — Shared components can accidentally introduce hardcoded text

A common convenience mistake is to give components default text like:
- “Empty”
- “Try again”
- “Submit”

That would break the app’s translation discipline.

### Why this mattered

The project already established a strict rule:
all visible UI text must come from translation keys.

So the shared components had to remain presentational and accept labels as props instead of inventing their own UI copy.

### Problem 3 — RTL safety can be weakened by component design

A component can look reusable and still be LTR-biased if it assumes:
- left-aligned icon spacing
- left-only margin habits
- rigid row composition that does not respect Arabic layout balance

### Why this mattered

Feature 06 was not only about visual reuse.
It also had to make reuse **safe** for Arabic-first UI work.

### Problem 4 — Existing screens still needed migration work

The shared components alone were not enough.

The already-built student screens had to be updated so the feature produced visible value now, not just “future usefulness.”

### Why this mattered

Without the migration step:
- duplication would remain
- the feature would be incomplete
- next features would still be tempted to copy old screen patterns

---

## How those problems were solved

### Solution 1 — Extract only the small set of patterns already proven useful

We extracted only the patterns that:
- already existed in multiple places
- had clear visual consistency needs
- were likely to be reused again soon

That kept the shared foundation simple.

### Solution 2 — Keep components presentational and pass labels from the screen

Components such as:
- `PrimaryButton`
- `SecondaryButton`
- `StatusBadge`
- `EmptyState`

accept text through props rather than defining UI copy internally.

That preserved the translation-key rule.

### Solution 3 — Avoid directional left/right assumptions in shared patterns

We kept layouts simple and row composition neutral so the shared primitives would remain usable in RTL.

That makes the default path safer for future Arabic-first development.

### Solution 4 — Migrate the existing student flow immediately

We updated the already-built student screens to use the shared layer now.

That made Feature 06 an active UI refactor, not passive setup.

---

## React vs React Native lessons from this feature

## Lesson 1 — A mobile design system should start smaller than many web design systems

A web engineer may be tempted to create:
- full variant systems
- slot-based primitives
- deep composition APIs
- a large token infrastructure

But early React Native feature work often benefits more from:
- a few stable primitives
- simple prop APIs
- readable route files
- quick reuse across screens

That is what this feature did.

## Lesson 2 — Shared constants still matter even when using utility classes

In web Tailwind, utility classes can cover a huge portion of design-system needs directly in markup.

In React Native, some layout values still appear in JavaScript object props and component APIs, so shared numeric constants remain useful earlier.

This is one of the practical differences between DOM styling and React Native UI work.

## Lesson 3 — Text primitives are especially valuable in React Native

In web apps, browser defaults and semantic HTML can do more typographic work for free.

In React Native, repeated `Text` styling becomes noisy quickly.

So a small `AppText` primitive often provides value sooner than a web engineer might expect.

## Lesson 4 — Presentational reuse must not fight localization

In multilingual mobile apps, reusable components are only truly reusable if they:
- do not hardcode visible strings
- do not assume LTR layout
- do not make language-specific spacing assumptions

That becomes even more important in Arabic-first apps.

## Lesson 5 — A feature like this is infrastructure, but it should still create visible app improvement

A common trap is to build UI infrastructure that only helps “later.”

Good frontend infrastructure should also improve the current app immediately.

This feature did that by migrating the existing screens right away.

---

## Discussion notes for Feature 06

### Why did we not build a larger theme system?

Because the app did not need it yet.

The current project phase needed:
- practical reuse
- consistent styling
- shared building blocks

It did **not** yet need:
- runtime theme switching
- dark mode support
- semantic token layers across many product surfaces
- advanced compound component patterns

So the right engineering move was to build the smallest useful foundation.

### Why not create dozens of text and button variants now?

Because too many variants early in a project usually signal uncertainty, not maturity.

A smaller set of trusted variants is better than a larger set of barely differentiated ones.

### Why did we update existing screens instead of only creating the new components?

Because a design foundation is only real when the app actually uses it.

If current screens still duplicate their styling, then the feature has not yet delivered its intended value.

### What is the main React Native lesson here?

A shared mobile design foundation should be:
- small
- practical
- readable
- localization-safe
- RTL-safe
- immediately useful to current screens

Not every app needs a large design system early.
But every growing app benefits from a small reliable one.

---

## Final output of Feature 06

At the end of this feature, the project had:
- a shared `constants/design.ts` file
- a new `components/ui` folder for reusable primitives
- shared typography through `AppText`
- a shared page wrapper through `ScreenContainer`
- a shared surface container through `Card`
- shared `PrimaryButton` and `SecondaryButton`
- shared `StatusBadge`
- shared `LoadingScreen`
- shared `EmptyState`
- a basic reusable `ListRow` pattern
- migrated student screens using the shared foundation
- Arabic-first behavior preserved
- translation-key discipline preserved
- RTL-safe implementation habits preserved
- a cleaner reusable UI base for the next features

---

## Completion checklist for Feature 06

Feature 06 is complete when all of these are true:

- `constants/design.ts` exists
- `components/ui/` exists
- `AppText` exists and is used in student screens
- `ScreenContainer` exists
- `Card` exists and replaces duplicated card styling where appropriate
- `PrimaryButton` exists
- `SecondaryButton` exists
- `StatusBadge` exists
- `LoadingScreen` exists and replaces duplicated loading layouts
- `EmptyState` exists and replaces duplicated empty/error layouts where appropriate
- `ListRow` exists if used for lesson or item rows
- Academic Years still works
- Subjects still works
- Courses still works
- Course Detail still works
- preview / locked lesson states still work
- Arabic is still the default language
- English still works after switching
- visible UI text still comes from translation keys
- no new hardcoded visible strings were introduced in the shared components
- shared UI patterns are now ready for the next feature

---

## Exact commands used

```bash
mkdir -p components/ui

touch constants/design.ts

touch components/ui/AppText.tsx
touch components/ui/ScreenContainer.tsx
touch components/ui/Card.tsx
touch components/ui/PrimaryButton.tsx
touch components/ui/SecondaryButton.tsx
touch components/ui/StatusBadge.tsx
touch components/ui/EmptyState.tsx
touch components/ui/LoadingScreen.tsx
touch components/ui/ListRow.tsx
touch components/ui/index.ts
```

Run the app after implementation:

```bash
npx expo start --clear
```

Optional TypeScript verification:

```bash
npx tsc --noEmit
```

Optional hardcoded-string / hardcoded-color sanity checks:

```bash
grep -R "#7C5CFC" app components
grep -R "ActivityIndicator" app components
```

---

## Official references

These were the most relevant official references for this feature:

- NativeWind docs: [https://www.nativewind.dev/docs/getting-started/installation](https://www.nativewind.dev/docs/getting-started/installation)
- Expo Router docs: [https://docs.expo.dev/router/navigating-pages/](https://docs.expo.dev/router/navigating-pages/)
- React Native `FlatList` docs: [https://reactnative.dev/docs/flatlist](https://reactnative.dev/docs/flatlist)
- React Native `Alert` docs: [https://reactnative.dev/docs/alert](https://reactnative.dev/docs/alert)
- React Native layout props including logical spacing: [https://reactnative.dev/docs/layout-props#marginstart](https://reactnative.dev/docs/layout-props#marginstart)

One important caution:

for Arabic-first mobile UI, a shared design foundation is not only about visual consistency.
It must also preserve:
- translation-key discipline
- RTL-safe layout choices
- reusable patterns that do not assume English-first structure

---



# Feature 07 — Create Mock Data Layer

## What this feature does

This feature reorganizes the app’s mock data into a proper data layer under `lib/mock-data/` so that student screens no longer depend on ad hoc shaping or large inline data decisions inside screen files. [file:32]

The visible student flow remains the same:
- Academic Years
- Subjects
- Courses
- Course Detail
- Lesson preview / locked states

But the internal structure becomes much cleaner and more future-friendly:
- shared reference data is separated from student-specific queries
- teacher-related mock data is prepared for future teacher features
- profile-related mock data is prepared for future home/profile screens
- the mock query functions remain async so they can later be swapped for real backend calls with minimal screen changes [file:32]

This is an architectural feature more than a UI feature. The goal is not to add new visible screens yet. The goal is to make the current and upcoming screens consume data in a way that resembles a real app instead of a temporary prototype. [file:32]

---

## Why this feature matters

Up to this point, the student flow already worked with mock data, but the mock data layer was still too narrow. It was enough for the first browse flow, but not enough for the next screens that will need:
- student profile information
- teacher information
- enrollments
- payment info
- reusable helper queries
- cleaner backend-aligned relationships between years, subjects, courses, and lessons [file:32]

This matters because screen code should stay focused on:
- loading state
- error state
- rendering
- navigation
- user interaction

It should not also become the place where we manually reconstruct data relationships every time we build a new screen. [file:32]

For a React / Next.js engineer, this is similar to the moment when a project outgrows page-level inline mock arrays and needs a more intentional data-access layer. The difference in React Native is that screens often carry more responsibility for loading, list rendering, touch interactions, and navigation transitions, so keeping them “dumb” is even more valuable. [file:32][web:20]

This feature also protects the project from a common mistake: building fake backend logic directly inside screens and then throwing it away later. Instead, we keep the mock layer small, async, and shaped like future real queries. [file:32]

---

## Original implementation plan

The implementation plan for this feature became:

1. Re-read the latest repo documents from GitHub before changing anything.
2. Inspect the current student screens and existing mock-data usage.
3. Expand the shared type layer in `lib/types.ts`.
4. Split mock data by concern under `lib/mock-data/`.
5. Keep the existing student query function signatures stable.
6. Add richer backend-aligned relationships for upcoming features.
7. Verify that the existing student screens still behave exactly the same.
8. Confirm Arabic remains the default and English still works. [file:32]

The key project constraints remained active throughout this feature:
- mock-data-first only
- no Supabase yet
- no Clerk yet
- Arabic is the default language
- English is secondary
- visible UI text must continue using translation keys
- no unnecessary state-management libraries
- no fake backend complexity that we will regret later [file:32]

---

## Step 1 — Re-read the repo documents before implementation

### What we did

Before touching the code, we re-read the latest versions of:
- `mobile-project-overview.md`
- `mobile-architecture.md`
- `mobile-code-standards.md`
- `mobile-ui-context.md`
- `mobile-build-plan.md`
- `mobile-progress-tracker.md`
- `mobile-ai-workflow-rules.md` [file:32]

### Why we did it

This mattered for two reasons.

First, the tracker was the source of truth for the current feature numbering. The project had already inserted the Arabic-first localization feature earlier in the sequence, so older feature numbering could no longer be trusted. [file:32]

Second, the architecture docs still describe the eventual real backend stack, but the active implementation mode remains mock-data-first. Re-reading the current docs prevented the mistake of starting backend work too early. [file:32]

### Engineering note

This is a strong repo-driven habit: read the current documents, not your memory of them. In mobile projects, the consequences of architectural drift can show up quickly in navigation, bundling, startup behavior, and screen contracts. [file:32][web:20]

---

## Step 2 — Inspect the current mock-data usage and student screens

### What we did

We checked the existing student screens and confirmed that they were already calling functions from `lib/mock-data/student.ts`, including:
- `getAcademicYears()`
- `getSubjectsByYear()`
- `getCoursesBySubject()`
- `getCourseDetail()`
- `getLessonsByCourse()` [file:32]

That meant the app had already started moving in the right direction. The student screens were not hardcoding all of their data inside JSX anymore. [file:32]

### Why we did it

This inspection changed the implementation strategy.

At first glance, “Create Mock Data Layer” might sound like a feature that requires rewriting all student screens. But the current repo state already had the first version of that layer in place. So the real work for Feature 07 was not to invent a data layer from scratch. It was to mature the existing one:
- add structure
- add richer types
- split responsibilities
- keep screen behavior unchanged [file:32]

### React vs React Native note

This is very similar to auditing a Next.js app before refactoring data utilities. The main difference is that Expo Router screens are native mobile screens, so a messy refactor can affect:
- loading behavior
- touch interactions
- route navigation
- list rendering performance [web:20][file:32]

That made stability more important than aggressive rewrites.

---

## Step 3 — Expand `lib/types.ts` to support future screens

### What we did

We expanded `lib/types.ts` so that it no longer described only the minimal browse flow. The file now includes types not just for:
- `AcademicYear`
- `Subject`
- `Course`
- `Lesson`
- `CourseDetail`

but also for:
- `Teacher`
- `StudentProfile`
- `Enrollment`
- `EnrollmentStatus`
- `PaymentInfo` [file:32]

### Why we did it

The next features will need more than browse data.

For example:
- the student home screen will likely need current profile info
- profile/payment screens will need payment instructions and student-related state
- teacher screens will need teacher data and enrollment data

If those types are added too late, screens usually start by inventing temporary shapes inside component files. That increases refactor cost later. [file:32]

So this step deliberately pushed the shared type layer closer to the planned backend shape while still staying lightweight. We did not over-model everything. We only added the fields that are realistic and likely to remain stable. [file:32]

### Engineering lesson

This is one of the most useful “mock-data-first” habits:
- keep the types realistic
- keep the data source fake
- keep the screen contracts stable

That combination gives you fast UI progress without painting yourself into a corner. [file:32]

---

## Step 4 — Split mock data by concern under `lib/mock-data/`

### What we did

We reorganized the mock data into separate modules under `lib/mock-data/`:

- `shared.ts`
- `student.ts`
- `teacher.ts`
- `profile.ts`
- `index.ts` [file:32]

The responsibility of each file became:

### `shared.ts`
Owns shared lookup/reference data such as:
- academic years
- subjects
- simple lookup helpers like year-by-id or subject-by-id [file:32]

### `student.ts`
Owns student-facing course and lesson queries such as:
- course lists
- course detail
- lesson list
- lesson lookup
- current student enrollments [file:32]

### `teacher.ts`
Owns mock teacher-side data such as:
- teacher records
- payment info
- enrollment lookups for teacher workflows [file:32]

### `profile.ts`
Owns profile-related data such as:
- current student profile
- student profile by id [file:32]

### `index.ts`
Acts as a barrel export so future screens can import from `lib/mock-data` more easily. TypeScript supports re-export patterns like this, which is a clean way to centralize module access as the codebase grows. [web:23]

### Why we did it

This separation matches how the app will actually evolve.

If all mock data lives forever in one `student.ts` file, two bad things happen:
1. the file turns into a giant dump of unrelated arrays and helper functions
2. future teacher and profile work starts depending on student-specific mock modules in awkward ways

By splitting concerns now, we make future feature work more predictable and reduce the chance of accidental duplication. [file:32]

### Engineering note

This is not about creating a complex data architecture too early. It is actually the opposite. We are keeping the mock layer intentionally simple, but we are organizing it by responsibility before it becomes messy. [file:32]

---

## Step 5 — Keep existing student query function names stable

### What we did

One of the most important decisions in this feature was to keep the existing student-facing function names stable.

That means the screens could continue calling:
- `getAcademicYears()`
- `getSubjectsByYear()`
- `getCoursesBySubject()`
- `getCourseDetail()`
- `getLessonsByCourse()` [file:32]

Internally, the implementation became cleaner, and some data moved into `shared.ts`, but the screens did not need a disruptive API rewrite. [file:32]

### Why we did it

This is exactly the kind of decision that reduces future migration cost.

Today:
- those functions return local mock arrays

Later:
- those functions can call Supabase queries or another real data source

If the function names and return shapes stay stable, the screen code changes much less. That is the whole point of a good mock-data layer. [file:32]

### React vs React Native lesson

In React web apps, changing a helper import path can be annoying. In React Native mobile apps, unnecessary data-contract churn can also affect:
- screen loading code
- empty states
- touch-flow testing
- route behavior across nested screens

So preserving stable screen contracts is especially valuable. [file:32][web:20]

---

## Step 6 — Add richer relationships without adding fake backend complexity

### What we did

We made the mock data more realistic by keeping the relationships clearer between:
- academic years
- subjects
- courses
- lessons
- teachers
- enrollments
- payment info
- student profiles [file:32]

We also kept the query functions async even though they are reading local arrays. [file:32]

### Why we did it

Keeping the functions async is not a gimmick. It matters for future compatibility.

A screen that already does:
- `setLoading(true)`
- `await getSomething()`
- `setState(data)`
- `setLoading(false)`

is much easier to migrate later than a screen built around synchronous temporary assumptions. [file:32]

At the same time, we intentionally avoided building a fake mini-backend inside the app. We did not add:
- overcomplicated filtering engines
- fake repositories everywhere
- invented caching layers
- extra state libraries

That would create code that feels “architected” but is not actually useful yet. [file:32]

### Engineering lesson

A good mock-data layer should imitate:
- data shape
- async behavior
- naming stability

It should not imitate:
- every backend implementation detail
- every future query optimization
- every future service boundary

That is the difference between useful scaffolding and premature architecture. [file:32]

---

## Step 7 — Preserve the current student behavior after the refactor

### What we did

After restructuring the mock data layer, we verified that the existing student flow still worked the same way:
- Arabic Years screen loads correctly
- Arabic subjects appear after tapping a year
- Arabic course titles appear after tapping a subject
- Course Detail still renders description and lesson list
- preview lessons still show the preview badge
- locked lessons still show the locked badge
- English toggle still works
- `npx tsc --noEmit` stays clean
- Metro shows no console errors [file:32]

### Why we did it

Feature 07 is a structural refactor, not a UI redesign. The success condition is not “the app looks different.” The success condition is:
- the app behaves the same from the user’s perspective
- the code becomes cleaner from the engineer’s perspective [file:32]

That is an important kind of progress in a real project. Good architecture work often produces little or no visible change while making future feature work dramatically easier. [file:32]

---

## Problems encountered

### 1. The feature looked more visible than it actually was

At first, it was easy to expect that creating `profile.ts`, `teacher.ts`, and `shared.ts` should immediately produce new UI. But those files are structural preparation for future features, not new screens by themselves. [file:32]

### 2. Existing student screens already used `student.ts`

This changed the nature of the work. The feature was not a fresh data-layer creation from zero. It was a refactor and expansion of an already-started pattern. [file:32]

### 3. It was important not to overbuild

Once the mock layer started growing, it would have been easy to invent extra abstractions or fake service patterns “just in case.” That would have increased complexity without improving the current UI. [file:32]

---

## How those problems were solved

### 1. Accept the structural nature of the feature

We treated this feature as infrastructure work. That made the right success criteria much clearer:
- same visible behavior
- cleaner module boundaries
- richer types
- more reusable async query helpers [file:32]

### 2. Reuse the good part of the current implementation

Because the existing screens already depended on `lib/mock-data/student.ts`, we did not fight that. We kept the screen-facing API stable and improved the internals around it. [file:32]

### 3. Keep the architecture intentionally small

We added only what upcoming features are likely to need. That meant:
- realistic types
- small query-like functions
- separated concerns
- no new state library
- no backend packages
- no fake complex repository layer [file:32]

---

## React vs React Native lessons from this feature

### 1. “Dumb screens” matter even more on mobile

In web React, a page can often absorb extra shaping logic without immediately feeling painful. In React Native, screens usually already manage:
- loading states
- list rendering
- navigation params
- touch targets
- platform-aware layout details

That means pushing data-shaping down into a mock-data layer pays off earlier. [file:32]

### 2. Async mock functions are worth it

Even though the data is local, keeping async function signatures helps mobile screens behave more like real production screens. That makes:
- loading indicators
- error handling
- future backend migration

much more realistic. [file:32]

### 3. Expo Router feels familiar, but the runtime is still native

A React / Next.js engineer will recognize the file-based routing model quickly. But the cost of unstable screen contracts is different in mobile because every route is also a native interaction surface with its own lifecycle and UX expectations. [web:20][file:32]

### 4. Localization discipline still applies in structural features

Even though this feature was mostly about data structure, the Arabic-first rule still mattered. If any visible text had been added during refactoring, it would still need translation keys. Structural features do not suspend localization rules. [file:32][web:17]

---

## Discussion notes

This feature is a good example of a non-visual feature that still creates major engineering value.

From the outside, nothing dramatic changes. The student flow still looks the same. But inside the project, several things become much healthier:
- the data layer has clearer responsibility boundaries
- the next screens have a better foundation
- future backend migration becomes easier
- the temptation to recreate mock arrays inside every new screen is reduced [file:32]

It also demonstrates a useful principle for Expo / React Native projects:
- do not wait for the real backend before designing a clean data contract
- but also do not pretend the mock layer needs production-grade infrastructure

The correct middle ground is:
- stable query names
- realistic return types
- async behavior
- small modules organized by concern [file:32]

For this project specifically, `teacher.ts` and `profile.ts` are intentionally ahead of the current UI. That is not wasteful. It is just enough forward preparation to make the next features cleaner without forcing premature backend work. [file:32]

---

## Final output of Feature 07

At the end of this feature, the project has:
- a structured mock-data layer under `lib/mock-data/`
- shared reference data separated into `shared.ts`
- teacher-related mock data in `teacher.ts`
- profile-related mock data in `profile.ts`
- student-facing course and lesson queries in `student.ts`
- a barrel export in `lib/mock-data/index.ts`
- expanded backend-aligned shared types in `lib/types.ts`
- existing student screens still working with the same visible behavior
- Arabic still as the default language
- English still working as the secondary language [file:32]

This means future screens can now import reusable query-like helpers instead of manually rebuilding data inside each screen component. [file:32]

---

## Completion checklist for Feature 07

Feature 07 is complete when all of these are true:

- `lib/mock-data/` exists as a clear mock data layer. [file:32]
- Shared reference data is separated from student-specific logic. [file:32]
- Teacher-related mock data exists in its own module for future screens. [file:32]
- Profile-related mock data exists in its own module for future screens. [file:32]
- `lib/types.ts` includes richer backend-aligned shapes. [file:32]
- Existing student screens still load through async mock functions. [file:32]
- The current student browse and course detail flow still behaves the same. [file:32]
- `npx tsc --noEmit` passes cleanly. [file:32]
- Metro starts without new errors. [file:32]
- Arabic remains the default experience. [file:32]
- English still works. [file:32]
- No backend packages were added for this feature. [file:32]

---

## Official references

- Expo Localization guide: [https://docs.expo.dev/guides/localization/](https://docs.expo.dev/guides/localization/) [web:17]
- Expo Router documentation: [https://docs.expo.dev/versions/latest/sdk/router/](https://docs.expo.dev/versions/latest/sdk/router/) [web:20]
- TypeScript modules and re-exports: [https://www.typescriptlang.org/docs/handbook/modules.html](https://www.typescriptlang.org/docs/handbook/modules.html) [web:23]



-----

# Feature 08 — Build Student Home Screen

## What this feature does

This feature adds the first real **student landing screen** for the EduStream mobile app.

Up to this point, the student experience could browse:
- academic years
- subjects
- courses
- course detail
- lesson preview routes

But the app still did not have a real “home” entry point for the student role.

Feature 08 introduces that missing app-entry experience by building a dedicated Student Home Screen that:
- becomes the main landing screen for student users
- shows a greeting/top section
- shows mock-data-driven overview blocks
- gives quick navigation entry points into the existing student flow
- reuses the shared design foundations from Feature 06
- reads data from the mock data layer created in Feature 07 instead of embedding screen-specific data directly

This feature remains fully inside the **mock-data-first phase**.

It does **not** add:
- Supabase
- Clerk
- real auth
- real user profiles
- real recommendation logic
- teacher home features
- backend integration

The final success condition for this feature is:
- the app opens to a student home screen
- Arabic is the default visible experience
- the screen uses translation keys for all visible UI text
- the screen renders mock-data-driven content
- the home screen can navigate into the existing student flow
- the UI remains visually consistent with the shared design system
- the same screen still works in English after switching language

---

## Why this feature matters

A student-facing app usually needs two different things:

1. a **browse flow**
2. a **home / dashboard entry point**

Before this feature, EduStream had the browse flow, but not the true entry point.

That meant the app structure was still missing an important product layer:
the student could navigate through the content tree, but the experience did not yet feel like a real student app that opens into a useful personal overview.

This feature matters because the home screen becomes the place where the app can eventually answer questions like:
- What am I already enrolled in?
- What should I continue learning?
- Do I have pending enrollments?
- What should I look at next?

Even in a mock-data-first phase, that screen is important because it establishes:
- the main student starting point
- the relationship between personal data and content navigation
- the future shape of a backend-driven student dashboard

For a React / Next.js engineer, this is similar to the difference between:
- a content listing route
and
- a personalized authenticated dashboard entry page

But in React Native, the home screen has an even stronger role because it often becomes:
- the first thing the user sees after opening the app
- the first tab in the main navigation
- the anchor point for future student engagement patterns

So this feature is not just another screen.
It is the first step toward a real student app shell.

---

## Original implementation plan

The implementation plan for this feature became:

1. Re-read the latest repo documents from GitHub before changing anything
2. inspect the current student route structure and the current app entry behavior
3. inspect the mock data layer from Feature 07 to see what home-screen data already exists
4. decide the smallest navigation update needed to make Home the real student entry point
5. add any small home-specific query helpers inside the mock data layer
6. create the Student Home Screen route
7. render overview sections using mock-data-layer functions only
8. reuse the shared UI primitives and design tokens from Feature 06
9. make all visible text come from translation files
10. verify Arabic first, then English
11. confirm the home screen routes cleanly into the existing student flows

Important constraints remained active during this feature:
- Arabic is the default language
- English is secondary
- all visible UI text must use translation keys
- avoid hardcoded directional assumptions that break RTL
- use mock data only
- keep home-specific query helpers inside the mock data layer
- do not expand into teacher work, profile work, or backend work
- build only the home screen and the smallest support changes needed for it to work

---

## Step 1 — Re-read the repo documents before implementation

### What we did

Before changing code, we re-read the latest versions of:
- `mobile-project-overview.md`
- `mobile-architecture.md`
- `mobile-code-standards.md`
- `mobile-ui-context.md`
- `mobile-build-plan.md`
- `mobile-progress-tracker.md`
- `mobile-ai-workflow-rules.md`

### Why we did it

This mattered for several reasons.

First, the repo instructions explicitly said the **current numbering and order from `mobile-progress-tracker.md`** must be treated as the source of truth.

That was important because the project had already inserted the Arabic-first localization feature earlier, which shifted the later feature numbering. Relying on earlier chat memory would have risked implementing the wrong feature number or the wrong sequence.[file:64]

Second, the docs confirmed that the app is still in the **mock-data-first phase**, which means this feature had to avoid:
- Supabase
- Clerk
- any real backend assumptions

Third, the docs confirmed that Arabic-first is not optional. It is a standing implementation rule for all future features, including:
- Arabic as the default language
- English as a secondary language
- translation keys for all visible text
- RTL-safe layout decisions
- no hardcoded visible strings in screens or reusable components.[file:64]

### Engineering note

This step may feel repetitive, but it is one of the most important habits in repo-driven work.

In mobile projects especially, implementation rules often live across several documents:
- architecture
- UI context
- build plan
- workflow rules
- tracker status

Re-reading them before each feature is what prevents “correct code, wrong feature” mistakes.

---

## Step 2 — Inspect the current student app structure before adding Home

### What we did

We inspected the current student route structure and the existing app entry behavior.

At the start of this feature, the student route group already had:
- Academic Years screen
- Subjects screen
- Courses screen
- Course Detail screen
- Watch placeholder / lesson route

But the student group did **not** yet have a dedicated home route as the proper student entry point.

The effective student landing path still behaved like the browse flow entry, not like a real student home screen.

### Why we did it

This inspection was necessary because the home feature had two jobs, not one:

1. build the screen itself
2. make that screen the real student entry point

If we built only a `home.tsx` file without adjusting the student navigation structure, then the feature would be incomplete.
The screen would exist in the codebase, but it would not actually function as the student’s main landing experience.

### Why this matters

This is a useful frontend distinction:

- **screen exists** is not enough
- **screen is part of the product flow** is what really matters

For this feature, “build the home screen” actually included a navigation responsibility:
the app had to land there naturally.

### React vs React Native note

For a Next.js engineer, this is similar to realizing that creating `/dashboard.tsx` is not enough if the app still redirects users to `/courses` on entry.

In Expo Router, the idea is similar, but the runtime effect is more app-shell-like:
the landing screen is part of the native navigation structure, not just a page reachable by URL.

---

## Step 3 — Inspect Feature 07 mock data and decide what the Home screen needs

### What we did

We reviewed the mock data layer built in Feature 07 to understand what data was already available and what the home screen still needed.

The existing mock layer already gave the project strong student-flow data such as:
- course data
- lessons
- enrollments
- subject and year relationships
- confirmed enrollment helpers

That meant the home screen did **not** need embedded arrays directly inside the screen.

However, the home screen still needed home-friendly query functions such as:
- confirmed enrolled courses in full course-object form
- a small featured / recommended course slice
- pending enrollment information in a format easy for the screen to render

### Why we did it

This step mattered because Feature 08 had a strict scope rule:

the screen must read from the **mock data layer**, not embed screen-specific mock data directly in the route component.

So instead of putting home-specific arrays inside the screen file, the cleaner approach was:
- keep screen-specific rendering in the screen
- keep home-specific data access helpers inside the mock data layer

### Why this matters

This is one of the most important architectural habits in the mock-data-first phase.

The point of a mock layer is not just to “have fake data.”
The point is to preserve a future-friendly boundary between:
- where data comes from
- how UI renders it

That allows the future backend replacement to swap the source without rewriting the screen architecture.

### React vs React Native note

For a React / Next.js engineer, this is similar to the difference between:
- putting temporary inline arrays in a page component
and
- creating a small local repository / service helper that returns the shape the page needs

The second option scales better, and that same principle applies here.

---

## Step 4 — Add small home-specific query helpers to the mock data layer

### What we did

We added the smallest missing query helpers to `lib/mock-data/student.ts` so the home screen could stay clean.

The important helpers added for this feature were:

- `getMyEnrolledCourses()`
- `getFeaturedCourses()`

The first helper converted the already-known confirmed enrollment IDs into full course objects.
The second helper returned a small featured course slice suitable for the home screen.

### Why we did it

The home screen needed display-ready data.

It was technically possible to do this data shaping directly inside the screen, but that would have violated the feature rule that home-screen-specific helper/query logic should stay inside the mock data layer when needed.

By adding these functions to the mock layer, we preserved the separation:

- mock layer = fetch / shape data
- screen = load state, render, navigate

### Why this matters

This is exactly the kind of small abstraction that helps later.

Today:
- `getFeaturedCourses()` might return `COURSES.slice(0, 3)`

Later:
- it might call Supabase
- sort by recommendation logic
- filter by student profile
- merge recent activity

The screen can keep calling the same function name.

### Engineering note

This is a strong example of the “minimum useful abstraction” rule.

We did **not** build a full student dashboard service layer.
We added only the two helpers the screen truly needed.

That kept the feature within scope.

---

## Step 5 — Add translation keys for the home screen

### What we did

We added new translation keys in both:
- `lib/i18n/ar.ts`
- `lib/i18n/en.ts`

These keys covered the home-screen UI text, including:
- greeting text
- subtitle text
- section headers
- empty-state text
- pending-enrollment label
- continue-learning label
- browse CTA
- lesson-count label
- small helper labels used in the new screen

### Why we did it

Feature 04 created a permanent implementation rule:

**all visible UI text must come from translation files**

That rule still applied here, and the Feature 08 requirements repeated it explicitly.

So the home screen could not introduce strings like:
- `Welcome back`
- `Continue Learning`
- `Featured Courses`
- `Browse Courses`

directly inside JSX.

Everything visible had to come through translation keys so that:
- Arabic is the default experience
- English remains testable
- future localization stays maintainable
- the screen remains consistent with the Arabic-first architecture

### Why this matters

This feature is a good example of why localization is not a one-time task.

Once the localization foundation exists, every new feature must participate in it.
That means translation work becomes part of normal feature delivery, not a separate later cleanup step.

### React vs React Native note

This is conceptually familiar to any React engineer who has used i18n dictionaries.

The mobile-specific twist is that screen density is tighter, so translation choices affect layout more quickly.
A section title that looks harmless in English can alter spacing and row balance in Arabic on a small device much faster than on the web.

---

## Step 6 — Update the student route group so Home becomes the real entry point

### What we did

We created a student route layout and made the student flow behave like a proper app section with Home as the main entry point.

The key change was adding a dedicated student group layout:
- `app/(student)/_layout.tsx`

This layout defined the student navigation structure and allowed:
- `home.tsx` to exist as the student home route
- the current `index.tsx` to continue serving the browse flow
- nested dynamic routes such as course and watch screens to stay reachable without polluting the main entry UI

### Why we did it

This was the smallest navigation change that made the feature real.

Without this change:
- the app could still open into the old browse entry
- the new home screen would exist but not truly act as the student entry point

So this step was required to satisfy the feature’s central requirement:
the student home screen must be the proper landing screen.

### Why this matters

This step is a good reminder that navigation structure is part of product behavior.

A home screen is not defined only by what it contains.
It is also defined by where it sits inside the route tree and how the app enters it.

### React vs React Native note

For a Next.js engineer, this is similar to changing the layout and route flow so the user lands in the correct dashboard shell rather than a content index page.

In Expo Router, this route-tree decision affects native navigation behavior and tab / stack structure, not just browser route organization.

---

## Step 7 — Build the Student Home Screen itself

### What we did

We created:
- `app/(student)/home.tsx`

This screen became the student home route and loaded three categories of mock data:
- enrolled courses
- pending enrollments
- featured courses

The screen used local loading state and loaded data in `useEffect` through async mock-data-layer functions.

The visual structure included:
- a greeting / top section
- a continue-learning section
- a pending-enrollments section
- a featured-courses section
- a CTA that routes back into the browse flow

### Why we did it

This structure matched the feature scope while staying intentionally small.

The requirements suggested possible overview blocks such as:
- enrolled courses
- pending enrollments
- quick access to continue learning
- featured or recommended courses

But the same requirements also warned against adding too many blocks.

So the right implementation choice was to build a clean useful home screen with a few high-value sections rather than trying to simulate a complex dashboard too early.

### Why this matters

This is one of the most important product decisions in the feature:

**a home screen should feel useful, not crowded**

Especially in early mobile app development, adding too many home widgets usually creates:
- visual noise
- duplicated logic
- weak prioritization
- scope creep

A smaller home screen with a clear student purpose is usually better.

### Engineering note

The screen also included loading-friendly behavior through the shared loading primitive rather than assuming mock data means loading states do not matter.

That is the correct architectural choice because later the same screen will load from a real backend.

---

## Step 8 — Reuse the shared design foundation from Feature 06

### What we did

Instead of building the Home screen with one-off layout and text styling, we reused the shared UI foundation already created in Feature 06, including patterns such as:
- `AppText`
- `Card`
- `PrimaryButton`
- `EmptyState`
- `LoadingScreen`
- shared spacing values from `constants/design.ts`

### Why we did it

Feature 08 explicitly required reuse of the shared design foundation.

That was important both visually and architecturally.

Visually, it ensured the new home screen feels like part of the same student app as:
- Academic Years
- Subjects
- Courses
- Course Detail

Architecturally, it prevented new duplication from creeping back into the codebase after Feature 06 had already extracted the shared UI layer.

### Why this matters

A reusable UI foundation only proves its value when new features actually use it.

If the home screen had been built with fresh standalone patterns, then the project would start fragmenting again immediately.

So this feature also served as a test of whether Feature 06 was strong enough to support a new app-entry screen.

### React vs React Native note

For a web engineer, this is similar to checking whether the new dashboard page can be built cleanly from the existing design-system primitives rather than writing raw repeated utility markup again.

The same reuse principle applies here, just through React Native components rather than DOM elements.

---

## Step 9 — Add navigation entry points from Home into the existing student flows

### What we did

We connected the Home screen into the existing student navigation paths.

That included:
- tapping enrolled or featured courses to open Course Detail
- providing a CTA to move into the browse flow
- preserving access to the existing student journey rather than creating a disconnected “dashboard-only” screen

### Why we did it

The home screen is not supposed to replace the rest of the student app.
It is supposed to become the front door to it.

So the screen needed clear navigation entry points that help the student move from overview into action.

That is why the feature requirement specifically called for:
- quick access to continue learning
- entry points into existing student flows

### Why this matters

A home screen that only displays summary information but does not help the user go anywhere useful is not a strong home screen.

This feature made sure Home is:
- informative
- actionable
- connected to the rest of the student route tree

### React vs React Native note

This is similar to wiring dashboard cards on the web into deeper routes.

The difference in mobile is that touch targets and screen transitions matter more, so the home blocks need to feel like clear tappable actions, not just informational cards.

---

## Step 10 — Keep the layout Arabic-first and RTL-safe

### What we did

We built the home screen with Arabic-first behavior in mind from the start.

That meant:
- Arabic text is the default visible experience
- all visible labels come from translation keys
- layout choices avoid English-first left/right assumptions
- spacing and row composition remain safe in RTL
- English is still available for secondary testing

We avoided introducing layout decisions that depend on LTR-only thinking, such as:
- hardcoded `marginLeft` / `marginRight`
- row composition that only looks balanced in English
- directional assumptions hidden inside reusable UI pieces

### Why we did it

This feature sits directly on top of the localization foundation created earlier, so it had to behave correctly in RTL from day one.

Retrofitting RTL after a screen is already built is always more expensive.

### Why this matters

The home screen is one of the most visible surfaces in the app.
If RTL behavior is weak there, the whole product feels less intentional.

This is especially true in Arabic-first apps because the home screen is the first thing users see.

### React vs React Native note

For a web engineer, this is similar in principle to using logical CSS properties and testing under `dir="rtl"`.

In React Native, the lesson is the same conceptually:
use start/end-safe thinking and test the real mobile screen in RTL instead of trusting assumptions.

---

## Step 11 — Verify loading, empty, and real content states

### What we did

We made sure the Home screen did not assume “mock data means happy path only.”

The implementation included support for:
- loading behavior
- empty-state behavior for sections with no enrolled courses
- conditional rendering for pending enrollments
- normal populated-state rendering for the main content sections

### Why we did it

The feature requirements explicitly said to include empty/loading-friendly structure if needed, even though mock data loads quickly.

That was an important instruction because fast local mock data can trick a project into ignoring real app-state discipline.

### Why this matters

This step protects the feature from future backend pain.

When the screen eventually moves from mock data to a real backend, it will already know how to handle:
- waiting
- no data
- partial data

That is a much better outcome than rewriting the whole screen later.

### Engineering note

This is one of the strongest habits a frontend engineer can build:
treat temporary data sources as a rehearsal for real application states.

---

## Step 12 — Verify the feature locally in Arabic first, then English

### What we did

After implementation, we verified the feature locally with these checks:

1. the app opens and lands on the student home screen
2. the home screen appears in Arabic by default
3. mock-data-driven content is visible on the home screen
4. enrolled / continue-learning content renders correctly
5. pending enrollment content renders correctly when present
6. featured-course cards render correctly
7. tapping a course opens the existing Course Detail flow
8. the browse CTA reaches the existing student browse flow
9. the visual styling matches the shared design foundation
10. RTL layout still looks correct in Arabic
11. switching to English still renders the same screen cleanly
12. the screen still behaves correctly after the language switch

### Why we did it

This converted the feature from implementation work into a real completion check.

A home screen feature is not complete when:
- the file exists
- the JSX compiles
- the mock functions return data

It is complete when the screen behaves like a real app entry point in both supported languages.

### Why this matters

This step is especially important for Arabic-first apps because a feature can “work” technically while still failing product expectations through:
- hardcoded leftover strings
- weak RTL layout
- poor spacing balance
- navigation gaps
- inconsistent reuse of design primitives

Testing both Arabic and English is what proves the feature is truly integrated.

---

## Problems encountered

### Problem 1 — The app already had a student browse entry, but not a real student home entry

The student flow was already functional, which can create the illusion that a home screen is just another screen file.

But this feature required the home screen to become the **actual landing point**, not just an additional route.

### Why this mattered

That meant navigation structure had to change slightly, not only UI rendering.

Without that structural change, the feature would have been visibly incomplete.

---

### Problem 2 — The mock data layer was strong, but not yet shaped exactly for home-screen use

Feature 07 already gave the project a much cleaner mock data foundation.

However, a home screen often needs “overview-friendly” queries, not only raw entity relationships.

For example:
- enrolled course IDs are useful
- but the Home screen usually needs enrolled **course cards**
- course arrays exist
- but the Home screen needs a small “featured” slice with a stable query helper

### Why this mattered

If the screen started doing too much shaping locally, it would weaken the architecture that Feature 07 was meant to establish.

---

### Problem 3 — It was easy to let the home screen grow too large

A home/dashboard feature naturally invites extra ideas such as:
- profile summary
- notifications
- learning streaks
- payment reminders
- teacher recommendations
- recent watches
- account widgets

### Why this mattered

The feature had a strict scope rule:
build only the student home screen and the minimal supporting pieces required for it to work.

So the main challenge was not adding enough.
It was resisting the temptation to add too much.

---

### Problem 4 — Arabic-first requirements apply hardest on app-entry screens

A home screen contains many short labels, blocks, CTA text, and directional layouts.

That makes it one of the easiest places for localization discipline to break through:
- hardcoded strings
- LTR-biased spacing
- weak English fallback handling
- sections that look balanced in one language but awkward in another

### Why this mattered

Because the Home screen is such a visible surface, any Arabic-first mistake there would immediately reduce product quality.

---

## How those problems were solved

### Solution 1 — Treat navigation structure as part of the feature, not a separate task

We solved the “home exists but is not the landing screen” problem by making the student route structure responsible for the correct entry behavior.

That kept the feature honest:
the screen is now part of the real student app flow, not just a detached route.

---

### Solution 2 — Add only the smallest missing home helpers to the mock layer

Instead of moving data-shaping logic into the screen, we added only the small missing query helpers the home screen truly needed.

That preserved the architecture from Feature 07 while avoiding overengineering.

---

### Solution 3 — Keep the screen intentionally small and useful

We solved the scope-creep risk by limiting the screen to a few high-value blocks:
- greeting
- continue learning / enrolled courses
- pending enrollments
- featured courses
- browse CTA

That gave the app a useful home screen without turning the feature into a full dashboard system.

---

### Solution 4 — Apply the Arabic-first rules from the first line of JSX

Instead of building the screen in English and translating later, we treated Arabic-first behavior as a first-order implementation rule:
- translation keys from the beginning
- RTL-safe layout from the beginning
- Arabic testing first
- English verification second

That prevented later cleanup work.

---

## React vs React Native lessons from this feature

## Lesson 1 — A home screen is more than a screen component

A web engineer may initially think of a home screen as “just a new page.”

In a mobile app, it is usually more than that.
It often defines:
- app entry behavior
- top-level navigation expectations
- future tab structure
- the user’s first impression after app open

So it has more architectural weight than a normal inner screen.

## Lesson 2 — Dashboard-style screens need stronger scope control on mobile

On the web, dashboards often grow quickly because larger layouts can absorb more widgets.

On mobile, adding too many blocks too early usually hurts:
- clarity
- scanability
- touch flow
- layout consistency

This feature reinforced a good mobile rule:
**a smaller useful home screen is better than a crowded ambitious one**.

## Lesson 3 — Mock data architecture matters even for “simple” overview screens

A home screen may look simple visually, but it often depends on combined data:
- user state
- enrolled content
- pending actions
- recommendations

That means overview screens can easily become architecture-breaking if they start shaping too much data locally.

This feature showed why a small mock query layer is still important even when the UI seems straightforward.

## Lesson 4 — Localization discipline becomes more visible on summary screens

Listing screens often repeat one component pattern many times.

Home screens usually combine many different small UI blocks.
That makes them a stronger test of localization discipline:
- more labels
- more headings
- more CTA copy
- more RTL-sensitive rows

So if the localization foundation is weak, a home screen exposes that very quickly.

## Lesson 5 — Shared UI foundations prove their value when new product surfaces arrive

Feature 06 created the shared design layer.

Feature 08 was one of the first good tests of whether that layer actually helps with a new, more product-facing screen.

Because the Home screen could be built from the shared primitives cleanly, the earlier design-system work proved useful rather than theoretical.

---

## Discussion notes

### Why was this feature important even before backend integration?

Because the student home screen is part of product structure, not just backend structure.

Even with mock data, the app still needs to answer:
what is the student supposed to see first?

That question exists before real APIs exist.

### Why not wait until auth and real user profiles exist?

Because waiting would delay an important navigation and product-design decision.

The home screen’s job at this stage is not to be fully personalized.
Its job is to establish:
- the student entry point
- the main information hierarchy
- the navigation relationship between overview and deeper flows

Those decisions are worth making early.

### Why not add more dashboard widgets now?

Because the project is still in a focused mobile build phase.

The feature required a useful home screen, not a complete student operating system.
Keeping the scope small made the implementation cleaner and more durable.

### What is the main React Native lesson here?

A strong mobile home screen should be:
- clear
- fast to scan
- connected to the rest of the app
- safe for localization
- built on reusable UI primitives
- backed by a clean data boundary

That is more valuable than making it visually busy.

---

## Final output of Feature 08

At the end of this feature, the project had:
- a dedicated Student Home Screen
- a student app entry point that feels like a real landing screen
- mock-data-driven home content
- small home-specific query helpers inside the mock data layer
- Arabic-first home-screen text through translation keys
- English support still working as a secondary language
- navigation entry points from Home into the existing student flows
- reuse of the shared design foundation from Feature 06
- loading-friendly and empty-friendly screen structure
- RTL-safe implementation habits preserved
- a stronger student app shell ready for future backend replacement

---

## Completion checklist for Feature 08

Feature 08 is complete when all of these are true:

- the app opens and lands on the student home screen
- the student home screen exists as the proper student entry point
- Arabic is the default visible language on the home screen
- English still works after switching language
- all visible home-screen text comes from translation keys
- no new hardcoded visible strings were introduced
- the home screen reads data from the mock data layer
- no large home-specific mock arrays were embedded directly in the screen
- home-specific helper/query functions were added to the mock data layer only where needed
- the screen shows a greeting / top section
- the screen shows enrolled / continue-learning content
- the screen shows pending-enrollment content where relevant
- the screen shows featured or recommended course content
- the screen provides navigation into the existing student flows
- the UI reuses the shared design foundation from Feature 06
- the layout remains RTL-safe in Arabic
- the same screen still works visually in English
- the feature stayed inside the mock-data-first phase
- no Supabase, Clerk, or unrelated teacher/profile work was introduced

---

## Exact commands used

```bash
touch "app/(student)/_layout.tsx"
touch "app/(student)/home.tsx"
```

Update the mock data layer and translation files:
```bash
code lib/mock-data/student.ts
code lib/i18n/ar.ts
code lib/i18n/en.ts
code "app/(student)/_layout.tsx"
code "app/(student)/home.tsx"
```

Run the app after implementation:
```bash
npx expo start --clear
```

Optional TypeScript verification:
```bash
npx tsc --noEmit
```

Optional quick sanity checks for visible hardcoded strings in the new feature files:
```bash
grep -R "Welcome\\|Continue\\|Featured\\|Browse Courses" app lib/i18n
```

---

## Official references

These were the most relevant official references for this feature:

- Expo Router tabs guide: [https://docs.expo.dev/router/advanced/tabs/](https://docs.expo.dev/router/advanced/tabs/)
- Expo Router navigation guide: [https://docs.expo.dev/router/navigating-pages/](https://docs.expo.dev/router/navigating-pages/)
- React Native `ScrollView` docs: [https://reactnative.dev/docs/scrollview](https://reactnative.dev/docs/scrollview)

One important caution to remember for future work:

a mobile home screen can attract too many ideas too early.
For this phase, the correct implementation is the smallest useful student landing screen built on mock data and shared UI foundations, not a full dashboard platform.


-----

```md
# Feature 09 — Build Subject/Course Browsing Screens

## What this feature does

Feature 09 takes the already-working student browse flow and turns it into a more polished, cohesive browsing experience that fits naturally after the new student home screen.

The final browsing path now behaves like a real student discovery flow:

- Student Home
- Academic Year selection
- Subject selection
- Course list
- Course detail
- Watch placeholder

This feature did **not** introduce backend work, teacher flows, payment logic, or any real data integration. It stayed fully inside the mock-data-first phase and focused on improving the student browsing experience using the current route structure, shared UI layer, and mock data layer.

The key result of this feature is that the browse flow no longer feels like a set of separate working screens. It now feels like one connected product path.

## Why this feature matters

A browse flow is one of the core paths in an education app. A student needs to understand where they are, move deeper into the hierarchy confidently, and reach course detail screens without confusion.

For EduStream, that means the student should be able to move cleanly from:

- academic year
- to subject
- to course
- to course detail

If that path feels weak at any level, the whole app feels less intentional.

This feature also mattered because the repo instructions explicitly said that the **current numbering and order in `mobile-progress-tracker.md` is the source of truth**. That was important because earlier feature numbering had shifted after the insertion of the Arabic-first localization feature. So this implementation had to follow the tracker exactly and be documented as **Feature 09**.

For a React / Next.js engineer, this feature is a good reminder that route existence is not the same as route quality. On the web, a page can exist but still feel unfinished if it lacks hierarchy context, good titles, or smooth navigation. In Expo Router, the same is true, but native headers, route nesting, back behavior, and safe-area layout all make the quality of that route flow more visible.

## Original implementation plan

The practical implementation plan for Feature 09 became:

1. Re-read the repo documents before changing anything.
2. Inspect the current student browse flow and route structure.
3. Verify what the mock data layer already provides.
4. Refine the Academic Years, Subjects, and Courses screens only as much as needed to make the browsing flow feel complete.
5. Keep all visible UI text inside translation files.
6. Reuse the shared design foundations from Feature 06.
7. Verify Arabic first, then English.
8. Fix any nested navigation/header issues discovered during polish.
9. Keep the work fully mock-data-first.

The feature sounded simple at first, but in practice it became a combination of:

- browse screen polish
- nested navigation cleanup
- mobile-specific layout correction

That is why the implementation included both UI refinement and navigation-architecture work.

## Step 1 — Re-read the repo documents before implementation

Before touching code, we re-read:

- `mobile-project-overview.md`
- `mobile-architecture.md`
- `mobile-code-standards.md`
- `mobile-ui-context.md`
- `mobile-build-plan.md`
- `mobile-progress-tracker.md`
- `mobile-ai-workflow-rules.md`

This was important for the same reason it mattered in earlier features: the repo documents are the real implementation contract, not earlier chat memory.

This step re-confirmed four active constraints:

- the app is still mock-data-first
- Arabic is the default language
- English is secondary
- all visible text must use translation keys

That meant this feature could not expand into Supabase, Clerk, hardcoded strings, or English-first layout assumptions.

## Step 2 — Inspect the current browse flow and identify what already exists

We inspected the browse routes under:

- `app/(student)/browse/index.tsx`
- `app/(student)/browse/[yearId]/index.tsx`
- `app/(student)/browse/[yearId]/[subjectId]/index.tsx`

We also inspected the surrounding route structure:

- `app/(student)/_layout.tsx`
- `app/(student)/browse/_layout.tsx`
- `app/student-course/[courseId].tsx`
- `app/student-watch/[lessonId].tsx`

This inspection showed that the flow already worked at a basic level:

- browse opened
- a year could open subjects
- a subject could open courses
- a course could open course detail

But several quality issues were still present:

- one empty state still used a placeholder translation key
- browse screens needed stronger contextual titles
- one course-list spacing class was not RTL-safe
- the nested header structure was leaking `(student)` into the visible UI
- after header cleanup, the student home greeting could render under the device notch

So this feature was not a greenfield build. It was a polish-and-cohesion feature for a partially complete flow.

## Step 3 — Verify the mock data layer before changing screen logic

We inspected the mock data layer, especially:

- `lib/mock-data/student.ts`
- `lib/mock-data/shared.ts`

The important finding was that the data layer was already strong enough for this feature. It already had:

- `getAcademicYears()`
- `getSubjectsByYear()`
- `getCoursesBySubject()`
- `getYearById()`
- `getSubjectById()`

That mattered because the repo instructions explicitly said that if browse screens needed helper/query logic, that logic should live in the mock data layer rather than inside screen files.

In this case, the necessary lookup helpers already existed. So the correct decision was **not** to invent extra abstractions or move data shaping into screen components.

For a React / Next.js engineer, this is a useful architectural lesson: sometimes the right refactor is not adding a new helper but recognizing that the clean helper already exists and should simply be reused.

## Step 4 — Fix the broken empty state and complete localization coverage

One of the first real bugs we found was that the subjects screen still used a placeholder translation key instead of a real empty-state message.

That meant the UI could show a raw key-like fallback instead of a proper localized message. We replaced it with the correct localized key and also added the missing browse-related translation keys needed for a stronger browsing flow.

The relevant translation files remained:

- `lib/i18n/ar.ts`
- `lib/i18n/en.ts`

We added browse-specific keys such as:

- academic year selection prompt
- subject selection prompt
- subject-specific course list context

This step mattered because Feature 04 made localization a permanent implementation rule. Once the localization foundation existed, every later feature had to keep participating in it.

This is a good example of how a “small UI polish feature” still includes real i18n work.

## Step 5 — Improve screen titles and browsing context

We improved the browse screens by making their titles reflect the current level of the hierarchy more clearly.

The title behavior became:

- browse root → academic years title
- year screen → selected year name
- subject screen → selected subject name

We also added short context labels inside the list content so the user does not rely only on the native header for orientation.

This mattered because browsing is hierarchical. A student who taps into a year and then into a subject should immediately understand where they are.

On the web, larger layouts, breadcrumbs, sidebars, or the browser URL can help communicate hierarchy. On mobile, the screen header often carries much more of that responsibility. So getting header titles right is part of navigation UX, not just visual polish.

## Step 6 — Keep the course list RTL-safe and reuse the shared design system

We reviewed the course list screen and found one directional spacing issue: a class using hardcoded right-side spacing instead of logical end-side spacing.

That was changed to an RTL-safe form so the UI behaves correctly in Arabic.

We also kept the browse screens aligned with the shared UI foundation from Feature 06 by continuing to use shared primitives such as:

- `AppText`
- `Card`
- `EmptyState`
- `LoadingScreen`
- spacing tokens from `constants/design.ts`

This step mattered because Feature 09 explicitly required reuse of the shared design layer. That was not just about visual consistency. It also prevented the project from drifting back into duplicated one-off screen styling after Feature 06 had already extracted the common UI layer.

For a web engineer, this is the same discipline as continuing to build new pages from a design system instead of letting repeated ad hoc utility markup creep back in.

## Step 7 — Make the browsing flow feel connected from the Home screen

Feature 08 had already introduced the student home screen. Feature 09 had to make sure the student could move from Home into Browse as one intentional product path.

The target path became:

1. Open student home
2. Tap browse CTA
3. Open academic years
4. Tap a year
5. Open subjects
6. Tap a subject
7. Open courses
8. Tap a course
9. Open course detail

This is a small step in raw code, but a major step in product coherence. The home screen is no longer just an overview surface. It now properly hands the student into the discovery flow.

A screen does not become strong just because it exists. It becomes strong when it participates correctly in the app’s real task flow.

## Step 8 — Fix the leaked nested header problem in Expo Router

This became one of the most important practical issues in the feature.

After the browse polish work, the app still showed an unexpected `(student)` label above the expected screen titles such as:

- `السنوات الدراسية`
- `الصف العاشر`
- `الرياضيات`

At first glance, it was easy to wonder if this was coming from Expo Go itself. It was not. It came from the app’s own nested navigator structure.

The project had:

- a root `Stack`
- a nested student `Tabs` layout
- a nested browse `Stack`

Because multiple navigators can render their own headers, the parent navigator was still contributing an unwanted header layer. The visible `(student)` label was effectively a leaked route-group-level header rather than a desired screen title.

The fix was architectural:

- hide the parent/root header when a nested child navigator should own the visible header
- keep the browse stack as the title-owning navigator
- let child screens control header text through `title` options instead of fallback route names

This is one of the clearest Expo Router lessons in the feature: in nested navigation, a “header bug” is usually really a **navigator ownership** bug.

## Step 9 — Clarify the difference between route name, visible title, and header ownership

While fixing the header problem, we also clarified an important navigation concept worth preserving for future sessions.

Three different things were involved:

1. `name`
2. `headerShown`
3. `title` / `headerTitle`

The useful mental model is:

- `name` = which route file this configuration belongs to
- `headerShown` = whether that navigator level should render a visible header
- `title` = what text the user should actually see in that header

That means `name="index"` does **not** mean the user should see `index` in the UI. It only identifies the route being configured. If no `title` is provided, Expo Router / React Navigation may fall back to a route-derived label.

This mattered because later features will likely add more nested route structures. Understanding the difference between route identity and visible title will help prevent the same bug from returning.

## Step 10 — Fix the safe-area issue after removing the header

Once the leaked parent header was removed, another mobile-specific issue became visible: the home greeting content could slide under the device notch / camera area.

This happened because the old visible header had been indirectly creating top spacing. Once that header disappeared, the `ScrollView` content started at the true top edge of the screen.

The project already had a shared wrapper in `components/ui/ScreenContainer.tsx` using `SafeAreaView` from `react-native-safe-area-context`, so the correct fix was not to add arbitrary manual top padding. The correct fix was to reuse the existing safe-area-aware wrapper for headerless screens.

This is a very mobile-specific lesson. On the web, removing a header usually changes spacing only visually. On mobile, removing a header can move content into a physically unsafe display area unless a safe-area-aware wrapper takes over that responsibility.

## Problems encountered

### 1. The browse flow already existed, but still felt unfinished

The first problem was not a crash or type failure. It was a product-quality problem.

The route flow technically worked, but it still felt more like an internal implementation path than a polished student browsing experience.

That is easy to underestimate in mobile work. A route tree can be functionally correct while still feeling weak because hierarchy, screen titles, and navigation ownership are not fully refined.

### 2. One empty state still used a placeholder translation key

This was a small bug, but an important one. It showed that localization discipline had been applied in most places, but not completely.

In an Arabic-first app, even one leftover placeholder key is enough to show that the feature is not fully integrated into the localization system.

### 3. Nested Expo Router headers leaked route-group UI into the visible screen

This was the most confusing bug because it looked like the UI might be showing something from Expo Go.

In reality, it came from our own nested navigation structure. The app had more than one navigator capable of rendering a header, and the wrong one was still visible.

### 4. Safe-area spacing became a visible issue only after fixing the header problem

This is a useful mobile engineering lesson. Once the extra header disappeared, the screen finally revealed its true top position, which exposed that the home greeting was too close to or under the notch area.

That is a good reminder that solving one layout/navigation issue can reveal the next real problem underneath it.

## How those problems were solved

### 1. Treat the feature as a refinement feature, not a greenfield build

Instead of pretending Feature 09 was building the browse flow from zero, we treated it as what it really was: a refinement and cohesion feature for a flow that already partially existed.

That made the right success criteria much clearer:

- better titles
- better localization completeness
- stronger hierarchy context
- cleaner header ownership
- safer top-level layout behavior

### 2. Fix localization directly instead of working around it

We replaced the broken empty-state key with the correct localized key and added the missing browse-related translation keys in both Arabic and English.

That kept the implementation aligned with the standing project rule that all visible text must live in translation files.

### 3. Keep mock data logic in the mock data layer

We did not move lookup logic into screen files. Instead, we reused the existing helper functions from `lib/mock-data/shared.ts` and `lib/mock-data/student.ts`.

That preserved the architecture rule that data shaping belongs in the mock layer, not in route components.

### 4. Make the nested child navigator own the visible header

We solved the leaked `(student)` header by hiding the parent/root header and letting the nested browse stack own the visible title bar.

Then the child screens could control the visible title correctly through `title` options instead of relying on route-name fallbacks.

### 5. Use the shared safe-area wrapper where the screen becomes headerless

Once the home screen no longer had a visible top header, we reused the existing `ScreenContainer` wrapper so the content stayed inside the device-safe region.

That was a better solution than inventing manual top padding because it uses the correct device insets rather than guessed spacing.

## React vs React Native lessons from this feature

### 1. A working route tree is not the same as a good mobile flow

In React / Next.js, it is possible for a page to technically work while still feeling rough because of breadcrumbs, headings, or poor route transitions.

In React Native, the same is true, but the cost of roughness is higher because there is less screen space and the screen title/header region carries more of the navigation burden.

### 2. Header ownership matters much more in nested mobile navigation

On the web, duplicate layout UI often appears as redundant page chrome.

In Expo Router with nested stacks and tabs, the same mistake appears as duplicate or leaked native headers. That feels more intrusive and more confusing to the user.

### 3. Safe-area handling is part of layout architecture

In web React, removing a page header usually changes spacing visually.

In mobile React Native, hiding a header can move content into the notch/camera region. That means safe-area handling is not optional polish. It is part of correct screen architecture.

### 4. Localization discipline remains active in “small polish” work

This feature was not a localization feature, but localization still mattered in multiple places:

- screen titles
- prompts
- empty states
- browsing labels

That is a useful reminder that once i18n exists, every feature participates in it.

### 5. Shared UI primitives only prove their value when later features actually reuse them

Feature 06 created a shared UI layer. Feature 09 helped prove that the layer is strong enough to support real subsequent screen work without reintroducing duplicated card, text, empty-state, or loading patterns.

## Discussion notes

Feature 09 is a good example of a feature that looks small on the surface but teaches several important mobile engineering lessons.

At first, it appears to be just “improve browse screens.” But in practice it required reasoning about:

- route hierarchy
- title ownership
- mock-layer reuse
- RTL safety
- i18n completeness
- mobile safe-area behavior

That combination is why this feature is more valuable than it may first appear.

It also demonstrates a pattern that will matter later in the project:

- build the route
- make the route usable
- make the route coherent
- then fix the navigation-shell details that only become visible once the route is truly used

That sequence is common in mobile apps, where product flow quality emerges over several iterations rather than one giant implementation step.

## Final output of Feature 09

At the end of this feature, the project has:

- a student home screen that routes cleanly into browse
- a browse root screen for academic years
- a subject screen for the selected academic year
- a course list screen for the selected subject
- cleaner nested stack titles
- corrected localized empty-state behavior
- RTL-safe spacing in the course list
- a fixed root/header ownership structure so route-group labels do not leak into the visible UI
- safe-area protection on headerless screens where needed
- the same flow still working in Arabic first, then English

The browsing experience now feels like one connected student journey instead of several separately working route files.

## Completion checklist for Feature 09

Feature 09 is complete when all of these are true:

- The app opens to the student home screen.
- The student can tap into the browse flow from Home.
- The browse root screen shows academic years correctly.
- Tapping an academic year opens the correct subject list.
- Tapping a subject opens the correct course list.
- Tapping a course opens the course detail screen.
- All visible browsing UI text comes from translation files.
- Arabic is the default visible experience.
- English still works for the same flow.
- RTL layout remains safe in the browse path.
- Mock data is still loaded through the mock data layer rather than embedded directly in screens.
- Shared UI primitives are reused instead of one-off duplicated screen markup.
- Route-group labels such as `(student)` no longer leak into the visible UI header.
- Headerless screens use safe-area-aware layout protection where needed.
- `npx tsc --noEmit` passes.
- `npx expo start --clear` starts without new errors.

## Official references

- Expo Router Stack docs: https://docs.expo.dev/router/advanced/stack/
- Expo Router common navigation patterns: https://docs.expo.dev/router/basics/common-navigation-patterns/
- React Navigation safe area guidance: https://reactnavigation.org/docs/handling-safe-area/
- Expo `react-native-safe-area-context` docs: https://docs.expo.dev/versions/latest/sdk/safe-area-context/
- `react-native-safe-area-context` SafeAreaView API: https://appandflow.github.io/react-native-safe-area-context/api/safe-area-view/
```


-----
md

# Feature 10 Build Course Detail and Lessons Screens

## What this feature does

Feature 10 takes the already-existing course detail and watch flow and refines it into a more complete student experience during the mock-data-first phase. The feature focuses only on the student course detail, lesson list, preview access, locked lesson behavior, and watch-entry flow. It does not add any backend integration, teacher functionality, payment flow, or real video playback yet. [file:20]

The final result is a polished student path where the user can:
- open a course from the browse flow
- see a stronger course detail screen
- understand which lessons are previewable and which are locked
- tap a preview lesson and enter the watch placeholder
- tap a locked lesson and get blocked through mock-only logic
- view the flow in Arabic first, then confirm it still works in English [file:20]

This feature also continues the project rules introduced earlier:
- Arabic is the default experience
- all visible text must come from translation files
- RTL safety must be preserved
- shared design primitives must be reused
- data must come from the mock data layer, not hardcoded screen arrays [file:20]

---

## Why this feature matters

A course card in a browse list is only useful if the student can continue into a believable learning flow. In EduStream, that means the student must be able to move from:
- Home
- Browse
- Academic Year
- Subject
- Course List
- Course Detail
- Lesson interaction
- Watch placeholder [file:20]

Before this feature refinement, the project already had a basic course detail screen and a basic watch placeholder from the earlier course-detail feature. But the flow still needed product polish:
- enrollment state was not clearly shown
- the enroll button had no visible mock feedback
- the watch screen only showed a raw lesson ID
- the course detail screen needed stronger summary structure
- the flow needed to feel more intentional as a student learning path [file:20]

For a React and Next.js engineer, this is an important mobile lesson. A screen can already exist and still not feel product-ready. In mobile work, polishing a route often means improving:
- hierarchy
- metadata visibility
- navigation confidence
- state feedback
- blocked behavior
- screen-to-screen continuity [file:20]

---

## Original implementation plan

Before changing anything, we followed the repo instruction to re-read the current source-of-truth documents and use the tracker numbering exactly as written. The working implementation plan for Feature 10 became:

1. Re-read the repo docs and current tracker order.
2. Inspect the existing course detail and watch flow already in the repo.
3. Keep the work mock-data-first only.
4. Add any missing helper logic to the mock data layer instead of screen files.
5. Refine the course detail screen with clearer metadata and enrollment-state handling.
6. Refine the lesson list so preview vs locked behavior feels clear.
7. Refine the watch screen so it loads lesson metadata instead of showing only a raw ID.
8. Keep all visible UI text inside translation files.
9. Re-check Arabic first, then English.
10. Confirm TypeScript and Expo still run cleanly. [file:20]

This feature looked small on paper, but in practice it required coordinated work across:
- route screens
- root stack behavior
- translation files
- mock data helpers
- design-system reuse
- mobile interaction feedback [file:20]

---

## Step 1 Re-read the repo documents before implementation

### What we did

Before making changes, we re-read:
- `mobile-project-overview.md`
- `mobile-architecture.md`
- `mobile-code-standards.md`
- `mobile-ui-context.md`
- `mobile-build-plan.md`
- `mobile-progress-tracker.md`
- `mobile-ai-workflow-rules.md` [file:20]

We also treated the current `mobile-progress-tracker.md` numbering as the only source of truth, which meant this work had to be documented and implemented as **Feature 10**, not using any older numbering memory. [file:20]

### Why we did it

This prevented two common mistakes:
1. implementing the right UI work under the wrong feature number
2. accidentally drifting outside the current phase into backend or unrelated app areas [file:20]

Because the project had already inserted the Arabic-first localization feature earlier in the roadmap, relying on old numbering would have created documentation drift again. Re-reading the tracker protected both implementation accuracy and repo history consistency. [file:20]

### Engineering note

This step also re-confirmed the current non-negotiable rules:
- Arabic-first
- translation keys only for visible text
- mock-data-first
- no Supabase
- no Clerk
- no real backend logic yet
- shared design primitives must be reused [file:20]

---

## Step 2 Inspect the existing course detail and watch flow before changing it

### What we did

We reviewed the existing student flow files:
- `app/student-course/[courseId].tsx`
- `app/student-watch/[lessonId].tsx`
- `lib/mock-data/student.ts`
- `lib/i18n/ar.ts`
- `lib/i18n/en.ts`
- `app/_layout.tsx` [file:20]

The important finding was that the app already had:
- a real course detail screen
- a real lesson list
- preview vs locked visual behavior
- preview navigation into watch
- a basic watch placeholder route
- lesson retrieval helpers already present in the mock data layer [file:20]

### Why we did it

This feature was not a greenfield build. It was a refinement feature. That matters, because the right question was not “how do we build course detail from zero?” but rather “what is still missing for this to feel complete and polished?” [file:20]

That change in mindset helped keep the scope correct. Instead of rebuilding the flow, we refined the weakest pieces:
- enrollment-state visibility
- better watch-screen metadata
- more useful blocked behavior
- stronger screen structure and UX feedback [file:20]

### Engineering note

For a web engineer, this is similar to reviewing an existing page flow before deciding whether the next step is:
- new architecture
- component extraction
- or just better product-level polish

In this case, the route flow already existed, so the right move was targeted refinement rather than structural replacement. [file:20]

---

## Step 3 Keep the feature fully inside the mock-data-first phase

### What we did

We kept the entire feature inside the existing mock layer and did not add:
- Supabase queries
- Clerk auth checks
- real enrollment mutation logic
- real media playback
- remote thumbnail loading [file:20]

Instead, we used the existing mock helpers and added only one small missing query-style helper for enrollment status inside:
- `lib/mock-data/student.ts` [file:20]

### Why we did it

The project instruction for this phase is very clear: data should remain mock-driven, and if a screen needs helper logic, that logic should live in the mock data layer rather than inside the screen component. [file:20]

This is a healthy architecture habit. It prevents screen files from becoming mini data layers with embedded business rules. It also keeps the future backend swap easier, because UI code depends on imported query helpers rather than local ad hoc logic. [file:20]

### React vs React Native note

A React or Next.js engineer may be tempted to keep “small temporary logic” inside a screen component. That often feels harmless in short-lived web prototypes. In a mobile codebase with multiple nested flows, that habit becomes expensive faster because:
- screens often stay around longer
- route files are user-facing boundaries
- repeated data decisions spread quickly across screens [file:20]

---

## Step 4 Add the missing enrollment-status helper to the mock data layer

### What we did

We added a small helper to `lib/mock-data/student.ts` so the course detail screen could ask for the current student’s mock enrollment status in a single clean call.

### Exact code we added

```ts
export type EnrollmentStatus = "confirmed" | "pending" | "none";

/**
 * Returns the enrollment status for the current mock student on a given course.
 * Maps to what will eventually be an RLS-protected Supabase query.
 */
export async function getEnrollmentStatus(
  courseId: string
): Promise<EnrollmentStatus> {
  const enrollment = await getMyEnrollmentForCourse(courseId);
  if (!enrollment) return "none";
  return enrollment.status === "confirmed" ? "confirmed" : "pending";
}
```

### Why we did it

The course detail screen needed to know whether the current student is:
- already enrolled
- pending review
- not enrolled [file:20]

That is exactly the kind of query-shaped logic that belongs in the mock data layer. It keeps the screen simpler and closer to the future real-backend shape. [file:20]

### Why this matters

This is the same architectural instinct you would use in a web app when deciding not to bury API result interpretation inside a page component. Even during the mock-data phase, the shape of the data boundary matters. [file:20]

---

## Step 5 Add the missing translation keys before finalizing the UI

### What we did

We added the new visible strings needed for Feature 10 to both translation files:
- `lib/i18n/ar.ts`
- `lib/i18n/en.ts` [file:20]

These keys covered:
- enrollment status badges
- enroll-button success Alert copy
- locked-lesson Alert copy
- watch-screen metadata labels [file:20]

### Exact Arabic code we added

```ts
course_lessons_count: "عدد الحصص",
course_enrolled_badge: "مسجّل",
course_pending_badge: "قيد المراجعة",
course_not_enrolled: "غير مسجّل",
enroll_success_title: "طلب التسجيل",
enroll_success_msg: "تم إرسال طلبك بنجاح. سيتم مراجعته من قِبَل المعلم.",
locked_alert_title: "الدرس مقفل",
locked_alert_msg: "هذا الدرس يتطلب الاشتراك في الدورة. اضغط «طلب التسجيل» لإرسال طلبك.",
watch_lesson_label: "الحصة",
watch_lesson_order: "الترتيب",
watch_placeholder_note: "سيكون مشغّل الفيديو متاحاً هنا.",
```

### Exact English code we added

```ts
course_lessons_count: "Lessons",
course_enrolled_badge: "Enrolled",
course_pending_badge: "Pending Review",
course_not_enrolled: "Not Enrolled",
enroll_success_title: "Enrollment Request",
enroll_success_msg: "Your request has been sent successfully. The teacher will review it.",
locked_alert_title: "Lesson Locked",
locked_alert_msg: "This lesson requires course enrollment. Tap 'Request Enrollment' to submit your request.",
watch_lesson_label: "Lesson",
watch_lesson_order: "Order",
watch_placeholder_note: "Video player will be available here.",
```

### Why we did it

Feature 04 made localization a permanent implementation rule. That means no matter how small a feature seems, visible strings must enter the app through translation keys, not JSX literals. [file:20]

### Why this matters

This is especially important in mobile row and detail UIs because changing language affects:
- badge width
- row balance
- metadata wrapping
- screen density
- spacing pressure in RTL layouts [file:20]

So translation work is not only about language. It is also part of component design. [file:20]

---

## Step 6 Refine the course detail screen into a stronger student detail view

### What we did

We replaced the earlier course detail implementation with a more polished version in:
- `app/student-course/[courseId].tsx` [file:20]

The new screen still uses the same route and mock-driven data source, but it now adds:
- a thumbnail placeholder area
- enrollment-status badge support
- lesson count summary
- better enroll-button behavior
- clearer locked-lesson Alert messaging
- cleaner top-of-screen structure [file:20]

### Exact code we used

```tsx
import { useEffect, useState } from "react";
import { View, FlatList, TouchableOpacity, Alert } from "react-native";
import {
  AppText,
  Card,
  PrimaryButton,
  StatusBadge,
  LoadingScreen,
  EmptyState,
  ScreenContainer,
} from "../../components/ui";
import { Spacing } from "../../constants/design";
import { useLocalSearchParams, useRouter } from "expo-router";
import { t } from "../../lib/i18n";
import {
  getCourseDetail,
  getLessonsByCourse,
  getEnrollmentStatus,
  type EnrollmentStatus,
} from "../../lib/mock-data/student";
import type { CourseDetail, Lesson } from "../../lib/types";

function formatDuration(seconds: number | null): string {
  if (seconds === null) return "";
  const mins = Math.floor(seconds / 60);
  return `${mins} ${t("student.duration_minutes")}`;
}

function EnrollmentBadge({ status }: { status: EnrollmentStatus }) {
  if (status === "confirmed")
    return (
      <StatusBadge
        variant="confirmed"
        label={t("student.course_enrolled_badge")}
      />
    );
  if (status === "pending")
    return (
      <StatusBadge
        variant="pending"
        label={t("student.course_pending_badge")}
      />
    );
  return null;
}

function LessonRow({
  lesson,
  onPress,
}: {
  lesson: Lesson;
  onPress: (lesson: Lesson) => void;
}) {
  const isPreview = lesson.isPreview;

  return (
    <TouchableOpacity
      className={`mb-3 active:opacity-70 ${isPreview ? "" : "opacity-60"}`}
      onPress={() => onPress(lesson)}
      accessibilityRole="button"
      accessibilityLabel={lesson.title}
      accessibilityHint={
        isPreview
          ? t("student.lesson_preview_hint")
          : t("student.lesson_locked_hint")
      }
    >
      <Card className="flex-row items-center">
        <View
          className={`w-9 h-9 rounded-full items-center justify-center me-3 ${
            isPreview ? "bg-accent-light" : "bg-surface-secondary"
          }`}
        >
          <AppText className={isPreview ? "text-accent" : "text-locked"}>
            {isPreview ? "▶" : "🔒"}
          </AppText>
        </View>

        <View className="flex-1">
          <AppText variant={isPreview ? "body" : "muted"} numberOfLines={1}>
            {lesson.title}
          </AppText>
          {lesson.durationSeconds !== null && (
            <AppText variant="muted" className="mt-0.5">
              {formatDuration(lesson.durationSeconds)}
            </AppText>
          )}
        </View>

        <View className="ms-2">
          <StatusBadge
            variant={isPreview ? "preview" : "locked"}
            label={
              isPreview
                ? t("student.badge_free_preview")
                : t("student.badge_locked")
            }
          />
        </View>
      </Card>
    </TouchableOpacity>
  );
}

export default function CourseDetailScreen() {
  const { courseId } = useLocalSearchParams<{ courseId: string }>();
  const router = useRouter();

  const [course, setCourse] = useState<CourseDetail | null>(null);
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [enrollStatus, setEnrollStatus] = useState<EnrollmentStatus>("none");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      try {
        const [courseData, lessonData, status] = await Promise.all([
          getCourseDetail(courseId),
          getLessonsByCourse(courseId),
          getEnrollmentStatus(courseId),
        ]);
        if (!courseData) {
          setError(t("student.error_load_course"));
          return;
        }
        setCourse(courseData);
        setLessons(lessonData);
        setEnrollStatus(status);
      } catch (e) {
        setError(t("student.error_load_course"));
        console.error("[student-course/[courseId]] load failed", e);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [courseId]);

  function handleLessonPress(lesson: Lesson) {
    if (lesson.isPreview) {
      router.push({
        pathname: "/student-watch/[lessonId]",
        params: { lessonId: lesson.id },
      });
    } else {
      Alert.alert(
        t("student.locked_alert_title"),
        t("student.locked_alert_msg")
      );
    }
  }

  function handleEnrollPress() {
    if (enrollStatus === "none") {
      Alert.alert(
        t("student.enroll_success_title"),
        t("student.enroll_success_msg")
      );
    }
  }

  if (loading) return <LoadingScreen />;
  if (error || !course)
    return <EmptyState message={error ?? t("student.error_load_course")} />;

  return (
    <ScreenContainer>
      <View className="flex-1 bg-background">
        <FlatList
          data={lessons}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ padding: Spacing.base }}
          ListHeaderComponent={
            <View className="mb-6">
              <View className="w-full h-44 rounded-2xl bg-surface-secondary items-center justify-center mb-4">
                <AppText className="text-4xl">🎓</AppText>
              </View>

              <View className="flex-row items-start justify-between mb-1">
                <AppText variant="sectionTitle" className="flex-1 me-2">
                  {course.title}
                </AppText>
                <EnrollmentBadge status={enrollStatus} />
              </View>

              <AppText variant="muted" className="mb-3">
                {t("student.by_teacher")}: {course.teacherName}
              </AppText>

              <AppText variant="secondary" className="mb-4 leading-5">
                {course.description}
              </AppText>

              <AppText variant="muted" className="mb-4">
                {lessons.length} {t("student.course_lessons_count")}
              </AppText>

              <View className="flex-row items-center justify-between mb-5">
                <AppText variant="price">
                  {course.price.toLocaleString("ar-SA")}{" "}
                  {t("student.price_suffix")}
                </AppText>
                {enrollStatus === "none" && (
                  <PrimaryButton
                    label={t("student.enroll_button")}
                    onPress={handleEnrollPress}
                  />
                )}
              </View>

              <AppText variant="sectionTitle" className="mb-3">
                {t("student.lessons_header")}
              </AppText>
            </View>
          }
          ListEmptyComponent={<EmptyState message={t("student.no_lessons")} />}
          renderItem={({ item }) => (
            <LessonRow lesson={item} onPress={handleLessonPress} />
          )}
        />
      </View>
    </ScreenContainer>
  );
}
```

### Why we did it

The earlier screen worked, but it still felt like a technical route rather than a polished learning detail screen. This refinement made the top of the screen communicate more clearly:
- what course this is
- who teaches it
- how many lessons it includes
- whether the student is already enrolled
- whether the enroll CTA should still be available [file:20]

### Why this matters

This is a common mobile pattern: list-level cards show summary data, but detail screens need to immediately answer the user’s next questions without making them hunt through the UI. [file:20]

---

## Step 7 Keep preview and locked lesson behavior clear and intentional

### What we did

Inside the course detail screen, we kept the lesson-row interaction split very explicit:

- preview lesson:
  - show play symbol
  - show preview badge
  - allow navigation

- locked lesson:
  - show lock symbol
  - show locked badge
  - reduce opacity
  - block navigation
  - show native Alert [file:20]

### Why we did it

This makes the content-access rule visible before the user taps, and still understandable after the tap. That combination matters:
- pre-tap clarity through icon, badge, and styling
- post-tap clarity through a blocked Alert message [file:20]

If the UI only blocks after tapping, the flow feels frustrating. If the UI only styles the item but gives no action feedback, the flow feels incomplete. Good mobile interaction design usually needs both. [file:20]

### React vs React Native note

In a web app, blocked access might often lead to:
- disabled buttons
- inline callouts
- modal upsells
- hover hints

In React Native, `Alert.alert(...)` is a very natural lightweight pattern for this stage because it gives immediate native feedback without expanding scope into a full custom modal system. [file:20]

---

## Step 8 Refine the watch screen so it uses lesson metadata instead of a raw ID

### What we did

We replaced the earlier watch placeholder in:
- `app/student-watch/[lessonId].tsx` [file:20]

The previous version displayed a basic placeholder and the raw lesson ID. The new version:
- loads lesson data from the mock data layer
- uses `AppText` instead of raw `Text`
- shows title, order, and duration
- adds a clearer video placeholder area
- keeps the screen as a deliberate placeholder for a future real player feature [file:20]

### Exact code we used

```tsx
import { useEffect, useState } from "react";
import { View, TouchableOpacity } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { t } from "../../lib/i18n";
import { getLessonById } from "../../lib/mock-data/student";
import { AppText, LoadingScreen, ScreenContainer } from "../../components/ui";
import type { Lesson } from "../../lib/types";

export default function WatchScreen() {
  const { lessonId } = useLocalSearchParams<{ lessonId: string }>();
  const router = useRouter();
  const [lesson, setLesson] = useState<Lesson | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const data = await getLessonById(lessonId);
      setLesson(data);
      setLoading(false);
    }
    load();
  }, [lessonId]);

  if (loading) return <LoadingScreen />;

  return (
    <ScreenContainer>
      <View className="flex-1 bg-background">
        <TouchableOpacity
          className="px-4 pt-4 pb-2 self-start"
          onPress={() => router.back()}
          accessibilityRole="button"
        >
          <AppText variant="muted" className="text-accent">
            ← {t("student.lessons_header")}
          </AppText>
        </TouchableOpacity>

        <View className="mx-4 h-52 rounded-2xl bg-surface-secondary items-center justify-center mb-6">
          <AppText className="text-5xl mb-2">▶</AppText>
          <AppText variant="muted">
            {t("student.watch_placeholder_note")}
          </AppText>
        </View>

        <View className="px-4">
          <AppText variant="sectionTitle" className="mb-1">
            {lesson?.title ?? t("student.watch_screen_title")}
          </AppText>

          {lesson && (
            <View className="flex-row items-center mt-2 gap-x-4">
              <AppText variant="muted">
                {t("student.watch_lesson_order")}: {lesson.orderIndex}
              </AppText>
              {lesson.durationSeconds !== null && (
                <AppText variant="muted">
                  {Math.floor(lesson.durationSeconds / 60)}{" "}
                  {t("student.duration_minutes")}
                </AppText>
              )}
            </View>
          )}

          <AppText variant="muted" className="mt-4">
            {t("student.watch_coming_soon")}
          </AppText>
        </View>
      </View>
    </ScreenContainer>
  );
}
```

### Why we did it

A watch screen that only shows a route param feels like a dev stub, not a user-facing screen. Loading lesson metadata immediately makes the route feel real, even before actual playback exists. [file:20]

### Why this matters

This is a useful mobile product habit: if a later feature will eventually fill a route with richer functionality, it is still worth making the placeholder route feel intentional now. That way:
- navigation is already proven
- route params are already proven
- data lookup is already proven
- future media work can focus only on playback concerns [file:20]

---

## Step 9 Update the root stack so course detail and watch feel like real pushed screens

### What we did

We updated `app/_layout.tsx` so the top-level dynamic routes for:
- `student-course/[courseId]`
- `student-watch/[lessonId]`

use visible native headers again. [file:20]

### Exact code we used

```tsx
import "../global.css";
import "../lib/i18n";
import { Stack } from "expo-router";
import { t } from "../lib/i18n";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="(student)" options={{ headerShown: false }} />
      <Stack.Screen
        name="student-course/[courseId]"
        options={{
          headerShown: true,
          title: t("student.course_detail_title"),
          headerBackTitle: "",
        }}
      />
      <Stack.Screen
        name="student-watch/[lessonId]"
        options={{
          headerShown: true,
          title: t("student.watch_screen_title"),
          headerBackTitle: "",
        }}
      />
    </Stack>
  );
}
```

### Why we did it

These routes live outside the visible student tab bar, so once the student enters them, they should behave like proper pushed detail screens with clear native back navigation. [file:20]

### Why this matters

For a web engineer, it is easy to think of a route as “just another page.” In Expo Router on mobile, header ownership and back behavior are part of the product experience. A route can technically exist and still feel unfinished if entering it does not give the user a clear return path. [file:20]

---

## Step 10 Keep the design-system reuse and RTL safety intact

### What we did

We made sure Feature 10 continued using the shared design foundations from Feature 06 instead of reintroducing one-off screen markup. The feature kept reusing:
- `ScreenContainer`
- `AppText`
- `Card`
- `PrimaryButton`
- `StatusBadge`
- `EmptyState`
- `LoadingScreen`
- `Spacing` tokens from `constants/design.ts` [file:20]

We also kept RTL-safe layout habits in the lesson-row structure:
- `me-3`
- `ms-2`
- simple row composition
- no hardcoded left/right assumptions [file:20]

### Why we did it

This feature sits directly in the kind of UI where RTL mistakes become obvious:
- lesson icon
- title
- duration
- badge
- row spacing [file:20]

Using the existing design primitives reduced visual drift, and using logical directional spacing protected the Arabic-first experience. [file:20]

### Lesson

Once a project introduces both:
- a shared design system
- and an Arabic-first rule

every later feature becomes a test of whether those decisions are truly part of the team’s implementation habits or only one-time setup work. [file:20]

---

## Step 11 Verify the full student flow locally in Arabic first, then English

### What we did

After implementation, we tested the feature with this path:

1. Open the app.
2. Start from the student home screen.
3. Go into Browse.
4. Open an academic year.
5. Open a subject.
6. Open a course.
7. Confirm the refined course detail screen.
8. Tap a preview lesson.
9. Confirm navigation to the watch placeholder.
10. Go back.
11. Tap a locked lesson.
12. Confirm blocked Alert behavior.
13. Re-check the same flow in English. [file:20]

We also re-ran:
```bash
npx tsc --noEmit
npx expo start --clear
```

### Why we did it

This feature is complete only if the whole route path behaves as one connected learning flow, not if individual files merely compile. [file:20]

Testing Arabic first mattered because Arabic is the default product mode, not a secondary afterthought. English verification mattered because Feature 04 established English as the supported secondary language for testing and fallback. [file:20]

### What passed

We confirmed all of the following:
- the student can open a course from browse
- the course detail screen renders with stronger summary structure
- lesson rows clearly distinguish preview vs locked states
- tapping a preview lesson opens the watch screen
- tapping a locked lesson shows a blocked Alert and does not navigate
- watch screen metadata loads from the mock data layer
- Arabic still works as the default RTL experience
- English still works for the same flow
- TypeScript still passes
- Expo still starts cleanly [file:20]

---

## Problems encountered in Feature 10

### Problem 1 The route flow already worked, so it was easy to underestimate how much polish was still missing

The first challenge was not a crash. It was a product-quality challenge. Because the student could already reach course detail and watch, the flow looked more complete than it really was. But there was still missing UX value:
- no enrollment-state visibility
- no useful enroll feedback
- weak watch placeholder context
- raw lesson ID shown to the user [file:20]

### Why this was risky

A route that technically works can still feel unready in a mobile app. If we had treated this as “already done,” the student journey would have remained functional but under-polished. [file:20]

---

### Problem 2 Enrollment state was needed by the screen, but the clean helper did not exist yet

The course detail screen needed a simple answer to “what is this student’s status for this course?” but the existing mock data layer exposed only the lower-level enrollment helper. [file:20]

### Why this mattered

If we had solved this inline inside the screen, we would have weakened the architecture rule that query-style shaping belongs in the mock layer. [file:20]

---

### Problem 3 The watch screen was too placeholder-like for a real student flow

The existing watch route was valid technically, but it still displayed a raw lesson ID rather than lesson metadata. [file:20]

### Why this mattered

That kind of placeholder is acceptable temporarily during route creation, but not ideal once the route becomes part of a polished end-to-end product path. [file:20]

---

### Problem 4 Header behavior and back-navigation clarity still mattered on standalone dynamic routes

The course detail and watch routes live outside the visible student tab tree, which means native back behavior matters more. [file:20]

### Why this mattered

Without visible native headers, the flow can still work but feel less trustworthy or less mobile-native, especially once students move deeper into the app hierarchy. [file:20]

---

## How those problems were solved

### Solution 1 Treat Feature 10 as a refinement feature, not a rebuild

Instead of rebuilding the course flow from zero, we focused only on the missing product-quality pieces:
- enrollment-state display
- stronger course summary
- better watch placeholder quality
- cleaner back-navigation behavior [file:20]

That kept the work efficient and aligned with the actual feature goal. [file:20]

---

### Solution 2 Add the smallest missing query helper to the mock layer

We solved the enrollment-state need by adding exactly one helper:
- `getEnrollmentStatus(courseId)` [file:20]

This preserved the data-layer rule without overengineering the mock module. [file:20]

---

### Solution 3 Make the watch placeholder intentional instead of fake-complete

We did not try to force real video playback into this feature. Instead, we made the watch screen honestly incomplete but still useful:
- it loads lesson metadata
- it shows a clear placeholder player area
- it proves the route and lookup flow are correct [file:20]

That is much cleaner than either:
- leaving the route as a raw ID stub
- or overreaching into real video integration too early [file:20]

---

### Solution 4 Use native Alert feedback for blocked and mock-success actions

We used `Alert.alert(...)` for:
- locked lesson blocked behavior
- mock enroll-button success behavior [file:20]

This kept the scope small while still giving users immediate mobile-appropriate feedback. [file:20]

---

## React vs React Native notes

### 1. A detail route is not complete just because navigation works

In a web app, it is common to treat “route exists and loads data” as most of the job. In mobile, detail routes often need stronger immediate context because the user has:
- less screen space
- less visible hierarchy
- more reliance on native navigation patterns [file:20]

That is why metadata, back-navigation clarity, and status signaling mattered so much here. [file:20]

---

### 2. Temporary placeholders should still feel intentional

A web engineer may be comfortable with obvious stubs during incremental development. In mobile, even temporary placeholder screens are often directly experienced as part of the product flow. [file:20]

So a good placeholder should:
- prove routing
- prove data lookup
- use real design primitives
- communicate what will exist later [file:20]

That is exactly what we did with the refined watch screen. [file:20]

---

### 3. Shared UI primitives only stay valuable if later features keep reusing them

Feature 06 created the UI foundation. Feature 10 helped prove that the foundation can support real detail-level product work without falling back into duplicated styling. [file:20]

This is the same discipline you want in a mature Next.js design system: once the shared layer exists, future features should become easier and more consistent, not drift back into one-off markup. [file:20]

---

### 4. Mobile localization affects layout more quickly than web layouts often do

On the web, wider layouts can absorb some translation differences more easily. In mobile row-based UIs, language changes affect:
- badge width
- line wrapping
- row height
- spacing balance
- direction-sensitive layout [file:20]

That is why Arabic-first testing was not optional polish. It was part of the correctness of the feature. [file:20]

---

## Discussion notes

Feature 10 is a strong example of a mobile refinement feature that appears small but teaches several important lessons. It was not mainly about adding new routing. It was about making an already-existing route path feel believable and complete. [file:20]

The most important engineering ideas in this feature were:
- route quality is different from route existence
- mock data architecture should still carry query-style helpers
- placeholders should be intentional
- blocked interactions need clear feedback
- localization and RTL still shape detail-level UI work [file:20]

This feature also shows a healthy implementation pattern for the rest of the project:
1. build the route
2. connect the route
3. make the route readable
4. make the interaction rules obvious
5. improve the product feel without expanding into the next backend phase [file:20]

That pattern will likely matter again in later teacher, profile, payment, and navigation-polish features. [file:20]

---

## Final output of Feature 10

At the end of this feature, the project has:
- a refined student course detail screen
- clearer course summary structure
- enrollment-status display using mock data
- a lesson list with clearer preview vs locked presentation
- blocked locked-lesson behavior using native Alert
- mock enroll-button feedback using native Alert
- a refined watch placeholder screen that loads real lesson metadata
- a top-level route flow that feels more native because course detail and watch use visible stack headers
- continued reuse of the shared design system
- continued Arabic-first translation coverage
- continued English support for the same flow
- no backend integration yet by design [file:20]

The student journey now feels much closer to a real learning product path:
- Browse
- Course Detail
- Lesson decision
- Watch placeholder [file:20]

---

## Completion checklist for Feature 10

Feature 10 is complete when all of these are true:

- `lib/mock-data/student.ts` includes `getEnrollmentStatus()`.
- `lib/i18n/ar.ts` includes the new Feature 10 Arabic strings.
- `lib/i18n/en.ts` includes the matching English strings.
- `app/student-course/[courseId].tsx` is refined beyond the earlier placeholder-level version.
- The course detail screen shows title, teacher, description, lesson count, and price.
- The course detail screen shows enrollment status when applicable.
- The enroll button only appears for the non-enrolled mock state.
- Tapping the enroll button shows mock success feedback.
- Lesson rows still render in order.
- Preview lessons are visually distinct.
- Locked lessons are visually distinct.
- Tapping a preview lesson navigates to watch.
- Tapping a locked lesson does not navigate.
- Locked behavior is shown through a native Alert.
- `app/student-watch/[lessonId].tsx` loads lesson metadata from the mock data layer.
- The watch screen no longer shows only a raw lesson ID.
- The watch screen remains a placeholder intentionally, without real playback yet.
- `app/_layout.tsx` gives the course detail and watch routes visible stack headers.
- Arabic remains the default experience.
- All visible new UI text comes from translation keys.
- RTL remains safe in the course and lesson flow.
- English still works for the same flow.
- The entire feature works with mock data only.
- No Supabase or Clerk integration was introduced.
- `npx tsc --noEmit` passes.
- `npx expo start --clear` starts without errors. [file:20]

---

## Official references

These were the most relevant official references for this feature:

- Expo Router dynamic routes  
  https://docs.expo.dev/router/dynamic-routes/

- Expo Router Stack navigation options  
  https://docs.expo.dev/router/advanced/stack/

- React Native Alert  
  https://reactnative.dev/docs/alert

- React Native FlatList `ListHeaderComponent`  
  https://reactnative.dev/docs/flatlist#listheadercomponent

- Expo Video documentation for future real playback work  
  https://docs.expo.dev/versions/latest/sdk/video/



  ---
TITLE: Feature 11 — Build Teacher Home Screen

This feature builds the first real teacher landing experience for the EduStream mobile app. It does not yet include full teacher course management, backend integration, Supabase, or Clerk. Instead, it creates a mock-data-driven teacher dashboard that becomes the main home screen for teacher users, using the shared UI foundations already introduced earlier in the project.

The end goal of this feature is simple but important:

- a teacher can open the app and land on a real teacher home screen
- the screen feels appropriate for teacher workflows, not student workflows
- the screen uses mock data from the data layer, not arrays embedded directly in the screen
- all visible text comes from translation keys
- Arabic is the default experience
- RTL remains safe and visually correct
- English still works as a secondary verification language

This feature also creates a cleaner routing direction for future teacher work, so the teacher area can later grow without polluting the bottom tab bar with course management detail screens.

---

TITLE: Feature 11 — Build Teacher Home Screen - Why this feature matters

By the time this feature started, the app already had a much stronger student experience:

- student home existed
- browse flow existed
- course detail and watch routes existed
- mock data had already been split by concern
- shared UI primitives already existed
- Arabic-first localization rules were already active

But the teacher side was still incomplete. There were teacher route placeholders, yet no real teacher landing screen that matched the quality and structure of the student area. That created two problems:

1. the app architecture already anticipated teacher flows, but the teacher experience was not actually usable
2. future teacher features such as course management and enrollment review would have no proper entry point unless a dashboard existed first

So this feature is not just “another screen.” It establishes the teacher-facing root experience and defines how future teacher workflows should connect into the app.

For a React / Next.js engineer, this is similar to the moment when an admin area stops being a placeholder page and becomes a real dashboard shell with overview cards, action entry points, and role-specific navigation structure.

---

TITLE: Feature 11 — Build Teacher Home Screen - What we built

The teacher home screen was built as a dashboard-style landing page with a limited and intentional scope.

The feature includes:

- a real `app/(teacher)/dashboard.tsx` screen instead of a placeholder
- a teacher tabs layout under `app/(teacher)/_layout.tsx`
- summary cards driven by mock data
- recent teacher course content driven by mock data
- quick action entry points for future teacher workflows
- translation coverage in both `lib/i18n/ar.ts` and `lib/i18n/en.ts`
- root stack support for the `(teacher)` route group in `app/_layout.tsx`

The feature intentionally does **not** include:

- real enrollment approval flows
- real course create/edit flows
- real lesson management flows
- backend data fetching
- Supabase or Clerk integration

Those are explicitly deferred to later teacher features.

---

TITLE: Feature 11 — Build Teacher Home Screen - Files we created or updated

These were the main files involved in Feature 11:

- `app/(teacher)/_layout.tsx`
- `app/(teacher)/dashboard.tsx`
- `app/(teacher)/enrollments.tsx`
- `app/_layout.tsx`
- `lib/mock-data/teacher.ts`
- `lib/mock-data/student.ts`
- `lib/i18n/ar.ts`
- `lib/i18n/en.ts`

Each file had a clear responsibility:

- teacher routing structure lived in `app/(teacher)/_layout.tsx`
- the visible teacher dashboard UI lived in `app/(teacher)/dashboard.tsx`
- the minimal second teacher tab placeholder lived in `app/(teacher)/enrollments.tsx`
- the root stack registration lived in `app/_layout.tsx`
- teacher summary query helpers lived in `lib/mock-data/teacher.ts`
- shared course source access remained in the mock data layer via `lib/mock-data/student.ts`
- all visible UI strings lived in `lib/i18n/ar.ts` and `lib/i18n/en.ts`

---

TITLE: Feature 11 — Build Teacher Home Screen - Step 1 Add teacher home query helpers to the mock data layer - What we did

We extended the teacher mock-data layer so the teacher home screen could ask for dashboard-friendly data instead of constructing summary logic directly inside the screen.

The main idea was:

- the screen should ask for teacher home data
- the mock data layer should shape that data
- future backend replacement should require minimal screen changes

To support that, we added helper functions in `lib/mock-data/teacher.ts` such as:

- `getTeacherCourses(teacherId)`
- `getTeacherHomeSummary(teacherId)`

The summary helper returns a compact dashboard-oriented shape such as:

- total teacher courses
- total pending enrollment requests
- a recent subset of teacher courses

This is important because overview screens usually need “query-shaped” data, not just raw entity arrays.

---

TITLE: Feature 11 — Build Teacher Home Screen - Step 1 Add teacher home query helpers to the mock data layer - Why we did it

This preserves the same architectural discipline already established in Feature 07.

Instead of doing this inside the screen:

- load many arrays
- manually filter courses
- manually compute pending counts
- manually decide what “recent” means

we moved that shaping into the mock data layer.

That gives three benefits:

1. the screen stays smaller and easier to reason about
2. future backend replacement becomes simpler because the screen already depends on a query-like function
3. role-specific business logic stays near the role-specific data source, not inside route files

This is one of the most useful long-term habits in UI-first, mock-data-first apps: treat mock helpers like rehearsal interfaces for future real queries.

---

TITLE: Feature 11 — Build Teacher Home Screen - Step 2 Reuse shared course data without duplicating it - What we did

Teacher dashboard summaries need access to course records. Those courses already existed in the mock data layer, so we avoided creating a second copy of course arrays just for the teacher area.

To make teacher-side queries possible, we exposed the course data source from the existing mock layer and let `lib/mock-data/teacher.ts` derive teacher-specific slices from it.

In practice, that meant teacher queries could:

- filter by `teacherId`
- count matching courses
- gather related enrollments
- prepare a recent-courses subset

without duplicating the actual catalog data.

---

TITLE: Feature 11 — Build Teacher Home Screen - Step 2 Reuse shared course data without duplicating it - Why we did it

Duplicating mock arrays creates avoidable drift:

- one file gets updated
- the other does not
- the teacher UI no longer matches student-visible course data
- future backend replacement becomes harder to reason about

Reusing the same course source keeps the app’s fake data more internally consistent. It also better reflects how a real backend would work: student and teacher views normally depend on the same underlying course records, just filtered and shaped differently.

---

TITLE: Feature 11 — Build Teacher Home Screen - Step 3 Add a teacher tabs layout - What we did

We created `app/(teacher)/_layout.tsx` using Expo Router tabs so the teacher area has its own top-level navigation structure.

The teacher tabs were kept intentionally minimal:

- `dashboard`
- `enrollments`

This matches the principle already used in the student area: only true top-level destinations should appear in the tab bar.

The teacher layout became the routing shell for the teacher role, while the dashboard screen became the actual teacher landing page.

---

TITLE: Feature 11 — Build Teacher Home Screen - Step 3 Add a teacher tabs layout - Why we did it

Without a proper teacher layout, the teacher area would remain structurally weaker than the student area.

This step matters because it defines:

- what counts as a top-level teacher destination
- what should be visible in the tab bar
- how future teacher flows should attach to the teacher experience

A route group without a deliberate layout can quickly become messy in Expo Router. Tabs are especially sensitive because files inside the group can accidentally become visible tab destinations if the structure is not planned carefully.

So this step was partly UI work and partly navigation architecture work.

---

TITLE: Feature 11 — Build Teacher Home Screen - Step 4 Replace the teacher dashboard placeholder with a real screen - What we did

The previous `app/(teacher)/dashboard.tsx` was just a simple placeholder. We replaced it with a real teacher dashboard screen built from shared primitives:

- `ScreenContainer`
- `AppText`
- `Card`
- `PrimaryButton`
- `EmptyState`
- `LoadingScreen`

The final screen included these sections:

- a greeting area for the teacher
- a top summary section
- overview cards for total courses and pending requests
- quick action buttons
- a recent courses section

The screen loaded data with `useEffect` and async mock helpers, then rendered loading, real-data, and empty-friendly behavior.

---

TITLE: Feature 11 — Build Teacher Home Screen - Step 4 Replace the teacher dashboard placeholder with a real screen - Why we did it

A teacher home screen should answer the most immediate teacher questions:

- how many courses do I have?
- do I have pending enrollment requests?
- what are the most recent courses I may want to manage?
- where do I go next?

That is exactly what a useful dashboard should do. It should not try to contain the entire future teacher product surface. It should simply provide orientation and entry points.

This is especially important in mobile UI. A mobile dashboard becomes noisy very quickly if it tries to show too many dense management tools at once. So the screen was kept focused and overview-oriented.

---

TITLE: Feature 11 — Build Teacher Home Screen - Step 5 Keep all teacher visible text in translation files - What we did

We added a new `teacher` translation namespace in both:

- `lib/i18n/ar.ts`
- `lib/i18n/en.ts`

This included keys for:

- tab labels
- greeting text
- overview section labels
- summary labels
- button labels
- placeholder alert text
- recent course labels
- enrollments placeholder text

That means the new teacher UI follows the same localization rule already established for the rest of the app: no visible strings should be hardcoded directly in the screen.

---

TITLE: Feature 11 — Build Teacher Home Screen - Step 5 Keep all teacher visible text in translation files - Why we did it

Feature 04 made Arabic-first localization a project-wide implementation rule, not a best-effort preference.

That means every new screen must be built this way from the start:

- Arabic first
- translation keys only
- English secondary
- RTL-safe layout choices

If this discipline is skipped even once, hardcoded UI text starts spreading again and future localization work becomes a cleanup task instead of a normal part of feature delivery.

So translation work was part of implementation, not a final polish step.

---

TITLE: Feature 11 — Build Teacher Home Screen - Step 6 Register the teacher route group in the root stack - What we did

We updated `app/_layout.tsx` so the root stack explicitly registers the `(teacher)` route group:

- `name="(teacher)"`
- `options={{ headerShown: false }}`

This matches how the student route group is already handled.

The root stack therefore became aware of:

- the app index route
- the student route group
- the teacher route group
- the top-level student detail routes that live outside student tabs

This gave the teacher area a stable place inside the app-level routing tree.

---

TITLE: Feature 11 — Build Teacher Home Screen - Step 6 Register the teacher route group in the root stack - Why we did it

Even if the teacher screen file exists, it is not enough for long-term routing clarity.

The app already had a pattern where:

- role-based top-level areas live in route groups
- detail screens that should not appear in tabs can live outside those groups
- the root stack owns the overall navigation shell

Registering `(teacher)` in the root layout keeps the routing model consistent and prepares the app for future role-based growth.

---

TITLE: Feature 11 — Build Teacher Home Screen - Step 7 Keep teacher quick actions in placeholder mode for now - What we did

The teacher dashboard includes quick actions such as course-related entry points, but in Feature 11 they remain placeholder interactions rather than real navigation into management screens.

So for actions like “add course” or tapping a recent course card, we deliberately used `Alert` feedback rather than prematurely opening unfinished screens.

That kept the feature within scope:

- teacher home exists
- teacher sees useful dashboard data
- future entry points are visible
- full teacher course management is still deferred

---

TITLE: Feature 11 — Build Teacher Home Screen - Step 7 Keep teacher quick actions in placeholder mode for now - Why we did it

This project is still in the mock-data-first phase, and Feature 11 is specifically the teacher home screen feature, not the full teacher management feature.

If we had expanded those actions into real create/edit/lesson flows here, the feature would have grown beyond scope and mixed two milestones together.

Using placeholder actions is a valid engineering choice when:

- the route destination is part of a later feature
- the current feature only needs to prove entry-point placement
- the current screen should communicate intent without pretending the next feature already exists

This mirrors the same disciplined approach used earlier in the app when placeholder routes were useful as deliberate milestones.

---

TITLE: Feature 11 — Build Teacher Home Screen - Step 8 Clarify the future teacher routing structure - What we did

While finishing the teacher home feature, we also clarified how future teacher course-management routes should be structured so they do not pollute the teacher tab bar.

The intended future structure is:

- keep true teacher entry points inside `app/(teacher)/`
- move deeper teacher course-management routes outside the teacher tabs tree

Examples of the future top-level routes:

- `app/teacher-course/new.tsx`
- `app/teacher-course/[courseId]/edit.tsx`
- `app/teacher-course/[courseId]/lessons.tsx`

And the future navigation targets were recorded as:

- `router.push("/teacher-course/new");`
- `router.push(\`/teacher-course/${courseId}/edit\`);`
- `router.push(\`/teacher-course/${courseId}/lessons\`);`

---

TITLE: Feature 11 — Build Teacher Home Screen - Step 8 Clarify the future teacher routing structure - Why we did it

This solves the same class of routing problem that already appeared earlier in the student area.

If course creation, edit, and lesson-management screens stay inside the teacher tabs group, Expo Router can surface them as visible tab destinations. That creates unwanted UI such as:

- extra tab items
- internal workflow screens appearing as top-level destinations
- confusing teacher navigation

So the correct long-term pattern is:

- top-level role destinations stay in the tab group
- deep workflow screens move outside the tab tree
- the root stack owns those deeper pushed screens

This is the cleanest way to preserve a simple teacher tab bar while still allowing rich future teacher flows.

---

TITLE: Feature 11 — Build Teacher Home Screen - Problems encountered in Feature 11 - Problem 1 A teacher route group can accidentally expose too many tab destinations

Once a teacher tabs layout exists, any screen placed in the wrong part of the route tree can start behaving like a tab candidate.

That means the problem is not only visual. It is structural.

A route such as:

- `course/new`
- `course/[courseId]/edit`
- `course/[courseId]/lessons`

might look like a reasonable folder organization at first, but if it sits in the wrong place under the teacher tabs tree, it can become visible in the bottom tab bar.

---

TITLE: Feature 11 — Build Teacher Home Screen - Problems encountered in Feature 11 - Problem 2 It was easy to expand this feature into teacher course management by accident

A dashboard naturally invites deeper actions:

- add course
- edit course
- manage lessons
- review enrollments
- inspect requests

Without a clear scope boundary, a “home screen” feature can quietly turn into a partial admin system.

That would make the feature harder to finish cleanly and harder to track correctly.

---

TITLE: Feature 11 — Build Teacher Home Screen - Problems encountered in Feature 11 - Problem 3 Teacher data needed overview shaping, not just raw mock arrays

The existing mock layer already had teacher-related and course-related data, but a dashboard needs something slightly different:

- counts
- filtered subsets
- summary-friendly slices
- recent activity style groupings

That is not the same as just dumping an array into a screen.

So the issue was not lack of data. The issue was shaping the data correctly for dashboard use.

---

TITLE: Feature 11 — Build Teacher Home Screen - How those problems were solved - Solution 1 Define teacher-home-specific query helpers in the mock data layer

We solved the dashboard-data-shaping problem by adding small teacher-home query helpers instead of embedding summary logic directly in JSX.

That preserved the architecture and gave the screen an API-like interface for overview data.

---

TITLE: Feature 11 — Build Teacher Home Screen - How those problems were solved - Solution 2 Keep teacher home focused and defer real management flows

We solved the scope problem by treating quick actions as placeholders for now rather than pretending the next feature was already complete.

That kept Feature 11 honest:

- real teacher home UI exists
- meaningful mock data exists
- future flow entry points exist
- deeper management screens remain part of Feature 12

---

TITLE: Feature 11 — Build Teacher Home Screen - How those problems were solved - Solution 3 Reuse the student-era routing lesson for teacher routes

We already learned from the student area that detail flows should not live as visible tab destinations.

So the teacher routing plan intentionally mirrors that lesson:

- teacher home remains inside `(teacher)`
- teacher top-level destinations remain inside `(teacher)`
- deeper teacher course-management routes should live outside `(teacher)`

This creates consistency across the app and avoids relearning the same routing mistake later.

---

TITLE: Feature 11 — Build Teacher Home Screen - Lesson 1 Role-based home screens should feel different even when they share the same design system

A shared design system does **not** mean every role gets the same layout.

Student home and teacher home should reuse the same primitives, but the information architecture must fit the user’s job.

For students, the home screen emphasizes learning continuation and discovery.

For teachers, the home screen emphasizes oversight, pending actions, and management entry points.

That is a useful product-design lesson: design consistency and role-specific usefulness are not opposites.

---

TITLE: Feature 11 — Build Teacher Home Screen - Lesson 2 Mock data layers should evolve from raw entities into screen-oriented query shapes

Early in an app, raw arrays are enough.

As the app grows, home screens and dashboards usually need:

- counts
- slices
- grouped subsets
- status summaries

That is the point where the mock layer becomes more valuable if it starts behaving like a mini query API instead of a storage dump.

Feature 11 is a good example of that shift.

---

TITLE: Feature 11 — Build Teacher Home Screen - Lesson 3 Route groups are powerful, but they reward discipline

Expo Router’s file-based routing is very productive, but route groups and tabs can become confusing if the folder structure is not intentional.

The important lesson is:

- a file location is also a navigation decision
- tab group placement affects visible destinations
- future workflow screens should be placed based on navigation behavior, not only folder neatness

This is one of the most important architectural habits in Expo Router apps.

---

TITLE: Feature 11 — Build Teacher Home Screen - Lesson 4 Arabic-first work is not finished when the strings translate

Arabic-first implementation requires more than translation coverage.

It also requires checking:

- RTL row balance
- card composition
- spacing direction safety
- text wrapping
- tab label readability

Feature 11 reinforces the same ongoing mobile lesson: localization and layout are deeply connected, especially on dense small-screen interfaces.

---

TITLE: Feature 11 — Build Teacher Home Screen - Discussion notes for Feature 11 - Why not connect teacher actions to real screens already?

Because Feature 11 is the teacher home screen feature, not the teacher course management feature.

The dashboard needed to expose the right entry points and prove the teacher landing experience. It did **not** need to implement the full workflows those entry points will eventually open.

Keeping those actions in placeholder mode preserves scope clarity and keeps progress tracking honest.

---

TITLE: Feature 11 — Build Teacher Home Screen - Discussion notes for Feature 11 - Why put teacher summary helpers in the mock data layer instead of calculating everything in the screen?

Because dashboards are summary consumers, not summary engines.

If a screen directly computes too much filtering, counting, and shaping, it becomes harder to read and harder to replace later when real backend queries arrive.

A screen should ideally say:

- give me teacher home data
- render it

That is much cleaner than reconstructing the whole summary logic in component code.

---

TITLE: Feature 11 — Build Teacher Home Screen - Discussion notes for Feature 11 - Why record the future `router.push(...)` targets now if we are not using them yet?

Because routing decisions affect file placement early, even before full screens exist.

Recording the intended future navigation targets now helps avoid two later problems:

1. placing teacher course-management files inside the wrong route group
2. introducing tab-bar pollution when Feature 12 begins

So even though the pushes are not active yet, the routing plan is part of correct Feature 11 architecture.

The intended future calls are:

- `router.push("/teacher-course/new");`
- `router.push(\`/teacher-course/${courseId}/edit\`);`
- `router.push(\`/teacher-course/${courseId}/lessons\`);`

---

TITLE: Feature 11 — Build Teacher Home Screen - Final output of Feature 11

At the end of this feature, the project had:

- a real teacher dashboard screen under `app/(teacher)/dashboard.tsx`
- a real teacher tabs layout under `app/(teacher)/_layout.tsx`
- a minimal enrollments placeholder under `app/(teacher)/enrollments.tsx`
- root registration for `(teacher)` inside `app/_layout.tsx`
- teacher-specific translation keys in both Arabic and English translation files
- teacher-home query helpers in `lib/mock-data/teacher.ts`
- reuse of shared course mock data instead of teacher-side duplication
- shared UI primitive reuse throughout the teacher dashboard
- Arabic-first RTL-safe teacher UI verified before English
- a clarified future route structure for teacher course management outside the `(teacher)` tabs tree

---

TITLE: Feature 11 — Build Teacher Home Screen - Completion checklist for Feature 11

Feature 11 is complete when all of these are true:

- `app/(teacher)/dashboard.tsx` is a real teacher home screen, not a placeholder
- `app/(teacher)/_layout.tsx` exists and defines the teacher tab structure
- only intended teacher top-level destinations appear in the teacher tab bar
- `app/(teacher)/enrollments.tsx` exists as a minimal supporting screen
- `app/_layout.tsx` registers the `(teacher)` route group
- teacher home data comes from `lib/mock-data/teacher.ts`, not embedded arrays inside the screen
- the teacher dashboard shows useful summary content such as total courses and pending requests
- quick action entry points exist, even if some remain placeholder interactions for now
- all visible teacher UI text comes from translation keys
- Arabic is still the default experience
- teacher layout has been visually checked in RTL first
- English still works after switching language
- no Supabase, Clerk, or real backend integration was introduced
- the future teacher route plan is clear enough to keep course-management screens out of the teacher tabs tree

---

TITLE: Feature 11 — Build Teacher Home Screen - Official references

These were the most useful official references for this feature:

- Expo Router tabs layouts  
  https://docs.expo.dev/router/layouts/tabs/

- Expo Router route groups and file-based routing  
  https://docs.expo.dev/router/basics/file-based-routing/#route-groups

- Expo Router common navigation patterns  
  https://docs.expo.dev/router/basics/common-navigation-patterns/

- Expo Router nesting navigators  
  https://docs.expo.dev/router/advanced/nesting-navigators/

- React Native ScrollView  
  https://reactnative.dev/docs/scrollview

One practical takeaway from those references is especially important for teacher flows: top-level role destinations can live inside a tab route group, while deeper workflow screens should be pushed outside that tabs tree when they are not meant to be visible tab items.

---