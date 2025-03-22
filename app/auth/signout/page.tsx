import Link from "next/link";

// Add Edge runtime to avoid client-side hooks issues
export const runtime = 'edge';

export default function StaticSignOutPage() {
  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <div className="w-full max-w-md rounded-lg border border-gray-200 bg-white p-6 shadow-md">
        <h2 className="mb-4 text-center text-2xl font-bold">Sign Out</h2>
        <p className="mb-6 text-center text-gray-600">
          Are you sure you want to sign out?
        </p>
        <div className="flex gap-4">
          <Link 
            href="/" 
            className="inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50"
          >
            Cancel
          </Link>
          <Link 
            href="/api/auth/signout?callbackUrl=/" 
            className="inline-flex w-full justify-center rounded-md border border-transparent bg-red-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-red-700"
          >
            Sign Out
          </Link>
        </div>
      </div>
    </div>
  );
} 