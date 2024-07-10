'use client';
import React from "react";
import { useEffect } from "react";
import SocialMediaButton from "./components/SocialMediaButton";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";


const socialMediaLinks = [
  { name: "Facebook", url: "https://facebook.com", id: "facebook" },
  { name: "Twitter", url: "https://twitter.com", id: "twitter" },
  { name: "Instagram", url: "https://instagram.com", id: "instagram" },
  // Add more links as needed
];

const Home: React.FC = () => {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className="text-2xl font-bold">SKR</h1>
      <div className="flex flex-col gap-4">
        {socialMediaLinks.map((link) => (
          <SocialMediaButton key={link.id} {...link} />
        ))}
      </div>
    </main>
  );
};

export default Home;
