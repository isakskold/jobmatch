import Link from "next/link";

interface HeaderProps {
  title: string;
  showBackButton?: boolean;
}

export default function Header({ title, showBackButton = true }: HeaderProps) {
  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
          {showBackButton && (
            <Link
              href="/"
              className="text-blue-600 hover:text-blue-800 transition-colors cursor-pointer"
            >
              Back to Home
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
