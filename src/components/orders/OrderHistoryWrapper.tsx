"use client";

import { Suspense } from "react";
import { OrderHistory } from "./OrderHistory";

interface OrderHistoryWrapperProps {
  userId?: string;
}

export function OrderHistoryWrapper({ userId }: OrderHistoryWrapperProps) {
  return (
    <Suspense fallback={<div>Loading orders...</div>}>
      <OrderHistory userId={userId} />
    </Suspense>
  );
} 