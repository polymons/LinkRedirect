"use client";
import React, { Component } from 'react';
import { Inter } from "next/font/google";
import "./styles/globals.css";
import { LanguageProvider } from './contexts/LanguageContext';
import Head from 'next/head';
import Link from 'next/link';

const inter = Inter({ subsets: ["latin"] });

const metadata = {
  title: "Link redirect",
  description: "A simple link redirect page",
  icons: [
    {
      href: "/favicon.ico",
      sizes: "any",
      type: "image/x-icon",
    }],
  keywords: ["link", "redirect", "page", "simple", "skr"],
  metadataBase: new URL('https://skrlinkredirect.web.app/'),
  openGraph: {
    title: "Link redirect",
    description: "A simple link redirect page",
    icons: [
      {
        url: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      }],
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

export default function RootLayout({ children }: Readonly< { children: React.ReactNode }>) {
  const { title, description, keywords, openGraph } = metadata;

  return (
    <html lang="en">
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href={metadata.icons?.[0]?.href} sizes={metadata.icons?.[0]?.sizes} />
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords?.join(', ')} />
        <meta name="author" content="polymons" />
        <meta name="robots" content="index, follow" />
        <meta name="googlebot" content="index, follow" />
        <meta name="google" content="notranslate" />
        {/* Open Graph Metadata */}
        <meta property="og:title" content={openGraph?.title} />
        <meta property="og:description" content={openGraph?.description} />
        <meta property="og:locale" content={openGraph?.locale} />
        <meta property="og:icon" content={new URL(openGraph?.icons?.[0]?.url, metadata.metadataBase)?.toString()} />
        <meta property="og:type" content={openGraph?.type} />
        <meta property="og:image" content={new URL(openGraph?.images?.[0]?.url, metadata.metadataBase)?.toString()} />
        <meta property="og:image:width" content={openGraph?.images?.[0]?.width?.toString()} />
        <meta property="og:image:height" content={openGraph?.images?.[0]?.height?.toString()} />
        <meta property="og:url" content={openGraph?.url} />
        <meta property="og:site_name" content={openGraph?.siteName} />
      </Head>
      <body className={inter.className}>
        <LanguageProvider>
          {children}
        </LanguageProvider>
        <footer>
          <Link href="https://www.instagram.com/vincedurko/">
          <p>© {new Date().getFullYear()} polymons</p>
          </Link>
        </footer>
      </body>
    </html>
  );
}