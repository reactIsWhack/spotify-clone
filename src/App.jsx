import React, {useEffect, useState, useRef} from "react";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import MusicCard from "./components/MusicCard";
import SongNavbar from "./components/SongNavbar.jsx";

export default function App() {

  const [inputsData, setInputsData] = useState({
    song: '',
    genre: 'POP'
  });
  const [songs, setSongs] = useState([]);
  const [section, setSection] = useState('discover');
  const [isPlaying, setIsPlaying] = useState(false);
  // set to strue when the play button is clicked
  const [audios, setAudios] = useState([]);
  const [selectedAudio, setSelectedAudio] = useState({});
  const [isPaused, setIsPaused] = useState(false);
  console.log(selectedAudio);
 
  useEffect(() => {
    let url;
    if (section === 'discover') {
      url = `https://shazam-core.p.rapidapi.com/v1/charts/genre-country?country_code=US&genre_code=${inputsData.genre}`;
    } else if (section === 'search') {
      url = `https://shazam-core.p.rapidapi.com/v1/search/multi?query=${null}&search_type=${inputsData.song}`;
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
        console.log(data)
        section === 'search' ? setSongs(data.detail) : setSongs(data)
      })
      .catch(error => alert(error))

  
  }, [inputsData.genre, section, inputsData.song])
  
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
    />
  })
  console.log(songs)

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
      {isPlaying && <SongNavbar selectedAudio={selectedAudio} setIsPaused={setIsPaused} isPaused={isPaused} setSelectedAudio={setSelectedAudio} songs={songs} setAudios={setAudios} />}
      </main>
    </div>
  )
}