import React, {useState, useRef} from "react";
import pauseIcon from "../assets/pauseIcon.svg";
import playIcon from "../assets/play-icon-2.svg";
import fastForwardIcon from "../assets/fast-forward.svg";
import rewindIcon from "../assets/rewind.svg";
import replayIcon from "../assets/replay.svg";
import spinIcon from "../assets/spin.svg";
import volumeIcon from "../assets/volume.svg";

export default function SongNavbar({selectedAudio, setIsPaused, isPaused, setSelectedAudio, songs, setAudios}) {
  
  const song = songs.find(song => song.key === selectedAudio.song.key);
  const index = songs.indexOf(song);
  const [isSpinning, setIsSpinning] = useState(false);
  const [volume, setVolume] = useState(1);
  
  // Tracks the volume inputted by the user, so the volume property of selectedAudio can be set and change the volume of the song.
  const input = useRef();
  // reference to volume input element
  const progress = (volume / Number(input.current.max)) * 100;


  function pauseMusic() {
    selectedAudio.audio.pause()
    setIsPaused(true)
  }

  function resumeMusic() {
    selectedAudio.audio.play();
    setIsPaused(false)
  }
  
  function fastForwardMusic() {
    setIsPaused(false);
    
    const newSong = songs[index + 1];
    const newAudio = new Audio(newSong.hub.actions[1].uri);
    setSelectedAudio(prevAudio => {
      prevAudio.audio.pause();
      return {audio: newAudio, song: newSong};
    });
    setAudios(prevAudios => [...prevAudios, {song: newSong, audio: newAudio}])
    
    newAudio.play();
  }

  function rewindMusic() {
    setIsPaused(false);
    
    const newSong = songs[index - 1];
    const newAudio = new Audio(newSong.hub.actions[1].uri);
    setSelectedAudio(prevAudio => {
      prevAudio.audio.pause();
      return {audio: newAudio, song: newSong};
    });
    setAudios(prevAudios => [...prevAudios, {song: newSong, audio: newAudio}])
    
    newAudio.play();
  }

  function replayMusic() {
    selectedAudio.audio.currentTime = 0;
    selectedAudio.audio.play()
    console.log(selectedAudio.audio.currentTime)
  }

  function spinArtsitImg() {
    setIsSpinning(prevIsSpinning => !prevIsSpinning);
  }

  const styles = {
    animation: isSpinning ? 'rotate 1.5s infinite' : 'none'
  }

  function handleChange(e) {
    setVolume(e.target.value);
    selectedAudio.audio.volume = volume;
    
    input.current.style.background = `linear-gradient(to right, #0040ff ${progress}%, #ccc ${progress}%)`;
  }
  

  return (
    <nav className="song-navbar">
      <div className="nav-song-info">
        <img className="artist-image" src={selectedAudio.song.images.coverarthq} style={styles} />
        <div>
          <div className="nav-title">{selectedAudio.song.title}</div>
          <div className="nav-artist">{selectedAudio.song.subtitle}</div>
        </div>
      </div>
      <div className="tools">
        <img src={replayIcon} alt="replay-icon" className="replay-icon" onClick={replayMusic} />
        <img src={rewindIcon} alt="rewind-icon" className="rewind-icon" onClick={rewindMusic} />
        {!isPaused ? <img className="pause-icon" src={pauseIcon} onClick={pauseMusic} /> : <img src={playIcon} onClick={resumeMusic} className="nav-play-icon" />}
        <img src={fastForwardIcon} alt="fast-forward-icon" className="fast-forward-icon" onClick={fastForwardMusic} />
        <img src={spinIcon} alt="spin-icon" className="spin-icon" onClick={spinArtsitImg} />
      </div>
      <div className="volume-container">
        <img src={volumeIcon} className="volume-icon" />
        <input type="range" min="0" max="1" step="0.01" value={volume} className="volume-bar" onChange={(e) => handleChange(e)} ref={input} />
      </div>
    </nav>
  )
}