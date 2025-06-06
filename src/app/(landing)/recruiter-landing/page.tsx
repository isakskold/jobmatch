import Card from "@/components/Card";
import Link from "next/link";

export default function RecruiterLanding() {
  return (
    <div className="space-y-8">
      <div className="text-center max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Find Your Perfect Candidate
        </h1>
        <p className="text-xl text-gray-600">
          Access a pool of qualified professionals and streamline your hiring
          process with our advanced matching technology.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        <Card className="p-6">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            Why Choose Opi?
          </h2>
          <ul className="space-y-3 text-gray-600">
            <li className="flex items-start">
              <span className="text-green-500 mr-2">•</span>
              AI-powered candidate matching
            </li>
            <li className="flex items-start">
              <span className="text-green-500 mr-2">•</span>
              Access to verified professional profiles
            </li>
            <li className="flex items-start">
              <span className="text-green-500 mr-2">•</span>
              Streamlined hiring process
            </li>
            <li className="flex items-start">
              <span className="text-green-500 mr-2">•</span>
              Advanced filtering and search capabilities
            </li>
          </ul>
        </Card>

        <Card className="p-6">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            Get Started
          </h2>
          <p className="text-gray-600 mb-6">
            Create your organization's profile and start connecting with
            qualified candidates who match your requirements.
          </p>
          <Link
            href="/recruiter"
            className="block w-full bg-green-600 text-white py-3 px-6 rounded-lg hover:bg-green-700 transition-colors text-center"
          >
            Create Organization Profile
          </Link>
        </Card>
      </div>
    </div>
  );
}
