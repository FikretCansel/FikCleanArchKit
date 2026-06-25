
# 🧱 Proje: CleanShop Frontend (TypeScript + React)

## 🎯 Amaç

Bu proje, Next.js + TypeScript kullanılarak geliştirilecek bir e-ticaret frontend uygulamasıdır. Uygulama çalışabilmesi için, next js de yine bu endpointleri çok basit bir şekilde oluştur. Örnegin, /user/login ve eger ki kullanıcı fikret, password fikret ise, a125sdfg gibi token ve gerekli basit degerler döndürsün. Dedigim gibi burada amaç backend degil, frontendde arhitecture görmek. Ayrıca frontend tarafında tasarım aşırı basit olsun, tasarım yapmaya ugraşma, tek amacımız arhitecture'ı görmek. Uygulama yine belirtilen aksiyonları gerçekleştirebilsin, kod çalışsın.

Canlı demo: https://fik-clean-arch-kit.vercel.app/

---

# 🧩 1. STEP — Domain & Modül Sınırları (DDD Temeli)

Uygulama aşağıdaki bounded context’lere ayrılacaktır:

* Auth (login / register / token yönetimi)
* Catalog (ürün listeleme)
* User Preferences (tema, device, layout)
* Notification (toast, system messages)

### Kullanılacak yaklaşım:

* Domain Driven Design (DDD)
* Feature-based module structure
* Her modül bağımsız olacak

Her modül kendi içinde şu yapıyı taşıyacak:

```text
domain/
application/
infrastructure/
presentation/
```

👉 Amaç: “feature bağımsızlığı”

### ✅ Step 1 Durumu

Step 1 uygulandı.

* `src/features/auth`
* `src/features/catalog`
* `src/features/user-preferences`
* `src/features/notification`

Her bounded context altında şu katmanlar oluşturuldu:

```text
domain/
application/
infrastructure/
presentation/
```

Çalışan basit UI route'ları:

* `/` ve `/login` → Auth login UI
* `/catalog` → Catalog UI iskeleti
* `/preferences` → User Preferences UI iskeleti
* `/notifications` → Notification UI iskeleti
* `/docs` → Step 1 mimari dokümantasyon ekranı

Ana header üzerinden bu sayfalara erişilebilir.

### 📌 Proje Kuralı

Her yeni step veya mimari değişiklikte `ReadMe.md` güncel tutulacaktır.

---

# 🧠 2. STEP — Auth Sistemi (JWT Login Flow)

## Özellikler:

* Login
* Register
* JWT token ile session yönetimi
* Login sonrası toast notification

## Kullanılacak patternler:

### ✔ Clean Architecture

* UI → Application → Domain → Infrastructure

### ✔ Use Case Pattern

* LoginUserUseCase
* RegisterUserUseCase

### ✔ Repository Pattern

* AuthRepository (interface)
* ApiAuthRepository (implementation)

### ✔ Value Object

* Email
* Password
* Token

---

## Akış:

UI direkt API çağırmaz.

```text
LoginPage
 → LoginUserUseCase
 → AuthRepository
 → API Client
 → Response
```

---

## Event Driven yaklaşım:

Login başarılı olduğunda:

```text
UserLoggedInEvent
```

yayınlanır.

Dinleyen sistemler:

* Toast system
* Analytics
* Navigation handler

### ✅ Step 2 Durumu

Step 2 uygulandı.

Auth bounded context altında şu parçalar eklendi:

* Domain: `UserIdentity`, `Password`, `Token`, `AuthSession`, `AuthRepository`, `UserLoggedInEvent`
* Application: `LoginUserUseCase`, `RegisterUserUseCase`
* Infrastructure: `AuthApiClient`, `ApiAuthRepository`, `BrowserSessionStorage`
* Presentation: çalışan login/register formu

Çalışan API route'ları:

* `POST /user/login`
  * `fikret / fikret` için `a125sdfg` token döner
  * hatalı bilgi için `401` döner
* `POST /user/register`
  * basit fake register session döner

Event driven notification akışı:

```text
LoginPageView
 → LoginUserUseCase
 → ApiAuthRepository
 → /user/login
 → UserLoggedInEvent
 → AuthToastSubscriber
 → Toast UI
```

Login başarılı olduğunda token browser `localStorage` içine kaydedilir.

Composition ayrımı:

* `loginComposition.ts` server-safe tutulur; use case, repository ve API client
  burada kurulur.
* Client component'ler application service veya repository import etmez.
* Login formu server action üzerinden use case çalıştırır; browser'a özel
  session yazma işi ayrı client adapter'da kalır.
* `/login` sayfası SEO metadata ve sayfa metni gibi server kaynaklı bilgileri
  server component tarafında composition'dan alabilir.

---

# 🧾 3. STEP — Product Catalog (Ürün Listeleme Sistemi)

## Özellikler:

