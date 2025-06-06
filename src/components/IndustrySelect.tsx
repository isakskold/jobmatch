import { industries } from "@/const/industries";

interface IndustrySelectProps {
  selectedIndustry: string;
  onIndustryChange: (industry: string) => void;
  colorScheme?: "blue" | "green";
}

export default function IndustrySelect({
  selectedIndustry,
  onIndustryChange,
  colorScheme = "blue",
}: IndustrySelectProps) {
  const colorClasses = {
    blue: "text-blue-600 focus:ring-blue-500",
    green: "text-green-600 focus:ring-green-500",
  };

  return (
    <div className="text-left">
      <label className="block text-sm font-medium text-gray-700 mb-3">
        Select your industry
      </label>
      <div className="space-y-2 max-h-60 overflow-y-auto pr-2">
        {industries.map((industry) => (
          <label
            key={industry}
            className="flex items-center space-x-3 p-2 rounded-md hover:bg-gray-50 cursor-pointer"
          >
            <input
              type="radio"
              name="industry"
              value={industry}
              checked={selectedIndustry === industry}
              onChange={(e) => onIndustryChange(e.target.value)}
              className={`h-4 w-4 ${colorClasses[colorScheme]} border-gray-300`}
            />
            <span className="text-gray-700">{industry}</span>
          </label>
        ))}
      </div>
    </div>
  );
}
