const express = require("express");
const path = require("path");

const app = express();

// Serve frontend files
app.use(express.static(path.join(__dirname, "frontend")));

// Homepage
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "frontend", "index.html"));
});

// API endpoint required by frontend
app.get("/professional", (req, res) => {
  res.json({
    professionalName: "Sophie Silveira",

    base64Image: "",

    nameLink: {
      firstName: "Sophie",
      url: "https://linkedin.com"
    },

    primaryDescription: "Web Developer and UX Designer",
    workDescription1: "University Relations UX Researcher",
    workDescription2: "BYU-Idaho student",

    linkTitleText: "Links",

    linkedInLink: {
      text: "LinkedIn",
      link: "https://linkedin.com"
    },

    githubLink: {
      text: "GitHub",
      link: "https://github.com"
    },

    contactText: "Email: example@email.com"
  });
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);