"use client";

import { Button } from "@/src/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/src/components/ui/card";

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8 gap-8">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Ecommerce Template</CardTitle>
          <CardDescription>
            A modern ecommerce platform built with Next.js and Shadcn UI
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="mb-4">
            Welcome to your new ecommerce application. This template includes everything you need to build a modern, feature-rich online store.
          </p>
          <div className="flex space-x-2">
            <Button>Click me</Button>
            <Button variant="outline">Secondary Action</Button>
          </div>
        </CardContent>
        <CardFooter className="text-sm text-muted-foreground">
          Built with Next.js 15 and Shadcn UI
        </CardFooter>
      </Card>

      <p className="text-center text-muted-foreground">
        We&apos;ve set up Pexels API integration for product images, but it will be used in product pages.
      </p>
    </main>
  );
} 