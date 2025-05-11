import React from 'react';
import { Inter } from "next/font/google";
import "./styles/globals.css";
import { LanguageProvider } from './contexts/LanguageContext';
import Link from 'next/link';
import ClientLayout from './client-layout';
import type { Metadata } from "next";

const inter = Inter({ subsets: ["latin"] });

// Metadata can only be exported from a server component (not a client component)
export const metadata: Metadata = {
  title: "SKR - Stop Killer Robots",
  description: "Stop Killer Robots Campaign - Leading the call for new international law on autonomy in weapons systems",
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || "https://skrlinkredirect.web.app/"),
  icons: [
    {
      rel: "icon",
      url: "/favicon.ico",
      sizes: "any",
      type: "image/x-icon",
    }
  ],
  keywords: ["link", "redirect", "page", "simple", "skr"],
  authors: [{ name: "polymons" }],
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  openGraph: {
    title: "Link redirect",
    description: "A simple link redirect page",
    type: "website",
    images: [
      {
        url: "/SKR_Logo_RGB_Yellow.webp",
        width: 600,
        height: 600,
        alt: 'SKR Logo'
      }
    ],
    url: "https://skrlinkredirect.web.app/",
    siteName: "SKR",
    locale: "en_UK",
  }
};

// Root layout must be a server component to support metadata exports
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover, maximum-scale=1.0, user-scalable=no" />
        <meta name="google" content="notranslate" />
      </head><body className={inter.className} suppressHydrationWarning={true}>
        <div className="app-container">
          <ClientLayout>
            {children}
          </ClientLayout>
        </div>
      </body>
    </html>
  );
}
