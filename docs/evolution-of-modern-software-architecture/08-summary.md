# 18. Mimari Yaklaşımların Evrim Özeti

| Dönem | Yaklaşım           | Çözmeye Çalıştığı Problem          |
| ----- | ------------------ | ---------------------------------- |
| 1990  | Layered            | Kodun düzenli yerleşimi            |
| 2005  | Hexagonal          | Teknoloji bağımlılığı              |
| 2012  | Clean Architecture | Bağımlılık karmaşası               |
| 2004+ | DDD                | İş kurallarının doğru modellenmesi |
| 2010+ | Event-Driven       | Servisler arası gevşek bağlılık    |

---

# 19. Hangisi Ne İçin Kullanılır?

| İhtiyaç                        | Yaklaşım           |
| ------------------------------ | ------------------ |
| Basit CRUD uygulaması          | Layered            |
| DB / dış servis sık değişiyor  | Hexagonal          |
| Büyük ekip + uzun ömürlü proje | Clean Architecture |
| Karmaşık iş kuralları          | DDD                |
| Dağıtık sistem / mikroservis   | Event-Driven       |

---

# 20. Önemli Karışıklıklar

## “Clean Architecture = DDD” mi?

Hayır.

* **Clean Architecture** → bağımlılıkların yönüyle ilgilenir.
* **DDD** → domain’in nasıl modellenmesi gerektiğiyle ilgilenir.

Bir proje:

* Clean olabilir ama DDD olmayabilir.
* DDD kullanabilir ama Clean olmayabilir.
* En güçlü yaklaşım genellikle **ikisini birlikte kullanmaktır**.

---

# 21. Günümüzde Pratik Yaklaşım

Gerçek projelerde çoğu ekip şu kombinasyonu tercih eder:

```text
Presentation
       ↓
Application (Use Cases)
       ↓
Domain
       ↑
Infrastructure
```

Ve domain içinde:

* Entity
* Value Object
* Domain Service
* Business Rules

bulundurur.

Bu yaklaşım:

* test edilebilir,
* framework bağımsız,
* sürdürülebilir,
* ekip çalışmasına uygun,
* değişime dayanıklı bir yapı sağlar.

---

# 22. Sonuç

Yazılım mimarilerinin ortaya çıkış nedeni tek bir cümlede özetlenebilir:

> **“Değişimin maliyetini azaltmak.”**

Evrim şu şekilde gerçekleşmiştir:

1. **Layered Architecture** → kodu düzenlemek için,
2. **Hexagonal Architecture** → teknolojileri değiştirebilmek için,
3. **Clean Architecture** → bağımlılıkları kontrol etmek için,
4. **DDD** → iş kurallarını merkeze almak için,
5. **Event-Driven Architecture** → dağıtık sistemleri gevşek bağlı hale getirmek için geliştirilmiştir.

Modern bir yazılım sistemi genellikle bu yaklaşımların **birbirini tamamlayan yönlerini birlikte kullanır**.

En önemli hedef ise şudur:

> **İş kurallarını koruyarak teknolojilerin değişebilmesini sağlamak.**

Bu sağlandığında yazılım:

* daha uzun ömürlü,
* daha test edilebilir,
* daha anlaşılır,
* daha kolay geliştirilebilir hale gelir.

---

## Kısa Özet Şeması

```text
Layered
   ↓
Hexagonal
   ↓
Clean Architecture
   ↓
DDD
   ↓
Event-Driven
```

Her yeni yaklaşım, önceki yaklaşımın çözemediği **yeni ölçek ve bakım problemlerine** cevap olarak ortaya çıkmıştır.
