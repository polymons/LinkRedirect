import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../app/styles/globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Link redirect",
  description: "A simple link redirect page",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>)
{
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/SKR_Logo_RGB_Yellow.webp" />
        <title>SKR</title>
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
