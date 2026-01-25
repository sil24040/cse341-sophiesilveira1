const express = require("express");
const dotenv = require("dotenv");
const path = require("path");
const mongodb = require("./db/connect");

dotenv.config();

const app = express();

// Body parsing
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// CORS (simple open policy)
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, PATCH, DELETE, OPTIONS"
  );
  next();
});

// Serve frontend (optional, if you want to hit / in browser)
app.use(express.static(path.join(__dirname, "frontend")));

// API routes
app.use("/", require("./routes"));

const port = process.env.PORT || 8080;

mongodb.initDb((err) => {
  if (err) {
    console.error("DB init failed:", err);
    process.exit(1);
  }

  app.listen(port, () => {
    console.log(`Listening on http://localhost:${port}`);
  });
});
