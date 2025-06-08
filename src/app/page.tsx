import Link from "next/link";
import Header from "@/components/Header";
import Card from "@/components/Card";
import PageLayout from "@/components/PageLayout";

export default function Home() {
  return (
    <div className="min-h-screen">
      <Header title="Opi" showBackButton={false} />
      <PageLayout>
        <Card className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">
            Welcome to Opi
          </h2>
          <p className="text-lg text-gray-600 mb-4 max-w-2xl mx-auto">
            Connect with the right opportunities or find the perfect talent for
            your organization. Choose your role below to get started.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-3xl mx-auto mt-8">
            <Link
              href="/jobseeker-landing"
              className="p-6 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors group cursor-pointer border border-blue-200 block"
            >
              <div className="text-blue-600 text-2xl font-semibold mb-2 group-hover:text-blue-700">
                Job Seeker
              </div>
              <p className="text-gray-600">
                Create your profile, showcase your skills, and connect with
                opportunities that match your career goals
              </p>
            </Link>

            <Link
              href="/recruiter-landing"
              className="p-6 bg-green-50 hover:bg-green-100 rounded-lg transition-colors group cursor-pointer border border-green-200 block"
            >
              <div className="text-green-600 text-2xl font-semibold mb-2 group-hover:text-green-700">
                Recruiter
              </div>
              <p className="text-gray-600">
                Access a pool of qualified candidates and find the perfect match
                for your organization&apos;s needs
              </p>
            </Link>
          </div>
        </Card>
      </PageLayout>
    </div>
  );
}
