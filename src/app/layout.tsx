import "./globals.css";

export const metadata = {
  title: "Opi",
  description: "Matching job seekers and recruiters",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
