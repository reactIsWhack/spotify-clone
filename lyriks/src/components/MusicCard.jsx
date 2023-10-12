import React, {useEffect, useState, useRef} from "react";
import playIcon from "../assets/playIcon.svg";
let audios = []

export default function MusicCard({img, title, artist, songs, id}) {
  
  const firstLetterOfTitle = title[0];
  const firstLetterCapitilized = firstLetterOfTitle.toUpperCase();
  const restOfTitle = title.slice(1);
  const correctedTitle = firstLetterCapitilized + restOfTitle;
  const [playButtonHidden, setPlayButtonHidden] = useState(false);


  function handleMouseOver() {
    setPlayButtonHidden(true)
  }

  function handleMouseLeave(e) {
    setPlayButtonHidden(false)
  }

  let a = new Audio()
  let matchingSong;

  function playMusic(e) {
    const id = e.target.id;
    const selectedSong = songs.find(song => song.key === id);
    audios.forEach(audio => {
      if (audio.song.key === id) {
        matchingSong = audio
      }
    });
    a = new Audio(selectedSong.hub.actions[1].uri);
    console.log(matchingSong);
    audios.push({audio: a, song: selectedSong})
    const songsNotPlaying = audios.filter(audio => audio.song.key !== id);
    const mutedSongs = songsNotPlaying.map(song => {
      song.audio.muted = true
      song.audio.currentTime = 0
      return song
    });
    if (matchingSong) {
      const matchingAudio = audios.find(audio => audio.song.key === matchingSong.song.key);
      matchingAudio.audio.muted = false
    }
    const selected = audios.find(audio => audio.song.key === id);
    audios = [...mutedSongs, selected];
    console.log(audios);
    selected.audio.play()
  }



  return (
    <div className="card">
      <div onMouseOver={() => handleMouseOver()} onMouseLeave={handleMouseLeave} className="song-background">
        <img src={img} alt="song-background" />
        {playButtonHidden && <img className="play-icon" id={id} onClick={playMusic} src={playIcon} />}
      </div>
      <div className="song-info">
        <div className="title">{correctedTitle}</div>
        <div className="artist">{artist}</div>
      </div>
    </div>
  )
}