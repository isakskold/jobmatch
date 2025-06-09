import RoleBasedAccess from "../components/RoleBasedAccess";

export default function RecruiterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <RoleBasedAccess requiredRole="RECRUITER" redirectTo="/auth">
      {children}
    </RoleBasedAccess>
  );
}
