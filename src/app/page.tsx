import {
  authModule,
  catalogModule,
  notificationModule,
  userPreferencesModule
} from "@/features";
import { layerDependencyRules } from "@/shared/architecture";

const featureModules = [
  authModule,
  catalogModule,
  userPreferencesModule,
  notificationModule
];

export default function Home() {
  return (
    <main className="min-h-screen bg-white px-6 py-10 text-zinc-950">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-10">
        <section className="border-b border-zinc-200 pb-8">
          <p className="text-sm font-medium uppercase tracking-wide text-zinc-500">
            Step 1
          </p>
          <h1 className="mt-2 text-3xl font-semibold tracking-normal">
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
      </div>
      </main>
  );
}
