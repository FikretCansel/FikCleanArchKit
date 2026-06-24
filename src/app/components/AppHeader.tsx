import Link from "next/link";

const navItems = [
  { href: "/login", label: "Login" },
  { href: "/catalog", label: "Catalog" },
  { href: "/preferences", label: "Preferences" },
  { href: "/notifications", label: "Notifications" },
  { href: "/docs", label: "Docs" }
];

export function AppHeader() {
  return (
    <header className="border-b border-zinc-200 bg-white">
      <nav className="mx-auto flex max-w-6xl flex-col gap-3 px-6 py-4 sm:flex-row sm:items-center sm:justify-between">
        <Link className="text-lg font-semibold text-zinc-950" href="/">
          CleanShop
        </Link>
        <div className="flex flex-wrap gap-3 text-sm text-zinc-600">
          {navItems.map((item) => (
            <Link className="hover:text-zinc-950" href={item.href} key={item.href}>
              {item.label}
            </Link>
          ))}
        </div>
      </nav>
    </header>
  );
}
