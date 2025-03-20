"use client";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Code } from "@/components/ui/code";
import Link from "next/link";
import { ExternalLink, AlertCircle } from "lucide-react";

export function OAuthSetupAlert() {
  return (
    <Alert className="mb-4 bg-muted">
      <AlertCircle className="h-4 w-4" />
      <AlertTitle>Google OAuth Setup Required</AlertTitle>
      <AlertDescription className="mt-2">
        <p className="mb-2">
          To use Google authentication, you need to create OAuth credentials in the Google Cloud Console.
        </p>

        <ol className="list-decimal pl-4 mb-2 space-y-1 text-sm">
          <li>Go to the <Link href="https://console.cloud.google.com/" className="text-primary hover:underline inline-flex items-center" target="_blank" rel="noopener noreferrer">Google Cloud Console <ExternalLink className="ml-1 h-3 w-3" /></Link></li>
          <li>Create a new project or select an existing one</li>
          <li>Navigate to &quot;APIs &amp; Services&quot; &gt; &quot;Credentials&quot;</li>
          <li>Create OAuth 2.0 Client ID (Web application)</li>
          <li>Add authorized redirect URIs:
            <Code className="px-1 py-0.5 ml-1 text-xs bg-muted-foreground/10 rounded">
              {`${typeof window !== 'undefined' ? window.location.origin : 'http://localhost:3000'}/api/auth/callback/google`}
            </Code>
          </li>
          <li>Add the Client ID and Secret to your <Code className="px-1 py-0.5 text-xs bg-muted-foreground/10 rounded">.env</Code> file.</li>
        </ol>

        <div className="mt-3">
          <Button asChild size="sm" variant="outline">
            <Link href="https://console.cloud.google.com/apis/credentials" target="_blank" rel="noopener noreferrer">
              Go to Google Cloud Credentials
              <ExternalLink className="ml-1 h-3 w-3" />
            </Link>
          </Button>
        </div>
      </AlertDescription>
    </Alert>
  );
} 