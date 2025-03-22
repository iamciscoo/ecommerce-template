"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Package, Truck, Clock, CheckCircle2, X } from "lucide-react";
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
import { Separator } from "@/components/ui/separator";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { LoadingStates, FadeIn } from "@/components/ui/ux-enhancements";
import { formatDate, formatCurrency, cn } from "@/lib/utils";

interface OrderDetailProps {
  orderId: string;
}

export function OrderDetail({ orderId }: OrderDetailProps) {
  const [order, setOrder] = useState<any>(null);
  const [timeline, setTimeline] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);

  const fetchOrderDetails = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/orders/${orderId}`);
      
      if (response.status === 404) {
        setError("Order not found");
        return;
      }
      
      if (!response.ok) {
        throw new Error("Failed to fetch order details");
      }
      
      const data = await response.json();
      setOrder(data.order);
      setTimeline(data.timeline);
      
      // Check if user is admin based on their session
      // In a real app, this would be passed from the server or checked via a separate endpoint
      const sessionResponse = await fetch("/api/auth/session");
      const sessionData = await sessionResponse.json();
      setIsAdmin(sessionData?.user?.role === "admin");
      
      setError(null);
    } catch (err) {
      console.error(err);
      setError("Error loading order details. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrderDetails();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [orderId]);

  const handleUpdateStatus = async (status: string) => {
    if (!isAdmin) return;
    
    try {
      const response = await fetch(`/api/orders/${orderId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status }),
      });
      
      if (!response.ok) {
        throw new Error("Failed to update order status");
      }
      
      // Refetch order details to get updated data
      fetchOrderDetails();
    } catch (err) {
      console.error(err);
      alert("Error updating order status");
    }
  };

  const handleCancelOrder = async () => {
    if (!window.confirm("Are you sure you want to cancel this order?")) {
      return;
    }
    
    try {
      const response = await fetch(`/api/orders/${orderId}/cancel`, {
        method: "POST",
      });
      
      if (!response.ok) {
        throw new Error("Failed to cancel order");
      }
      
      // Refetch order details to get updated data
      fetchOrderDetails();
    } catch (err) {
      console.error(err);
      alert("Error cancelling order");
    }
  };

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-2 mb-8">
          <Button variant="ghost" size="sm" asChild>
            <Link href="/orders">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Orders
            </Link>
          </Button>
        </div>
        <LoadingStates variant="product-detail" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-2 mb-8">
          <Button variant="ghost" size="sm" asChild>
            <Link href="/orders">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Orders
            </Link>
          </Button>
        </div>
        <Card>
          <CardContent className="py-10">
            <div className="text-center">
              <p className="text-destructive mb-4">{error}</p>
              <Button onClick={fetchOrderDetails}>Try Again</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!order) {
    return null;
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pending":
        return <Clock className="h-5 w-5" />;
      case "processing":
        return <Package className="h-5 w-5" />;
      case "shipped":
        return <Truck className="h-5 w-5" />;
      case "delivered":
        return <CheckCircle2 className="h-5 w-5" />;
      case "cancelled":
        return <X className="h-5 w-5" />;
      default:
        return <Package className="h-5 w-5" />;
    }
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

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" asChild>
              <Link href="/orders">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Orders
              </Link>
            </Button>
          </div>
          <h1 className="text-3xl font-bold mt-4">Order #{order.orderNumber}</h1>
          <p className="text-muted-foreground">
            Placed on {formatDate(order.createdAt)}
          </p>
        </div>
        
        <div className="flex items-center gap-2">
          {getStatusBadge(order.status)}
          
          {isAdmin && (
            <Select defaultValue={order.status} onValueChange={handleUpdateStatus}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Update status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="processing">Processing</SelectItem>
                <SelectItem value="shipped">Shipped</SelectItem>
                <SelectItem value="delivered">Delivered</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>
          )}
          
          {["pending", "processing"].includes(order.status) && !isAdmin && (
            <Button 
              variant="outline" 
              size="sm"
              className="text-destructive hover:text-destructive"
              onClick={handleCancelOrder}
            >
              Cancel Order
            </Button>
          )}
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* Order Timeline */}
        <FadeIn className="md:col-span-3">
          <Card>
            <CardHeader>
              <CardTitle>Order Status</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="relative">
                {/* Timeline connector */}
                <div className="absolute top-0 left-7 bottom-0 w-0.5 bg-muted" />
                
                <div className="space-y-8">
                  {timeline.map((item, index) => (
                    <div key={item.status} className="relative pl-16">
                      <div 
                        className={cn(
                          "absolute left-0 top-0 h-14 w-14 rounded-full border-2 flex items-center justify-center",
                          item.completed ? "border-primary bg-primary/10" : "border-muted bg-background"
                        )}
                      >
                        {getStatusIcon(item.status)}
                      </div>
                      <div>
                        <h3 className="font-medium flex items-center gap-2">
                          {item.label}
                          {item.current && (
                            <Badge variant="secondary" className="ml-2">Current</Badge>
                          )}
                        </h3>
                        <time className="text-sm text-muted-foreground">
                          {formatDate(item.date)}
                        </time>
                        <p className="mt-1 text-sm">{item.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </FadeIn>
        
        {/* Order Items */}
        <div className="md:col-span-2">
          <FadeIn delay={0.1}>
            <Card>
              <CardHeader>
                <CardTitle>Order Items</CardTitle>
                <CardDescription>
                  {order.items.length} {order.items.length === 1 ? "item" : "items"} in your order
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {order.items.map((item: any) => (
                    <div key={item.id} className="flex gap-4">
                      <div className="h-20 w-20 bg-muted rounded-md flex items-center justify-center">
                        {item.product.images && item.product.images[0] ? (
                          <Image 
                            src={item.product.images[0].url} 
                            alt={item.product.name} 
                            width={80}
                            height={80}
                            className="object-contain h-full w-full rounded-md"
                          />
                        ) : (
                          <Package className="h-8 w-8 text-muted-foreground" />
                        )}
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex justify-between">
                          <Link href={`/products/${item.product.id}`} className="font-medium hover:underline">
                            {item.product.name}
                          </Link>
                          <span className="font-medium">
                            {formatCurrency(item.total)}
                          </span>
                        </div>
                        
                        <div className="text-sm text-muted-foreground mt-1">
                          <span>Qty: {item.quantity}</span>
                          {item.variant && (
                            <span className="ml-4">
                              Variant: {item.variant.name || item.variant.value}
                            </span>
                          )}
                        </div>
                        
                        <div className="text-sm mt-1">
                          {formatCurrency(item.price)} each
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </FadeIn>
        </div>
        
        {/* Order Summary */}
        <FadeIn delay={0.2} className="md:row-start-2">
          <Card>
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Subtotal</span>
                  <span>{formatCurrency(order.subtotal || 0)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Shipping</span>
                  <span>{formatCurrency(order.shipping || 0)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Tax</span>
                  <span>{formatCurrency(order.tax || 0)}</span>
                </div>
                {order.discount > 0 && (
                  <div className="flex justify-between text-sm text-green-600">
                    <span>Discount</span>
                    <span>-{formatCurrency(order.discount)}</span>
                  </div>
                )}
              </div>
              
              <Separator className="my-3" />
              
              <div className="flex justify-between font-medium">
                <span>Total</span>
                <span>{formatCurrency(order.total)}</span>
              </div>
              
              <div className="mt-4 space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="font-medium">Payment Method</span>
                  <span className="capitalize">{order.paymentMethod}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="font-medium">Payment Status</span>
                  <Badge variant={order.paymentStatus === "paid" ? "default" : "outline"} className="ml-2">
                    {order.paymentStatus}
                  </Badge>
                </div>
              </div>
            </CardContent>
            
            {order.status === "shipped" && (
              <CardFooter>
                <Button className="w-full" asChild>
                  <Link href={`/orders/${order.id}/tracking`}>
                    Track Order
                  </Link>
                </Button>
              </CardFooter>
            )}
          </Card>
        </FadeIn>
        
        {/* Address Information */}
        <FadeIn delay={0.3} className="md:col-span-2 md:row-start-2">
          <Card>
            <CardHeader>
              <CardTitle>Shipping & Billing</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-medium mb-2">Shipping Address</h3>
                  {order.shippingAddress ? (
                    <address className="not-italic text-sm text-muted-foreground">
                      <p>{order.shippingAddress.name}</p>
                      <p>{order.shippingAddress.line1}</p>
                      {order.shippingAddress.line2 && <p>{order.shippingAddress.line2}</p>}
                      <p>
                        {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.postalCode}
                      </p>
                      <p>{order.shippingAddress.country}</p>
                      {order.shippingAddress.phone && <p>{order.shippingAddress.phone}</p>}
                    </address>
                  ) : (
                    <p className="text-sm text-muted-foreground">No shipping address provided</p>
                  )}
                </div>
                
                <div>
                  <h3 className="font-medium mb-2">Billing Address</h3>
                  {order.billingAddress ? (
                    <address className="not-italic text-sm text-muted-foreground">
                      <p>{order.billingAddress.name}</p>
                      <p>{order.billingAddress.line1}</p>
                      {order.billingAddress.line2 && <p>{order.billingAddress.line2}</p>}
                      <p>
                        {order.billingAddress.city}, {order.billingAddress.state} {order.billingAddress.postalCode}
                      </p>
                      <p>{order.billingAddress.country}</p>
                      {order.billingAddress.phone && <p>{order.billingAddress.phone}</p>}
                    </address>
                  ) : (
                    <p className="text-sm text-muted-foreground">Same as shipping address</p>
                  )}
                </div>
              </div>
              
              {order.notes && (
                <div className="mt-6">
                  <h3 className="font-medium mb-2">Order Notes</h3>
                  <p className="text-sm text-muted-foreground">{order.notes}</p>
                </div>
              )}
            </CardContent>
          </Card>
        </FadeIn>
      </div>
    </div>
  );
} 