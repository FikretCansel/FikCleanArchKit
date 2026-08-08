# Backend Clean Architecture

## Dependency Direction

Keep dependencies pointing inward:

```text
apps/backend/* -> packages/backend/*-core application -> domain
```

Do not make domain depend on application, infrastructure, Spring, persistence, or web concerns.

## Domain Layer

Use for:

- Value objects such as `Username`.
- Entities and domain models such as `User` or `Product`.
- Domain ports such as repositories when they represent domain needs.
- Business invariants that must hold everywhere.

Prefer constructors/records that normalize and validate their own invariants.

## Application Layer

Use for:

- Use cases and query handlers.
- Commands and results.
- Application ports such as hashing, token issuing, or external gateways.
- Translating input into domain concepts and coordinating workflow.

Use cases may construct domain value objects, call domain/application ports, and map exceptions to application-level behavior. Avoid leaking framework concerns into use cases.

## Apps And Adapters

Use runnable app modules for:

- Spring configuration.
- Controllers.
- Persistence adapters.
- Security/JWT/BCrypt implementations.
- Wiring core ports to concrete implementations.

## Design Preference

Keep the first version simple. Add abstractions only when they protect a real boundary or remove meaningful duplication.

