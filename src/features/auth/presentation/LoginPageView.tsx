export function LoginPageView() {
  return (
    <main className="mx-auto max-w-6xl px-6 py-10">
      <section className="max-w-sm">
        <h1 className="text-2xl font-semibold">Login</h1>
        <p className="mt-2 text-sm text-zinc-600">
          Step 1 icin sade auth UI iskeleti.
        </p>
        <form className="mt-6 space-y-4">
          <label className="block text-sm">
            Kullanici adi
            <input
              className="mt-1 w-full rounded border border-zinc-300 px-3 py-2"
              defaultValue="fikret"
              name="username"
            />
          </label>
          <label className="block text-sm">
            Sifre
            <input
              className="mt-1 w-full rounded border border-zinc-300 px-3 py-2"
              defaultValue="fikret"
              name="password"
              type="password"
            />
          </label>
          <button
            className="rounded bg-zinc-950 px-4 py-2 text-sm font-medium text-white"
            type="button"
          >
            Login
          </button>
        </form>
      </section>
    </main>
  );
}
