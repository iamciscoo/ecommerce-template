import { Suspense } from "react";
import SignOutForm from "./SignOutForm";

export default function SignOutPage() {
  return (
    <Suspense fallback={<div className="flex min-h-screen items-center justify-center">Loading...</div>}>
      <SignOutForm />
    </Suspense>
  );
} 