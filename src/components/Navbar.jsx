import React, { useRef } from "react";
import searchIcon from "../assets/search.svg";

export default function Navbar({
  setInputsData,
  setSection,
  setSongs,
  section,
  inputsData,
  setIsPlaying,
  selectedAudio,
  editTitle,
}) {
  const input = useRef();
  function handleChange(e) {
    setInputsData((prevInputsData) => {
      return {
        ...prevInputsData,
        [e.target.name]: e.target.value,
      };
    });
    setIsPlaying(false);
    selectedAudio.audio.pause();
    selectedAudio.audio.currentTime = 0;
  }

  function handleSubmit(e) {
    setSongs([]);
    setSection("search");

    setInputsData((prevInputsData) => ({
      ...prevInputsData,
      [e.target.name]: input.current.value,
    }));
  }

  return (
    <nav>
      <div className="input-container">
        <img
          className="search-icon"
          src={searchIcon}
          alt="search-icon"
          name="song"
          onClick={handleSubmit}
        />
        <input ref={input} type="text" name="song" placeholder="Search..." />
      </div>

      {section !== "information" && (
        <div onChange={handleChange} className="genre-selector-container">
          <div className="header">{editTitle()}</div>
          {section === "discover" && (
            <select name="genre" value={inputsData.genre}>
              <option value="POP">Pop</option>
              <option value="HIP_HOP_RAP">Hip Hop</option>
              <option value="DANCE">Dance</option>
              <option value="ELECTRONIC">Electronic</option>
              <option value="SOUL_RNB">Soul</option>
              <option value="ALTERNATIVE">Alternative</option>
              <option value="ROCK">Rock</option>
              <option value="LATIN">Latin</option>
              <option value="FILM_TV">Film</option>
              <option value="COUNTRY">Country</option>
              <option value="WORLDWIDE">Worldwide</option>
              <option value="REGGAE_Dance_Hall">Reggae</option>
              <option value="HOUSE">House</option>
              <option value="K_POP">K-Pop</option>
            </select>
          )}
        </div>
      )}
    </nav>
  );
}
