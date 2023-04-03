import Header from "@/app/components/header";
import { getDivisionFixtures } from "@/app/utils/getDivisionFixtures";
import { TEAM_MAP } from "@/app/utils/constants";
import { getDivisionStandings } from "@/app/utils/getDivisionStandings";
import StandingsTable from "@/app/components/standings";
import Results from "@/app/components/results";
import Link from "next/link";
import "./globals.css";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full bg-gray-100">
      <body className="h-full">{children}</body>
    </html>
  );
}
