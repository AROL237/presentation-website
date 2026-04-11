import Link from "next/link";
import { Home, Search } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="max-w-md w-full space-y-6 text-center">
        {/* 404 Icon */}
        <div className="flex justify-center">
          <div className="p-4 rounded-full bg-accent/10">
            <Search className="w-12 h-12 text-primary" />
          </div>
        </div>

        {/* Error Title */}
        <div>
          <h1 className="text-5xl font-bold text-primary mb-2">404</h1>
          <h2 className="text-2xl font-bold mb-2">Page Not Found</h2>
          <p className="text-muted-foreground">
            The page you're looking for doesn't exist or has been moved.
          </p>
        </div>

        {/* Suggestions */}
        <div className="bg-muted p-4 rounded-lg text-left">
          <p className="text-sm font-semibold mb-2">What you can do:</p>
          <ul className="text-sm text-muted-foreground space-y-1">
            <li>• Check the URL for typos</li>
            <li>• Visit our homepage to navigate around</li>
            <li>• Browse our collections</li>
          </ul>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 flex-col sm:flex-row">
          <Link href="/" className="flex-1">
            <Button className="w-full gap-2">
              <Home className="w-4 h-4" />
              Go Home
            </Button>
          </Link>
          <Link href="/collections" className="flex-1">
            <Button variant="outline" className="w-full gap-2">
              <Search className="w-4 h-4" />
              Browse Products
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
