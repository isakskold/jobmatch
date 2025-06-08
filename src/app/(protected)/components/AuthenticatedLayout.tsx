"use client";

import {
  Authenticator,
  translations,
  useAuthenticator,
} from "@aws-amplify/ui-react";
import { Amplify } from "aws-amplify";
import outputs from "../../../../amplify_outputs.json";
import "@aws-amplify/ui-react/styles.css";
import Header from "@/components/Header";
import PageLayout from "@/components/PageLayout";
import { useRouter } from "next/navigation";

// Optional: Customize labels for the Authenticator UI
Object.assign(translations, {
  "Custom label for custom:userType": "I am a",
});

Amplify.configure(outputs);

export function AuthenticatedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gray-50">
      <Authenticator
        components={{
          Header() {
            return (
              <div className="flex items-center justify-between p-4">
                <button
                  onClick={() => router.push("/")}
                  className="text-gray-600 hover:text-gray-800 flex items-center"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mr-1"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Go back
                </button>
              </div>
            );
          },
          SignUp: {
            FormFields() {
              const { validationErrors } = useAuthenticator();
              return (
                <>
                  <Authenticator.SignUp.FormFields />
                  <div className="amplify-field amplify-textfield amplify-selectfield">
                    <label htmlFor="userType" className="amplify-label">
                      {String(
                        translations["Custom label for custom:userType"] ||
                          "I am a"
                      )}
                    </label>
                    <select
                      name="custom:userType"
                      id="userType"
                      required
                      className="amplify-select"
                      defaultValue=""
                    >
                      <option value="" disabled>
                        -- Select your user type --
                      </option>
                      <option value="SEEKER">Seeker</option>
                      <option value="RECRUITER">Recruiter</option>
                    </select>
                    {validationErrors["custom:userType"] && (
                      <div className="amplify-field-error">
                        {validationErrors["custom:userType"]}
                      </div>
                    )}
                  </div>
                </>
              );
            },
          },
        }}
      >
        {({ signOut, user }) => (
          <div>
            {user && (
              <Header title="Opi" showBackButton={true} signOut={signOut} />
            )}
            <PageLayout>{children}</PageLayout>
          </div>
        )}
      </Authenticator>
    </div>
  );
}
