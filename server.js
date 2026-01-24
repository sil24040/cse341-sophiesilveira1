const express = require("express");
const path = require("path");
const mongodb = require("./db/connect");

const app = express();

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, "frontend")));

// Serve frontend page at /
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "frontend", "index.html"));
});

// Mount API routes
app.use("/", require("./routes"));

const PORT = process.env.PORT || 8080;

// Connect DB first, then start server
mongodb.initDb((err) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }

  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
});
