import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "True Orbit Bookkeeping | Financial Clarity for Small Business",
  description: "Luxury bookkeeping and financial advisory services for small businesses and solopreneurs.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-luxury-black min-h-screen">
        {children}
      </body>
    </html>
  );
}
