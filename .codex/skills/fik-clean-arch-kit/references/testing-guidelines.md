# Testing Guidelines

## Domain Tests

Test domain invariants directly in domain tests.

For a value object like `Username`, test examples such as:

- rejects `null`
- trims surrounding whitespace
- rejects values shorter than the minimum length
- preserves valid normalized value

These tests should not need mocks.

## Use Case Tests

Use case tests should focus on workflow:

- calls the right port with the right domain object
- returns expected result on success
- throws the expected application exception on failure
- does not perform later steps after an earlier failure

It is enough to verify that raw command data is converted into the expected domain object at the boundary. Do not duplicate every value object invariant here.

Example pattern:

```java
verify(repository).findByUsername(new Username("fikret"));
```

This verifies that the use case crossed from raw command input into the domain value object without retesting all `Username` rules.

## ArchUnit

Use ArchUnit for architectural rules:

- core modules do not depend on Spring
- domain does not depend on application
- application does not depend on infrastructure
- adapters depend inward, not the reverse

Avoid ArchUnit rules that only restate Java type-system guarantees. For example, if a repository method accepts `Username`, a use case cannot call it with another type without a compile error.

