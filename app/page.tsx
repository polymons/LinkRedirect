'use client';
import React from "react";
import { useEffect } from "react";
import SocialMediaButton from "./components/SocialMediaButton";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";


const socialMediaLinks = [
  { name: "Petition", url: "https://act.stopkillerrobots.org/stop-killer-robots-petition", id: "petition" },
  { name: "Hungarian Activist Network facebook", url: "https://www.facebook.com/skrmagyarorszag/", id: "facebook" },
  { name: "Digital Dehumanisation", url: "https://www.stopkillerrobots.org/stop-killer-robots/digital-dehumanisation/", id: "digitexhibition" },
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

      <Link href="https://www.stopkillerrobots.org/">
        <a className="text-blue-500 underline">International Campaign to Stop Killer Robots</a>
      </Link>
      <Link href="https://www.stopkillerrobots.org/frequently-asked-questions/">
        <a className="text-blue-500 underline">FAQ</a>
      </Link>
    </main>
  );
};

export default Home;
