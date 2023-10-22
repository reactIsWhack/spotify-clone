import React, {useEffect, useState, useRef} from "react";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import MusicCard from "./components/MusicCard";
import SongNavbar from "./components/SongNavbar.jsx";
import TopCharts from "./components/TopCharts";
import TopArtists from "./components/TopArtists";

export default function App() {

  const [inputsData, setInputsData] = useState({
    song: '',
    genre: 'POP'
  });
  const [songs, setSongs] = useState([]);
  const [section, setSection] = useState('discover');
  const [isPlaying, setIsPlaying] = useState(false);
  const [topCharts, setTopCharts] = useState([]);
  const [topArtists, setTopArtsits] = useState([]);
  const fullTopCharts = useRef([]);
  // set to strue when the play button is clicked
  const [audios, setAudios] = useState([]);
  const [selectedAudio, setSelectedAudio] = useState({});
  const [isPaused, setIsPaused] = useState(false);
  const [count, setCount] = useState(10);
  const [topArtistCount, setTopArtistCount] = useState(15);
  const [userLocation, setUserLocation] = useState({});
  const [duration, setDuration] = useState(0);
  // keeps track of how many charts the user is showing
  const success = (position) => {
    setUserLocation({
      lat: position.coords.latitude,
      lng: position.coords.longitude
    })
  }

  const error = (error) => {
    console.log(error)
  }
 
  useEffect(() => {
    let url;
    if (section === 'discover') {
      url = `https://shazam-core.p.rapidapi.com/v1/charts/genre-country?country_code=US&genre_code=${inputsData.genre}`;
    } else if (section === 'search') {
      url = `https://shazam-core.p.rapidapi.com/v1/search/multi?query=${inputsData.song}&search_type=SONGS_ARTISTS`;
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
        if (section === 'search') {
          const hits = data.tracks.hits;
          let newSongs = [];
          hits.forEach(hit => {
            newSongs.push(hit.track)
          });
          setSongs(newSongs)
        } else {
          setSongs(data)
        }
      })
      .catch(error => alert(error))

  
  }, [inputsData.genre, section, inputsData.song])
  console.log(songs);
  useEffect(() => {
    const url = 'https://shazam-core.p.rapidapi.com/v1/charts/world';
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
        setTopCharts(data.slice(0, 5));
        fullTopCharts.current = data;
        setTopArtsits(fullTopCharts.current.slice(0, 10))
      })
    
      navigator.geolocation.getCurrentPosition(success, error);
  }, []);

  
  const songCard = songs.map(song => {
    return <MusicCard 
      songs={songs}
      section={section}
      id={song.key}
      img={song.images.coverart}
      title={song.title}
      artist={song.subtitle}
      setIsPlaying={setIsPlaying}
      setAudios={setAudios}
      audios={audios}
      setSelectedAudio={setSelectedAudio}
      setIsPaused={setIsPaused}
      isPlaying={isPlaying}
    />
  })
  
  const topChartCards = topCharts.map((topChart, index) => {
    return <TopCharts 
      img={topChart.images.coverart}
      title={topChart.title}
      artist={topChart.subtitle}
      audio={topChart.hub.actions[1].uri}
      number={index}
      topCharts={topCharts}
      id={topChart.key}
      setSelectedAudio={setSelectedAudio}
      setAudios={setAudios}
      setIsPlaying={setIsPlaying}
      selectedAudio={selectedAudio}
     />
  });

  const topArtistsImages = topArtists.map(topArtist => {
    return <TopArtists img={topArtist.images.background} />
  })

  function showMoreCharts() {
    setCount(prevCount => prevCount + 5);
    setTopCharts(prevTopCharts => {
      return [
        ...prevTopCharts,
        ...fullTopCharts.current.slice(count - 5, count)
      ]
    });
  }

  function renderMoreArtists() {
    setTopArtistCount(prevTopArtistCount => prevTopArtistCount + 10);
    setTopArtsits(prevTopArtists => {
      return [
        ...prevTopArtists,
        ...fullTopCharts.current.slice(topArtistCount - 10, topArtistCount)
      ]
    })
  }

  return (
    <div className="app">
      <Sidebar setSection={setSection} setSongs={setSongs} section={section} setIsPlaying={setIsPlaying} setAudios={setAudios} />
      <main>
        <div className="music-section">
          <Navbar setInputsData={setInputsData} section={section} setSection={setSection} setSongs={setSongs} inputsData={inputsData} setIsPlaying={setIsPlaying} selectedAudio={selectedAudio} />
          <div className="song-cards-container">
            {songCard}
          </div>
        </div>
        <div className="discover-sidebar">
        <div className="subtitle">
          <div className="sublabel">Top Charts</div>
          <div className="more-label" onClick={showMoreCharts}>See More</div>
        </div>
          <div className="top-charts-container">
            {topChartCards}
          </div>
          <div className="top-artists-container">
            <div className="subtitle">
              <div className="sublabel">Top Artists</div>
              <div className="more-label" onClick={renderMoreArtists}>See More</div>
            </div>
            <div className="artists-scrollbar">
              {topArtistsImages}
            </div>
          </div>
        </div>
      </main>
      {isPlaying && <SongNavbar selectedAudio={selectedAudio} setIsPaused={setIsPaused} isPaused={isPaused} setSelectedAudio={setSelectedAudio} songs={songs} setAudios={setAudios} />}
    </div>
  )
}