"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowLeft, Package, Truck, MapPin, Calendar, Clock } from "lucide-react";
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
import { LoadingStates, FadeIn } from "@/components/ui/ux-enhancements";
import { formatDate, cn } from "@/lib/utils";

interface OrderTrackingProps {
  orderId: string;
}

interface TrackingEvent {
  date: string;
  location: string;
  description: string;
}

interface TrackingInfo {
  trackingNumber: string | null;
  carrier: string | null;
  status: string;
  estimatedDelivery: string | null;
  events: TrackingEvent[];
}

export function OrderTracking({ orderId }: OrderTrackingProps) {
  const [tracking, setTracking] = useState<TrackingInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [orderNumber, setOrderNumber] = useState<string | null>(null);

  const fetchTrackingInfo = async () => {
    try {
      setLoading(true);
      
      // First fetch basic order info to get order number
      const orderResponse = await fetch(`/api/orders/${orderId}`);
      
      if (orderResponse.status === 404) {
        setError("Order not found");
        return;
      }
      
      if (!orderResponse.ok) {
        throw new Error("Failed to fetch order details");
      }
      
      const orderData = await orderResponse.json();
      setOrderNumber(orderData.order.orderNumber);
      
      // Now fetch tracking info
      const trackingResponse = await fetch(`/api/orders/${orderId}/tracking`);
      
      if (!trackingResponse.ok) {
        throw new Error("Failed to fetch tracking information");
      }
      
      const data = await trackingResponse.json();
      setTracking(data.tracking);
      setError(null);
    } catch (err) {
      console.error(err);
      setError("Error loading tracking information. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTrackingInfo();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [orderId]);

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-2 mb-8">
          <Button variant="ghost" size="sm" asChild>
            <Link href={`/orders/${orderId}`}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Order
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
            <Link href={`/orders/${orderId}`}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Order
            </Link>
          </Button>
        </div>
        <Card>
          <CardContent className="py-10">
            <div className="text-center">
              <p className="text-destructive mb-4">{error}</p>
              <Button onClick={fetchTrackingInfo}>Try Again</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!tracking) {
    return null;
  }

  const isDelivered = tracking.status === "Delivered";
  const isNotShipped = tracking.status === "Not yet shipped";

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" asChild>
              <Link href={`/orders/${orderId}`}>
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Order
              </Link>
            </Button>
          </div>
          <h1 className="text-3xl font-bold mt-4">Track Your Order</h1>
          {orderNumber && (
            <p className="text-muted-foreground">
              Order #{orderNumber}
            </p>
          )}
        </div>
      </div>
      
      {isNotShipped ? (
        <Card>
          <CardHeader>
            <CardTitle>Not Yet Shipped</CardTitle>
            <CardDescription>
              Your order is being processed and has not been shipped yet
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <Package className="h-16 w-16 text-muted-foreground mb-4" />
            <h3 className="text-xl font-medium mb-2">Preparing Your Order</h3>
            <p className="text-center text-muted-foreground max-w-md mb-6">
              Your order is currently being prepared for shipping.
              We&apos;ll notify you once it&apos;s on its way!
            </p>
            <Button asChild>
              <Link href={`/orders/${orderId}`}>
                View Order Details
              </Link>
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Tracking Status */}
          <div className="md:col-span-3">
            <FadeIn>
              <Card>
                <CardHeader>
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
                    <div>
                      <CardTitle>Tracking Status</CardTitle>
                      <CardDescription>
                        {isDelivered
                          ? "Your package has been delivered"
                          : "Your package is on its way"}
                      </CardDescription>
                    </div>
                    
                    <div className="flex flex-col sm:items-end gap-1">
                      {tracking.trackingNumber && (
                        <div className="text-sm">
                          <span className="text-muted-foreground">Tracking Number: </span>
                          <span className="font-medium">{tracking.trackingNumber}</span>
                        </div>
                      )}
                      
                      {tracking.carrier && (
                        <div className="text-sm">
                          <span className="text-muted-foreground">Carrier: </span>
                          <span className="font-medium">{tracking.carrier}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent>
                  <div className="flex flex-col md:flex-row gap-8 items-center md:items-start">
                    <div className="flex-1 w-full">
                      <div className="relative pb-4">
                        {/* Progress bar */}
                        <div className="absolute left-[15px] top-[15px] bottom-0 w-0.5 bg-primary/20" />
                        
                        {/* Timeline with package journey */}
                        <ul className="space-y-8 relative">
                          {isDelivered ? (
                            <li className="pl-10 relative">
                              <span className="absolute left-0 top-0 flex items-center justify-center w-8 h-8 rounded-full bg-green-100 text-green-800 border-2 border-green-200">
                                <MapPin className="h-4 w-4" />
                              </span>
                              <div className="flex flex-col">
                                <span className="font-medium">Delivered</span>
                                <span className="text-sm text-muted-foreground">
                                  Your package has been delivered
                                </span>
                              </div>
                            </li>
                          ) : (
                            <li className="pl-10 relative">
                              <span className="absolute left-0 top-0 flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary border-2 border-primary">
                                <Truck className="h-4 w-4" />
                              </span>
                              <div className="flex flex-col">
                                <span className="font-medium">In Transit</span>
                                <span className="text-sm text-muted-foreground">
                                  Your package is on its way
                                </span>
                              </div>
                            </li>
                          )}
                          
                          {tracking.estimatedDelivery && (
                            <li className="pl-10 relative">
                              <span 
                                className={cn(
                                  "absolute left-0 top-0 flex items-center justify-center w-8 h-8 rounded-full border-2",
                                  isDelivered 
                                    ? "bg-green-100 text-green-800 border-green-200" 
                                    : "bg-primary/10 text-primary border-primary/50"
                                )}
                              >
                                <Calendar className="h-4 w-4" />
                              </span>
                              <div className="flex flex-col">
                                <span className="font-medium">
                                  {isDelivered ? "Delivered On" : "Estimated Delivery"}
                                </span>
                                <span className="text-sm text-muted-foreground">
                                  {formatDate(tracking.estimatedDelivery)}
                                </span>
                              </div>
                            </li>
                          )}
                        </ul>
                      </div>
                    </div>
                    
                    <div className="w-full md:w-2/5 flex flex-col items-center justify-center py-4 px-6 bg-muted/30 rounded-lg">
                      <div className="relative w-full max-w-[180px] aspect-square mb-4">
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-full h-full rounded-full bg-primary/5 animate-ping-slow" />
                        </div>
                        <div className="absolute inset-[15%] flex items-center justify-center">
                          <div className="w-full h-full rounded-full bg-primary/10 animate-ping-slow animation-delay-500" />
                        </div>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="bg-background p-4 rounded-full shadow-sm">
                            <Truck className="h-12 w-12 text-primary" />
                          </div>
                        </div>
                      </div>
                      
                      <div className="text-center">
                        <h3 className="font-medium">{tracking.status}</h3>
                        <p className="text-sm text-muted-foreground">
                          {isDelivered 
                            ? "Your package has been delivered" 
                            : tracking.estimatedDelivery 
                              ? `Estimated delivery: ${formatDate(tracking.estimatedDelivery)}` 
                              : "Your package is in transit"}
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </FadeIn>
          </div>
          
          {/* Tracking Events */}
          {tracking.events.length > 0 && (
            <FadeIn delay={0.1} className="md:col-span-3">
              <Card>
                <CardHeader>
                  <CardTitle>Tracking History</CardTitle>
                  <CardDescription>
                    Detailed tracking information for your package
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="relative">
                    <div className="absolute left-3 top-0 bottom-0 w-0.5 bg-muted" />
                    
                    <ul className="space-y-6">
                      {tracking.events.map((event, index) => (
                        <li key={index} className="relative pl-10">
                          <div 
                            className={cn(
                              "absolute left-0 top-1 h-6 w-6 rounded-full flex items-center justify-center border-2",
                              index === 0 
                                ? "bg-primary/10 border-primary" 
                                : "bg-muted/50 border-muted"
                            )}
                          >
                            {index === 0 ? (
                              <Truck className="h-3 w-3 text-primary" />
                            ) : (
                              <Clock className="h-3 w-3 text-muted-foreground" />
                            )}
                          </div>
                          
                          <div>
                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
                              <span className="font-medium">{event.description}</span>
                              <span className="text-sm text-muted-foreground">
                                {formatDate(event.date)}
                              </span>
                            </div>
                            
                            <p className="text-sm text-muted-foreground">
                              {event.location}
                            </p>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </FadeIn>
          )}
        </div>
      )}
    </div>
  );
} 