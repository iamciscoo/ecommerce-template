import { Suspense } from "react";
import { OrdersClient } from "@/components/orders/OrdersClient";

// Tell Next.js this is a dynamic page
export const dynamic = 'force-dynamic';

export default function OrdersPage() {
  return (
    <Suspense fallback={
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
    }>
      <OrdersClient />
    </Suspense>
  );
} 