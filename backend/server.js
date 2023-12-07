const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const cors = require("cors");
const router = require("./routes/songRoute");
const PORT = 5000;

const app = express();
app.use(express.json());
app.use(cors());
app.use("/api/songs", router);

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.URI);
    app.listen(PORT, () => {
      console.log(`Server started on port ${PORT}`);
    });
  } catch (error) {
    console.log(error.message);
  }
};

connectDB();
