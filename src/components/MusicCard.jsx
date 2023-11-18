import React, { useEffect, useState, useRef } from "react";
import playIcon from "../assets/playIcon.svg";
import pauseIcon from "../assets/pauseIcon.svg";
import addIcon from "../assets/add.svg";
import trashIcon from "../assets/trashIcon.svg";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";

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
  setPlaylist,
  selectedAudio,
  playlist,
  song,
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
    audios.push({ audio: a, song: selectedSong, playing: true });
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
        setSongInformation(data);
        setSection("information");
      });

    fetch(relatedSongsUrl, options)
      .then((res) => res.json())
      .then((data) => setRelatedSongs(data));
  }

  async function addToPlaylist(e) {
    const songId = e.currentTarget.id;
    const duplicatedSong = playlist.find(
      (likedSong) => likedSong.key === songId
    );
    if (duplicatedSong) {
      return toast.error("Song already in playlist");
    }
    const songData = {
      title: song.title,
      subtitle: song.subtitle,
      images: {
        coverart: song.images.coverart,
      },
      hub: {
        actions: song.hub.actions,
      },
      key: song.key,
    };
    try {
      const { data } = await axios.post(
        "http://localhost:5000/api/songs",
        songData
      );

      setPlaylist((prevPlaylist) => [...prevPlaylist, data]);
      toast.success("Added song to playlist!");
    } catch (error) {
      toast.error("Failed to add song to playlist");
    }
  }

  function removeFromPlaylist(e) {
    const songId = e.currentTarget.id;
    console.log(songId);
    setPlaylist((prevPlaylist) => {
      return prevPlaylist.filter((playlistSong) => playlistSong.key !== songId);
    });
    toast.success("Song removed from playlist!");
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
              section === "playlist" ||
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
            section === "playlist" ||
            section === "topCharts") && (
            <div className="title" id={id} onClick={getSongInformation}>
              {correctedTitle}
            </div>
          )}
          <div className="artist">{artist}</div>
          {section !== "topArtists" && (
            <div className="add-icon">
              {section === "playlist" ? (
                <img
                  src={trashIcon}
                  onClick={removeFromPlaylist}
                  className="trash-icon"
                  id={id}
                />
              ) : (
                <img src={addIcon} onClick={addToPlaylist} id={id} />
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
