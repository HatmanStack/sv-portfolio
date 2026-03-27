# Audit Remediation Plan: sv-portfolio

## Overview

This plan remediates findings from three audit documents: a codebase health audit (22 findings across critical/high/medium/low), a 12-pillar evaluation (all 12 pillars below the 9/10 target), and a documentation drift audit (10 drift, 3 gaps, 2 stale, 3 stale examples, 3 structure issues).

The work is sequenced subtractive-first: remove dead code and unused dependencies before making structural fixes, then add guardrails (linting, hooks, CI improvements), and finally fix documentation. This order prevents wasted effort on documenting or linting code that will be deleted, and ensures guardrails catch any regressions introduced during structural changes.

The scope is a SvelteKit 5 static portfolio site deployed via AWS Amplify. The codebase has ~40 source files, 20 test files, and 14 docs files (many stale). The tech stack is SvelteKit + adapter-static + MDSvex + Vite 8 + Vitest 4.

## Prerequisites

- Node.js v24 (managed via nvm)
- pnpm v9
- Git
- Familiarity with Svelte 5 runes syntax (`$state`, `$effect`, `$derived`)
- Access to the repository

## Phase Summary

| Phase | Tag | Goal | Est. Tokens |
|-------|-----|------|-------------|
| 0 | -- | Foundation: ADRs, conventions, testing strategy | ~5,000 |
| 1 | [HYGIENIST] | Dead code removal, unused deps, file cleanup | ~12,000 |
| 2 | [IMPLEMENTER] | Security hardening, type safety, CSS/component deduplication, sound API consolidation | ~30,000 |
| 3 | [FORTIFIER] | ESLint, Prettier, Husky, CI improvements | ~15,000 |
| 4 | [DOC-ENGINEER] | Fix all documentation drift, gaps, stale content; archive phase docs | ~10,000 |

## Navigation

- [Phase-0.md](./Phase-0.md) - Foundation (ADRs, conventions, testing strategy)
- [Phase-1.md](./Phase-1.md) - [HYGIENIST] Subtractive cleanup
- [Phase-2.md](./Phase-2.md) - [IMPLEMENTER] Structural fixes
- [Phase-3.md](./Phase-3.md) - [FORTIFIER] Guardrails and CI
- [Phase-4.md](./Phase-4.md) - [DOC-ENGINEER] Documentation remediation
- [feedback.md](./feedback.md) - Review feedback tracking
