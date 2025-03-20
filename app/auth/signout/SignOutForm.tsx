"use client";

import { useState } from "react";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { LoaderCircle } from "lucide-react";

export default function SignOutForm() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleSignOut = async () => {
    setIsLoading(true);
    await signOut({ redirect: false });
    router.push("/");
  };

  const handleCancel = () => {
    router.push("/");
  };

  return (
    <div className="flex min-h-screen items-center justify-center px-4 py-12">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold">Sign out</CardTitle>
          <CardDescription>
            Are you sure you want to sign out?
          </CardDescription>
        </CardHeader>
        <CardContent className="flex justify-center">
          {isLoading && (
            <LoaderCircle className="h-8 w-8 animate-spin text-primary" />
          )}
        </CardContent>
        <CardFooter className="flex justify-between space-x-4">
          <Button
            variant="outline"
            className="w-full"
            onClick={handleCancel}
            disabled={isLoading}
          >
            Cancel
          </Button>
          <Button
            variant="destructive"
            className="w-full"
            onClick={handleSignOut}
            disabled={isLoading}
          >
            Sign out
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
} 