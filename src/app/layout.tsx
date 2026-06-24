import type { Metadata } from "next";
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
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
