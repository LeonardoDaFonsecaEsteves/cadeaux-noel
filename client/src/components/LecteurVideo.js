import React from "react";
import src from "../assets/PGW.webm";
const LecteurVideo = ({ estTerminer = () => ({}) }) => {
  // function appeler si la video est terminer
  const videoTerminer = (etat) => {
    // si l'etat est terminer on apelle estTerminer
    if (etat === "ended") {
      estTerminer();
    }
  };

  return (
    <video
      className="LecteurVideo"
      onEnded={({ type }) => videoTerminer(type)}
      controls
      autoPlay
      muted
    >
      <source src={src} type="video/mp4" />
    </video>
  );
};

export default LecteurVideo;
