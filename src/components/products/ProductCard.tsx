"use client";

import Link from "next/link";
import Image from "next/image";
import { Heart, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

export interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  category?: string;
  isNew?: boolean;
  isFeatured?: boolean;
  isOnSale?: boolean;
  slug: string;
}

export function ProductCard({
  id,
  name,
  price,
  originalPrice,
  image,
  category,
  isNew = false,
  isFeatured = false,
  isOnSale = false,
  slug,
}: ProductCardProps) {
  const discount = originalPrice ? Math.round(((originalPrice - price) / originalPrice) * 100) : 0;
  
  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    // In a real app, this would dispatch an action to add the item to the cart
    toast.success(`${name} added to cart`);
  };
  
  const handleAddToWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    // In a real app, this would dispatch an action to add the item to the wishlist
    toast.success(`${name} added to wishlist`);
  };

  return (
    <Card className="h-full overflow-hidden transition-all duration-200 hover:shadow-md">
      <Link href={`/products/${slug}`} className="block h-full">
        <div className="relative overflow-hidden aspect-square">
          {/* Product image */}
          <Image
            src={image}
            alt={name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-transform duration-300 hover:scale-105"
            priority
          />
          
          {/* Status badges */}
          <div className="absolute top-2 left-2 flex flex-col gap-1">
            {isNew && (
              <Badge className="bg-blue-500 hover:bg-blue-600">New</Badge>
            )}
            {isOnSale && discount > 0 && (
              <Badge className="bg-red-500 hover:bg-red-600">-{discount}%</Badge>
            )}
            {isFeatured && (
              <Badge className="bg-purple-500 hover:bg-purple-600">Featured</Badge>
            )}
          </div>
          
          {/* Quick action buttons */}
          <div className="absolute top-2 right-2">
            <Button
              size="icon"
              variant="secondary"
              className="rounded-full bg-background/80 backdrop-blur-sm"
              onClick={handleAddToWishlist}
            >
              <Heart className="h-4 w-4" />
              <span className="sr-only">Add to wishlist</span>
            </Button>
          </div>
        </div>
        
        <CardContent className="p-4">
          {category && (
            <p className="text-xs text-muted-foreground mb-1">{category}</p>
          )}
          <h3 className="font-medium line-clamp-2 min-h-[2.5rem]">{name}</h3>
          <div className="mt-2 flex items-center gap-2">
            <span className="font-bold">${price.toFixed(2)}</span>
            {originalPrice && originalPrice > price && (
              <span className="text-sm text-muted-foreground line-through">
                ${originalPrice.toFixed(2)}
              </span>
            )}
          </div>
        </CardContent>
        
        <CardFooter className="p-4 pt-0">
          <Button
            className="w-full"
            size="sm"
            onClick={handleAddToCart}
          >
            <ShoppingCart className="mr-2 h-4 w-4" />
            Add to Cart
          </Button>
        </CardFooter>
      </Link>
    </Card>
  );
} 