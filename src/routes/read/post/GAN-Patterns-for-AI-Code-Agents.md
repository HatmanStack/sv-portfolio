---
title: ' GANs in Multi-Agent Code Generation'
description: 'How adversarial feedback loops between AI coding agents with isolated context windows catch bugs that single-pass generation misses.'
date: 'Mar 23, 2026'
time: '15 min read'
---

Ask an AI coding agent to build a feature and it will probably do a decent job. Ask it to review its own work and it will tell you everything looks great. This is the fundamental problem with single-pass AI code generation: the same context that created the code is the one evaluating it. There is no adversarial pressure. No second opinion. No fresh eyes.

What if you could structure the work so that separate agents generate and critique each other in iterative loops, the way a generator and discriminator improve each other in a GAN? The code that reaches you has already survived an argument between agents who disagreed about whether it was good enough.

This article walks through why that pattern works, how to build it, and when it is (and is not) worth the extra tokens. The concrete example is an open source project called [Claude Forge](https://github.com/HatmanStack/claude-forge), but the ideas are framework-agnostic. Anything that supports subagent spawning with fresh context windows can implement this pattern.

## Table of Contents

- [The Single-Pass Problem](#the-single-pass-problem)
- [What the Ecosystem Is Solving](#what-the-ecosystem-is-solving)
- [The GAN Pattern Applied to Code](#the-gan-pattern-applied-to-code)
- [Why Rhetorical Questions Outperform Direct Instructions](#why-rhetorical-questions-outperform-direct-instructions)
- [Feedback as Filesystem](#feedback-as-filesystem)
- [The Zero-Context Engineer](#the-zero-context-engineer)
- [Phase-0: Immutable Conventions](#phase-0-immutable-conventions)
- [Convergence Design: Knowing When to Stop](#convergence-design-knowing-when-to-stop)
- [Ground Truth Documents and the Pipeline](#ground-truth-documents-and-the-pipeline)
- [What the Adversarial Loop Actually Catches](#what-the-adversarial-loop-actually-catches)
- [Honest Trade-offs](#honest-trade-offs)
- [When to Use This (And When Not To)](#when-to-use-this-and-when-not-to)
- [Getting Started](#getting-started)

## The Single-Pass Problem

The AI generates code in one pass. If it hallucinates a file path, misunderstands the architecture, or writes tests that do not actually test anything, you catch it during review. Or worse, you do not.

This is not a hypothetical. Anyone who has used AI coding agents at scale has seen placeholder tests like `expect(true).toBe(true)`, phantom dependencies where Phase 2 assumes a model that Phase 1 never creates, and instructions so ambiguous that two valid interpretations exist. These are not rare edge cases. They are the predictable failure mode of single-pass generation.

The problem compounds with task complexity. A simple utility function generates fine in one pass. An auth middleware with token refresh, error handling, rate limiting, and logging across multiple files? The agent starts cutting corners, because the entire generation happened inside one context window that is simultaneously tracking the plan, the code, the tests, and the growing weight of its own prior reasoning.

## What the Ecosystem Is Solving

There is a growing ecosystem of frameworks tackling different aspects of this problem. They each bring real contributions worth understanding.

**Superpowers** focuses on development methodology. It uses subagent-driven development, TDD enforcement, and multi-stage review. The framework generates a design spec, then an implementation plan, then dispatches subagents to execute. Review subagents check the output, and if they find issues, the implementer revises and gets re-reviewed until approved.

**Get Shit Done (GSD)** focuses on context engineering. Its key insight is fighting context window degradation through fresh 200k subagent contexts, parallel wave execution, and XML-structured plans. A JavaScript CLI handles the deterministic work (tracking progress, dependency ordering, context budgets) so the LLM never wastes tokens on bookkeeping it would do unreliably anyway.

Both frameworks share a crucial design decision: fresh context windows. When an agent has been reasoning for 100k tokens, its attention degrades. By spawning subagents with clean 200k contexts, these frameworks sidestep the "context rot" problem that plagues long-running agent sessions.

Where these frameworks diverge is in how they handle quality assurance. GSD relies on mechanical verification: lint, test, type-check, and auto-fix retries if the checks fail. There is no agent reading another agent's code to assess whether it matches the spec's intent. The "review" is whether `npm run test` passes.

Superpowers does have agent-to-agent review with iterative loops. But the review is enforced by in-context instructions, which means the agent can (and frequently does) rationalize skipping the review step to save tokens. This is a known issue in the project. When review enforcement lives inside the same prompt that the model is also using to make efficiency decisions, the model sometimes decides that review is not worth the cost.

The adversarial GAN pattern addresses this differently. Instead of asking an agent to review its own work or trusting in-context instructions to enforce review, it structures the pipeline so that **review is architecturally mandatory**. The reviewer is a separate agent that cannot be skipped, because the orchestrator will not advance the pipeline without the reviewer's signal. The reviewer cannot modify source code, only `feedback.md`. The generator cannot approve its own output. Role separation is enforced by the system, not suggested by the prompt.

## The GAN Pattern Applied to Code

In machine learning, GANs pit two networks against each other: a generator creates content, a discriminator evaluates it, and the feedback loop between them drives both to improve. The generator gets better at producing realistic output. The discriminator gets better at finding flaws. The adversarial tension is what produces quality.

Applied to software development, this creates two stacked feedback loops:

![Diagram comparing generator and discriminator roles in GAN loops. Top: Planner (Generator) vs Plan Reviewer (Discriminator). Bottom: Implementer (Generator) vs Reviewer (Discriminator). Arrows indicate iterative feedback between each pair.](/blog/gan.jpeg)

Each role runs as a **separate agent with its own fresh context window**. The Plan Reviewer has never seen the Planner's reasoning process. It only sees the output. The Code Reviewer has never seen the Implementer's struggles. It only sees the code.

This separation fundamentally changes what the reviewer can catch. When a reviewer shares context with the generator, it inherits the generator's blind spots. When a reviewer starts fresh, it reads the plan the way an actual engineer would: with no assumptions about what the author "meant" versus what they wrote.

The adversarial Plan Reviewer does not just verify structure. It actively tries to break the plan:

- **Deadlock search:** Is there a task ordering that would deadlock the implementer? (Task 3 needs the output of Task 5.)
- **False positive verification:** Could any verification checklist pass even with a wrong implementation?
- **Ambiguity search:** Are there instructions that could be interpreted two valid ways?
- **Missing context:** Could the implementer get stuck because a task assumes knowledge not provided?

<br>

This is where the GAN analogy is most literal. The discriminator is not checking if the plan looks good. It is trying to find failure modes.

## Why Rhetorical Questions Outperform Direct Instructions

When a reviewer finds an issue, there are two ways to communicate it.

**Direct instruction:**

```
Fix line 45: the error handler returns 500 instead of 401 for invalid tokens.
```

**Rhetorical question:**

```
Consider: The test test_invalid_token_rejection expects a 401 status code.
Are you returning the correct HTTP status in your error handling?

Think about: In src/auth/middleware.js:45, what happens when the token is
invalid? Is the error properly caught?

Reflect: Look at how other middleware handles auth errors. Are you following
the same pattern?
```

The direct instruction produces a mechanical edit. The agent changes line 45 and moves on. The rhetorical question produces a deeper investigation. The agent re-examines the surrounding code, considers the pattern used elsewhere, and is more likely to find the root cause rather than just patching the symptom.

This maps to how the underlying models work. When given an explicit instruction, the model follows it literally. When guided to reason about a problem, it activates a broader search through its understanding of the codebase. The fix addresses related issues that a mechanical edit would miss.

Reviewer prompts structured around "Consider," "Think about," and "Reflect" prefixes consistently produce better fixes than "Fix" or "Change" directives. The implementer agent receives these as feedback in `feedback.md` and addresses them in the next iteration of the GAN loop.

## Feedback as Filesystem

Most agent orchestration systems rely on some form of message passing: API calls, databases, queue systems, in-memory state. These all work, but they introduce infrastructure dependencies and make the agent conversation opaque after the fact.

An alternative: use the filesystem as the message bus and git as the orchestration layer.

All agent communication flows through `feedback.md`, a structured markdown file with two sections:

```markdown
## Active Feedback (OPEN)

### FB-001: Auth middleware missing rate limiting
- **Status:** OPEN
- **Source:** Plan Reviewer
- **Phase:** 1
- **Detail:** The plan specifies JWT validation but does not address rate
  limiting for failed auth attempts. Consider: what happens if an attacker
  brute-forces tokens?

## Resolved Feedback

### FB-000: Missing error codes in API spec
- **Status:** RESOLVED
- **Resolution:** Added error code table to Phase-0 conventions
```

This design has several properties that matter in practice:

**Full audit trail.** Every piece of feedback, every resolution, every signal is committed to git alongside the code it produced. When you want to understand why the auth middleware was designed a certain way, the conversation that shaped it is right there in the commit history.

**State recovery.** If a pipeline gets interrupted (token limits, network issues, you need to step away), resuming is trivial. The orchestrator re-reads `feedback.md` and `git log`, determines what stage the pipeline reached, and picks up where it left off. No cloud infrastructure, no database, no queue. Just files.

**Transparency.** You can read the agent conversation in your editor. You can see exactly what the reviewer flagged, exactly how the implementer responded, and whether the resolution actually addressed the concern.

Agents communicate through structured signals routed by the orchestrator:

- `PLAN_COMPLETE` / `REVISION_REQUIRED` / `PLAN_APPROVED` (plan GAN loop)
- `IMPLEMENTATION_COMPLETE` / `CHANGES_REQUESTED` / `PHASE_APPROVED` (code GAN loop)
- `GO` / `NO-GO` (final gate)
- `VERIFIED` / `UNVERIFIED` (post-remediation verification)

<br>

Each signal marks a state transition. The orchestrator reads the signal, determines the next agent to invoke, and passes it the relevant context. The orchestrator itself is a Claude Code session, but the agents it spawns are fresh subagents with clean context windows.

## The Zero-Context Engineer

One of the most effective constraints in the system is the "zero-context engineer" framing. The Planner writes every plan as if it will be executed by an engineer who:

- Is skilled but has **zero context** on the codebase
- Is unfamiliar with the toolset and problem domain
- Will follow instructions precisely
- Will not infer missing details. If it is not in the plan, it will not happen.

<br>

This constraint forces explicit instructions. No "add the usual auth middleware." Instead: which library, which pattern, which error codes, which files to create, which existing files to modify, and how to verify the result.

The Plan Reviewer then simulates this zero-context experience: "If I knew nothing about this codebase, could I follow these instructions and produce a working result?"

This framing catches a class of failures that are invisible to someone with context. The author of the plan knows what they meant. The zero-context reviewer only knows what is written. The gap between intention and specification is where bugs live.

## Phase-0: Immutable Conventions

Every pipeline run starts with a Phase-0 document that defines immutable rules: tech stack, testing strategy, deployment approach, shared patterns, commit format. Every subsequent phase inherits from Phase-0. Every reviewer checks against it.

This solves a common multi-agent problem: drift. Without a shared source of truth, Agent A might decide to use Jest while Agent B sets up Vitest. Agent C might use a different error handling pattern than Agent D. Phase-0 prevents this by establishing conventions before any code is written.

The conventions are not suggestions. They are constraints that every agent in the pipeline must respect, and every reviewer must verify against.

## Convergence Design: Knowing When to Stop

An adversarial loop without exit conditions is just two agents arguing forever. The convergence design has three mechanisms:

**Iteration caps.** Each GAN loop (plan review, code review) runs a maximum of 3 iterations. If the planner and reviewer cannot converge in 3 rounds, the issue requires human judgment, not more machine cycles.

**Signal protocol.** The structured signals (`PLAN_APPROVED`, `GO`, `NO-GO`) are explicit state transitions, not suggestions. When the final reviewer issues `NO-GO`, the pipeline rolls back the phase. There is no "let us try one more time." The rollback is automatic.

**Token budget.** Each phase targets roughly 50k tokens with a 75k hard ceiling. This prevents any single phase from consuming the entire context budget and ensures the orchestrator retains enough headroom to manage the pipeline.

These caps exist because adversarial loops have a cost curve. The first iteration catches major issues. The second iteration catches subtle issues. The third iteration catches edge cases. A fourth iteration almost never catches anything the previous three missed, but it costs just as many tokens. Three iterations hit the sweet spot between thoroughness and efficiency.

## Ground Truth Documents and the Pipeline

The adversarial pipeline does not start from a vague prompt. Every workflow begins with an intake skill that produces a structured ground truth document. The pipeline then runs from that document, not from the original user request.

### Brainstorm: Turning Ideas into Specs

The `/brainstorm` skill is the feature creation workflow. Given a feature idea, it first explores the codebase to understand the existing architecture, tech stack, and patterns. Then it asks 5-15 clarifying questions designed to front-load high-impact decisions:

```
The codebase uses DynamoDB for storage. For this feature's data, should we:

A) Add tables to the existing DynamoDB setup
B) Use a different storage approach (e.g., S3 for documents)
C) Both - DynamoDB for metadata, S3 for content
```

These are not generic questions. They are grounded in what the skill found during codebase exploration. The skill identifies the real decision points for this specific project and surfaces them before any planning or code generation begins.

The output is `brainstorm.md`, a structured design spec. Not a conversation transcript, but a distilled set of decisions that the Planner agent can consume cold. This document becomes the single source of truth for the entire pipeline run.

### Repository Evaluation, Health, and Documentation Audits

The same ground-truth-document pattern applies to the audit workflows:

- `/repo-eval` spawns three evaluator agents in parallel (the Pragmatist, the Oncall Engineer, the Team Lead), each scoring the codebase from a different lens across 12 pillars. The output is `eval.md`.
- `/repo-health` runs a technical debt auditor across four vectors (architectural, structural, operational, hygiene). The output is `health-audit.md`.
- `/doc-health` runs six detection phases comparing documentation against actual code. The output is `doc-audit.md`.
- `/audit` runs any combination of the above. It asks scoping questions once, then spawns up to 5 agents in parallel (3 evaluators + health auditor + doc auditor). All intake documents land in one directory.

<br>

Each of these intake skills produces a read-only assessment. The agents doing the evaluation never modify the codebase. They only write their findings into the intake document.

### The Pipeline Runs from Ground Truth

The `/pipeline` skill reads whatever intake documents exist and runs the adversarial GAN loop from them. For a feature, it reads `brainstorm.md`. For an audit, it reads whichever combination of `eval.md`, `health-audit.md`, and `doc-audit.md` are present.

![Diagram of the extended pipeline agent workflow. Shows brainstorm exploring the codebase and producing a design spec, which feeds into the pipeline orchestrator. The orchestrator routes through three stages: Planning (Planner and Plan Reviewer in a GAN loop, max 3 iterations), Implementation (Implementer and Reviewer in a GAN loop, max 3 iterations), and Final Review (GO or NO-GO gate).](/blog/arch.jpeg)

When multiple intake documents exist (from a combined audit), the Planner reads all findings together and consolidates overlapping concerns into a single unified plan. Phases are tagged by implementer type and ordered:

1. `[HYGIENIST]` phases first, subtractive cleanup (deleting dead code, simplifying over-abstractions)
2. `[IMPLEMENTER]` phases next, structural fixes on clean code
3. `[FORTIFIER]` phases next, locking in the clean state (linting, CI checks, git hooks)
4. `[DOC-ENGINEER]` phases last, documentation reflecting final code

<br>

The ordering matters. You do not want the implementer building on top of dead code that the hygienist would have removed. You do not want the doc-engineer documenting an API that the fortifier is about to add validation to.

This separation between intake and pipeline is deliberate. The intake skills are exploratory and interactive. They ask questions, explore the codebase, and produce a document. The pipeline is autonomous. It reads the document and runs through the adversarial loops with minimal human intervention, stopping only at explicit decision points.

## What the Adversarial Loop Actually Catches

In practice, the adversarial loops catch issues that single-pass generation consistently misses.

**Plan Review catches:**
- Hallucinated file paths (the Planner says "modify" a file that does not exist)
- Phantom dependencies (Phase 2 assumes a model that Phase 1 never creates)
- Test strategies that require live cloud resources instead of mocks
- Ambiguous instructions that a zero-context engineer could misinterpret
- Deadlocks in task ordering (Task 3 needs the output of Task 5)

<br>

**Code Review catches:**
- Placeholder tests (`expect(true).toBe(true)`)
- Deviations from Phase-0 architecture conventions
- Missing error path coverage (only happy paths tested)
- Hardcoded secrets and input validation gaps

<br>

**Verification catches:**
- Remediation targets that were not actually addressed
- Regressions introduced during fixes
- Partial fixes where the symptom changed but the root cause remains

<br>

An earlier design re-ran the full evaluator or auditor agents after remediation, 3-5 agents re-scanning the entire codebase. This was token-expensive and redundant since the per-phase reviewers had already verified each fix. The current design uses a single verification agent with a targeted scope: read the original intake document findings and check each specific `file:line` location. One agent, targeted scope, a fraction of the tokens. Evaluator and auditor agents run exactly once (during intake) and never again.

## Honest Trade-offs

This pipeline is not free, and pretending otherwise would be dishonest.

**Token cost.** Multiple agents reviewing each other's work uses significantly more tokens than a single-pass approach. The adversarial loops can triple the total token usage for a feature. On a subscription plan, this means hitting session limits faster. On API billing, this means real money.

**Time.** A feature that takes one agent 10 minutes might take the pipeline 30-45 minutes with review loops. Multi-agent frameworks in general are slower than single-pass. The adversarial loops add time on top of the orchestration overhead that any multi-agent system carries.

**Orchestrator context pressure.** The orchestrator accumulates agent result summaries across phases. Long pipelines with many phases may hit context compression, which degrades the orchestrator's ability to route effectively.

**Not fire-and-forget.** Despite the automation, complex features benefit from human checkpoints. The pipeline stops and asks for judgment at key moments. If you skip those checkpoints, you may end up with technically correct code that misses the actual requirement.

**Diminishing returns on simple tasks.** For a quick script, a utility function, or a prototype, the adversarial overhead is pure waste. Single-pass generation is faster, cheaper, and sufficient.

The trade-off is worth it for features where correctness matters more than speed: anything touching auth, payments, data integrity, or infrastructure. When the cost of a bug in production exceeds the cost of the extra tokens to prevent it, the math works. For everything else, single-pass is fine.

## When to Use This (And When Not To)

**Use adversarial multi-agent patterns when:**
- The feature touches authentication, authorization, or session management
- The code handles payments or financial transactions
- Data integrity is critical (migrations, schema changes, ETL pipelines)
- Infrastructure changes could affect production (IaC, CI/CD modifications)
- The codebase is unfamiliar to the agents (large legacy systems)

<br>

**Use single-pass generation when:**
- Prototyping or exploring an idea
- Writing utility scripts or one-off tools
- Making small, well-scoped changes to familiar code
- Speed matters more than thoroughness
- You will review the output carefully yourself anyway

<br>

## Getting Started

Claude Forge is built entirely from Claude Code custom skills. No external tooling, no CI integration required. Install by copying the skills directory into your project:

```bash
git clone https://github.com/hatmanstack/claude-forge.git
cp -r claude-forge/.claude/skills/ /path/to/your-project/.claude/skills/
```

Then in your project:

```bash
# Feature development
/brainstorm I want to add webhook support for payment events
/pipeline 2026-03-12-payment-webhooks

# Full audit (health + eval + docs), one command
/audit all
/pipeline 2026-03-16-audit-remediation

# Individual audits
/repo-eval
/repo-health
/doc-health
```

The pipeline handles the orchestration. You will see progress reports between stages, and it will stop and ask when something needs human judgment.

The adversarial pattern (separate generator and discriminator with isolated context windows, structured feedback as the communication channel, iteration caps for convergence) can be implemented in any agent system that supports subagent spawning with fresh contexts. The specific implementation uses Claude Code skills, but the pattern is the contribution, not the tooling.

Sometimes the best code comes from the argument, not the agreement.
