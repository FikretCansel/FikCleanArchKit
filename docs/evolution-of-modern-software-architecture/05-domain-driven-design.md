# 9. DDD (Domain-Driven Design)

Clean Architecture bir **mimari yaklaşım**dır. DDD ise bir **tasarım metodolojisidir**.

## Temel Fikir

> **“Yazılımın merkezinde domain (iş alanı) olmalıdır.”**

Örneğin bir banka sistemi geliştiriyorsak önemli olan:

* hesap,
* bakiye,
* transfer,
* günlük limit,
* para çekme kurallarıdır.

Framework değil.

---

# 10. Anemic Model Problemi

Kötü örnek:

```java
public class Account {
    private BigDecimal balance;

    public BigDecimal getBalance() {
        return balance;
    }

    public void setBalance(BigDecimal balance) {
        this.balance = balance;
    }
}
```

Burada nesne sadece veri taşır.

İş kuralı başka yerde olur:

```java
if (account.getBalance().compareTo(amount) >= 0) {
    account.setBalance(account.getBalance().subtract(amount));
}
```

Bu yaklaşım **Anemic Domain Model** olarak adlandırılır.

---

# 11. Rich Domain Model

DDD’nin önerdiği yaklaşım:

```java
public class Account {

    private BigDecimal balance;

    public void withdraw(BigDecimal amount) {

        if (balance.compareTo(amount) < 0) {
            throw new InsufficientBalanceException();
        }

        balance = balance.subtract(amount);
    }
}
```

Artık:

* veri + davranış birlikte,
* geçersiz durumlar engelleniyor,
* kapsülleme (encapsulation) korunuyor.

---

# 12. DDD’nin Önemli Kavramları

## Entity

Kimliği olan nesne.

```java
User
Order
Invoice
```

---

## Value Object

Kimliği olmayan, değeri önemli olan nesne.

```java
Email
Money
PhoneNumber
```

Örnek:

```java
public record Email(String value) {

    public Email {
        if (!value.contains("@")) {
            throw new IllegalArgumentException();
        }
    }
}
```

---

## Aggregate

Birlikte tutarlı kalması gereken nesne grubu.

```text
Order
 ├── OrderItem
 ├── ShippingAddress
 └── Payment
```

Dış dünya yalnızca **Order** üzerinden işlem yapar.

---

# 13. Clean Architecture + DDD Birlikte Nasıl Kullanılır?

## Önerilen Yapı

```text
com.example.auth

├── domain
│   ├── model
│   ├── repository
│   └── service
│
├── application
│   ├── usecase
│   └── dto
│
├── infrastructure
│   ├── persistence
│   ├── security
│   └── messaging
│
└── presentation
    └── http
```

Bu yapı:

* **Clean Architecture** → katman sınırlarını,
* **DDD** → domain modelini sağlar.

---

