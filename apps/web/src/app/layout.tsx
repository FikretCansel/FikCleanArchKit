import type { Metadata } from "next";
import { AppHeader } from "./components/AppHeader";
import "./globals.css";

export const metadata: Metadata = {
  title: "CleanShop Architecture",
  description: "Clean Architecture learning project for a Next.js storefront",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="tr"
      className="h-full antialiased"
    >
      <body className="min-h-full bg-white text-zinc-950">
        <AppHeader />
        {children}
      </body>
    </html>
  );
}
