"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { OrderHistoryWrapper } from "./OrderHistoryWrapper";

export function OrdersClient() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/signin?callbackUrl=/orders");
    }
  }, [status, router]);

  if (status === "loading") {
    return (
      <div className="container py-10">
        <div className="h-8 w-1/4 bg-muted animate-pulse rounded-md mb-8"></div>
        <div className="space-y-6">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="h-24 bg-muted animate-pulse rounded-lg"
            ></div>
          ))}
        </div>
      </div>
    );
  }

  if (!session) {
    return null; // The useEffect will redirect
  }

  return (
    <div className="container py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Order History</h1>
        <p className="text-muted-foreground">
          View and manage your orders
        </p>
      </div>
      
      <OrderHistoryWrapper userId={session.user.id} />
    </div>
  );
} 