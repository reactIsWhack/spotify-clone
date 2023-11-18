import React from "react";
import MusicCard from "./MusicCard";

export default function Playlist({
  songs,
  section,
  id,
  img,
  title,
  artist,
  setIsPlaying,
  setAudios,
  audios,
  setSelectedAudio,
  setIsPaused,
  isPlaying,
  setSection,
  setSongInformation,
  setRelatedSongs,
  setPlaylist,
}) {
  return (
    <MusicCard
      songs={songs}
      section={section}
      id={id}
      img={img}
      title={title}
      artist={artist}
      setIsPlaying={setIsPlaying}
      setAudios={setAudios}
      audios={audios}
      setSelectedAudio={setSelectedAudio}
      setIsPaused={setIsPaused}
      isPlaying={isPlaying}
      setSection={setSection}
      setSongInformation={setSongInformation}
      setRelatedSongs={setRelatedSongs}
      setPlaylist={setPlaylist}
    />
  );
}
