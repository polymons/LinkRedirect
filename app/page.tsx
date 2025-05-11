"use client";
import React, { useEffect } from "react";
import LinkRedirectButton from "./components/LinkRedirectButton";
import Link from "next/link";
import firebaseService from "./services/firebaseService";
import { useLanguage } from "./contexts/LanguageContext";
import styles from "./styles/Home.module.css";
import SocialMediaButton from "./components/SocialMediaButton";

const linkRedirectLinks: {
	name: { en: string; hu: string };
	url: string;
	id: string;
}[] = [
	{
		name: { en: "Petition", hu: "Petíció" },
		url: "https://act.stopkillerrobots.org/stop-killer-robots-petition",
		id: "petition",
	},
	{
		name: { en: "Digital Dehumanization", hu: "Digitális dehumanizáció" },
		url: "https://www.stopkillerrobots.org/stop-killer-robots/digital-dehumanisation/",
		id: "digitexhibition",
	},	{
		name: { en: "Youth poll", hu: "Ifjúsági felmérés" },
		url: "https://docs.google.com/forms/d/e/1FAIpQLSfmqdrOWCP_KrE4S_j1VwqQ2aXFUCrEqFSNEnqlUaqhEXDQSg/viewform?usp=sf_link",
		id: "youthpoll",
	}
];

const SocialMediaButtons: {
	name: string;
	url: { en: string; hu: string };
	id: string;
}[] = [
	{
		name: "Facebook",
		url: {
			en: "https://www.facebook.com/stopkillerrobots",
			hu: "https://www.facebook.com/skrmagyarorszag/",
		},
		id: "facebook",
	},
	{
		name: "Instagram",
		url: {
			en: "https://www.instagram.com/stopkillerrobots/",
			hu: "https://www.instagram.com/stopkillerrobots/",
		},
		id: "instagram",
	},
	{
		name: "TiKTok",
		url: {
			en: "https://www.tiktok.com/@stopkillerrobots",
			hu: "https://www.tiktok.com/@stopkillerrobots.hungary",
		},
		id: "tiktok",
	},
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
		<>
			<main className="flex flex-col items-center min-h-screen p-0 pb-12 w-full box-border overflow-x-hidden">
				<div className={styles.container}>
					<Link href="https://www.stopkillerrobots.org/" className="self-center mb-6">
						<img
							src="/skr512.png"
							alt="SKR Logo"
							width={180}
							height={180}
							className={styles.qrCode}
						/>
					</Link>

				<div className={styles.buttonContainer}>
					{linkRedirectLinks.map((link) => (
						<LinkRedirectButton
							key={link.id}
							id={link.id}
							name={link.name[language]}
							url={link.url}
						/>
					))}
				</div>

				<div className={styles.socialContainer}>
					{SocialMediaButtons.map((button) => (
						<SocialMediaButton
							key={button.id}
							name={button.name}							url={button.url[language]}
							id={button.id}
						/>
					))}
				</div>

				{/* <div className={styles.linkContainer}>
					<Link
						href="https://www.stopkillerrobots.org/frequently-asked-questions/"
						className={styles.footerLink}
					>
						FAQ
					</Link>
					<Link
						href="https://www.stopkillerrobots.org/"
						className={styles.footerLink}
					>
						Campaign
					</Link>
				</div> */}
				</div>
			</main>
		</>
	);
};

export default Home;
