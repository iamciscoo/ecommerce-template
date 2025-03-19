"use client";

import { Toaster } from "@/src/components/ui/sonner";
import { ThemeProvider } from "./ThemeProvider";
import AuthProvider from "@/src/contexts/AuthProvider";
import { type ReactNode } from "react";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider>
      <AuthProvider>
        {children}
        <Toaster />
      </AuthProvider>
    </ThemeProvider>
  );
} 