* Ürünleri API’den çekme
* Empty state (ürün yoksa Not Found)
* Loading / Error state yönetimi

## Kullanılacak patternler:

### ✔ CQRS

* GetProductsQuery (read model)
* No mutation logic UI’da

### ✔ State Pattern

```text
Loading
Empty
Loaded
Error
```

### ✔ Repository Pattern

* ProductRepository abstraction
* ApiProductRepository implementation

---

## UI akışı:

UI sadece state dinler:

```text
ProductPage
 → GetProductsQuery
 → ProductRepository
 → API
 → StateEmitter
```

---

## Not Found case:

If ürün yoksa:

```text
EmptyState → NotFoundView
```

IF/ELSE UI’da kullanılmaz, state ile çözülür.

### ✅ Step 3 Durumu

Step 3 uygulandı.

Catalog bounded context altında şu parçalar eklendi:

* Domain: `Product`, `ProductRepository`, `ProductListMode`
* Application: `GetProductsQuery`, `ProductListState`
* Infrastructure: `CatalogApiClient`, `ApiProductRepository`
* Presentation: `CatalogPageView`, `ProductListStateView`

Çalışan API route'u:

* `GET /api/products`
  * varsayılan durumda ürün listesi döner
  * `?mode=empty` ile boş liste döner
  * `?mode=error` ile hata state'i test edilir

Catalog UI akışı:

```text
CatalogPageView
 → GetProductsQuery
 → ProductRepository
 → CatalogApiClient
 → /api/products
 → ProductListState
 → ProductListStateView
```

UI doğrudan API çağırmaz. Loading, Empty, Loaded ve Error render davranışı
`ProductListStateView` içindeki state renderer map üzerinden yönetilir.

---

# 🎨 4. STEP — UI Rendering Strategy System (En kritik kısım)

## Özellik:

Aynı ürün listesi farklı cihazlarda farklı görünür:

* Desktop → Grid view
* Mobile → Vertical list
* Tablet → Hybrid layout
* Kullanıcı seçimine göre Card style değişir

---

## Kullanılacak patternler:

### ✔ Strategy Pattern

```text
ProductLayoutStrategy
 ├── GridStrategy
 ├── VerticalListStrategy
 ├── HorizontalCarouselStrategy
```

---

### ✔ Factory Pattern

```text
LayoutStrategyFactory
```

device + user preference → strategy üretir

---

### ✔ Device Abstraction Layer

```text
DeviceCapabilityProvider
```

UI asla:

```ts
if (device === 'mobile')
```

görmez.

---

## UI rendering:

```text
ProductPage
 → LayoutStrategy.resolve()
 → strategy.render(products)
```

---

# 🔔 5. STEP — Event Driven Notification System

# Final Result

Sisteme axios eklendi diyelim. Sistem nasıl olmadı

Proje diyelim react dan angular'a taşındı. Bu arhitecture business logici bagımsız yaptık ve aynı kodun kullanabiliyor olması gerekiyordu.

## Özellikler:

* Login success toast
* Product added notification
* System alerts

---

## Kullanılacak patternler:

### ✔ Event Bus

```text
EventBus.publish()
```

### ✔ Observer Pattern

* ToastSubscriber
* NotificationSubscriber
* AnalyticsSubscriber

---

## Örnek akış:

```text
UserLoggedInEvent
 → ToastRequestedEvent
 → ToastRenderer
 → UI Toast
```

---

# 🚀 EK ÖZELLİKLER (sonradan eklenecek — mimariyi zorlamak için)

Sistem büyüdükçe şu özellikler eklenecek:

---

## 1. Favorites System

* ProductFavoritedEvent
* Offline sync support

👉 Pattern:

* Observer
* Repository Decorator

---

## 2. Offline Cache Layer

* API fallback cache

👉 Pattern:

* Decorator Pattern
* Cache-first strategy

---

## 3. Theme System

* Light / Dark / Custom themes

👉 Pattern:

* Strategy Pattern
* State Machine

---

## 4. Advanced Filtering

* Price filter
* Category filter
* Stock filter

👉 Pattern:

* Specification Pattern

---

## 5. Form Validation System

* Domain-level validation (UI değil domain)

👉 Pattern:

* Value Objects
* Result/Either Pattern

---

# 🧱 GENEL MİMARİ KURALLAR

* UI katmanı business logic içermez
* IF/ELSE sadece state machine içinde sınırlı kullanılır
* API çağrısı sadece infrastructure layer’da olur
* Feature’lar birbirini direkt çağırmaz
* Her şey event veya abstraction üzerinden konuşur

---

# 🧠 SONUÇ FELSEFESİ

Bu proje şu amaçla tasarlanır:

> “Kod okunabilirliği değil, mimari disiplin göstermek”

Ama aynı zamanda:

* Yeni feature eklemek kolay olmalı
* Var olan kod bozulmadan genişleyebilmeli
* Bir modül değişince diğerleri etkilenmemeli
