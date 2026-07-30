# 17. Mikroservislerle İlişkisi

Modern sistemlerde genellikle şu kombinasyon kullanılır:

```text
Microservice
 ├── Clean Architecture
 ├── DDD
 ├── Hexagonal Ports
 └── Event-Driven Communication
```

Örnek:

```text
Auth Service
Order Service
Payment Service
Notification Service
```

Her servis kendi içinde:

* domain,
* use case,
* infrastructure,
* presentation katmanlarına sahip olabilir.

## Mikroservislerde Event-Driven İletişim

Dağıtık sistemlerde mikroservislerin birbirini doğrudan HTTP ile çağırması sıkı bağımlılık oluşturur. Bu problemi çözmek için **message broker** kullanılır.

### Kullanılan Teknolojiler

* **Apache Kafka** → yüksek trafikli event streaming
* **RabbitMQ** → kuyruk tabanlı mesajlaşma
* **Apache Pulsar**
* **NATS**
* **Redis Streams**

### Çalışma Mantığı

```text
Producer Service
       │
       ▼
 Message Broker
       │
 ┌─────┼─────┐
 ▼     ▼     ▼
Consumer A
Consumer B
Consumer C
```

### Avantajları

* Servisler birbirini bilmez.
* Asenkron çalışır.
* Bir servis kapalı olsa bile mesaj kaybolmayabilir.
* Yeni özellik eklemek için yeni consumer yazmak yeterlidir.
* Sistem daha ölçeklenebilir hale gelir.

Modern mikroservis mimarilerinde en yaygın kombinasyon:

```text
Clean Architecture
        +
DDD
        +
Event-Driven Communication
        +
Kafka / RabbitMQ
```

Bu sayede **iş kuralları korunurken servisler birbirinden bağımsız geliştirilebilir ve ölçeklenebilir hale gelir.**

---