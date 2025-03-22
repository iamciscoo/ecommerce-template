import { redirect } from "next/navigation";

// Add Edge runtime to avoid client-side hooks issues
export const runtime = 'edge';

export default function AuthErrorPage({ searchParams }: { searchParams: any }) {
  // Redirect to simple-error page, passing along any search params
  const params = new URLSearchParams(searchParams).toString();
  const redirectUrl = `/auth/simple-error${params ? `?${params}` : ''}`;
  redirect(redirectUrl);
} 