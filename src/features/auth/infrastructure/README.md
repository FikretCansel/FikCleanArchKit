# Auth Infrastructure

Owns auth-specific external details such as API repositories and auth API contracts.
Generic HTTP transport adapters live in `src/shared/http`.
UI code must not import this layer directly.
