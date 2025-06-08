import { HeaderActions } from "./header/HeaderActions";

interface HeaderProps {
  title: string;
  showBackButton?: boolean;
  signOut?: () => void;
  signIn?: boolean;
}

export default function Header({
  title,
  showBackButton = true,
  signOut,
  signIn,
}: HeaderProps) {
  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
          <HeaderActions
            showBackButton={showBackButton}
            signOut={signOut}
            signIn={signIn}
          />
        </div>
      </div>
    </header>
  );
}
