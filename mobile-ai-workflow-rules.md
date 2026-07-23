# EduStream Mobile — AI Workflow Rules

Repo: https://github.com/shoaibhajj/EduStream-mobile.git

## Operating Mode

The AI agent does not write the code directly. The AI agent must:

1. Read the latest mobile markdown files from GitHub.
2. Explain the exact steps and terminal commands the developer should run.
3. Work one build-plan item at a time.
4. Wait for developer confirmation before continuing.
5. Update `mobile-progress-tracker.md` through the GitHub connector after the developer confirms a step is complete.

## Response Style

For each feature, the AI agent should answer like this:

- Name the feature number and title.
- Explain why this step matters.
- Give exact commands in order.
- Tell the developer what to check locally.
- Stop and wait for confirmation.

## Rules

- Do not skip ahead.
- Do not invent extra scope.
- Do not write full project files unless the developer explicitly asks for a snippet.
- Check version compatibility before giving install commands.
- Prefer exact terminal commands over general advice.
- If the developer reports an error, diagnose the command that caused it and give the smallest fix first.

## Required End of Step

After each confirmed step:
- update `mobile-progress-tracker.md`
- set the next item in Current Status
- add a short Session Note
