import { redirect } from "next/navigation";

// Add Edge runtime to avoid client-side hooks issues
export const runtime = 'edge';

export default function SignUpPage() {
  // Redirect to simple-signup page
  redirect('/auth/simple-signup');
} 