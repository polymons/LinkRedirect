import React from 'react';
import { Inter } from "next/font/google";
import "./styles/globals.css";
import { LanguageProvider } from './contexts/LanguageContext';
import Link from 'next/link';
import ClientLayout from './client-layout';

const inter = Inter({ subsets: ["latin"] });

// Metadata can only be exported from a server component (not a client component)
export const metadata = {
  title: "Link redirect",
  description: "A simple link redirect page",
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
        width: 800,
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
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="google" content="notranslate" />
      </head>
      <body className={inter.className} suppressHydrationWarning={true}>
        <ClientLayout>
          {children}
        </ClientLayout>
      </body>
    </html>
  );
}
