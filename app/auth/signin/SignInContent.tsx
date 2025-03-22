"use client";

import SignInForm from "./SignInForm";
import { SearchParamsProvider } from "@/components/auth/SearchParamsProvider";

export function SignInContent() {
  return (
    <SearchParamsProvider>
      <SignInForm />
    </SearchParamsProvider>
  );
} 