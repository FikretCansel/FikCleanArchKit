# 2. Sorun ve Gerçek Hayattan Benzetme

Bir ev düşünelim:

* **Mutfak:** yemek yapmak için,
* **Salon:** oturmak için,
* **Yatak odası:** uyumak için,
* **Banyo:** temizlik için kullanılır.

Yastık aradığınızda tüm evi dolaşmazsınız; doğrudan **yatak odasına** bakarsınız.

Yazılım mimarisinin temel amacı da budur:

> **“Bir işlemin nerede olduğunu tahmin edebilmek.”**

Kodlar da belirli odalara (katmanlara) yerleştirilir.

---

# 3. Layered Architecture (Katmanlı Mimari)

## Tarihsel Yaklaşım

1990’lı yıllarda yaygınlaşan yaklaşım **Layered Architecture** oldu.

## Temel Yapı

```text
UI / Controller
        ↓
Service / Business
        ↓
Repository / Data Access
        ↓
Database
```

### Katmanların Görevi

| Katman     | Görev                         |
| ---------- | ----------------------------- |
| Controller | HTTP isteğini karşılamak      |
| Service    | İş kurallarını çalıştırmak    |
| Repository | Veritabanı işlemlerini yapmak |
| Database   | Veriyi saklamak               |

## Avantajları

* Basit öğrenilir.
* Küçük ve orta ölçekli projeler için uygundur.
* Kodun yeri tahmin edilebilir.

## Problemleri

Zamanla şu sorunlar ortaya çıktı:

### Örnek

```java
@Service
public class UserService {

    @Autowired
    private UserRepository repository;

    public void save(User user) {
        repository.save(user);
    }
}
```

Burada `UserService`, doğrudan `UserRepository`’ye bağlıdır.

Şimdi düşünelim:

* Bugün **PostgreSQL** kullanıyoruz.
* Yarın **Redis** kullanmamız isteniyor.
* Sonra tekrar **PostgreSQL**’e dönülüyor.

Tüm servis katmanı veritabanı detaylarını biliyorsa büyük çaplı değişiklik gerekir.

---