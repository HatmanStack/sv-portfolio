---
title: 'Claude Forge'
description: 'A GAN-inspired adversarial multi-agent pipeline for Claude Code where separate agents generate and critique each other in iterative loops.'
date: 'Mar 16, 2026'
time: '8 min read'
---

# Adversarial Multi-Agent Pipeline for Claude Code

What if your AI coding assistant could argue with itself and produce better code because of it?

Claude Forge is an adversarial multi-agent pipeline for Claude Code that borrows from Generative Adversarial Networks (GANs). Instead of one AI agent writing code and hoping for the best, separate agents generate and critique each other's work in iterative loops until the output converges on something solid.

The result: plans that don't hallucinate files, implementations that follow the spec, and code that passes review before a human ever sees it.

## The Problem with Single-Pass AI Code

Most AI coding workflows look like this:

```
You → AI → Code → Hope it works
```

The AI generates code in a single pass. If it hallucinates a file path, misunderstands the architecture, or writes tests that don't actually test anything, you catch it during review. Or worse, you don't.

The fundamental issue is that the same context window that generated the code is the one evaluating it. There's no adversarial pressure. No second opinion. No fresh eyes.

## GANs, But for Software Engineering

In machine learning, GANs pit two networks against each other: a generator creates content, a discriminator evaluates it, and the feedback loop drives both to improve. Claude Forge applies this same principle to the development workflow:

![Diagram comparing generator and discriminator roles in GAN loops. Top: Planner vs. Plan Reviewer. Bottom: Implementer vs. Reviewer. Arrows indicate interaction.](/blog/gan.jpeg)

Each role runs as a **separate Claude agent with its own fresh context window**. The Plan Reviewer has never seen the Planner's reasoning process, it only sees the output. The Code Reviewer has never seen the Implementer's struggles, it only sees the code. This separation is the key insight: fresh context means fresh eyes.

## Four Pipeline Flows

The GAN architecture isn't limited to feature development. Claude Forge ships with four distinct flows, each triggered by its own intake skill:

### Feature Development (`/brainstorm` → `/pipeline`)

The original flow. You start with a feature idea and the brainstorm skill explores your codebase, then asks 5-15 clarifying questions to front-load high-impact decisions:

```
The codebase uses DynamoDB for storage. For this feature's data, should we:

A) Add tables to the existing DynamoDB setup
B) Use a different storage approach (e.g., S3 for documents)
C) Both — DynamoDB for metadata, S3 for content
```

The output is a structured brainstorm document, not a conversation transcript but a distilled set of decisions that the Planner agent can consume cold. From there the pipeline runs: Planner ↔ Plan Reviewer → Implementer ↔ Code Reviewer → Final Reviewer (GO/NO-GO).

![Diagram titled Extended Pipeline Agent Workflow featuring a 3D character at a laptop. Workflow stages: brainstorming, planning, implementation, and final review, with stages depicted in orange boxes connected by arrows. Includes steps like codebase exploration, design spec production, and assessments (GO/NO-GO). Tone: systematic and organized.](/blog/arch.jpeg)

### Repository Evaluation (`/repo-eval` → `/pipeline`)

Three evaluator agents run in parallel, each with a different lens:

- **The Pragmatist** (hire lens): Would you hire this codebase? Scores onboarding, API design, testing, and error handling.
- **The Oncall Engineer** (stress lens): Would you want to be paged for this at 3am? Scores observability, failure modes, recovery, and operational docs.
- **The Team Lead** (day-2 lens): Can a team maintain this long-term? Scores modularity, dependency health, tech debt, and contribution friction.

<br>

They score 12 pillars (4 each) on a 1-10 scale with per-pillar threshold overrides. The pipeline then plans and implements fixes. A lightweight verification agent verifys the specific findings at the end — no expensive re-evaluation.

### Repository Health (`/repo-health` → `/pipeline`)

