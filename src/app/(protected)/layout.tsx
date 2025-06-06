import Header from "@/components/Header";
import PageLayout from "@/components/PageLayout";

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header title="Opi" showBackButton={true} />
      <PageLayout>{children}</PageLayout>
    </div>
  );
}
