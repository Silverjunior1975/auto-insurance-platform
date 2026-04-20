import type { Metadata } from "next";

import "./globals.css";
import { Footer } from "@/components/Footer";
import { NavBar } from "@/components/NavBar";
import { getSiteUrl } from "@/lib/site";

export const metadata: Metadata = {
  metadataBase: new URL(getSiteUrl()),
  title: {
    default: "Auto Insurance Platform | Cheap Car Insurance Quotes",
    template: "%s | Auto Insurance Platform"
  },
  description:
    "Compare cheap auto insurance options in minutes. Get your free quote and connect with trusted providers.",
  openGraph: {
    title: "Auto Insurance Platform",
    description: "Fast, affordable auto insurance quote requests.",
    type: "website"
  }
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className="min-h-screen">
        <div className="flex min-h-screen flex-col">
          <NavBar />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
