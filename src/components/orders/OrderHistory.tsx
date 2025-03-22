"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ChevronRight, Package, Truck } from "lucide-react";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle,
  CardDescription,
  CardFooter
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LoadingStates } from "@/components/ui/ux-enhancements";
import { formatDate, formatCurrency } from "@/lib/utils";

interface OrderItem {
  id: string;
  productId: string;
  quantity: number;
  price: number;
  total: number;
  product: {
    id: string;
    name: string;
    price: number;
    images: {
      id: string;
      url: string;
    }[];
  };
}

interface Order {
  id: string;
  orderNumber: string;
  createdAt: string;
  updatedAt: string;
  status: string;
  paymentStatus: string;
  total: number;
  items: OrderItem[];
}

interface OrdersResponse {
  orders: Order[];
  meta: {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    pageSize: number;
    hasMore: boolean;
  };
}

interface OrderHistoryProps {
  userId?: string;
}

export function OrderHistory({ userId }: OrderHistoryProps) {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState("all");
  const [meta, setMeta] = useState({
    currentPage: 1,
    totalPages: 1,
    hasMore: false,
  });

  const fetchOrders = async (status?: string) => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      params.append("page", "1");
      params.append("limit", "10");
      
      if (status && status !== "all") {
        params.append("status", status);
      }
      
      const response = await fetch(`/api/orders?${params.toString()}`);
      
      if (!response.ok) {
        throw new Error("Failed to fetch orders");
      }
      
      const data: OrdersResponse = await response.json();
      setOrders(data.orders);
      setMeta({
        currentPage: data.meta.currentPage,
        totalPages: data.meta.totalPages,
        hasMore: data.meta.hasMore,
      });
      setError(null);
    } catch (err) {
      setError("Error loading orders. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const loadMoreOrders = async () => {
    if (!meta.hasMore) return;
    
    try {
      const nextPage = meta.currentPage + 1;
      const params = new URLSearchParams();
      params.append("page", nextPage.toString());
      params.append("limit", "10");
      
      if (activeTab !== "all") {
        params.append("status", activeTab);
      }
      
      const response = await fetch(`/api/orders?${params.toString()}`);
      
      if (!response.ok) {
        throw new Error("Failed to fetch more orders");
      }
      
      const data: OrdersResponse = await response.json();
      setOrders([...orders, ...data.orders]);
      setMeta({
        currentPage: data.meta.currentPage,
        totalPages: data.meta.totalPages,
        hasMore: data.meta.hasMore,
      });
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchOrders(activeTab === "all" ? undefined : activeTab);
  }, [activeTab]);

  const handleTabChange = (value: string) => {
    setActiveTab(value);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return <Badge variant="outline">Pending</Badge>;
      case "processing":
        return <Badge variant="secondary">Processing</Badge>;
      case "shipped":
        return <Badge variant="default">Shipped</Badge>;
      case "delivered":
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-200">Delivered</Badge>;
      case "cancelled":
        return <Badge variant="destructive">Cancelled</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "shipped":
        return <Truck className="h-5 w-5" />;
      default:
        return <Package className="h-5 w-5" />;
    }
  };

  if (loading && orders.length === 0) {
    return (
      <div>
        <LoadingStates variant="order-summary" count={3} />
      </div>
    );
  }

  if (error) {
    return (
      <Card>
        <CardContent className="py-10">
          <div className="text-center">
            <p className="text-destructive mb-4">{error}</p>
            <Button onClick={() => fetchOrders()}>Try Again</Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <Tabs defaultValue="all" onValueChange={handleTabChange}>
        <TabsList>
          <TabsTrigger value="all">All Orders</TabsTrigger>
          <TabsTrigger value="pending">Pending</TabsTrigger>
          <TabsTrigger value="processing">Processing</TabsTrigger>
          <TabsTrigger value="shipped">Shipped</TabsTrigger>
          <TabsTrigger value="delivered">Delivered</TabsTrigger>
        </TabsList>
        
        <TabsContent value={activeTab} className="mt-6">
          {orders.length === 0 ? (
            <Card>
              <CardContent className="py-10">
                <div className="text-center">
                  <h3 className="text-lg font-medium mb-2">No orders found</h3>
                  <p className="text-muted-foreground mb-4">
                    You don&apos;t have any {activeTab !== "all" ? activeTab : ""} orders yet.
                  </p>
                  <Button asChild>
                    <Link href="/products">Continue Shopping</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              {orders.map((order) => (
                <Card key={order.id} className="overflow-hidden">
                  <CardHeader className="pb-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-lg">
                          Order #{order.orderNumber}
                        </CardTitle>
                        <CardDescription>
                          Placed on {formatDate(order.createdAt)}
                        </CardDescription>
                      </div>
                      <div>{getStatusBadge(order.status)}</div>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="pb-4">
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div>
                        <p className="text-sm font-medium mb-1">Items</p>
                        <ul className="space-y-2">
                          {order.items.slice(0, 2).map((item) => (
                            <li key={item.id} className="text-sm flex items-center gap-2">
                              <span>{item.quantity}x</span>
                              <span className="flex-1 truncate">{item.product.name}</span>
                              <span>{formatCurrency(item.total)}</span>
                            </li>
                          ))}
                          {order.items.length > 2 && (
                            <li className="text-sm text-muted-foreground">
                              +{order.items.length - 2} more items
                            </li>
                          )}
                        </ul>
                      </div>
                      
                      <div className="flex flex-col items-end justify-center sm:border-l sm:pl-4">
                        <div className="flex items-center gap-2 mb-2">
                          {getStatusIcon(order.status)}
                          <span className="text-sm font-medium">
                            {order.status === "delivered" 
                              ? "Delivered" 
                              : order.status === "shipped" 
                                ? "On the way" 
                                : "Processing"}
                          </span>
                        </div>
                        <p className="text-lg font-bold">
                          {formatCurrency(order.total)}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                  
                  <CardFooter className="bg-muted/40 pt-3 pb-3 px-6 flex justify-between">
                    <Button variant="ghost" size="sm" asChild>
                      <Link href={`/orders/${order.id}`}>
                        View Details
                        <ChevronRight className="ml-1 h-4 w-4" />
                      </Link>
                    </Button>
                    
                    {order.status === "shipped" && (
                      <Button size="sm" variant="outline" asChild>
                        <Link href={`/orders/${order.id}/tracking`}>
                          Track Order
                        </Link>
                      </Button>
                    )}
                    
                    {["pending", "processing"].includes(order.status) && (
                      <Button 
                        size="sm" 
                        variant="outline" 
                        className="text-destructive hover:text-destructive"
                        onClick={async () => {
                          if (window.confirm("Are you sure you want to cancel this order?")) {
                            try {
                              const response = await fetch(`/api/orders/${order.id}/cancel`, {
                                method: "POST",
                              });
                              
                              if (response.ok) {
                                // Update the order status locally
                                const updatedOrders = orders.map(o => 
                                  o.id === order.id ? { ...o, status: "cancelled" } : o
                                );
                                setOrders(updatedOrders);
                              } else {
                                alert("Failed to cancel order. Please try again.");
                              }
                            } catch (err) {
                              console.error(err);
                              alert("An error occurred. Please try again.");
                            }
                          }
                        }}
                      >
                        Cancel Order
                      </Button>
                    )}
                  </CardFooter>
                </Card>
              ))}
              
              {meta.hasMore && (
                <div className="text-center mt-6">
                  <Button 
                    variant="outline" 
                    onClick={loadMoreOrders}
                    disabled={loading}
                  >
                    {loading ? "Loading..." : "Load More Orders"}
                  </Button>
                </div>
              )}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
} 