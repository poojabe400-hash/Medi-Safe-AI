import type { Metadata } from "next";
import "./globals.css";
import { MediSafeProvider } from "@/context/MediSafeContext";
import AppShell from "@/components/layout/AppShell";

export const metadata: Metadata = {
  title: "MediSafe AI — Clinical Predictive Inventory & Stockout Prevention",
  description: "Enterprise clinical stockout intelligence and predictive healthcare supply chain management.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Plus+Jakarta+Sans:wght@500;600;700;800&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-full flex flex-col bg-surface font-body text-on-surface">
        <MediSafeProvider>
          <AppShell>{children}</AppShell>
        </MediSafeProvider>
      </body>
    </html>
  );
}
