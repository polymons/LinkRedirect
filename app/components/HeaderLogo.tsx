"use client";
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from '../styles/Home.module.css';

const HeaderLogo: React.FC = () => {
  return (
    <Link href="/" className={styles.headerLogo}>      <img
        src="/SKR_Logo_RGB_Yellow.webp"
        alt="Stop Killer Robots"
        width={30}
        height={30}
      />
    </Link>
  );
};

export default HeaderLogo;
