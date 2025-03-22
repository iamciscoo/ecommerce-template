"use client";

import { Button } from "@/components/ui/button";
import { signOut } from "next-auth/react";
import Link from "next/link";

export function SignOutSimple() {
  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <div className="w-full max-w-md rounded-lg border border-gray-200 bg-white p-6 shadow-md">
        <h2 className="mb-4 text-center text-2xl font-bold">Sign Out</h2>
        <p className="mb-6 text-center text-gray-600">
          Are you sure you want to sign out?
        </p>
        <div className="flex gap-4">
          <Button
            variant="outline"
            className="w-full"
            asChild
          >
            <Link href="/">Cancel</Link>
          </Button>
          <Button
            variant="destructive"
            className="w-full"
            onClick={() => signOut({ callbackUrl: "/" })}
          >
            Sign Out
          </Button>
        </div>
      </div>
    </div>
  );
} 