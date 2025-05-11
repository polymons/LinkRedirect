"use client";
import React, { useState, useEffect } from 'react';
import { LanguageProvider } from './contexts/LanguageContext';
import Link from 'next/link';

// This is a client component that can use "use client" directive
export default function ClientLayout({ children }: { children: React.ReactNode }) {
  // Using a fixed value for initial render to avoid hydration mismatch
  const [currentYear, setCurrentYear] = useState("2025");
  
  // Update the year client-side after hydration
  useEffect(() => {
    setCurrentYear(new Date().getFullYear().toString());
  }, []);
  
  return (
    <>
      <LanguageProvider>
        {children}
      </LanguageProvider>      
      <footer>
        <Link href="https://www.instagram.com/vincedurko/" className="hover:opacity-80 transition-opacity">
          <p>© {currentYear} <span className="font-medium">polymons</span></p>
        </Link>
      </footer>
    </>
  );
}
