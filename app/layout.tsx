import React, { Component } from 'react';
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./styles/globals.css";
import { AppProps } from 'next/app';
import { LanguageProvider } from './contexts/LanguageContext';
import Head from 'next/head';

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Link redirect",
  description: "A simple link redirect page",
  keywords: ["link", "redirect", "page", "simple", "skr"],
  metadataBase: new URL('https://skrlinkredirect.web.app/'),
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
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>)
{
  return (
    <html lang="en">
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/SKR_Logo_RGB_Yellow.webp" />
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
        <meta name="keywords" content={metadata.keywords.join(', ')} />

        {/* Open Graph Metadata */}
        <meta property="og:title" content={metadata.openGraph.title} />
        <meta property="og:description" content={metadata.openGraph.description} />
        <meta property="og:type" content={metadata.openGraph.type} />
        <meta property="og:image" content={`${metadata.metadataBase}${metadata.openGraph.images[0].url}`} />
        <meta property="og:image:width" content={metadata.openGraph.images[0].width.toString()} />
        <meta property="og:image:height" content={metadata.openGraph.images[0].height.toString()} />
        <meta property="og:url" content={metadata.openGraph.url} />
        <meta property="og:site_name" content={metadata.openGraph.siteName} />
        <meta property="og:locale" content={metadata.openGraph.locale} />
      </Head>
        <body className={inter.className}>
          <LanguageProvider>
            {children}
          </LanguageProvider>
          <footer>
          <p>© {new Date().getFullYear()} polymons</p>
        </footer>
        </body>
    </html>
  );
}
