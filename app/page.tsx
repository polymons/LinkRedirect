'use client';
import React, { useEffect } from 'react';
import SocialMediaButton from "./components/SocialMediaButton";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import firebaseService from './services/firebaseService';

const socialMediaLinks = [
  { name: "Petition", url: "https://act.stopkillerrobots.org/stop-killer-robots-petition", id: "petition" },
  { name: "Hungarian Activist Network facebook", url: "https://www.facebook.com/skrmagyarorszag/", id: "facebook" },
  { name: "Digital Dehumanisation", url: "https://www.stopkillerrobots.org/stop-killer-robots/digital-dehumanisation/", id: "digitexhibition" },
  // Add more links as needed
];

const Home: React.FC = () => {

  useEffect(() => {
    // Increment total site visits
    firebaseService.incrementSiteVisits();
  
    // Handle unique visitor ID generation and increment unique site visits
    if ( localStorage.getItem('uniqueVisitorId') === null) {
      firebaseService.incrementUniqueSiteVisits(generateUniqueVisitorId());
    }
  }, []);
  
  const generateUniqueVisitorId = () => {
    const id = 'xxxx-xxxx-4xxx-yxxx-xxxx'.replace(/[xy]/g, function(c) {
      const r = (Math.random() * 16) | 0, v = c === 'x' ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
    localStorage.setItem('uniqueVisitorId', id);
    return id;
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className="text-2xl font-bold">SKR</h1>
      <div className="flex flex-col gap-4">
        {socialMediaLinks.map((link) => (
          <SocialMediaButton key={link.id} {...link} />
        ))}
      </div>

      <Link
        href="https://www.stopkillerrobots.org/"
        className="text-blue-500 underline">
        International Campaign to Stop Killer Robots
      </Link>
      <Link
        href="https://www.stopkillerrobots.org/frequently-asked-questions/"
        className="text-blue-500 underline">
        FAQ
      </Link>
    </main>
  );
};

export default Home;
