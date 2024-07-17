// page.tsx
"use client";
import React, { useEffect } from "react";
import LinkRedirectButton from "./components/LinkRedirectButton";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import firebaseService from "./services/firebaseService";
import FlagSwitcher from "./components/FlagSwitcher";
import { useLanguage } from "./contexts/LanguageContext";
import styles from "./styles/Home.module.css";

const socialMediaLinks: { name: { en: string; hu: string; }; url: string; id: string; }[] = [
  {
    name: { en: "Petition", hu: "Petíció" },
    url: "https://act.stopkillerrobots.org/stop-killer-robots-petition",
    id: "petition",
  },
  {
    name: { en: "Hungarian Facebook", hu: "Facebook" },
    url: "https://www.facebook.com/skrmagyarorszag/",
    id: "facebook",
  },
  {
    name: { en: "Digital Dehumanization", hu: "Digitális dehumanizáció" },
    url: "https://www.stopkillerrobots.org/stop-killer-robots/digital-dehumanisation/",
    id: "digitexhibition",
  },
  {
    name: { en: "Youth poll", hu: "Ifjúsági felmérés" },
    url: "https://docs.google.com/forms/d/e/1FAIpQLSfmqdrOWCP_KrE4S_j1VwqQ2aXFUCrEqFSNEnqlUaqhEXDQSg/viewform?usp=sf_link",
    id: "youthpoll",
  }

];

const Home: React.FC = () => {
  useEffect(() => {
    firebaseService.incrementSiteVisits();
    if (localStorage.getItem("uniqueVisitorId") === null) {
      firebaseService.incrementUniqueSiteVisits(generateUniqueVisitorId());
    }
  }, []);

  const generateUniqueVisitorId = () => {
    const id = "xxxx-xxxx-4xxx-yxxx-xxxx".replace(/[xy]/g, function (c) {
      const r = (Math.random() * 16) | 0,
        v = c === "x" ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
    localStorage.setItem("uniqueVisitorId", id);
    return id;
  };

  const { language } = useLanguage();

  return (
    <main className="flex flex-col items-center justify-between p-6 md:p-24 min-h-screen gap-5">
      <FlagSwitcher />
      <Link href="https://www.stopkillerrobots.org/">
        <img
          src="/skr512.png"
          alt="SKR Logo"
          width={220}
          height={220}
          loading="lazy"
          className={styles.qrCode}
        />
      </Link>
      <div className="flex flex-col gap-5">
        {socialMediaLinks.map((link) => (
          <LinkRedirectButton key={link.id} id={link.id} name={link.name[language]} url={link.url} />
        ))}
      </div>
      <div className="flex flex-row gap-5">
        <Link
          href="https://www.stopkillerrobots.org/frequently-asked-questions/"
          className="text-blue-500 underline hover:text-blue-700"
        >
          FAQ
        </Link>
        <Link
          href="https://www.stopkillerrobots.org/"
          className="text-blue-500 underline hover:text-blue-700"
        >
          Campaign
        </Link>
      </div>
    </main>
  );
};

export default Home;
