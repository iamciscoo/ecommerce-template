import type { Metadata } from "next";
import "./globals.css";
import "./styles.css";
import { Providers } from "@/components/providers/Providers";
import { RootLayout as Layout } from "@/components/layout";
import { HydrationScript } from "@/components/HydrationScript";

export const metadata: Metadata = {
  title: "Ecommerce Platform",
  description: "A modern ecommerce platform built with Next.js",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen bg-background font-sans antialiased">
        <Providers>
          <Layout>{children}</Layout>
        </Providers>
        <HydrationScript />
      </body>
    </html>
  );
} 