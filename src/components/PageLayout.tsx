interface PageLayoutProps {
  children: React.ReactNode;
  className?: string;
}

export default function PageLayout({
  children,
  className = "",
}: PageLayoutProps) {
  return (
    <div className="min-h-screen">
      <main
        className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 ${className}`}
      >
        {children}
      </main>
    </div>
  );
}
