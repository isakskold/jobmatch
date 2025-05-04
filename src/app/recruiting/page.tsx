"use client";

import { useState } from "react";
import Header from "@/components/Header";
import Button from "@/components/Button";
import Card from "@/components/Card";
import PageLayout from "@/components/PageLayout";
import Image from "next/image";

// Mock data for candidates with profile pictures
const mockCandidates = [
  {
    id: 1,
    name: "Sarah Johnson",
    title: "Senior Software Engineer",
    experience: "8 years",
    skills: ["React", "Node.js", "TypeScript", "AWS"],
    match: 92,
    image: "https://randomuser.me/api/portraits/women/1.jpg",
  },
  {
    id: 2,
    name: "Michael Chen",
    title: "Full Stack Developer",
    experience: "5 years",
    skills: ["Python", "Django", "React", "PostgreSQL"],
    match: 88,
    image: "https://randomuser.me/api/portraits/men/2.jpg",
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    title: "Frontend Developer",
    experience: "4 years",
    skills: ["Vue.js", "JavaScript", "CSS", "UI/UX"],
    match: 85,
    image: "https://randomuser.me/api/portraits/women/3.jpg",
  },
];

// Selection options
const jobTitles = [
  "Software Engineer",
  "Frontend Developer",
  "Backend Developer",
  "Full Stack Developer",
  "DevOps Engineer",
  "Data Scientist",
  "Data Engineer",
  "Machine Learning Engineer",
  "Product Manager",
  "Project Manager",
  "UI/UX Designer",
  "QA Engineer",
  "System Administrator",
  "Cloud Architect",
  "Mobile Developer",
];

const industries = [
  "Technology",
  "Finance",
  "Healthcare",
  "Education",
  "Manufacturing",
  "Retail",
  "Media & Entertainment",
  "Real Estate",
  "Transportation",
  "Energy",
];

const personalTraits = [
  "Leadership",
  "Team Player",
  "Problem Solver",
  "Innovative",
  "Detail-Oriented",
  "Adaptable",
  "Self-Motivated",
  "Communication Skills",
  "Time Management",
  "Creative",
];

const qualifications = [
  "Bachelor's Degree",
  "Master's Degree",
  "PhD",
  "Professional Certification",
  "Industry Certification",
  "Bootcamp Graduate",
  "Self-Taught",
  "Trade School",
];

const workArrangements = ["On-site", "Remote", "Hybrid", "Flexible"];

const seniorityLevels = [
  "Entry Level",
  "Mid Level",
  "Senior",
  "Lead",
  "Manager",
  "Director",
  "Executive",
];

const skills = [
  "JavaScript",
  "TypeScript",
  "Python",
  "Java",
  "C#",
  "C++",
  "Ruby",
  "PHP",
  "React",
  "Angular",
  "Vue.js",
  "Node.js",
  "Express.js",
  "Django",
  "Flask",
  "Spring Boot",
  "ASP.NET",
  "AWS",
  "Azure",
  "Google Cloud",
  "Docker",
  "Kubernetes",
  "Terraform",
  "SQL",
  "MongoDB",
  "PostgreSQL",
  "MySQL",
  "Redis",
  "GraphQL",
  "REST API",
  "Git",
  "CI/CD",
  "Agile",
  "Scrum",
  "UI/UX Design",
  "Figma",
  "Adobe XD",
  "HTML",
  "CSS",
  "SASS",
  "Tailwind CSS",
  "Bootstrap",
  "Testing",
  "Jest",
  "Cypress",
  "Selenium",
];

