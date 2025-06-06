"use client";
import { useState } from "react";
import Header from "@/components/Header";
import Card from "@/components/Card";
import PageLayout from "@/components/PageLayout";
import Button from "@/components/Button";
import IndustrySelect from "@/components/IndustrySelect";

export default function RecruiterLandingPage() {
  const [email, setEmail] = useState("");
  const [selectedIndustry, setSelectedIndustry] = useState<string>("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }
    if (!selectedIndustry) {
      setError("Please select an industry.");
      return;
    }
    setError("");
    setIsLoading(true);
    try {
      const res = await fetch("/api/oppi-emails", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          type: "recruiter",
          industry: selectedIndustry,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        if (res.status === 409) {
          setError("This email is already signed up.");
        } else {
          setError(data.message || "Something went wrong.");
        }
        return;
      }
      setSubmitted(true);
    } catch {
      setError("Network error. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen">
      <Header title="Recruiter Early Access" showBackButton={true} />
      <PageLayout>
        <Card className="max-w-lg mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4 text-green-700">
            Recruit the Best, First
          </h2>
          <p className="mb-6 text-gray-600">
            Be the first to access our platform and connect with top talent.
            Enter your email to get notified when we launch!
          </p>
          {submitted ? (
            <div className="text-green-600 font-semibold text-lg">
              Thank you! You&apos;ll be notified when we go live.
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <IndustrySelect
                selectedIndustry={selectedIndustry}
                onIndustryChange={setSelectedIndustry}
                colorScheme="green"
              />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500 text-gray-900 placeholder-gray-500 bg-white"
                required
              />
              {error && <div className="text-red-500 text-sm">{error}</div>}
              <div className="relative group">
                <Button
                  type="submit"
                  fullWidth
                  variant="secondary"
                  disabled={!selectedIndustry || isLoading}
                  className="disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <div className="flex items-center justify-center">
                      <svg
                        className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Processing...
                    </div>
                  ) : (
                    "Notify Me"
                  )}
                </Button>
                {!selectedIndustry && !isLoading && (
                  <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-1 bg-gray-900 text-white text-sm rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                    Please select an industry before submitting
                  </div>
                )}
              </div>
            </form>
          )}
        </Card>
      </PageLayout>
    </div>
  );
}
