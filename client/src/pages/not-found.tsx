import { Card, CardContent } from "@/components/ui/card";
import { AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

export default function NotFound() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-neutral-50">
      <Card className="w-full max-w-md mx-4 shadow-lg">
        <CardContent className="pt-6">
          <div className="flex mb-4 gap-3 items-center">
            <AlertCircle className="h-10 w-10 text-red-500" />
            <h1 className="text-3xl font-bold text-gray-900 font-heading">404 Page Not Found</h1>
          </div>

          <p className="mt-4 text-neutral-600 mb-6">
            Sorry, we couldn't find the page you're looking for. The page might have been moved, deleted, or is temporarily unavailable.
          </p>
          
          <Link href="/">
            <Button className="w-full">
              Return to Home Page
            </Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}
