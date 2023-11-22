import React, { useState, useRef, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import pauseIcon from "../assets/pauseIcon.svg";
import playIcon from "../assets/play-icon-2.svg";
import fastForwardIcon from "../assets/fast-forward.svg";
import rewindIcon from "../assets/rewind.svg";
import replayIcon from "../assets/replay.svg";
import spinIcon from "../assets/spin.svg";
import volumeIcon from "../assets/volume.svg";
import addIcon from "../assets/add.svg";

export default function SongNavbar({
  selectedAudio,
  setIsPaused,
  isPaused,
  setSelectedAudio,
  songs,
  setAudios,
  playlist,
  setPlaylist,
  section,
}) {
  const song = songs.find((song) => song.key === selectedAudio.song.key);
  const isPlaylistSong = playlist.find(
    (song) => song.key === selectedAudio.song.key
  );
  const index = songs.indexOf(song);
  const [isSpinning, setIsSpinning] = useState(false);
  const [volume, setVolume] = useState(1);
  const input = useRef();
  const [progress, setProgress] = useState(0);
  // Tracks the volume inputted by the user, so the volume property of selectedAudio can be set and change the volume of the song.

  // reference to volume input element

  function pauseMusic() {
    selectedAudio.audio.pause();
    setIsPaused(true);
    console.log(selectedAudio.audio.currentTime);
  }

  function resumeMusic() {
    selectedAudio.audio.play();
    setIsPaused(false);
  }

  function fastForwardMusic() {
    setIsPaused(false);

    const newSong = songs[index + 1];
    const newAudio = new Audio(newSong.hub.actions[1].uri);
    setSelectedAudio((prevAudio) => {
      prevAudio.audio.pause();
      return { audio: newAudio, song: newSong };
    });
    setAudios((prevAudios) => [
      ...prevAudios,
      { song: newSong, audio: newAudio },
    ]);

    newAudio.play();
  }

  function rewindMusic() {
    setIsPaused(false);

    const newSong = songs[index - 1];
    const newAudio = new Audio(newSong.hub.actions[1].uri);
    setSelectedAudio((prevAudio) => {
      prevAudio.audio.pause();
      return { audio: newAudio, song: newSong };
    });
    setAudios((prevAudios) => [
      ...prevAudios,
      { song: newSong, audio: newAudio },
    ]);

    newAudio.play();
  }

  function replayMusic() {
    selectedAudio.audio.currentTime = 0;
    selectedAudio.audio.play();
    setIsPaused(false);
  }

  function spinArtsitImg() {
    setIsSpinning((prevIsSpinning) => !prevIsSpinning);
  }

  const styles = {
    animation: isSpinning ? "rotate 1.5s infinite" : "none",
  };

  function handleChange(e) {
    setVolume(e.target.value);
    selectedAudio.audio.volume = volume;
    const progress = (volume / Number(input.current.max)) * 100;

    input.current.style.background = `linear-gradient(to right, #0040ff ${progress}%, #ccc ${progress}%)`;
  }

  useEffect(() => {
    function trackProgress() {
      const duration = selectedAudio.audio.duration;
      const currentTime = selectedAudio.audio.currentTime;
      const progressPercent = (currentTime / duration) * 100;
      setProgress(progressPercent);
    }

    selectedAudio.audio.addEventListener("timeupdate", trackProgress);

    return () => {
      // Clean up event listeners when the component unmounts
      selectedAudio.audio.removeEventListener("timeupdate", trackProgress);
    };
  }, [selectedAudio.audio]);

  const handleProgressBarClick = (e) => {
    const progressBar = e.currentTarget;
    const clickX = e.clientX - progressBar.getBoundingClientRect().left;
    const progressBarWidth = progressBar.offsetWidth;
    const seekTime = (clickX / progressBarWidth) * selectedAudio.audio.duration;
    selectedAudio.audio.currentTime = seekTime;
    selectedAudio.audio.play();
  };

  const addTopPlaylist = async () => {
    const songId = selectedAudio.song.key;
    const duplicatedSong = playlist.find(
      (likedSong) => likedSong.key === songId
    );
    if (duplicatedSong) {
      return toast.error("Song already in playlist");
    }
    const songData = {
      title: selectedAudio.song.title,
      subtitle: selectedAudio.song.subtitle,
      images: {
        coverart: selectedAudio.song.images.coverart,
      },
      hub: {
        actions: selectedAudio.song.hub.actions,
      },
      key: selectedAudio.song.key,
    };
    try {
      const { data } = await axios.post(
        "http://localhost:5000/api/songs",
        songData
      );

      console.log(data);
      setPlaylist((prevPlaylist) => [...prevPlaylist, data]);
      toast.success("Added song to playlist!");
    } catch (error) {
      toast.error("Failed to add song to playlist");
    }
  };

  console.log(isPlaylistSong, "boolean");

  return (
    <nav className="song-navbar">
      <div className="nav-song-info">
        <img
          className="artist-image"
          src={selectedAudio.song.images && selectedAudio.song.images.coverart}
          style={styles}
        />
        <div>
          <div className="nav-title">{selectedAudio.song.title}</div>
          <div className="nav-artist">{selectedAudio.song.subtitle}</div>
        </div>
      </div>
      <div className="all-tools">
        <div className="tools">
          <img
            src={replayIcon}
            alt="replay-icon"
            className="replay-icon"
            onClick={replayMusic}
          />
          <img
            src={rewindIcon}
            alt="rewind-icon"
            className="rewind-icon"
            onClick={rewindMusic}
          />
          {!isPaused ? (
            <img className="pause-icon" src={pauseIcon} onClick={pauseMusic} />
          ) : (
            <img
              src={playIcon}
              onClick={resumeMusic}
              className="nav-play-icon"
            />
          )}
          <img
            src={fastForwardIcon}
            alt="fast-forward-icon"
            className="fast-forward-icon"
            onClick={fastForwardMusic}
          />
          <img
            src={spinIcon}
            alt="spin-icon"
            className="spin-icon"
            onClick={spinArtsitImg}
          />
        </div>
        <div className="progress-bar" onClick={handleProgressBarClick}>
          <div className="progress" style={{ width: `${progress}%` }}></div>
        </div>
      </div>
      <div className="volume-container">
        {section !== "playlist" && (
          <img
            src={addIcon}
            style={{ height: "30px", marginRight: "20px", cursor: "pointer" }}
            onClick={addTopPlaylist}
          />
        )}

        <img src={volumeIcon} className="volume-icon" />
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={volume}
          className="volume-bar"
          onChange={handleChange}
          ref={input}
        />
      </div>
    </nav>
  );
}
