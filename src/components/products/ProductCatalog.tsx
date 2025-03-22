"use client";

import { useState, useEffect } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { ProductFilter } from "./ProductFilter";
import { ProductSort } from "./ProductSort";
import { ProductGrid } from "./ProductGrid";
import { ProductPagination } from "./ProductPagination";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { SlidersHorizontal, X } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { ProductCardProps } from "./ProductCard";

// Example categories for demo
const demoCategories = [
  { id: "electronics", name: "Electronics", count: 42 },
  { id: "clothing", name: "Clothing", count: 36 },
  { id: "home-kitchen", name: "Home & Kitchen", count: 28 },
  { id: "toys-games", name: "Toys & Games", count: 14 },
  { id: "beauty", name: "Beauty", count: 20 },
  { id: "books", name: "Books", count: 31 },
];

// Example attributes for demo
const demoAttributes = [
  {
    id: "brand",
    name: "Brand",
    values: [
      { id: "apple", name: "Apple", count: 12 },
      { id: "samsung", name: "Samsung", count: 10 },
      { id: "sony", name: "Sony", count: 8 },
      { id: "lg", name: "LG", count: 6 },
    ],
  },
  {
    id: "color",
    name: "Color",
    values: [
      { id: "black", name: "Black", count: 24 },
      { id: "white", name: "White", count: 18 },
      { id: "red", name: "Red", count: 9 },
      { id: "blue", name: "Blue", count: 12 },
    ],
  },
  {
    id: "size",
    name: "Size",
    values: [
      { id: "s", name: "Small", count: 15 },
      { id: "m", name: "Medium", count: 22 },
      { id: "l", name: "Large", count: 17 },
      { id: "xl", name: "X-Large", count: 11 },
    ],
  },
];

interface ProductCatalogProps {
  products?: ProductCardProps[];
  initialPage?: number;
  initialSort?: string;
  isLoading?: boolean;
  onSearch?: (filters: any) => Promise<void>;
  totalProducts?: number;
  productsPerPage?: number;
}

export function ProductCatalog({
  products = [],
  initialPage = 1,
  initialSort = "latest",
  isLoading = false,
  onSearch,
  totalProducts = 0,
  productsPerPage = 12,
}: ProductCatalogProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [sortOption, setSortOption] = useState(initialSort);
  const [appliedFilters, setAppliedFilters] = useState<{
    categories: string[];
    priceRange: [number, number];
    attributes: Record<string, string[]>;
  }>({
    categories: [],
    priceRange: [0, 1000],
    attributes: {},
  });

  // Total pages calculation
  const totalPages = Math.max(1, Math.ceil(totalProducts / productsPerPage));

  // Update URL when filters, sort or page changes
  useEffect(() => {
    if (pathname) {
      const params = new URLSearchParams(searchParams?.toString());
      
      // Update page parameter
      if (currentPage > 1) {
        params.set("page", currentPage.toString());
      } else {
        params.delete("page");
      }
      
      // Update sort parameter
      if (sortOption !== "latest") {
        params.set("sort", sortOption);
      } else {
        params.delete("sort");
      }
      
      // Update category parameters
      params.delete("category");
      appliedFilters.categories.forEach((cat) => {
        params.append("category", cat);
      });
      
      // Update price range
      if (
        appliedFilters.priceRange[0] > 0 ||
        appliedFilters.priceRange[1] < 1000
      ) {
        params.set(
          "price",
          `${appliedFilters.priceRange[0]}-${appliedFilters.priceRange[1]}`
        );
      } else {
        params.delete("price");
      }
      
      // Update attribute filters
      Object.keys(appliedFilters.attributes).forEach((attrKey) => {
        params.delete(attrKey);
        appliedFilters.attributes[attrKey].forEach((value) => {
          params.append(attrKey, value);
        });
      });
      
      // Update the URL
      const newUrl = 
        params.toString() 
          ? `${pathname}?${params.toString()}` 
          : pathname;
      
      router.push(newUrl, { scroll: false });
    }
  }, [pathname, appliedFilters, currentPage, sortOption, router, searchParams]);

  const handleFilterChange = (filters: any) => {
    setAppliedFilters(filters);
    // Reset to page 1 when filters change
    setCurrentPage(1);
    
    if (onSearch) {
      onSearch({
        ...filters,
        page: 1,
        sort: sortOption,
      });
    }
  };

  const handleSortChange = (value: string) => {
    setSortOption(value);
    
    if (onSearch) {
      onSearch({
        ...appliedFilters,
        page: currentPage,
        sort: value,
      });
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    
    if (onSearch) {
      onSearch({
        ...appliedFilters,
        page,
        sort: sortOption,
      });
    }
    
    // Scroll to top on page change
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="container">
      <div className="flex flex-col gap-8 py-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Sheet open={isMobileFilterOpen} onOpenChange={setIsMobileFilterOpen}>
              <SheetTrigger asChild className="md:hidden">
                <Button variant="outline" size="sm">
                  <SlidersHorizontal className="mr-2 h-4 w-4" />
                  Filters
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[300px] sm:w-[400px]">
                <div className="py-6">
                  <ProductFilter
                    categories={demoCategories}
                    attributes={demoAttributes}
                    initialFilters={appliedFilters}
                    minPrice={0}
                    maxPrice={1000}
                    onFilterChange={handleFilterChange}
                  />
                </div>
              </SheetContent>
            </Sheet>
            <div className="text-sm text-muted-foreground">
              {isLoading ? (
                <Skeleton className="h-5 w-20" />
              ) : (
                `${totalProducts} products found`
              )}
            </div>
          </div>
          <ProductSort 
            defaultValue={sortOption} 
            onSortChange={handleSortChange} 
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Desktop Filters (Left Sidebar) */}
          <div className="hidden md:block">
            <ProductFilter
              categories={demoCategories}
              attributes={demoAttributes}
              initialFilters={appliedFilters}
              minPrice={0}
              maxPrice={1000}
              onFilterChange={handleFilterChange}
            />
          </div>

          {/* Products Grid */}
          <div className="md:col-span-3">
            {isLoading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                {Array(6)
                  .fill(0)
                  .map((_, i) => (
                    <div key={i} className="flex flex-col space-y-3">
                      <Skeleton className="h-[200px] w-full rounded-md" />
                      <Skeleton className="h-4 w-full" />
                      <Skeleton className="h-4 w-2/3" />
                    </div>
                  ))}
              </div>
            ) : products.length > 0 ? (
              <ProductGrid products={products} columns={3} />
            ) : (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <h3 className="text-xl font-semibold mb-2">No products found</h3>
                <p className="text-muted-foreground mb-6">
                  Try adjusting your filters or search term.
                </p>
                <Button 
                  variant="outline" 
                  onClick={() => {
                    setAppliedFilters({
                      categories: [],
                      priceRange: [0, 1000],
                      attributes: {},
                    });
                    setCurrentPage(1);
                    setSortOption("latest");
                  }}
                >
                  <X className="mr-2 h-4 w-4" />
                  Clear all filters
                </Button>
              </div>
            )}

            {/* Pagination */}
            {products.length > 0 && (
              <ProductPagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 