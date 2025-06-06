import Card from "@/components/Card";
import Link from "next/link";

export default function JobSeekerLanding() {
  return (
    <div className="space-y-8">
      <div className="text-center max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Find Your Dream Job
        </h1>
        <p className="text-xl text-gray-600">
          Connect with opportunities that match your skills and career
          aspirations. Create your profile and start your journey today.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        <Card className="p-6">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            Why Choose Opi?
          </h2>
          <ul className="space-y-3 text-gray-600">
            <li className="flex items-start">
              <span className="text-blue-500 mr-2">•</span>
              Personalized job recommendations based on your skills
            </li>
            <li className="flex items-start">
              <span className="text-blue-500 mr-2">•</span>
              Direct connection with top employers
            </li>
            <li className="flex items-start">
              <span className="text-blue-500 mr-2">•</span>
              Showcase your portfolio and achievements
            </li>
            <li className="flex items-start">
              <span className="text-blue-500 mr-2">•</span>
              Track your application status in real-time
            </li>
          </ul>
        </Card>

        <Card className="p-6">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            Get Started
          </h2>
          <p className="text-gray-600 mb-6">
            Create your profile in minutes and start exploring opportunities
            that match your career goals.
          </p>
          <Link
            href="/jobseeker"
            className="block w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors text-center"
          >
            Create Your Profile
          </Link>
        </Card>
      </div>
    </div>
  );
}
