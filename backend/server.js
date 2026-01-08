require("dotenv").config();
const express = require("express");
const app = express();

const cors = require("cors");
const connectDB = require("./config/db");
const path = require("path");


app.use(
  cors(
    (corsOptions = {
      origin: process.env.CORS_ORIGIN || "http://localhost:3000",
      methods: ["GET", "POST", "PUT", "DELETE"],
      allowedHeaders: ["Content-Type", "Authorization"],
      credentials: true,
    })
  )
);

app.use(express.json());

connectDB();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
