// components/FlagSwitcher.tsx
"use client";
import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import Image from 'next/image';
import firebaseService from '../services/firebaseService';
import styles from '../styles/Home.module.css';

const FlagSwitcher: React.FC = () => {
  const { language, toggleLanguage } = useLanguage();

  const handleLanguageChange = () => {
    const newLanguage = language === 'en' ? 'hu' : 'en';
    firebaseService.logLanguageChange(newLanguage);
    toggleLanguage();
  };  return (
    <div className="flex gap-2">
      <span className={styles.languageSwitch}>
        <Image
          src="/uk-flag.png"
          alt="English"
          width={50}
          height={40}
          className={language === 'en' ? styles.activeLang : ''}
          onClick={handleLanguageChange}
          title="Switch to English"
        />
        <Image
          src="/hu-flag.png"
          alt="Hungarian"
          width={50}
          height={40}
          className={language === 'hu' ? styles.activeLang : ''}
          onClick={handleLanguageChange}
          title="Váltás magyarra"
        />
      </span>
    </div>
  );
};

export default FlagSwitcher;
