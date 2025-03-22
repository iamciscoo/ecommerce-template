import { NextRequest, NextResponse } from "next/server";
import { auth } from "../../../auth";
import { PrismaClient } from "@prisma/client";
import { z } from "zod";

const prisma = new PrismaClient();

// Validation schema for creating orders
const orderCreateSchema = z.object({
  items: z.array(
    z.object({
      productId: z.string(),
      variantId: z.string().optional(),
      quantity: z.number().int().positive(),
    })
  ),
  shippingAddressId: z.string(),
  billingAddressId: z.string().optional(),
  paymentMethod: z.string(),
  shippingMethod: z.string(),
  notes: z.string().optional(),
});

export async function GET(request: NextRequest) {
  try {
    const session = await auth();

    if (!session?.user) {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      );
    }

    // Parse query parameters for pagination and filtering
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");
    const status = searchParams.get("status") || undefined;
    
    const skip = (page - 1) * limit;

    // Build query filters
    const where: any = {
      userId: session.user.id,
    };

    if (status) {
      where.status = status;
    }

    // Fetch orders with pagination
    const [orders, totalOrders] = await Promise.all([
      prisma.order.findMany({
        where,
        include: {
          items: {
            include: {
              product: {
                select: {
                  id: true,
                  name: true,
                  price: true,
                  images: {
                    where: { position: 1 },
                    take: 1,
                  },
                },
              },
              variant: true,
            },
          },
          shippingAddress: true,
        },
        orderBy: {
          createdAt: "desc",
        },
        skip,
        take: limit,
      }),
      prisma.order.count({ where }),
    ]);

    // Calculate pagination metadata
    const totalPages = Math.ceil(totalOrders / limit);
    const hasMore = page < totalPages;

    return NextResponse.json({
      orders,
      meta: {
        currentPage: page,
        totalPages,
        totalItems: totalOrders,
        pageSize: limit,
        hasMore,
      },
    });
  } catch (error) {
    console.error("Error fetching orders:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await auth();

    if (!session?.user) {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      );
    }

    const body = await request.json();

    // Validate request body
    const validatedData = orderCreateSchema.parse(body);

    // Get all products in the order to calculate prices
    const productIds = validatedData.items.map((item) => item.productId);
    const products = await prisma.product.findMany({
      where: {
        id: {
          in: productIds,
        },
      },
      include: {
        variants: {
          where: {
            id: {
              in: validatedData.items
                .filter((item) => item.variantId)
                .map((item) => item.variantId as string),
            },
          },
        },
      },
    });

    // Calculate order totals
    const items = validatedData.items.map((item) => {
      const product = products.find((p) => p.id === item.productId);
      
      if (!product) {
        throw new Error(`Product not found: ${item.productId}`);
      }
      
      let price = product.price;
      let variantId = undefined;
      
      // If variant is specified, use variant price instead
      if (item.variantId) {
        const variant = product.variants.find((v) => v.id === item.variantId);
        
        if (!variant) {
          throw new Error(`Variant not found: ${item.variantId}`);
        }
        
        if (variant.price) {
          price = variant.price;
        }
        
        variantId = variant.id;
      }
      
      // Convert price from Decimal to number for arithmetic operations
      const priceAsNumber = parseFloat(price.toString());
      
      return {
        productId: item.productId,
        variantId,
        quantity: item.quantity,
        price: priceAsNumber,
        total: priceAsNumber * item.quantity,
      };
    });

    // Calculate subtotal, shipping, tax, and total
    const subtotal = items.reduce((sum, item) => sum + item.total, 0);
    
    // In a real app, these would be calculated based on shipping method, tax rules, etc.
    const shipping = 10.0; // Example fixed shipping cost
    const tax = subtotal * 0.15; // Example 15% tax rate
    const total = subtotal + shipping + tax;

    // Generate unique order number
    const orderNumber = `ORD-${Date.now()}-${Math.floor(
      Math.random() * 1000
    ).toString().padStart(3, "0")}`;

    // Create the order
    const order = await prisma.order.create({
      data: {
        orderNumber,
        userId: session.user.id,
        subtotal,
        shipping,
        tax,
        total,
        status: "pending",
        paymentStatus: "pending",
        paymentMethod: validatedData.paymentMethod,
        metadata: {
          shippingMethod: validatedData.shippingMethod
        },
        notes: validatedData.notes,
        shippingAddressId: validatedData.shippingAddressId,
        billingAddressId: validatedData.billingAddressId || validatedData.shippingAddressId,
        items: {
          create: items.map((item) => ({
            productId: item.productId,
            variantId: item.variantId,
            quantity: item.quantity,
            price: item.price,
            total: item.total,
          })),
        },
      },
      include: {
        items: {
          include: {
            product: true,
            variant: true,
          },
        },
        shippingAddress: true,
        billingAddress: true,
      },
    });

    return NextResponse.json(
      { message: "Order created successfully", order },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating order:", error);

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