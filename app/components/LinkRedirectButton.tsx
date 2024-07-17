"use client";
import React from "react";
import firebaseService from "../services/firebaseService";
import styles from "../styles/LinkRedirectButton.module.css";

type LinkRedirectButtonProps = {
  name: string;
  url: string;
  id: string;
};

const LinkRedirectButton: React.FC<LinkRedirectButtonProps> = ({ name, url, id }) => {
  const handleClick = async () => {
    firebaseService.logClickEvent(id);  //Log event to Firebase Analytics
    await firebaseService.incrementClickCount(id);  //Increment click count in Firestore
  };

  return (
    <a href={url} target="_blank" rel="noopener noreferrer">
      <button onClick={handleClick} className={styles.redirectButton}>
        {name} <span className={styles.arrow}>&#8594;</span>
      </button>
    </a>
  );
};

export default LinkRedirectButton;
