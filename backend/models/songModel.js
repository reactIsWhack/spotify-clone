const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const songSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  subtitle: {
    type: String,
    required: true,
  },
  images: {
    type: Object,
    required: true,
  },
  hub: {
    type: Object,
  },
  key: {
    type: String,
  },
});

const Song = mongoose.model("Song", songSchema);
module.exports = Song;
