"use client";

import { useEffect, useState, useCallback } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { cn } from "@/lib/utils";

import { 
  ChevronLeft, 
  ChevronRight, 
  SlidersHorizontal,
  X
} from "lucide-react";

// Product type definition
interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice: number | null;
  image: string;
  category: string;
  isNew: boolean;
  isFeatured: boolean;
  isOnSale: boolean;
  slug: string;
}

interface ProductCatalogProps {
  products: Product[];
  totalProducts: number;
  productsPerPage: number;
}

// Categories for filtering
const categories = [
  { id: "all", name: "All Categories" },
  { id: "electronics", name: "Electronics" },
  { id: "clothing", name: "Clothing" },
  { id: "home-kitchen", name: "Home & Kitchen" },
  { id: "accessories", name: "Accessories" },
];

// Client-side component for ProductCatalog
export function ProductCatalogClient({ products, totalProducts, productsPerPage }: ProductCatalogProps) {
  const searchParams = useSearchParams();
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState(searchParams?.get("category") || "all");
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 150]);
  const [availability, setAvailability] = useState({
    inStock: true,
    newArrivals: false,
    onSale: false,
  });
  const [sortOption, setSortOption] = useState("featured");

  // Set up hydration
  useEffect(() => {
    // Get products from hydration data if available
    const container = document.getElementById("products-hydration-container");
    if (container) {
      try {
        const hydratedProducts = JSON.parse(container.getAttribute("data-products") || "[]");
        const hydratedTotalProducts = parseInt(container.getAttribute("data-total-products") || "0", 10);
        const hydratedProductsPerPage = parseInt(container.getAttribute("data-products-per-page") || "12", 10);
        
        // If we have URL params, update the filters accordingly
        if (searchParams) {
          const categoryParam = searchParams.get("category");
          if (categoryParam) {
            setSelectedCategory(categoryParam);
          }

          const sortParam = searchParams.get("sort");
          if (sortParam) {
            setSortOption(sortParam);
          }

          const newParam = searchParams.get("new");
          if (newParam === "true") {
            setAvailability(prev => ({ ...prev, newArrivals: true }));
          }

          const saleParam = searchParams.get("sale");
          if (saleParam === "true") {
            setAvailability(prev => ({ ...prev, onSale: true }));
          }

          const minPrice = searchParams.get("minPrice");
          const maxPrice = searchParams.get("maxPrice");
          if (minPrice && maxPrice) {
            setPriceRange([parseInt(minPrice, 10), parseInt(maxPrice, 10)]);
          }

          const pageParam = searchParams.get("page");
          if (pageParam) {
            setCurrentPage(parseInt(pageParam, 10));
          }
        }
      } catch (error) {
        console.error("Error parsing hydration data:", error);
      }
    }
  }, [searchParams]);

  // Filter products based on selected filters
  const filteredProducts = products.filter((product) => {
    // Category filter
    if (selectedCategory !== "all" && product.category.toLowerCase().replace(/\s+/g, "-") !== selectedCategory) {
      return false;
    }

    // Price range filter
    if (product.price < priceRange[0] || product.price > priceRange[1]) {
      return false;
    }

    // New arrivals filter
    if (availability.newArrivals && !product.isNew) {
      return false;
    }

    // Sale filter
    if (availability.onSale && !product.isOnSale) {
      return false;
    }

    return true;
  });

  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortOption) {
      case "price-low-high":
        return a.price - b.price;
      case "price-high-low":
        return b.price - a.price;
      case "newest":
        return a.isNew ? -1 : b.isNew ? 1 : 0;
      default:
        return a.isFeatured ? -1 : b.isFeatured ? 1 : 0;
    }
  });

  // Pagination
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  const currentProducts = sortedProducts.slice(
    (currentPage - 1) * productsPerPage,
    currentPage * productsPerPage
  );

  // Update URL with filters
  const updateUrl = useCallback(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams();
      
      if (selectedCategory !== "all") {
        params.set("category", selectedCategory);
      }
      
      if (sortOption !== "featured") {
        params.set("sort", sortOption);
      }
      
      if (availability.newArrivals) {
        params.set("new", "true");
      }
      
      if (availability.onSale) {
        params.set("sale", "true");
      }
      
      if (priceRange[0] > 0) {
        params.set("minPrice", priceRange[0].toString());
      }
      
      if (priceRange[1] < 150) {
        params.set("maxPrice", priceRange[1].toString());
      }
      
      if (currentPage > 1) {
        params.set("page", currentPage.toString());
      }
      
      const newUrl = `${window.location.pathname}${params.toString() ? `?${params.toString()}` : ""}`;
      window.history.replaceState({}, "", newUrl);
    }
  }, [selectedCategory, sortOption, availability, priceRange, currentPage]);

  // Call updateUrl whenever filters change
  useEffect(() => {
    updateUrl();
  }, [selectedCategory, sortOption, availability, priceRange, currentPage, updateUrl]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className="container py-8">
      <div className="flex flex-col gap-8">
        {/* Mobile filter button */}
        <div className="flex justify-between items-center">
          <p className="text-muted-foreground">
            Showing <span className="font-medium text-foreground">{filteredProducts.length}</span> products
          </p>
          <div className="flex gap-2 items-center">
            <Select value={sortOption} onValueChange={(value) => setSortOption(value)}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="featured">Featured</SelectItem>
                <SelectItem value="price-low-high">Price: Low to High</SelectItem>
                <SelectItem value="price-high-low">Price: High to Low</SelectItem>
                <SelectItem value="newest">Newest</SelectItem>
              </SelectContent>
            </Select>
            <Button
              variant="outline"
              size="icon"
              className="md:hidden"
              onClick={() => setMobileFiltersOpen(true)}
            >
              <SlidersHorizontal className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Filters */}
          <Card
            className={cn(
              "md:block md:sticky md:top-24 h-fit transition-all",
              mobileFiltersOpen
                ? "fixed inset-0 z-50 block bg-background"
                : "hidden"
            )}
          >
            {mobileFiltersOpen && (
              <div className="flex items-center justify-between p-4 border-b">
                <h2 className="font-semibold">Filters</h2>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setMobileFiltersOpen(false)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            )}
            <CardContent className="p-4 md:p-6 space-y-6">
              <div className="space-y-4">
                <h3 className="font-medium">Categories</h3>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <div key={category.id} className="flex items-center gap-2">
                      <input
                        id={`category-${category.id}`}
                        type="radio"
                        name="category"
                        className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary/80"
                        checked={selectedCategory === category.id}
                        onChange={() => setSelectedCategory(category.id)}
                      />
                      <Label htmlFor={`category-${category.id}`} className="text-sm">
                        {category.name}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="font-medium">Price Range</h3>
                <div className="space-y-2">
                  <Slider
                    defaultValue={[0, 150]}
                    value={priceRange}
                    max={150}
                    step={1}
                    onValueChange={(value) => setPriceRange(value as [number, number])}
                    className="py-4"
                  />
                  <div className="flex items-center justify-between">
                    <span className="text-sm">
                      ${priceRange[0]}
                    </span>
                    <span className="text-sm">
                      ${priceRange[1]}
                    </span>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="font-medium">Availability</h3>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Checkbox
                      id="in-stock"
                      checked={availability.inStock}
                      onCheckedChange={(checked) =>
                        setAvailability({
                          ...availability,
                          inStock: checked as boolean,
                        })
                      }
                    />
                    <Label htmlFor="in-stock" className="text-sm">
                      In Stock
                    </Label>
                  </div>
                  <div className="flex items-center gap-2">
                    <Checkbox
                      id="new-arrivals"
                      checked={availability.newArrivals}
                      onCheckedChange={(checked) =>
                        setAvailability({
                          ...availability,
                          newArrivals: checked as boolean,
                        })
                      }
                    />
                    <Label htmlFor="new-arrivals" className="text-sm">
                      New Arrivals
                    </Label>
                  </div>
                  <div className="flex items-center gap-2">
                    <Checkbox
                      id="on-sale"
                      checked={availability.onSale}
                      onCheckedChange={(checked) =>
                        setAvailability({
                          ...availability,
                          onSale: checked as boolean,
                        })
                      }
                    />
                    <Label htmlFor="on-sale" className="text-sm">
                      On Sale
                    </Label>
                  </div>
                </div>
              </div>

              {mobileFiltersOpen && (
                <div className="pt-4 mt-4 border-t">
                  <Button
                    className="w-full"
                    onClick={() => setMobileFiltersOpen(false)}
                  >
                    Apply Filters
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Products Grid */}
          <div className="md:col-span-3">
            {/* Products grid */}
            {currentProducts.length === 0 ? (
              <div className="text-center py-12">
                <h3 className="text-lg font-medium mb-2">No products found</h3>
                <p className="text-muted-foreground">
                  Try adjusting your filters to find what you&apos;re looking for.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                {currentProducts.map((product) => (
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
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center mt-8">
                <div className="flex items-center gap-1">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                    disabled={currentPage === 1}
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  
                  {Array.from({ length: totalPages }).map((_, i) => {
                    const page = i + 1;
                    const isVisible = 
                      page === 1 || 
                      page === totalPages || 
                      (page >= currentPage - 1 && page <= currentPage + 1);
                    
                    if (!isVisible && (page === 2 || page === totalPages - 1)) {
                      return <span key={`ellipsis-${page}`} className="px-3 py-2">...</span>;
                    }
                    
                    if (isVisible) {
                      return (
                        <Button
                          key={page}
                          variant={page === currentPage ? "default" : "outline"}
                          size="icon"
                          onClick={() => handlePageChange(page)}
                        >
                          {page}
                        </Button>
                      );
                    }
                    
                    return null;
                  })}
                  
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() =>
                      handlePageChange(Math.min(totalPages, currentPage + 1))
                    }
                    disabled={currentPage === totalPages}
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// Client-side initialization
export function initializeProductCatalog() {
  if (typeof window !== 'undefined') {
    const container = document.getElementById('products-hydration-container');
    if (container) {
      try {
        const productsData = JSON.parse(container.getAttribute('data-products') || '[]');
        const totalProducts = parseInt(container.getAttribute('data-total-products') || '0', 10);
        const productsPerPage = parseInt(container.getAttribute('data-products-per-page') || '12', 10);
        
        const app = document.getElementById('products-content');
        if (app) {
          const root = document.createElement('div');
          app.innerHTML = '';
          app.appendChild(root);
          
          // This would typically use React.createElement or ReactDOM.render - simplified here
          console.log('ProductCatalogClient initialized with:', { 
            products: productsData, 
            totalProducts, 
            productsPerPage 
          });
        }
      } catch (error) {
        console.error('Error initializing ProductCatalog:', error);
      }
    }
  }
}

// Auto-initialize on page load
if (typeof window !== 'undefined') {
  if (document.readyState === 'complete') {
    initializeProductCatalog();
  } else {
    window.addEventListener('load', initializeProductCatalog);
  }
} 