import React from "react";
import firebaseService from "../services/firebaseService";

type SocialMediaButtonProps = {
  name: string;
  url: string;
  id: string;
};

const SocialMediaButton: React.FC<SocialMediaButtonProps> = ({ name, url, id }) => {
  const handleClick = async () => {
    firebaseService.logClickEvent(id);  //Log event to Firebase Analytics
    await firebaseService.incrementClickCount(id);  //Increment click count in Firestore
  };

  return (
    <a href={url} target="_blank" rel="noopener noreferrer">
      <button onClick={handleClick} className="p-2 bg-blue-500 text-white rounded">
        {name}
      </button>
    </a>
  );
};

export default SocialMediaButton;
