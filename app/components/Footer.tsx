"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";

const Footer: React.FC = () => {
  // Using a fixed value for initial render to avoid hydration mismatch
  const [currentYear, setCurrentYear] = useState("2025");
  
  // Update the year client-side after hydration
  useEffect(() => {
    setCurrentYear(new Date().getFullYear().toString());
  }, []);

  return (
    <footer className="py-4 text-center text-sm text-gray-600">
      <Link href="https://www.instagram.com/vincedurko/" className="hover:opacity-80 transition-opacity">
        <p>© {currentYear} <span className="font-medium">polymons</span></p>
      </Link>
    </footer>
  );
};

export default Footer;
