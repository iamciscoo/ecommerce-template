import { redirect } from "next/navigation";

// Add Edge runtime to avoid client-side hooks issues
export const runtime = 'edge';

export default function SignInPage() {
  // Redirect to simple-signin page
  redirect('/auth/simple-signin');
} 