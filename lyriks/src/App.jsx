import React, {useEffect, useState} from "react";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";

export default function App() {

  const [inputsData, setInputsData] = useState({
    song: '',
    genre: 'POP'
  });
  const [songs, setSongs] = useState([]);
  console.log(inputsData);

  useEffect(() => {
    const url = `https://shazam-core7.p.rapidapi.com/charts/get-top-songs-in_world_by_genre?genre=${inputsData.genre}&limit=20`;
    const options = {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': '001219ae62mshb12295d07ec4632p1bee87jsnc116a60c6e99',
        'X-RapidAPI-Host': 'shazam-core7.p.rapidapi.com'
      }
    };

    fetch(url, options)
      .then(res => res.json())
      .then(data => setSongs(data.tracks))
      .catch(error => alert(error))
  }, [inputsData.genre])
  console.log(songs)

  return (
    <div className="app">
      <Sidebar />
      <main>
        <Navbar setInputsData={setInputsData} />
      </main>
    </div>
  )
}