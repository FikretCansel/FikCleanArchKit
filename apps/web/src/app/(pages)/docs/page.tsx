import {
  authModule,
  catalogModule,
  notificationModule,
  userPreferencesModule
} from "@core/features";
import { layerDependencyRules } from "@core/shared/architecture";

const featureModules = [
  authModule,
  catalogModule,
  userPreferencesModule,
  notificationModule
];

const pageArchitecture = [
  {
    route: "/, /login",
    page: "Auth Login",
    feature: "Auth + Notification",
    architecture: "DDD bounded context, Clean Architecture",
    patterns: "Use Case, Repository, Value Object, Event Bus, Observer",
    flow:
      "LoginPageContainer -> createLoginComposition -> LoginPageView -> LoginUserUseCase -> AuthRepository -> AuthApiClientPort -> shared HttpClient -> /user/login -> UserLoggedInEvent -> Toast"
  },
  {
    route: "/catalog",
    page: "Product Catalog",
    feature: "Catalog",
    architecture: "DDD bounded context, Clean Architecture, CQRS read side",
    patterns: "Query, Repository, State Pattern",
    flow:
      "CatalogPageContainer -> createCatalogComposition -> CatalogPageView -> GetProductsQuery -> ProductRepository -> CatalogApiClientPort -> shared HttpClient -> /api/products -> ProductListState"
  },
  {
    route: "/preferences",
    page: "User Preferences",
    feature: "User Preferences",
    architecture: "DDD module boundary hazır, feature shell",
    patterns: "Strategy ve Device Abstraction icin hazir alan",
    flow:
      "Su anda sade UI shell. Step 4 ile layout strategy ve device provider buraya baglanacak."
  },
  {
    route: "/notifications",
    page: "Notifications",
    feature: "Notification",
    architecture: "Event driven module boundary",
    patterns: "Observer, Subscriber",
    flow:
      "AuthToastSubscriber login eventlerini dinler ve toast view model uretir."
  },
  {
    route: "/docs",
    page: "Architecture Docs",
    feature: "Shared Architecture",
    architecture: "Living documentation",
    patterns: "Architecture decision map",
    flow:
      "Kodda kullanılan layer, feature ve pattern kararlarini calisan uygulama icinde gosterir."
  }
];

const patternGuide = [
  {
    name: "DDD / Bounded Context",
    usedIn: "Auth, Catalog, User Preferences, Notification",
    job:
      "Her feature kendi diline, modellerine ve kurallarina sahip olur. Auth token ve session konusur; Catalog product ve read state konusur.",
    why:
      "Feature bagimsizligini gosterir. Bir modul degistiginde diger modullerin icine dokunmadan ilerlemek kolaylasir.",
    alternatives:
      "Tek bir src/services klasoru, page bazli dosyalama veya domain yerine teknik klasorler. Bu proje mimari disiplin gostermek istedigi icin DDD siniri tercih edildi."
  },
  {
    name: "Clean Architecture",
    usedIn: "Auth login/register, Catalog product listing",
    job:
      "Composition root concrete bagimliliklari kurar; presentation application katmanini cagirir; application domain contractlara dayanir; infrastructure dis dunya detaylarini uygular.",
    why:
      "API degisirse UI degismez. Presentation infrastructure veya app composition import etmez. Use case ve repository contract ayni kaldigi surece altyapi yenilenebilir.",
    alternatives:
      "Component icinde fetch, server action merkezli akış veya global service singleton. Daha kisa olurdu ama egitim amacli katmanlari gizlerdi."
  },
  {
    name: "Use Case Pattern",
    usedIn: "LoginUserUseCase, RegisterUserUseCase",
    job:
      "Bir kullanici aksiyonunu tek bir application sinifi olarak temsil eder. Login validasyon, repository cagrisi ve event publish burada orkestre edilir.",
    why:
      "UI business flow bilmez. Login butonu sadece use case execute eder.",
    alternatives:
      "Custom hook icinde tum akisi yazmak veya repository yi direkt componentten cagirmak."
  },
  {
    name: "Repository Pattern",
    usedIn: "AuthRepository, ProductRepository",
    job:
      "Application katmanina veri kaynaginin nasil calistigini saklar. API, cache veya mock fark etmeden ayni contract kullanilir.",
    why:
      "Sonradan offline cache, mock data veya farkli backend eklemek kolay olur.",
    alternatives:
      "Direkt fetch, React Query query functionlari veya SDK clientini UI icinde kullanmak."
  },
  {
    name: "Value Object",
    usedIn: "UserIdentity, Password, Token",
    job:
      "Primitive string yerine anlamli ve validasyonlu domain degeri kullanir.",
    why:
      "Bos token veya cok kisa kullanici adi gibi domain hatalari merkeze alinir.",
    alternatives:
      "Sadece string kullanmak veya validasyonu form seviyesinde yapmak."
  },
  {
    name: "CQRS Read Query",
    usedIn: "GetProductsQuery",
    job:
      "Catalog okuma akisini mutation logicten ayirir. Query sadece urun listesini getirir ve read state uretir.",
    why:
      "Listeleme gibi read-heavy ekranlarda akisi netlestirir. Sonradan filtreleme ve cache eklemek kolaylasir.",
    alternatives:
      "Tek ProductService icinde hem read hem write metodlari veya component icinde fetch."
  },
  {
    name: "State Pattern",
    usedIn: "ProductListState, ProductListStateView",
    job:
      "Loading, Empty, Loaded ve Error durumlarini explicit union olarak modeller.",
    why:
      "UI daginik if/else yerine state renderer map uzerinden karar verir.",
    alternatives:
      "Birden fazla boolean state: isLoading, hasError, products.length kontrolu."
  },
  {
    name: "Event Bus / Observer",
    usedIn: "UserLoggedInEvent, AuthToastSubscriber",
    job:
      "Auth basarili login eventini yayinlar; Notification bu eventi dinleyip toast uretir.",
    why:
      "Auth modulu Notification modulunu direkt import edip kontrol etmez.",
    alternatives:
      "Login componentinde toast cagirmak, global store actionlari veya callback zinciri."
  }
];

