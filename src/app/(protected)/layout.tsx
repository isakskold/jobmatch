// src/app/(protected)/layout.tsx
import { AuthenticatedLayout } from "./components/AuthenticatedLayout";

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AuthenticatedLayout>{children}</AuthenticatedLayout>;
}
