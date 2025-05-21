"use client";
import { useState } from "react";
import Header from "@/components/Header";
import Card from "@/components/Card";
import PageLayout from "@/components/PageLayout";
import Button from "@/components/Button";

export default function RecruiterLandingPage() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }
    setError("");
    try {
      const res = await fetch("/api/oppi-emails", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, type: "recruiter" }),
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
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500 text-gray-900 placeholder-gray-500 bg-white"
                required
              />
              {error && <div className="text-red-500 text-sm">{error}</div>}
              <Button type="submit" fullWidth variant="secondary">
                Notify Me
              </Button>
            </form>
          )}
        </Card>
      </PageLayout>
    </div>
  );
}
