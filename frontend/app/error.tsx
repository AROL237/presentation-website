"use client";
import Link from "next/link";
import { AlertCircle, Home, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="max-w-md w-full space-y-6 text-center">
        {/* Error Icon */}
        <div className="flex justify-center">
          <div className="p-4 rounded-full bg-destructive/10">
            <AlertCircle className="w-12 h-12 text-destructive" />
          </div>
        </div>

        {/* Error Title */}
        <div>
          <h1 className="text-3xl font-bold mb-2">Something went wrong</h1>
          <p className="text-muted-foreground">
            We encountered an unexpected error. Please try again or return to
            home.
          </p>
        </div>

        {/* Error Details */}
        {error.message && (
          <div className="bg-muted p-4 rounded-lg text-left">
            <p className="text-xs text-muted-foreground mb-1 font-semibold">
              Error Details:
            </p>
            <p className="text-sm text-foreground wrap-break-word font-mono">
              {error.message}
            </p>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex gap-3 flex-col sm:flex-row">
          <Button onClick={reset} className="flex-1 gap-2">
            <ArrowLeft className="w-4 h-4" />
            Try Again
          </Button>
          <Link href="/" className="flex-1">
            <Button variant="outline" className="w-full gap-2">
              <Home className="w-4 h-4" />
              Go Home
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
