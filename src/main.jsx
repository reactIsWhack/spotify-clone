import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./styles/General.css";
import "./styles/Sidebar.css";
import "./styles/Navbar.css";
import "./styles/MusicCard.css";
import "./styles/SongNavbar.css";
import "./styles/SongCard.css";
import "./styles/TopArtists.css";
import "./styles/SongInformation.css";
import { BrowserRouter } from "react-router-dom";

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById("root")
);
