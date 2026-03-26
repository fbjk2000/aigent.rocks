import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "aigent.rocks | AI Agent Orchestra for European SMBs",
  description: "Deploy specialised AI agents for sales, marketing, and operations. Built for European SMBs with GDPR compliance and data security at the core. Custom AI agent development by Florian Krueger.",
  keywords: "AI agents, artificial intelligence, automation, SMB, Europe, GDPR, sales automation, marketing automation, operations, custom development",
  authors: [{ name: "Florian Krueger" }],
  openGraph: {
    title: "aigent.rocks | AI Agent Orchestra for European SMBs",
    description: "Deploy specialised AI agents for sales, marketing, and operations. Built for European SMBs with GDPR compliance at the core.",
    url: "https://aigent.rocks",
    siteName: "aigent.rocks",
    type: "website",
    locale: "en_GB",
  },
  twitter: {
    card: "summary_large_image",
    title: "aigent.rocks | AI Agent Orchestra",
    description: "Deploy specialised AI agents for sales, marketing, and operations. GDPR compliant.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body className={inter.className} suppressHydrationWarning>{children}</body>
    </html>
  );
}
