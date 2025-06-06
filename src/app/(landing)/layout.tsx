import { ReactNode } from "react";
import Header from "@/components/Header";
import PageLayout from "@/components/PageLayout";

interface LandingLayoutProps {
  children: ReactNode;
}

export default function LandingLayout({ children }: LandingLayoutProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header title="Opi" showBackButton={true} />
      <PageLayout>{children}</PageLayout>
    </div>
  );
}
