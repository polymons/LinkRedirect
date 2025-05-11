"use client";
import React from 'react';
import Link from 'next/link';
import { useLanguage } from '../contexts/LanguageContext';
import styles from '../styles/GameButton.module.css';

const GameButton: React.FC = () => {
  const { language } = useLanguage();
  
  return (
    <Link href="/game" className={styles.gameButton}>
      {language === 'en' ? 'Play Game' : 'Játék'}
    </Link>
  );
};

export default GameButton;
