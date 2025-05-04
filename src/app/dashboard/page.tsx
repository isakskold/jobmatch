"use client";

import { useState } from "react";
import Header from "@/components/Header";
import Button from "@/components/Button";
import Card from "@/components/Card";
import { StatCard } from "@/components/Card";
import PageLayout from "@/components/PageLayout";

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="min-h-screen">
      <Header title="Personal Dashboard" />
      <PageLayout>
        {/* Navigation Tabs */}
        <div className="border-b border-gray-200 mb-8">
          <nav className="-mb-px flex space-x-8">
            {["overview", "resume", "skills", "profile"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`
                  whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm
                  ${
                    activeTab === tab
                      ? "border-blue-500 text-blue-600"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  }
                `}
              >
                {tab
                  .split("-")
                  .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                  .join(" ")}
              </button>
            ))}
          </nav>
        </div>

        {/* Dashboard Content */}
        <Card>
          {activeTab === "overview" && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-gray-900">
                Welcome to Your Dashboard
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <StatCard
                  title="Resume Status"
                  value="Not Uploaded"
                  color="blue"
                />
                <StatCard title="Skills Added" value={0} color="green" />
                <StatCard
                  title="Profile Completion"
                  value="0%"
                  color="purple"
                />
              </div>
            </div>
          )}

          {activeTab === "resume" && (
            <div className="text-center py-12">
              <p className="text-gray-500">Upload your resume to get started</p>
              <Button className="mt-4">Upload Resume</Button>
            </div>
          )}

          {activeTab === "skills" && (
            <div className="text-center py-12">
              <p className="text-gray-500">
                Add your skills to showcase your expertise
              </p>
              <Button className="mt-4">Add Skills</Button>
            </div>
          )}

          {activeTab === "profile" && (
            <div className="text-center py-12">
              <p className="text-gray-500">Complete your profile information</p>
              <Button className="mt-4">Edit Profile</Button>
            </div>
          )}
        </Card>
      </PageLayout>
    </div>
  );
}
