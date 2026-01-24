const express = require("express");
const dotenv = require("dotenv");
const mongodb = require("./db/connect");

dotenv.config();

const app = express();

app.use(express.json()); // REQUIRED for POST/PUT body
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.status(200).send("API is running");
});

app.use("/", require("./routes"));

const port = process.env.PORT || 8080;

mongodb.initDb((err) => {
  if (err) {
    console.error("DB connection failed:", err);
    process.exit(1);
  } else {
    app.listen(port, () => {
      console.log(`Listening on port ${port}`);
    });
  }
});
