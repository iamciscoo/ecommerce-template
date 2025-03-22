import { Metadata } from "next";
import { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Order History | Ecommerce",
  description: "View your order history and track your purchases",
};

export default function OrdersLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
} 