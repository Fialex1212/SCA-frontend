import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";

const geistInter = Inter({
  variable: "--font-geist-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Spy Cat Agency | Mission & Target Management",
  description:
    "Manage spy cats, assign secret missions, and track progress on espionage targets. A CRUD app integrating RESTful APIs, SQL databases, and third-party services.",
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistInter.variable} antialiased`}
      >
        <Header />
        {children}
      </body>
    </html>
  );
}
