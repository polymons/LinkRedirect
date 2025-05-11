"use client";
import React from "react";
import FlagSwitcher from "./FlagSwitcher";
import GameButton from "./GameButton";
import HeaderLogo from "./HeaderLogo";
import styles from "../styles/Home.module.css";

const Header: React.FC = () => {
  return (
    <div className={styles.header}>
      <HeaderLogo />
      <div className={styles.headerControls}>
        <GameButton />
        <FlagSwitcher />
      </div>
    </div>
  );
};

export default Header;
