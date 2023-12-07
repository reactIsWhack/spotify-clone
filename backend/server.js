const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const cors = require("cors");
const router = require("./routes/songRoute");
const PORT = process.env.PORT || 3000;

const app = express();
app.use(express.json());
app.use(cors());
app.use(express.static("dist"));

app.use("/api/songs", router);

// app.get("/", (req, res) => {
//   res.send("Home Page");
// });

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
