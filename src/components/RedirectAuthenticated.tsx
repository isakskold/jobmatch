"use client";

import { getCurrentUser } from "aws-amplify/auth";
import { Hub } from "aws-amplify/utils";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Amplify } from "aws-amplify";
import outputs from "../../amplify_outputs.json";
import PageLayout from "./PageLayout";

Amplify.configure(outputs);

interface RedirectAuthenticatedProps {
  children: React.ReactNode;
  redirectTo?: string;
}

export default function RedirectAuthenticated({
  children,
  redirectTo = "/auth",
}: RedirectAuthenticatedProps) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const checkAuthState = async () => {
    try {
      await getCurrentUser();
      setIsAuthenticated(true);
    } catch (error) {
      setIsAuthenticated(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Check initial auth state
    checkAuthState();

    // Listen for auth events
    const removeListener = Hub.listen("auth", (data) => {
      const { event } = data.payload;

      if (event === "signedIn") {
        setIsAuthenticated(true);
      } else if (event === "signedOut") {
        setIsAuthenticated(false);
      }
    });

    return () => removeListener();
  }, []);

  useEffect(() => {
    if (!loading && isAuthenticated) {
      router.push(redirectTo);
    }
  }, [isAuthenticated, loading, redirectTo, router]);

  // Show loading while checking auth state
  if (loading) {
    return (
      <PageLayout>
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
          </div>
        </div>
      </PageLayout>
    );
  }

  // User is authenticated, show loading while redirecting
  if (isAuthenticated) {
    return (
      <PageLayout>
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
          </div>
        </div>
      </PageLayout>
    );
  }

  // User is not authenticated, show the landing page content
  return <>{children}</>;
}
