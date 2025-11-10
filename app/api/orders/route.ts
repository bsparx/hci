import { NextRequest, NextResponse } from "next/server";
import { ordersDb } from "@/lib/db";

export async function GET(request: NextRequest) {
  try {
    const orders = ordersDb.getAll();

    // Parse items JSON for each order
    const ordersWithParsedItems = orders.map((order: any) => ({
      ...order,
      items: JSON.parse(order.items),
    }));

    return NextResponse.json(ordersWithParsedItems);
  } catch (error) {
    console.error("Error fetching orders:", error);
    return NextResponse.json(
      { error: "Failed to fetch orders" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Generate order ID
    const orderId = `ORD-${Date.now()}-${Math.random()
      .toString(36)
      .substr(2, 9)}`;

    const order = {
      id: orderId,
      restaurantId: body.restaurantId,
      restaurantName: body.restaurantName,
      items: body.items,
      total: body.total,
      status: "pending",
    };

    const result = ordersDb.create(order);

    return NextResponse.json(
      { success: true, orderId, order },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating order:", error);
    return NextResponse.json(
      { error: "Failed to create order" },
      { status: 500 }
    );
  }
}
