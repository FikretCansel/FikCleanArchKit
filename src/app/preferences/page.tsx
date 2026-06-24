export default function PreferencesPage() {
  return (
    <main className="mx-auto max-w-6xl px-6 py-10">
      <h1 className="text-2xl font-semibold">User Preferences</h1>
      <p className="mt-2 text-sm text-zinc-600">
        Tema, cihaz ve layout tercihleri icin presentation iskeleti.
      </p>
      <form className="mt-6 max-w-sm space-y-4">
        <label className="block text-sm">
          Layout
          <select className="mt-1 w-full rounded border border-zinc-300 px-3 py-2">
            <option>Auto</option>
            <option>Grid</option>
            <option>List</option>
          </select>
        </label>
        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" />
          Dark theme
        </label>
      </form>
    </main>
  );
}
