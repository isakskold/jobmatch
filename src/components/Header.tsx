import Link from "next/link";
import { redirect } from "next/navigation";

// Server action for sign out
async function signOutAction() {
  redirect("/");
}

interface HeaderProps {
  title: string;
  showBackButton?: boolean;
  signOut?: () => void;
}

export default function Header({
  title,
  showBackButton = true,
  signOut,
}: HeaderProps) {
  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
          <div className="flex items-center gap-4">
            {signOut && (
              <form
                action={async () => {
                  await signOut();
                  await signOutAction();
                }}
              >
                <button
                  type="submit"
                  className="text-blue-600 hover:text-blue-800 transition-colors cursor-pointer"
                >
                  Sign out
                </button>
              </form>
            )}
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
      </div>
    </header>
  );
}
