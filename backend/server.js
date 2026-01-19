require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const path = require("path");
const authroutes = require("./routes/auth.routes");
const incomeroutes = require("./routes/income.routes");
const expenseroutes = require("./routes/expense.routes");



const app = express();

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

app.use("/api/v1/auth", authroutes);
app.use("/api/v1/income", incomeroutes);
app.use("/api/v1/expense",expenseroutes);
  


app.use("/uploads", express.static(path.join(__dirname, "uploads")));


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
