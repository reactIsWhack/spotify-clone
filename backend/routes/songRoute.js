const express = require("express");
const songRuoter = express.Router();
const {
  addSong,
  getSongs,
  deleteSong,
} = require("../controllers/songController");

songRuoter.post("/", addSong);
songRuoter.get("/", getSongs);
songRuoter.delete("/:id", deleteSong);
module.exports = songRuoter;
