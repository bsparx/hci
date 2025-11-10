import { NextRequest, NextResponse } from "next/server";
import { restaurantDb, menuDb, reviewsDb } from "@/lib/db";

export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const restaurant = restaurantDb.getBySlug(params.slug);

    if (!restaurant) {
      return NextResponse.json(
        { error: "Restaurant not found" },
        { status: 404 }
      );
    }

    // Get menu items
    const menu = menuDb.getByRestaurant((restaurant as any).id);

    // Get reviews
    const reviews = reviewsDb.getByRestaurant((restaurant as any).id);

    // Format response
    const response = {
      ...(restaurant as any),
      deliveryTime: (restaurant as any).delivery_time,
      isClosed: (restaurant as any).is_closed === 1,
      menu,
      reviews,
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error("Error fetching restaurant:", error);
    return NextResponse.json(
      { error: "Failed to fetch restaurant" },
      { status: 500 }
    );
  }
}
