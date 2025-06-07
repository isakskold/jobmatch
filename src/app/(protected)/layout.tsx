"use client";

import { Authenticator } from "@aws-amplify/ui-react";
import { Amplify } from "aws-amplify";
import outputs from "../../../amplify_outputs.json";
import "@aws-amplify/ui-react/styles.css";
import Header from "@/components/Header";
import PageLayout from "@/components/PageLayout";

// Configure Amplify with your backend outputs
Amplify.configure(outputs);

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
