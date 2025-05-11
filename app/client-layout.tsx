"use client";
import React from 'react';
import { LanguageProvider } from './contexts/LanguageContext';
import Link from 'next/link';

// This is a client component that can use "use client" directive
export default function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <LanguageProvider>
        {children}
      </LanguageProvider>
      <footer>
        <Link href="https://www.instagram.com/vincedurko/">
          <p>© {new Date().getFullYear()} polymons</p>
        </Link>
      </footer>
    </>
  );
}
