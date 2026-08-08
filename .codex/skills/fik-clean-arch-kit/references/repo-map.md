# Repo Map

## Top Level

- `README.md`: broad project overview.
- `docs/`: architecture learning notes and project decisions.
- `packages/`: reusable code packages.
- `apps/`: runnable applications.
- `turbo.json` and root `package.json`: workspace orchestration for JavaScript/TypeScript packages.

## Backend

- `packages/backend/auth-core`: authentication core module.
- `packages/backend/catalog-core`: catalog core module.
- `apps/backend/auth`: runnable auth backend/adaptor app.
- `apps/backend/catalog`: runnable catalog backend/adaptor app.

Core modules use package names like:

- `com.monas.backend.auth.core.domain.model`
- `com.monas.backend.auth.core.domain.port`
- `com.monas.backend.auth.core.application.service`
- `com.monas.backend.auth.core.application.command`
- `com.monas.backend.auth.core.application.port`
- `com.monas.backend.auth.core.application.result`

## Frontend

- `packages/frontend-core/src/features/*/domain`
- `packages/frontend-core/src/features/*/application`
- `packages/frontend-core/src/features/*/infrastructure`
- `apps/web`: app shell and runtime integration.

## Discovery Commands

Use these from repo root:

```powershell
rg --files
rg "class .*UseCase|record .*Command|interface .*Repository" packages -g "*.java"
rg "describe\\(|it\\(|test\\(" packages apps
```

## Validation

Prefer module-local validation when possible. Inspect the relevant `pom.xml` or `package.json` before choosing commands.

Common candidates:

```powershell
mvn test
npm test
npm run lint
```

