---
name: fik-clean-arch-kit
description: Project onboarding and implementation guidance for the FikCleanArchKit repository. Use when Codex is working inside this repo, changing backend clean architecture modules, frontend feature modules, tests, architecture rules, package boundaries, or when it needs to understand the repo layout, conventions, and validation commands before making changes.
---

# FikCleanArchKit

Use this skill as the first project-specific context pass when working in this repository.

## Start Here

1. Inspect the files related to the user's request before editing.
2. Prefer existing package structure and naming over introducing new conventions.
3. Keep changes close to the affected module.
4. Treat `packages/*` as reusable core libraries and `apps/*` as runnable/adaptor layers.
5. For backend code, preserve clean architecture dependency direction.

## Repo Shape

- `packages/backend/*-core`: backend core modules. Keep these framework-independent.
- `apps/backend/*`: runnable Spring/adaptor applications around backend core modules.
- `packages/frontend-core`: reusable frontend feature code.
- `apps/web`: runnable web app.
- `docs/`: architecture notes and project explanations.

Read `references/repo-map.md` when you need a quick map of modules, commands, or file locations.

## Backend Rules

- Domain owns business concepts, value objects, entities, and domain ports.
- Application owns use cases, commands, results, application ports, and orchestration.
- Infrastructure/adaptor code belongs outside core packages unless the module already has a local convention for it.
- Core modules should not depend on Spring, persistence frameworks, web controllers, or external service implementations.
- Use value objects at domain boundaries instead of passing raw primitives deeper than necessary.

Read `references/backend-clean-architecture.md` before changing backend module boundaries, ports, use cases, or domain models.

## Testing Rules

- Domain tests verify invariants of value objects and domain models.
- Use case tests verify workflow behavior through ports and mocks/fakes.
- Do not repeat every domain invariant in use case tests; verify that the use case crosses the domain boundary correctly.
- Use ArchUnit for architectural constraints, not for restating guarantees already enforced by Java types.

Read `references/testing-guidelines.md` before adding or changing tests.

