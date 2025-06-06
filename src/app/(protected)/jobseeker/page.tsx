import Card from "@/components/Card";

export default function JobSeekerPage() {
  return (
    <Card className="text-center">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">
        Job Seeker Portal
      </h2>
      <p className="text-gray-600 mb-6">Welcome to your job seeker dashboard</p>
      {/* Protected content will go here */}
      <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
        <p className="text-gray-500">
          Your protected dashboard content will appear here
        </p>
      </div>
    </Card>
  );
}
