"use client";

import { useAuthenticator } from "@aws-amplify/ui-react";
import { fetchAuthSession } from "aws-amplify/auth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function AuthPage() {
  const { user } = useAuthenticator();
  const router = useRouter();

  useEffect(() => {
    if (user) {
      const redirectUser = async () => {
        try {
          const session = await fetchAuthSession();
          const groups =
            (session.tokens?.accessToken?.payload?.[
              "cognito:groups"
            ] as string[]) || [];

          if (groups.includes("RECRUITER")) {
            router.push("/recruiter");
          } else if (groups.includes("SEEKER")) {
            router.push("/jobseeker");
          } else {
            // Handle case where user is not in any expected group
            console.warn("User is not assigned to any expected group:", groups);
            // You could redirect to a profile completion page or show an error
          }
        } catch (error) {
          console.error("Error fetching auth session:", error);
        }
      };

      redirectUser();
    }
  }, [user, router]);

  // Show loading state while redirecting
  if (user) {
    return (
      <div className="flex items-center justify-center min-h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Redirecting to your dashboard...</p>
        </div>
      </div>
    );
  }

  // If no user, the Authenticator wrapper will show the auth UI
  return null;
}
