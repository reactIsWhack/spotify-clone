import React, {useEffect, useState, useRef} from "react";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import MusicCard from "./components/MusicCard";
import SongNavbar from "./components/SongNavbar.jsx";
import SongCard from "./components/SongCard";
import TopArtists from "./components/TopArtists";
import SongInformation from "./components/SongInformation";
import TopArtistsSection from "./components/TopArtistsSection";
import TopChartsSection from "./components/TopChartsSection";

export default function App() {

  const [inputsData, setInputsData] = useState({
    song: '',
    genre: 'POP'
  });
  const [songs, setSongs] = useState([]);
  const [section, setSection] = useState('discover');
  const [isPlaying, setIsPlaying] = useState(false);
  // set to strue when the play button is clicked
  const [topCharts, setTopCharts] = useState([]);
  const [topArtists, setTopArtsits] = useState([]);
  const fullTopCharts = useRef([]);
  const [audios, setAudios] = useState([]);
  const [selectedAudio, setSelectedAudio] = useState({});
  const [isPaused, setIsPaused] = useState(false);
  const [count, setCount] = useState(10);
  const [topArtistCount, setTopArtistCount] = useState(15);
  const [songInformation, setSongInformation] = useState({});
  const [relatedSongs, setRelatedSongs] = useState([]);
  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': '001219ae62mshb12295d07ec4632p1bee87jsnc116a60c6e99',
      'X-RapidAPI-Host': 'shazam-core.p.rapidapi.com'
    }
  };
 
  useEffect(() => {
    let url;
    if (section === 'discover') {
      url = `https://shazam-core.p.rapidapi.com/v1/charts/genre-country?country_code=US&genre_code=${inputsData.genre}`;
    } else if (section === 'search') {
      url = `https://shazam-core.p.rapidapi.com/v1/search/multi?query=${inputsData.song}&search_type=SONGS_ARTISTS`;
    } 
    console.log(url)

    fetch(url, options)
      .then(res => {
        return res.json()
      })
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

  
  }, [inputsData.genre, section, inputsData.song])
  console.log(topCharts);
  useEffect(() => {
    setSection('discover')
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
        const adjustedData = data.filter(data => data.hub.actions)
        setTopCharts(adjustedData.slice(0, 5));
        fullTopCharts.current = adjustedData;
        setTopArtsits(fullTopCharts.current.slice(0, 10))
      })
    
  }, []);
  console.log(fullTopCharts, 'full')
  
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
      setSection={setSection}
      setSongInformation={setSongInformation}
      setRelatedSongs={setRelatedSongs}
    />
  })
  
  const topChartCards = topCharts.map((topChart, index) => {
    return <SongCard 
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
      setIsPaused={setIsPaused}
     />
  });

  const fullTopArtistCards = fullTopCharts.current.map(fullTopChart => {
    return <TopArtistsSection 
      img={fullTopChart.images.background}
      artist={fullTopChart.subtitle}
      title={fullTopChart.title}
     />
  });

  const fullTopChartCards = fullTopCharts.current.map(fullTopChart => {
    return <TopChartsSection 
      songs={songs}
      section={section}
      id={fullTopChart.key}
      img={fullTopChart.images.coverart}
      title={fullTopChart.title}
      artist={fullTopChart.subtitle}
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
  })
  console.log(selectedAudio)

  console.log(fullTopCharts)

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
    setTopArtistCount(prevTopArtistCount => prevTopArtistCount + 5);
    setTopArtsits(prevTopArtists => {
      return [
        ...prevTopArtists,
        ...fullTopCharts.current.slice(topArtistCount - 5, topArtistCount)
      ]
    })
  }
  console.log(songs, 'songs')


  return (
    <div className="app">
      <Sidebar setSection={setSection} setSongs={setSongs} section={section} setIsPlaying={setIsPlaying} setAudios={setAudios} topCharts={fullTopCharts} />
      <main>
      {(section === 'discover' || section === 'search' || section === 'topCharts') && <Navbar setInputsData={setInputsData} section={section} setSection={setSection} setSongs={setSongs} inputsData={inputsData} setIsPlaying={setIsPlaying} selectedAudio={selectedAudio} />}
        {(section === 'discover' || section === 'search') && <div className="music-section">
          <div className="song-cards-container">
            {songCard}
          </div>
        </div>}
        {section === 'topArtists' && <div className="top-artists-page">{fullTopArtistCards}</div>}
        {section === 'topCharts' && <div className="top-charts-page">{fullTopChartCards}</div>}
        {section === 'information' && <SongInformation songInformation={songInformation} relatedSongs={relatedSongs} selectedAudio={selectedAudio} setAudios={setAudios} setSelectedAudio={setSelectedAudio} setIsPlaying={setIsPlaying} setIsPaused={setIsPaused} />}
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
      {isPlaying && <SongNavbar section={section} selectedAudio={selectedAudio} setIsPaused={setIsPaused} isPaused={isPaused} setSelectedAudio={setSelectedAudio} songs={songs} setAudios={setAudios} />}
    </div>
  )
}