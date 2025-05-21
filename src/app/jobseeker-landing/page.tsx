"use client";
import { useState } from "react";
import Header from "@/components/Header";
import Card from "@/components/Card";
import PageLayout from "@/components/PageLayout";
import Button from "@/components/Button";

export default function JobSeekerLandingPage() {
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
        body: JSON.stringify({ email, type: "seeker" }),
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
    } catch (err) {
      setError("Network error. Please try again later.");
    }
  };

  return (
    <div className="min-h-screen">
      <Header title="Job Seeker Early Access" showBackButton={true} />
      <PageLayout>
        <Card className="max-w-lg mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4 text-blue-700">
            Get Matched to Your Dream Job
          </h2>
          <p className="mb-6 text-gray-600">
            Be the first to know when we launch! Enter your email to get
            notified and start your journey to a better career.
          </p>
          {submitted ? (
            <div className="text-blue-600 font-semibold text-lg">
              Thank you! You'll be notified when we go live.
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-gray-900 placeholder-gray-500 bg-white"
                required
              />
              {error && <div className="text-red-500 text-sm">{error}</div>}
              <Button type="submit" fullWidth>
                Notify Me
              </Button>
            </form>
          )}
        </Card>
      </PageLayout>
    </div>
  );
}
