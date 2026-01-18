const express = require("express");
const path = require("path");
const mongodb = require("./db/connect");

const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, "frontend")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "frontend", "index.html"));
});

app.get("/professional", (req, res) => {
  res.json({
    professionalName: "SOPHIE SILVEIRA",
    imagePath: "/images/me.jpeg",
    nameLink: { firstName: "Sophie", url: "https://linkedin.com" },
    primaryDescription: " is a Web Developer and UX Designer",
    workDescription1: "She works in the University Relations Department as a UX researcher",
    workDescription2: "She is a BYU-Idaho student, and graduates next semester",
    linkTitleText: "Check out her links below:",
    linkedInLink: { text: "LinkedIn", link: "https://linkedin.com" },
    githubLink: { text: "GitHub", link: "https://github.com" },
  });
});

// Mount your contacts routes
app.use("/contacts", require("./routes/contacts"));

const PORT = process.env.PORT || 8080;

// IMPORTANT: connect to DB BEFORE listening
mongodb.initDb((err) => {
  if (err) {
    console.log(err);
  } else {
    app.listen(PORT, () => {
      console.log(`http://localhost:${PORT}`);
    });
  }
});
