// components/FlagSwitcher.tsx
"use client";
import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import Image from 'next/image';
import firebaseService from '../services/firebaseService';
import styles from '../styles/FlagSwitcher.module.css';

const FlagSwitcher: React.FC = () => {
  const { language, toggleLanguage } = useLanguage();

  const handleLanguageChange = () => {
    const newLanguage = language === 'en' ? 'hu' : 'en';
    firebaseService.logLanguageChange(newLanguage);
    toggleLanguage();
  };  return (
    <div className={styles.switchContainer}>      <Image
        src="/uk-flag.png"
        alt="English"
        width={24}
        height={18}
        className={`${styles.flagImage} ${language === 'en' ? styles.activeFlag : ''}`}
        onClick={handleLanguageChange}
        title="Switch to English"
      />
      <Image
        src="/hu-flag.png"
        alt="Hungarian"
        width={24}
        height={18}
        className={`${styles.flagImage} ${language === 'hu' ? styles.activeFlag : ''}`}
        onClick={handleLanguageChange}
        title="Váltás magyarra"
      />
    </div>
  );
};

export default FlagSwitcher;
