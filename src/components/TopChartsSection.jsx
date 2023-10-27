import React from "react";
import MusicCard from "./MusicCard";

export default function TopChartsSection({img, title, artist, songs, id, setAudios, audios, section, setIsPlaying, setSelectedAudio, setIsPaused, setSongInformation, setSection, setRelatedSongs, isPlaying}) {

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
     />
  )  
}