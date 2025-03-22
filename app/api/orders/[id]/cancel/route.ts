import { NextRequest, NextResponse } from "next/server";
import { auth } from "../../../../../auth";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

interface RouteParams {
  params: {
    id: string;
  };
}

export async function POST(
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

    // Check if the order can be cancelled (only pending or processing orders)
    if (!["pending", "processing"].includes(order.status)) {
      return NextResponse.json(
        { message: "This order cannot be cancelled" },
        { status: 400 }
      );
    }

    // Update the order status to cancelled
    const updatedOrder = await prisma.order.update({
      where: {
        id,
      },
      data: {
        status: "cancelled",
        updatedAt: new Date(),
      },
    });

    return NextResponse.json({ 
      success: true,
      message: "Order cancelled successfully",
      order: updatedOrder,
    });
  } catch (error) {
    console.error("Error cancelling order:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
} 