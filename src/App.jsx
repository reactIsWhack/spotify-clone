import React, {useEffect, useState, useRef} from "react";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import MusicCard from "./components/MusicCard";
import SongNavbar from "./components/SongNavbar.jsx";
import TopCharts from "./components/TopCharts";

export default function App() {

  const [inputsData, setInputsData] = useState({
    song: '',
    genre: 'POP'
  });
  const [songs, setSongs] = useState([]);
  const [section, setSection] = useState('discover');
  const [isPlaying, setIsPlaying] = useState(false);
  const [topCharts, setTopCharts] = useState([]);
  // set to strue when the play button is clicked
  const [audios, setAudios] = useState([]);
  const [selectedAudio, setSelectedAudio] = useState({});
  const [isPaused, setIsPaused] = useState(false);
  const [count, setCount] = useState(10);
  // keeps track of how many charts the user is showing;
  console.log(selectedAudio);
 
  useEffect(() => {
    let url;
    if (section === 'discover') {
      url = `https://shazam-core.p.rapidapi.com/v1/charts/genre-country?country_code=US&genre_code=${inputsData.genre}`;
    } else if (section === 'search') {
      url = `https://shazam-core.p.rapidapi.com/v1/search/multi?query=${inputsData.song}&search_type=SONG_ARTISTS`;
    }
    const options = {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': '001219ae62mshb12295d07ec4632p1bee87jsnc116a60c6e99',
        'X-RapidAPI-Host': 'shazam-core.p.rapidapi.com'
      }
    };

    fetch(url, options)
      .then(res => res.json())
      .then(data => {
        section === 'search' ? setSongs(data.tracks.hits) : setSongs(data);
        if (section === 'discover') {
          setTopCharts(data.slice(0, 5))
        }
      })
      .catch(error => alert(error))

  
  }, [inputsData.genre, section, inputsData.song])
  console.log(topCharts, 'topcharts');
  
  const songCard = songs.map(song => {
    return <MusicCard 
      songs={songs}
      section={section}
      id={song.key}
      img={section === 'search' ? song.images.blurred : song.images.coverart}
      title={section === 'search' ? song.heading.title : song.title}
      artist={section === 'search' ? song.heading.subtitle : song.subtitle}
      setIsPlaying={setIsPlaying}
      setAudios={setAudios}
      audios={audios}
      setSelectedAudio={setSelectedAudio}
      setIsPaused={setIsPaused}
      isPaused={isPaused}
    />
  })
  
  const topChartCards = topCharts.map((topChart, index) => {
    return <TopCharts 
      img={topChart.images.coverart}
      title={topChart.title}
      artist={topChart.subtitle}
      audio={topChart.hub.actions[1].uri}
      number={index}
     />
  })

  function showMoreCharts() {
    setCount(prevCount => prevCount + 5);
    setTopCharts(prevTopCharts => {
      return [
        ...prevTopCharts,
        ...songs.slice(count - 5, count)
      ]
    });
    setSeeMore(true)
  }

  return (
    <div className="app">
      <Sidebar setSection={setSection} setSongs={setSongs} section={section} />
      <main>
        <div className="music-section">
          <Navbar setInputsData={setInputsData} section={section} setSection={setSection} setSongs={setSongs} inputsData={inputsData} setIsPlaying={setIsPlaying} selectedAudio={selectedAudio} />
          <div className="song-cards-container">
            {songCard}
          </div>
        </div>
        {section === 'discover' && <div className="discover-sidebar">
        <div className="subtitle">
          <div className="sublabel">Top Charts</div>
          <div className="more-label" onClick={showMoreCharts}>See More</div>
        </div>
          {topChartCards}
        </div>}
      </main>
      {isPlaying && <SongNavbar selectedAudio={selectedAudio} setIsPaused={setIsPaused} isPaused={isPaused} setSelectedAudio={setSelectedAudio} songs={songs} setAudios={setAudios} />}
    </div>
  )
}