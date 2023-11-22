const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const cors = require("cors");
const songRouter = require("./routes/songRoute");
const errorMiddleware = require("./middleware/errorMiddleware");
const userRouter = require("./routes/userRoute");
const PORT = 5000;

const app = express();
app.use(express.json());
app.use(cors());
app.use("/api/songs", songRouter);
app.use("/api/users", userRouter);

app.use(errorMiddleware);

const connectDB = async () => {
  try {
    await mongoose.connect(dotenv.parsed.URI);
    app.listen(PORT, () => {
      console.log(`Server started on port ${PORT}`);
    });
  } catch (error) {
    console.log(error.message);
  }
};

connectDB();
