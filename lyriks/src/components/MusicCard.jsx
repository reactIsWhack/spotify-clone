import React from "react";

export default function MusicCard({img, title, artist}) {
  
  const firstLetterOfTitle = title[0];
  const firstLetterCapitilized = firstLetterOfTitle.toUpperCase();
  const restOfTitle = title.slice(1);
  const correctedTitle = firstLetterCapitilized + restOfTitle

  return (
    <div className="card">
      <div className="song-background">
        <img src={img} alt="song-background" />
      </div>
      <div className="song-info">
        <div className="title">{title}</div>
        <div className="artist">{artist}</div>
      </div>
    </div>
  )
}