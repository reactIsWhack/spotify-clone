import React from "react";
import playIcon from "../assets/playIcon.svg";

export default function TopCharts({img, title, artist, audio, number}) {

  function checkTitle() {
    if (title.length > 14) {
      const shortenedTitle = title.substring(0, 12) + '...';
      return shortenedTitle
    }
    return title
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
            <img src={playIcon} />
          </div>
        </div>
      </div>
  )
}