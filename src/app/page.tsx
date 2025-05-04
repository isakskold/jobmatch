"use client";

import { useRouter } from "next/navigation";
import Header from "@/components/Header";
import Card from "@/components/Card";
import PageLayout from "@/components/PageLayout";

export default function Home() {
  const router = useRouter();

  return (
    <div className="min-h-screen">
      <Header title="JobMatch" showBackButton={false} />
      <PageLayout>
        <Card className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">
            Welcome to JobMatch
          </h2>
          <p className="text-lg text-gray-600 mb-12 max-w-2xl mx-auto">
            Connect with opportunities that match your skills and aspirations.
            Whether you&apos;re seeking your next career move or looking to
            build your team, we&apos;ve got you covered.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-3xl mx-auto">
            <button
              onClick={() => router.push("/dashboard")}
              className="p-6 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors group"
            >
              <div className="text-blue-600 text-2xl font-semibold mb-2 group-hover:text-blue-700">
                I&apos;m Seeking Jobs
              </div>
              <p className="text-gray-600">
                Find opportunities that match your skills and career goals
              </p>
            </button>

            <button
              onClick={() => router.push("/recruiting")}
              className="p-6 bg-green-50 hover:bg-green-100 rounded-lg transition-colors group"
            >
              <div className="text-green-600 text-2xl font-semibold mb-2 group-hover:text-green-700">
                I&apos;m Recruiting
              </div>
              <p className="text-gray-600">
                Post jobs and find the perfect candidates for your team
              </p>
            </button>
          </div>
        </Card>
      </PageLayout>
    </div>
  );
}
