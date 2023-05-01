import { Inter } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
});

export const revalidate = false;

export const metadata = {
  title: "Unicol F / W / D / L / S",
  icons: {
    icon: "/logo-bg.png",
    shortcut: "/logo-bg.png",
    apple: "/logo-bg.png",
    other: {
      rel: "apple-touch-icon-precomposed",
      url: "/logo-bg.png",
    },
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`h-full bg-gray-100 ${inter.className}`}>
      <body className="h-full">{children}</body>
    </html>
  );
}
