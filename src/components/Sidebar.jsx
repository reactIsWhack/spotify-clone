import React from "react";
import homeIcon from "../assets/home.svg";
import locationIcon from "../assets/location.svg";
import peopleIcon from "../assets/people.svg";
import chartIcon from "../assets/chart.svg";

export default function Sidebar({setSection, setSongs, section, setIsPlaying, setAudios}) {

  function handleClick() {
    setSection('discover');
    setIsPlaying(false);
    setSongs((prevSongs) => section === 'discover' ? prevSongs : []);
    setAudios(prevAudios => {
      return prevAudios.map(prevAudio => {
        prevAudio.audio.pause();
        prevAudio.audio.currentTime = 0;
        return prevAudio
      })
    })
  }

  return (
    <div className="sidebar">
      <div className="logo-container">
        <img src="https://jsm-lyriks-app.netlify.app/assets/logo.32aea7f0.svg" alt="lyriks-logo" />
      </div>
      <div className="links">
        <div className="link-container">
          <img src={homeIcon} alt="home-icon" />
          <div onClick={handleClick} className="label">Discover</div>
        </div>
        <div className="link-container">
          <img src={locationIcon} alt="location-icon" />
          <div  className="label">Around You</div>
        </div>
        <div className="link-container">
          <img src={peopleIcon} alt="people-icon" />
          <div className="label">Top Artists</div>
        </div>
        <div className="link-container">
          <img src={chartIcon} alt="chart-icon" />
          <div className="label">Top Charts</div>
        </div>
      </div>
    </div>
  )
}