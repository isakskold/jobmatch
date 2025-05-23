"use client";

import { useRouter } from "next/navigation";
import Header from "@/components/Header";
import Card from "@/components/Card";
import PageLayout from "@/components/PageLayout";

export default function Home() {
  const router = useRouter();

  return (
    <div className="min-h-screen">
      <Header title="Opi" showBackButton={false} />
      <PageLayout>
        <Card className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">
            Welcome to Opi
          </h2>
          <p className="text-lg text-gray-600 mb-4 max-w-2xl mx-auto">
            <span className="font-semibold text-blue-700">
              Service in Progress:
            </span>{" "}
            We&apos;re working hard to launch{" "}
            <span className="font-bold">Opi</span> soon! Choose your path below
            to subscribe for early access notifications. You&apos;ll be the
            first to know when we go live.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-3xl mx-auto mt-8">
            <button
              onClick={() => router.push("/jobseeker-landing")}
              className="p-6 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors group cursor-pointer border border-blue-200"
            >
              <div className="text-blue-600 text-2xl font-semibold mb-2 group-hover:text-blue-700">
                I&apos;m Seeking Jobs
              </div>
              <p className="text-gray-600">
                Subscribe to get notified when you can set up your profile and
                get let recruiters know you&apos;re available
              </p>
            </button>

            <button
              onClick={() => router.push("/recruiter-landing")}
              className="p-6 bg-green-50 hover:bg-green-100 rounded-lg transition-colors group cursor-pointer border border-green-200"
            >
              <div className="text-green-600 text-2xl font-semibold mb-2 group-hover:text-green-700">
                I&apos;m Recruiting
              </div>
              <p className="text-gray-600">
                Subscribe to get notified when you can start using this service
                to find the right talent for your business or clients
              </p>
            </button>
          </div>
        </Card>
      </PageLayout>
    </div>
  );
}
