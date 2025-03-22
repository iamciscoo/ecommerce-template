"use client";

import { useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ThumbsUp } from "lucide-react";
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

export function HomeClient() {
  // For newsletter form
  const handleNewsletterSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const email = (form.elements.namedItem('email') as HTMLInputElement).value;
    
    // In a real app, this would submit to an API
    console.log('Newsletter subscription for:', email);
    alert(`Thanks for subscribing with ${email}!`);
    form.reset();
  };

  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-muted/50 to-muted/30">
        <div className="container px-4 py-16 sm:py-24 lg:py-32 flex flex-col lg:flex-row gap-8 lg:gap-16 items-center">
          <div className="flex-1 space-y-6">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
              Quality Products for <br className="hidden sm:inline" />
              <span className="text-primary">Every Lifestyle</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-[600px]">
              Discover our curated collection of premium products designed to enhance your everyday experiences.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button size="lg" asChild>
                <Link href="/products">Shop Now</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/products?category=new-arrivals">New Arrivals</Link>
              </Button>
            </div>
          </div>
          <div className="flex-1 relative aspect-[4/3] w-full max-w-[600px]">
            <Image
              src="https://images.pexels.com/photos/5632402/pexels-photo-5632402.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              alt="Hero image of people shopping"
              fill
              className="object-cover rounded-lg"
              priority
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
            />
          </div>
        </div>
      </section>

      {/* Features Overview */}
      <section className="py-12 bg-background">
        <div className="container px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="bg-muted/50 border-none">
              <CardContent className="flex flex-col items-center text-center p-6">
                <div className="bg-primary/10 p-3 rounded-full mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-primary h-6 w-6"
                  >
                    <path d="M20.42 4.58a5.4 5.4 0 0 0-7.65 0l-.77.78-.77-.78a5.4 5.4 0 0 0-7.65 0C1.46 6.7 1.33 10.28 4 13l8 8 8-8c2.67-2.72 2.54-6.3.42-8.42z"></path>
                  </svg>
                </div>
                <h3 className="text-lg font-medium">Free Shipping</h3>
                <p className="text-muted-foreground text-sm mt-2">
                  On all orders over $50
                </p>
              </CardContent>
            </Card>
            <Card className="bg-muted/50 border-none">
              <CardContent className="flex flex-col items-center text-center p-6">
                <div className="bg-primary/10 p-3 rounded-full mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-primary h-6 w-6"
                  >
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"></path>
                  </svg>
                </div>
                <h3 className="text-lg font-medium">Secure Payments</h3>
                <p className="text-muted-foreground text-sm mt-2">
                  Protected by industry standards
                </p>
              </CardContent>
            </Card>
            <Card className="bg-muted/50 border-none">
              <CardContent className="flex flex-col items-center text-center p-6">
                <div className="bg-primary/10 p-3 rounded-full mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-primary h-6 w-6"
                  >
                    <path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242"></path>
                    <path d="M12 12v9"></path>
                    <path d="m8 17 4 4 4-4"></path>
                  </svg>
                </div>
                <h3 className="text-lg font-medium">Easy Returns</h3>
                <p className="text-muted-foreground text-sm mt-2">
                  30-day money back guarantee
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-muted/30">
        <div className="container px-4">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
            <div>
              <h2 className="text-3xl font-bold">Featured Products</h2>
              <p className="text-muted-foreground mt-2">
                Discover our handpicked selection of standout items
              </p>
            </div>
            <Button variant="link" size="sm" className="mt-2 md:mt-0" asChild>
              <Link href="/products" className="flex items-center">
                View all products <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <div key={product.id} className="group relative overflow-hidden rounded-lg border bg-background">
                <Link href={`/products/${product.slug}`} className="relative block overflow-hidden pt-[100%]">
                  <Image
                    src={product.image}
                    alt={product.name}
                    className="object-cover transition-transform group-hover:scale-105"
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                  />
                  {product.isOnSale && (
                    <span className="absolute top-2 left-2 bg-red-500 text-white text-xs font-medium px-2 py-1 rounded">
                      Sale
                    </span>
                  )}
                  {product.isNew && (
                    <span className="absolute top-2 right-2 bg-blue-500 text-white text-xs font-medium px-2 py-1 rounded">
                      New
                    </span>
                  )}
                </Link>
                <div className="p-4">
                  <Link href={`/products/${product.slug}`} className="block">
                    <h3 className="font-medium mb-1 text-base">{product.name}</h3>
                  </Link>
                  <div className="flex items-center gap-2">
                    <span className="font-medium">${product.price.toFixed(2)}</span>
                    {product.originalPrice && (
                      <span className="text-muted-foreground line-through text-sm">
                        ${product.originalPrice.toFixed(2)}
                      </span>
                    )}
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">{product.category}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Subscription */}
      <section className="py-16 bg-background">
        <div className="container px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">Join Our Newsletter</h2>
            <p className="text-muted-foreground mb-6">
              Subscribe to our newsletter to receive updates on new products, special offers, and more.
            </p>
            <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-2 max-w-lg mx-auto">
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                required
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              />
              <Button type="submit">Subscribe</Button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}

// Client-side initialization
export function initializeHome() {
  if (typeof window !== 'undefined') {
    const container = document.getElementById('home-hydration-container');
    if (container) {
      try {
        const app = document.getElementById('home-content');
        if (app) {
          const root = document.createElement('div');
          app.innerHTML = '';
          app.appendChild(root);
          
          // This would typically use React.createElement or ReactDOM.render - simplified here
          console.log('HomeClient initialized');
        }
      } catch (error) {
        console.error('Error initializing Home:', error);
      }
    }
  }
}

// Auto-initialize on page load
if (typeof window !== 'undefined') {
  if (document.readyState === 'complete') {
    initializeHome();
  } else {
    window.addEventListener('load', initializeHome);
  }
} 