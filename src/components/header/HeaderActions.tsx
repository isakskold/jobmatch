"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

interface HeaderActionsProps {
  showBackButton?: boolean;
  signOut?: () => void;
  signIn?: boolean;
}

export function HeaderActions({
  showBackButton = true,
  signOut,
  signIn,
}: HeaderActionsProps) {
  const pathname = usePathname();
  const router = useRouter();

  const handleSignIn = () => {
    if (signIn) {
      // If we're on recruiter landing, go to recruiter auth
      // If we're on seeker landing, go to seeker auth
      const isRecruiterLanding = pathname.includes("recruiter-landing");
      const isSeekerLanding = pathname.includes("jobseeker-landing");

      if (isRecruiterLanding) {
        router.push("/recruiter");
      } else if (isSeekerLanding) {
        router.push("/jobseeker");
      }
    }
  };

  return (
    <div className="flex items-center gap-4">
      {signOut && (
        <button
          onClick={signOut}
          className="text-blue-600 hover:text-blue-800 transition-colors cursor-pointer"
        >
          Sign out
        </button>
      )}
      {signIn && (
        <button
          onClick={handleSignIn}
          className="text-blue-600 hover:text-blue-800 transition-colors cursor-pointer"
        >
          Sign in
        </button>
      )}
      {showBackButton && (
        <Link
          href="/"
          className="text-blue-600 hover:text-blue-800 transition-colors cursor-pointer"
        >
          Back to Home
        </Link>
      )}
    </div>
  );
}
