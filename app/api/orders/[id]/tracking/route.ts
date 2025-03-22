import { NextRequest, NextResponse } from "next/server";
import { auth } from "../../../../../auth";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

interface RouteParams {
  params: {
    id: string;
  };
}

export async function GET(
  request: NextRequest,
  { params }: RouteParams
) {
  try {
    const session = await auth();

    if (!session?.user) {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      );
    }

    const { id } = params;

    // Find the order to make sure it exists and belongs to the user
    const order = await prisma.order.findUnique({
      where: {
        id,
        userId: session.user.id,
      },
    });

    if (!order) {
      return NextResponse.json(
        { message: "Order not found" },
        { status: 404 }
      );
    }

    // In a real app, you would fetch tracking information from a shipping API
    // For this example, we'll generate mock tracking data
    const trackingInfo = generateMockTrackingInfo(order);

    return NextResponse.json({ 
      tracking: trackingInfo,
    });
  } catch (error) {
    console.error("Error fetching tracking information:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}

// Helper function to generate mock tracking information
function generateMockTrackingInfo(order: any) {
  const orderDate = new Date(order.createdAt);
  const currentDate = new Date();
  
  // Only shipped and delivered orders have tracking information
  if (!["shipped", "delivered"].includes(order.status)) {
    return {
      trackingNumber: null,
      carrier: null,
      status: "Not yet shipped",
      estimatedDelivery: null,
      events: [],
    };
  }
  
  // Generate mock tracking number
  const trackingNumber = `TRK${Math.floor(Math.random() * 1000000).toString().padStart(6, '0')}`;
  
  // Calculate estimated delivery date (5 days after order date)
  const estimatedDelivery = new Date(orderDate);
  estimatedDelivery.setDate(estimatedDelivery.getDate() + 5);
  
  // Generate mock tracking events
  const events = [];
  
  // Order placed event
  events.push({
    date: orderDate.toISOString(),
    location: "Order Processing Center",
    description: "Order received",
  });
  
  // Processing event (1 day after order)
  const processingDate = new Date(orderDate);
  processingDate.setDate(processingDate.getDate() + 1);
  events.push({
    date: processingDate.toISOString(),
    location: "Distribution Center",
    description: "Order processed and ready for shipping",
  });
  
  // Shipped event (2 days after order)
  const shippedDate = new Date(orderDate);
  shippedDate.setDate(shippedDate.getDate() + 2);
  if (currentDate >= shippedDate) {
    events.push({
      date: shippedDate.toISOString(),
      location: "Regional Hub",
      description: "Package has shipped",
    });
  }
  
  // In transit event (3 days after order)
  const inTransitDate = new Date(orderDate);
  inTransitDate.setDate(inTransitDate.getDate() + 3);
  if (currentDate >= inTransitDate) {
    events.push({
      date: inTransitDate.toISOString(),
      location: "Local Facility",
      description: "Package in transit to destination",
    });
  }
  
  // Out for delivery event (4 days after order)
  const outForDeliveryDate = new Date(orderDate);
  outForDeliveryDate.setDate(outForDeliveryDate.getDate() + 4);
  if (currentDate >= outForDeliveryDate && order.status === "delivered") {
    events.push({
      date: outForDeliveryDate.toISOString(),
      location: "Local Delivery Facility",
      description: "Package out for delivery",
    });
  }
  
  // Delivered event (5 days after order)
  const deliveredDate = new Date(orderDate);
  deliveredDate.setDate(deliveredDate.getDate() + 5);
  if (order.status === "delivered") {
    events.push({
      date: deliveredDate.toISOString(),
      location: "Destination",
      description: "Package delivered",
    });
  }
  
  return {
    trackingNumber,
    carrier: "Express Delivery",
    status: order.status === "delivered" ? "Delivered" : "In Transit",
    estimatedDelivery: estimatedDelivery.toISOString(),
    events: events.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()), // Sort by date descending
  };
} 