# 14. Event-Driven Architecture

Sistemler büyüdükçe servislerin birbirini doğrudan çağırması yeni problemlere yol açtı.

## Senaryo

Sipariş oluşturulunca:

* stok düşmeli,
* e-posta gönderilmeli,
* fatura oluşturulmalı,
* bildirim gitmeli.

### Klasik Yaklaşım

```text
OrderService
 ├── StockService
 ├── MailService
 ├── InvoiceService
 └── NotificationService
```

Bağımlılık patlaması oluşur.

---

# 15. Event-Driven Yaklaşım

## Olay Yayınlama

```java
public class OrderCreatedEvent {
    private final Long orderId;
}
```

Sipariş servisi:

```java
eventPublisher.publish(new OrderCreatedEvent(orderId));
```

Diğer servisler bu olayı dinler.

### Yapı

```text
Order Service
      │
      ▼
OrderCreatedEvent
      │
 ┌────┼────┐
 ▼    ▼    ▼
Stock Mail Invoice
```

---

# 16. Event-Driven’ın Avantajları

| Avantaj             | Açıklama                         |
| ------------------- | -------------------------------- |
| Loose coupling      | Servisler birbirini bilmez       |
| Ölçeklenebilirlik   | Tüketiciler ayrı ölçeklenir      |
| Asenkron çalışma    | Kullanıcı beklemez               |
| Yeni özellik ekleme | Yeni consumer eklemek yeterlidir |