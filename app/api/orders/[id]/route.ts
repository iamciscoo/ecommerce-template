import { NextRequest, NextResponse } from "next/server";
import { auth } from "../../../../auth";
import { PrismaClient } from "@prisma/client";
import { z } from "zod";

const prisma = new PrismaClient();

const orderUpdateSchema = z.object({
  status: z.enum([
    "pending",
    "processing",
    "shipped",
    "delivered",
    "cancelled",
  ]).optional(),
  paymentStatus: z.enum([
    "pending",
    "paid",
    "failed",
    "refunded",
  ]).optional(),
  notes: z.string().optional(),
});

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

    // Fetch the order with all related data
    const order = await prisma.order.findUnique({
      where: {
        id,
        userId: session.user.id, // Ensure the order belongs to the user
      },
      include: {
        items: {
          include: {
            product: {
              include: {
                images: {
                  orderBy: {
                    position: "asc",
                  },
                },
              },
            },
            variant: true,
          },
        },
        shippingAddress: true,
        billingAddress: true,
      },
    });

    if (!order) {
      return NextResponse.json(
        { message: "Order not found" },
        { status: 404 }
      );
    }

    // If user is admin, also include admin-specific data
    let orderWithTimeline = order;
    
    if (session.user.role === "admin") {
      // In a real app, you would fetch additional admin data here
      // For example, admin notes, payment details, etc.
    }

    // Generate order timeline based on status and createdAt/updatedAt
    // In a real app, this would come from a separate table tracking status changes
    const timeline = generateOrderTimeline(order);

    return NextResponse.json({ 
      order: orderWithTimeline,
      timeline,
    });
  } catch (error) {
    console.error("Error fetching order:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function PATCH(
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

    // Only admin users can update orders
    if (session.user.role !== "admin") {
      return NextResponse.json(
        { message: "Forbidden" },
        { status: 403 }
      );
    }

    const { id } = params;
    const body = await request.json();

    // Validate request body
    const validatedData = orderUpdateSchema.parse(body);

    // Update the order
    const updatedOrder = await prisma.order.update({
      where: {
        id,
      },
      data: {
        ...validatedData,
        updatedAt: new Date(),
      },
      include: {
        items: {
          include: {
            product: true,
            variant: true,
          },
        },
        shippingAddress: true,
      },
    });

    return NextResponse.json({ order: updatedOrder });
  } catch (error) {
    console.error("Error updating order:", error);

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { message: "Invalid data", errors: error.errors },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}

// Helper function to generate order timeline based on order status
function generateOrderTimeline(order: any) {
  const orderDate = new Date(order.createdAt);
  const updateDate = new Date(order.updatedAt);
  
  // Estimate dates based on status
  // In a real app, you would have actual timestamps for each status change
  const processingDate = new Date(orderDate);
  processingDate.setDate(processingDate.getDate() + 1);
  
  const shippedDate = new Date(orderDate);
  shippedDate.setDate(shippedDate.getDate() + 2);
  
  const deliveredDate = new Date(orderDate);
  deliveredDate.setDate(deliveredDate.getDate() + 5);

  const timeline = [
    {
      status: "pending",
      label: "Order Placed",
      date: orderDate.toISOString(),
      completed: true,
      current: order.status === "pending",
      description: "Your order has been received and is being processed",
    },
    {
      status: "processing",
      label: "Processing",
      date: processingDate.toISOString(),
      completed: ["processing", "shipped", "delivered"].includes(order.status),
      current: order.status === "processing",
      description: "Your order is being prepared for shipping",
    },
    {
      status: "shipped",
      label: "Shipped",
      date: shippedDate.toISOString(),
      completed: ["shipped", "delivered"].includes(order.status),
      current: order.status === "shipped",
      description: "Your order has been shipped and is on its way",
    },
    {
      status: "delivered",
      label: "Delivered",
      date: deliveredDate.toISOString(),
      completed: order.status === "delivered",
      current: order.status === "delivered",
      description: "Your order has been delivered",
    },
  ];

  // If order is cancelled, add cancelled status to timeline
  if (order.status === "cancelled") {
    timeline.push({
      status: "cancelled",
      label: "Cancelled",
      date: updateDate.toISOString(),
      completed: true,
      current: true,
      description: "Your order has been cancelled",
    });
  }

  return timeline;
} 