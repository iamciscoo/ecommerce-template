"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { 
  ArrowLeft, 
  Clock, 
  Package, 
  Truck, 
  CheckCircle2, 
  MapPin, 
  CreditCard,
  Mail
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

// This would come from your backend in a real app
const MOCK_ORDER = {
  id: "ORD-12345",
  date: "August 15, 2023",
  status: "delivered",
  total: 129.99,
  subtotal: 119.99,
  shippingCost: 10.00,
  tax: 0,
  items: [
    {
      id: 1,
      name: "Wireless Bluetooth Headphones",
      price: 79.99,
      quantity: 1,
      image: "/placeholders/headphones.jpg"
    },
    {
      id: 2,
      name: "Smart Watch",
      price: 50.00,
      quantity: 1,
      image: "/placeholders/smartwatch.jpg"
    }
  ],
  shippingAddress: {
    fullName: "John Doe",
    address: "123 Main St",
    city: "New York",
    state: "NY",
    zipCode: "10001",
    country: "United States"
  },
  billingAddress: {
    fullName: "John Doe",
    address: "123 Main St",
    city: "New York",
    state: "NY",
    zipCode: "10001",
    country: "United States"
  },
  contactInfo: {
    email: "john.doe@example.com",
    phone: "+1 (555) 123-4567"
  },
  paymentMethod: "Mobile Money",
  deliveryDate: "August 20, 2023"
};

// Track order delivery with milestones
const ORDER_TIMELINE = [
  { 
    status: "ordered", 
    label: "Order Placed", 
    date: "August 15, 2023", 
    description: "Your order has been received and is being processed" 
  },
  { 
    status: "processing", 
    label: "Processing", 
    date: "August 16, 2023", 
    description: "Your order is being prepared for shipping" 
  },
  { 
    status: "shipped", 
    label: "Shipped", 
    date: "August 17, 2023", 
    description: "Your order has been shipped and is on its way" 
  },
  { 
    status: "delivered", 
    label: "Delivered", 
    date: "August 20, 2023", 
    description: "Your order has been delivered" 
  }
];

interface OrderDetailContentProps {
  orderId: string;
}

