import React, {useState} from "react";
import playIcon from "../assets/playIcon.svg";

export default function TopCharts({img, title, artist, audio, number, id, topCharts, setAudios, setSelectedAudio, setIsPlaying, selectedAudio}) {

  function checkTitle() {
    if (title.length > 14) {
      const shortenedTitle = title.substring(0, 12) + '...';
      return shortenedTitle
    }
    return title
  }

  function playAudio(e) {
    setIsPlaying(true);
    const audioFile = e.target.getAttribute("file");
    const id = e.target.id;
    const audio = new Audio(audioFile);
    const selectedChart = topCharts.find(topChart => topChart.key === id);
    setAudios(prevAudios => {
      prevAudios.forEach(audio => {
        audio.audio.pause();
        audio.audio.currentTime = 0;
      });
      return prevAudios
    });
    setSelectedAudio(prevSelectedAudio => {
      const newSelectedAudio = {song: selectedChart, audio: audio};
      if (prevSelectedAudio.length) {
        prevSelectedAudio.audio.pause();
      }
      return newSelectedAudio
    });
    audio.play();
    setAudios(prevAudios => [...prevAudios, {song: selectedChart, audio: audio}])
  }

  return (
      <div className="charts">
        <div className="chart-card">
          <div className="num">{number + 1}.</div>
          <img src={img} className="chart-img" />
          <div className="chart-info">
            <div className="chart-title">{checkTitle()}</div>
            <div className="chart-artist">{artist}</div>
          </div>
          <div className="chart-play-icon">
            <img src={playIcon} file={audio} id={id} onClick={playAudio} />
          </div>
        </div>
      </div>
  )
}