---
title: 'Claude Forge'
description: 'A GAN-inspired adversarial pipeline for Claude Code where separate agents generate and critique code in iterative loops.'
date: 'Mar 12, 2026'
time: '7 min read'
---

# Adversarial AI Development Pipeline

What if your AI coding assistant could argue with itself and produce better code because of it?

Claude Forge is an adversarial development pipeline for Claude Code that borrows from Generative Adversarial Networks (GANs). Instead of one AI agent writing code and hoping for the best, separate agents generate and critique each other's work in iterative loops until the output converges on something solid.

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

## The Pipeline

The full workflow has two phases: an interactive brainstorm with a human, then an automated build cycle where agents handle everything.

### Phase 1: Brainstorm (Human in the Loop)

You start with a feature idea. The brainstorm skill explores your codebase, then asks you 5-15 clarifying questions, one at a time, preferring multiple choice:

```
The codebase uses DynamoDB for storage. For this feature's data, should we:

A) Add tables to the existing DynamoDB setup
B) Use a different storage approach (e.g., S3 for documents)
C) Both — DynamoDB for metadata, S3 for content
```

Questions follow a priority order: scope first, then architecture, data model, user-facing behavior, and non-functional requirements. The goal is to front-load the high-impact decisions so the AI planner doesn't have to guess.

The output is a structured brainstorm document, not a conversation transcript but a distilled set of decisions, scope boundaries, and codebase context that the Planner agent can consume without any prior conversation history.

### Phase 2: Automated Pipeline (Agents Only)

Once the brainstorm is complete, you kick off the pipeline and step back. The orchestrator spawns agents in sequence, routing signals between them:

![Diagram titled Extended Pipeline Agent Workflow featuring a 3D character at a laptop. Workflow stages: brainstorming, planning, implementation, and final review, with stages depicted in orange boxes connected by arrows. Includes steps like codebase exploration, design spec production, and assessments (GO/NO-GO). Tone: systematic and organized.](/blog/arch.jpeg)

Each GAN loop runs up to 3 iterations before escalating to the human. This prevents infinite cycles while still giving agents room to converge.

If the loop times out or you reach a token limit just restart with `/pipeline 2026-03-12-user-auth` and the pipeline picks up where it left off.

## Design Decisions That Make It Work

### Phase-0: "The Law"

Every plan starts with a Phase-0 document that defines the immutable rules: tech stack, testing strategy, deployment approach, shared patterns, commit format. Every subsequent phase inherits from it. Every reviewer checks against it.

This solves a common problem with multi-agent systems: drift. Without a shared source of truth, Agent A might decide to use Jest while Agent B sets up Vitest. Phase-0 prevents that by establishing conventions before any code is written.

### The Zero-Context Engineer

The Planner writes for a fictional engineer who is:

- Skilled but has **zero context** on the codebase
- Unfamiliar with the toolset and problem domain
- **Will follow instructions precisely**
- **Will not infer missing details** — if it's not in the plan, it won't happen

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

### Immutable Plans, Mutable Feedback

A subtle but important rule: **reviewers cannot modify plan documents.** All feedback goes into a separate `feedback.md` file, tagged by source:

```markdown
### PLAN_REVIEW - Iteration 1 - Phase 1, Task 3

> **Consider:** This task says "Modify src/utils/date.js" but Glob
> shows that file doesn't exist. Should this be "Create"?

**Status:** OPEN
```

This separation means the plan remains a clean, auditable record of intent. The feedback file becomes the conversation log between generators and discriminators. When a generator resolves feedback, it moves the item to a "Resolved" section with a resolution note, creating a clear audit trail of what was caught and how it was fixed.

### Adversarial Plan Review

The Plan Reviewer doesn't just verify structure. It actively tries to break the plan:

- **Deadlock Search:** Is there a task ordering that would deadlock the implementer? (e.g., Task 3 needs output of Task 5)
- **False Positive Verification:** Could any verification checklist pass even with a wrong implementation?
- **Ambiguity Search:** Are there instructions that could be interpreted two valid ways by a zero-context engineer?
- **Missing Context:** Could the implementer get stuck because a task assumes knowledge not provided in Phase-0?

<br>

This is where the GAN analogy is most literal. The discriminator isn't checking if the plan *looks* good. It's trying to find failure modes.

### Token Budgeting

Each phase targets ~50,000 tokens, sized to fit in a single agent context window. The Plan Reviewer enforces this: phases under 25k should be combined, phases over 75k should be split.

This isn't arbitrary. An agent that runs out of context mid-phase will lose critical information. By sizing phases to fit comfortably within a context window, each Implementer agent can hold the complete Phase-0 (conventions) plus the full Phase-N (tasks) without compression.

### Date-Based Plan Versioning

Plans use `YYYY-MM-DD-feature-slug` naming:

```
docs/plans/
├── 2026-03-01-user-auth/
├── 2026-03-12-notifications/
└── 2026-03-20-billing-webhooks/
```

This is intentionally decoupled from release versions. Plans are audit artifacts, committed to the repo as a record of what was designed, what feedback was given, and how it was resolved. Tying them to release versions creates collision problems when features slip between releases or when you cut a release without a formal plan.

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

**Final Review catches:**
- Integration failures between phases (Phase 2 broke Phase 1's tests)
- Dead code (Phase 1 exports that Phase 2 never used)
- Inconsistent error handling across phase boundaries
- Scope drift from the original spec

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
git clone https://github.com/yourusername/claude-forge.git
cp -r claude-forge/.claude/skills/ /path/to/your-project/.claude/skills/
```

Then in your project:

```bash
# Interactive brainstorm
/brainstorm I want to add webhook support for payment events

# Automated pipeline (use the slug from brainstorm output)
/pipeline 2026-03-12-payment-webhooks
```

The pipeline handles the rest. You'll see progress reports between stages, and it'll stop and ask if anything needs human judgment.

---

<br>

Claude Forge is open source and available on [GitHub](https://github.com/yourusername/claude-forge). The pipeline is built entirely from Claude Code custom skills with no external tooling and no CI integration required. Just prompts, signals, and agents arguing with each other until the code is right.
