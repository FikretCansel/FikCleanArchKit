# 7. Clean Architecture

Hexagonal Architecture önemli bir adım olsa da büyük sistemlerde başka bir problem ortaya çıktı:

## Katmanlar Arası Karmaşık Bağımlılıklar

```text
Controller → Service
Service → Repository
Repository → Service
Service → Util
Util → Repository
```

Katmanlar birbirine karışmaya başladı.

Bunun üzerine **Robert C. Martin (Uncle Bob)** tarafından **Clean Architecture** ortaya konuldu.

---

# 8. Clean Architecture’ın Temel İlkesi

## Bağımlılık Kuralı

> **Bağımlılıklar her zaman içeriye doğru akmalıdır.**

### Yapı

```text
┌──────────────────────┐
│   Frameworks / DB    │
├──────────────────────┤
│   Interface Adapters │
├──────────────────────┤
│      Use Cases       │
├──────────────────────┤
│       Entities       │
└──────────────────────┘
```

---

## Katmanlar

### 1. Entities

En temel iş kuralları burada bulunur.

```java
public class Order {

    private final BigDecimal total;

    public Order(BigDecimal total) {
        if (total.compareTo(BigDecimal.ZERO) <= 0) {
            throw new IllegalArgumentException();
        }
        this.total = total;
    }
}
```

Özellikleri:

* Spring yok,
* JPA yok,
* HTTP yok,
* sadece iş kuralı var.

---

### 2. Use Cases

Uygulamanın yaptığı işlemleri tanımlar.

```java
public class CreateOrderUseCase {

    private final OrderRepository repository;

    public void execute(BigDecimal total) {
        repository.save(new Order(total));
    }
}
```

---

### 3. Interface Adapters

Controller, DTO ve mapper’lar burada bulunur.

---

### 4. Frameworks & Drivers

* Spring Boot
* PostgreSQL
* Redis
* Kafka
* REST
* GraphQL

Bu katman **en dışta** yer alır.

---