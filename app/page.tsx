"use client";
import React, { useEffect } from "react";
import SocialMediaButton from "./components/SocialMediaButton";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import firebaseService from "./services/firebaseService";

const socialMediaLinks = [
	{
		name: "Petition",
		url: "https://act.stopkillerrobots.org/stop-killer-robots-petition",
		id: "petition",
	},
	{
		name: "Hungarian Activist Network Facebook",
		url: "https://www.facebook.com/skrmagyarorszag/",
		id: "facebook",
	},
	{
		name: "Digital Dehumanisation",
		url: "https://www.stopkillerrobots.org/stop-killer-robots/digital-dehumanisation/",
		id: "digitexhibition",
	},
	// Add more links as needed
];

const Home: React.FC = () => {
	useEffect(() => {
		// Increment total site visits
		firebaseService.incrementSiteVisits();

		// Handle unique visitor ID generation and increment unique site visits
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

/* 	const renderImages = (count: number) => {
		const images = [];
		for (let i = 0; i < count; i++) {
			images.push(
				<Image
					key={i}
					src="/SKR_Logo_RGB_Yellow.webp"
					alt="SKR Logo"
					width={40}
					height={40}
					loading="lazy"
				/>
			);
		}
		return images;
	}; */

	return (
		<main className="flex flex-col items-center justify-between p-6 md:p-24 min-h-screen gap-5 ">
			{/*   <h1 className="text-xl md:text-3xl font-bold">SKR</h1> */}
			<Link href="https://www.stopkillerrobots.org/">
				<img
					src="/skr512.png"
					alt="SKR Logo"
					width={220}
					height={220}
					loading="lazy"
					className="qr-code"
				/>
				{/* <Image src="/skr512.png" alt="SKR Logo" width={120} height={120} loading="lazy"/> */}
			</Link>
			<div className="flex flex-col gap-5">
				{socialMediaLinks.map((link) => (
					<SocialMediaButton key={link.id} {...link} />
				))}
			</div>

			<div className="flex flex-row gap-5 ">
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

			{/*       <div className="flex flex-row gap-5 ">
        {renderImages(5)}
      </div> */}
		</main>
	);
};

export default Home;
