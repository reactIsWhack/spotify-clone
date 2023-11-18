import React, { useEffect, useState, useRef } from "react";
import playIcon from "../assets/playIcon.svg";
import pauseIcon from "../assets/pauseIcon.svg";
import addIcon from "../assets/add.svg";

export default function MusicCard({
  img,
  title,
  artist,
  songs,
  id,
  setAudios,
  audios,
  section,
  setIsPlaying,
  setSelectedAudio,
  setIsPaused,
  setSongInformation,
  setSection,
  setRelatedSongs,
}) {
  const firstLetterOfTitle = title[0];
  const firstLetterCapitilized = firstLetterOfTitle.toUpperCase();
  const restOfTitle = title.slice(1);
  const correctedTitle = firstLetterCapitilized + restOfTitle;

  const [playButtonHidden, setPlayButtonHidden] = useState(false);

  function handleMouseOver() {
    setPlayButtonHidden(true);
  }

  function handleMouseLeave(e) {
    setPlayButtonHidden(false);
  }

  let matchingSong;
  function playMusic(e) {
    setIsPaused(false);
    setIsPlaying(true);
    const id = e.target.id;
    const selectedSong = songs.find((song) => song.key === id);
    const a = new Audio(selectedSong.hub.actions[1].uri);
    // creates an audio object, which will play the song
    const songObj = {
      audio: a,
      song: selectedSong,
    };
    // adds a song to an array of audios
    setAudios((prevAudios) => [...prevAudios, songObj]);
    audios.forEach((audio) => {
      if (audio.song.key === id) {
        matchingSong = audio;
      }
      // checks if the user clicks on a song that they had previousoly clicked on
    });
    audios.push({ audio: a, song: selectedSong });
    const songsNotPlaying = audios.filter((audio) => audio.song.key !== id);
    const mutedSongs = songsNotPlaying.map((song) => {
      song.audio.pause();
      song.audio.currentTime = 0;
      return song;
    });
    if (matchingSong) {
      const matchingAudio = audios.find(
        (audio) => audio.song.key === matchingSong.song.key
      );
      matchingAudio.audio.muted = false;
      // mutes all other songs except the one the user clicked.
    }
    const selected = audios.find((audio) => audio.song.key === id);
    setSelectedAudio(selected);
    // sets audios array to only have one audio object that is not muted
    setAudios([...mutedSongs, selected]);
    // plays audio
    selected.audio.play();
    selected.audio.currentTime = 0;
  }

  function getSongInformation(e) {
    const id = e.target.id;
    const url = `https://shazam-core.p.rapidapi.com/v1/tracks/details?track_id=${id}`;
    const relatedSongsUrl = `https://shazam-core.p.rapidapi.com/v1/tracks/related?track_id=${id}`;
    const options = {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": "001219ae62mshb12295d07ec4632p1bee87jsnc116a60c6e99",
        "X-RapidAPI-Host": "shazam-core.p.rapidapi.com",
      },
    };
    fetch(url, options)
      .then((res) => res.json())
      .then((data) => {
        console.log(data, "data");
        setSongInformation(data);
        setSection("information");
      });

    fetch(relatedSongsUrl, options)
      .then((res) => res.json())
      .then((data) => setRelatedSongs(data));
  }

  return (
    <>
      <div className="card">
        <div
          onMouseOver={() => handleMouseOver()}
          onMouseLeave={handleMouseLeave}
          className="song-background"
        >
          <img src={img} alt="song-background" />
          {playButtonHidden &&
            (section === "search" ||
              section === "discover" ||
              section === "topCharts") && (
              <img
                className="play-icon"
                id={id}
                onClick={playMusic}
                src={playIcon}
              />
            )}
        </div>
        <div className="song-info">
          {(section === "search" ||
            section === "discover" ||
            section === "topCharts") && (
            <div className="title" id={id} onClick={getSongInformation}>
              {correctedTitle}
            </div>
          )}
          <div className="artist">{artist}</div>
          <div className="add-icon">
            <img src={addIcon} />
          </div>
        </div>
      </div>
    </>
  );
}
