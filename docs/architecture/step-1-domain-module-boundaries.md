# Step 1 - Domain & Module Boundaries

The shared frontend core is split into independent bounded contexts under
`packages/core/src/features`.
Each feature owns the same Clean Architecture layers:

```text
domain/
application/
infrastructure/
presentation/
```

## Bounded Contexts

| Context | Responsibility |
| --- | --- |
| Auth | Login, register, token ownership and session boundaries |
| Catalog | Product listing and product read state |
| User Preferences | Theme, device, layout and rendering preferences |
| Notification | Toast requests, system messages and notification rendering |

## Dependency Rule

Dependencies point inward:

```text
presentation -> application -> domain
infrastructure -> domain
```

`presentation` may ask `application` to do work. `application` may depend on
domain interfaces. `infrastructure` implements domain/application contracts.
Features should communicate through shared abstractions such as events instead
of importing each other directly.

## Current Scope

This step intentionally creates the architectural foundation only. Concrete use
cases, repositories, value objects, API routes and UI flows belong to later
steps.

## Workspace Layout

```text
apps/
  web/
  mobile/
  backend/
packages/
  core/
```

`apps/web` owns the Next.js route shell and composition roots. `apps/mobile` is
reserved for the future React Native shell. `apps/backend` is reserved for the
future Spring Boot backend. Shared business rules and feature boundaries stay in
`packages/core`.
