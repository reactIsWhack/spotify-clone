import React from "react";
import searchIcon from "../assets/search.svg";

export default function Navbar({setInputsData}) {
  
  function handleChange(e) {
    setInputsData((prevInputsData) => {
      return {
        ...prevInputsData,
        [e.target.name]: e.target.value
      }
    })
  }

  return (
    <nav>
      <div onChange={handleChange} className="input-container">
        <img className="search-icon" src={searchIcon} alt="search-icon" />
        <input type="text" name="song" placeholder="Search..." />
      </div>
      <div onChange={handleChange} className="genre-selector-container">
        <select name="genre">
          <option value="POP">Pop</option>
          <option value="HIP-HOP">Hip Hop</option>
          <option value="DANCE">Dance</option>
          <option value="ELECTRONIC">Electronic</option>
          <option value="SOUL">Soul</option>
          <option value="ALTERNATIVE">Alternative</option>
          <option value="ROCK">Rock</option>
          <option value="LATIN">Latin</option>
          <option value="FILM">Film</option>
          <option value="COUNTRY">Country</option>
          <option value="WORLDWIDE">Worldwide</option>
          <option value="REGGAE">Reggae</option>
          <option value="HOUSE">House</option>
          <option value="K-POP">K-Pop</option>
        </select>
      </div>
    </nav>
  )
}