// Add Edge runtime to avoid client-side hooks issues
export const runtime = 'edge';

import { Metadata } from "next";
import Link from "next/link";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

// Define the page as dynamic to ensure fresh data on each request
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Products | Ecommerce Platform",
  description: "Browse our collection of high-quality products across various categories",
};

// Demo products for the page
const products = [
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
  },
  {
    id: "5",
    name: "Leather Laptop Sleeve",
    price: 34.99,
    originalPrice: 44.99,
    image: "https://images.pexels.com/photos/1152077/pexels-photo-1152077.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    category: "Accessories",
    isNew: false,
    isFeatured: true,
    isOnSale: true,
    slug: "leather-laptop-sleeve",
  },
  {
    id: "6",
    name: "Bluetooth Speaker",
    price: 49.99,
    originalPrice: 69.99,
    image: "https://images.pexels.com/photos/1279107/pexels-photo-1279107.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    category: "Electronics",
    isNew: true,
    isFeatured: false,
    isOnSale: true,
    slug: "bluetooth-speaker",
  }
];

// Categories for filtering
const categories = [
  { id: "all", name: "All Categories" },
  { id: "electronics", name: "Electronics" },
  { id: "clothing", name: "Clothing" },
  { id: "home-kitchen", name: "Home & Kitchen" },
  { id: "accessories", name: "Accessories" }
];

export default function ProductsPage({
  searchParams
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  // Get category and search params
  const category = typeof searchParams.category === 'string' ? searchParams.category : undefined;
  const search = typeof searchParams.search === 'string' ? searchParams.search : undefined;
  
  // Filter products based on search params
  let filteredProducts = [...products];
  
  if (category && category !== 'all') {
    filteredProducts = filteredProducts.filter(p => 
      p.category.toLowerCase() === category.toLowerCase()
    );
  }
  
  if (search) {
    const searchLower = search.toLowerCase();
    filteredProducts = filteredProducts.filter(p => 
      p.name.toLowerCase().includes(searchLower) || 
      p.category.toLowerCase().includes(searchLower)
    );
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar Filter */}
        <aside className="w-full md:w-64 shrink-0">
          <div className="sticky top-32 space-y-6">
            <div>
              <h3 className="text-lg font-medium mb-3">Categories</h3>
              <ul className="space-y-2">
                {categories.map(cat => (
                  <li key={cat.id}>
                    <Link 
                      href={`/products${cat.id === 'all' ? '' : `?category=${cat.id}`}`}
                      className={`block p-2 rounded-md hover:bg-secondary ${
                        (!category && cat.id === 'all') || category === cat.id
                          ? 'bg-secondary font-medium'
                          : ''
                      }`}
                    >
                      {cat.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-medium mb-3">Price Range</h3>
              <div className="p-2">
                <div className="flex items-center justify-between gap-4 mb-2">
                  <Input 
                    type="number" 
                    placeholder="Min" 
                    className="w-full"
                  />
                  <span>-</span>
                  <Input 
                    type="number" 
                    placeholder="Max" 
                    className="w-full"
                  />
                </div>
                <Button className="w-full mt-2" size="sm">Apply</Button>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-medium mb-3">Filter By</h3>
              <div className="space-y-2">
                <label className="flex items-center gap-2">
                  <input type="checkbox" className="rounded text-primary" />
                  <span>On Sale</span>
                </label>
                <label className="flex items-center gap-2">
                  <input type="checkbox" className="rounded text-primary" />
                  <span>New Arrivals</span>
                </label>
                <label className="flex items-center gap-2">
                  <input type="checkbox" className="rounded text-primary" />
                  <span>Featured</span>
                </label>
              </div>
            </div>
            
            <Button variant="outline" className="w-full">
              Reset Filters
            </Button>
          </div>
        </aside>
        
        {/* Main Content */}
        <div className="flex-1">
          <div className="mb-8">
            <h1 className="text-3xl font-medium tracking-tight mb-3">
              {category ? `${category.charAt(0).toUpperCase() + category.slice(1)} Products` : 'All Products'}
              {search ? ` matching "${search}"` : ''}
            </h1>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
              <p className="text-muted-foreground">
                {filteredProducts.length} product{filteredProducts.length !== 1 ? 's' : ''} found
              </p>
              
              <form action="/products" className="relative w-full sm:w-auto">
                <Input
                  type="search"
                  name="search"
                  placeholder="Search products..."
                  className="pr-10 w-full sm:w-64"
                  defaultValue={search}
                />
                <Button 
                  type="submit" 
                  variant="ghost" 
                  size="icon" 
                  className="absolute right-0 top-0 h-full"
                >
                  <Search className="h-4 w-4" />
                </Button>
              </form>
            </div>
          </div>
          
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {filteredProducts.map((product) => (
                <Link href={`/products/${product.slug}`} key={product.id} className="group">
                  <div className="bg-background border rounded-lg overflow-hidden shadow-sm transition-shadow hover:shadow-md">
                    <div className="aspect-square relative overflow-hidden">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={product.image}
                        alt={product.name}
                        className="object-cover w-full h-full transition-transform group-hover:scale-105"
                      />
                      {product.isNew && (
                        <span className="absolute top-2 left-2 bg-primary text-primary-foreground px-2 py-1 text-xs font-medium rounded">
                          New
                        </span>
                      )}
                      {product.isOnSale && (
                        <span className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 text-xs font-medium rounded">
                          Sale
                        </span>
                      )}
                    </div>
                    <div className="p-4">
                      <h3 className="font-medium transition-colors group-hover:text-primary truncate">
                        {product.name}
                      </h3>
                      <p className="text-sm text-muted-foreground mb-2">{product.category}</p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="font-semibold">${product.price.toFixed(2)}</span>
                          {product.originalPrice && (
                            <span className="text-sm text-muted-foreground line-through">
                              ${product.originalPrice.toFixed(2)}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-muted/40 rounded-lg">
              <p className="text-lg text-muted-foreground mb-4">No products found.</p>
              <Button 
                variant="outline" 
                asChild
              >
                <Link href="/products">Clear filters</Link>
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 