An auditor agent scans for technical debt across four vectors: architectural, structural, operational, and hygiene. The remediation uses a split generator topology:

- **Hygienist** (subtractive): Deletes dead code, simplifies over-abstractions, removes unused dependencies.
- **Fortifier** (additive): Adds linting, CI checks, git hooks, and missing configs.

<br>

Both run through the same adversarial review loop. A verification agent verifys the CRITICAL and HIGH findings at the end — the auditor never re-runs.

### Documentation Health (`/doc-health` → `/pipeline`)

A doc auditor runs six detection phases: discovery, comparison, examples, links, config, and structure. It finds drift between documentation and actual code, then a doc engineer fixes the gaps while a doc reviewer validates the changes.

### Combined Audit (`/audit` → `/pipeline`)

The `/audit` skill runs any combination of the above. It asks scoping questions once, then spawns up to 5 agents in parallel (3 evaluators + health auditor + doc auditor). All intake docs land in one directory, and a single `/pipeline` command creates one unified plan with phases tagged by implementer type:

1. `[HYGIENIST]` phases first — subtractive cleanup
2. `[IMPLEMENTER]` phases next — structural fixes on clean code
3. `[FORTIFIER]` phases next — lock in the clean state
4. `[DOC-ENGINEER]` phases last — docs reflect final code

<br>

This is a merged-plan model, not sequential independent flows. The planner reads all findings together and consolidates overlapping concerns into single tasks.

## Design Decisions That Make It Work

### Phase-0: "The Law"

Every plan starts with a Phase-0 document that defines the immutable rules: tech stack, testing strategy, deployment approach, shared patterns, commit format. Every subsequent phase inherits from it. Every reviewer checks against it.

This solves a common problem with multi-agent systems: drift. Without a shared source of truth, Agent A might decide to use Jest while Agent B sets up Vitest. Phase-0 prevents that by establishing conventions before any code is written.

### The Zero-Context Engineer

The Planner writes for a fictional engineer who is:

- Skilled but has **zero context** on the codebase
- Unfamiliar with the toolset and problem domain
- **Will follow instructions precisely**
- **Will not infer missing details**, if it's not in the plan, it won't happen

<br>

This constraint forces the Planner to be explicit. No "add the usual auth middleware"; it has to specify which library, which pattern, which error codes. The Plan Reviewer then simulates this zero-context experience: "If I knew nothing about this codebase, could I follow these instructions?"

This framing dramatically reduces the "but I thought you meant..." failures that plague AI-generated code.

### Feedback Through Rhetorical Questions

When a reviewer finds an issue, it doesn't say "fix line 45." Instead, it asks:

```markdown
> **Consider:** The test `test_invalid_token_rejection` expects a 401
> status code. Are you returning the correct HTTP status in your error
> handling?
>
> **Think about:** In `src/auth/middleware.js:45`, what happens when the
> token is invalid? Is the error properly caught?
>
> **Reflect:** Look at how other middleware handles auth errors. Are you
> following the same pattern?
```

This isn't just a stylistic choice. It produces better fixes. When the Implementer agent is told exactly what to change, it makes a mechanical edit. When it's guided to *think about* the problem, it's more likely to find the root cause and fix related issues it might have otherwise missed.

### Signal Protocol

Agents communicate through structured signals routed by the orchestrator: `PLAN_COMPLETE`, `REVISION_REQUIRED`, `PLAN_APPROVED`, `IMPLEMENTATION_COMPLETE`, `CHANGES_REQUESTED`, `GO`, `NO-GO`, `VERIFIED`, `UNVERIFIED`. Each intake agent also emits a completion signal (`EVAL_HIRE_COMPLETE`, `AUDIT_COMPLETE`, etc.) that the intake skill validates before writing the intake doc — if a signal is missing, the agent was likely truncated and the intake doc is not written with partial data.

### State Recovery