export default function Recruiting() {
  const [showResults, setShowResults] = useState(false);
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [selectedTraits, setSelectedTraits] = useState<string[]>([]);
  const [isSkillsExpanded, setIsSkillsExpanded] = useState(false);
  const [isTraitsExpanded, setIsTraitsExpanded] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setShowResults(true);
  };

  const handleSkillChange = (skill: string) => {
    setSelectedSkills((prev) =>
      prev.includes(skill) ? prev.filter((s) => s !== skill) : [...prev, skill]
    );
  };

  const handleTraitChange = (trait: string) => {
    setSelectedTraits((prev) =>
      prev.includes(trait) ? prev.filter((t) => t !== trait) : [...prev, trait]
    );
  };

  const inputStyles =
    "w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-gray-900 placeholder-gray-500 bg-white";

  return (
    <div className="min-h-screen">
      <Header title="Recruiting" />
      <PageLayout>
        {/* Search Form */}
        <Card className="mb-8">
          <form onSubmit={handleSearch} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div>
                <label
                  htmlFor="jobTitle"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Job Title
                </label>
                <select id="jobTitle" className={inputStyles}>
                  <option value="">Select Job Title</option>
                  {jobTitles.map((title) => (
                    <option key={title} value={title}>
                      {title}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label
                  htmlFor="industry"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Industry
                </label>
                <select id="industry" className={inputStyles}>
                  <option value="">Any Industry</option>
                  {industries.map((industry) => (
                    <option key={industry} value={industry}>
                      {industry}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label
                  htmlFor="seniority"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Seniority Level
                </label>
                <select id="seniority" className={inputStyles}>
                  <option value="">Any Level</option>
                  {seniorityLevels.map((level) => (
                    <option key={level} value={level}>
                      {level}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label
                  htmlFor="experience"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Years of Experience
                </label>
                <select id="experience" className={inputStyles}>
                  <option value="">Any</option>
                  <option value="1-3">1-3 years</option>
                  <option value="4-6">4-6 years</option>
                  <option value="7+">7+ years</option>
                </select>
              </div>
              <div>
                <label
                  htmlFor="workArrangement"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Work Arrangement
                </label>
                <select id="workArrangement" className={inputStyles}>
                  <option value="">Any</option>
                  {workArrangements.map((arrangement) => (
                    <option key={arrangement} value={arrangement}>
                      {arrangement}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label
                  htmlFor="qualification"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Required Qualification
                </label>
                <select id="qualification" className={inputStyles}>
                  <option value="">Any</option>
                  {qualifications.map((qualification) => (
                    <option key={qualification} value={qualification}>
                      {qualification}
                    </option>
                  ))}
                </select>
              </div>

              {/* Skills Section */}
              <div className="md:col-span-2 lg:col-span-3">
                <button
                  type="button"
                  onClick={() => setIsSkillsExpanded(!isSkillsExpanded)}
                  className="w-full flex items-center text-left mb-2 cursor-pointer"
                >
                  <svg
                    className={`h-5 w-5 text-gray-500 transform transition-transform duration-200 mr-2 ${
                      isSkillsExpanded ? "rotate-180" : ""
                    }`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                  <label className="text-sm font-medium text-gray-700">
                    Required Skills{" "}
                    {selectedSkills.length > 0 &&
                      `(${selectedSkills.length} selected)`}
                  </label>
                </button>
                <div
                  className={`bg-gray-50 rounded-lg border border-gray-200 overflow-hidden transition-all duration-200 ease-in-out ${
                    isSkillsExpanded
                      ? "max-h-[500px] opacity-100"
                      : "max-h-0 opacity-0"
                  }`}
                >
                  <div className="p-4 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                    {skills.map((skill) => (
                      <label
                        key={skill}
                        className="flex items-center space-x-2 text-sm text-gray-700 hover:text-gray-900 cursor-pointer"
                      >
                        <input
                          type="checkbox"
                          checked={selectedSkills.includes(skill)}
                          onChange={() => handleSkillChange(skill)}
                          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                        />
                        <span>{skill}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>

              {/* Traits Section */}
              <div className="md:col-span-2 lg:col-span-3">
                <button
                  type="button"
                  onClick={() => setIsTraitsExpanded(!isTraitsExpanded)}
                  className="w-full flex items-center text-left mb-2 cursor-pointer"
                >
                  <svg
                    className={`h-5 w-5 text-gray-500 transform transition-transform duration-200 mr-2 ${
                      isTraitsExpanded ? "rotate-180" : ""
                    }`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                  <label className="text-sm font-medium text-gray-700">
                    Desired Personal Traits{" "}
                    {selectedTraits.length > 0 &&
                      `(${selectedTraits.length} selected)`}
                  </label>
                </button>
                <div
                  className={`bg-gray-50 rounded-lg border border-gray-200 overflow-hidden transition-all duration-200 ease-in-out ${
                    isTraitsExpanded
                      ? "max-h-[500px] opacity-100"
                      : "max-h-0 opacity-0"
                  }`}
                >
                  <div className="p-4 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                    {personalTraits.map((trait) => (
                      <label
                        key={trait}
                        className="flex items-center space-x-2 text-sm text-gray-700 hover:text-gray-900 cursor-pointer"
                      >
                        <input
                          type="checkbox"
                          checked={selectedTraits.includes(trait)}
                          onChange={() => handleTraitChange(trait)}
                          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                        />
                        <span>{trait}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div className="flex justify-end">
              <Button type="submit">Search Candidates</Button>
            </div>
          </form>
        </Card>

        {/* Results */}
        {showResults && (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-gray-900">
              Matching Candidates
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
              {(() => {
                const sorted = [...mockCandidates].sort(
                  (a, b) => b.match - a.match
                );
                let displayOrder = sorted;
                if (sorted.length === 3) {
                  displayOrder = [sorted[1], sorted[0], sorted[2]];
                }
                return displayOrder.map((candidate, index) => (
                  <Card
                    key={candidate.id}
                    className={`hover:shadow-md transition-shadow ${
                      index === 1 ? "md:scale-110 z-10" : "md:scale-95"
                    }`}
                  >
                    <div className="flex flex-col items-center">
                      <div className="w-full flex flex-wrap gap-x-[30%] gap-y-2 justify-between items-center mb-4">
                        <h3 className="text-lg mx-auto font-semibold text-gray-900">
                          {candidate.name}
                        </h3>
                        <div className="bg-green-100 mx-auto text-green-800 px-3 py-1 rounded-full text-sm font-medium whitespace-nowrap">
                          {candidate.match}% Match
                        </div>
                      </div>
                      <div className="relative w-24 h-24 rounded-full overflow-hidden mb-4">
                        <Image
                          src={candidate.image}
                          alt={candidate.name}
                          fill
                          sizes="(max-width: 768px) 96px, 96px"
                          className="object-cover"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
                              candidate.name
                            )}&background=random`;
                          }}
                        />
                      </div>
                      <div className="w-full">
                        <p className="text-gray-600 text-sm mb-2">
                          {candidate.title}
                        </p>
                        <p className="text-sm text-gray-600">
                          <span className="font-medium">Experience:</span>{" "}
                          {candidate.experience}
                        </p>
                      </div>
                    </div>
                    <div className="mt-4">
                      <p className="text-sm font-medium text-gray-700 mb-2">
                        Skills:
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {candidate.skills.map((skill) => (
                          <span
                            key={skill}
                            className="bg-blue-50 text-blue-700 px-2 py-1 rounded text-sm"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="mt-6 flex gap-3">
                      <Button className="flex-1">Contact</Button>
                      <Button variant="outline">View Profile</Button>
                    </div>
                  </Card>
                ));
              })()}
            </div>
          </div>
        )}
      </PageLayout>
    </div>
  );
}
