"use client";

import { Toaster } from "@/components/ui/sonner";
import { ThemeProvider } from "./ThemeProvider";
import AuthProvider from "@/contexts/AuthProvider";
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