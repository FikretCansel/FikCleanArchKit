# Catalog Core

Framework-independent catalog domain and application core.

## Layers

```text
domain/model      Product aggregate/value data
domain/port       Repository ports owned by the core
application/query CQRS query objects
application/handler Query handlers/use cases
```

Spring Boot, persistence, HTTP, and other adapters live in `apps/backend/catalog`.
