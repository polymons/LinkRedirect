"use client";
import React from "react";
import firebaseService from "../services/firebaseService";
import styles from "../styles/SocialMediaButton.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faTwitter,
	faTiktok,
	faInstagram,
	faFacebook,
} from "@fortawesome/free-brands-svg-icons";
import { LanguageProvider, useLanguage } from "../contexts/LanguageContext";

type SocialMediaButtonProps = {
	name: string;
	url: string;
	id: string;
};

const renderIcon = (platformName: string) => {
	switch (platformName.toLowerCase()) {
		case "twitter":
			return <FontAwesomeIcon icon={faTwitter} />;
		case "facebook":
			return <FontAwesomeIcon icon={faFacebook} />;
		case "instagram":
			return <FontAwesomeIcon icon={faInstagram} />;
		case "tiktok":
			return <FontAwesomeIcon icon={faTiktok} />;
		default:
			console.warn(`Unknown platform: ${platformName}`);
			return null; // Default case if no matching platform
	}
};

const SocialMediaButton: React.FC<SocialMediaButtonProps> = ({
	name,
	url,
	id,
}) => {
	const { language } = useLanguage();

	const handleClick = async () => {
		firebaseService.logClickEvent(id); //Log event to Firebase Analytics
		await firebaseService.incrementClickCount(id + "_social_media_" + language); //Increment click count in Firestore with page language
	};

	return (
		<a href={url} target="_blank" rel="noopener noreferrer">
			<button onClick={handleClick} className={styles.socialButton}>
				{renderIcon(name)}
			</button>
		</a>
	);
};

export default SocialMediaButton;
