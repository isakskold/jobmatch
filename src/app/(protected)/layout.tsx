"use client";

import { Authenticator } from "@aws-amplify/ui-react";
import { Amplify } from "aws-amplify";
import "@aws-amplify/ui-react/styles.css";
import Header from "@/components/Header";
import PageLayout from "@/components/PageLayout";

// Configure Amplify only in development
if (process.env.NODE_ENV === "development") {
  // Use dynamic import to avoid production build issues
  import("../../../amplify_outputs.json").then((outputs) => {
    Amplify.configure(outputs.default);
  });
}

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Show header when not authenticated */}

      <Authenticator>
        {({ signOut, user }) => {
          return (
            <div>
              {user && (
                <Header title="Opi" showBackButton={true} signOut={signOut} />
              )}
              <PageLayout>{children}</PageLayout>
            </div>
          );
        }}
      </Authenticator>
    </div>
  );
}
