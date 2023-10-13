import React, {useState} from "react";
import pauseIcon from "../assets/pauseIcon.svg";
import playIcon from "../assets/play-icon-2.svg";

export default function SongNavbar({selectedAudio, setIsPaused, isPaused}) {

  function pauseMusic() {
    selectedAudio.audio.pause()
    setIsPaused(true)
  }

  function resumeMusic() {
    selectedAudio.audio.play();
    setIsPaused(false)
  }

  return (
    <nav className="song-navbar">
      <div className="nav-song-info">
        <img className="artist-image" src={selectedAudio.song.images.coverarthq} />
        <div>
          <div className="nav-title">{selectedAudio.song.title}</div>
          <div className="nav-artist">{selectedAudio.song.subtitle}</div>
        </div>
      </div>
      {!isPaused ? <img className="pause-icon" src={pauseIcon} onClick={pauseMusic} /> : <img src={playIcon} onClick={resumeMusic} className="nav-play-icon" />}
    </nav>
  )
}