import RoleBasedAccess from "../components/RoleBasedAccess";

export default function JobseekerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <RoleBasedAccess requiredRole="SEEKER" redirectTo="/auth">
      {children}
    </RoleBasedAccess>
  );
}
