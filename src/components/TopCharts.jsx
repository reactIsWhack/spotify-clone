import React from "react";
import playIcon from "../assets/playIcon.svg";

export default function TopCharts({img, title, artist, audio, number, id, topCharts}) {

  function checkTitle() {
    if (title.length > 14) {
      const shortenedTitle = title.substring(0, 12) + '...';
      return shortenedTitle
    }
    return title
  }

  function playAudio(e) {
    const audioFile = e.target.getAttribute("file");
    const id = e.target.id;
    const audio = new Audio(audioFile);
    const selectedAudio = topCharts.find(topChart => topChart.key === id);
    
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
            <img src={playIcon} file={audio} id={id} />
          </div>
        </div>
      </div>
  )
}