import "../styles/globals.css";
import { openGraphImage } from "./shared-metadata";
import { Analytics } from "@vercel/analytics/react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "Sven Nijhuis",
    template: "Sven Nijhuis | %s",
  },
  description:
    "This is my personal portfolio, created to showcase who I am and where I aspire to go.",
  applicationName: "Sven Nijhuis portfolio",
  referrer: "origin-when-cross-origin",
  keywords: [
    "Next.js",
    "React",
    "JavaScript",
    "TypeScript",
    "Tailwind CSS",
    "cmd",
    "supabase",
    "portfolio",
    "sven",
    "nijhuis",
    "svennijhuis",
    "svennijhuis.io",
    "svennijhuis",
    "Amsterdam",
    "Netherlands",
    "Nederland",
    "hva",
  ],
  authors: [
    { name: "Sven Nijhuis" },
    { name: "Sven Nijhuis", url: "www.svennijhuis.io" },
  ],

  creator: "Sven Nijhuis",
  publisher: "Sven Nijhuis",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    ...openGraphImage,
    title: "Sven Nijhuis",
    description:
      "This is my personal portfolio, created to showcase who I am and where I aspire to go.",
  },
  category: "technology portfolio",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html className={inter.className} lang="en">
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