const fileBoundaries = [
  {
    layer: "composition root",
    canDo: "Concrete repository, API client, storage, event bus ve subscriber baglantilarini kurar.",
    cannotDo: "Business kuralini sahiplenmez; sadece bagimliliklari birbirine baglar."
  },
  {
    layer: "domain",
    canDo: "Entity, value object, domain event ve repository contract tanimlar.",
    cannotDo: "fetch, localStorage, React hook veya UI render yapmaz."
  },
  {
    layer: "application",
    canDo: "Use case, query, command ve orchestration yazar.",
    cannotDo: "DOM, HTTP detaylari veya Next route detaylarini bilmez."
  },
  {
    layer: "infrastructure",
    canDo: "API client, repository implementation, browser storage gibi dis dunya detaylarini uygular.",
    cannotDo: "Business kararini sahiplenmez; domain contracta uyar."
  },
  {
    layer: "presentation",
    canDo: "React component, form state, loading gostergesi ve view model binding yapar.",
    cannotDo: "Infrastructure veya app composition import etmez; API endpointini direkt sahiplenmez."
  }
];

const eslintBoundaryRules = [
  {
    from: "core/domain",
    rule:
      "Domain sadece kendi domain dosyalarina ve core/shared abstractionlarina bagimli olabilir. Application, infrastructure, web veya React katmanlarini import edemez."
  },
  {
    from: "core/application",
    rule:
      "Application use case, query ve orchestration yazar; domain ve shared kullanabilir. Infrastructure veya web katmanlarini import edemez."
  },
  {
    from: "core/infrastructure",
    rule:
      "Infrastructure adapter katmanidir. Domain contractlarini ve application portlarini uygular; HTTP client, repository implementation ve dis dunya detaylari burada kalir."
  },
  {
    from: "web/presentation",
    rule:
      "Presentation React component, controller ve view model binding yapar. Core application/domain okuyabilir ama core infrastructure veya web infrastructure import edemez."
  },
  {
    from: "web/composition",
    rule:
      "Composition root concrete bagimliliklari birlestiren tek yerdir. Use case, repository implementation, API client, storage ve subscriber wiring burada kurulur."
  },
  {
    from: "web/components",
    rule:
      "Shared UI componentleri business flow bilmez. Sadece component, core/domain type veya core/shared abstraction kullanabilir."
  }
];

const eslintBoundaryFiles = [
  "eslint.config.mjs",
  "packages/eslint-config/clean-architecture.js",
  "apps/web/eslint.config.mjs",
  "package.json",
  "apps/web/package.json"
];
const nextOptions = [
  "Step 4: Catalog layout rendering icin Strategy Pattern ve LayoutStrategyFactory eklenebilir.",
  "Favorites icin ProductFavoritedEvent ve repository decorator eklenebilir.",
  "Offline cache icin ApiProductRepository etrafina cache-first decorator sarilabilir.",
  "Advanced filtering icin Specification Pattern catalog application katmanina eklenebilir.",
  "Auth session icin token refresh, logout ve route guard use case olarak gelistirilebilir."
];

