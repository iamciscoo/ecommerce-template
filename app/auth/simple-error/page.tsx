import Link from "next/link";

// Add Edge runtime to avoid client-side hooks issues
export const runtime = 'edge';

export default function SimpleErrorPage({ 
  searchParams 
}: { 
  searchParams: { error?: string } 
}) {
  const error = searchParams?.error || null;
  
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
      <div className="w-full max-w-md rounded-lg border border-gray-200 bg-white p-8 shadow-md">
        <div className="space-y-2 mb-6">
          <div className="flex items-center space-x-2">
            <div className="text-red-500">⚠️</div>
            <h1 className="text-2xl font-bold">{errorTitle}</h1>
          </div>
          <p className="text-gray-600">
            {errorMessage}
          </p>
        </div>
        
        <div className="pt-2 mb-6">
          <p className="text-sm text-gray-500">
            If you continue to experience issues, please contact support.
          </p>
        </div>
        
        <div className="flex justify-between space-x-4">
          <Link 
            href="/"
            className="inline-flex justify-center w-full px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none"
          >
            Return to home
          </Link>
          <Link
            href="/auth/simple-signin" 
            className="inline-flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md shadow-sm hover:bg-blue-700 focus:outline-none"
          >
            Try again
          </Link>
        </div>
      </div>
    </div>
  );
} 