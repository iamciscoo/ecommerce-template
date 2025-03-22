import { ReactNode, Suspense } from "react";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { PageTransition } from "@/components/ui/page-transition";

interface RootLayoutProps {
  children: ReactNode;
}

export function RootLayout({ children }: RootLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <Suspense fallback={<div className="container py-10">Loading page content...</div>}>
          <PageTransition>{children}</PageTransition>
        </Suspense>
      </main>
      <Footer />
    </div>
  );
} 