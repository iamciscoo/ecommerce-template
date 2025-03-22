// Add Edge runtime to avoid client-side hooks issues
export const runtime = 'edge';

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

// Demo featured products
const featuredProducts = [
  {
    id: "1",
    name: "Wireless Bluetooth Earbuds",
    price: 59.99,
    originalPrice: 79.99,
    image: "https://images.pexels.com/photos/3780681/pexels-photo-3780681.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    category: "Electronics",
    isNew: true,
    isFeatured: false,
    isOnSale: true,
    slug: "wireless-bluetooth-earbuds",
  },
  {
    id: "2",
    name: "Smart Watch Fitness Tracker",
    price: 89.99,
    originalPrice: 119.99,
    image: "https://images.pexels.com/photos/437037/pexels-photo-437037.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    category: "Electronics",
    isNew: false,
    isFeatured: true,
    isOnSale: true,
    slug: "smart-watch-fitness-tracker",
  },
  {
    id: "3",
    name: "Premium Cotton T-Shirt",
    price: 24.99,
    originalPrice: 29.99,
    image: "https://images.pexels.com/photos/5698853/pexels-photo-5698853.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    category: "Clothing",
    isNew: false,
    isFeatured: false,
    isOnSale: true,
    slug: "premium-cotton-t-shirt",
  },
  {
    id: "4",
    name: "Stainless Steel Water Bottle",
    price: 19.99,
    originalPrice: null,
    image: "https://images.pexels.com/photos/4640057/pexels-photo-4640057.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    category: "Home & Kitchen",
    isNew: true,
    isFeatured: false,
    isOnSale: false,
    slug: "stainless-steel-water-bottle",
  }
];

// Demo categories
const categories = [
  {
    id: "1",
    name: "Electronics",
    image: "https://images.pexels.com/photos/356056/pexels-photo-356056.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    productCount: 124,
    slug: "electronics"
  },
  {
    id: "2",
    name: "Clothing",
    image: "https://images.pexels.com/photos/934063/pexels-photo-934063.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    productCount: 86,
    slug: "clothing"
  },
  {
    id: "3",
    name: "Home & Kitchen",
    image: "https://images.pexels.com/photos/1358900/pexels-photo-1358900.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    productCount: 65,
    slug: "home-kitchen"
  },
  {
    id: "4",
    name: "Accessories",
    image: "https://images.pexels.com/photos/1152077/pexels-photo-1152077.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    productCount: 42,
    slug: "accessories"
  }
];

// Static homepage that doesn't use client components directly
export default function HomePage() {
  return (
    <div className="container max-w-7xl mx-auto px-4">
      <h1 className="text-4xl font-bold mt-10 mb-6">Welcome to our Store</h1>
      
      {/* Test direct styling */}
      <div style={{ padding: "20px", border: "2px dashed red", marginBottom: "20px" }}>
        <h2 style={{ color: "purple" }}>Testing Inline Styles</h2>
        <p>This section uses inline styles to check if styling works</p>
      </div>
      
      {/* Test CSS class */}
      <div className="test-style">
        This uses the test-style class from globals.css
      </div>
      
      {/* Test Tailwind */}
      <div className="bg-green-500 text-white p-6 m-4 rounded-xl shadow-lg">
        This should have Tailwind classes applied (green background, white text)
      </div>
      
      <div className="mt-8">
        <Link href="/test" className="text-blue-600 hover:underline">
          Go to Test Page
        </Link>
      </div>
      
      <div id="home-content">
        <div className="animate-pulse space-y-6">
          <div className="h-64 bg-muted rounded-lg w-full"></div>
          <div className="h-24 bg-muted rounded-lg w-full"></div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="h-40 bg-muted rounded-lg"></div>
            <div className="h-40 bg-muted rounded-lg"></div>
            <div className="h-40 bg-muted rounded-lg"></div>
          </div>
        </div>
        <div className="hidden" id="home-hydration-container" data-hydration-component="HomeClient" />
      </div>
    </div>
  );
}
