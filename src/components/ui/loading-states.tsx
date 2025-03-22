"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

interface LoadingStatesProps {
  variant?: 
    | "product-card" 
    | "product-detail" 
    | "cart-item" 
    | "order-summary" 
    | "form-field" 
    | "button"
    | "text"
    | "banner";
  count?: number;
  className?: string;
}

export function LoadingStates({ 
  variant = "text", 
  count = 1, 
  className 
}: LoadingStatesProps) {
  const items = Array.from({ length: count }, (_, i) => i);

  const renderSkeleton = () => {
    switch (variant) {
      case "product-card":
        return (
          <div className={cn("space-y-3", className)}>
            <Skeleton className="h-[200px] w-full rounded-lg" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-2/3" />
            <div className="flex items-center justify-between">
              <Skeleton className="h-5 w-20" />
              <Skeleton className="h-8 w-8 rounded-full" />
            </div>
          </div>
        );

      case "product-detail":
        return (
          <div className={cn("grid grid-cols-1 md:grid-cols-2 gap-8", className)}>
            <div className="space-y-4">
              <Skeleton className="aspect-square w-full rounded-lg" />
              <div className="grid grid-cols-3 gap-2">
                <Skeleton className="aspect-square rounded-md" />
                <Skeleton className="aspect-square rounded-md" />
                <Skeleton className="aspect-square rounded-md" />
              </div>
            </div>
            <div className="space-y-4">
              <Skeleton className="h-8 w-3/4" />
              <Skeleton className="h-4 w-1/3" />
              <Skeleton className="h-6 w-1/4" />
              <Skeleton className="h-24 w-full" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-2/3" />
              </div>
              <div className="flex space-x-2">
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-10 w-10" />
              </div>
            </div>
          </div>
        );

      case "cart-item":
        return (
          <div className={cn("flex items-center space-x-4", className)}>
            <Skeleton className="h-16 w-16 rounded-md" />
            <div className="flex-1 space-y-2">
              <Skeleton className="h-4 w-3/4" />
              <div className="flex justify-between">
                <Skeleton className="h-6 w-20" />
                <Skeleton className="h-6 w-20" />
              </div>
            </div>
          </div>
        );

      case "order-summary":
        return (
          <div className={cn("space-y-4", className)}>
            <Skeleton className="h-6 w-2/3" />
            <div className="space-y-2">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex justify-between">
                  <Skeleton className="h-4 w-1/3" />
                  <Skeleton className="h-4 w-16" />
                </div>
              ))}
            </div>
            <Skeleton className="h-px w-full" />
            <div className="flex justify-between">
              <Skeleton className="h-5 w-20" />
              <Skeleton className="h-5 w-20" />
            </div>
            <Skeleton className="h-10 w-full" />
          </div>
        );

      case "form-field":
        return (
          <div className={cn("space-y-2", className)}>
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-10 w-full" />
          </div>
        );

      case "button":
        return <Skeleton className={cn("h-10 w-24", className)} />;

      case "banner":
        return <Skeleton className={cn("h-40 w-full rounded-lg", className)} />;

      case "text":
      default:
        return <Skeleton className={cn("h-4 w-full", className)} />;
    }
  };

  return (
    <>
      {count === 1 ? (
        renderSkeleton()
      ) : (
        <div className="space-y-4">
          {items.map((item) => (
            <div key={item}>{renderSkeleton()}</div>
          ))}
        </div>
      )}
    </>
  );
} 