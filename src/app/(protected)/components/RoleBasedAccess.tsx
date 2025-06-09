"use client";

import { useAuthenticator } from "@aws-amplify/ui-react";
import { fetchAuthSession } from "aws-amplify/auth";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Card from "@/components/Card";

interface RoleBasedAccessProps {
  children: React.ReactNode;
  requiredRole: "RECRUITER" | "SEEKER";
  redirectTo?: string;
}

export default function RoleBasedAccess({
  children,
  requiredRole,
  redirectTo = "/auth",
}: RoleBasedAccessProps) {
  const { user } = useAuthenticator();
  const router = useRouter();
  const [hasAccess, setHasAccess] = useState<boolean | null>(null);

  useEffect(() => {
    const checkAccess = async () => {
      if (user) {
        try {
          const session = await fetchAuthSession();
          const groups =
            (session.tokens?.accessToken?.payload?.[
              "cognito:groups"
            ] as string[]) || [];

          if (groups.includes(requiredRole)) {
            setHasAccess(true);
          } else {
            setHasAccess(false);
            // Optionally redirect to appropriate route
            if (redirectTo) {
              setTimeout(() => router.push(redirectTo), 4000);
            }
          }
        } catch (error) {
          console.error("Error checking access:", error);
          setHasAccess(false);
        }
      }
    };

    checkAccess();
  }, [user, requiredRole, redirectTo, router]);

  // Loading state
  if (hasAccess === null) {
    return (
      <div className="flex items-center justify-center min-h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Verifying access...</p>
        </div>
      </div>
    );
  }

  // Access denied
  if (hasAccess === false) {
    return (
      <Card className="text-center">
        <h2 className="text-2xl font-bold text-red-600 mb-4">Access Denied</h2>
        <p className="text-gray-600 mb-4">
          You don't have permission to access this {requiredRole.toLowerCase()}{" "}
          area.
        </p>
        {redirectTo && (
          <p className="text-sm text-gray-500">
            Redirecting you to the appropriate page...
          </p>
        )}
      </Card>
    );
  }

  // Access granted
  return <>{children}</>;
}
