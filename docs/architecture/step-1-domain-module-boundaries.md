# Step 1 - Domain & Module Boundaries

The frontend is split into independent bounded contexts under `src/features`.
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
