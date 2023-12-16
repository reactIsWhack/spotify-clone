import React from "react";
import SongCard from "./SongCard";

export default function SongInformation({songInformation, relatedSongs, setSelectedAudio, setAudios, setIsPlaying, selectedAudio, setIsPaused, setSection, setArtistInformation}) {

  const lyrics = [];

  function renderLyrics() {
    const lyricsArray = songInformation.sections[1].text;
    for (let i = 0; i < lyricsArray.length; i++) {
      lyrics[i] = <div>{lyricsArray[i]}</div>
    }
    return lyrics
  }

  const correctedRelatedSongs = relatedSongs.filter(relatedsong => relatedsong.hub.actions);

  const relatedSongCards = correctedRelatedSongs.map((relatedsong, index) => {
    console.log(relatedsong.key, 'key')
    return <SongCard 
    img={relatedsong.images.coverart}
    title={relatedsong.title}
    artist={relatedsong.subtitle}
    audio={relatedsong.hub.actions[1].uri}
    number={index}
    id={relatedsong.key}
    setSelectedAudio={setSelectedAudio}
    setAudios={setAudios}
    setIsPlaying={setIsPlaying}
    selectedAudio={selectedAudio}
    setIsPaused={setIsPaused}
    topCharts={relatedSongs}
     />
  })
  
  return (
    <div className="song-information-container">
      <div className="song-credentials">
        <img className="artist-img" src={songInformation.images.coverart} />
        <div className="credentials-info">
          <div className="credentials-title">{songInformation.title}</div>
          <div className="credentials-artist">{songInformation.subtitle}</div>
          <div className="credentials-genres">{songInformation.genres.primary}</div>
        </div>
      </div>   
      <div className="lyrics-container">
        <div className="lyrics-label">Lyrics:</div>
        <div className="lyrics">{renderLyrics()}</div>
      </div>
      <div className="related-songs">
        <div className="related-label">Related Songs:</div>
        {relatedSongCards}
      </div>
    </div>
  )
}