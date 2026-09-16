# Superpowers Development Methodology

This workspace has installed **Superpowers** (https://github.com/obra/superpowers) by Jesse Vincent (@obra).

## Available Superpowers Skills:
The following skills are installed in `./skills/`:
- `brainstorming`: Interactive design and specification exploration before coding.
- `writing-plans`: Creating rigorous, bite-sized implementation plans.
- `executing-plans`: Disciplined plan execution with progress tracking.
- `subagent-driven-development`: Subagent-driven workflows and reviews.
- `systematic-debugging`: Multi-phase root cause analysis and bug fixing.
- `test-driven-development`: Red-Green-Refactor TDD cycle.
- `requesting-code-review`: Structured code reviews against specifications.
- `receiving-code-review`: Thoughtful handling of code review feedback.
- `verification-before-completion`: Evidence-based verification before claiming done.
- `dispatching-parallel-agents`: Concurrently delegating independent tasks.
- `using-git-worktrees`: Isolated git worktree development.
- `finishing-a-development-branch`: Merging, testing, and cleaning up branches.
- `writing-skills`: Authoring new reusable agent skills.
- `using-superpowers`: Master trigger rule for selecting and invoking skills.

## Core Directives:
1. **Never guess root causes**: Systematically debug and isolate before patching.
2. **TDD discipline**: Write failing tests before implementation code whenever tests apply.
3. **Evidence-based verification**: Verify actual behavior (compile, test, lint) before marking tasks complete.

## 🛑 Fail-Safe Enforcement Guard (Automated Check):
- **BEFORE WRITING ANY CODE**: The agent MUST check if a Superpowers skill applies.
- **The 1% Rule**: If there is even a 1% chance a skill applies, you ABSOLUTELY MUST invoke the skill first.
- **Immediate Halt Trigger**: If the agent ever catches itself writing implementation code without having consulted the appropriate skill (`brainstorming`, `writing-plans`, `test-driven-development`, or `systematic-debugging`), it MUST STOP immediately, step back, and invoke the skill.
- Automated guard script: `npm run superpowers:check` (runs `scripts/superpowers-guard.js`).

---

# Code Review Graph (Knowledge Graph & Impact Analysis)

This workspace has installed **code-review-graph** (https://github.com/tirth8205/code-review-graph).

## Installed Code Review Graph Skills:
The following skills are installed in `./skills/`:
- `build-graph`: Build or update the code knowledge graph (`.code-review-graph/graph.db`).
- `explore-codebase`: Navigate and understand codebase structure, relationships, and flows.
- `debug-issue`: Systematically trace bugs through graph call chains before reading source.
- `review-changes`: Structured code review with risk-scored analysis and blast radius.
- `review-delta`: Token-efficient delta review of changes since last commit.
- `review-pr`: Comprehensive PR and branch review with impact radius analysis.
- `refactor-safely`: Plan and execute safe refactorings and detect dead code.

## Core Directives for Code Review Graph:
1. **Graph before Scan**: Use `code-review-graph query`, `impact`, or `detect-changes` to understand dependencies and blast radius before modifying core logic.
2. **Verify in Source**: Narrow scope with the graph, then confirm in the source code before finalizing edits.
3. **Keep Graph Fresh**: Use `npm run graph:update` or `code-review-graph update` after substantial edits.

---

# Material Symbols Icon Standard (@expo/material-symbols)

This workspace has installed and standardized on **Material Symbols** (`@expo/material-symbols`).

## Directives for Icons in Applications:
1. **Mandatory Icon Standard**: Whenever building, designing, or extending any application UI, use Material Symbols for all navigation, buttons, indicators, and controls.
2. **React / Web Component**: Use `<MaterialSymbol name="..." />` from `src/components/MaterialSymbol.tsx` (supports outlined, rounded, sharp, fills, weights, sizes, and Tailwind classes).
3. **Expo / Mobile Usage**: Import `@expo/material-symbols/<icon>.xml` or use the `npx add-material-symbols` CLI.
4. **Skill Reference**: Consult `./skills/material-symbols/SKILL.md` for symbol categories, names, and usage rules.

---

# 🛑 Strict Boundary: Defer Application Code Until Explicitly Commanded

**Mandatory Directive**:
1. When the user asks to setup, install, audit, or configure systems, tools, libraries, or skills, **NEVER write, edit, or inject website/application UI code** in `src/`, `index.html`, or components.
2. Application and website code must **ONLY** be written when the user explicitly gives instructions or commands to build the application.
3. Skill reference: `./skills/defer-application-code/SKILL.md`.



