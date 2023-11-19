const Song = require("../models/songModel");

const addSong = async (req, res) => {
  try {
    const song = await Song.create(req.body);
    res.status(200).json(song);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

const getSongs = async (req, res) => {
  try {
    const songs = await Song.find();
    res.status(200).json(songs);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

const deleteSong = async (req, res) => {
  const { id } = req.params;
  try {
    await Song.findByIdAndDelete(id);
    res.status(200).json("Song deleted from playlist");
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

module.exports = {
  addSong,
  getSongs,
  deleteSong,
};
