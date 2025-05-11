"use client";
import React from 'react';
import { LanguageProvider } from './contexts/LanguageContext';
import Header from './components/Header';
import Footer from './components/Footer';

// This is a client component that can use "use client" directive
export default function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <LanguageProvider>
        <Header />
        {children}
        <Footer />
      </LanguageProvider>
    </>
  );
}
