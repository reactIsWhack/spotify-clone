const express = require("express");
const router = express.Router();
const {
  addSong,
  getSongs,
  deleteSong,
} = require("../controllers/songController");

router.post("/", addSong);
router.get("/", getSongs);
router.delete("/:id", deleteSong);
module.exports = router;
