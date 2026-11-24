import "../styles/globals.css";
import { openGraphImage } from "./shared-metadata";
import { Analytics } from "@vercel/analytics/react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://svennijhuis.io"),
  title: {
    default: "Sven Nijhuis",
    template: "Sven Nijhuis | %s",
  },
  description:
    "Backend developer in Hoorn. I work with C# and .NET on Azure, and with AI engineering.",
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
    "Hoorn",
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
      "Backend developer in Hoorn. I work with C# and .NET on Azure, and with AI engineering.",
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
