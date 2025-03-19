import { Button } from "@/src/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/src/components/ui/card";
import { toast } from "sonner";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
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
            <Button 
              onClick={() => toast("Button clicked!", {
                description: "This is a toast notification from Sonner"
              })}
            >
              Click me
            </Button>
            <Button variant="outline">Secondary Action</Button>
          </div>
        </CardContent>
        <CardFooter className="text-sm text-muted-foreground">
          Built with Next.js 15 and Shadcn UI
        </CardFooter>
      </Card>
    </main>
  );
}
