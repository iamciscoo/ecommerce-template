import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { LoadingStates, HoverScale, PressEffect, FadeIn, TrackCursor, Pulse } from "@/components/ui/ux-enhancements";

// Tell Next.js this is a dynamic page
export const dynamic = 'force-dynamic';

export default function ExamplesPage() {
  return (
    <div className="container py-12">
      <div className="flex items-center gap-4 mb-8">
        <Button variant="ghost" size="sm" asChild>
          <Link href="/">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Link>
        </Button>
        <h1 className="text-3xl font-bold">UX Examples</h1>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        <Card>
          <CardHeader>
            <CardTitle>Loading States</CardTitle>
            <CardDescription>
              Various skeleton loaders for different UI components
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-8">
            <div>
              <h3 className="text-lg font-medium mb-4">Product Card</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <LoadingStates variant="product-card" />
                <LoadingStates variant="product-card" />
              </div>
            </div>
            
            <Separator />
            
            <div>
              <h3 className="text-lg font-medium mb-4">Cart Items</h3>
              <div className="space-y-4">
                <LoadingStates variant="cart-item" />
                <LoadingStates variant="cart-item" />
              </div>
            </div>
            
            <Separator />
            
            <div>
              <h3 className="text-lg font-medium mb-4">Form Fields</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <LoadingStates variant="form-field" />
                <LoadingStates variant="form-field" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Micro-Interactions</CardTitle>
            <CardDescription>
              Interactive elements with subtle animations
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-8">
            <div>
              <h3 className="text-lg font-medium mb-4">Hover Effects</h3>
              <div className="grid grid-cols-2 gap-4">
                <HoverScale>
                  <Card className="hover:shadow-lg transition-shadow">
                    <CardContent className="p-4 text-center">
                      Hover Scale
                    </CardContent>
                  </Card>
                </HoverScale>
                
                <PressEffect>
                  <Card className="hover:shadow-lg transition-shadow">
                    <CardContent className="p-4 text-center">
                      Press Effect
                    </CardContent>
                  </Card>
                </PressEffect>
              </div>
            </div>
            
            <Separator />
            
            <div>
              <h3 className="text-lg font-medium mb-4">Fade-In Animation</h3>
              <div className="grid grid-cols-2 gap-4">
                <FadeIn direction="up" delay={0.2}>
                  <Card>
                    <CardContent className="p-4 text-center">
                      Fade In Up
                    </CardContent>
                  </Card>
                </FadeIn>
                
                <FadeIn direction="down" delay={0.4}>
                  <Card>
                    <CardContent className="p-4 text-center">
                      Fade In Down
                    </CardContent>
                  </Card>
                </FadeIn>
              </div>
            </div>
            
            <Separator />
            
            <div>
              <h3 className="text-lg font-medium mb-4">Advanced Interactions</h3>
              <div className="grid grid-cols-2 gap-4">
                <TrackCursor>
                  <Card className="overflow-hidden">
                    <CardContent className="p-4 text-center">
                      Cursor Tracking
                    </CardContent>
                  </Card>
                </TrackCursor>
                
                <Pulse>
                  <Card>
                    <CardContent className="p-4 text-center">
                      Pulse Animation
                    </CardContent>
                  </Card>
                </Pulse>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Card className="mb-12">
        <CardHeader>
          <CardTitle>Product Detail Loading</CardTitle>
          <CardDescription>
            Full product detail page skeleton loader
          </CardDescription>
        </CardHeader>
        <CardContent>
          <LoadingStates variant="product-detail" />
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Order Summary Loading</CardTitle>
          <CardDescription>
            Order summary and checkout skeleton loader
          </CardDescription>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <LoadingStates variant="cart-item" count={3} />
          </div>
          <div>
            <LoadingStates variant="order-summary" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 