export default function DocsPage() {
  return (
    <main className="px-6 py-10">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-10">
        <section className="border-b border-zinc-200 pb-8">
          <p className="text-sm font-medium uppercase text-zinc-500">Step 1</p>
          <h1 className="mt-2 text-3xl font-semibold">
            Domain and Module Boundaries
          </h1>
          <p className="mt-4 max-w-3xl text-base leading-7 text-zinc-600">
            CleanShop is split into independent bounded contexts. Each feature
            owns the same Clean Architecture layers and exposes only its public
            module boundary.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold">Bounded Contexts</h2>
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            {featureModules.map((feature) => (
              <article
                className="rounded-lg border border-zinc-200 p-5"
                key={feature.boundedContext}
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-lg font-semibold">{feature.name}</h3>
                    <p className="mt-1 font-mono text-xs text-zinc-500">
                      {feature.path}
                    </p>
                  </div>
                  <span className="shrink-0 rounded border border-zinc-300 px-2 py-1 text-xs text-zinc-600">
                    {feature.communication}
                  </span>
                </div>
                <p className="mt-4 text-sm leading-6 text-zinc-600">
                  {feature.responsibility}
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {feature.layers.map((layer) => (
                    <span
                      className="rounded border border-zinc-200 px-2 py-1 text-xs text-zinc-700"
                      key={layer}
                    >
                      {layer}
                    </span>
                  ))}
                </div>
                <ul className="mt-4 space-y-1 text-sm text-zinc-600">
                  {feature.publicApi.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold">Layer Dependency Rule</h2>
          <div className="mt-4 overflow-hidden rounded-lg border border-zinc-200">
            {layerDependencyRules.map((layer) => (
              <div
                className="grid gap-3 border-b border-zinc-200 p-4 last:border-b-0 md:grid-cols-[160px_1fr_220px]"
                key={layer.name}
              >
                <strong className="font-mono text-sm">{layer.name}</strong>
                <p className="text-sm text-zinc-600">{layer.responsibility}</p>
                <p className="text-sm text-zinc-500">
                  Depends on:{" "}
                  {layer.mayDependOn.length > 0
                    ? layer.mayDependOn.join(", ")
                    : "none"}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold">Page Architecture Map</h2>
          <div className="mt-4 grid gap-4">
            {pageArchitecture.map((item) => (
              <article
                className="rounded-lg border border-zinc-200 p-5"
                key={item.route}
              >
                <div className="grid gap-3 md:grid-cols-[160px_1fr]">
                  <strong className="font-mono text-sm">{item.route}</strong>
                  <div>
                    <h3 className="font-semibold">{item.page}</h3>
                    <p className="mt-1 text-sm text-zinc-600">
                      Feature: {item.feature}
                    </p>
                    <p className="mt-2 text-sm text-zinc-600">
                      Architecture: {item.architecture}
                    </p>
                    <p className="mt-2 text-sm text-zinc-600">
                      Patterns: {item.patterns}
                    </p>
                    <p className="mt-3 font-mono text-xs leading-6 text-zinc-500">
                      {item.flow}
                    </p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold">Pattern Decisions</h2>
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            {patternGuide.map((pattern) => (
              <article
                className="rounded-lg border border-zinc-200 p-5"
                key={pattern.name}
              >
                <h3 className="text-lg font-semibold">{pattern.name}</h3>
                <p className="mt-2 text-sm text-zinc-500">
                  Kullanildigi yer: {pattern.usedIn}
                </p>
                <p className="mt-4 text-sm leading-6 text-zinc-600">
                  Ne ise yaradi: {pattern.job}
                </p>
                <p className="mt-3 text-sm leading-6 text-zinc-600">
                  Neden tercih edildi: {pattern.why}
                </p>
                <p className="mt-3 text-sm leading-6 text-zinc-600">
                  Alternatifler: {pattern.alternatives}
                </p>
              </article>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold">ESLint Architecture Enforcement</h2>
          <div className="mt-4 grid gap-4 lg:grid-cols-[1.5fr_1fr]">
            <article className="rounded-lg border border-zinc-200 p-5">
              <h3 className="font-semibold">eslint-plugin-boundaries</h3>
              <p className="mt-3 text-sm leading-6 text-zinc-600">
                Clean Architecture kurallari artik sadece dokumanda degil,
                ESLint tarafinda `eslint-plugin-boundaries` kutuphanesi ile de
                kontrol ediliyor. Lint calistiginda domain, application,
                infrastructure, presentation, composition ve shared UI
                katmanlari arasindaki import yonleri denetlenir.
              </p>
              <div className="mt-4 overflow-hidden rounded-lg border border-zinc-200">
                {eslintBoundaryRules.map((item) => (
                  <div
                    className="grid gap-3 border-b border-zinc-200 p-4 last:border-b-0 md:grid-cols-[180px_1fr]"
                    key={item.from}
                  >
                    <strong className="font-mono text-sm">{item.from}</strong>
                    <p className="text-sm leading-6 text-zinc-600">{item.rule}</p>
                  </div>
                ))}
              </div>
            </article>
            <article className="rounded-lg border border-zinc-200 p-5">
              <h3 className="font-semibold">Config ve Komutlar</h3>
              <p className="mt-3 text-sm leading-6 text-zinc-600">
                Kurallar shared ESLint config paketi icinden export edilir ve
                root ESLint config uzerinden web uygulamasi ile core kaynaklara
                uygulanir.
              </p>
              <ul className="mt-4 space-y-2 text-sm leading-6 text-zinc-600">
                {eslintBoundaryFiles.map((file) => (
                  <li className="font-mono text-xs" key={file}>
                    {file}
                  </li>
                ))}
              </ul>
              <div className="mt-4 rounded-lg bg-zinc-950 p-4 text-xs leading-6 text-zinc-100">
                <p className="font-mono">npm run lint</p>
                <p className="font-mono">npm run lint --workspace=apps/web</p>
              </div>
            </article>
          </div>
        </section>
        <section>
          <h2 className="text-xl font-semibold">File Boundaries</h2>
          <div className="mt-4 overflow-hidden rounded-lg border border-zinc-200">
            {fileBoundaries.map((boundary) => (
              <div
                className="grid gap-3 border-b border-zinc-200 p-4 last:border-b-0 md:grid-cols-[160px_1fr_1fr]"
                key={boundary.layer}
              >
                <strong className="font-mono text-sm">{boundary.layer}</strong>
                <p className="text-sm text-zinc-600">Yapabilir: {boundary.canDo}</p>
                <p className="text-sm text-zinc-600">
                  Yapmamalidir: {boundary.cannotDo}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold">Foldering</h2>
          <div className="mt-4 rounded-lg border border-zinc-200 p-5">
            <pre className="overflow-auto text-sm leading-6 text-zinc-700">
{`apps/
  web/
    src/app/
      composition/
        user/
        catalog/
      login/page.tsx
      catalog/page.tsx
      docs/page.tsx
      user/login/route.ts
      api/products/route.ts
  mobile/
    src/
  backend/
    src/main/java/
    src/main/resources/
packages/
  core/
    src/features/
      auth/
        domain/
        application/
        infrastructure/
        presentation/
      catalog/
      notification/
      user-preferences/
    src/shared/
      architecture/
      events/
      http/`}
            </pre>
            <p className="mt-4 text-sm leading-6 text-zinc-600">
              `apps/web` sadece Next.js route ve web composition entry
              pointlerini tutar. Ortak is kurallari `packages/core/src/features`
              altindadir. `apps/web/src/app/composition` concrete dependency
              wiring alanidir. `packages/core/src/shared` ise feature bagimsiz
              architecture, event ve HTTP transport abstractionlarini saklar.
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold">Boundaries</h2>
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            <article className="rounded-lg border border-zinc-200 p-5">
              <h3 className="font-semibold">Kurallar</h3>
              <ul className="mt-3 space-y-2 text-sm leading-6 text-zinc-600">
                <li>`apps/web/src/app/composition` concrete dependency wiring alanidir.</li>
                <li>UI direkt API cagirmaz.</li>
                <li>Presentation katmani infrastructure veya app composition import etmez.</li>
                <li>Featurelar birbirinin infrastructure dosyasini import etmez.</li>
                <li>Domain React, Next.js, fetch ve browser API bilmez.</li>
                <li>Cross-feature iletisim event veya shared abstraction ile olur.</li>
                <li>README ve docs mimari degisikliklerde guncel tutulur.</li>
              </ul>
            </article>
            <article className="rounded-lg border border-zinc-200 p-5">
              <h3 className="font-semibold">Ne Ekleyebiliriz?</h3>
              <ul className="mt-3 space-y-2 text-sm leading-6 text-zinc-600">
                {nextOptions.map((option) => (
                  <li key={option}>{option}</li>
                ))}
              </ul>
            </article>
          </div>
        </section>
      </div>
    </main>
  );
}



