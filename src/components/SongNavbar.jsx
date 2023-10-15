import React, {useState} from "react";
import pauseIcon from "../assets/pauseIcon.svg";
import playIcon from "../assets/play-icon-2.svg";
import fastForwardIcon from "../assets/fast-forward.svg";
import rewindIcon from "../assets/rewind.svg";
import replayIcon from "../assets/replay.svg";
import spinIcon from "../assets/spin.svg";

export default function SongNavbar({selectedAudio, setIsPaused, isPaused, setSelectedAudio, songs, setAudios}) {
  
  const song = songs.find(song => song.key === selectedAudio.song.key);
  const index = songs.indexOf(song);
  const [isSpinning, setIsSpinning] = useState(false);

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

    </nav>
  )
}