const express = require("express");
const path = require("path");

const app = express();

// Serve frontend folder as root
app.use(express.static(path.join(__dirname, "frontend")));

// Home page
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "frontend", "index.html"));
});

// API endpoint
app.get("/professional", (req, res) => {
  res.json({
    professionalName: "SOPHIE SILVEIRA",

    imagePath: "/images/me.jpeg",

    nameLink: {
      firstName: "Sophie",
      url: "https://linkedin.com"
    },

    primaryDescription: " is a Web Developer and UX Designer",
    workDescription1:
      "She works in the University Relations Department as a UX researcher",
    workDescription2:
      "She is a BYU-Idaho student, and graduates next semester",

    linkTitleText: "Check out her links below:",

    linkedInLink: {
      text: "LinkedIn",
      link: "https://linkedin.com"
    },

    githubLink: {
      text: "GitHub",
      link: "https://github.com"
    }
  });
});

const PORT = 8080;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
