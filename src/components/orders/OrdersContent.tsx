"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { OrderHistory } from "@/components/orders/OrderHistory";
import Link from "next/link";

export function OrdersContent() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  // If not authenticated, redirect to login
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/signin?callbackUrl=/orders");
    } else if (status === "authenticated") {
      setLoading(false);
    }
  }, [status, router]);

  if (loading) {
    return (
      <div className="container py-10">
        <div className="max-w-4xl mx-auto">
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
      </div>
    );
  }

  if (!session) {
    return (
      <div className="container py-10">
        <div className="max-w-4xl mx-auto text-center">
          <ShoppingBag className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
          <h2 className="text-2xl font-bold mb-2">Sign in to view your orders</h2>
          <p className="text-muted-foreground mb-6">
            You need to be signed in to view your order history.
          </p>
          <Button asChild>
            <Link href="/auth/signin?callbackUrl=/orders">Sign In</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-10">
      <div className="max-w-4xl mx-auto">
        <OrderHistory userId={session.user?.id} />
      </div>
    </div>
  );
} 