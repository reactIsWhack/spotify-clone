import React, { useEffect, useState, useRef } from "react";
import Sidebar from "./components/Sidebar.jsx";
import Navbar from "./components/Navbar.jsx";
import MusicCard from "./components/MusicCard.jsx";
import SongNavbar from "./components/SongNavbar.jsx";
import SongCard from "./components/SongCard.jsx";
import TopArtists from "./components/TopArtists.jsx";
import SongInformation from "./components/SongInformation.jsx";
import TopArtistsSection from "./components/TopArtistsSection.jsx";
import TopChartsSection from "./components/TopChartsSection.jsx";
import Playlist from "./components/Playlist.jsx";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { Routes, Route } from "react-router-dom";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<AppContent />}></Route>
    </Routes>
  );
}

function AppContent() {
  const [inputsData, setInputsData] = useState({
    song: "",
    genre: "POP",
  });
  const [songs, setSongs] = useState([]);
  const [section, setSection] = useState("discover");
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
  const [playlist, setPlaylist] = useState([]);
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "001219ae62mshb12295d07ec4632p1bee87jsnc116a60c6e99",
      "X-RapidAPI-Host": "shazam-core.p.rapidapi.com",
    },
  };
  useEffect(() => {
    let url;
    if (section === "discover") {
      url = `https://shazam-core.p.rapidapi.com/v1/charts/genre-world?genre_code=${inputsData.genre}`;
    } else if (section === "search") {
      url = `https://shazam-core.p.rapidapi.com/v1/search/multi?query=${inputsData.song}&search_type=SONGS_ARTISTS`;
    }

    fetch(url, options)
      .then((res) => res.json())
      .then((data) => {
        if (section === "discover") {
          setSongs(data);
        } else if (section === "search") {
          const results = data.tracks.hits;
          results.forEach((result) => {
            setSongs((prevSongs) => [...prevSongs, result.track]);
          });
        }
      });
  }, [inputsData.genre, section, inputsData.song]);

  const getSongs = async () => {
    try {
      const { data } = await axios.get("/api/songs");
      setPlaylist(data);
      setSongs(data);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    const url = "https://shazam-core.p.rapidapi.com/v1/charts/world";
    fetch(url, options)
      .then((res) => res.json())
      .then((data) => {
        fullTopCharts.current = data;
        setTopCharts(fullTopCharts.current.slice(0, 5));
        setTopArtsits(fullTopCharts.current.slice(0, 10));
      });

    if (section === "topCharts") {
      setSongs(fullTopCharts.current);
    }
    getSongs();
  }, []);

  const songCard = songs.map((song) => {
    const coverart = song.images && song.images.coverart;
    return (
      <MusicCard
        songs={songs}
        section={section}
        id={song.key}
        img={coverart}
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
        setPlaylist={setPlaylist}
        song={song}
        playlist={playlist}
        setSongs={setSongs}
      />
    );
  });

  console.log(playlist, "playlist");

  const playlistCards = playlist.map((playlistSong) => {
    const coverart = playlistSong.images && playlistSong.images.coverart;

    return (
      <Playlist
        songs={songs}
        section={section}
        id={playlistSong.key}
        img={coverart}
        title={playlistSong.title}
        artist={playlistSong.subtitle}
        setIsPlaying={setIsPlaying}
        setAudios={setAudios}
        audios={audios}
        setSelectedAudio={setSelectedAudio}
        setIsPaused={setIsPaused}
        isPlaying={isPlaying}
        setSection={setSection}
        setSongInformation={setSongInformation}
        setRelatedSongs={setRelatedSongs}
        setPlaylist={setPlaylist}
        playlist={playlist}
        getSongs={getSongs}
        setSongs={setSongs}
      />
    );
  });

  const topChartCards = topCharts.map((topChart, index) => {
    return (
      <SongCard
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
    );
  });

  const fullTopArtistCards = fullTopCharts.current.map((fullTopChart) => {
    const coverart = fullTopChart.images && fullTopChart.images.background;

    return (
      <TopArtistsSection
        img={coverart}
        artist={fullTopChart.subtitle}
        title={fullTopChart.title}
      />
    );
  });

  const fullTopChartCards = fullTopCharts.current.map((fullTopChart) => {
    const coverart = fullTopChart.images && fullTopChart.images.coverart;

    return (
      <TopChartsSection
        songs={songs}
        section={section}
        id={fullTopChart.key}
        img={coverart}
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
        playlist={playlist}
        setPlaylist={setPlaylist}
        fullTopChart={fullTopChart}
      />
    );
  });

  const topArtistsImages = topArtists.map((topArtist) => {
    return <TopArtists img={topArtist.images.background} />;
  });

  function showMoreCharts() {
    setCount((prevCount) => prevCount + 5);
    setTopCharts((prevTopCharts) => {
      return [...prevTopCharts, ...songs.slice(count - 5, count)];
    });
  }

  function renderMoreArtists() {
    setTopArtistCount((prevTopArtistCount) => prevTopArtistCount + 5);
    setTopArtsits((prevTopArtists) => {
      return [
        ...prevTopArtists,
        ...fullTopCharts.current.slice(topArtistCount - 5, topArtistCount),
      ];
    });
  }

  function editTitle() {
    if (section === "discover") {
      const title = inputsData.genre;
      const firstLetter = title[0];
      const restOfLetters = title.slice(1);
      const lowerCaseLetters = restOfLetters.toLowerCase();
      return `Discover ${firstLetter + lowerCaseLetters}`;
    } else if (section === "search") {
      return `Showing results for ${inputsData.song}`;
    } else if (section === "topArtists") {
      return "Top Artists";
    } else if (section === "playlist") {
      return "Playlist";
    } else {
      return "Top Charts";
    }
  }

  console.log(songs, "songs");

  return (
    <div className="app">
      <Sidebar
        setSection={setSection}
        setSongs={setSongs}
        section={section}
        setIsPlaying={setIsPlaying}
        setAudios={setAudios}
        topCharts={fullTopCharts}
        playlist={playlist}
      />
      <main>
        {(section === "discover" ||
          section === "search" ||
          section === "topCharts" ||
          section === "playlist" ||
          section === "information") && (
          <Navbar
            setInputsData={setInputsData}
            section={section}
            setSection={setSection}
            setSongs={setSongs}
            inputsData={inputsData}
            setIsPlaying={setIsPlaying}
            selectedAudio={selectedAudio}
            editTitle={editTitle}
          />
        )}
        {(section === "discover" || section === "search") && (
          <div className="music-section">
            <div className="song-cards-container">{songCard}</div>
          </div>
        )}
        {section === "playlist" && (
          <div className="playlist-page">
            {playlist.length ? (
              playlistCards
            ) : (
              <div className="p-notif">No songs in playlist</div>
            )}
          </div>
        )}
        {section === "topArtists" && (
          <div className="top-artists-page">{fullTopArtistCards}</div>
        )}
        {section === "topCharts" && (
          <div className="top-charts-page">{fullTopChartCards}</div>
        )}

        {section === "information" && (
          <SongInformation
            songInformation={songInformation}
            relatedSongs={relatedSongs}
            selectedAudio={selectedAudio}
            setAudios={setAudios}
            setSelectedAudio={setSelectedAudio}
            setIsPlaying={setIsPlaying}
            setIsPaused={setIsPaused}
          />
        )}
        <div className="discover-sidebar">
          <div className="subtitle">
            <div className="sublabel">Top Charts</div>
            <div className="more-label" onClick={showMoreCharts}>
              See More
            </div>
          </div>
          <div className="top-charts-container">{topChartCards}</div>
          <div className="top-artists-container">
            <div className="subtitle">
              <div className="sublabel">Top Artists</div>
              <div className="more-label" onClick={renderMoreArtists}>
                See More
              </div>
            </div>
            <div className="artists-scrollbar">{topArtistsImages}</div>
          </div>
        </div>
      </main>
      {isPlaying && (
        <SongNavbar
          section={section}
          selectedAudio={selectedAudio}
          setIsPaused={setIsPaused}
          isPaused={isPaused}
          setSelectedAudio={setSelectedAudio}
          songs={songs}
          setAudios={setAudios}
        />
      )}
      <ToastContainer />
    </div>
  );
}
