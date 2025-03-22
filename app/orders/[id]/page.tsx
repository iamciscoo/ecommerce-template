import { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { auth } from "../../../auth";
import { OrderDetail } from "@/components/orders/OrderDetail";
import { Suspense } from "react";

// Tell Next.js this is a dynamic page
export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: "Order Details | Ecommerce",
  description: "View the details of your order",
};

interface OrderDetailPageProps {
  params: {
    id: string;
  };
}

export default async function OrderDetailPage({ params }: OrderDetailPageProps) {
  const session = await auth();

  // Redirect to login if not authenticated
  if (!session?.user) {
    redirect("/login?callbackUrl=/orders");
  }

  const { id } = params;

  return (
    <div className="container py-10">
      <Suspense fallback={<div className="max-w-4xl mx-auto space-y-4">
        <div className="h-8 w-1/3 bg-muted animate-pulse rounded-md"></div>
        <div className="h-64 bg-muted animate-pulse rounded-lg"></div>
      </div>}>
        <OrderDetail orderId={id} />
      </Suspense>
    </div>
  );
} 