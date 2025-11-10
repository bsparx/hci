import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/lib/cart-context";
import { AccessibilityProvider } from "@/lib/accessibility-context";
import { AuthProvider } from "@/lib/auth-context";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "FoodPapa - Order Food Online",
  description: "Modern food delivery app - Order your favorite food from the best restaurants",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans antialiased bg-[#F8F9FA]`}>
        <AuthProvider>
          <AccessibilityProvider>
            <CartProvider>
              {children}
            </CartProvider>
          </AccessibilityProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
