"use client";
import React from 'react';
import Link from "next/link";
import styles from "/app/styles/LinkRedirectButton.module.css";
import { width } from '@fortawesome/free-brands-svg-icons/fa42Group';

const Custom404: React.FC = () => {
  return (
    <div>
      <h1>404 - Page Not Found</h1>
      <p>Sorry, the page you are looking for does not exist.</p>
      <Link href="/" className={styles.redirectButton}>
        Go back to the homepage
      </Link>
    </div>
  );
};

export default Custom404;
