# Monas Architecture

**Monas Architecture** is a production-oriented monorepo that demonstrates how to build scalable and maintainable applications using modern software architecture principles and industry best practices.

The repository consists of three main applications:

- **Backend** — Spring Boot
- **Web** — Next.js
- **Mobile** — React Native

The **Web** and **Mobile** applications follow a consistent architectural approach and share similar code organization and reusable patterns wherever possible, making it easier to maintain and scale multiple client applications.

## Architecture

Monas Architecture is built around modern architectural patterns, including:

- Clean Architecture
- Hexagonal Architecture (Ports & Adapters)
- Domain-Driven Design (DDD)
- CQRS (Command Query Responsibility Segregation)
- Event-Driven Architecture
- Modular Monorepo Structure

## Best Practices

This project also demonstrates enterprise-level development practices such as:

- Feature-based project organization
- Shared libraries and reusable modules
- Dependency Injection
- Comprehensive testing strategy
- SOLID principles
- Separation of Concerns
- Scalable folder structure
- Consistent coding standards

## Goal

The primary goal of this repository is to provide a practical reference for developers who want to learn how to structure large-scale applications using modern architecture patterns and best practices.

Rather than being a simple demo project, Monas Architecture aims to illustrate how production-ready applications can be organized to remain maintainable, testable, and scalable as they grow.

# 🧩 Step 1 — Domain & Module Boundaries (DDD Foundation)

The application is divided into the following **Bounded Contexts**:

- Auth (login, registration, token management)
- Catalog (product listing)
- User Preferences (theme, device, layout)
- Notification (toast notifications, system messages)

## Architectural Approach

- Domain-Driven Design (DDD)
- Feature-based module structure
- Independent feature modules

Each feature follows the same internal structure:

```text
domain/
application/
infrastructure/
presentation/
```

> **Goal:** Feature independence with clear architectural boundaries.

## ✅ Step 1 Status

Step 1 has been completed.

### Shared Clean Architecture packages

- `packages/core/src/features/auth`
- `packages/core/src/features/catalog`
- `packages/core/src/features/user-preferences`
- `packages/core/src/features/notification`
- `packages/backend/auth-core` -> framework-independent auth domain and application core

### Application shells

- `apps/web` → Next.js web application
- `apps/mobile` → Reserved for the future React Native application
- `apps/backend/auth` → Spring Boot auth microservice
- `apps/backend/catalog` → Spring Boot catalog microservice

Each bounded context contains the following layers:

```text
domain/
application/
infrastructure/
presentation/
```

### Available routes

- `/` and `/login` → Authentication UI
- `/catalog` → Catalog UI skeleton
- `/preferences` → User Preferences UI skeleton
- `/notifications` → Notification UI skeleton
- `/docs` → Architecture documentation for Step 1

All pages are accessible through the main navigation.

### 📌 Project Rule

The `README.md` must be updated whenever a new architectural step or significant design change is introduced.

---

# 🧠 Step 2 — Authentication System (JWT Login Flow)

## Features

- Login
- User registration
- JWT-based session management
- Toast notification after successful login

## Applied Patterns

### ✔ Clean Architecture

```text
Presentation
    ↓
Application
    ↓
Domain
    ↓
Infrastructure
```

### ✔ Use Case Pattern

- `LoginUserUseCase`
- `RegisterUserUseCase`

### ✔ Repository Pattern

- `AuthRepository`
- `ApiAuthRepository`

### ✔ Value Objects

- `Email`
- `Password`
- `Token`

---

## Request Flow

The UI never communicates directly with the API.

```text
LoginPage
    ↓
LoginUserUseCase
    ↓
AuthRepository
    ↓
API Client
    ↓
Response
```

---

## Event-Driven Flow

After a successful login:

```text
UserLoggedInEvent
```

is published.

Subscribers:

- Toast system
- Analytics
- Navigation handler

## ✅ Step 2 Status

Step 2 has been completed.

### Auth bounded context

#### Domain

- `UserIdentity`
- `Password`
- `Token`
- `AuthSession`
- `AuthRepository`
- `UserLoggedInEvent`

#### Application

- `LoginUserUseCase`
- `RegisterUserUseCase`

#### Infrastructure

- `AuthApiClient`
- `ApiAuthRepository`
- `BrowserSessionStorage`

#### Presentation

- Functional Login and Register forms

### API Endpoints

#### `POST /user/login`

- `fikret / fikret` returns token `a125sdfg`
- Invalid credentials return **401 Unauthorized**

#### `POST /user/register`

- Returns a fake registration session

### Event-driven login flow

```text
LoginPageView
    ↓
LoginUserUseCase
    ↓
ApiAuthRepository
    ↓
POST /user/login
    ↓
UserLoggedInEvent
    ↓
AuthToastSubscriber
    ↓
Toast UI
```

The authentication token is stored in the browser's `localStorage` after a successful login.

### Composition

- `loginComposition.ts` is server-safe and constructs the use case, repository, and API client.
- Client components never import repositories or application services directly.
- Login actions execute through server actions.
- Browser-specific session persistence is delegated to a dedicated client adapter.
- Server Components are responsible for SEO metadata and server-side page content.
- Feature-specific controller contexts eliminate deep prop drilling within the presentation layer.