export default function OrderDetailContent({ orderId }: OrderDetailContentProps) {
  const [order, setOrder] = useState<typeof MOCK_ORDER | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // Simulate fetching order details
  useEffect(() => {
    // In a real app, you would fetch the order from your API
    const fetchOrder = async () => {
      try {
        // Simulate API request
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // Check if order ID matches our mock data
        if (orderId === MOCK_ORDER.id) {
          setOrder(MOCK_ORDER);
        } else {
          // Handle order not found
          router.push("/orders");
        }
      } catch (error) {
        console.error("Error fetching order:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [orderId, router]);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "processing":
        return <Clock className="h-4 w-4" />;
      case "shipped":
        return <Truck className="h-4 w-4" />;
      case "delivered":
        return <CheckCircle2 className="h-4 w-4" />;
      default:
        return <Package className="h-4 w-4" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "processing":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "shipped":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "delivered":
        return "bg-green-100 text-green-800 border-green-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  if (loading) {
    return (
      <div className="container py-10">
        <div className="max-w-4xl mx-auto flex flex-col gap-8">
          <div className="h-8 w-1/3 bg-muted animate-pulse rounded-md"></div>
          <div className="h-64 bg-muted animate-pulse rounded-lg"></div>
          <div className="h-48 bg-muted animate-pulse rounded-lg"></div>
        </div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="container py-10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl font-bold mb-4">Order Not Found</h2>
          <p className="text-muted-foreground mb-6">
            We couldn&apos;t find the order you were looking for.
          </p>
          <Button asChild>
            <Link href="/orders">Back to Orders</Link>
          </Button>
        </div>
      </div>
    );
  }

  // Calculate the current status based on the order status
  const currentStatus = order.status;
  const currentStep = ORDER_TIMELINE.findIndex(step => step.status === currentStatus);

  return (
    <div className="container py-10">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <Button variant="outline" size="icon" asChild>
            <Link href="/orders">
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <h1 className="text-2xl font-bold">Order Details</h1>
        </div>

        {/* Order Summary */}
        <div className="bg-white p-6 rounded-lg border border-border mb-6">
          <div className="flex flex-col md:flex-row justify-between gap-4 mb-6">
            <div>
              <h2 className="text-lg font-medium">{order.id}</h2>
              <p className="text-sm text-muted-foreground">
                Placed on {order.date}
              </p>
            </div>
            <Badge 
              variant="outline" 
              className={cn("flex items-center gap-1 self-start", getStatusColor(order.status))}
            >
              {getStatusIcon(order.status)}
              <span className="capitalize">{order.status}</span>
            </Badge>
          </div>

          {/* Order Timeline */}
          <div className="mb-6">
            <h3 className="font-medium mb-4">Order Timeline</h3>
            <div className="relative">
              {/* Progress line */}
              <div className="absolute left-2.5 top-0 h-full w-0.5 bg-muted">
                <div 
                  className="absolute left-0 top-0 h-full w-0.5 bg-primary"
                  style={{ height: `${(currentStep + 1) * 100 / ORDER_TIMELINE.length}%` }}
                ></div>
              </div>
              
              {/* Timeline items */}
              <div className="space-y-8 relative">
                {ORDER_TIMELINE.map((step, index) => (
                  <div key={step.status} className="flex gap-4">
                    <div className={cn(
                      "h-5 w-5 rounded-full border-2 flex-shrink-0",
                      index <= currentStep 
                        ? "bg-primary border-primary" 
                        : "bg-background border-muted"
                    )}></div>
                    <div>
                      <p className="font-medium">{step.label}</p>
                      <p className="text-sm text-muted-foreground">
                        {step.date}
                      </p>
                      <p className="text-sm mt-1">
                        {step.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <Separator className="my-6" />

          {/* Order Items */}
          <div className="mb-6">
            <h3 className="font-medium mb-4">Order Items</h3>
            <div className="space-y-4">
              {order.items.map((item) => (
                <div key={item.id} className="flex items-center gap-4">
                  <div className="h-16 w-16 bg-muted rounded-md flex items-center justify-center">
                    {item.image ? (
                      <Image 
                        src={item.image} 
                        alt={item.name} 
                        width={64}
                        height={64}
                        className="object-contain h-full w-full rounded-md"
                      />
                    ) : (
                      <Package className="h-8 w-8 text-muted-foreground" />
                    )}
                  </div>
                  
                  <div className="flex-1">
                    <p className="font-medium">{item.name}</p>
                    <p className="text-sm text-muted-foreground">
                      Qty: {item.quantity}
                    </p>
                  </div>
                  
                  <div className="font-medium">
                    ${item.price.toFixed(2)}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <Separator className="my-6" />

          {/* Order Totals */}
          <div className="space-y-2 mb-6">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Subtotal</span>
              <span>${order.subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Shipping</span>
              <span>${order.shippingCost.toFixed(2)}</span>
            </div>
            {order.tax > 0 && (
              <div className="flex justify-between">
                <span className="text-muted-foreground">Tax</span>
                <span>${order.tax.toFixed(2)}</span>
              </div>
            )}
            <div className="flex justify-between font-medium text-lg pt-2">
              <span>Total</span>
              <span>${order.total.toFixed(2)}</span>
            </div>
          </div>
        </div>

        {/* Customer Information */}
        <div className="bg-white p-6 rounded-lg border border-border">
          <h3 className="font-medium mb-6">Customer Information</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Contact Information */}
            <div>
              <h4 className="text-sm font-medium flex items-center gap-2 mb-2">
                <Mail className="h-4 w-4" />
                Contact Information
              </h4>
              <div className="bg-muted rounded-md p-4">
                <p>{order.contactInfo.email}</p>
                <p>{order.contactInfo.phone}</p>
              </div>
            </div>
            
            {/* Payment Method */}
            <div>
              <h4 className="text-sm font-medium flex items-center gap-2 mb-2">
                <CreditCard className="h-4 w-4" />
                Payment Method
              </h4>
              <div className="bg-muted rounded-md p-4">
                <p>{order.paymentMethod}</p>
              </div>
            </div>
            
            {/* Shipping Address */}
            <div>
              <h4 className="text-sm font-medium flex items-center gap-2 mb-2">
                <MapPin className="h-4 w-4" />
                Shipping Address
              </h4>
              <div className="bg-muted rounded-md p-4">
                <p>{order.shippingAddress.fullName}</p>
                <p>{order.shippingAddress.address}</p>
                <p>
                  {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zipCode}
                </p>
                <p>{order.shippingAddress.country}</p>
              </div>
            </div>
            
            {/* Billing Address */}
            <div>
              <h4 className="text-sm font-medium flex items-center gap-2 mb-2">
                <MapPin className="h-4 w-4" />
                Billing Address
              </h4>
              <div className="bg-muted rounded-md p-4">
                <p>{order.billingAddress.fullName}</p>
                <p>{order.billingAddress.address}</p>
                <p>
                  {order.billingAddress.city}, {order.billingAddress.state} {order.billingAddress.zipCode}
                </p>
                <p>{order.billingAddress.country}</p>
              </div>
            </div>
          </div>
          
          <div className="mt-6 flex justify-between">
            {/* Cancel Order button would be conditionally shown based on order status */}
            {order.status !== "delivered" && (
              <Button variant="outline" className="text-destructive">
                Cancel Order
              </Button>
            )}
            
            <Button asChild>
              <Link href="/contact">Need Help?</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
} 