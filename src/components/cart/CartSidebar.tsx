"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { X, ShoppingBag, Plus, Minus, Trash2 } from "lucide-react";

import { useCartStore } from "@/lib/store/cartStore";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

export function CartSidebar() {
  const { items, totalItems, totalPrice, removeItem, updateQuantity, clearCart } = useCartStore();
  const [isMounted, setIsMounted] = useState(false);

  // Prevent hydration errors with localStorage-based state
  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="relative">
          <ShoppingBag className="h-5 w-5" />
          {isMounted && totalItems > 0 && (
            <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] font-medium text-primary-foreground">
              {totalItems}
            </span>
          )}
          <span className="sr-only">Open cart</span>
        </Button>
      </SheetTrigger>
      <SheetContent className="flex w-full flex-col sm:max-w-lg">
        {!isMounted ? (
          <div className="flex h-full items-center justify-center">
            <div className="animate-pulse h-8 w-32 bg-muted rounded-md"></div>
          </div>
        ) : items.length > 0 ? (
          <>
            <SheetHeader className="px-1">
              <SheetTitle className="flex items-center">
                <ShoppingBag className="mr-2 h-5 w-5" />
                Shopping Cart 
                <span className="ml-2 text-muted-foreground text-sm font-normal">
                  ({totalItems} {totalItems === 1 ? 'item' : 'items'})
                </span>
              </SheetTitle>
            </SheetHeader>
            <ScrollArea className="flex-1 px-1">
              <div className="space-y-4 py-4">
                {items.map((item) => (
                  <div key={item.id} className="flex items-start gap-3">
                    <div className="relative aspect-square h-16 w-16 min-w-16 overflow-hidden rounded-md border">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover"
                        sizes="64px"
                      />
                    </div>
                    <div className="flex flex-1 flex-col gap-1">
                      <div className="flex justify-between">
                        <Link
                          href={`/products/${item.slug}`}
                          className="line-clamp-1 font-medium hover:underline"
                        >
                          {item.name}
                        </Link>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-7 w-7"
                          onClick={() => removeItem(item.id)}
                        >
                          <X className="h-4 w-4" />
                          <span className="sr-only">Remove item</span>
                        </Button>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1">
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-7 w-7"
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          >
                            {item.quantity === 1 ? (
                              <Trash2 className="h-3 w-3" />
                            ) : (
                              <Minus className="h-3 w-3" />
                            )}
                            <span className="sr-only">Decrease quantity</span>
                          </Button>
                          <span className="w-8 text-center text-sm">
                            {item.quantity}
                          </span>
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-7 w-7"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          >
                            <Plus className="h-3 w-3" />
                            <span className="sr-only">Increase quantity</span>
                          </Button>
                        </div>
                        <div className="font-medium">
                          ${(item.price * item.quantity).toFixed(2)}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
            <div className="px-1">
              <Separator className="my-2" />
              <div className="flex justify-between py-2">
                <span className="font-medium">Subtotal</span>
                <span className="font-medium">${totalPrice.toFixed(2)}</span>
              </div>
              <div className="flex justify-between py-2 text-sm text-muted-foreground">
                <span>Shipping and taxes calculated at checkout</span>
              </div>
              <div className="mt-4 flex flex-col gap-2">
                <Button className="w-full" size="lg" asChild>
                  <Link href="/checkout">Checkout</Link>
                </Button>
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => clearCart()}
                >
                  Clear Cart
                </Button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex h-full flex-col items-center justify-center space-y-4">
            <div className="flex h-24 w-24 items-center justify-center rounded-full bg-muted">
              <ShoppingBag className="h-12 w-12 text-muted-foreground" />
            </div>
            <div className="text-center">
              <h3 className="text-lg font-medium">Your cart is empty</h3>
              <p className="text-muted-foreground">
                Looks like you haven&apos;t added anything to your cart yet.
              </p>
            </div>
            <Button asChild>
              <Link href="/products">Browse Products</Link>
            </Button>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
} 