All pipeline flows support re-entry. If you hit a token limit or need to step away, just run `/pipeline 2026-03-12-user-auth` again. The orchestrator detects progress via `feedback.md` signals and git log, then resumes at the correct stage. Verification results (`VERIFIED`/`UNVERIFIED`) are persisted to `feedback.md` before reporting to the user, so even an interruption between verification and completion is recoverable.

### Verification Over Re-Evaluation

An earlier design re-ran the full evaluator/auditor agents after remediation — 3-5 agents re-scanning the entire codebase. This was token-expensive and redundant since the per-phase reviewers had already verified each fix.

The current design uses a single verification agent: one code reviewer with a targeted prompt that reads the original intake doc findings and verifys each specific `file:line` location. One agent, targeted scope, fraction of the tokens.

Evaluator and auditor agents run exactly once (during intake) and never again.

### Adversarial Plan Review

The Plan Reviewer doesn't just verify structure. It actively tries to break the plan:

- **Deadlock Search:** Is there a task ordering that would deadlock the implementer? (e.g., Task 3 needs output of Task 5)
- **False Positive Verification:** Could any verification checklist pass even with a wrong implementation?
- **Ambiguity Search:** Are there instructions that could be interpreted two valid ways by a zero-context engineer?
- **Missing Context:** Could the implementer get stuck because a task assumes knowledge not provided in Phase-0?

<br>

This is where the GAN analogy is most literal. The discriminator isn't checking if the plan *looks* good. It's trying to find failure modes.

## What The Pipeline Catches

In practice, the adversarial loops catch issues that single-pass generation consistently misses:

**Plan Review catches:**
- Hallucinated file paths (Planner says "modify" a file that doesn't exist)
- Phantom dependencies (Phase 2 assumes a model that Phase 1 never creates)
- Test strategies that require live cloud resources instead of mocks
- Ambiguous instructions that a zero-context engineer could misinterpret

<br>

**Code Review catches:**
- Placeholder tests (`expect(true).toBe(true)`)
- Deviations from Phase-0 architecture conventions
- Missing error path coverage (only happy paths tested)
- Hardcoded secrets and input validation gaps

<br>

**Verification catches:**
- Remediation targets that weren't actually addressed (file:line still has the issue)
- Regressions introduced during fixes (tests that passed before now fail)
- Partial fixes (the symptom changed but the root cause remains)

<br>

## Limitations and Honest Trade-offs

This pipeline is not free:

- **Token cost:** Multiple agents reviewing each other's work uses significantly more tokens than a single-pass approach. The adversarial loops can triple the total token usage for a feature.
- **Time:** A feature that takes one agent 10 minutes might take the pipeline 30-45 minutes with review loops.
- **Orchestrator context pressure:** The orchestrator accumulates agent result summaries. Long pipelines with many phases may hit context compression.
- **No nesting:** Claude Code agents can't spawn sub-agents, so the orchestrator manages all routing. This is a platform constraint, not a design choice.

<br>

The trade-off is worth it for features where correctness matters more than speed: anything touching auth, payments, data integrity, or infrastructure. For a quick script or prototype, single-pass is fine.

## Getting Started

Install by copying the `.claude/skills/` directory into your project:

```bash
git clone https://github.com/hatmanstack/claude-forge.git
cp -r claude-forge/.claude/skills/ /path/to/your-project/.claude/skills/
```

Then in your project:

```bash
# Feature development
/brainstorm I want to add webhook support for payment events
/pipeline 2026-03-12-payment-webhooks

# Full audit (health + eval + docs) — one command
/audit all
/pipeline 2026-03-16-audit-my-app

# Or run individual audits
/repo-eval
/repo-health
/doc-health
```

The pipeline handles the rest. You'll see progress reports between stages, and it'll stop and ask if anything needs human judgment.

---

<br>

Claude Forge is open source and available on [GitHub](https://github.com/hatmanstack/claude-forge). The pipeline is built entirely from Claude Code custom skills with no external tooling and no CI integration required. Just prompts, signals, and agents arguing with each other until the code is right.
