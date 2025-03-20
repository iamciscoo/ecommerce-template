"use client";

import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertTriangle } from "lucide-react";
import Link from "next/link";

export default function AuthErrorContent() {
  const searchParams = useSearchParams();
  const error = searchParams ? searchParams.get("error") : null;
  
  let errorTitle = "Authentication Error";
  let errorMessage = "An unexpected error occurred during authentication.";
  
  // Handle specific error types
  switch (error) {
    case "CredentialsSignin":
      errorTitle = "Invalid Credentials";
      errorMessage = "The email or password you entered is incorrect.";
      break;
      
    case "AccessDenied":
      errorTitle = "Access Denied";
      errorMessage = "You do not have permission to access this resource.";
      break;
      
    case "Verification":
      errorTitle = "Verification Error";
      errorMessage = "The verification link has expired or is invalid.";
      break;
      
    case "OAuthAccountNotLinked":
      errorTitle = "Account Not Linked";
      errorMessage = "To confirm your identity, sign in with the same account you used originally.";
      break;
      
    case "SessionRequired":
      errorTitle = "Session Required";
      errorMessage = "You must be signed in to access this page.";
      break;
  }

  return (
    <div className="flex min-h-screen items-center justify-center px-4 py-12">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <div className="flex items-center space-x-2">
            <AlertTriangle className="h-6 w-6 text-destructive" />
            <CardTitle className="text-2xl font-bold">{errorTitle}</CardTitle>
          </div>
          <CardDescription>
            {errorMessage}
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-2">
          <p className="text-sm text-muted-foreground">
            If you continue to experience issues, please contact support.
          </p>
        </CardContent>
        <CardFooter className="flex justify-between space-x-4">
          <Button
            variant="outline"
            className="w-full"
            asChild
          >
            <Link href="/">
              Return to home
            </Link>
          </Button>
          <Button
            className="w-full"
            asChild
          >
            <Link href="/auth/signin">
              Try again
            </Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
} 