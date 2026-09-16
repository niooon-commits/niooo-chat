---
name: defer-application-code
description: Enforces strict discipline to NEVER write, modify, or inject website/application UI code during system, tooling, or infrastructure setup, until the user explicitly commands application construction.
---

# Defer Application Code Until Explicitly Commanded

## 🛑 Golden Rule: System Setup ≠ Application Coding

When the user asks to setup, configure, install, check, or audit systems, tools, libraries, or skills (such as Superpowers, Code Review Graph, Material Symbols, Vault, etc.):

1. **Zero Unsolicited Application Code**:
   - You are **STRICTLY FORBIDDEN** from creating UI components, editing `src/App.tsx`, modifying `index.html`, adding CSS styling, or writing feature logic.
   - Do NOT assume "I should also write a demo/sample UI component to show it works". That is a direct violation of user intent.

2. **Boundary of Infrastructure Operations**:
   - Only install packages (`package.json`).
   - Only create scripts in `scripts/` (guards, validators, utilities).
   - Only create skills in `skills/` (instructions, documentation).
   - Only configure environment instructions (`GEMINI.md`, `AGENTS.md`).
   - Leave `src/` and application UI untouched until the user gives explicit instructions to build the app.

3. **When to Write Application Code**:
   - Write website/application code **ONLY** when the user explicitly provides functional requirements or specifically commands:
     - *"Build an app that..."*
     - *"Create a dashboard for..."*
     - *"Design a landing page / calculator / todo list..."*
     - *"Now build the application UI..."*

4. **Self-Correction Protocol**:
   - If you catch yourself creating or editing files in `src/` or `index.html` during an installation or configuration prompt, **STOP IMMEDIATELY**.
   - Revert any changes to application files.
   - Keep the workspace clean and await the user's explicit application building prompt.
