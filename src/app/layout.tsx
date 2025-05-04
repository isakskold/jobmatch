import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Jobmatch",
  description: "Matching job seekers and recruiters",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="">
        <main className="bg-gray-50">{children}</main>
      </body>
    </html>
  );
}
