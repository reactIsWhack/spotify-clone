import React, {useEffect, useState} from "react";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import MusicCard from "./components/MusicCard";

export default function App() {

  const [inputsData, setInputsData] = useState({
    song: '',
    genre: 'POP'
  });
  const [songs, setSongs] = useState([]);
  const [section, setSection] = useState('discover');
 
  useEffect(() => {
    console.log(section)
    let url;
    if (section === 'discover') {
      url = `https://shazam-core7.p.rapidapi.com/charts/get-top-songs-in_world_by_genre?genre=${inputsData.genre}&limit=30&lang=en`;
    } else if (section === 'search') {
      url = `https://shazam-core7.p.rapidapi.com/search?term=${inputsData.song}&limit=10`;
    }
    const options = {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': '001219ae62mshb12295d07ec4632p1bee87jsnc116a60c6e99',
        'X-RapidAPI-Host': 'shazam-core7.p.rapidapi.com'
      }
    };

    fetch(url, options)
      .then(res => res.json())
      .then(data => {
        section === 'search' ? setSongs(data.tracks.hits) : setSongs(data.tracks)
      })
      .catch(error => alert(error))
  }, [inputsData.genre, section, inputsData.song])
  
  const songCard = songs.map(song => {
    return <MusicCard 
      img={section === 'search' ? song.images.blurred : song.images.coverart}
      title={section === 'search' ? song.heading.title : song.title}
      artist={section === 'search' ? song.heading.subtitle : song.subtitle}
    />
  })
  console.log(songs, section)

  return (
    <div className="app">
      <Sidebar setSection={setSection} setSongs={setSongs} section={section} />
      <main>
        <div className="music-section">
          <Navbar setInputsData={setInputsData} section={section} setSection={setSection} setSongs={setSongs} />
          <div className="song-cards-container">
            {songCard}
          </div>
        </div>
        
      </main>
    </div>
  )
}