import { z } from "zod";

/**
 * Environment variable schema validation
 * This ensures all required env vars are present and correctly typed
 */
const envSchema = z.object({
  // Database
  DATABASE_URL: z.string().url(),
  
  // Authentication
  NEXTAUTH_URL: z.string().url(),
  NEXTAUTH_SECRET: z.string().min(1),
  
  // Email
  RESEND_API_KEY: z.string().min(1),
  EMAIL_FROM: z.string().email(),
  
  // File Upload
  UPLOADTHING_SECRET: z.string().min(1),
  UPLOADTHING_APP_ID: z.string().min(1),
  
  // Application Settings
  NEXT_PUBLIC_APP_URL: z.string().url(),
  NEXT_PUBLIC_APP_NAME: z.string().min(1),
});

/**
 * Client-side environment variables
 * Only include public vars (NEXT_PUBLIC_*)
 */
export const clientEnv = {
  NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
  NEXT_PUBLIC_APP_NAME: process.env.NEXT_PUBLIC_APP_NAME,
};

/**
 * Server-side environment variables 
 * Use this in server components and API routes
 */
export function getServerEnv() {
  // In production, we validate the environment variables
  if (process.env.NODE_ENV === "production") {
    try {
      return envSchema.parse(process.env);
    } catch (error) {
      console.error(
        "❌ Missing or invalid environment variables:",
        JSON.stringify((error as z.ZodError).format(), null, 2)
      );
      process.exit(1);
    }
  }
  
  // In development, we allow missing env vars with fallbacks
  return {
    // Database
    DATABASE_URL: process.env.DATABASE_URL || "postgresql://username:password@localhost:5432/ecommerce_db",
    
    // Authentication
    NEXTAUTH_URL: process.env.NEXTAUTH_URL || "http://localhost:3000",
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET || "development-secret-key",
    
    // Email
    RESEND_API_KEY: process.env.RESEND_API_KEY || "resend-dev-key",
    EMAIL_FROM: process.env.EMAIL_FROM || "noreply@example.com",
    
    // File Upload
    UPLOADTHING_SECRET: process.env.UPLOADTHING_SECRET || "ut-dev-secret",
    UPLOADTHING_APP_ID: process.env.UPLOADTHING_APP_ID || "ut-dev-app-id",
    
    // Application Settings
    NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
    NEXT_PUBLIC_APP_NAME: process.env.NEXT_PUBLIC_APP_NAME || "Ecommerce Template",
  };
} 