---

# 🧾 Step 3 — Product Catalog

## Features

- Retrieve products from the API
- Empty state handling
- Loading and error state management

## Applied Patterns

### ✔ CQRS

- `GetProductsQuery`
- Read-only UI

### ✔ State Pattern

```text
Loading
Empty
Loaded
Error
```

### ✔ Repository Pattern

- `ProductRepository`
- `ApiProductRepository`

---

## UI Flow

The UI only reacts to application state.

```text
CatalogPageView
    ↓
GetProductsQuery
    ↓
ProductRepository
    ↓
CatalogApiClient
    ↓
GET /api/products
    ↓
ProductListState
    ↓
ProductListStateView
```

---

## Empty State

If no products are returned:

```text
EmptyState
    ↓
NotFoundView
```

Conditional rendering is handled through the state model rather than explicit UI `if/else` statements.

## ✅ Step 3 Status

Step 3 has been completed.

### Catalog bounded context

#### Domain

- `Product`
- `ProductRepository`
- `ProductListMode`

#### Application

- `GetProductsQuery`
- `ProductListState`

#### Infrastructure

- `CatalogApiClient`
- `ApiProductRepository`

#### Presentation

- `CatalogPageView`
- `ProductListStateView`

### API Endpoint

#### `GET /api/products`

- Default → Product list
- `?mode=empty` → Empty state
- `?mode=error` → Error state

Rendering behavior for **Loading**, **Empty**, **Loaded**, and **Error** is fully managed through the state renderer map inside `ProductListStateView`.

---

# 🎨 Step 4 — UI Rendering Strategy System

One of the primary goals of this project is to completely decouple business logic from UI rendering.

The same data should be rendered differently depending on the current platform or user preferences.

## Rendering Examples

- Desktop → Grid layout
- Mobile → Vertical list
- Tablet → Hybrid layout
- User preference → Card style selection

## Applied Patterns

### ✔ Strategy Pattern

```text
ProductLayoutStrategy
    ├── GridStrategy
    ├── VerticalListStrategy
    └── HorizontalCarouselStrategy
```

### ✔ Factory Pattern

```text
LayoutStrategyFactory
```

Produces the appropriate rendering strategy based on:

- Device capabilities
- User preferences

### ✔ Device Abstraction

```text
DeviceCapabilityProvider
```

The UI never performs checks such as:

```ts
if (device === "mobile")
```

Device-specific behavior belongs to the architecture layer, not the presentation layer.

## Rendering Flow

```text
ProductPage
    ↓
LayoutStrategy.resolve()
    ↓
strategy.render(products)
```

---

# 🔔 Step 5 — Event-Driven Notification System

## Features

- Login success notifications
- Product added notifications
- System alerts

## Applied Patterns

### ✔ Event Bus

```text
EventBus.publish()
```

### ✔ Observer Pattern

- ToastSubscriber
- NotificationSubscriber
- AnalyticsSubscriber

## Example Flow

```text
UserLoggedInEvent
    ↓
ToastRequestedEvent
    ↓
ToastRenderer
    ↓
UI Toast
```

---

# 🚀 Future Enhancements

The following features will be added over time to further validate and stress-test the architecture.

## Favorites System

Features

- ProductFavoritedEvent
- Offline synchronization

Patterns

- Observer Pattern
- Repository Decorator

---

## Offline Cache Layer

Features

- API fallback cache
- Offline support

Patterns

- Decorator Pattern
- Cache-First Strategy

---

## Theme System

Features

- Light theme
- Dark theme
- Custom themes

Patterns

- Strategy Pattern
- State Machine

---

## Advanced Filtering

Features

- Price filtering
- Category filtering
- Stock filtering

Pattern

- Specification Pattern

---

## Form Validation

Validation belongs to the domain, not the UI.

Patterns

- Value Objects
- Result / Either Pattern

---

# 🏗️ Architectural Goals

One of the primary objectives of this repository is to demonstrate that business logic should remain independent of frameworks and implementation details.

For example:

- Replacing **Axios** with another HTTP client should only affect the infrastructure layer.
- Migrating the frontend from **React** to **Angular** should not require changes to the application or domain layers.
- Business rules should remain reusable regardless of the UI framework.

The architecture is intentionally designed so that business logic can outlive individual technologies.

---

# 🧱 General Architecture Principles

- The Presentation layer contains no business logic.
- Conditional rendering is limited to state machines or strategy implementations.
- API communication exists only within the Infrastructure layer.
- Features never communicate with each other directly.
- Cross-feature interaction happens through abstractions or domain events.
- Dependencies always point inward toward the Domain.
- Business rules remain framework-independent.

---

# 🧠 Philosophy

The purpose of this project is not simply to produce clean code.

Its goal is to demonstrate architectural discipline through real-world patterns and scalable design.

At the same time, the architecture should make it easy to:

- Add new features
- Replace implementations
- Test business logic independently
- Scale the application without increasing coupling
- Share business logic across multiple platforms
* Var olan kod bozulmadan genişleyebilmeli
* Bir modül değişince diğerleri etkilenmemeli
