const notifications = [
  "Login success toast burada gosterilecek.",
  "System alert eventleri burada render edilecek."
];

export default function NotificationsPage() {
  return (
    <main className="mx-auto max-w-6xl px-6 py-10">
      <h1 className="text-2xl font-semibold">Notifications</h1>
      <p className="mt-2 text-sm text-zinc-600">
        Event driven notification presentation iskeleti.
      </p>
      <div className="mt-6 max-w-lg space-y-3">
        {notifications.map((notification) => (
          <div className="rounded border border-zinc-200 p-3 text-sm" key={notification}>
            {notification}
          </div>
        ))}
      </div>
    </main>
  );
}
