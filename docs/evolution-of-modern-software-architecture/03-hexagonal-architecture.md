# 4. Bağımlılık Problemi

## Sorun Senaryosu

Başlangıç:

```text
Service → PostgreSQL Repository
```

Daha sonra:

```text
Service → Redis Repository
```

Aylar sonra:

```text
Service → PostgreSQL Repository
```

Her değişiklikte:

* eski kod silinir,
* yeni kod yazılır,
* testler bozulur,
* geri dönüş maliyeti yükselir.

Yani problem:

> **İş kuralları teknolojilere bağımlı hale gelmiştir.**

---

# 5. Hexagonal Architecture (Ports & Adapters)

Bu problemi çözmek için **Alistair Cockburn** tarafından **Hexagonal Architecture** geliştirildi.

## Temel Fikir

> **“Uygulamanın çekirdeği dış dünyayı bilmemelidir.”**

### Yapı

```text
         [ REST ]
             │
         Adapter
             │
          Port
             │
    ┌─────────────────┐
    │   Application   │
    │     Core        │
    └─────────────────┘
             │
          Port
             │
         Adapter
             │
       [ Database ]
```

---

## Port Nedir?

Çekirdeğin ihtiyaç duyduğu sözleşmedir.

```java
public interface UserRepository {
    User findByEmail(String email);
    void save(User user);
}
```

---

## Adapter Nedir?

Bu sözleşmeyi gerçek teknolojiye uyarlayan koddur.

### PostgreSQL Adapter

```java
@Repository
public class JpaUserRepository implements UserRepository {

    @Override
    public User findByEmail(String email) {
        // JPA kodu
    }
}
```

### Redis Adapter

```java
@Repository
public class RedisUserRepository implements UserRepository {

    @Override
    public User findByEmail(String email) {
        // Redis kodu
    }
}
```

Artık çekirdek kod değişmez.

---

---

# 6. Hexagonal Architecture’ın Kazandırdığı Şey

| Problem                                   | Çözüm               |
| ----------------------------------------- | ------------------- |
| Veritabanı değişirse servis bozuluyor     | Port kullan         |
| Dış servis değişirse uygulama etkileniyor | Adapter değiştir    |
| Test için gerçek DB gerekiyor             | Fake adapter kullan |

Bu yaklaşım sayesinde:

> **İş kuralları korunur, teknolojiler değişebilir.**

---